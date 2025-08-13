import UniversalProvider from "@walletconnect/universal-provider";

import { optionalNamespaces } from "../config/projectConfig";
interface ActionButtonListProps {
  provider: UniversalProvider | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSession: (session: any) => void;
}

export const ActionButtonList = ({
  provider,
  session,
  setSession,
}: ActionButtonListProps) => {
  const handleDisconnect = async () => {
    try {
      if (!provider) return;
      await provider.disconnect();
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
    return (
      <div>
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

  return (
    <div>
      {session ? (
        <>
          <button onClick={handleDisconnect}>Disconnect</button>
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
