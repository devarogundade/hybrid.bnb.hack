// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {HybridToken} from "../HybridToken.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract SimpleSwap is Context {
    error InvalidAmount(uint256 amount);

    address private wrappedBnb;

    constructor(address wrappedBnb_) {
        wrappedBnb = wrappedBnb_;

        HybridToken token = HybridToken(wrappedBnb);
        token.optIn();
    }

    function buy() external payable {
        address owner = _msgSender();

        if (msg.value == 0) {
            revert InvalidAmount(msg.value);
        }

        uint256 amountOut = (msg.value * 1_000_000);

        HybridToken token = HybridToken(wrappedBnb);
        token.transfer(owner, amountOut);
    }

    function sell(uint256 amount) external {
        address owner = _msgSender();

        if (amount < 1_000_000) {
            revert InvalidAmount(amount);
        }

        uint256 amountOut = (amount / 1_000_000);

        HybridToken token = HybridToken(wrappedBnb);
        token.transferFrom(owner, address(this), amountOut);

        payable(owner).transfer(amountOut);
    }
}
