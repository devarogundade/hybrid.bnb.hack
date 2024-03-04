# Hybrid

In the vast and dynamic landscape of blockchain technology, the Hybrid Asset Protocol emerges as a beacon of innovation, addressing critical challenges that have hindered widespread adoption and trust within the ecosystem. Born from a personal encounter with the pitfalls of existing token standards, Hybrid is envisioned as a groundbreaking extension to the ERC20 and ERC721 protocols, offering an extra layer of security and functionality to safeguard user assets and mitigate malicious activities.

[Learn more](https://dorahacks.io/buidl/9727)

## Usage

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {HybridToken} from "../HybridToken.sol";

contract WrappedBNB is HybridToken {
    constructor(
        address hybridContract
    ) HybridToken("Wrapped BNB", "WBNB", hybridContract) {}
}
```
