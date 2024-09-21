"use client"

import { Search } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FilterBarProps {
  onFilter: (category: string) => void
  onSearch: (searchTerm: string) => void
  activeFilter: string
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilter,
  onSearch,
  activeFilter,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <div className="mb-6 flex flex-col items-center gap-4 md:flex-row">
      <div className="relative w-full md:w-64">
        <Input
          className="pl-10"
          placeholder="Search pools..."
          onChange={handleSearch}
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onFilter("All")}
          variant={activeFilter === "All" ? "default" : "outline"}
        >
          All
        </Button>

      </div>
    </div>
  )
}

export default FilterBar
