// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Structs} from "../libraries/Structs.sol";

interface IHybrid {
    error InvalidCaller(address caller);
    error InvalidStatus(bytes32 approvalId);
    error WalletBinded(address signer);
    error ZeroAddress(address caller);

    event WalletBind(address owner, address signer);

    event WalletUnBind(address owner);

    event AssetUpgraded(address assetId, address owner);

    event AssetDowngraded(address assetId, address owner);

    event DowngradeRequested(address assetId, address owner);

    event ApprovalRequested(
        bytes32 approvalId,
        address assetId,
        address owner,
        address spender,
        uint256 value
    );

    event ApprovalResult(address approvalId, Structs.Status Status);

    function signerOf(address owner) external view returns (address);

    function isUpgraded(address assetId, address owner) external view returns (bool);

    function onRequestAprroval(
        address owner,
        address spender,
        uint256 value
    ) external returns (bytes32);

    function onValidApproval(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        bytes32 approvalId
    ) external returns (address spender, uint256 value);

    function onRejectAprroval(bytes32 approvalId) external;

    function onWalletBind(address owner, address signer) external;

    function onWalletUnBind(address owner) external;

    function onUpgradeAsset(address owner) external;

    function onDowngradeAsset(address owner) external;

    function onRequestDowngrade(address owner) external;
}
