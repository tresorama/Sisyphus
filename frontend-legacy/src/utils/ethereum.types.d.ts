import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum:
    // | ethers.providers.ExternalProvider
    // | ethers.providers.JsonRpcFetchFunc
    | MetaMaskInpageProvider;
  }
}
