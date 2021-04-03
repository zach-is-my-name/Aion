const Aion = artifacts.require("Aion");
const AionClient = artifacts.require("AionClient")
module.exports = function(deployer, ropsten, accounts ) {
  deployer.deploy(Aion)
  };

