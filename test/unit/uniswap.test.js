const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")
const { deployments } = require("hardhat")

describe("UniswapInterface functionality", function () {
    let uniswapInterface, bornCoin, geneCoin, deployer
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer

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
            actualValue = await uniswapInterface.getContractERC20Balance(
                bornCoin.address
            )
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("createUniswapPair", async function () {
            const expectedValue = await uniswapInterface.getPairAddress(
                bornCoin.address,
                geneCoin.address
            )
            const actualValue = await uniswapInterface.createUniswapPair(
                bornCoin.address,
                geneCoin.address
            )
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("mintToAddress", async function () {
            let amount = 100
            const beforeValue = await bornCoin.balanceOf(deployer)
            const expectedValue = parseInt(beforeValue) + parseInt(amount)
            await bornCoin.mintToAddress(deployer, amount)
            const actualValue = await bornCoin.balanceOf(deployer)
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("checkPairReserves", async function () {
            const pairAddress = await uniswapInterface.getPairAddress(
                bornCoin.address,
                geneCoin.address
            )
            const uniswapV2Pair = await ethers.getContractAt(
                "UniswapV2Pair",
                pairAddress.toString(),
                deployer
            )
            const expectedValue = await uniswapV2Pair.getReserves()
            const actualValue = await uniswapInterface.checkPairReserves(
                bornCoin.address,
                geneCoin.address
            )
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        // it("addUniswapLiquidity", async function () {
        //     let amountA = 1100,
        //         amountB = 1100

        //     await bornCoin.approve(uniswapInterface.address, amountA)
        //     await geneCoin.approve(uniswapInterface.address, amountB)
        //     await uniswapInterface.addUniswapLiquidity(
        //         bornCoin.address,
        //         geneCoin.address,
        //         amountA,
        //         amountB,
        //         { from: deployer }
        //     )
        // })
    })
})
