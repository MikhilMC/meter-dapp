//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MTRG is ERC20 {
    constructor() ERC20("MTRG TEST Token", "MTRGTEST") {
        _mint(msg.sender, 40000000 * (10**decimals()));
    }
}
