import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useState } from 'react'

// Global Components

// components/Navbar.tsx
export function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FundDAO</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Explore</Button>
          <Button variant="ghost">Create</Button>
          <Button variant="ghost">Dashboard</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}

// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground p-4 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold mb-2">About FundDAO</h3>
          <p className="text-sm">Empowering projects through decentralized funding and governance.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Connect</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Discord</a></li>
            <li><a href="#" className="hover:underline">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-sm">
        &copy; 2023 FundDAO. All rights reserved.
      </div>
    </footer>
  )
}

// components/Card.tsx
export function Card({ children, className, ...props }) {
  return (
    <Card className={`overflow-hidden ${className}`} {...props}>
      {children}
    </Card>
  )
}

// components/Button.tsx
export function CustomButton({ children, variant = "default", size = "default", className, ...props }) {
  return (
    <Button variant={variant} size={size} className={className} {...props}>
      {children}
    </Button>
  )
}

// components/ProgressBar.tsx
export function ProgressBar({ value, max = 100, className, ...props }) {
  return (
    <Progress value={(value / max) * 100} className={className} {...props} />
  )
}

// components/Modal.tsx
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>&times;</Button>
        </div>
        {children}
      </div>
    </div>
  )
}

// components/FormField.tsx
export function FormField({ label, type = "text", ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={props.id} {...props} />
      ) : (
        <Input type={type} id={props.id} {...props} />
      )}
    </div>
  )
}

// components/Alert.tsx
export function Alert({ type = "info", message }) {
  const styles = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  }

  const icons = {
    info: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />
  }

  return (
    <div className={`p-4 rounded-md flex items-center ${styles[type]}`}>
      {icons[type]}
      <span className="ml-3">{message}</span>
    </div>
  )
}

// components/SectionHeading.tsx
export function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
    </div>
  )
}

// components/Avatar.tsx
export function CustomAvatar({ src, alt, fallback }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

// components/Tag.tsx
export function Tag({ children, variant = "default" }) {
  return (
    <Badge variant={variant}>{children}</Badge>
  )
}

// Page-Specific Components

// components/home/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to FundDAO</h1>
        <p className="text-xl mb-8">Empowering projects through decentralized funding and governance</p>
        <div className="space-x-4">
          <Button size="lg">Explore Projects</Button>
          <Button size="lg" variant="outline">Create a Project</Button>
        </div>
      </div>
    </section>
  )
}

// components/home/FeatureList.tsx
export function FeatureList() {
  const features = [
    { title: "Anonymous Voting", description: "Participate in decision-making without revealing your identity" },
    { title: "Transparent Transactions", description: "All fund movements are recorded on the blockchain for full transparency" },
    { title: "Decentralized Governance", description: "Projects are governed by their community through DAOs" }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Key Features" subtitle="What makes FundDAO unique" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// components/home/TestimonialSection.tsx
export function TestimonialSection() {
  const testimonials = [
    { name: "Alice Johnson", role: "Project Creator", quote: "FundDAO helped me bring my idea to life with the support of a passionate community." },
    { name: "Bob Smith", role: "Investor", quote: "I love how I can contribute to projects anonymously while still having a say in their direction." }
  ]

  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto">
        <SectionHeading title="What People Are Saying" subtitle="Testimonials from our community" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <CustomAvatar src={`https://i.pravatar.cc/150?img=${index + 1}`} alt={testimonial.name} fallback={testimonial.name[0]} />
                  <div className="ml-4">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// components/home/CallToAction.tsx
export function CallToAction() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8">Join FundDAO today and be part of the decentralized funding revolution</p>
        <div className="space-x-4">
          <Button size="lg" variant="secondary">Explore Projects</Button>
          <Button size="lg">Create a Project</Button>
        </div>
      </div>
    </section>
  )
}

// components/projects/ProjectList.tsx
export function ProjectList({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

// components/projects/ProjectCard.tsx
export function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <ProgressBar value={project.raised} max={project.goal} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          ${project.raised.toLocaleString()} raised of ${project.goal.toLocaleString()} goal
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Tag variant={project.anonymous ? "secondary" : "outline"}>
          {project.anonymous ? "Anonymous" : "Public"}
        </Tag>
        <Button>Donate</Button>
      </CardFooter>
    </Card>
  )
}

// components/projects/FilterBar.tsx
export function FilterBar({ onFilter, activeFilter }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input className="w-full md:w-64" placeholder="Search projects..." />
      <Button onClick={() => onFilter('Environment')} variant={activeFilter === 'Environment' ? 'default' : 'outline'}>Environment</Button>
      <Button onClick={() => onFilter('Technology')} variant={activeFilter === 'Technology' ? 'default' : 'outline'}>Technology</Button>
      <Button onClick={() => onFilter('Social')} variant={activeFilter === 'Social' ? 'default' : 'outline'}>Social</Button>
    </div>
  )
}

