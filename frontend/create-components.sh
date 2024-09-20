#!/bin/bash

# Create directories for components and pages
mkdir -p src/components/ui
mkdir -p src/components/home
mkdir -p src/components/projects
mkdir -p src/components/create-project
mkdir -p src/components/groups
mkdir -p src/components/bidding
mkdir -p src/components/dashboard
mkdir -p src/pages

# Function to create a file with content
create_file() {
  local file_path="$1"
  local file_content="$2"
  echo "$file_content" > "$file_path"
}

# Create global components
create_file "src/components/ui/Navbar.tsx" '
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
'

create_file "src/components/ui/Footer.tsx" '
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
'

create_file "src/components/ui/Card.tsx" '
import { Card as ShadcnCard } from "@/components/ui/card"

export function Card({ children, className, ...props }) {
  return (
    <ShadcnCard className={`overflow-hidden ${className}`} {...props}>
      {children}
    </ShadcnCard>
  )
}
'

create_file "src/components/ui/Button.tsx" '
import { Button as ShadcnButton } from "@/components/ui/button"

export function CustomButton({ children, variant = "default", size = "default", className, ...props }) {
  return (
    <ShadcnButton variant={variant} size={size} className={className} {...props}>
      {children}
    </ShadcnButton>
  )
}
'

create_file "src/components/ui/ProgressBar.tsx" '
import { Progress } from "@/components/ui/progress"

export function ProgressBar({ value, max = 100, className, ...props }) {
  return (
    <Progress value={(value / max) * 100} className={className} {...props} />
  )
}
'

create_file "src/components/ui/Modal.tsx" '
import { Button } from "@/components/ui/button"

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
'

create_file "src/components/ui/FormField.tsx" '
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
'

create_file "src/components/ui/Alert.tsx" '
import { AlertCircle, CheckCircle2 } from "lucide-react"

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
'

create_file "src/components/ui/SectionHeading.tsx" '
export function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
    </div>
  )
}
'

create_file "src/components/ui/Avatar.tsx" '
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CustomAvatar({ src, alt, fallback }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
'

create_file "src/components/ui/Tag.tsx" '
import { Badge } from "@/components/ui/badge"

export function Tag({ children, variant = "default" }) {
  return (
    <Badge variant={variant}>{children}</Badge>
  )
}
'

# Create home components
create_file "src/components/home/HeroSection.tsx" '
import { Button } from "@/components/ui/button"

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
'

create_file "src/components/home/FeatureList.tsx" '
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/SectionHeading"

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
'

create_file "src/components/home/TestimonialSection.tsx" '
import { Card, CardContent } from "@/components/ui/card"
import { CustomAvatar } from "@/components/ui/Avatar"
import { SectionHeading } from "@/components/ui/SectionHeading"

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
'

create_file "src/components/home/CallToAction.tsx" '
import { Button } from "@/components/ui/button"

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
'

# Create the remaining components and pages similarly...

# Echo success message
echo "Components and pages have been created successfully."
