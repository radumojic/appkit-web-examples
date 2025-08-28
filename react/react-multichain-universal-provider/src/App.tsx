import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UniversalProvider from "@walletconnect/universal-provider";
import { WagmiProvider } from "wagmi";

import { ActionButtonList } from "./components/ActionButtonList";

import { initializeModal, initializeProvider, wagmiAdapter } from "./config";

import "./App.css";
import { AppKit } from "@reown/appkit";

const queryClient = new QueryClient();

export function App() {
  const [provider, setProvider] = useState<UniversalProvider>();
  const [appkitModal, setAppkitModal] = useState<AppKit>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>();
  useEffect(() => {
    const init = async () => {
      const dataProvider = await initializeProvider();
      setProvider(dataProvider);
      const modal = initializeModal(dataProvider);
      setAppkitModal(modal);
      if (dataProvider.session) {
        // check if there is a session
        console.log("dataProvider.session", dataProvider.session);
        setSession(dataProvider.session);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handleDisplayUri = (uri: string) => {
      appkitModal?.open({ uri, view: "Connect" });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleConnect = async (session: any) => {
      console.log("session", session);
      setSession(session.session);
      await appkitModal?.close();
    };

    provider?.on("display_uri", handleDisplayUri);
    provider?.on("connect", handleConnect);

    return () => {
      provider?.removeListener("connect", handleConnect);
      provider?.removeListener("display_uri", handleDisplayUri);
    };
  }, [provider, appkitModal]);

  return (
    <div className={"pages"}>
      <img
        src="/reown.svg"
        alt="Reown"
        style={{ width: "150px", height: "150px" }}
      />
      <h1>AppKit Wagmi+Solana + Universal Provider Sui React dApp Example</h1>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ActionButtonList
            setSession={setSession}
            session={session}
            appkitModal={appkitModal}
            provider={provider}
          />
          <div className="advice">
            <p>
              This projectId only works on localhost. <br />
              Go to{" "}
              <a
                href="https://cloud.reown.com"
                target="_blank"
                className="link-button"
                rel="Reown Cloud"
              >
                Reown Cloud
              </a>{" "}
              to get your own.
            </p>
          </div>
          {/* <InfoList /> */}
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;
