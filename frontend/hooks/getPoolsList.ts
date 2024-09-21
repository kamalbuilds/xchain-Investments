import { XChainChitFundContract } from "@/config/PoolFundContract.config"
import { PoolFundABI } from "@/lib/ABI"
import { useReadContract } from "wagmi"

export const useGetPoolsList = ()=>{
    const { data, isError, isLoading } = useReadContract({
        address: XChainChitFundContract,
        abi: PoolFundABI,
        functionName: "pools",
        // args: [poolId], // Pass the current pool ID
      })

    // return()
}
