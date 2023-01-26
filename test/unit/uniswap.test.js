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
        it("createUniswapPair", async function () {
            let amountA = 1000,
                amountB = 1000
            await bornCoin.approve(uniswapInterface.address, amountA)
            await geneCoin.approve(uniswapInterface.address, amountB)
            let tx = await uniswapInterface.createUniswapPair(
                bornCoin.address,
                geneCoin.address,
                amountA,
                amountB,
                { from: deployer }
            )
            console.log("===== adding liquidity =====")
            for (const log of tx.logs) {
                console.log(`${log.args.message} ${log.args.val}`)
            }
        })
    })
})
