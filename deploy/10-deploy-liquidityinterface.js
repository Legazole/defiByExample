const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying UniswapInterface on network")

    const uniswapInterface = await deploy("UniswapInterface", {
        from: deployer,
        log: true,
    })

    log(`uniswapinterface deployed at ${uniswapInterface.address}`)
    log("------------------------------")
}

module.exports.tags = ["uniswapinterface", "all"]
