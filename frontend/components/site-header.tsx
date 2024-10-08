"use client"

import { DynamicWidget } from "@dynamic-labs/sdk-react-core"
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit"
import { decodeAbiParameters } from "viem"
import { useAccount } from "wagmi"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

import { MainNav } from "./main-nav"

export function SiteHeader() {
  // Mock function for proof verification, should be replaced with your server-side verification logic

  // Handle success callback after successful verification
  const onSuccess = (data: any) => {
    console.log("Verification successful:", data)

    const unpackedProof = decodeAbiParameters(
      [{ type: "uint256[8]" }],
      data.proof
    )[0]

    console.log("unpacked proof:", unpackedProof)
    // const app_id = process.env.APP_ID
    // const action = process.env.ACTION_ID
    console.log("unpacked proof", unpackedProof)
    // const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse
    console.log("Verification successful!")
  }

  const { address } = useAccount()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background p-4">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <nav className="hidden space-x-2 md:flex">
            <MainNav items={siteConfig.mainNav} />
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <DynamicWidget />

          <IDKitWidget
            // @ts-ignore
            app_id={process.env.NEXT_PUBLIC_APP_ID || "app_undefined"}
            action={process.env.NEXT_PUBLIC_ACTION_ID || "verify"}
            signal={address}
            verification_level={VerificationLevel.Orb}
            onSuccess={onSuccess}
          >
            {({ open }) => (
              <Button onClick={open} variant="outline">
                Verify with World ID
              </Button>
            )}
          </IDKitWidget>
        </div>
      </div>
    </header>
  )
}
