// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

// we will write a contract that preforms a flash swap.

contract Flashswap is Ownable, IUniswapV2Callee {
    address private constant ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant SUSHIROUTER =
        0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public pairAddress;

    IUniswapV2Router02 uniRouter = IUniswapV2Router02(ROUTER);
    IUniswapV2Factory uniFactory = IUniswapV2Factory(FACTORY);
    IUniswapV2Router02 sushiRouter = IUniswapV2Router02(SUSHIROUTER);
    IUniswapV2Pair checkPair;

    //we want to borrow an amount from a token address
    //for simplicity the second token we use to form a pair = WETH
    function preformFlashswap(
        uint _amountToBorrow,
        address _tokenToBorrow
    ) external onlyOwner {
        //first we check if a pair exist for the token we want to borrow
        address pair = uniFactory.getPair(_tokenToBorrow, WETH);
        require(pair != address(0));
        //initialize the pair
        IUniswapV2Pair uniPair = IUniswapV2Pair(pair);
        //We store both token addressess from the pair in a variable

        address token0 = uniPair.token0();
        address token1 = uniPair.token1();

        //Because we don't yet know which one is the address from the token
        //we want to borrow, we preform an check

        uint _amount0Out = _tokenToBorrow == token0 ? _amountToBorrow : 0;
        uint _amount1Out = _tokenToBorrow == token1 ? _amountToBorrow : 0;

        bytes memory data = abi.encode(_amountToBorrow, _tokenToBorrow);

        uniPair.swap(_amount0Out, _amount1Out, address(this), data);
    }

    function uniswapV2Call(
        address _sender,
        uint _amount0,
        uint _amount1,
        bytes calldata data
    ) external {
        //first we have to check if the caller of this function is the pair Contract
        (uint _amountToBorrow, address _tokenToBorrow) = abi.decode(
            data,
            (uint, address)
        );
        checkPair = IUniswapV2Pair(uniFactory.getPair(_tokenToBorrow, WETH));
        require(msg.sender == address(checkPair), "Not the pair calling");
        // we can check if the caller of this function is the actual smart contract we wrote
        require(_sender == address(this), "Not the contract sending");

        //Arbitrage code starts here
        //We have acquired the amount we want to borrow, and are free to with as we please
        //as long as we repay it at the end.
        // ================================
        // : preform the actual arbitrage here. research next.

        /* for this to work we have to trade to another dex, we will use sushiswap as an example
         */
        address[] memory path;
        path = new address[](2);
        //first element should be the input token, second element should be the output token
        path[0] = WETH;
        path[1] = _tokenToBorrow;

        uint fee = ((_amountToBorrow * 3) / 977) + 1;
        uint arbitrageMargin = (((_amountToBorrow * 3) / 977) + 1) + fee;
        uint amountToRepay = _amountToBorrow + fee;

        uint amountReceived = sushiRouter.swapTokensForExactTokens(
            arbitrageMargin,
            _amountToBorrow,
            path,
            msg.sender,
            block.timestamp
        )[1];

        // ================================
        //Repay portion of the flash swap.

        IERC20(_tokenToBorrow).transfer(_tokenToBorrow, amountToRepay);
    }

    function setPairAddres(address _tokenA, address _tokenB) external {
        pairAddress = uniFactory.getPair(_tokenA, _tokenB);
    }

    constructor() {}
}
