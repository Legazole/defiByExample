// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract UniswapInterface {
    uint256 contractBornCoin;
    address constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    IUniswapV2Router02 uniRouter = IUniswapV2Router02(ROUTER);

    function createUniswapPair(
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

    function getContractBornCoin(
        address _bornCoin
    ) public view returns (uint256) {
        return IERC20(_bornCoin).balanceOf(address(this));
    }

    constructor() {}
}
