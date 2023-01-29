// SPDX-License-Identifier: MIT
pragma solidity =0.5.16;

import "@uniswap/v2-core/contracts/UniswapV2Pair.sol";

contract UniswapV2PairInterface is UniswapV2Pair {
    address pairAddress;

    function setPairAddress(address _pair) external {
        pairAddress = _pair;
    }

    function getReservesDirectly()
        external
        view
        returns (uint _reserveA, uint _reserveB)
    {
        UniswapV2Pair uniswapPair = UniswapV2Pair(pairAddress);
        (uint reserveA, uint reserveB, uint32 blockTimestamp) = uniswapPair
            .getReserves();
        return (reserveA, reserveB);
    }
}
