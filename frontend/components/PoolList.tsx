"use client"

import React from "react";

import PoolCard from "@/components/PoolCard";

import { Pool } from "@/interfaces";

interface PoolListProps {
  pools: Pool[];
  fetchPools: () => Promise<void>;
}

const PoolList: React.FC<PoolListProps> = ({ pools, fetchPools }) => {
  const filteredPools: Pool[] = pools.filter((pool) => pool.poolId !== 0)
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredPools.map((pool) => (
        <PoolCard key={pool.poolId} pool={pool} fetchPools={fetchPools} />
      ))}
    </div>
  )
}

export default PoolList
