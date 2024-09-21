"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Mock data for pools
const mockPools = [
  {
    id: 1,
    title: "Eco-Friendly City",
    description: "Building a sustainable urban environment",
    goal: 100000,
    raised: 75000,
    anonymous: true,
    category: "Environment",
  },
  {
    id: 2,
    title: "AI for Education",
    description: "Leveraging AI to improve learning outcomes",
    goal: 50000,
    raised: 30000,
    anonymous: false,
    category: "Technology",
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    description: "Providing clean water to rural communities",
    goal: 75000,
    raised: 60000,
    anonymous: true,
    category: "Social",
  },
]

export function ExplorePoolsComponent() {
  const [pools, setPools] = useState(mockPools)
  const [filter, setFilter] = useState("")

  const handleFilter = (category: string) => {
    if (category === filter) {
      setFilter("")
      setPools(mockPools)
    } else {
      setFilter(category)
      setPools(
        mockPools.filter((pool) => pool.category === category)
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container mx-auto grow px-4 py-8">
        <SectionHeading title="Explore Pools" />
        <FilterBar onFilter={handleFilter} activeFilter={filter} />
        <PoolList pools={pools} />
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  return (
    <nav className="bg-primary p-4 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">FundDAO</h1>
        <Button variant="ghost">
          <Menu />
        </Button>
      </div>
    </nav>
  )
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="mb-6 text-3xl font-bold">{title}</h2>
}

function FilterBar({
  onFilter,
  activeFilter,
}: {
  onFilter: (category: string) => void
  activeFilter: string
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <Input className="w-full md:w-64" placeholder="Search pools..." />
      <Button
        onClick={() => onFilter("Environment")}
        variant={activeFilter === "Environment" ? "default" : "outline"}
      >
        Environment
      </Button>
      <Button
        onClick={() => onFilter("Technology")}
        variant={activeFilter === "Technology" ? "default" : "outline"}
      >
        Technology
      </Button>
      <Button
        onClick={() => onFilter("Social")}
        variant={activeFilter === "Social" ? "default" : "outline"}
      >
        Social
      </Button>
    </div>
  )
}

function PoolList({ pools }: { pools: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pools.map((pool) => (
        <PoolCard key={pool.id} pool={pool} />
      ))}
    </div>
  )
}

function PoolCard({ pool }: { pool: any }) {
  const progress = (pool.raised / pool.goal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pool.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{pool.description}</p>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          ${pool.raised.toLocaleString()} raised of $
          {pool.goal.toLocaleString()} goal
        </p>
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

function Footer() {
  return (
    <footer className="mt-8 bg-muted p-4 text-muted-foreground">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 FundDAO. All rights reserved.</p>
      </div>
    </footer>
  )
}
