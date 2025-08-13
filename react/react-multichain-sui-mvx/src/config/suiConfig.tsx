import type { AppKitNetwork } from "@reown/appkit/networks";
import { defineChain } from "@reown/appkit/networks";

// SUI Chain definitions - using compatible namespace for AppKit
const suiMainnet = defineChain({
  id: "mainnet",
  name: "SUI Mainnet",
  nativeCurrency: { name: "SUI", symbol: "SUI", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://fullnode.mainnet.sui.io:443"] },
  },
  blockExplorers: {
    default: { name: "SUI Explorer", url: "https://explorer.sui.io/" },
  },
  chainNamespace: "sui",
  caipNetworkId: "sui:mainnet",
});

const suiTestnet = defineChain({
  id: "testnet",
  name: "SUI Testnet",
  nativeCurrency: { name: "SUI", symbol: "SUI", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://fullnode.testnet.sui.io:443"] },
  },
  blockExplorers: {
    default: {
      name: "SUI Explorer",
      url: "https://explorer.sui.io/?network=testnet",
    },
  },
  chainNamespace: "sui",
  caipNetworkId: "sui:testnet",
});

const suiDevnet = defineChain({
  id: "devnet",
  name: "SUI Devnet",
  nativeCurrency: { name: "SUI", symbol: "SUI", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://fullnode.devnet.sui.io:443"] },
  },
  blockExplorers: {
    default: {
      name: "SUI Explorer",
      url: "https://explorer.sui.io/?network=devnet",
    },
  },
  chainNamespace: "sui",
  caipNetworkId: "sui:devnet",
});

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const suiNetworks = [suiMainnet, suiTestnet, suiDevnet] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

// SUI Methods and Events
export enum DEFAULT_SUI_METHODS {
  SUI_SIGN_TRANSACTION = "sui_signTransaction",
  SUI_SIGN_AND_EXECUTE_TRANSACTION = "sui_signAndExecuteTransaction",
  SUI_SIGN_PERSONAL_MESSAGE = "sui_signPersonalMessage",
}

export enum DEFAULT_SUI_EVENTS {
  SUI_ACCOUNTS_CHANGED = "sui_accountsChanged",
  SUI_CHAIN_CHANGED = "sui_chainChanged",
}
