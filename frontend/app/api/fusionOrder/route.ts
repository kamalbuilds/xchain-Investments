import { NextRequest, NextResponse } from "next/server"
import { HashLock, PrivateKeyProviderConnector, SDK } from "1inch-xchain-sdk"
import { uint8ArrayToHex } from "@1inch/byte-utils"
import { randomBytes, solidityPackedKeccak256 } from "ethers"

import { BASE_URL } from "@/config/1inch.config"
import Web3 from "web3";
import { getEthersProvider, getEthersSigner, wagmiConfig } from "@/config/wagmi.config";
import { WagmiConnectorProvider } from "@/config/customProvider"

function getRandomBytes32(): string {
  return uint8ArrayToHex(randomBytes(32))
}

export async function POST(req: NextRequest) {
  try {
    const {
      sourceChain,
      destinationChain,
      srcTokenAddress,
      dstTokenAddress,
      amount,
      walletAddress,
    } = await req.json();

    const blockchain = new WagmiConnectorProvider(wagmiConfig);

    // const sourceChain = 1
    // const destinationChain = 137

    const makerPrivateKey = '0x123....'
    const makerAddress = '0x123....'

    // const nodeUrl = ''

    // const blockchainProvider = new PrivateKeyProviderConnector(
    //   makerPrivateKey,
    //   new Web3(nodeUrl)
    // );

      const Ethsigner = await getEthersSigner(wagmiConfig, { chainId: 1 })
    
    const sdk = new SDK({
      url: "https://api.1inch.dev/fusion-plus",
      authKey: "okz7YzxXA8DPc7eehhXbolnROttzvKYA",
      blockchainProvider: blockchain
    })

    const params = {
      srcChainId: sourceChain,
      dstChainId: destinationChain,
      srcTokenAddress: srcTokenAddress,
      dstTokenAddress: dstTokenAddress,
      amount: amount,
      enableEstimate: false,
    }

    const q = await sdk.getQuote(params)

    console.log(q, "q")

    const secretsCount = q?.getPreset().secretsCount

    const secrets = Array.from({ length: secretsCount }).map(() =>
      getRandomBytes32()
    )
    const secretHashes = secrets.map((x) => HashLock.hashSecret(x))

    const hashLock =
      secretsCount === 1
        ? HashLock.forSingleFill(secrets[0])
        : HashLock.forMultipleFills(
            secretHashes.map((secretHash, i) =>
              solidityPackedKeccak256(
                ["uint64", "bytes32"],
                [i, secretHash.toString()]
              )
            ) as (string & {
              _tag: "MerkleLeaf"
            })[]
          )

    const place = await sdk
      .placeOrder(q, {
        walletAddress: walletAddress,
        hashLock,
        secretHashes,
        // fee is an optional field
        // fee: {
        //   takingFeeBps: 100, // 1% as we use bps format, 1% is equal to 100bps
        //   takingFeeReceiver: "0x0000000000000000000000000000000000000000", //  fee receiver address
        // },
      })
      .then((orderInfo) => {
        console.log("Order placed", orderInfo)
      })
      .catch((error) => {
        console.error("Failed to place order", error)
      })

    console.log(place, "place")

    return NextResponse.json(place, { status: 200 })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
