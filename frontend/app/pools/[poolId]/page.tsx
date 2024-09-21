"use client"
import PoolCard from '@/components/PoolsById/PoolCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { XChainChitFundContract } from '@/config/PoolFundContract.config';
import { getEthersProvider, wagmiConfig } from '@/config/wagmi.config';
import { PoolFundABI } from '@/lib/ABI';
import { Pool } from '@/types/nav';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

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
        <div className='p-4'>
            hello world {params.poolId}

            {isLoading && (<div className="text-center py-8">
                <p className="text-muted-foreground">Loading pools...</p>
            </div>)}

            {!isLoading && poolData && (
                <div>
                    <div className='flex flex-row justify-between border-b pb-2'>
                        <div className='flex flex-col gap-2 '>

                            <div className='flex flex-row gap-2 items-center'>
                                <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    {poolData?.name}
                                </h2>
                                <Badge variant={poolData.isAnonymousVoting ? "secondary" : "outline"}>
                                    {poolData.isAnonymousVoting ? "Anonymous" : "Public"}
                                </Badge>
                            </div>

                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                People stopped telling jokes
                            </h4>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <Button>Join Pool</Button>
                            <Button> Deposit Funds</Button>
                        </div>
                    </div>

                    <div>
                        <PoolCard pool={poolData} />
                    </div>
                </div>
            )}



        </div>
    );
};

export default PoolIdPage;