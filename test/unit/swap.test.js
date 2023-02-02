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
        it("swapTokens function", async function () {
            //Check pair reserves

            //await swapInterface.createPair()
            const pairAddress = await swapInterface.PAIRADDRESS()
            console.log(`${pairAddress}`)

            // console.log(
            //     `${(expectedValueA.toString(), expectedValueB.toString())}`
            // )

            const amountIn = 10
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
            //[(amount1, amount2, amount3, amount4)] =
            //    await swapInterface.swapTokens(amountIn, amountOut)
        })
    })
})
