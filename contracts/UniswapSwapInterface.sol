// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/interfaces/IERC20.sol";

contract UniswapSwapInterface {
    address private constant FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IERC20 public geneCoin;
    IERC20 public bornCoin;
    address public PAIRADDRESS;

    IUniswapV2Factory uniFactory = IUniswapV2Factory(FACTORY);
    IUniswapV2Router02 uniRouter = IUniswapV2Router02(ROUTER);
    IUniswapV2Pair uniPair;

    constructor(address _bornCoin, address _geneCoin) {
        bornCoin = IERC20(_bornCoin);
        geneCoin = IERC20(_geneCoin);
    }

    function setPairAddress(address _tokenA, address _tokenB) external {
        PAIRADDRESS = uniFactory.getPair(_tokenA, _tokenB);
        uniPair = IUniswapV2Pair(PAIRADDRESS);
    }

    function swapTokens(uint _amountIn, uint _amountOut) external {
        //This function should swap tokens from a given address for a given amount
        //Keep in mind the router has a two types of swaps
        //In one you input an exact amount of tokens and you get as many output tokens as possible
        //In the other you get an exact amount of tokens back but this trade will take as few of your tokens as possible
        //Do you want to get an exact amount, or do you want to spend an exact amount?

        //The first thing this function should do is swap as few bornCoins for as much geneCoins

        uint amountInMax = _amountIn;
        uint amountOut = _amountOut;

        address[] memory path;
        path = new address[](2);
        path[0] = address(bornCoin);
        path[1] = address(geneCoin);

        uint[] memory amounts;
        amounts = new uint[](4);

        bornCoin.transferFrom(msg.sender, address(this), 300);
        bornCoin.approve(address(uniRouter), 300);

        //this fuctions returns an array with the input amounts and subsequent output token amounts
        amounts = uniRouter.swapExactTokensForTokens(
            amountOut,
            amountInMax,
            path,
            msg.sender,
            block.timestamp
        );
    }

    function createPair() external returns (address) {
        return uniFactory.createPair(address(bornCoin), address(geneCoin));
    }

    //Getter functions

    function getBornCoinAddress() external view returns (address) {
        return address(bornCoin);
    }

    function getGeneCoinAddress() external view returns (address) {
        return address(geneCoin);
    }

    function getPairReserves()
        external
        view
        returns (uint _reserve0, uint _reserve1)
    {
        (uint reserve0, uint reserve1, uint32 blockTimestamp) = uniPair
            .getReserves();
        return (reserve0, reserve1);
    }
}
