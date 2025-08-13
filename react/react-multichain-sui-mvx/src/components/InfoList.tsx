import { useEffect } from "react";
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from "@reown/appkit/react";

export const InfoList = () => {
  const kitTheme = useAppKitTheme();
  const state = useAppKitState();
  const { address, caipAddress, isConnected, status, embeddedWalletInfo } =
    useAppKitAccount();

  const eip155AccountState = useAppKitAccount({ namespace: "eip155" });
  const solanaAccountState = useAppKitAccount({ namespace: "solana" });
  const suiAccountState = useAppKitAccount({ namespace: "sui" });
  // const mvxAccountState = useAppKitAccount({ namespace: "mvx" });
  //  const bip122AccountState = useAppKitAccount({ namespace: 'bip122' }) // for bitcoin

  const events = useAppKitEvents();
  const { walletInfo } = useWalletInfo();

  useEffect(() => {
    console.log("Events: ", events);
  }, [events]);

  return (
    <>
      <section>
        <h2>All Addresses</h2>
        <pre>
          Address EVM : {eip155AccountState.address}
          <br />
          Addresss Solana: {solanaAccountState.address}
          <br />
          Address Sui : {suiAccountState.address}
          {/* <br />
          Address Mvx : {mvxAccountState.address} */}
        </pre>
      </section>
      <section>
        <h2>useAppKit</h2>
        <pre>
          Address: {address}
          <br />
          caip Address: {caipAddress}
          <br />
          Connected: {isConnected.toString()}
          <br />
          Status: {status}
          <br />
          Account Type: {embeddedWalletInfo?.accountType}
          <br />
          {embeddedWalletInfo?.user?.email &&
            `Email: ${embeddedWalletInfo?.user?.email}\n`}
          {embeddedWalletInfo?.user?.username &&
            `Username: ${embeddedWalletInfo?.user?.username}\n`}
        </pre>
      </section>

      <section>
        <h2>Theme</h2>
        <pre>
          Theme: {kitTheme.themeMode}
          <br />
        </pre>
      </section>

      <section>
        <h2>State</h2>
        <pre>
          activeChain: {state.activeChain}
          <br />
          loading: {state.loading.toString()}
          <br />
          open: {state.open.toString()}
          <br />
          selectedNetworkId: {state.selectedNetworkId?.toString()}
          <br />
        </pre>
      </section>

      <section>
        <h2>WalletInfo</h2>
        <pre>
          Name: {JSON.stringify(walletInfo)}
          <br />
        </pre>
      </section>
    </>
  );
};
