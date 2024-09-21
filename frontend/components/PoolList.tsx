"use client"

import React from "react"

import ProjectCard from "./ProjectCard"

const PoolList: React.FC<any> = ({ pools }) => {
  const filteredProjects = pools.filter((pool) => pool.poolId !== 0)
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((pool) => (
        <ProjectCard key={pool.id} pool={pool} />
      ))}
    </div>
  )
}

export default PoolList
