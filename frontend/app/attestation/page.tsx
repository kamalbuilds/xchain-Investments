"use client"

import { EvmChains, SignProtocolClient, SpMode } from "@ethsign/sp-sdk"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useWalletClient } from "wagmi"

import { Button } from "@/components/ui/button"

const AttestationPage = () => {
  const [address, setAddress] = useState<string | null>(null);

  const walletclient = useWalletClient();

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const address = await signer.getAddress()
          setAddress(address)
        } catch (error) {
          console.error("Error connecting to wallet:", error)
        }
      }
    }

    connectWallet()
  }, [])

  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.arbitrumSepolia,
    // walletClient: walletclient
  });

  const handleGetSchema = async () => {
    const res = await client.getSchema("0x27b")
    console.log("Res", res)
  }

  const handleCreateAttestation = async () => {


    // const walletclient = await getWalletClientQueryKey(wagmiConfig)
    console.log("client", client, window.ethereum)


    // const client = new SignProtocolClient(SpMode.OnChain, {
    //   chain: EvmChains.arbitrumSepolia,
    //   walletClient: walletclient
    // });


    const data = {
      poolId: 1,
      walletAddress: address,
      cycle: 1,
      reason: 'Healthcare',
      totalMembers: 5,

    }
    try {
      const response = await client.createAttestation({
        schemaId: "0x27b",
        data,
        indexingValue: "1234",
      })
      console.log("response", response)
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
