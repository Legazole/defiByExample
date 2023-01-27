// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

contract UniswapInterface {
    address constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address public pairAddress;

    IUniswapV2Factory uniFactory = IUniswapV2Factory(FACTORY);
    IUniswapV2Router02 uniRouter = IUniswapV2Router02(ROUTER);

    constructor() {}

    function createUniswapPair(
        address _tokenA,
        address _tokenB
    ) public returns (address) {
        return uniFactory.createPair(_tokenA, _tokenB);
    }

    function checkPairReserves(
        address _tokenA,
        address _tokenB
    ) public returns (uint _reserve0, uint _reserve1) {
        pairAddress = uniFactory.getPair(_tokenA, _tokenB);
        IUniswapV2Pair uniPair = IUniswapV2Pair(pairAddress);
        (uint reserve0, uint reserve1, uint32 blockTimestamp) = uniPair
            .getReserves();
        return (reserve0, reserve1);
    }

    function addUniswapLiquidity(
        address _tokenA,
        address _tokenB,
        uint _amountA,
        uint _amountB
    ) external returns (uint amountA, uint amountB, uint liquidity) {
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(ROUTER, _amountA);
        IERC20(_tokenB).approve(ROUTER, _amountB);

        (uint amountASent, uint amountBSent, uint liquidityTokens) = uniRouter
            .addLiquidity(
                _tokenA,
                _tokenB,
                _amountA,
                _amountB,
                1,
                1,
                address(this),
                block.timestamp
            );

        return (amountASent, amountBSent, liquidityTokens);
    }

    // Getter functions

    function getContractERC20Balance(
        address _erc20
    ) public view returns (uint256) {
        return IERC20(_erc20).balanceOf(address(this));
    }

    function getPairAddress(
        address _tokenA,
        address _tokenB
    ) public view returns (address) {
        return uniFactory.getPair(_tokenA, _tokenB);
    }
}
