'use client'

import React from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  anonymous: boolean;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectList