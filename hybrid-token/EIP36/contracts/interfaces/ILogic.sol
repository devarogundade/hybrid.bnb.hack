// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ILogic {
    function compare(bytes32 messageHash) external pure returns (bool);

    function verify(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address expectedSigner
    ) external pure returns (bool);
}
