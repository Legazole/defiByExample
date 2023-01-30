const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")
const { deployments } = require("hardhat")

describe("UniswapInterface functionality", function () {
    let uniswapInterface, bornCoin, geneCoin, deployer, uniswapPairInterface
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer

        await deployments.fixture["all"]
        uniswapInterface = await ethers.getContract(
            "UniswapInterface",
            deployer
        )
        bornCoin = await ethers.getContract("BornCoin", deployer)
        geneCoin = await ethers.getContract("GeneCoin", deployer)
        uniswapPairInterface = await ethers.getContract(
            "UniswapV2PairInterface",
            deployer
        )
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
            const beforeValue = await uniswapInterface.getPairAddress(
                bornCoin.address,
                geneCoin.address
            )
            await uniswapInterface.createUniswapPair(
                bornCoin.address,
                geneCoin.address
            )
            const actualValue = await uniswapInterface.getPairAddress(
                bornCoin.address,
                geneCoin.address
            )
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

            await uniswapPairInterface.setPairAddress(pairAddress.toString())

            const [expectedValueA, expectedValueB] =
                await uniswapPairInterface.getReservesDirectly()

            const [actualValueA, actualValueB] =
                await uniswapInterface.checkPairReserves(
                    bornCoin.address,
                    geneCoin.address
                )
            console.log(
                `expectedValueA: ${expectedValueA},\nactualValueA: ${actualValueA},\nexpectedValueB: ${expectedValueB},\nactualValueB: ${actualValueB}`
            )
        })
        it("checkTotalSupply", async function () {
            const actualValue = await uniswapInterface.checkTotalSupply(
                bornCoin.address,
                geneCoin.address
            )
            console.log(`${actualValue.toString()}`)
        })
        it("addUniswapLiquidity", async function () {
            let amountA = 1100,
                amountB = 1100

            const pairAddress = await uniswapInterface.getPairAddress(
                bornCoin.address,
                geneCoin.address
            )

            await uniswapPairInterface.setPairAddress(pairAddress.toString())

            const totalSupplyBefore =
                await uniswapPairInterface.checkTotalSupply()
            console.log(
                `Total supply before adding liquidity: ${totalSupplyBefore.toString()}`
            )

            await bornCoin.approve(uniswapInterface.address, amountA)
            await geneCoin.approve(uniswapInterface.address, amountB)

            console.log("===== adding liquidity =====")
            await uniswapInterface.addUniswapLiquidity(
                bornCoin.address,
                geneCoin.address,
                amountA,
                amountB,
                { from: deployer }
            )
            console.log("Liquidity added.")

            const totalSupplyAfter =
                await uniswapPairInterface.checkTotalSupply()
            console.log(`Total supply after: ${totalSupplyAfter.toString()}`)
        })
    })
})
