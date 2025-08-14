import { ChainNamespace } from "@reown/appkit/networks";
import { AppKit } from "@reown/appkit";
import { useAppKitAccount } from "@reown/appkit/react";
import UniversalProvider from "@walletconnect/universal-provider";
import { Buffer } from "buffer";
import { type Address as EvmAddress } from "viem";
import { useSignMessage } from "wagmi";

import { optionalNamespaces } from "../config/projectConfig";
import { DEFAULT_SUI_METHODS } from "../config/suiConfig";
interface ActionButtonListProps {
  provider: UniversalProvider | undefined;
  appkitModal: AppKit | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSession: (session: any) => void;
}

export const ActionButtonList = ({
  provider,
  appkitModal,
  session,
  setSession,
}: ActionButtonListProps) => {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAppKitAccount(); // AppKit hook to get the address and check if the user is connected

  const handleDisconnect = async () => {
    try {
      if (!provider) return;
      if (appkitModal?.getAccount()?.isConnected) {
        await appkitModal?.disconnect();
      } else {
        await provider.disconnect();
      }

      setSession(null);
      console.log("disconnected");
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  const handleConnect = async () => {
    try {
      if (!provider) {
        throw new Error("Provider is not initialized");
      }
      await provider.connect({
        optionalNamespaces,
      });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const DisplayNamespaceAddresses = ({ namespace }: { namespace: string }) => {
    const addresses = session?.namespaces?.[namespace]?.accounts ?? [];
    const chain = addresses?.[0]?.split(":")?.[0];
    if (!chain) {
      return null;
    }

    return (
      <div className="namespace-addresses">
        <h3>WalletConnect Addresses</h3>
        <h4>{chain}</h4>
        {addresses.map((account: string, index: number) => {
          const accountParts = account.split(":");
          return (
            <div key={`${index}-${account}`}>
              <h4>{accountParts?.[1]}</h4>
              <p>{accountParts?.[2]}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const DisplayAppkitAddresses = ({
    namespace,
  }: {
    namespace: ChainNamespace;
  }) => {
    const address = appkitModal?.getAddressByChainNamespace(namespace);
    if (!address) {
      return null;
    }

    return (
      <div className="namespace-addresses">
        <h3>Injected Address</h3>
        <p>{address}</p>
      </div>
    );
  };

  const handleSignMessage = async () => {
    if (appkitModal?.getIsConnectedState()) {
      const activeNamespace = appkitModal?.getActiveChainNamespace();
      if (activeNamespace === "solana") {
        const solanaProvider = appkitModal?.getProvider("solana");
        if (!solanaProvider || !address) throw Error("user is disconnected");
        const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sig = await (solanaProvider as any).signMessage(encodedMessage);
        const signatureHex = Buffer.from(sig).toString("hex");
        alert(`Message Signature: ${signatureHex}`);
        return;
      }
      if (activeNamespace === "eip155") {
        const msg = "Hello Reown AppKit!"; // message to sign
        const sig = await signMessageAsync({
          message: msg,
          account: address as EvmAddress,
        });
        alert(`Message Signature: ${sig}`);
        return;
      }
      return;
    }

    // on walletconnect use ui - devnet for now
    const message = "Hello Reown AppKit with SUI!"; // message to sign
    try {
      const address = session?.namespaces?.sui?.accounts.find(
        (account: string) => account.includes("sui:devnet")
      );
      if (address) {
        const method = DEFAULT_SUI_METHODS.SUI_SIGN_PERSONAL_MESSAGE;
        const req = {
          address: address,
          message: message,
        };
        const result = await provider!.request<{
          signature: string;
          publicKey: string;
        }>(
          {
            method,
            params: req,
          },
          "sui:devnet"
        );
        alert(`Message Signature: ${result.signature}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Message signing error:", error);

      // Check for specific error types
      const errorMessage = error.message || error.toString();
      console.log("error", errorMessage);
    }
  };

  return (
    <div>
      <button onClick={handleSignMessage}>Sign</button>
      {appkitModal?.getAccount()?.isConnected ||
      session ||
      appkitModal?.getIsConnectedState() ? (
        <>
          <button onClick={handleDisconnect}>Disconnect</button>
          <DisplayAppkitAddresses namespace="eip155" />
          <DisplayAppkitAddresses namespace="solana" />

          <DisplayNamespaceAddresses namespace="sui" />
          <DisplayNamespaceAddresses namespace="eip155" />
          <DisplayNamespaceAddresses namespace="solana" />
          <DisplayNamespaceAddresses namespace="mvx" />

          <br />
        </>
      ) : (
        <button onClick={handleConnect}>Open</button>
      )}
    </div>
  );
};
