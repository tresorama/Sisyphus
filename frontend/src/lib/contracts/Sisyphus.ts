import SisyphusContractArtifact from '../../assets/contracts/Sisyphus.artifact';
import SisyphusContractAddress from '../../assets/contracts/Sisyphus.address.json';
// import { useContract, useProvider, useSigner } from "wagmi";

// 1. Export Contract Artifacts + Address
export const contractAddress = SisyphusContractAddress[1337];
export const contractABI = SisyphusContractArtifact.abi;

// 2. Export helpers for using the contract in the app.
/**
 * React Hooks for the Sisyphus Smart Contract
 * @returns ethers Contract of "Sisyphus" smart contract.
 */
// export function useContractSisyphus({ enableWrite } = { enableWrite: false }) {
//   const provider = useProvider();
//   const { data: signer } = useSigner();
//   const contract = useContract({
//     addressOrName: contractAddress,
//     contractInterface: contractABI,
//     signerOrProvider: enableWrite ? signer : provider,
//   });
//   return contract;
// };
