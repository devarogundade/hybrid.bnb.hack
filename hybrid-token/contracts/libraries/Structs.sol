// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Structs {
    enum Status {
        ACCEPTED,
        REJECTED,
        PENDING,
        DEFAULT
    }

    struct Approval {
        uint256 sequence;
        address assetId;
        address owner;
        address spender;
        uint256 value;
        Status status;
    }
}
