const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying Uniswap liquidity Interface on network")

    const uniswapInterface = await deploy("UniswapLiquidityInterface", {
        from: deployer,
        log: true,
    })

    log(`uniswap liquidity interface deployed at ${uniswapInterface.address}`)
    log("------------------------------")
}

module.exports.tags = ["liquidityinterface", "all"]
