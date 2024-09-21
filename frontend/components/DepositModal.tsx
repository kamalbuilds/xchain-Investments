import React, { useState } from "react"
import { useAccount, useWalletClient } from "wagmi"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  baseTokens,
  blockchains,
  ethereumTokens,
  polygonTokens,
} from "@/config/1inch.config"

import { BigNumberish } from "ethers"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

// Define the types for the tokens
interface Token {
  token: string
  tokenAddress: string
  decimals: number
}

interface DepositModalProps {
  poolId: number | BigNumberish
  poolName: string
}

const DepositModal: React.FC<DepositModalProps> = ({ poolId, poolName }) => {
  const { address } = useAccount()
  const [depositAmount, setDepositAmount] = useState<string>("")
  const [amountout, setAmountOut] = useState<string>("")

  const [sourceChain, setSourceChain] = useState<string>("")
  const [sourceToken, setSourceToken] = useState<string>("")

    const [destinationChain, setDestinationChain] = useState<string>("")
    const [destinationToken, setDestinationToken] = useState<string>("")

    const { data: client } = useWalletClient()



    const handleDeposit = async () => {
        try {
            console.log("client", client);

            const sourceTokenData = selectedSourceTokens.find(
                (token: Token) => token.token === sourceToken
            )
            console.log("SourceTokenAddress", sourceTokenData)

      const destinationTokenData = selectedDestinationTokens.find(
        (token: Token) => token.token === destinationToken
      )
      console.log("DestinationTokenAddress", destinationTokenData)

      console.log("Address", address, depositAmount)

      if (!sourceTokenData) {
        throw new Error("Source token data not found")
      }
      if (!destinationTokenData) {
        throw new Error("Destination token data not found")
      }

      const tokenAmount = Number(depositAmount) * 10 ** sourceTokenData.decimals
      console.log("tokenAmount", tokenAmount)

            const res = await fetch("/api/fusionOrder", {
                method: "POST",
                body: JSON.stringify({
                    sourceChain,
                    destinationChain,
                    srcTokenAddress: sourceTokenData.tokenAddress,
                    dstTokenAddress: destinationTokenData.tokenAddress,
                    amount: tokenAmount,
                    walletAddress: address,
                    client,
                }),
            })

      const response = await res.json()
      console.log("Response", response)
    } catch (error) {
      console.log("Error in swapping from 1inch", error)
    }
  }

  // Define ChainId type
  type ChainId = "1" | "137" | "8453"

  // Mapping of blockchain IDs to token arrays
  const tokensByBlockchain: Record<ChainId, Token[]> = {
    "1": ethereumTokens,
    "137": polygonTokens,
    "8453": baseTokens,
  }

  // Get selected tokens based on chains
  const selectedSourceTokens = tokensByBlockchain[sourceChain as ChainId] || []
  const selectedDestinationTokens = tokensByBlockchain[destinationChain as ChainId] || []

  const handleGetQuote = async () => {
    try {
      const sourceTokenData = selectedSourceTokens.find(
        (token: Token) => token.token === sourceToken
      )
      console.log("SourceTokenAddress", sourceTokenData)

      const destinationTokenData = selectedDestinationTokens.find(
        (token: Token) => token.token === destinationToken
      )
      console.log("DestinationTokenAddress", destinationTokenData)

      const tokenAmount = Number(depositAmount) * 10 ** (sourceTokenData?.decimals || 0)
      console.log("tokenAmount", tokenAmount)

      const res = await fetch("/api/getQuote", {
        method: "POST",
        body: JSON.stringify({
          sourceChain,
          destinationChain,
          srcTokenAddress: sourceTokenData?.tokenAddress,
          dstTokenAddress: destinationTokenData?.tokenAddress,
          amount: tokenAmount,
          walletAddress: address,
        }),
      })

      const response = await res.json()
      console.log("Response", response)
      if (response.dstTokenAmount) {
        const dstAmount = response.dstTokenAmount / (10 ** (destinationTokenData?.decimals || 0))
        console.log("Dst Amount", dstAmount)
        setAmountOut(dstAmount.toString())
      }
    } catch (error) {
      console.log("Error in fetching quote", error)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Deposit to <span className="underline">{poolName}</span>
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-8 p-12">
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="text"
              id="amount"
              placeholder="Enter Amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
          </div>

          {/* Source Chain and Token Selection */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <Label>Src Chain</Label>
                <Select onValueChange={(value) => setSourceChain(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Source Chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Blockchains</SelectLabel>
                      {blockchains.map((blockchain) => (
                        <SelectItem key={blockchain.chainId} value={blockchain.chainId}>
                          {blockchain.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <Label>Src Token</Label>
                <Select onValueChange={(value) => setSourceToken(value)} disabled={!sourceChain}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Source Token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tokens</SelectLabel>
                      {selectedSourceTokens.map((token: Token) => (
                        <SelectItem key={token.tokenAddress} value={token.token}>
                          {token.token}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Destination Chain and Token Selection */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <Label>Dst Chain</Label>
                <Select onValueChange={(value) => setDestinationChain(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Destination blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Blockchains</SelectLabel>
                      {blockchains.map((blockchain) => (
                        <SelectItem key={blockchain.chainId} value={blockchain.chainId}>
                          {blockchain.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <Label>Dst Token</Label>
                <Select onValueChange={(value) => setDestinationToken(value)} disabled={!destinationChain}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Destination token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tokens</SelectLabel>
                      {selectedDestinationTokens.map((token: Token) => (
                        <SelectItem key={token.tokenAddress} value={token.token}>
                          {token.token}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amountOut">Amount Out</Label>
            <Input
              type="text"
              id="amountOut"
              placeholder="Amount Out"
              value={amountout}
              readOnly
            />
          </div>
          <Button onClick={handleGetQuote}>Get Quote</Button>
          <Button onClick={handleDeposit} disabled={!depositAmount}>
            Deposit
          </Button>
        </DialogDescription>
      </DialogHeader>
    </>
  )
}

export default DepositModal
