import { BigNumberish as BigNumber } from 'ethers';

// Enum equivalent to Solidity's PoolStatus
enum PoolStatus {
  Active = 0,
  Closed = 1,
  Paused = 2,
}

// Interface for the Pool struct
interface Pool {
  poolId: BigNumber;
  name: string;
  title: string;
  depositAmount: BigNumber;
  isAnonymousVoting: boolean;
  depositPeriodDays: BigNumber;
  withdrawPeriodDays: BigNumber;
  distributeRemainingCycle: boolean;
  valueStored: BigNumber;
  minBidAmount: BigNumber;
  maxBidAmount: BigNumber;
  commitmentDeposit: BigNumber;
  penaltyRate: BigNumber;
  memberCount: BigNumber;
  bidSubmissionDeadline: BigNumber;
  status: PoolStatus;
  createdAt: BigNumber;
  updatedAt: BigNumber;
  members: string[]; // Array of Ethereum addresses
  currentCycle: BigNumber;
  hasVoted: { [cycle: string]: { [member: string]: boolean } };
  voters: { [cycle: string]: BigNumber[] }; // Mapping of cycle to array of voter nullifier hashes
}

// Interface for the Member struct
interface Member {
  memberAddress: string // Ethereum address
  totalContributions: BigNumber
  totalWinnings: BigNumber
  totalPenalties: BigNumber
  isActive: boolean
}

// Interface for the Bid struct
interface Bid {
  bidAmount: BigNumber
  bidder: string // Ethereum address
  voteCount: BigNumber
  exists: boolean
}

// Enums for TransactionType and TransactionStatus
enum TransactionType {
  Deposit = 0,
  Withdrawal = 1,
  Bid = 2,
  Penalty = 3,
  Distribution = 4,
}

enum TransactionStatus {
  Completed = 0,
  Pending = 1,
  Failed = 2,
}

// Interface for the Transaction struct
interface Transaction {
  transactionId: BigNumber
  poolId: BigNumber
  memberAddress: string // Ethereum address
  transactionType: TransactionType
  amount: BigNumber
  date: BigNumber
  status: TransactionStatus
  description: string
  isAnonymous: boolean
  cycleNumber: BigNumber
  penaltyAmount: BigNumber
  remainingBalance: BigNumber
  initiatedBy: string
  txHash: string // bytes32 in Solidity, represented as a hex string
  previousTransactionId: BigNumber
  createdAt: BigNumber
  updatedAt: BigNumber
}

// Interface for the TransactionInput struct
interface TransactionInput {
  poolId: BigNumber
  memberAddress: string // Ethereum address
  transactionType: TransactionType
  amount: BigNumber
  description: string
  isAnonymous: boolean
  cycleNumber: BigNumber
  penaltyAmount: BigNumber
  initiatedBy: string
}

// Interface for PoolParameters struct
interface PoolParameters {
  name: string
  title: string
  depositAmount: BigNumber
  isAnonymousVoting: boolean
  depositPeriodDays: BigNumber
  withdrawPeriodDays: BigNumber
  distributeRemainingCycle: boolean
  minBidAmount: BigNumber
  maxBidAmount: BigNumber
  commitmentDeposit: BigNumber
  penaltyRate: BigNumber
  bidSubmissionDeadline: BigNumber
}

// Interface for the Member struct
interface Member {
  memberAddress: string // Ethereum address
  totalContributions: BigNumber
  totalWinnings: BigNumber
  totalPenalties: BigNumber
  isActive: boolean
}

// Interface for the Bid struct
interface Bid {
  bidAmount: BigNumber
  bidder: string // Ethereum address
  voteCount: BigNumber
  exists: boolean
}

// Interface for the Transaction struct
interface Transaction {
  transactionId: BigNumber
  poolId: BigNumber
  memberAddress: string // Ethereum address
  transactionType: TransactionType
  amount: BigNumber
  date: BigNumber
  status: TransactionStatus
  description: string
  isAnonymous: boolean
  cycleNumber: BigNumber
  penaltyAmount: BigNumber
  remainingBalance: BigNumber
  initiatedBy: string
  txHash: string // bytes32 in Solidity, represented as a hex string
  previousTransactionId: BigNumber
  createdAt: BigNumber
  updatedAt: BigNumber
}

// Interface for the TransactionInput struct
interface TransactionInput {
  poolId: BigNumber
  memberAddress: string // Ethereum address
  transactionType: TransactionType
  amount: BigNumber
  description: string
  isAnonymous: boolean
  cycleNumber: BigNumber
  penaltyAmount: BigNumber
  initiatedBy: string
}

// Interface for PoolParameters struct
interface PoolParameters {
  name: string
  title: string
  depositAmount: BigNumber
  isAnonymousVoting: boolean
  depositPeriodDays: BigNumber
  withdrawPeriodDays: BigNumber
  distributeRemainingCycle: boolean
  minBidAmount: BigNumber
  maxBidAmount: BigNumber
  commitmentDeposit: BigNumber
  penaltyRate: BigNumber
  bidSubmissionDeadline: BigNumber
}

export { PoolStatus, TransactionStatus, TransactionType };
export type {
    Bid, Member, Pool, PoolParameters, Transaction,
    TransactionInput
};
