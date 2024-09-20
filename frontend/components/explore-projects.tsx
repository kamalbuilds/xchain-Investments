'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search, Menu } from "lucide-react"

// Mock data for projects
const mockProjects = [
  { id: 1, title: "Eco-Friendly City", description: "Building a sustainable urban environment", goal: 100000, raised: 75000, anonymous: true, category: "Environment" },
  { id: 2, title: "AI for Education", description: "Leveraging AI to improve learning outcomes", goal: 50000, raised: 30000, anonymous: false, category: "Technology" },
  { id: 3, title: "Clean Water Initiative", description: "Providing clean water to rural communities", goal: 75000, raised: 60000, anonymous: true, category: "Social" },
]

export function ExploreProjectsComponent() {
  const [projects, setProjects] = useState(mockProjects)
  const [filter, setFilter] = useState('')

  const handleFilter = (category: string) => {
    if (category === filter) {
      setFilter('')
      setProjects(mockProjects)
    } else {
      setFilter(category)
      setProjects(mockProjects.filter(project => project.category === category))
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SectionHeading title="Explore Projects" />
        <FilterBar onFilter={handleFilter} activeFilter={filter} />
        <ProjectList projects={projects} />
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FundDAO</h1>
        <Button variant="ghost"><Menu /></Button>
      </div>
    </nav>
  )
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="text-3xl font-bold mb-6">{title}</h2>
}

function FilterBar({ onFilter, activeFilter }: { onFilter: (category: string) => void, activeFilter: string }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input className="w-full md:w-64" placeholder="Search projects..." />
      <Button onClick={() => onFilter('Environment')} variant={activeFilter === 'Environment' ? 'default' : 'outline'}>Environment</Button>
      <Button onClick={() => onFilter('Technology')} variant={activeFilter === 'Technology' ? 'default' : 'outline'}>Technology</Button>
      <Button onClick={() => onFilter('Social')} variant={activeFilter === 'Social' ? 'default' : 'outline'}>Social</Button>
    </div>
  )
}

function ProjectList({ projects }: { projects: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  const progress = (project.raised / project.goal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          ${project.raised.toLocaleString()} raised of ${project.goal.toLocaleString()} goal
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant={project.anonymous ? "secondary" : "outline"}>
          {project.anonymous ? "Anonymous" : "Public"}
        </Badge>
        <Button>Donate</Button>
      </CardFooter>
    </Card>
  )
}

function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 FundDAO. All rights reserved.</p>
      </div>
    </footer>
  )
}