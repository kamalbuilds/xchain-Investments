"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XChainChitFundContract } from '@/config/PoolFundContract.config'
import { getEthersProvider, wagmiConfig } from '@/config/wagmi.config'
import { PoolFundABI } from '@/lib/ABI'
import { ethers } from 'ethers'
import { Clock } from "lucide-react"
import { useEffect, useState } from 'react'

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
          {bids.map((bid, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{formatAddress(bid.bidder)}</p>
                <p className="text-sm text-muted-foreground">{bid.amount} ETH</p>
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

function TimeRemaining({ deadline }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = deadline * 1000 - now // Convert deadline to milliseconds

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

const PoolIdPage = ({ params }: { params: any }) => {
  const [poolData, setPoolData] = useState(null)
  const [bids, setBids] = useState([])
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getPoolData = async (poolId: number) => {
    if (poolId) {
      try {
        setIsLoading(true)
        const provider = await getEthersProvider(wagmiConfig)
        // Ensure this function returns a valid ethers provider
        const contract = new ethers.Contract(
          XChainChitFundContract,
          PoolFundABI,
          provider
        )

        // Fetch pool details
        const result = await contract.getPoolDetails(poolId)
        console.log("Result", result);
        const mappedPool = {
          poolId: parseInt(result[0]),
          name: result[1],
          title: result[2],
          depositAmount: ethers.formatEther(result[3]),
          isAnonymousVoting: result[4],
          depositPeriodDays: parseInt(result[5]),
          withdrawPeriodDays: parseInt(result[6]),
          distributeRemainingCycle: result[7],
          valueStored: ethers.formatEther(result[8]),
          minBidAmount: ethers.formatEther(result[9]),
          maxBidAmount: ethers.formatEther(result[10]),
          commitmentDeposit: ethers.formatEther(result[11]),
          penaltyRate: parseInt(result[12]),
          memberCount: parseInt(result[13]),
          bidSubmissionDeadline: Number(result[14]),
          status: parseInt(result[15]),
          createdAt: Number(result[16]),
          updatedAt: Number(result[17]),
          members: result[18],
          currentCycle: parseInt(result[19]),
        }
        setPoolData(mappedPool)

        // Fetch bids for current cycle
        const bidsResult = await contract.getAllBids(poolId, mappedPool.currentCycle)
        const mappedBids = bidsResult.map((bid, index) => ({
          id: index,
          bidder: bid.bidder,
          amount: ethers.utils.formatEther(bid.bidAmount),
          votes: parseInt(bid.voteCount),
        }))
        setBids(mappedBids)

        // Fetch user data (replace with actual user address)
        const userAddress = "0xYourUserAddressHere"
        const userResult = await contract.getMemberDetails(poolId, userAddress)
        const mappedUser = {
          address: userResult[0],
          totalContributions: ethers.utils.formatEther(userResult[1]),
          totalWinnings: ethers.utils.formatEther(userResult[2]),
          totalPenalties: ethers.utils.formatEther(userResult[3]),
          isActive: userResult[4],
        }
        setUserData(mappedUser)

        setIsLoading(false)
      } catch (error) {
        console.log("Error", error)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (params.poolId) {
      getPoolData(params.poolId)
    }
  }, [params])

  const handleVote = (bidId) => {
    // Implement voting logic
    console.log("Voting for bid", bidId)
  }

  return (
    <div className='container mx-auto p-4'>
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading pool data...</p>
        </div>
      )}

      {!isLoading && poolData && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Pool Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <PoolDetails pool={poolData} />
              <TimeRemaining deadline={poolData.bidSubmissionDeadline} />
              {userData && <UserActions pool={poolData} user={userData} />}
              {userData && <UserStats user={userData} />}
            </div>
            <div>
              <BidsList bids={bids} onVote={handleVote} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PoolIdPage
