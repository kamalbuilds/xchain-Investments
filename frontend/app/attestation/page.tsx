"use client"

import React, { useEffect, useState } from "react"
import { EvmChains, SignProtocolClient, SpMode } from "@ethsign/sp-sdk"

import { SchemaId } from "@/config/signprotocol.config"
import { wagmiConfig } from "@/config/wagmi.config"
import { Button } from "@/components/ui/button"
import { ethers } from "ethers"
import { walletActions } from "viem"
import { useWalletClient } from 'wagmi';

const AttestationPage = () => {
  const [address, setAddress] = useState<string | null>(null);

    const walletclient = useWalletClient();

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAddress(address);
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      }
    };

    connectWallet();
  }, []);


  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.arbitrumSepolia,
    walletClient: walletclient
  });

  const handleGetSchema = async () => {
    const res = await client.getSchema("0xf4")
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
      name: 'Abhishek',
    }
    try {
      const response = await client.createAttestation({
        schemaId: '0xf4',
        data: { name: 'Abhishek' },
        indexingValue: '1234'
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
