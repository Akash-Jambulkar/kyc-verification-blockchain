const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Blockchain node URL
const contractData = require('C:/Users/akash/OneDrive/Desktop/KYC_Project/build/contracts/KYCStorage.json');

// Sample smart contract interaction function
const storeKYCData = async (data) => {
  // Replace with your contract ABI and address
  const contractABI = contractData.abi;
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const senderAddress = '0x8763f6D27F73300974Fe5862e785885879f20B6f'; // Replace with a funded address from Ganache

  try {
    // Convert trustScore to Number if it's BigInt
    const receipt = await contract.methods.storeData(data.name, data.address, data.idNumber, Number(data.trustScore))
      .send({
        from: senderAddress,
        gas: 1000000, // Set an appropriate gas limit
        gasPrice: web3.utils.toWei('20', 'gwei'), // Set an appropriate gas price
      });

    console.log("Transaction successful:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error in storeKYCData:", error);
    throw error;
  }
};

module.exports = { storeKYCData };
