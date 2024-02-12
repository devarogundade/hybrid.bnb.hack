// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IHybrid} from "./interfaces/IHybrid.sol";
import {Structs} from "./libraries/Structs.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract Hybrid is IHybrid, Context {
    bytes32 internal constant LEAF_DOMAIN_SEPARATOR =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE000000000000000000000000;

    mapping(address => address) private _signers;
    mapping(bytes32 => Structs.Approval) private _approvals;
    mapping(address => mapping(address => bool)) private _grades;

    function signerOf(address owner) public override view returns (address) {
        return _signers[owner];
    }

    function onRequestAprroval(
        address owner,
        address spender,
        uint256 value
    ) external override returns (bytes32) {
        address assetId = _msgSender();

        Structs.Approval memory approval = Structs.Approval({
            sequence: 0,
            assetId: assetId,
            owner: owner,
            spender: spender,
            value: value,
            status: Structs.Status.PENDING
        });

        bytes32 approvalId = _getHashForApproval(approval);

        emit ApprovalRequested(approvalId, assetId, owner, spender, value);

        _approvals[approvalId] = approval;

        return approvalId;
    }

    function onValidApproval(   
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        bytes32 approvalId
    ) external override returns (address spender, uint256 value)  {
       Structs.Approval storage approval = _approvals[approvalId];

        if (approval.assetId != _msgSender()) {
            revert InvalidCaller(_msgSender());
        }

        if (approval.status != Structs.Status.PENDING) {
            revert InvalidStatus(approvalId);
        }

        bool validate = _verifyHash(messageHash, v, r, s, signerOf(approval.owner));

        if (!validate) {
            revert();
        }

        approval.status = Structs.Status.ACCEPTED;

        return (approval.spender, approval.value);
    }

    function onRejectAprroval(bytes32 approvalId) external override {
        Structs.Approval storage approval = _approvals[approvalId];

        if (approval.assetId != _msgSender()) {
           revert InvalidCaller(_msgSender());
        }

        if (approval.status != Structs.Status.PENDING) {
            revert InvalidStatus(approvalId);
        }

        approval.status = Structs.Status.REJECTED;
    }

    function onWalletBind(address owner, address signer) external override {
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

    function onWalletUnBind(address owner) external override {
        address previousSigner = _signers[owner];

        if (previousSigner == address(0)) {
            revert ZeroAddress(previousSigner);
        }

        emit WalletUnBind(owner);
    }

    function onUpgradeAsset(address owner) external override {
        address assetId = _msgSender();

        _grades[assetId][owner] = true;

        emit AssetUpgraded(assetId, owner);
    }

    function onRequestDowngrade(address owner) external override {
        address assetId = _msgSender();

        emit DowngradeRequested(assetId, owner);
    }

    function onDowngradeAsset(address owner) external override {
        address assetId = _msgSender();

        _grades[assetId][owner] = false;

        emit AssetDowngraded(assetId, owner);
    }

    function isUpgraded(address assetId, address owner) external override view returns (bool) {
        address signer = _signers[owner];

        return (signer != address(0)) && (_grades[assetId][owner]);
    }

    // ============================= //
    // WALLET BINDING FUNCTIONS      //
    // ============================= //

    // ============================= //
    // INTERNAL FUNCTIONS            //
    // ============================= //

    function _getHashForApproval(Structs.Approval memory approval) internal pure returns (bytes32) {
        return keccak256(
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
        bytes32 s,
        address expectedSigner
    ) internal pure returns (bool) {
        // Concatenate the message hash with the Ethereum prefix "\x19Ethereum Signed Message:\n32"
        bytes32 prefixedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        // Recover the address from the signature
        address recoveredAddress = ecrecover(prefixedHash, v, r, s);

        // Check if the recovered address matches the expected signer
        return recoveredAddress == expectedSigner;
    }
}
