import { RainbowKitConfiguredProvider } from "../../lib/rainbowkit-setup/rainbow-kit.setup";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import { DebugGame } from "./components/DebugGame";
import { DebugAccount } from "./components/DebugAccount";
import { ButtonPushTheBoulder } from "./components/ButtonPushTheBoulder";


export const ManualTesting = () => (
  <>
    <RainbowKitConfiguredProvider>
      <Nested />
    </RainbowKitConfiguredProvider>
  </>
);

function Nested() {

  /** The currently connected account, likely via wallet provider (i.e. Metamask) */
  const account = useAccount();

  return (
    <>
      <style>{`
      .manual-testing {
        max-width: 60em;
        margin: 0 auto;
        padding: 3rem 2rem
      }
      .manual-testing__section {
        margin-top: 2rem;
        padding: 1rem 2rem;
        border: 10px double hsl(0, 0%, 77%);
      }
      `}
      </style>

      <div className="manual-testing">

        {/* CONNECT BUTTON + DEBUG WALLET */}
        <div className="manual-testing__section">
          <ConnectButton />
          <DebugAccount />
        </div>

        {/* DEBUG GAME */}
        <div className="manual-testing__section">
          <DebugGame />
        </div>

        {/* CONTRACT ACTION - PUSH */}
        <div className="manual-testing__section">
          {account.isConnected && <ButtonPushTheBoulder />}
        </div>

      </div>
    </>
  );
}
