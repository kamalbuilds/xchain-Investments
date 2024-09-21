"use client"

import React, { useState } from "react"
import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import DepositModal from "./DepositModal"
import JoinModal from "./JoinModal"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pool } from "@/types/nav"



const ProjectCard = ({ pool, fetchPools }: { pool: Pool, fetchPools: () => Promise<void> }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex flex-row justify-between">
          <div className="flex gap-2">
            <p>{pool.name}</p>
            <ExternalLink onClick={() => {
              router.push(`/pools/${pool.poolId}`)
            }} />
          </div>
          <Badge variant={pool.isAnonymousVoting ? "secondary" : "outline"}>
            {pool.isAnonymousVoting ? "Anonymous" : "Public"}
          </Badge>
        </CardTitle>
        <CardDescription>{pool.title}</CardDescription>
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
      <CardFooter className="flex flex-col gap-4 ">
        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full">Deposit</Button>
          </DialogTrigger>
          <DialogContent>
            <DepositModal poolId={pool.poolId} poolName={pool.name} />
          </DialogContent>
        </Dialog>

        <Dialog open={open} >
          <DialogTrigger className="w-full">
            <Button className="w-full" onClick={() => setOpen(true)}>Join</Button>
          </DialogTrigger>
          <DialogContent onInteractOutside={() => setOpen(false)}>
            <JoinModal
              poolId={pool.poolId}
              amount={pool.commitmentDeposit}
              poolName={pool.name}
              fetchPools={fetchPools}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
