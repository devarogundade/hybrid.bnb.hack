// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Structs} from "../libraries/Structs.sol";

interface IHybrid {
    error InvalidSignedHash(bytes32 hash);
    error InvalidCaller(address caller);
    error InvalidStatus(bytes32 approvalId);
    error WalletBinded(address signer);
    error ZeroAddress(address caller);

    event WalletBind(address owner, address signer);

    event WalletUnBind(address owner);

    event AssetUpgraded(address assetId, address owner);

    event AssetDowngraded(address assetId, address owner);

    event CloseHybrid(
        address owner,
        uint256 endTimestamp,
        Structs.Status status
    );

    event ApprovalRequested(
        bytes32 approvalId,
        address assetId,
        address owner,
        address spender,
        uint256 value
    );

    event ApprovalResult(address approvalId, Structs.Status Status);

    function signerOf(address owner) external view returns (address);

    function onRequestCloseHybrid(Structs.Status status) external;

    function onCloseHybrid() external;

    function isUpgraded(
        address assetId,
        address owner
    ) external view returns (bool);

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

    function walletBind(address signer) external;

    function onWalletUnBind(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address owner
    ) external;

    function onUpgradeAsset(address owner) external;

    function onDowngradeAsset(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address owner
    ) external;
}
