// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IBaseEIP} from "./interfaces/IBaseEIP.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";

abstract contract BaseEIP is IBaseEIP, Context {
    mapping(address => bytes32) private _pubKeys;

    function optIn(bytes32 pubKey) external override {
        address owner = _msgSender();
        _opts[owner] = true;

        emit OptedIn(owner, pubKey);
    }

    function optOut() external override onlyOpt {
        address owner = _msgSender();
        _opts[owner] = false;

        emit OptedOut(owner);
    }

    function isOpt(address owner) external view returns (bool) {
        return _opts[owner];
    }

    modifier onlyOpt() {
        require(_opts[_msgSender()], "");
        _;
    }
}
