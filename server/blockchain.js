const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Your blockchain node URL

// Sample smart contract interaction function
const storeKYCData = async (data) => {
  // Replace with your contract ABI and address
  const contractABI = [ /* Your Contract ABI */ ];
  const contractAddress = '0xYourContractAddress';
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Convert trustScore to Number if it's BigInt
  await contract.methods.storeData(data.name, data.address, data.idNumber, Number(data.trustScore))
    .send({ from: '0xYourEthereumAddress' });
};

module.exports = { storeKYCData };
