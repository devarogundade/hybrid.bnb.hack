// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IHybrid} from "./interfaces/IHybrid.sol";
import {Structs} from "./libraries/Structs.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract Hybrid is IHybrid, Context {
    // ============================= //
    // GLOBAL VARS                   //
    // ============================= //

    uint256 private _sequence = 1;
    mapping(bytes32 => bool) private _usedSignedHash;

    bytes32 internal constant LEAF_DOMAIN_SEPARATOR =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE000000000000000000000000;

    uint256 internal constant SECONDS_TO_CLOSE_HYBRID = 7 * 24 * 60 * 60;

    mapping(address => address) private _signers;
    mapping(bytes32 => Structs.Approval) private _approvals;
    mapping(address => mapping(address => bool)) private _isAssetUpgraded;
    mapping(address => Structs.CloseHybrid) private _closeHybrid;

    // ============================= //
    // CLOSE FUNCTIONS               //
    // ============================= //

    function onRequestCloseHybrid(Structs.Status status) external override {
        address owner = _msgSender();

        uint256 endTimestamp = (block.timestamp + SECONDS_TO_CLOSE_HYBRID);

        _closeHybrid[owner] = Structs.CloseHybrid({
            endTimestamp: endTimestamp,
            status: status
        });

        emit CloseHybrid(owner, endTimestamp, status);
    }

    function onCloseHybrid() external override {
        address owner = _msgSender();

        Structs.CloseHybrid memory request = _closeHybrid[owner];

        require(request.endTimestamp < block.timestamp, "Request Not Mature!");
        require(
            request.status == Structs.Status.PENDING,
            "Request Not Pending!"
        );

        delete _signers[owner];
        delete _closeHybrid[owner];

        emit WalletUnBind(owner);
    }

    // ============================= //
    // APPROVAL FUNCTIONS            //
    // ============================= //

    function onRequestAprroval(
        address owner,
        address spender,
        uint256 value
    ) external override returns (bytes32) {
        address assetId = _msgSender();

        Structs.Approval memory approval = Structs.Approval({
            sequence: _sequence,
            assetId: assetId,
            owner: owner,
            spender: spender,
            value: value,
            status: Structs.Status.PENDING
        });

        bytes32 approvalId = _getHashForApproval(approval);

        emit ApprovalRequested(approvalId, assetId, owner, spender, value);

        _approvals[approvalId] = approval;
        _sequence++;

        return approvalId;
    }

    function onValidApproval(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        bytes32 approvalId
    )
        external
        override
        onlyUnusedSignedHash(messageHash)
        returns (address spender, uint256 value)
    {
        Structs.Approval storage approval = _approvals[approvalId];

        address assetId = _msgSender();

        if (approval.assetId != assetId) {
            revert InvalidCaller(assetId);
        }

        if (approval.status != Structs.Status.PENDING) {
            revert InvalidStatus(approvalId);
        }

        address extractedSigner = _verifyHash(messageHash, v, r, s);

        if (extractedSigner != signerOf(approval.owner)) {
            revert InvalidSigner(extractedSigner);
        }

        _usedSignedHash[messageHash] = true;

        approval.status = Structs.Status.ACCEPTED;

        emit ApprovalResult(approvalId, Structs.Status.ACCEPTED);

        return (approval.spender, approval.value);
    }

    function onRejectAprroval(bytes32 approvalId) external override {
        Structs.Approval storage approval = _approvals[approvalId];

        address assetId = _msgSender();

        if (approval.assetId != assetId) {
            revert InvalidCaller(assetId);
        }

        if (approval.status != Structs.Status.PENDING) {
            revert InvalidStatus(approvalId);
        }

        approval.status = Structs.Status.REJECTED;

        emit ApprovalResult(approvalId, Structs.Status.REJECTED);
    }

    // ============================= //
    // UP/DOWN GRADE FUNCTIONS       //
    // ============================= //

    function onUpgradeAsset(address owner) external override {
        address assetId = _msgSender();
        address signer = _signers[owner];

        if (signer == address(0)) {
            revert ZeroAddress(signer);
        }

        _isAssetUpgraded[assetId][owner] = true;

        emit AssetUpgraded(assetId, owner);
    }

    function onDowngradeAsset(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address owner
    ) external override onlyUnusedSignedHash(messageHash) {
        address assetId = _msgSender();

        address extractedSigner = _verifyHash(messageHash, v, r, s);

        if (extractedSigner != signerOf(owner)) {
            revert InvalidSigner(extractedSigner);
        }

        _usedSignedHash[messageHash] = true;

        _isAssetUpgraded[assetId][owner] = false;

        emit AssetDowngraded(assetId, owner);
    }

    function isUpgraded(
        address assetId,
        address owner
    ) external view override returns (bool) {
        address signer = _signers[owner];

        return (signer != address(0)) && (_isAssetUpgraded[assetId][owner]);
    }

    // ============================= //
    // WALLET BINDING FUNCTIONS      //
    // ============================= //

    function onWalletBind(address signer) external override {
        address owner = _msgSender();
        address previousSigner = _signers[owner];

        if (previousSigner != address(0)) {
            revert WalletBinded(previousSigner);
        }

        if (signer == address(0)) {
            revert ZeroAddress(signer);
        }

        _signers[owner] = signer;

        emit WalletBind(owner, signer);
    }

    function onWalletUnBind(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override onlyUnusedSignedHash(messageHash) {
        address owner = _msgSender();

        address extractedSigner = _verifyHash(messageHash, v, r, s);

        if (extractedSigner != signerOf(owner)) {
            revert InvalidSigner(extractedSigner);
        }

        _usedSignedHash[messageHash] = true;
        _signers[owner] = address(0);

        emit WalletUnBind(owner);
    }

    function signerOf(address owner) public view override returns (address) {
        return _signers[owner];
    }

    // ============================= //
    // INTERNAL FUNCTIONS            //
    // ============================= //

    function _getHashForApproval(
        Structs.Approval memory approval
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    LEAF_DOMAIN_SEPARATOR,
                    approval.assetId,
                    approval.owner,
                    approval.spender,
                    approval.value,
                    approval.sequence
                )
            );
    }

    function _verifyHash(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal pure returns (address) {
        // Concatenate the message hash with the Ethereum prefix "\x19Ethereum Signed Message:\n32"
        bytes32 prefixedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        // Recover the address from the signature
        address recoveredAddress = ecrecover(prefixedHash, v, r, s);

        // Check if the recovered address matches the expected signer
        return recoveredAddress;
    }

    // ============================= //
    // MODIFIERS                     //
    // ============================= //

    modifier onlyUnusedSignedHash(bytes32 hash) {
        require(!_usedSignedHash[hash], "SIGNED HASH USED");
        _;
    }
}
