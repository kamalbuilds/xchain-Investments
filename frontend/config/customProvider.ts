import { signTypedData, call } from '@wagmi/core';

interface EIP712TypedData {
  domain: any;
  types: any;
  primaryType: string;
  message: any;
}

interface BlockchainProviderConnector {
  signTypedData(
    walletAddress: string,
    typedData: EIP712TypedData
  ): Promise<string>;

  ethCall(contractAddress: string, callData: string): Promise<string>;
}

export class WagmiConnectorProvider implements BlockchainProviderConnector {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  async signTypedData(
    walletAddress: string,
    typedData: EIP712TypedData
  ): Promise<string> {
    const result = await signTypedData(this.config, {
      domain: typedData.domain,
      types: typedData.types,
      primaryType: typedData.primaryType,
      message: typedData.message,
    });
    return result;
  }

  async ethCall(contractAddress: string, callData: string): Promise<string> {
    const result = await call(this.config, {
      to: contractAddress,
      data: callData,
    });
    return result;
  }
}