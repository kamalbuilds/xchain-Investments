import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Pool } from '@/types/nav';


const BidderCard = ({ pool }: { pool: Pool }) => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold items-center flex flex-row justify-between">
                    Pool Details
                </CardTitle>

            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div>
                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Member Count
                                </p>
                                <p className="leading-7 ">{pool.memberCount}</p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Value stored
                                </p>
                                <p className="leading-7 ">{pool.valueStored}</p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Commitment Deposit
                                </p>
                                <p className="leading-7 ">{pool.commitmentDeposit}</p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Deposit Amount
                                </p>
                                <p className="leading-7 ">{pool.depositAmount} </p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Deposit Range
                                </p>
                                <p className="leading-7 ">
                                    {pool.minBidAmount} - {pool.maxBidAmount}
                                </p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Penalty Rate
                                </p>
                                <p className="leading-7 ">{pool.penaltyRate}</p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Deposit Period (Days)
                                </p>
                                <p className="leading-7 ">{pool.depositPeriodDays}</p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Withdraw Period (Days)
                                </p>
                                <p className="leading-7 ">{pool.withdrawPeriodDays}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

        </Card>
    );
};

export default BidderCard;