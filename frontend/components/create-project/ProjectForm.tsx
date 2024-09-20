import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { AnonymitySettings } from "./AnonymitySettings"
import { GovernanceSettings } from "./GovernanceSettings"

export function ProjectForm() {
    return (
      <form className="space-y-6">
        <FormField label="Project Title" id="project-title" placeholder="Enter project title" />
        <FormField label="Project Description" id="project-description" type="textarea" placeholder="Describe your project" />
        <FormField label="Funding Goal" id="funding-goal" type="number" placeholder="Enter funding goal in USD" />
        <AnonymitySettings />
        <GovernanceSettings />
        <Button type="submit" className="w-full">Create Project</Button>
      </form>
    )
}
