// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BornCoin is ERC20, Ownable {
    address public owner1 = 0xd66E9945a68Ac737cf506d78372A240862C405Bd;

    constructor() ERC20("BornCoin", "BRNC") {
        _mint(msg.sender, 1100);
        _mint(owner1, 1100);
        _mint(address(this), 1100);
    }

    function mintToAddress(
        address _recipient,
        uint _amount
    ) external onlyOwner {
        _mint(_recipient, _amount);
    }

    function getThisContractBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }

    receive() external payable {
        _mint(msg.sender, msg.value);
    }
}
