"use client"

import React, { ReactNode } from "react"
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core"
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"

import { wagmiConfig } from "@/config/wagmi.config"

const queryClient = new QueryClient()

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "8b440de3-16a6-46d2-a84b-91d64c40629e",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}

export default Provider
