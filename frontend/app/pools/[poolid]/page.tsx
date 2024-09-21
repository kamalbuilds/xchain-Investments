'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ethers } from 'ethers';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/router'; // Adjust based on your routing
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi'; // For user account details

import { XChainChitFundContract } from '@/config/PoolFundContract.config';
import { getEthersProvider, wagmiConfig } from '@/config/wagmi.config';
import { Bid, Member, Pool } from '@/interfaces';
import { PoolFundABI } from '@/lib/ABI';

// Utility function to format Ethereum addresses
function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// PoolDetails Component
const PoolIdPage = ({ params }: { params: any }) => {
    console.log("params", params);

    const [poolData, setPoolData] = useState<Pool>()
    const [isLoading, setIsLoading] = useState(false);

    const getPoolData = async (poolId: number) => {
        if (poolId) {
            try {
                setIsLoading(true);
                const provider = await getEthersProvider(wagmiConfig)
                // Ensure this function returns a valid ethers provider
                const contract = new ethers.Contract(
                    XChainChitFundContract,
                    PoolFundABI,
                    provider
                )

                const result = await contract.pools(poolId);

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
                    currentCycle: parseFloat(result[18]),
                };

                setIsLoading(false);
                // Store the mapped data in the state
                setPoolData(mappedPool);
            } catch (error) {
                console.log("Error", error);
            }

        }
    }

    useEffect(() => {
        if (params.poolId) {
            getPoolData(params.poolId)
        }

    }, [params])

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
            <p>{ethers.utils.formatEther(pool.depositAmount)} ETH</p>
          </div>
          <div>
            <Label>Total Value</Label>
            <p>{ethers.utils.formatEther(pool.valueStored)} ETH</p>
          </div>
          <div>
            <Label>Members</Label>
            <p>{pool.memberCount.toString()}</p>
          </div>
          <div>
            <Label>Current Cycle</Label>
            <p>{pool.currentCycle.toString()}</p>
          </div>
          <div>
            <Label>Deposit Period</Label>
            <p>{pool.depositPeriodDays.toString()} days</p>
          </div>
          <div>
            <Label>Withdraw Period</Label>
            <p>{pool.withdrawPeriodDays.toString()} days</p>
          </div>
          <div>
            <Label>Min Bid</Label>
            <p>{ethers.utils.formatEther(pool.minBidAmount)} ETH</p>
          </div>
          <div>
            <Label>Max Bid</Label>
            <p>{ethers.utils.formatEther(pool.maxBidAmount)} ETH</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// BidsList Component
function BidsList({
  bids,
  onVote,
}: {
  bids: Bid[];
  onVote: (bidder: string) => void;
}) {
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
                <p className="text-sm text-muted-foreground">
                  {ethers.utils.formatEther(bid.bidAmount)} ETH
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{bid.voteCount.toString()} votes</span>
                <Button size="sm" onClick={() => onVote(bid.bidder)}>
                  Vote
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// UserActions Component
function UserActions({
  pool,
  user,
  handleDeposit,
  handleWithdraw,
  handleBid,
}: {
  pool: Pool;
  user: Member | null;
  handleDeposit: (amount: string) => void;
  handleWithdraw: (amount: string) => void;
  handleBid: (bidAmount: string) => void;
}) {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bidAmount, setBidAmount] = useState('');

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
              <Button
                onClick={() => handleDeposit(depositAmount)}
                className="w-full"
              >
                Deposit
              </Button>
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
              <Button
                onClick={() => handleWithdraw(withdrawAmount)}
                className="w-full"
              >
                Withdraw
              </Button>
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
              <Button onClick={() => handleBid(bidAmount)} className="w-full">
                Submit Bid
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// TimeRemaining Component
function TimeRemaining({ deadline }: { deadline: number }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Expired');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

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
      </CardContent>
    </Card>
  );
}

