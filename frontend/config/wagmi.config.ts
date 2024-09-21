import { getClient, getConnectorClient, type Config } from "@wagmi/core"
import {
  BrowserProvider,
  FallbackProvider,
  JsonRpcProvider,
  JsonRpcSigner,
} from "ethers"
import {
  http,
  type Account,
  type Chain,
  type Client,
  type Transport,
} from "viem"
import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "viem/chains"
import { createConfig } from "wagmi"
import { Web3ProviderConnector } from "./customProvider"

const customProviderConfig = {
  autoConnect: true, // Automatically connect to the last connected wallet
  chains: [
    {
      id: 1, // Ethereum Mainnet
      name: 'Ethereum Mainnet',
      network: 'mainnet',
      rpcUrls: {
        default: 'https://ethereum-rpc.publicnode.com', // Replace with your Infura project ID or another RPC URL
      },
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
    },
    {
      id: 137, // Polygon Mainnet
      name: 'Polygon Mainnet',
      network: 'polygon',
      rpcUrls: {
        default: 'https://polygon-rpc.com/', // Public RPC URL for Polygon Mainnet
      },
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      blockExplorerUrl: 'https://polygonscan.com/', // Block explorer for Polygon Mainnet
    },
  ],
};

export const wagmiConfig = createConfig({
  chains: [mainnet, optimism, base, polygon, sepolia, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
})

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === "fallback") {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network)
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function getEthersProvider(
  config: Config,
  { chainId }: { chainId?: number } = {}
) {
  const client = getClient(config, { chainId })
  if (!client) return
  return clientToProvider(client)
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(
  config: Config,
  { chainId }: { chainId?: number } = {}
) {
  const client = await getConnectorClient(config, { chainId })
  return clientToSigner(client)
}
