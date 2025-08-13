import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  useAppKitProvider,
  useAppKitAccount,
} from "@reown/appkit/react";
import { networks } from "../config";
import Provider from "@walletconnect/universal-provider";
import { type Address as EvmAddress } from "viem";
import { useSignMessage } from "wagmi";

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { address } = useAppKitAccount(); // AppKit hook to get the address and check if the user is connected
  const { switchNetwork } = useAppKitNetwork();

  const { walletProvider: solanaWalletProvider } =
    useAppKitProvider<Provider>("solana");

  const { walletProvider: suiProvider } = useAppKitProvider<Provider>("sui");
  console.log("---suiProvider", suiProvider);

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  // SOLANA SIGN MESSAGE
  const handleSignSolanaMsg = async () => {
    if (!solanaWalletProvider || !address) throw Error("user is disconnected");

    const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sig = await (solanaWalletProvider as any).signMessage(encodedMessage);

    const signatureHex = Buffer.from(sig).toString("hex");
    alert(signatureHex);
  };

  // WAGMI SIGN MESSAGE
  const { signMessageAsync } = useSignMessage(); // Wagmi hook to sign a message
  const handleSignEvmMsg = async () => {
    const msg = "Hello Reown AppKit!"; // message to sign
    const sig = await signMessageAsync({
      message: msg,
      account: address as EvmAddress,
    });
    alert(sig);
  };

  return (
    <div>
      <button onClick={() => open({ view: "Connect", namespace: "eip155" })}>
        Open EVM
      </button>
      <button onClick={() => open({ view: "Connect", namespace: "solana" })}>
        Open Solana
      </button>
      <button onClick={() => open({ view: "Connect", namespace: "sui" })}>
        Open Sui
      </button>

      <button onClick={handleSignEvmMsg}>Sign EVM Message</button>
      <button onClick={handleSignSolanaMsg}>Sign Solana Message</button>

      {/* <button onClick={() => open({ view: "Connect", namespace: "mvx" })}>
        Open MultiversX
      </button> */}
      <button onClick={handleDisconnect}>Disconnect</button>
      <button onClick={() => switchNetwork(networks[1])}>Switch</button>
    </div>
  );
};
