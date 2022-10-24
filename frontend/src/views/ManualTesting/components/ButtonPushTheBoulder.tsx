import React from 'react';
import { ethers } from 'ethers';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { contractAddress, contractABI } from '../../../lib/contracts/Sisyphus';

export const ButtonPushTheBoulder = () => {

  // Contract - Read
  const currentPrice = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'currentPrice',
  });

  // Contract-  Write
  const pushPrepare = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'pushTheBoulder',
    enabled: currentPrice.isFetched,
    overrides: {
      value: currentPrice.data,
    }
  });
  const push = useContractWrite(pushPrepare.config);
  const pushResult = useWaitForTransaction({
    hash: push.data?.hash,
  });


  function handlePushTheBoulderClick() {
    push.write?.();
  }

  return (
    <div>
      <h2>PushTheBoulder Button</h2>
      <pre>
        {JSON.stringify({
          currentPrice: currentPrice.data,
          currentPricePretty: ethers.utils.formatEther(currentPrice.data || '0')
        }, null, 4)}
      </pre>
      <button
        disabled={!push.write || pushResult.isLoading}
        onClick={handlePushTheBoulderClick}>
        {pushResult.isLoading ? 'Pushing...' : 'Push'}
      </button>

      {(pushPrepare.isLoading) && <div style={{ color: 'orange' }}>pushPrepare loading.....</div>}
      {(push.isLoading) && <div style={{ color: 'orange' }}>push loading.....</div>}
      {(pushResult.isLoading) && <div style={{ color: 'orange' }}>pushResult loading.....</div>}
      {/* {(push.isLoading || pushResult.isLoading) && (
        <div style={{ color: 'orange' }}>Loading.....</div>
      )} */}

      {pushPrepare.isSuccess && <div style={{ color: 'green' }}>pushPrepare success!</div>}
      {push.isSuccess && <div style={{ color: 'green' }}>push success!</div>}
      {pushResult.isSuccess && <div style={{ color: 'green' }}>pushResult success!</div>}
      {/* {pushResult.isSuccess && (
        <div style={{ color: 'green' }}>Successfully Pushed!</div>
      )} */}

      {pushPrepare.isError && <div style={{ color: 'red' }}>pushPrepare fail!</div>}
      {push.isError && <div style={{ color: 'red' }}>push fail!</div>}
      {pushResult.isError && <div style={{ color: 'red' }}>pushResult fail!</div>}
      {(pushPrepare.isError || push.isError || pushResult.isError) && (
        <div>
          <span style={{ color: 'red' }}>Error while Pushing :</span>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {(pushPrepare.error || push.error || pushResult.error)?.message}
          </pre>
        </div>
      )}

    </div>
  );

};
