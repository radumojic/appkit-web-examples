import type { AppKitNetwork } from "@reown/appkit/networks";

// MultiversX Chain definitions - using compatible namespace for AppKit
// cannot use defineChain since Type '"mvx"' is not assignable to type 'ChainNamespace<InternalChainNamespace>'.
const mvxMainnet = {
  id: "1",
  name: "MultiversX Mainnet",
  nativeCurrency: { name: "EGLD", symbol: "EGLD", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.multiversx.com"] },
  },
  blockExplorers: {
    default: {
      name: "MultiversX Explorer",
      url: "https://explorer.multiversx.com",
    },
  },
  slip44: 508,
  chainNamespace: "mvx",
  caipNetworkId: "mvx:1",
};

const mvxTestnet = {
  id: "T",
  name: "MVX Testnet",
  nativeCurrency: { name: "xEGLD", symbol: "xEGLD", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet-api.multiversx.com"] },
  },
  blockExplorers: {
    default: {
      name: "MultiversX Testnet Explorer",
      url: "https://testnet-explorer.multiversx.com",
    },
  },
  slip44: 508,
  chainNamespace: "mvx",
  caipNetworkId: "mvx:T",
};

const mvxDevnet = {
  id: "D",
  name: "MVX Devnet",
  nativeCurrency: { name: "xEGLD", symbol: "xEGLD", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://fullnode.devnet.mvx.io:443"] },
  },
  blockExplorers: {
    default: {
      name: "MultiversX Devnet Explorer",
      url: "https://devnet-explorer.multiversx.com",
    },
  },
  slip44: 508,
  chainNamespace: "mvx",
  caipNetworkId: "mvx:D",
};

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const mvxNetworks = [mvxMainnet, mvxTestnet, mvxDevnet] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

// MultiversX Methods and Events
export enum DEFAULT_MULTIVERSX_METHODS {
  MULTIVERSX_SIGN_TRANSACTION = "mvx_signTransaction",
  MULTIVERSX_SIGN_TRANSACTIONS = "mvx_signTransactions",
  MULTIVERSX_SIGN_MESSAGE = "mvx_signMessage",
  MULTIVERSX_SIGN_LOGIN_TOKEN = "mvx_signLoginToken",
  // MULTIVERSX_SIGN_NATIVE_AUTH_TOKEN = "mvx_signNativeAuthToken", - no need to send the method if not appropriately handled
  MULTIVERSX_CANCEL_ACTION = "mvx_cancelAction",
}
