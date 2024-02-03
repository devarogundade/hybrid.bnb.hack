// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC36 {
    enum Status {
        PENDING,
        ACCEPTED,
        REJECTED
    }

    struct Approval {
        Status status;
        address spender;
        address owner;
        uint256 amount;
        uint256 timestamp;
    }

    error OptInRequired(address account);

    event ApprovedEIP36(bytes32 approvalId);
    event ApproveEIP36(address owner, Approval approval);
    event UnApproveEIP36(address owner, address spender, uint256 amount);

    function optIn(bytes32 pubKey) external;

    function optOut() external;

    function getApproval(
        bytes32 approvalId
    ) external view returns (Approval memory);
}
