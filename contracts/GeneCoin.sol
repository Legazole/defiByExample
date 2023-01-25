// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GeneCoin is ERC20 {
    address public owner1 = 0xd66E9945a68Ac737cf506d78372A240862C405Bd;

    constructor() ERC20("GeneCoin", "GCOIN") {
        _mint(msg.sender, 1000);
        _mint(owner1, 1000);
        _mint(address(this), 1000);
    }

    function getThisContractBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }

    receive() external payable {
        _mint(msg.sender, msg.value);
    }
}
