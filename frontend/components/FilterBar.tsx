'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from 'react'

interface FilterBarProps {
  onFilter: (category: string) => void;
  onSearch: (searchTerm: string) => void;
  activeFilter: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter, onSearch, activeFilter }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <div className="relative w-full md:w-64">
        <Input
          className="pl-10"
          placeholder="Search projects..."
          onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onFilter('All')}
          variant={activeFilter === 'All' ? 'default' : 'outline'}
        >
          All
        </Button>

      </div>
    </div>
  )
}

export default FilterBar
