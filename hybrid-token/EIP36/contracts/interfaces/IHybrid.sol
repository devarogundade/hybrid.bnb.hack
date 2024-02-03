// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Structs} from "../libraries/Structs.sol";

interface IHybrid {
    event WalletBind(address tokenId, address owner);

    event WalletUnBind(address tokenId, address owner, uint256 index);

    event ApprovalRequest(
        address approvalId,
        address tokenId,
        address owner,
        address spender,
        uint256 value
    );

    event ApprovalResult(address approvalId, Structs.ResultType resultType);

    function approve() external;

    function submit(
        bytes32 approvalId,
        address spender,
        uint256 value
    ) external;

    function approved(bytes32 approvalId) external;

    function reject(bytes32 approvalId) external;

    function walletbind(address owner, bytes32 pubKey) external;

    function unwalletbind(address owner) external;
}
