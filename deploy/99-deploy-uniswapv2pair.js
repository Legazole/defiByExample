const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying UniswapV2PairInterface on network")

    const uniswapV2PairInterface = await deploy("UniswapV2PairInterface", {
        from: deployer,
        log: true,
    })

    log(`UniswapV2PairInterface deployed at ${uniswapV2PairInterface.address}`)
    log("------------------------------")
}

module.exports.tags = ["uniswappairinterface", "all"]
