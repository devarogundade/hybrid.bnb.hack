// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Hybrid is IHybrid {
    constructor() {}

    function walletBind(address owner, bytes32 pubKey) external override {}

    function unWalletBind(address owner, uint16 index) external override {}
}
