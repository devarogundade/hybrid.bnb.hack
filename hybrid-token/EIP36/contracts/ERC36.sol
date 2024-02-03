// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC36} from "./IERC36.sol";
import {BaseEIP} from "./BaseEIP.sol";
import {ILogic} from "./interfaces/ILogic.sol";
import {Structs} from "./libraries/Structs.sol";

import {Logic01} from "./logics/Logic01.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC36 is IERC36, ERC20, BaseEIP {
    ILogic private _logic;
    IHybrid private _hybrid;
    mapping(bytes32 => Approval) private _approvals;

    constructor(
        string memory name,
        string memory symbol,
        address hybrid
    ) ERC20(name, symbol) {
        _logic = new Logic01();

        _hybrid = IHybrid(hybrid);

        //
        _hybrid.create(name, symbol);
    }

    function approve(
        address spender,
        uint256 value
    ) public override returns (bool) {
        Approval memory approval = Approval({
            status: Status.PENDING,
            spender: spender,
            owner: _msgSender(),
            amount: value,
            timestamp: block.timestamp
        });

        bytes32 approvalId = bytes32(0);

        _approvals[approvalId] = approval;

        //
        _hybrid.submit(approvalId, spender, value);
    }

    function submitApprovalProof(
        bytes32 approvalId,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        address owner = _msgSender();
        Approval storage approval = _approvals[approvalId];

        if (approval.status != Structs.ResultType.PENDING) {
            revert InvalidStatus(approval.status);
        }

        if (owner != approval.owner) {
            revert InvalidSigner(owner);
        }

        bool isMtatch = _logic.compare(messageHash, approval);

        if (!isMtatch) {
            revert NotMatch(messageHash);
        }

        bool isValid = _logic.verify(messageHash, v, r, s, owner);

        if (!isValid) {
            revert ERC20InvalidApprover(approval.owner);
        }

        super._approve(approval.owner, approval.spender, approval.amount);

        approval.status = Structs.ResultType.ACCEPTED;

        //
        _hybrid.approved(approvalId);
    }

    function reject(bytes32 approvalId) external {
        address owner = _msgSender();
        Approval storage approval = _approvals[approvalId];

        if (approval.status != Structs.ResultType.PENDING) {
            revert InvalidStatus(approval.status);
        }

        if (owner != approval.owner) {
            revert InvalidSigner(owner);
        }

        approval.status = Structs.ResultType.REJECTED;

        _hybrid.reject(approvalId);
    }

    function _transfer(
        address from,
        address to,
        uint256 value
    ) internal override {
        _spendAllowance(from, to, value);
        super._transfer(from, to, value);
    }
}
