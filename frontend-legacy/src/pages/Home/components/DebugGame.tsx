import { ethers } from "ethers";
import React from "react";
import { useInterval } from "usehooks-ts";
import { getSisyphusContract } from "../../../utils/contracts/Sisyphus";

function useIPSE() {
  return React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
}
export default function DebugGame() {
  const [gameState, setGameState] = React.useState({});
  const [status, setStatus] = useIPSE();
  React.useEffect(() => { fetchGameState(); }, [])
  useInterval(() => fetchGameState(), 10000);

  const fetchGameState = async () => {
    try {
      if (status === 'pending') return;
      if (!window.ethereum) throw new Error('Please install a walletProvider');

      setStatus('pending');
      const contract = getSisyphusContract(window.ethereum as unknown as ethers.providers.ExternalProvider); // TODO: fix me
      const currentPrice = await contract.currentPrice();
      const currentWinner = await contract.currentWinner();

      setGameState((prev) => ({
        ...prev,
        currentPrice,
        currentWinner
      }));
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  return (
    <>
      <pre>
        {JSON.stringify({
          status,
          gameState
        }, null, 4)}
      </pre>
    </>
  )
}
