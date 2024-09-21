const KYCStorage = artifacts.require("KYCStorage");

module.exports = function(deployer) {
  deployer.deploy(KYCStorage, 0); // Ensure 0 is valid for the constructor
};
