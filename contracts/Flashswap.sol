// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol";

// we will write a contract that preforms a flash swap.

contract Flashswap is Ownable, IUniswapV2Callee {
    address private constant ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address public pairAddress;

    IUniswapV2Router02 uniRouter = IUniswapV2Router02(ROUTER);
    IUniswapV2Factory uniFactory = IUniswapV2Factory(FACTORY);

    function preformFlashswap(uint _amountOut) external onlyOwner {
        //We call the swap function on the pair, passing a bytes parameter
        //this will result in the pair calling the IUniswapV2Callee.uniswapV2Call function
        //In this function we can implement the arbitrage logic

        IUniswapV2Pair uniPair = IUniswapV2Pair(pairAddress);
        uniPair.swap(_amountOut, _amountOut, msg.sender, "flashswap parameter");
    }

    function uniswapV2Call(
        address _sender,
        uint _amount0,
        uint _amount1,
        bytes calldata data
    ) external {
        require(msg.sender == pairAddress, "not the pair");
        //arbitrage math goes here, research next.
        //example:

        /*
            // Your custom code would go here. For example, code to arbitrage.
            require(tokenBorrow == WETH, "token borrow != WETH");

            // about 0.3% fee, +1 to round up
            uint fee = (amount1 * 3) / 997 + 1;
            amountToRepay = amount1 + fee;

            // Transfer flash swap fee from caller
            weth.transferFrom(caller, address(this), fee);

            // Repay
            weth.transfer(address(pair), amountToRepay);
        */
    }

    function setPairAddres(address _tokenA, address _tokenB) external {
        pairAddress = uniFactory.getPair(_tokenA, _tokenB);
    }

    constructor() {}
}
