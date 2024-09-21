"use client"

import { ArrowRight, Globe, Shield, TrendingUp, Zap } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 text-primary-foreground">
      <div className="container mx-auto text-center">
        <h1 className="mb-4 text-5xl font-bold">
          Cross-Chain Liquidity Pools for DeFi Innovation
        </h1>
        <p className="mb-8 text-xl">
          Seamlessly provide liquidity across multiple blockchains and earn
          rewards
        </p>
        <div className="space-x-4">
          <Button size="lg" variant="secondary">
            Explore Pools
          </Button>
          <Button size="lg">Launch Your Pool</Button>
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <Icon className="mb-2 size-10 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

function FeatureList() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Audited",
      description:
        "All smart contracts are thoroughly audited and secured across multiple chains.",
    },
    {
      icon: Globe,
      title: "Cross-Chain Compatibility",
      description:
        "Seamlessly interact with pools across various blockchain networks.",
    },
    {
      icon: Zap,
      title: "Efficient Liquidity",
      description:
        "Optimize your assets' performance with automated cross-chain rebalancing.",
    },
    {
      icon: TrendingUp,
      title: "Yield Optimization",
      description:
        "Maximize returns through intelligent allocation and yield farming strategies.",
    },
  ]

  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose XChainPools?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Pool {
  name: string;
  description: string;
  type: string;
  tvl: number;
  apy: number;
  chains: string[];
  providers: number;
}

function PoolCard({ pool }: { pool: Pool }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pool.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{pool.description}</p>
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="secondary">{pool.type}</Badge>
          <span className="text-sm font-medium">
            ${pool.tvl.toLocaleString()} TVL
          </span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">APY:</span>
          <span className="text-sm font-medium text-green-600">
            {pool.apy}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Supported Chains:
          </span>
          <div className="flex space-x-1">
            {pool.chains.map((chain, index) => (
              <Badge key={index} variant="outline">
                {chain}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {pool.providers} Providers
        </span>
        <Button variant="outline" size="sm">
          View Pool <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function FeaturedPools() {
  const pools = [
    {
      name: "ETH-USDC Stability",
      description: "High-yield stablecoin-ETH liquidity pool",
      type: "Stablecoin-Crypto",
      tvl: 10000000,
      apy: 8.5,
      chains: ["ETH", "BSC", "AVAX"],
      providers: 1200,
    },
    {
      name: "Cross-Chain BTC",
      description: "Wrapped Bitcoin liquidity across multiple chains",
      type: "Single Asset",
      tvl: 25000000,
      apy: 6.2,
      chains: ["ETH", "BSC", "SOL"],
      providers: 850,
    },
    {
      name: "DeFi Index",
      description: "Diversified pool of top DeFi tokens",
      type: "Index",
      tvl: 5000000,
      apy: 12.8,
      chains: ["ETH", "MATIC", "AVAX"],
      providers: 620,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">Featured Pools</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pools.map((pool, index) => (
            <PoolCard key={index} pool={pool} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg">View All Pools</Button>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
}

function TestimonialCard({ name, role, quote }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="mb-4 italic">&quot;{quote}&quot;</p>
        <div className="flex items-center">
          <Avatar className="mr-4 size-10">
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TestimonialSection() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Liquidity Provider",
      quote:
        "XChainPools has revolutionized how I manage my crypto assets across different chains.",
    },
    {
      name: "Samantha Lee",
      role: "DeFi Enthusiast",
      quote:
        "The yield optimization strategies have significantly boosted my returns compared to single-chain solutions.",
    },
    {
      name: "David Kumar",
      role: "Protocol Integrator",
      quote:
        "Integrating with XChainPools has brought unparalleled liquidity to our DeFi protocol.",
    },
  ]

  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      title: "Connect Wallet",
      description: "Link your wallet to access multiple blockchain networks.",
    },
    {
      title: "Choose Pools",
      description: "Select from a variety of cross-chain liquidity pools.",
    },
    {
      title: "Provide Liquidity",
      description: "Deposit assets and start earning rewards instantly.",
    },
    {
      title: "Optimize & Earn",
      description: "Benefit from automated yield optimization across chains.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">
          How XChainPools Works
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
        <p className="mb-8">
          Get the latest news on cross-chain liquidity and DeFi innovations
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mr-2 w-full max-w-sm bg-primary-foreground text-primary"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

export function HomePageComponent() {
  return (
    <div className="bg-background">
      <HeroSection />
      <FeatureList />
      <FeaturedPools />
      <TestimonialSection />
      <HowItWorksSection />
      <NewsletterSection />
    </div>
  )
}
