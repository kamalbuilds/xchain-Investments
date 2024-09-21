import { NextRequest, NextResponse } from "next/server"
import { HashLock, PrivateKeyProviderConnector, SDK } from "1inch-xchain-sdk"
import { uint8ArrayToHex } from "@1inch/byte-utils"
import { getWalletClient } from "@wagmi/core"
import { BrowserProvider, randomBytes, solidityPackedKeccak256 } from "ethers"
import { useWalletClient } from "wagmi"
import Web3 from "web3"
import { type BlockchainProviderConnector, FusionSDK } from "@1inch/fusion-sdk";

import { BASE_URL } from "@/config/1inch.config"
import { Web3ProviderConnector } from "@/config/customProvider"
import {
  getEthersProvider,
  getEthersSigner,
  wagmiConfig,
} from "@/config/wagmi.config"
import { useEffect } from "react"
import { set } from "react-hook-form"


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
      client,
      pvd
    } = await req.json();

    console.log(client, "client");

    // Ensure the client is a valid provider conforming to EIP-1193
    const provider = new Web3(client);


    // const blockprovider = new Web3ProviderConnector(provider);
    // Creating Web3ProviderConnector with the validated provider

    console.log(provider, "provider");


    // const makerPrivateKey = "0x";
    // const makerAddress = "0x...";

    // const pvtkey = new PrivateKeyProviderConnector(makerPrivateKey, client);


    const sdk = new SDK({
      url: "https://api.1inch.dev/fusion-plus",
      authKey: process.env.NEXT_PUBLIC_ONE_INCH,
      blockchainProvider: pvd,
    });

    const params = {
      srcChainId: sourceChain,
      dstChainId: destinationChain,
      srcTokenAddress: srcTokenAddress,
      dstTokenAddress: dstTokenAddress,
      amount: amount,
      enableEstimate: true,
    };

    const q = await sdk.getQuote(params);

    console.log(q, "q");

    const secretsCount = q?.getPreset().secretsCount;

    const secrets = Array.from({ length: secretsCount }).map(() =>
      getRandomBytes32()
    );
    const secretHashes = secrets.map((x) => HashLock.hashSecret(x));

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
              _tag: "MerkleLeaf";
            })[]
          );

          let placeSuccess = false;
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
        console.log("Order placed", orderInfo);
    
         placeSuccess = true;
      })
      .catch((error) => {
        console.error("Failed to place order", error);
      });
    
    console.log('Order placed:', placeSuccess ? 'Success' : 'Failed');

    return NextResponse.json({ result: 'Order placed successfully' }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
