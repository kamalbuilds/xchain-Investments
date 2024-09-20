'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Project {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  anonymous: boolean;
  monthlyDeposit: number;
  totalMonths: number;
  currentMonth: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const progressPercentage = (project.currentMonth / project.totalMonths) * 100;
  const remainingMonths = project.totalMonths - project.currentMonth;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{project.currentMonth} / {project.totalMonths} months</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <div className="flex justify-between text-sm">
            <span>Monthly Deposit</span>
            <span className="font-semibold">${project.monthlyDeposit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Raised</span>
            <span className="font-semibold">${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Remaining</span>
            <span className="font-semibold">{remainingMonths} {remainingMonths === 1 ? 'month' : 'months'}</span>
          </div>
        </div>
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

export default ProjectCard