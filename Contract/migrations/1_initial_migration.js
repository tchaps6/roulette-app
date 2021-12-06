const RandomNumberConsumer = artifacts.require("RandomNumberConsumer");

module.exports = function (deployer) {
  deployer.deploy(RandomNumberConsumer);
};