import {
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  solanaTestnet,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { suiNetworks } from "./suiConfig";
import { mvxNetworks } from "./mvxConfig";

// Get projectId from https://cloud.reown.com
export const projectId =
  import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://reown.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  solanaTestnet,
  ...suiNetworks,
  ...mvxNetworks,
] as [AppKitNetwork, ...AppKitNetwork[]];

// should be imported dinamically based on networks, support, etc, hardcoded for testing purposes
export const optionalNamespaces = {
  eip155: {
    methods: ["eth_sendTransaction", "personal_sign"],
    chains: [
      "eip155:1",
      "eip155:11155111", // sepolia
      "eip155:42161", // arbitrum
      "eip155:421611", // arbitrum testnet
    ],
    events: ["chainChanged", "accountsChanged"],
  },
  // solana: {
  //   methods: [
  //     "solana_signTransaction",
  //     "solana_signMessage",
  //     "solana_signAndSendTransaction",
  //     "solana_signAllTransactions",
  //   ],
  //   chains: [
  //     "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  //     "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  //     "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  //   ],
  //   events: [],
  // },
  mvx: {
    methods: [
      "mvx_signTransaction",
      "mvx_signTransactions",
      "mvx_signMessage",
      "mvx_signLoginToken",
      "mvx_cancelAction",
    ],
    chains: ["mvx:1", "mvx:D", "mvx:T"],
    events: [],
  },
  sui: {
    methods: [
      "sui_signTransaction",
      "sui_signAndExecuteTransaction",
      "sui_signPersonalMessage",
    ],
    chains: ["sui:mainnet", "sui:testnet", "sui:devnet"],
    events: ["sui_accountsChanged", "sui_chainChanged"],
  },
  // stacks: {
  //   methods: ["stx_transferStx", "stx_signMessage"],
  //   chains: [
  //     "stacks:1",
  //     "stacks:2147483648", // stackks testnet
  //   ],
  //   events: ["stx_chainChanged", "stx_accountsChanged"],
  // },
};