// components/projects/ProjectHeader.tsx
export function ProjectHeader({ project }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      <p className="text-xl text-muted-foreground mb-4">{project.description}</p>
      <div className="flex items-center space-x-4">
        <CustomAvatar src={project.creatorAvatar} alt={project.creatorName} fallback={project.creatorName[0]} />
        <div>
          <p className="font-semibold">{project.creatorName}</p>
          <p className="text-sm text-muted-foreground">Project Creator</p>
        </div>
      </div>
    </div>
  )
}

// components/projects/AnonymityTags.tsx
export function AnonymityTags({ isAnonymousDonation, isAnonymousVoting }) {
  return (
    <div className="flex space-x-2 mb-4">
      <Tag variant={isAnonymousDonation ? "default" : "outline"}>
        {isAnonymousDonation ? "Anonymous Donations" : "Public Donations"}
      </Tag>
      <Tag variant={isAnonymousVoting ? "default" : "outline"}>
        {isAnonymousVoting ? "Anonymous Voting" : "Public Voting"}
      </Tag>
    </div>
  )
}

// components/projects/DonationSection.tsx
export function DonationSection({ project }) {
  const [donationAmount, setDonationAmount] = useState(10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support this Project</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="donation-amount">Donation Amount</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="donation-amount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                min={1}
              />
              <span>USD</span>
            </div>
          </div>
          <Slider
            value={[donationAmount]}
            onValueChange={([value]) => setDonationAmount(value)}
            max={100}
            step={1}
          />
          <div className="flex justify-between">
            <Button onClick={() => setDonationAmount(10)}>$10</Button>
            <Button onClick={() => setDonationAmount(25)}>$25</Button>
            <Button onClick={() => setDonationAmount(50)}>$50</Button>
            <Button onClick={() => setDonationAmount(100)}>$100</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Donate ${donationAmount}</Button>
      </CardFooter>
    </Card>
  )
}

// components/projects/VoteSection.tsx
export function VoteSection({ proposals }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proposals.map((proposal, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold mb-2">{proposal.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">Votes: {proposal.votes}</span>
                <Button size="sm">Vote</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// components/projects/CommentSection.tsx
export function CommentSection({ comments }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex space-x-4">
              <CustomAvatar src={comment.avatar} alt={comment.name} fallback={comment.name[0]} />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{comment.name}</span>
                  <span className="text-sm text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form className="w-full">
          <FormField label="Add a comment" type="textarea" />
          <Button className="mt-2">Post Comment</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

// components/create-project/ProjectForm.tsx
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

// components/create-project/AnonymitySettings.tsx
export function AnonymitySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anonymity Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="anonymous-donations">Anonymous Donations</Label>
          <Switch id="anonymous-donations" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="anonymous-voting">Anonymous Voting</Label>
          <Switch id="anonymous-voting" />
        </div>
      </CardContent>
    </Card>
  )
}

// components/create-project/GovernanceSettings.tsx
export function GovernanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Governance Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField label="Voting Period (in days)" id="voting-period" type="number" />
        <FormField label="Quorum Percentage" id="quorum-percentage" type="number" />
        <div className="flex items-center justify-between">
          <Label htmlFor="allow-delegation">Allow Vote Delegation</Label>
          <Switch id="allow-delegation" />
        </div>
      </CardContent>
    </Card>
  )
}

// components/groups/GroupStats.tsx
export function GroupStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${stats.totalInvestment.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Prize Pool</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${stats.prizePool.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.activeGroups}</p>
        </CardContent>
      </Card>
    </div>
  )
}

// components/groups/ProposalList.tsx
export function ProposalList({ proposals }) {
  return (
    <div className="space-y-4">
      {proposals.map((proposal, index) => (
        <ProposalCard key={index} proposal={proposal} />
      ))}
    </div>
  )
}

