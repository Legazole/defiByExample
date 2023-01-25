const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")
const { deployments } = require("hardhat")

describe("ERC20 functionality", function () {
    let geneCoin, bornCoin, deployer
    beforeEach(async function () {
        //get the signer
        deployer = (await getNamedAccounts()).deployer

        //get the contract
        await deployments.fixture(["all"])
        geneCoin = await ethers.getContract("GeneCoin", deployer)
        bornCoin = await ethers.getContract("BornCoin", deployer)
    })
    describe("GeneCoin constructor", async function () {
        let expectedValue = 1000
        it("Should check if the msg.sender gets minted tokens", async function () {
            actualValue = await geneCoin.balanceOf(deployer)
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("Should check if the contract gets minted tokens", async function () {
            actualValue = await geneCoin.balanceOf(geneCoin.address)
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("Should check if owner1 gets minted tokens", async function () {
            actualValue = await geneCoin.balanceOf(geneCoin.owner1())
            assert.equal(actualValue.toString(), expectedValue.toString())
        })
    })
})
