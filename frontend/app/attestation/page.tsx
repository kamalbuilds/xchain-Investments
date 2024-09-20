"use client"

import React from "react"
import { EvmChains, SignProtocolClient, SpMode } from "@ethsign/sp-sdk"
import { getWalletClient } from "@wagmi/core"
import { ethers, parseEther, parseUnits } from "ethers"
import { useAccount, useWalletClient } from "wagmi"

import { SchemaId } from "@/config/signprotocol.config"
import { wagmiConfig } from "@/config/wagmi.config"
import { Button } from "@/components/ui/button"

const AttestationPage = () => {
  const result = useWalletClient()
  const { address } = useAccount()
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia,
    // account: result,
  })

  const handleGetSchema = async () => {
    const res = await client.getSchema("0x2c2")
    console.log("Res", res)
  }

  const handleCreateAttestation = async () => {
    const walletclient = await getWalletClient(wagmiConfig)
    console.log("wallet client", walletclient)

    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.baseSepolia,
      walletClient: walletclient,
    })

    console.log("Address", address)
    console.log("client", client)
    if (!address) return
    const data = {
      threshold: 1,
    }
    try {
      const res = await client.createAttestation({
        schemaId: "0x2c2",
        data,
        indexingValue: `xxx`,
      })
      console.log("Res", res)
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <div>
      <Button onClick={handleCreateAttestation}>Create Attestation</Button>
      <Button onClick={handleGetSchema}>Get schema</Button>
    </div>
  )
}

export default AttestationPage
