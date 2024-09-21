"use client"

import React, { useState } from "react"
import { useAccount, useWriteContract } from "wagmi"

import { XChainChitFundContract } from "@/config/PoolFundContract.config"
import { PoolFundABI } from "@/lib/ABI"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ethers } from "ethers"

const CreatePoolsPage = () => {
    const { address } = useAccount()

    const { writeContract } = useWriteContract()

    // PoolParameters state
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
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        console.log("name", name, value);

        setPoolParams((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }



    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        writeContract(
            {
                abi: PoolFundABI,
                address: XChainChitFundContract,
                functionName: "createPool",
                args: [
                    [
                        poolParams.name,
                        poolParams.title,
                        ethers.parseUnits(poolParams.depositAmount.toString(), 'ether'), // Ensure values are BigInt if they represent large numbers
                        poolParams.isAnonymousVoting,
                        BigInt(poolParams.depositPeriodDays),
                        BigInt(poolParams.withdrawPeriodDays),
                        poolParams.distributeRemainingCycle,
                        ethers.parseUnits(poolParams.minBidAmount.toString(), 'ether'), // Convert to BigInt in wei
                        ethers.parseUnits(poolParams.maxBidAmount.toString(), 'ether'), // Convert to BigInt in wei
                        ethers.parseUnits(poolParams.commitmentDeposit.toString(), 'ether'),
                        BigInt(poolParams.penaltyRate),
                        BigInt(poolParams.bidSubmissionDeadline)
                    ],
                ],
            },
            {
                onSuccess: (res) => {
                    console.log("Res", res)
                },
                onError: (err) => {
                    console.log("Err", err)
                },
            }
        )
    }

    return (
        <div>
            <div className="px-12 py-8">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Create Pool
                </h2>
                <form className="pt-8">
                    <div className="flex">
                        <div className="flex flex-1 flex-col gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="name">Pool Name</Label>
                                <Input
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter Pool name"
                                    value={poolParams.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="title">Description</Label>
                                <Input
                                    required
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter Pool description"
                                    value={poolParams.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="depositAmount">Deposit Amount</Label>
                                <Input
                                    required
                                    type="number"
                                    id="depositAmount"
                                    name="depositAmount"
                                    placeholder="Deposit Amount (in wei)"
                                    value={poolParams.depositAmount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="isAnonymousVoting">Anonymous Voting?</Label>
                                <Switch
                                    id="isAnonymousVoting"
                                    checked={poolParams.isAnonymousVoting}
                                    onCheckedChange={(checked) => {
                                        setPoolParams((prev) => ({
                                            ...prev,
                                            isAnonymousVoting: checked,
                                        }))
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="depositPeriodDays">Deposit Period Days</Label>
                                <Input
                                    required
                                    type="number"
                                    id="depositPeriodDays"
                                    name="depositPeriodDays"
                                    placeholder="Deposit Period Days"
                                    value={poolParams.depositPeriodDays}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="withdrawPeriodDays">Withdraw Period Days</Label>
                                <Input
                                    required
                                    type="number"
                                    id="withdrawPeriodDays"
                                    name="withdrawPeriodDays"
                                    placeholder="Withdraw Period Days"
                                    value={poolParams.withdrawPeriodDays}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Label htmlFor="distributeRemainingCycle">
                                    Distribute Remaining Cycle?
                                </Label>
                                <Switch
                                    id="distributeRemainingCycle"
                                    checked={poolParams.distributeRemainingCycle}
                                    onCheckedChange={(checked) => {
                                        setPoolParams((prev) => ({
                                            ...prev,
                                            distributeRemainingCycle: checked,
                                        }))
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="minBidAmount">Min Bid Amount</Label>
                                <Input
                                    required
                                    type="number"
                                    id="minBidAmount"
                                    name="minBidAmount"
                                    placeholder="Min Bid Amount (in wei)"
                                    value={poolParams.minBidAmount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="maxBidAmount">Max Bid Amount</Label>
                                <Input
                                    required
                                    type="number"
                                    id="maxBidAmount"
                                    name="maxBidAmount"
                                    placeholder="Max Bid Amount (in wei)"
                                    value={poolParams.maxBidAmount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="commitmentDeposit">Commitment Deposit</Label>
                                <Input
                                    required
                                    type="number"
                                    id="commitmentDeposit"
                                    name="commitmentDeposit"
                                    placeholder="Commitment Deposit (in wei)"
                                    value={poolParams.commitmentDeposit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="penaltyRate">Penalty Rate</Label>
                                <Input
                                    required
                                    type="number"
                                    id="penaltyRate"
                                    name="penaltyRate"
                                    placeholder="Penalty Rate"
                                    value={poolParams.penaltyRate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="bidSubmissionDeadline">Submission Deadline</Label>
                                <Input
                                    required
                                    type="number"
                                    id="bidSubmissionDeadline"
                                    name="bidSubmissionDeadline"
                                    placeholder="Bid Submission Deadline (days)"
                                    value={poolParams.bidSubmissionDeadline}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleSubmit}>Create Pool</Button>
                </form>
            </div>


        </div>
    )
}

export default CreatePoolsPage
