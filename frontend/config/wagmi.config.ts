import { http } from "viem"
import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "viem/chains"
import { createConfig } from "wagmi"

export const wagmiConfig = createConfig({
  chains: [mainnet, optimism, base, polygon, sepolia, baseSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
})
