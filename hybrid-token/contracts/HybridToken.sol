// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Structs} from "./libraries/Structs.sol";
import {IHybrid} from "./interfaces/IHybrid.sol";
import {IHybridToken} from "./interfaces/IHybridToken.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract HybridToken is ERC20, IHybridToken {
    // ============================= //
    // GLOBAL VARS                   //
    // ============================= //

    IHybrid private _hybrid;

    mapping(address => bool) private _isOptedIn;
    mapping(address => mapping(address => uint256)) private _spendableOf;

    constructor(
        string memory name,
        string memory symbol,
        address hybrid
    ) ERC20(name, symbol) {
        _hybrid = IHybrid(hybrid);
        _isOptedIn[address(0)] = true;
    }

    // ============================= //
    // OPT IN/OUT FUNCTIONS          //
    // ============================= //

    function optIn() external override {
        address owner = _msgSender();
        _isOptedIn[owner] = true;
    }

    function optOut() external override optedInRequired {
        address owner = _msgSender();
        _isOptedIn[owner] = false;
    }

    function upgradeAsset() external override {
        address owner = _msgSender();

        _hybrid.onUpgradeAsset(owner);
    }

    // ============================= //
    // APPROVAL FUNCTIONS            //
    // ============================= //

    function submitApprovalProof(
        bytes32 approvalId,
        bytes32 message,
        bytes memory signature
    ) external override upgradeRequired {
        address owner = _msgSender();

        (address spender, uint256 value) = _hybrid.onValidApproval(
            message,
            signature,
            approvalId
        );

        super._approve(owner, spender, value, true);

        _spendableOf[owner][spender] = value;
    }

    function rejectApproval(bytes32 approvalId) external upgradeRequired {
        _hybrid.onRejectAprroval(approvalId);
    }

    // ============================= //
    // GRADE FUNCTIONS               //
    // ============================= //

    function submitDowngradeProof(
        bytes32 message,
        bytes memory signature
    ) external override upgradeRequired {
        address owner = _msgSender();

        _hybrid.onDowngradeAsset(message, signature, owner);
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
            // internal call, should not request
            // explicit approval should be use is _spendableOf is not enough
            if (!emitEvent) return;

            _hybrid.onRequestAprroval(owner, spender, value);
        }
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override {
        if (!_isOptedIn[from]) {
            revert OptInRequired(from);
        }

        if (!_isOptedIn[to]) {
            revert OptInRequired(to);
        }

        if (!isUpgraded(from)) {
            super._update(from, to, value);
            return;
        }

        require(_spendableOf[from][to] >= value, "Insufficient spendable");
        _spendableOf[from][to] = _spendableOf[from][to] - value;

        super._update(from, to, value);
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual override(ERC20, IERC20) returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        transferX(from, spender, to, value);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) public view virtual override(ERC20, IERC20) returns (uint256) {
        if (!isUpgraded(owner)) {
            return super.allowance(owner, spender);
        }

        return _spendableOf[owner][spender];
    }

    function transferX(
        address from,
        address spender,
        address to,
        uint256 value
    ) internal {
        require(_spendableOf[from][spender] >= value, "Insufficient spendable");
        _spendableOf[from][spender] = _spendableOf[from][spender] - value;

        _spendableOf[from][to] = _spendableOf[from][to] + value;
        _transfer(from, to, value);
    }

    // ============================= //
    // MODIFIERS FUNCTIONS           //
    // ============================= //

    modifier optedInRequired() {
        address owner = _msgSender();

        if (isUpgraded(owner) && !_isOptedIn[owner]) {
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
