'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Award, Clock } from "lucide-react"
import { useEffect, useState } from 'react'

// Mock data and functions (replace with actual data fetching and contract interactions)
const mockPoolData = {
  poolId: 1,
  name: "Community Savings Pool",
  title: "Help each other grow financially",
  depositAmount: 100,
  isAnonymousVoting: true,
  depositPeriodDays: 30,
  withdrawPeriodDays: 5,
  distributeRemainingCycle: true,
  valueStored: 1000,
  minBidAmount: 50,
  maxBidAmount: 200,
  commitmentDeposit: 10,
  penaltyRate: 5,
  memberCount: 10,
  bidSubmissionDeadline: Date.now() + 86400000, // 24 hours from now
  currentCycle: 3
}

const mockBids = [
  { id: 1, bidder: "0x1234...5678", amount: 150, votes: 3, reason: "Home renovation" },
  { id: 2, bidder: "0x5678...9012", amount: 180, votes: 2, reason: "Medical expenses" },
  { id: 3, bidder: "0x9012...3456", amount: 120, votes: 1, reason: "Education fees" },
]

const mockLastWinners = [
  { walletAddress: "0xabcd...ef01", amountWithdraw: 500, voteCount: 5, reason: "Business expansion", RepaymentPeriod: "6 months", PeriodicCycleNumber: 2, totalMembers: 10 },
  { walletAddress: "0x2345...6789", amountWithdraw: 450, voteCount: 4, reason: "Debt consolidation", RepaymentPeriod: "5 months", PeriodicCycleNumber: 1, totalMembers: 10 },
]

const mockUserData = {
  address: "0x1234...5678",
  totalContributions: 300,
  totalWinnings: 500,
  totalPenalties: 0,
  isActive: true
}

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function PoolDetails({ pool }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pool.name}</CardTitle>
        <CardDescription>{pool.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Deposit Amount</Label>
            <p>{pool.depositAmount} ETH</p>
          </div>
          <div>
            <Label>Total Value</Label>
            <p>{pool.valueStored} ETH</p>
          </div>
          <div>
            <Label>Members</Label>
            <p>{pool.memberCount}</p>
          </div>
          <div>
            <Label>Current Cycle</Label>
            <p>{pool.currentCycle}</p>
          </div>
          <div>
            <Label>Deposit Period</Label>
            <p>{pool.depositPeriodDays} days</p>
          </div>
          <div>
            <Label>Withdraw Period</Label>
            <p>{pool.withdrawPeriodDays} days</p>
          </div>
          <div>
            <Label>Min Bid</Label>
            <p>{pool.minBidAmount} ETH</p>
          </div>
          <div>
            <Label>Max Bid</Label>
            <p>{pool.maxBidAmount} ETH</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BidsList({ bids, onVote }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Bids</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {bids.map((bid) => (
            <li key={bid.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{formatAddress(bid.bidder)}</p>
                <p className="text-sm text-muted-foreground">{bid.amount} ETH</p>
                <p className="text-xs text-muted-foreground">{bid.reason}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{bid.votes} votes</span>
                <Button size="sm" onClick={() => onVote(bid.id)}>Vote</Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function UserActions({ pool, user }) {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [bidAmount, setBidAmount] = useState("")

  const handleDeposit = () => {
    // Implement deposit logic
    console.log("Depositing", depositAmount)
  }

  const handleWithdraw = () => {
    // Implement withdraw logic
    console.log("Withdrawing", withdrawAmount)
  }

  const handleBid = () => {
    // Implement bid logic
    console.log("Bidding", bidAmount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deposit">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="bid">Bid</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="depositAmount">Amount to Deposit</Label>
                <Input
                  id="depositAmount"
                  placeholder="0.00"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleDeposit} className="w-full">Deposit</Button>
            </div>
          </TabsContent>
          <TabsContent value="withdraw">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdrawAmount">Amount to Withdraw</Label>
                <Input
                  id="withdrawAmount"
                  placeholder="0.00"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleWithdraw} className="w-full">Withdraw</Button>
            </div>
          </TabsContent>
          <TabsContent value="bid">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bidAmount">Bid Amount</Label>
                <Input
                  id="bidAmount"
                  placeholder="0.00"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleBid} className="w-full">Submit Bid</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function LastWinners({ winners }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2" />
          Last Winners
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {winners.map((winner, index) => (
            <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{formatAddress(winner.walletAddress)}</p>
                  <p className="text-sm text-muted-foreground">{winner.amountWithdraw} ETH</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">Details</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Votes: {winner.voteCount}</p>
                      <p>Reason: {winner.reason}</p>
                      <p>Repayment: {winner.RepaymentPeriod}</p>
                      <p>Cycle: {winner.PeriodicCycleNumber}</p>
                      <p>Total Members: {winner.totalMembers}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Progress value={(winner.voteCount / winner.totalMembers) * 100} className="h-2" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function TimeRemaining({ deadline }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = deadline - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft("Expired")
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2" />
          Time Remaining
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{timeLeft}</p>
        <Progress value={75} className="mt-2" />
      </CardContent>
    </Card>
  )
}

function UserStats({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Total Contributions</Label>
            <p>{user.totalContributions} ETH</p>
          </div>
          <div>
            <Label>Total Winnings</Label>
            <p>{user.totalWinnings} ETH</p>
          </div>
          <div>
            <Label>Total Penalties</Label>
            <p>{user.totalPenalties} ETH</p>
          </div>
          <div>
            <Label>Status</Label>
            <p>{user.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PoolPageComponent() {
  const handleVote = (bidId) => {
    // Implement voting logic
    console.log("Voting for bid", bidId)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pool Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PoolDetails pool={mockPoolData} />
          <TimeRemaining deadline={mockPoolData.bidSubmissionDeadline} />
          <UserActions pool={mockPoolData} user={mockUserData} />
          <UserStats user={mockUserData} />
        </div>
        <div className="space-y-6">
          <BidsList bids={mockBids} onVote={handleVote} />
          <LastWinners winners={mockLastWinners} />
        </div>
      </div>
    </div>
  )
}
