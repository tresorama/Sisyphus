
import { ethers } from "ethers";

export function getSisyphusContract(walletProvider: ethers.providers.ExternalProvider) {
  if (!walletProvider) throw new Error('A nodeProvider/walletProvider instance is required.')
  const provider = new ethers.providers.Web3Provider(walletProvider);// TODO: fix me
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  debugger;
  return contract;
}

export const contractAddress = process.env.REACT_APP_SISYPHUS_ADDRESS || '';
export const contractABI = JSON.stringify(
  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "PendingParams",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "startingPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timerDuration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "percentRateIncrease",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "percentToBoulder",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "percentToPushers",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "percentToReserve",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastPush",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "boulderAtLastPush",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "boulder",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "startingPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timerDuration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "percentRateIncrease",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "percentToBoulder",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "percentToPushers",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "percentToReserve",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastPush",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "boulderAtLastPush",
              "type": "uint256"
            }
          ],
          "internalType": "struct Sisyphus.GameParams",
          "name": "NewParams",
          "type": "tuple"
        }
      ],
      "name": "changeGameParams",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_game",
          "type": "uint256"
        }
      ],
      "name": "claimWinningsByGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentWinner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "ownerWithdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pushTheBoulder",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reserve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetTheGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
);
