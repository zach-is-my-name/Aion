const Aion = artifacts.require("Aion");
const SafeMath = artifacts.require("SafeMath") 
const AionClient = artifacts.require("AionClient")
module.exports = function(deployer, ropsten, accounts ) {
  deployer.deploy(SafeMath, {from: accounts[9]});
  deployer.deploy(Aion, {from: accounts[9]}).then(function() {
    return deployer.deploy(AionClient, Aion.address, {from: accounts[9]})});
  };