// components/groups/ProposalCard.tsx
export function ProposalCard({ proposal }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{proposal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{proposal.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Votes: {proposal.votes}</p>
            <p className="text-sm">Status: <Tag>{proposal.status}</Tag></p>
          </div>
          <Button disabled={proposal.status !== 'Active'}>Vote</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// components/bidding/BiddingForm.tsx
export function BiddingForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Your Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <FormField label="Bid Amount" id="bid-amount" type="number" placeholder="Enter your bid amount" />
          <FormField label="Bid Justification" id="bid-justification" type="textarea" placeholder="Explain why you're making this bid" />
          <Button type="submit" className="w-full">Submit Bid</Button>
        </form>
      </CardContent>
    </Card>
  )
}

// components/bidding/BidHistory.tsx
export function BidHistory({ bids }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bid History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bids.map((bid, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
              <div>
                <p className="font-semibold">${bid.amount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{bid.date}</p>
              </div>
              <Tag>{bid.status}</Tag>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// components/dashboard/DashboardStats.tsx
export function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Funds Raised</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${stats.totalFundsRaised.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.activeProjects}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Backers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalBackers.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  )
}

// components/dashboard/CreateProposalButton.tsx
export function CreateProposalButton() {
  return (
    <Button size="lg" className="fixed bottom-4 right-4 shadow-lg">
      Create New Proposal
    </Button>
  )
}

// Page Components

// pages/home.tsx
export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeatureList />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  )
}

// pages/projects.tsx
export function ProjectsPage() {
  const [projects, setProjects] = useState([
    { id: 1, title: "Eco-Friendly City", description: "Building a sustainable urban environment", goal: 100000, raised: 75000, anonymous: true },
    { id: 2, title: "AI for Education", description: "Leveraging AI to improve learning outcomes", goal: 50000, raised: 30000, anonymous: false },
    { id: 3, title: "Clean Water Initiative", description: "Providing clean water to rural communities", goal: 75000, raised: 60000, anonymous: true },
  ])
  const [filter, setFilter] = useState('')

  const handleFilter = (category) => {
    setFilter(category)
    // In a real application, you would filter the projects based on the category
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SectionHeading title="Explore Projects" subtitle="Discover and support innovative projects" />
        <FilterBar onFilter={handleFilter} activeFilter={filter} />
        <ProjectList projects={projects} />
      </main>
      <Footer />
    </div>
  )
}

// pages/projects/[id].tsx
export function ProjectDetailsPage() {
  const project = {
    id: 1,
    title: "Eco-Friendly City",
    description: "Building a sustainable urban environment",
    goal: 100000,
    raised: 75000,
    creatorName: "Jane Doe",
    creatorAvatar: "https://i.pravatar.cc/150?img=1",
    isAnonymousDonation: true,
    isAnonymousVoting: true,
  }

  const proposals = [
    { id: 1, title: "Implement solar panels", description: "Install solar panels on all public buildings", votes: 120 },
    { id: 2, title: "Create urban gardens", description: "Transform empty lots into community gardens", votes: 85 },
  ]

  const comments = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=2", date: "2023-05-15", content: "This project is amazing! Can't wait to see it come to life." },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=3", date: "2023-05-16", content: "I have some concerns about the implementation. Can we discuss further?" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ProjectHeader project={project} />
        <AnonymityTags isAnonymousDonation={project.isAnonymousDonation} isAnonymousVoting={project.isAnonymousVoting} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ProgressBar value={project.raised} max={project.goal} className="mb-4" />
            <p className="text-lg mb-4">${project.raised.toLocaleString()} raised of ${project.goal.toLocaleString()} goal</p>
            <DonationSection project={project} />
          </div>
          <div>
            <VoteSection proposals={proposals} />
          </div>
        </div>
        <div className="mt-8">
          <CommentSection comments={comments} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

// pages/create-project.tsx
export function CreateProjectPage() {
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

// pages/groups/[id].tsx
export function GroupPage() {
  const groupStats = {
    totalInvestment: 50000,
    prizePool: 5000,
    activeGroups: 3,
  }

  const proposals = [
    { id: 1, title: "Increase marketing budget", description: "Allocate more funds for social media advertising", votes: 45, status: "Active" },
    { id: 2, title: "Hire a community manager", description: "Bring on a full-time community manager to engage with our supporters", votes: 32, status: "Closed" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SectionHeading title="My Groups" subtitle="Manage your group investments and proposals" />
        <GroupStats stats={groupStats} />
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Active Proposals</h3>
          <ProposalList proposals={proposals} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

// pages/bidding/[id].tsx
export function BiddingPage() {
  const bids = [
    { amount: 5000, date: "2023-05-15 14:30", status: "Accepted" },
    { amount: 4500, date: "2023-05-15 13:45", status: "Outbid" },
    { amount: 4000, date: "2023-05-15 12:20", status: "Outbid" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SectionHeading title="Project Bidding" subtitle="Place your bid to support this project" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BiddingForm />
          <BidHistory bids={bids} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

// pages/dashboard.tsx
export function DashboardPage() {
  const dashboardStats = {
    totalFundsRaised: 250000,
    activeProjects: 5,
    totalBackers: 1200,
  }

  const projects = [
    { id: 1, title: "Eco-Friendly City", description: "Building a sustainable urban environment", goal: 100000, raised: 75000, anonymous: true },
    { id: 2, title: "AI for Education", description: "Leveraging AI to improve learning outcomes", goal: 50000, raised: 30000, anonymous: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SectionHeading title="Creator Dashboard" subtitle="Manage your projects and proposals" />
        <DashboardStats stats={dashboardStats} />
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">My Projects</h3>
          <ProjectList projects={projects} />
        </div>
        <CreateProposalButton />
      </main>
      <Footer />
    </div>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SectionHeading title="FundDAO Components" subtitle="A showcase of all components" />
        <Tabs defaultValue="home" className="w-full">
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="create">Create Project</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="bidding">Bidding</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <HomePage />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsPage />
          </TabsContent>
          <TabsContent value="create">
            <CreateProjectPage />
          </TabsContent>
          <TabsContent value="groups">
            <GroupPage />
          </TabsContent>
          <TabsContent value="bidding">
            <BiddingPage />
          </TabsContent>
          <TabsContent value="dashboard">
            <DashboardPage />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
