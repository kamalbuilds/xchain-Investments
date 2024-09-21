"use client"

import { ethers } from "ethers"
import { useState } from "react"
import { useWriteContract } from "wagmi"

import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { XChainChitFundContract } from "@/config/PoolFundContract.config"
import { PoolFundABI } from "@/lib/ABI"

import { AnonymitySettings } from "./AnonymitySettings"
import { GovernanceSettings } from "./GovernanceSettings"

export function PoolForm() {
  const [poolParams, setPoolParams] = useState({
    name: "",
    title: "",
    depositAmount: 0,
    isAnonymousVoting: false,
    depositPeriodDays: 0,
    withdrawPeriodDays: 0,
    distributeRemainingCycle: false,
    minBidAmount: 0,
    maxBidAmount: 0,
    commitmentDeposit: 0,
    penaltyRate: 0,
    bidSubmissionDeadline: 0,
  })

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    console.log("name", name, value)

    setPoolParams((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const { writeContract } = useWriteContract()

  const handleCreatePool = async (value: any) => {
    console.log("value", value)
    writeContract(
      // @ts-ignore
      {
        abi: PoolFundABI,
        address: XChainChitFundContract,
        functionName: "createPool",
        args: [
          [
            poolParams.name,
            poolParams.title,
            ethers.parseUnits(poolParams.depositAmount.toString(), "ether"), // Ensure values are BigInt if they represent large numbers
            poolParams.isAnonymousVoting,
            BigInt(poolParams.depositPeriodDays),
            BigInt(poolParams.withdrawPeriodDays),
            poolParams.distributeRemainingCycle,
            ethers.parseUnits(poolParams.minBidAmount.toString(), "ether"), // Convert to BigInt in wei
            ethers.parseUnits(poolParams.maxBidAmount.toString(), "ether"), // Convert to BigInt in wei
            ethers.parseUnits(poolParams.commitmentDeposit.toString(), "ether"),
            BigInt(poolParams.penaltyRate),
            BigInt(poolParams.bidSubmissionDeadline),
          ],
        ],
      },
      {
        onSuccess: (res: any) => {
          console.log("Res", res)
        },
        onError: (err: any) => {
          console.log("Err", err)
        },
      }
    )
  }

  return (
    <div>
      <div className="space-y-6">
        <FormField
          label="Pool Title"
          id="pool-title"
          placeholder="Enter pool title"
          name="name"
          value={poolParams.name}
          onChange={handleChange}
        />
        <FormField
          label="Pool Description"
          id="pool-description"
          type="textarea"
          placeholder="Describe your pool"
          name="title"
          value={poolParams.title}
          onChange={handleChange}
        />
        <FormField
          label="Deposit Amount"
          id="deposit-amount"
          type="number"
          name="depositAmount"
          placeholder="Enter amount to deposit (in USD)"
          value={poolParams.depositAmount}
          onChange={handleChange}
        />
        <AnonymitySettings
          poolParams={poolParams}
          setPoolParams={setPoolParams}
          handleChange={handleChange}
        />
        <GovernanceSettings
          poolParams={poolParams}
          setPoolParams={setPoolParams}
          handleChange={handleChange}
        />
        <Button type="submit" className="w-full" onClick={handleCreatePool}>
          Create Pool
        </Button>
      </div>
    </div>
  )
}
