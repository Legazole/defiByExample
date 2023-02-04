const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying swapInterface on network")

    let args = [
        "0x15Ff10fCc8A1a50bFbE07847A22664801eA79E0f",
        "0xAe9Ed85dE2670e3112590a2BB17b7283ddF44d9c",
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
