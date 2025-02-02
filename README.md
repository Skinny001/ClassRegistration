# School Manager DApp
contract Address 0x7F226AA1913daD6F319beDcf619F95d1F1c18A5b
# Overview
The School Manager DApp is a decentralized application built on Ethereum that allows users to manage student records using a blockchain-based smart contract. Users can connect their MetaMask wallet, register students, retrieve student information, and remove student records.
# Features
* Connect Wallet: Users can connect their MetaMask wallet to interact with the smart contract.

* Register Student: Allows users to register students with a name and roll number.

* Get Student Details: Users can fetch student details by entering the roll number.

* Remove Student: Enables users to remove a student from the system.

 # Technologies Used
* React
* TypeScript
* MetaMask for wallet connection
* Solidity (Smart Contract)
* Tailwind CSS for styling

  # Installation
# Prerequisites
* MetaMask extension installed
* Node.js and npm installed

  # steps

 *  Clone the repository: git clone https://github.com/your-username/school-manager-dapp.git
 * Navigate to the project folder: cd school-manager-dapp
 * Install dependencies: npm install
 * Start the development server: npm run dev

   # Smart Contract Setup
* Deploy your Solidity smart contract to an Ethereum testnet (e.g., Sepolia, Goerli) using Remix or Hardhat.
* Replace YOUR_CONTRACT_ADDRESS in App.tsx with your deployed contract address.
* Ensure abi.json contains the correct ABI from your compiled contract.

  # Usage
* Open the application in a browser.
* Click on Connect Wallet to connect MetaMask.
* Use the forms to register, retrieve, or remove student records.

  # Troubleshooting
# Wallet Not Connecting?
Ensure MetaMask is installed and connected to the correct network.
Check the browser console for any errors.
# Transaction Failing?
Ensure the connected wallet has enough ETH for gas fees.
Verify the smart contract address and ABI.

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
