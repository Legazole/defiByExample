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
            expectValue = bornCoin.address
            actualValue = await swapInterface.getBornCoinAddress()
            assert.equal(expectValue.toString(), actualValue.toString())
        })
    })
})
