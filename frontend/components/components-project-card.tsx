"use client"

import React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Pool {
  id: number
  title: string
  description: string
  goal: number
  raised: number
  anonymous: boolean
  monthlyDeposit: number
  totalMonths: number
  currentMonth: number
}

interface PoolCardProps {
  pool: Pool
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const progressPercentage = (pool.currentMonth / pool.totalMonths) * 100
  const remainingMonths = pool.totalMonths - pool.currentMonth

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{pool.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{pool.description}</p>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">
                {pool.currentMonth} / {pool.totalMonths} months
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <div className="flex justify-between text-sm">
            <span>Monthly Deposit</span>
            <span className="font-semibold">
              ${pool.monthlyDeposit.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Raised</span>
            <span className="font-semibold">
              ${pool.raised.toLocaleString()} / $
              {pool.goal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Remaining</span>
            <span className="font-semibold">
              {remainingMonths} {remainingMonths === 1 ? "month" : "months"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant={pool.anonymous ? "secondary" : "outline"}>
          {pool.anonymous ? "Anonymous" : "Public"}
        </Badge>
        <Button>Donate</Button>
      </CardFooter>
    </Card>
  )
}

export default PoolCard
