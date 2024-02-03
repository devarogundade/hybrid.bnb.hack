// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ILogic} from "../interfaces/ILogic.sol";

contract Logic01 is ILogic {
    function verify(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address expectedSigner
    ) external pure override returns (bool) {
        // Concatenate the message hash with the Ethereum prefix "\x19Ethereum Signed Message:\n32"
        bytes32 prefixedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        // Recover the address from the signature
        address recoveredAddress = ecrecover(prefixedHash, v, r, s);

        // Check if the recovered address matches the expected signer
        return recoveredAddress == expectedSigner;
    }
}
