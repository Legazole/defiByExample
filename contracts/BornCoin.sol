// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BornCoin is ERC20 {
    constructor() ERC20("BornCoin", "BRNC") {
        _mint(msg.sender, 1000);
        _mint(0xd66E9945a68Ac737cf506d78372A240862C405Bd, 1000);
        _mint(address(this), 1000);
    }

    function getThisContractBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }

    receive() external payable {
        _mint(msg.sender, msg.value);
    }
}
