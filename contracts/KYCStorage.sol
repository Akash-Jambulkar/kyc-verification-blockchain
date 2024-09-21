// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract KYCStorage { 
    uint public data;

    // Constructor to initialize data
    constructor(uint _initialData) {
        data = _initialData; // Ensure _initialData is valid
    }

    function setData(uint _data) public {
        data = _data;
    }
}
