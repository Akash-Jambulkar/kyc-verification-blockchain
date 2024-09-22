const KYCStorage = artifacts.require('KYCStorage');

module.exports = function(deployer) {
  deployer.deploy(KYCStorage);
};
