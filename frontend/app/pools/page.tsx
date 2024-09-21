"use client"

import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import { XChainChitFundContract } from "@/config/PoolFundContract.config"
import { getEthersProvider, wagmiConfig } from "@/config/wagmi.config"
import { PoolFundABI } from "@/lib/ABI"
import { Button } from "@/components/ui/button"
import FilterBar from "@/components/FilterBar"
import PoolList from "@/components/PoolList"

interface Pool {
  id: number
  name: string
  title: string
  depositAmount: string
  isAnonymousVoting: boolean
  depositPeriodDays: number
  withdrawPeriodDays: number
  distributeRemainingCycle: boolean
  valueStored: string
  minBidAmount: string
  maxBidAmount: string
  commitmentDeposit: string
  penaltyRate: number
  memberCount: number
  bidSubmissionDeadline: number
  currentCycle: number
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="text-3xl font-bold mb-6">{title}</h2>
}

const PoolsPage: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([])
  const [filter, setFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleFilter = (category: string) => {
    if (category === filter) {
      setFilter("")
      setPools(pools)
    } else {
      setFilter(category)
      setPools(pools.filter((pool) => pool.category === category))
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setPools(
      pools.filter((pool) =>
        pool.title.toLowerCase().includes(term.toLowerCase())
      )
    )
  }

  // Function to fetch pools data from the contract
  const fetchPools = async () => {
    setIsLoading(true)
    const provider = getEthersProvider(wagmiConfig)
    // Ensure this function returns a valid ethers provider
    const contract = new ethers.Contract(
      XChainChitFundContract,
      PoolFundABI,
      provider
    )

    try {
      const poolPromises = []
      for (let i = 1; i <= 5; i++) {
        poolPromises.push(contract.pools(i)) // Fetch data for each pool ID from 1 to 5
      }

      const results = await Promise.all(poolPromises)

      const mappedPools = results.map((result: any, index: number) => ({
        id: index + 1,
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
        createdAt: Number(result[16]),
        updatedAt: Number(result[17]),
        status: parseInt(result[15]),
        currentCycle: parseFloat(result[18]),
      }))

      console.log("mappedPools", mappedPools)

      setPools(mappedPools)
    } catch (error) {
      console.error("Error fetching pools data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPools() // Call the fetch function when the component mounts
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading title="Explore Pools" />
        <FilterBar
          onFilter={handleFilter}
          onSearch={handleSearch}
          activeFilter={filter}
        />
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading pools...</p>
          </div>
        ) : (
          <PoolList pools={pools} fetchPools={fetchPools} />
        )}
      </main>
    </div>
  )
}

export default PoolsPage
