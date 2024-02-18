// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBaseEIP {
    event OptedIn(address owner, bytes32 pubKey);

    event OptedOut(address owner);

    function optIn(bytes32 pubKey) external;

    function optOut() external;

    function verifyHash(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external view returns (bool);
}
