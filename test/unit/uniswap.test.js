const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")
const { deployments } = require("hardhat")

describe("UniswapInterface functionality", function () {
    let uniswapInterface, bornCoin, geneCoin, deployer
    beforeEach(async function () {
        deployer = await getNamedAccounts().deployer

        await deployments.fixture["all"]
        uniswapInterface = await ethers.getContract(
            "UniswapInterface",
            deployer
        )
        bornCoin = await ethers.getContract("BornCoin", deployer)
        geneCoin = await ethers.getContract("GeneCoin", deployer)
    })
    describe("functions", async function () {
        it("getContractBornCoin", async function () {
            expectedValue = await bornCoin.balanceOf(uniswapInterface.address)
            actualValue = await uniswapInterface.getContractBornCoin(
                bornCoin.address
            )
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
    })
})
