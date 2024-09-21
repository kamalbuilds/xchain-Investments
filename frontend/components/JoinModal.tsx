import React, { useState } from "react"
import { ethers } from "ethers"

import { XChainChitFundContract } from "@/config/PoolFundContract.config"
import { getEthersSigner, wagmiConfig } from "@/config/wagmi.config"
import { PoolFundABI } from "@/lib/ABI"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const JoinModal = ({
  amount,
  poolId,
  poolName,
}: {
  amount?: any
  poolId: number
  poolName: string
}) => {
  console.log("Amount", amount)

  const [depositAmount, setDepositAount] = useState(amount)
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = async () => {
    if (!depositAmount) return

    try {
      const signer = await getEthersSigner(wagmiConfig)
      const contract = new ethers.Contract(
        XChainChitFundContract,
        PoolFundABI,
        signer
      )
      console.log("depositAmount", depositAmount)
      setIsLoading(true)

      const tx = await contract.joinPool(poolId, {
        value: ethers.parseEther(depositAmount), // Convert ETH to wei
      })

      await tx.wait()
      setIsLoading(false)
    } catch (error) {
      console.log("Error in joining pool", error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Join <span className="underline">{poolName}</span>{" "}
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-8 p-12">
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount(in eth)</Label>
            <Input
              type="text"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => {
                setDepositAount(e.target.value)
              }}
            />
          </div>
          <Button onClick={handleJoin} disabled={!depositAmount}>
            {isLoading ? "Joining...." : "Join"}
          </Button>
        </DialogDescription>
      </DialogHeader>
    </>
  )
}

export default JoinModal
