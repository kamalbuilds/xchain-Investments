"use client"

import { NetworkEnum, SDK } from "1inch-xchain-sdk"
import { useState } from "react"
import { useAccount } from "wagmi"

import FusionSwap from "@/components/fusion.swap"
import { HomePageComponent } from "@/components/home-page"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { address, isConnected, chainId } = useAccount()

  const [quote, setQuote] = useState()
  console.log("chain", chainId)

  const sdk = new SDK({
    url: "https://api.1inch.dev/fusion-plus",
    authKey: "okz7YzxXA8DPc7eehhXbolnROttzvKYA",
  })

  console.log(sdk, "sdk")

  const getQuote = async () => {
    const sourceChain = 1
    const destinationChain = 137
    const srcTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" //WETH
    const dstTokenAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" //USDC
    const amount = "50000000000000000"
    const walletAddress = address

    try {
      const res = await fetch("/api/getQuote", {
        method: "POST",
        body: JSON.stringify({
          sourceChain,
          destinationChain,
          srcTokenAddress,
          dstTokenAddress,
          amount,
          walletAddress,
        }),
      })

      const response = await res.json()
      setQuote(response)
      console.log("Response", response)
      return response.tx
    } catch (error) {
      console.log("Error >>>", error)
    }
  }

  const createorder = async () => {
    const sourceChain = 1
    const destinationChain = 137
    const srcTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" //WETH
    const dstTokenAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" //USDC
    const amount = "50000000000000000"
    const walletAddress = address
    const quoteId = "77d37717-3439-4e44-869f-b1f29b6ab776"

    console.log("quote is >>>>", quote)

    const params = {
      srcChainId: NetworkEnum.ETHEREUM,
      dstChainId: NetworkEnum.GNOSIS,
      srcTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
      dstTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      amount: "1000000000000000000000",
    }

    try {
      const res = await fetch("/api/buildOrder", {
        method: "POST",
        body: JSON.stringify({
          quote: {
            quote,
            walletAddress: "0x9452BCAf507CD6547574b78B810a723d8868C85a",
          },
          secretHashList: [
            "0x315b47a8c3780434b153667588db4ca628526e20000000000000000000000000",
          ],
        }),
      })

      const response = await res.json()
      console.log("Response", response)
      return response.tx
    } catch (error) {
      console.log("Error >>>", error)
    }
  }

  const CreatexchainOrder = async () => {
    const params = {
      srcChainId: 1,
      dstChainId: 137,
      srcTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
      dstTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      amount: "1000000000000000000000",
    }

    try {
      const res = await fetch("/api/fusionOrder", {
        method: "POST",
        body: JSON.stringify({
          quote: {
            quote,
            walletAddress: "0x9452BCAf507CD6547574b78B810a723d8868C85a",
          },
          secretHashList: [
            "0x315b47a8c3780434b153667588db4ca628526e20000000000000000000000000",
          ],
        }),
      })

      const response = await res.json()
      console.log("Response", response)
      return response.tx
    } catch (error) {
      console.log("Error >>>", error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <p>wagmi connected: {isConnected ? "true" : "false"}</p>
        <p>wagmi address: {address}</p>
        <p>wagmi network: {chainId}</p>
      </div>

      <Button onClick={getQuote}>Get Quote</Button>
      <Button onClick={CreatexchainOrder}>Create Order</Button>

      <FusionSwap />

      <HomePageComponent />
    </main>
  )
}
