
import PoolCard from "@/components/pools/PoolCard"

const PoolsPage = () => {
  const Pools = [
    {
      title: "Test Pool #1",
      description: "This is a test pool. Think before deposit",
    },
    {
      title: "Transparent Transactions",
      description:
        "All fund movements are recorded on the blockchain for full transparency",
    },
    {
      title: "Decentralized Governance",
      description: "Pools are governed by their community through DAOs",
    },
  ]

  return (
    <div className="px-12 py-8">
      <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        List of Pools Active
      </h2>

      <div className="flex flex-wrap">
        {Pools.map((pool) => (
          <PoolCard pool={pool} />
        ))}
      </div>
    </div>
  )
}

export default PoolsPage
