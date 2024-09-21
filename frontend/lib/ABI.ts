export const PoolFundABI = [
  {
    inputs: [
      {
        internalType: "contract IWorldID",
        name: "_worldId",
        type: "address",
      },
      {
        internalType: "string",
        name: "_appId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_action",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidNullifier",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cycle",
        type: "uint256",
      },
    ],
    name: "BidSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cycle",
        type: "uint256",
      },
    ],
    name: "ContributionMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "MemberJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cycle",
        type: "uint256",
      },
    ],
    name: "PayoutDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PenaltyApplied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cycle",
        type: "uint256",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bidAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
    ],
    name: "contribute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "depositAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isAnonymousVoting",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "depositPeriodDays",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "withdrawPeriodDays",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "distributeRemainingCycle",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "minBidAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxBidAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commitmentDeposit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "penaltyRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bidSubmissionDeadline",
            type: "uint256",
          },
        ],
        internalType: "struct PoolFund.PoolParameters",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
    ],
    name: "finalizeCycle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cycle",
        type: "uint256",
      },
    ],
    name: "getAllBids",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bidAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct PoolFund.Bid[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cycle",
        type: "uint256",
      },
    ],
    name: "getBidDetails",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bidAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct PoolFund.Bid",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_memberAddress",
        type: "address",
      },
    ],
    name: "getMemberDetails",
    outputs: [
      {
        internalType: "address",
        name: "memberAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalContributions",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWinnings",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPenalties",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
    ],
    name: "getPoolDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isAnonymousVoting",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "depositPeriodDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "withdrawPeriodDays",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "distributeRemainingCycle",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "valueStored",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minBidAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxBidAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commitmentDeposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "penaltyRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "memberCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bidSubmissionDeadline",
        type: "uint256",
      },
      {
        internalType: "enum PoolFund.PoolStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "members",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "currentCycle",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
    ],
    name: "getPoolMembers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
    ],
    name: "getPoolTransactions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "transactionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "poolId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "memberAddress",
            type: "address",
          },
          {
            internalType: "enum PoolFund.TransactionType",
            name: "transactionType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "date",
            type: "uint256",
          },
          {
            internalType: "enum PoolFund.TransactionStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isAnonymous",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "cycleNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "penaltyAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "remainingBalance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "initiatedBy",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "txHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "previousTransactionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct PoolFund.Transaction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_transactionId",
        type: "uint256",
      },
    ],
    name: "getTransaction",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "transactionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "poolId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "memberAddress",
            type: "address",
          },
          {
            internalType: "enum PoolFund.TransactionType",
            name: "transactionType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "date",
            type: "uint256",
          },
          {
            internalType: "enum PoolFund.TransactionStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isAnonymous",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "cycleNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "penaltyAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "remainingBalance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "initiatedBy",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "txHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "previousTransactionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct PoolFund.Transaction",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasContributed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cycle",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_memberAddress",
        type: "address",
      },
    ],
    name: "hasMemberContributed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cycle",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_memberAddress",
        type: "address",
      },
    ],
    name: "hasMemberVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
    ],
    name: "joinPool",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "poolBids",
    outputs: [
      {
        internalType: "uint256",
        name: "bidAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "poolMembers",
    outputs: [
      {
        internalType: "address",
        name: "memberAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalContributions",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWinnings",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPenalties",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolTransactions",
    outputs: [
      {
        internalType: "uint256",
        name: "transactionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "memberAddress",
        type: "address",
      },
      {
        internalType: "enum PoolFund.TransactionType",
        name: "transactionType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
      {
        internalType: "enum PoolFund.TransactionStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isAnonymous",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "cycleNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "penaltyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingBalance",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "initiatedBy",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "previousTransactionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pools",
    outputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isAnonymousVoting",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "depositPeriodDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "withdrawPeriodDays",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "distributeRemainingCycle",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "valueStored",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minBidAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxBidAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commitmentDeposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "penaltyRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "memberCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bidSubmissionDeadline",
        type: "uint256",
      },
      {
        internalType: "enum PoolFund.PoolStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentCycle",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bidAmount",
        type: "uint256",
      },
    ],
    name: "submitBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transactionCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "verifyAndExecute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "voteType",
        type: "bool",
      },
      {
        internalType: "address",
        name: "signal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierhash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "voteOnBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
