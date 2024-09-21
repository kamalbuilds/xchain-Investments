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
        environmentId: "59fe38c9-daaf-450b-862b-1e7d83b1d90d",
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
