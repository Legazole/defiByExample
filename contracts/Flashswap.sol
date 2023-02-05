// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// we will write a contract that preforms a flash swap.

contract Flashswap is Ownable {
    address private constant ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    IUniswapV2Router02 uniRouter = IUniswapV2Router02(ROUTER);
    IUniswapV2Factory uniFactory = IUniswapV2Factory(FACTORY);

    function preformFlashswap(
        uint _amountIn,
        address _tokenA,
        address _tokenB
    ) external onlyOwner {}

    constructor() {}
}
