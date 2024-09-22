import Web3 from 'web3'; // Ensure this line is present

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable(); // Request account access
  } catch (error) {
    console.error("User denied account access");
  }
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // Connect to Ganache
}

export default web3;
