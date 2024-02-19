// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Structs} from "../libraries/Structs.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IHybridToken is IERC20 {
    error OptInRequired(address owner);

    function optIn() external;

    function optOut() external;

    function upgradeAsset() external;

    function submitDowngradeProof(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function submitApprovalProof(
        bytes32 approvalId,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}