// UserStats Component
function UserStats({ user }: { user: Member }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Total Contributions</Label>
            <p>{ethers.utils.formatEther(user.totalContributions)} ETH</p>
          </div>
          <div>
            <Label>Total Winnings</Label>
            <p>{ethers.utils.formatEther(user.totalWinnings)} ETH</p>
          </div>
          <div>
            <Label>Total Penalties</Label>
            <p>{ethers.utils.formatEther(user.totalPenalties)} ETH</p>
          </div>
          <div>
            <Label>Status</Label>
            <p>{user.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main PoolPageComponent
export function PoolPageComponent() {
  const [poolData, setPoolData] = useState<Pool | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [userData, setUserData] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { address, isConnected } = useAccount(); // Get user's address
  const router = useRouter();
  const { poolId } = router.query;

  useEffect(() => {
    if (!poolId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const provider = getEthersProvider(wagmiConfig);
        const contract = new ethers.Contract(
          XChainChitFundContract,
          PoolFundABI,
          provider
        );

        // Fetch pool details
        const poolDetails = await contract.getPoolDetails(poolId);
        const pool: Pool = {
          poolId: poolDetails[0],
          name: poolDetails[1],
          title: poolDetails[2],
          depositAmount: poolDetails[3],
          isAnonymousVoting: poolDetails[4],
          depositPeriodDays: poolDetails[5],
          withdrawPeriodDays: poolDetails[6],
          distributeRemainingCycle: poolDetails[7],
          valueStored: poolDetails[8],
          minBidAmount: poolDetails[9],
          maxBidAmount: poolDetails[10],
          commitmentDeposit: poolDetails[11],
          penaltyRate: poolDetails[12],
          memberCount: poolDetails[13],
          bidSubmissionDeadline: poolDetails[14],
          status: poolDetails[15],
          createdAt: poolDetails[16],
          updatedAt: poolDetails[17],
          members: poolDetails[18],
          currentCycle: poolDetails[19],
        };
        setPoolData(pool);

        // Fetch bids for the current cycle
        const bidsArray = await contract.getAllBids(poolId, pool.currentCycle);
        const formattedBids: Bid[] = bidsArray.map((bid: any) => ({
          bidAmount: bid[0],
          bidder: bid[1],
          voteCount: bid[2],
          exists: bid[3],
        }));
        setBids(formattedBids);

        // Fetch user data if connected
        if (isConnected && address) {
          const memberDetails = await contract.getMemberDetails(poolId, address);
          const member: Member = {
            memberAddress: memberDetails[0],
            totalContributions: memberDetails[1],
            totalWinnings: memberDetails[2],
            totalPenalties: memberDetails[3],
            isActive: memberDetails[4],
          };
          setUserData(member);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [poolId, isConnected, address]);

  // Implement deposit logic
  const handleDeposit = async (amount: string) => {
    if (!isConnected || !address) {
      console.log('User not connected');
      return;
    }

    try {
      const provider = getEthersProvider(wagmiConfig);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        XChainChitFundContract,
        PoolFundABI,
        signer
      );

      const tx = await contract.contribute(poolId, {
        value: ethers.utils.parseEther(amount),
      });

      await tx.wait();
      console.log('Deposit successful');
    } catch (error) {
      console.error('Error during deposit:', error);
    }
  };

  // Implement withdraw logic
  const handleWithdraw = async (amount: string) => {
    // Implement withdraw logic based on contract's function
    console.log('Withdrawing', amount);
  };

  // Implement bid logic
  const handleBid = async (bidAmount: string) => {
    if (!isConnected || !address) {
      console.log('User not connected');
      return;
    }

    try {
      const provider = getEthersProvider(wagmiConfig);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        XChainChitFundContract,
        PoolFundABI,
        signer
      );

      const tx = await contract.submitBid(
        poolId,
        ethers.utils.parseEther(bidAmount)
      );

      await tx.wait();
      console.log('Bid submitted successfully');
    } catch (error) {
      console.error('Error during bid submission:', error);
    }
  };

  // Implement voting logic
  const handleVote = async (bidderAddress: string) => {
    // Voting requires WorldID verification; implement accordingly
    console.log('Voting for bid by', bidderAddress);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading pool data...</p>
      </div>
    );
  }

  if (!poolData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Pool not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pool Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PoolDetails pool={poolData} />
          <TimeRemaining
            deadline={poolData.bidSubmissionDeadline.toNumber() * 1000}
          />
          <UserActions
            pool={poolData}
            user={userData}
            handleDeposit={handleDeposit}
            handleWithdraw={handleWithdraw}
            handleBid={handleBid}
          />
          {userData && <UserStats user={userData} />}
        </div>
        <div>
          <BidsList bids={bids} onVote={handleVote} />
        </div>
      </div>
    </div>
  );
}
