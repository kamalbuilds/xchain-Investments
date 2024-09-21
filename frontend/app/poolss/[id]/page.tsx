import React from "react"

const PoolPage = ({ params }: { params: any }) => {
  console.log("Pool Id", params.id)

  return <div>Show Pool Page by Id {params.id}</div>
}

export default PoolPage
