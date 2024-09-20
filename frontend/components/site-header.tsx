'use client';

import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";


import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import Link from "next/link";

export function SiteHeader() {
  // Mock function for proof verification, should be replaced with your server-side verification logic
  const verifyProof = async (proof: ISuccessResult) => {
    // Replace this with your actual server route to verify the proof
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proof }),
      });
      console.log('Response:', response);

      console.log('Proof:', proof);
      if (!response.ok) {
        throw new Error('Verification failed');
      }

      console.log('Proof verified successfully');
    } catch (error) {
      console.error('Error verifying proof:', error);
    }
  };

  // Handle success callback after successful verification
  const onSuccess = (req) => {
    const proof = req.body
    const app_id = process.env.APP_ID
    const action = process.env.ACTION_ID
    console.log(proof, app_id, action);
    // const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse
    console.log('Verification successful!');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left Side: Logo and Navigation Buttons */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold">FundDAO</h1>

          {/* Navigation Buttons */}
          <nav className="hidden md:flex space-x-2">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Explore</Button>
            <Button variant="ghost">Create</Button>
            <Button variant="ghost">Dashboard</Button>
          </nav>
        </div>

        {/* Right Side: Social Links, Theme Toggle, Worldcoin Sign-In, and Avatar */}
        <div className="flex items-center space-x-4">
          {/* Social Links */}
          <nav className="flex items-center space-x-1">
            {/* GitHub Link */}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon" className="p-2">
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>

            {/* Twitter Link */}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon" className="p-2">
                <Icons.twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Worldcoin Sign-In Button */}
          <IDKitWidget
            app_id={process.env.APP_ID || 'app_undefined'}
            action={process.env.ACTION_ID || 'action_undefined'}
            verification_level={VerificationLevel.Orb}
            handleVerify={verifyProof}
            onSuccess={onSuccess}
          >
            {({ open }) => (
              <Button onClick={open} variant="outline">
                Verify with World ID
              </Button>
            )}
          </IDKitWidget>

          {/* User Avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
