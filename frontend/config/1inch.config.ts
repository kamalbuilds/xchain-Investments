export const BASE_URL = `https://api.1inch.dev/fusion-plus/quoter/v1.0`

export const blockchains = [
  { name: "Ethereum", chainId: "1", key: "ethereumTokens" },
  { name: "Polygon", chainId: "137", key: "polygonTokens" },
  { name: "Base", chainId: "8453", key: "baseTokens" },
]

export const ethereumTokens = [
  {
    token: "ETH",
    tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
  },
  {
    token: "USDC",
    tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  {
    token: "USDT",
    tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
  },
]

export const polygonTokens = [
  {
    token: "USDC",
    tokenAddress: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    decimals: 6,
  },
  {
    token: "USDT",
    tokenAddress: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    decimals: 6,
  },
  {
    token: "POL",
    tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
  },
  {
    token: "WETH",
    tokenAddress: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    decimals: 18,
  },
]

export const baseTokens = [
  {
    token: "ETH",
    tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
  },
  {
    token: "USDC",
    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    decimals: 6,
  },
  {
    token: "WETH",
    tokenAddress: "0x4200000000000000000000000000000000000006",
    decimals: 18,
  },
]
