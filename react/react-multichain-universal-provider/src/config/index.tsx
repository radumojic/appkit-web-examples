import { createAppKit, AppKit } from "@reown/appkit/react";
import UniversalProvider from "@walletconnect/universal-provider";

import { projectId, metadata, networks } from "./projectConfig";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";

let provider: UniversalProvider | undefined;
let modal: AppKit | undefined;

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter();

export const config = wagmiAdapter.wagmiConfig;

export async function initializeProvider() {
  if (!provider) {
    provider = await UniversalProvider.init({
      projectId,
      metadata,
    });
  }
  return provider;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initializeModal(universalProvider?: any) {
  if (!modal && universalProvider) {
    modal = createAppKit({
      projectId,
      metadata,
      networks,
      adapters: [wagmiAdapter, solanaWeb3JsAdapter],
      universalProvider,
      manualWCControl: false,
      features: {
        analytics: false, // Optional - defaults to your Cloud configuration
      },
    });
  }
  return modal;
}
