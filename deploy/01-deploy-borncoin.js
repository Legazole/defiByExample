const { network, getNamedAccounts, deployments } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying borncoin on network");

  const borncoin = await deploy("BornCoin", {
    from: deployer,
    log: true,
  });

  log(`genecoin deployed at ${borncoin.address}`);
  log("------------------------------");
};

module.exports.tags = ["borncoin", "all"];
