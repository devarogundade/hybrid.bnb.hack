// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Structs} from "../libraries/Structs.sol";

interface IHybridToken {
    error OptInRequired(address owner);

    function optIn() external;

    function optOut() external;
}   