import React from "react"
import { FusionSDK } from "@1inch/fusion-sdk"
import { useAccount } from "wagmi"

import { Button } from "./ui/button"

const FusionSwap = () => {
  const { address, isConnected, chainId } = useAccount()
  const sdk = new FusionSDK({
    url: "https://api.1inch.dev/fusion",
    network: 137,
    authKey: "Bearer okz7YzxXA8DPc7eehhXbolnROttzvKYA",
  })

  const handleGetActiveOrder = async () => {
    const orders = await sdk.getActiveOrders({ page: 1, limit: 2 })

    console.log("Orders", orders)
  }

  const createOrder = async () => {
    // await sdk
    //   .getQuote({
    //     fromTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    //     toTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    //     amount: "50000000000000000", // 0.05 ETH
    //     walletAddress: address as string,
    //     source: "137",
    //   })
    //   .then((res) => {
    //     console.log("Response >>>>", res)
    //   })
    //   .catch((err) => {
    //     console.log("Err", err)
    //   })

    const sourceChain = 137
    const destinationChain = 1
    const srcTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    const dstTokenAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
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
      console.log("Response", response)
      return response.tx
    } catch (error) {
      console.log("Error >>>", error)
    }
  }

  return (
    <div>
      <Button onClick={createOrder}>Create Order</Button>
      <Button onClick={handleGetActiveOrder}>Get Order</Button>
    </div>
  )
}

export default FusionSwap
