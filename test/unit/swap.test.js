const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")
const { deployments } = require("hardhat")
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("Uniswap swap interface functionality", function () {
    let swapInterface, uniswapInterface, bornCoin, geneCoin, deployer
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer

        await deployments.fixture["all"]

        uniswapInterface = await ethers.getContract(
            "UniswapLiquidityInterface",
            deployer
        )
        swapInterface = await ethers.getContract(
            "UniswapSwapInterface",
            deployer
        )
        bornCoin = await ethers.getContract("BornCoin", deployer)
        geneCoin = await ethers.getContract("GeneCoin", deployer)
    })
    describe("constructor", async function () {
        it("Should check if BornCoin gets initialized correctly", async function () {
            expectedValue = bornCoin.address
            actualValue = await swapInterface.getBornCoinAddress()
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("Should check if GeneCoin get initialized correctly", async function () {
            expectedValue = geneCoin.address
            actualValue = await swapInterface.getGeneCoinAddress()
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
    })
    describe("functions", async function () {
        // beforeEach(async function () {
        //     let amountA = 1100,
        //         amountB = 1100

        //     await bornCoin.approve(uniswapInterface.address, amountA)
        //     await geneCoin.approve(uniswapInterface.address, amountB)

        //     console.log("===== adding liquidity =====")
        //     await uniswapInterface.addUniswapLiquidity(
        //         bornCoin.address,
        //         geneCoin.address,
        //         amountA,
        //         amountB,
        //         { from: deployer }
        //     )
        //     console.log("Liquidity added.")
        // })
        it("swapTokens function", async function () {
            let amountA = 1100,
                amountB = 1100
            await bornCoin.approve(uniswapInterface.address, amountA)
            await geneCoin.approve(uniswapInterface.address, amountB)

            //create pair and add liqudity

            await uniswapInterface.addUniswapLiquidity(
                bornCoin.address,
                geneCoin.address,
                amountA,
                amountB,
                { from: deployer }
            )

            //Check pair reserves

            //await swapInterface.createPair()
            await swapInterface.setPairAddress(
                bornCoin.address,
                geneCoin.address
            )
            const pairAddress = await swapInterface.PAIRADDRESS()
            console.log(`${pairAddress}`)

            // console.log(
            //     `${(expectedValueA.toString(), expectedValueB.toString())}`
            // )

            const amountIn = 9
            const amountOut = 10
            const balanceGeneCoinBefore = await geneCoin.balanceOf(deployer)
            console.log(
                `deployer geneCoin balance before swap ${balanceGeneCoinBefore.toString()}`
            )
            const expectedValueIn =
                parseInt(balanceGeneCoinBefore) + parseInt(amountIn)

            const balanceBorncoinBefore = await bornCoin.balanceOf(deployer)
            console.log(
                `deployer bornCoin balance before swap ${balanceBorncoinBefore.toString()}`
            )
            const expectedValueOut =
                parseInt(balanceBorncoinBefore) + parseInt(amountOut)

            console.log(
                `trying to swap ${amountOut.toString()} bornCoin for ${amountIn.toString()} geneCoin`
            )

            await bornCoin.approve(swapInterface.address, 300)
            await swapInterface.swapTokens(amountIn, amountOut)

            const balanceAfterBornCoin = await bornCoin.balanceOf(deployer)
            const balanceAfterGeneCoin = await geneCoin.balanceOf(deployer)

            console.log(
                `balance of borncoin : ${balanceAfterBornCoin.toString()} \nbalance of genecoin: ${balanceAfterGeneCoin.toString()}`
            )
        })
    })
})
