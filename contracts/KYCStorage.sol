// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KYCStorage {
    struct KYC {
        string name;
        string addressData;
        string idNumber;
        uint trustScore;
    }

    mapping(address => KYC) public kycRecords;

    event KYCStored(address indexed user, string name, uint trustScore);

    function storeKYC(
        string memory _name, 
        string memory _addressData, 
        string memory _idNumber, 
        uint _trustScore
    ) public {
        kycRecords[msg.sender] = KYC(_name, _addressData, _idNumber, _trustScore);
        emit KYCStored(msg.sender, _name, _trustScore);
    }

    function getKYC(address _user) public view returns (KYC memory) {
        return kycRecords[_user];
    }
}
