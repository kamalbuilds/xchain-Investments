'use client'

import FilterBar from '@/components/FilterBar';
import ProjectList from '@/components/ProjectList';
import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  anonymous: boolean;
  category: string;
}

function SectionHeading({ title }: { title: string }) {
    return <h2 className="text-3xl font-bold mb-6">{title}</h2>
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilter = (category: string) => {
    if (category === filter) {
      setFilter('')
      setProjects(projects)
    } else {
      setFilter(category)
      setProjects(projects.filter(project => project.category === category))
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setProjects(projects.filter(project => project.title.toLowerCase().includes(term.toLowerCase())))
  }
  useEffect(() => {
    // Simulating an API call to fetch projects
    const fetchProjects = async () => {
        setIsLoading(true)
        // Mock data for projects
        const mockProjects: Project[] = [
            { id: 1, title: "Eco-Friendly City", description: "Building a sustainable urban environment", goal: 100000, raised: 75000, anonymous: true, category: "Environment" },
            { id: 2, title: "AI for Education", description: "Leveraging AI to improve learning outcomes", goal: 50000, raised: 30000, anonymous: false, category: "Technology" },
            { id: 3, title: "Clean Water Initiative", description: "Providing clean water to rural communities", goal: 75000, raised: 60000, anonymous: true, category: "Social" },
        ]
        setProjects(mockProjects)
        setIsLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* <SiteHeader title="Explore Projects" subtitle="Discover and support innovative projects" /> */}
        <SectionHeading title="Explore Projects" />
        <FilterBar
          onFilter={handleFilter}
          onSearch={handleSearch}
          activeFilter={filter}/>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </main>
    </div>
  )
}

export default ProjectsPage;
