import React from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import { contractAddress, contractABI } from '../../../lib/contracts/Sisyphus';
import { useInterval } from "usehooks-ts";

// Utils 
const formatCurrentPrice = (bigNum: ethers.BigNumberish) => {
  const eth = ethers.utils.formatEther(bigNum.toString());
  return `${eth} ETH`;
};

// Type
type GameState = {
  currentPrice: null | {
    bigNumber: ethers.BigNumber,
    ethPretty: string,
  },
  currentWinner: null | string,
};


// Main Component
export const DebugGame = () => {

  const timeBetweenRefetch = 10 * 1000; // seconds
  const countdownState = useCountDownState(timeBetweenRefetch);

  /** The current game state */
  const [gameState, setGameState] = React.useState<GameState>({
    currentPrice: null,
    currentWinner: null
  });

  /** Contract - Read */
  const currentPrice = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'currentPrice',
    onSuccess(data) {
      setGameState(prev => ({
        ...prev,
        currentPrice: {
          bigNumber: data,
          ethPretty: formatCurrentPrice(data),
        }
      }));
    },
  });

  /** Contract - Read */
  const currentWinner = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'currentWinner',
    onSuccess: (data) => { setGameState(prev => ({ ...prev, currentWinner: String(data) })); }
  });

  /** On mount , and every some time, refetch game state */
  useInterval(() => {
    currentPrice.refetch();
    currentWinner.refetch();
    countdownState.restartTimer();
  }, timeBetweenRefetch);


  return (
    <>
      <h2>Game State</h2>
      <h5>Time to next refetch: {Math.floor(countdownState.timeLeft / 1000)} s</h5>
      <pre>
        {JSON.stringify({
          gameState,
          currentPriceFetchStatus: currentPrice.fetchStatus,
          currentPriceStatus: currentPrice.status,
          currentWinnerFetchStatus: currentWinner.fetchStatus,
          currentWinnerStatus: currentWinner.status,
        }, null, 4)}
      </pre>
      {/* 
        <h2>Game Data - Reads Operations</h2>
        <pre>
        {JSON.stringify({ currentPrice }, null, 4)}
      </pre> */}
    </>
  );
};


const useCountDownState = (timeInMs: number) => {
  const [timeLeft, setTimeLeft] = React.useState(timeInMs);
  const intervalRef = React.useRef<undefined | number>();

  const clearTimer = () => clearInterval(intervalRef.current);
  const restartTimer = () => {
    // 1. reset timer
    clearTimer();
    setTimeLeft(timeInMs);
    // 2. register interval
    intervalRef.current = window.setInterval(
      () => {
        setTimeLeft(prev => {
          if (prev === 0) {
            clearTimer();
            return prev;
          }
          return Math.max(0, prev - 1000);
        });
      },
      1000
    );
  };

  React.useEffect(() => {
    restartTimer();
    return () => clearTimer();
  }, []);

  return {
    timeLeft,
    restartTimer
  };

};