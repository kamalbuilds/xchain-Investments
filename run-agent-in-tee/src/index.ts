import '@phala/wapo-env';
import { Hono } from 'hono/tiny';
import { handle } from '@phala/wapo-env/guest';
import { privateKeyToAccount } from 'viem/accounts';
import {
  keccak256,
  http,
  type Address,
  createPublicClient,
  PrivateKeyAccount,
  verifyMessage,
  createWalletClient,
  parseGwei,
  encodeFunctionData,
} from 'viem';
import { baseSepolia } from 'viem/chains';
import superjson from 'superjson';

// Define the ABI of the FunctionsConsumer contract
const FUNCTIONS_CONSUMER_ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'source', type: 'string' },
      { internalType: 'uint8', name: 'secretsLocation', type: 'uint8' },
      { internalType: 'bytes', name: 'encryptedSecretsReference', type: 'bytes' },
      { internalType: 'string[]', name: 'args', type: 'string[]' },
      { internalType: 'bytes[]', name: 'bytesArgs', type: 'bytes[]' },
      { internalType: 'uint64', name: 'subscriptionId', type: 'uint64' },
      { internalType: 'uint32', name: 'callbackGasLimit', type: 'uint32' }
    ],
    name: 'sendRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const FUNCTIONS_CONSUMER_ADDRESS = '0xYourFunctionsConsumerContractAddress'; // Replace with your contract address

export const app = new Hono();

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(),
});

function getECDSAAccount(salt: string): PrivateKeyAccount {
  const derivedKey = Wapo.deriveSecret(salt);
  const keccakPrivateKey = keccak256(derivedKey);
  return privateKeyToAccount(keccakPrivateKey);
}

async function signData(account: PrivateKeyAccount, data: string): Promise<any> {
  let result = {
    derivedPublicKey: account.address,
    data: data,
    signature: ''
  };
  const publicKey = account.address;
  console.log(`Signing data [${data}] with Account [${publicKey}]`);
  const signature = await account.signMessage({
    message: data,
  });
  console.log(`Signature: ${signature}`);
  result.signature = signature;
  return result;
}

async function verifyData(account: PrivateKeyAccount, data: string, signature: any): Promise<any> {
  let result = {
    derivedPublicKey: account.address,
    data: data,
    signature: signature,
    valid: false
  };
  const publicKey = account.address;
  console.log("Verifying Signature with PublicKey ", publicKey);
  const valid = await verifyMessage({
    address: publicKey,
    message: data,
    signature,
  });
  console.log("Is signature valid? ", valid);
  result.valid = valid;
  return result;
}

async function sendTransaction(account: PrivateKeyAccount, to: Address, gweiAmount: string): Promise<any> {
  let result = {
    derivedPublicKey: account.address,
    to: to,
    gweiAmount: gweiAmount,
    hash: '',
    receipt: {}
  };
  console.log(`Sending Transaction with Account ${account.address} to ${to} for ${gweiAmount} gwei`);
  // @ts-ignore
  const hash = await walletClient.sendTransaction({
    account,
    to,
    value: parseGwei(`${gweiAmount}`),
  });
  console.log(`Transaction Hash: ${hash}`);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log(`Transaction Status: ${receipt.status}`);
  result.hash = hash;
  result.receipt = receipt;
  return result;
}

// Function to call the sendRequest function on the FunctionsConsumer contract
async function callFunctionsConsumer(
  account: PrivateKeyAccount,
  source: string,
  secretsLocation: number,
  encryptedSecretsReference: string,
  args: string[],
  bytesArgs: string[],
  subscriptionId: number,
  callbackGasLimit: number
) {
  // Encode the function data for sendRequest
  const data = encodeFunctionData({
    abi: FUNCTIONS_CONSUMER_ABI,
    functionName: 'sendRequest',
    args: [source, secretsLocation, encryptedSecretsReference, args, bytesArgs, subscriptionId, callbackGasLimit]
  });

  // Send the transaction using walletClient
  const txHash = await walletClient.sendTransaction({
    account,
    to: FUNCTIONS_CONSUMER_ADDRESS,
    data,
  });

  console.log(`Transaction Hash: ${txHash}`);

  // Wait for the transaction receipt
  const receipt = await publicClient.waitForTransactionReceipt( { hash: txHash });
  console.log(`Transaction Receipt: ${receipt.status}`);
  return { txHash, receipt };
}

app.get('/', async (c) => {
  let vault: Record<string, string> = {};
  let queries = c.req.queries() || {};
  let result = {};
  try {
    vault = JSON.parse(process.env.secret || '');
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to parse secrets" });
  }
  const secretSalt = vault.secretSalt ? vault.secretSalt : 'SALTY_BAE';
  const getType = queries.type ? queries.type[0] : '';
  const account = getECDSAAccount(secretSalt);
  const data = queries.data ? queries.data[0] : '';

  console.log(`Type: ${getType}, Data: ${data}`);

  try {
    if (getType == 'sendTx') {
      result = (queries.to && queries.gweiAmount)
        ? await sendTransaction(account, queries.to[0] as Address, queries.gweiAmount[0])
        : { message: 'Missing query [to] or [gweiAmount] in URL' };
    } else if (getType == 'sign') {
      result = data ? await signData(account, data) : { message: 'Missing query [data] in URL' };
    } else if (getType == 'verify') {
      if (data && queries.signature) {
        result = await verifyData(account, data, queries.signature[0] as string);
      } else {
        result = { message: 'Missing query [data] or [signature] in URL' };
      }
    } else if (getType == 'callConsumer') {
      // Extract parameters for calling FunctionsConsumer
      const source = queries.source ? queries.source[0] : '';
      const secretsLocation = queries.secretsLocation ? parseInt(queries.secretsLocation[0]) : 0;
      const encryptedSecretsReference = queries.encryptedSecretsReference ? queries.encryptedSecretsReference[0] : '0x';
      const args = queries.args ? JSON.parse(queries.args[0]) : [];
      const bytesArgs = queries.bytesArgs ? JSON.parse(queries.bytesArgs[0]) : [];
      const subscriptionId = queries.subscriptionId ? parseInt(queries.subscriptionId[0]) : 1;
      const callbackGasLimit = queries.callbackGasLimit ? parseInt(queries.callbackGasLimit[0]) : 1000000;

      // Execute the call to the FunctionsConsumer contract
      result = await callFunctionsConsumer(account, source, secretsLocation, encryptedSecretsReference, args, bytesArgs, subscriptionId, callbackGasLimit);
    } else {
      result = { derivedPublicKey: account.address };
    }
  } catch (error) {
    console.error('Error:', error);
    // @ts-ignore
    result = { message: error.message };
  }

  const { json } = superjson.serialize(result);
  return c.json(json);
});

app.post('/', async (c) => {
  const data = await c.req.json();
  console.log('User payload in JSON:', data);
  return c.json(data);
});

export default handle(app);