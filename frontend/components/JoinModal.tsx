import { BigNumberish, ethers } from "ethers"
import { useState } from "react"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { XChainChitFundContract } from "@/config/PoolFundContract.config"
import { getEthersSigner, wagmiConfig } from "@/config/wagmi.config"
import { PoolFundABI } from "@/lib/ABI"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "@/hooks/use-toast"

const JoinModal = ({
  amount,
  poolId,
  poolName,
  fetchPools,
  setOpen
}: {
  amount?: any
  poolId: number | BigNumberish
  poolName: string
  fetchPools: () => Promise<void>
  setOpen: (open: boolean) => void
}) => {
  const { toast } = useToast()
  const [depositAmount, setDepositAount] = useState(amount)
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = async () => {
    if (!depositAmount) return

    try {
      const signer = await getEthersSigner(wagmiConfig)
      const contract = new ethers.Contract(
        XChainChitFundContract,
        PoolFundABI,
        signer
      )
      console.log("depositAmount", depositAmount)
      setIsLoading(true)

      const tx = await contract.joinPool(poolId, {
        value: ethers.parseEther(depositAmount), // Convert ETH to wei
      })

      await tx.wait()
      setIsLoading(false)
      toast({
        title: 'Successfully Joined'
      })
      fetchPools();
      setOpen(false)
    } catch (error) {
      console.log("Error in joining pool", error)
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'Error in Joining Pool',
        description: 'Check console for more reason'
      })
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Join <span className="underline">{poolName}</span>{" "}
        </DialogTitle>

        <DialogDescription className="flex flex-col gap-8 p-12">
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount(in eth)</Label>
            <Input
              type="text"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => {
                setDepositAount(e.target.value)
              }}
            />
          </div>
          <Button onClick={handleJoin} disabled={!depositAmount}>
            {isLoading ? "Joining...." : "Join"}
          </Button>
        </DialogDescription>
      </DialogHeader>
    </>
  )
}

export default JoinModal
