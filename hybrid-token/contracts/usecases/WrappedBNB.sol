// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {HybridToken} from "../HybridToken.sol";

contract WrappedBNB is HybridToken {
    constructor(address hybridContract) HybridToken("Wrapped BNB", "WBNB", hybridContract) {
        _mint(_msgSender(), 100_000_000_000_000_000_000_000_000_000_000);
    }
}