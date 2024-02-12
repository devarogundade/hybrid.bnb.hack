// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleSwap is Context {
    error InvalidAmount(uint256 amount);

    address private wrappedBnb;

    constructor(address wrappedBnb_) {
        wrappedBnb = wrappedBnb_;
    }

    function buy() external payable {
        address owner = _msgSender();
        uint256 amount = msg.value;

        if (amount == 0) {
            revert InvalidAmount(amount);
        }

        uint256 amountOut = (amount * 1_000_000);

        IERC20 token = IERC20(wrappedBnb);
        token.transfer(owner, amountOut);
    }

    function sell(uint256 amount) external {
        address owner = _msgSender();

        if (amount < 1_000_000) {
            revert InvalidAmount(amount);
        }

        uint256 amountOut = (amount / 1_000_000);

        IERC20 token = IERC20(wrappedBnb);
        token.transferFrom(owner, address(this), amountOut);

        payable(owner).transfer(amountOut);
    }
}