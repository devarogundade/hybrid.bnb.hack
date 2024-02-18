// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Structs} from "./libraries/Structs.sol";
import {IHybrid} from "./interfaces/IHybrid.sol";
import {IHybridToken} from "./interfaces/IHybridToken.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract HybridToken is ERC20, IHybridToken {
    IHybrid private _hybrid;
    mapping(address => bool) private _opts;
    mapping(address => mapping(address => uint256)) private _spendables;

    constructor(
        string memory name,
        string memory symbol,
        address hybrid
    ) ERC20(name, symbol) {
        _hybrid = IHybrid(hybrid);
    }

    // ============================= //
    // OPT IN/OUT FUNCTIONS          //
    // ============================= //

    function optIn() external override upgradeRequired {
        address owner = _msgSender();
        _opts[owner] = true;
    }

    function optOut() external override optRequired upgradeRequired {
        address owner = _msgSender();
        _opts[owner] = false;
    }

    function upgradeAsset() external override {
        address owner = _msgSender();
        _hybrid.onUpgradeAsset(owner);
    }

    function dowgradeAsset(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override {
        address owner = _msgSender();
        _hybrid.onDowngradeAsset(messageHash, v, r, s, owner);
    }

    // ============================= //
    // APPROVAL FUNCTIONS            //
    // ============================= //

    function submitApprovalProof(
        bytes32 approvalId,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external upgradeRequired {
        address owner = _msgSender();

        (address spender, uint256 value) = _hybrid.onValidApproval(
            messageHash,
            v,
            r,
            s,
            approvalId
        );

        super._approve(owner, spender, value, true);

        _spendables[owner][spender] = value;
    }

    function rejectApproval(bytes32 approvalId) external upgradeRequired {
        _hybrid.onRejectAprroval(approvalId);
    }

    // ============================= //
    // GRADE FUNCTIONS               //
    // ============================= //

    function submitDowngradeProof(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external upgradeRequired {
        address owner = _msgSender();

        _hybrid.onDowngradeAsset(messageHash, v, r, s, owner);
    }

    // ============================= //
    // VIEW FUNCTIONS                //
    // ============================= //

    function isUpgraded(address owner) public view returns (bool) {
        address assetId = address(this);

        return _hybrid.isUpgraded(assetId, owner);
    }

    // ============================= //
    // OVERRIDE FUNCTIONS            //
    // ============================= //

    function _approve(
        address owner,
        address spender,
        uint256 value,
        bool emitEvent
    ) internal override {
        if (!isUpgraded(owner)) {
            super._approve(owner, spender, value, emitEvent);
        } else {
            if (!_opts[owner]) {
                revert OptInRequired(owner);
            }

            if (!_opts[spender]) {
                revert OptInRequired(spender);
            }

            _hybrid.onRequestAprroval(owner, spender, value);
        }
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override {
        if (!isUpgraded(from)) {
            super._update(from, to, value);
            return;
        }

        require(_spendables[from][to] >= value, "Insufficient spendable");
        _spendables[from][to] = _spendables[from][to] - value;

        super._update(from, to, value);
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        transferX(from, spender, to, value);
        return true;
    }

    function transferX(
        address from,
        address spender,
        address to,
        uint256 value
    ) internal {
        require(_spendables[from][spender] >= value, "Insufficient spendable");
        _spendables[from][spender] = _spendables[from][spender] - value;

        _spendables[from][to] = _spendables[from][to] + value;
        _transfer(from, to, value);
    }

    // ============================= //
    // MODIFIERS FUNCTIONS           //
    // ============================= //

    modifier optRequired() {
        address owner = _msgSender();

        if (isUpgraded(owner) && !_opts[owner]) {
            revert OptInRequired(owner);
        }

        _;
    }

    modifier upgradeRequired() {
        address owner = _msgSender();

        if (!isUpgraded(owner)) {
            revert OptInRequired(owner);
        }

        _;
    }
}
