import { SectionHeading } from "@/components/SectionHeading"
import { PoolForm } from "@/components/create-pool/PoolForm"

const CreatePoolPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading
          title="Create a New Pool"
          subtitle="Bring your ideas to life with community support"
        />
        <div className="mx-auto max-w-2xl">
          <PoolForm />
        </div>
      </main>
    </div>
  )
}
export default CreatePoolPage
