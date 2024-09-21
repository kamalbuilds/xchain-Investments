'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Globe, Shield, TrendingUp, Zap } from "lucide-react"
import { useState } from 'react'

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Cross-Chain Liquidity Pools for DeFi Innovation</h1>
        <p className="text-xl mb-8">Seamlessly provide liquidity across multiple blockchains and earn rewards</p>
        <div className="space-x-4">
          <Button size="lg" variant="secondary">Explore Pools</Button>
          <Button size="lg">Launch Your Pool</Button>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-10 w-10 mb-2 text-primary" />
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
    { icon: Shield, title: "Secure & Audited", description: "All smart contracts are thoroughly audited and secured across multiple chains." },
    { icon: Globe, title: "Cross-Chain Compatibility", description: "Seamlessly interact with pools across various blockchain networks." },
    { icon: Zap, title: "Efficient Liquidity", description: "Optimize your assets' performance with automated cross-chain rebalancing." },
    { icon: TrendingUp, title: "Yield Optimization", description: "Maximize returns through intelligent allocation and yield farming strategies." },
  ]

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose XChainPools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PoolCard({ pool }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pool.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{pool.description}</p>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary">{pool.type}</Badge>
          <span className="text-sm font-medium">${pool.tvl.toLocaleString()} TVL</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">APY:</span>
          <span className="text-sm font-medium text-green-600">{pool.apy}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Supported Chains:</span>
          <div className="flex space-x-1">
            {pool.chains.map((chain, index) => (
              <Badge key={index} variant="outline">{chain}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">{pool.providers} Providers</span>
        <Button variant="outline" size="sm">
          View Pool <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function FeaturedPools() {
  const pools = [
    { name: "ETH-USDC Stability", description: "High-yield stablecoin-ETH liquidity pool", type: "Stablecoin-Crypto", tvl: 10000000, apy: 8.5, chains: ["ETH", "BSC", "AVAX"], providers: 1200 },
    { name: "Cross-Chain BTC", description: "Wrapped Bitcoin liquidity across multiple chains", type: "Single Asset", tvl: 25000000, apy: 6.2, chains: ["ETH", "BSC", "SOL"], providers: 850 },
    { name: "DeFi Index", description: "Diversified pool of top DeFi tokens", type: "Index", tvl: 5000000, apy: 12.8, chains: ["ETH", "MATIC", "AVAX"], providers: 620 },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Pools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pools.map((pool, index) => (
            <PoolCard key={index} pool={pool} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg">View All Pools</Button>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ name, role, quote }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="italic mb-4">&quot;{quote}&quot;</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
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
    { name: "Alex Chen", role: "Liquidity Provider", quote: "XChainPools has revolutionized how I manage my crypto assets across different chains." },
    { name: "Samantha Lee", role: "DeFi Enthusiast", quote: "The yield optimization strategies have significantly boosted my returns compared to single-chain solutions." },
    { name: "David Kumar", role: "Protocol Integrator", quote: "Integrating with XChainPools has brought unparalleled liquidity to our DeFi protocol." },
  ]

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    { title: "Connect Wallet", description: "Link your wallet to access multiple blockchain networks." },
    { title: "Choose Pools", description: "Select from a variety of cross-chain liquidity pools." },
    { title: "Provide Liquidity", description: "Deposit assets and start earning rewards instantly." },
    { title: "Optimize & Earn", description: "Benefit from automated yield optimization across chains." },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How XChainPools Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-2">
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
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-8">Get the latest news on cross-chain liquidity and DeFi innovations</p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-sm mr-2 bg-primary-foreground text-primary"
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
