const Aion = artifacts.require("Aion");
const SafeMath = artifacts.require("SafeMath") 
const AionClient = artifacts.require("AionClient")
module.exports = function(deployer) {
  deployer.deploy(Aion);
  deployer.deploy(SafeMath);
  deployer.deploy(AionClient);
  };

