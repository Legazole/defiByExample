const { network, getNamedAccounts, deployments } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying genecoin on network");

  const genecoin = await deploy("GeneCoin", {
    from: deployer,
    log: true,
  });

  log(`genecoin deployed at ${genecoin.address}`);
  log("------------------------------");
};

module.exports.tags = ["genecoin", "all"];
