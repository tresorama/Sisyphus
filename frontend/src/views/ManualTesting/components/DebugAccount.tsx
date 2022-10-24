import { useAccount } from "wagmi";

export const DebugAccount = () => {

  /** The currently connected account, likely via wallet provider (i.e. Metamask) */
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
    },
    onDisconnect() {
      console.log('Disconnected');
    },
  });

  return (
    <>
      <h2>Account Data</h2>
      <pre>
        {" "}
        {JSON.stringify({
          account: {
            address: account.address,
            isConnected: account.isConnected,
            isConnecting: account.isConnecting,
            isDisconnected: account.isDisconnected,
            isReconnecting: account.isReconnecting,
            status: account.status,
          },
        }, null, 4)}
      </pre>
    </>
  );
};