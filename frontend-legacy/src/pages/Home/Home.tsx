import { ethers } from "ethers";
import React from "react";

import { getSisyphusContract } from '../../utils/contracts/Sisyphus';

import DebugGame from "./components/DebugGame";
import PleaseInstallMetaMask from "./components/PleaseInstallMetaMask";

function useIPSE() {
  return React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
}

function useWallet() {
  const [walletProvider, setWalletProvider] = React.useState<typeof window.ethereum | null>();
  const [walletAddress, setWalletAddress] = React.useState('');

  function checkIfWalletProviderIsInstalled() {
    setWalletProvider(window.ethereum);
  }

  React.useEffect(() => {
    checkIfWalletProviderIsInstalled();
  }, [])

  React.useEffect(() => {
    (async function checkIfMetamaskIsConnected() {
      if (!walletProvider) return; // Please install Metamask
      const accounts = await walletProvider.request({ method: 'eth_accounts' });
      setWalletAddress(Array.isArray(accounts) ? accounts[0] : '');
    })();
  }, [walletProvider]);

  React.useEffect(() => {
    if (!walletProvider) return; // Metamask not installed

    function registerWalletProviderEventsListeners() {
      try {
        if (!walletProvider) return; // Please install Metamask

        const walletAddressChangedHandler = (...args: unknown[]) => {
          const [accounts] = args;
          console.log('accountsChanged');
          console.log(accounts);
          if (Array.isArray(accounts)) setWalletAddress(accounts[0]);
        };
        walletProvider.on('accountsChanged', walletAddressChangedHandler);
        const removeListeners = () => {
          walletProvider.removeListener('accountsChanged', walletAddressChangedHandler);
        }
        return removeListeners;
      } catch (error) {
        console.error(error)
      }
    }

    const removeListeners = registerWalletProviderEventsListeners();
    return () => removeListeners?.();
  }, [walletProvider]);


  async function connectWallet() {
    try {
      if (!walletProvider) return; // Please install Metamask
      const accounts = await walletProvider.request({ method: 'eth_requestAccounts' });
      setWalletAddress(Array.isArray(accounts) ? accounts[0] : '');
    } catch (error) {
      console.error(error);
      setWalletAddress('');
    }
  }

  return {
    walletProvider,
    walletAddress,
    connectWallet: React.useCallback(connectWallet, [walletProvider]),
  }
}


export default function Home() {

  const {
    walletProvider,
    walletAddress,
    connectWallet,
  } = useWallet();
  const walletIsConnected = !!walletAddress;
  const [pushFetchStatus, setPushFetchStatus] = useIPSE();

  const onPushTheBoulderClick = async () => {
    try {
      if (pushFetchStatus === 'pending') return;// Avoid over fetch
      if (!walletIsConnected) throw new Error('You must be connected with a Wallet.');

      setPushFetchStatus('pending');
      // Init the Smart Contract object
      const sisyphusContract = getSisyphusContract(walletProvider as unknown as ethers.providers.ExternalProvider);// TODO: fix me

      // Check current price
      const currentWinner = await sisyphusContract.currentWinner();
      const currentPrice = await sisyphusContract.currentPrice();

      console.log({
        currentWinner,
        currentPrice,
      });

      const pushResult = await sisyphusContract.pushTheBoulder({ value: currentPrice });
      console.log({ pushResult });

      setPushFetchStatus('success');
    } catch (error) {
      console.error(error);
      setPushFetchStatus('error');
    }

  }

  return (
    <>
      <div style={{
        maxWidth: "60em",
        margin: '0 auto',
        padding: '6rem 2rem'
      }}>

        <p>
          {/* DEBUG GAME */}
          <DebugGame />
        </p>

        {/* DEBUG WALLET*/}
        <p>
          <pre>
            Live Details
            {" "}
            {JSON.stringify({
              walletProviderIsTrue: !!walletProvider,
              walletAddress,
              pushFetchStatus,
            }, null, 4)}
          </pre>
        </p>

        {/* PLEASE INSTALL METAMASK */}
        {!walletProvider && <PleaseInstallMetaMask />}

        <p>
          {/* CONNECT BUTTON */}
          {walletIsConnected ? (
            <span>
              You are connected as:{" "}
              {
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
              }
            </span>
          ) : (
            <button type="button" onClick={connectWallet}>
              <span>Connect Wallet</span>
            </button>
          )}
        </p>

        <p>
          {/* CONTRACT ACTION - PUSH */}
          <button type="button" disabled={!walletIsConnected} onClick={onPushTheBoulderClick} >
            <span>PUSH</span>
          </button>
        </p>

      </div>
    </>
  )
}

