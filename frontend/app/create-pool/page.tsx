import { ProjectForm } from "@/components/create-project/ProjectForm";
import { SectionHeading } from "@/components/SectionHeading";

const CreateProjectPage: React.FC = () => {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <SectionHeading title="Create a New Project" subtitle="Bring your ideas to life with community support" />
          <div className="max-w-2xl mx-auto">
            <ProjectForm />
          </div>
        </main>
      </div>
    )
}
export default CreateProjectPage;
