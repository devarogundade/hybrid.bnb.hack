// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {HybridToken} from "../HybridToken.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract SimpleSwap is Context {
    uint256 private _rate = 1_000_000;
    error InvalidAmount(uint256 amount);

    address private wrappedBnb;

    constructor(address wrappedBnb_) {
        wrappedBnb = wrappedBnb_;

        HybridToken token = HybridToken(wrappedBnb);
        token.optIn();
    }

    receive() external payable {}

    function buy() external payable {
        address owner = _msgSender();

        if (msg.value == 0) {
            revert InvalidAmount(msg.value);
        }

        uint256 amountOut = (msg.value * _rate);

        HybridToken token = HybridToken(wrappedBnb);
        token.transfer(owner, amountOut);
    }

    function sell(uint256 amount) external {
        address owner = _msgSender();

        if (amount < (_rate * 1)) {
            revert InvalidAmount(amount);
        }

        uint256 amountOut = (amount / _rate);

        HybridToken token = HybridToken(wrappedBnb);
        token.transferFrom(owner, address(this), amount);

        payable(owner).transfer(amountOut);
    }
}
