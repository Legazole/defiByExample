const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying swapInterface on network")

    let args = [
        "0x3e661784267f128e5f706de17fac1fc1c9d56f30",
        "0x6732128f9cc0c4344b2d4dc6285bcd516b7e59e6",
    ]
    const uniswapInterface = await deploy("UniswapSwapInterface", {
        from: deployer,
        args: args,
        log: true,
    })

    log(`uniswap swap interface deployed at ${uniswapInterface.address}`)
    log("------------------------------")
}

module.exports.tags = ["swapinterface", "all"]
