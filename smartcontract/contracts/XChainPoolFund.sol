pragma solidity ^0.8.20;

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";

contract XChainPoolFund is CCIPReceiver {
    /// @dev This allows us to use our hashToField function on bytes
    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();
       error UnauthorizedSender();
    error IncorrectToken();

    /// @dev The address of the World ID Router contract that will be used for verifying proofs
    IWorldID internal immutable worldId;

     IRouterClient public immutable ccipRouter;
       address public immutable LINK_TOKEN; 

    /// @dev The keccak256 hash of the externalNullifier (unique identifier of the action performed), combination of appId and action
    uint256 internal immutable externalNullifierHash;

    /// @dev The World ID group ID (1 for Orb-verified)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    // Pool structure
    struct Pool {
        uint256 poolId;
        string name;
        string title;
        uint256 depositAmount;
        bool isAnonymousVoting;
        uint256 depositPeriodDays;
        uint256 withdrawPeriodDays;
        bool distributeRemainingCycle;
        uint256 valueStored;
        uint256 minBidAmount;
        uint256 maxBidAmount;
        uint256 commitmentDeposit;
        uint256 penaltyRate;
        uint256 memberCount;
        uint256 bidSubmissionDeadline;
        PoolStatus status;
        uint256 createdAt;
        uint256 updatedAt;
        address[] members;
        uint256 currentCycle;
        mapping(uint256 => mapping(address => bool)) hasVoted; // cycle => member => bool
        mapping(uint256 => uint256[]) voters; // cycle => list of voter nullifierhash
    }

    // Member structure
    struct Member {
        address memberAddress;
        uint256 totalContributions;
        uint256 totalWinnings;
        uint256 totalPenalties;
        bool isActive;
    }

    // Bid structure
    struct Bid {
        uint256 bidAmount;
        address bidder;
        uint256 voteCount;
        bool exists;
    }

    // Transaction structure
    struct Transaction {
        uint256 transactionId;
        uint256 poolId;
        address memberAddress;
        TransactionType transactionType;
        uint256 amount;
        uint256 date;
        TransactionStatus status;
        string description;
        bool isAnonymous;
        uint256 cycleNumber;
        uint256 penaltyAmount;
        uint256 remainingBalance;
        string initiatedBy;
        bytes32 txHash;
        uint256 previousTransactionId;
        uint256 createdAt;
        uint256 updatedAt;
    }

    // Transaction Input Struct
    struct TransactionInput {
        uint256 poolId;
        address memberAddress;
        TransactionType transactionType;
        uint256 amount;
        string description;
        bool isAnonymous;
        uint256 cycleNumber;
        uint256 penaltyAmount;
        string initiatedBy;
    }

    // Pool Parameters Struct
    struct PoolParameters {
        string name;
        string title;
        uint256 depositAmount;
        bool isAnonymousVoting;
        uint256 depositPeriodDays;
        uint256 withdrawPeriodDays;
        bool distributeRemainingCycle;
        uint256 minBidAmount;
        uint256 maxBidAmount;
        uint256 commitmentDeposit;
        uint256 penaltyRate;
        uint256 bidSubmissionDeadline;
    }

    // Enums
    enum PoolStatus {
        Active,
        Closed,
        Paused
    }
    enum TransactionType {
        Deposit,
        Withdrawal,
        Bid,
        Penalty,
        Distribution
    }
    enum TransactionStatus {
        Completed,
        Pending,
        Failed
    }

    uint256 public poolCounter;
    uint256 public transactionCounter;

    mapping(uint256 => Pool) public pools;
    mapping(uint256 => mapping(address => Member)) public poolMembers;
    mapping(uint256 => mapping(uint256 => mapping(address => bool)))
        public hasContributed; // poolId => cycle => member => bool
    mapping(uint256 => mapping(uint256 => mapping(address => Bid)))
        public poolBids; // poolId => cycle => bidder => Bid
    mapping(uint256 => mapping(uint256 => address[])) public bidAddresses; // poolId => cycle => list of bidder addresses
    mapping(uint256 => Transaction[]) public poolTransactions;


    // Events
    event PoolCreated(uint256 poolId, string name, address creator);
    event MemberJoined(uint256 poolId, address member);
    event ContributionMade(
        uint256 poolId,
        address member,
        uint256 amount,
        uint256 cycle
    );
    event BidSubmitted(
        uint256 poolId,
        address bidder,
        uint256 amount,
        uint256 cycle
    );
    event VoteCast(
        uint256 poolId,
        address voter,
        address bidder,
        uint256 cycle
    );
    event PayoutDistributed(
        uint256 poolId,
        address winner,
        uint256 amount,
        uint256 cycle
    );
    event PenaltyApplied(uint256 poolId, address member, uint256 amount);

    event MessageSent(
        bytes32 messageId,
        uint64 targetChainId,
        address receiver,
        string message,
        Client.EVMTokenAmount tokenAmount,
        uint256 fees
    );

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _action,
        address _ccipRouter,
        address _linkToken
    ) CCIPReceiver(_ccipRouter) {
        worldId = _worldId;
         ccipRouter = IRouterClient(_ccipRouter);
         LINK_TOKEN = _linkToken;
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
            .hashToField();
    }

    // Create a new pool with parameters grouped into a struct
    function createPool(PoolParameters memory parwams) public {
        poolCounter++;
        Pool storage pool = pools[poolCounter];
        pool.poolId = poolCounter;
        pool.name = params.name;
        pool.title = params.title;
        pool.depositAmount = params.depositAmount;
        pool.isAnonymousVoting = params.isAnonymousVoting;
        pool.depositPeriodDays = params.depositPeriodDays;
        pool.withdrawPeriodDays = params.withdrawPeriodDays;
        pool.distributeRemainingCycle = params.distributeRemainingCycle;
        pool.minBidAmount = params.minBidAmount;
        pool.maxBidAmount = params.maxBidAmount;
        pool.commitmentDeposit = params.commitmentDeposit;
        pool.penaltyRate = params.penaltyRate;
        pool.bidSubmissionDeadline =
            block.timestamp +
            params.bidSubmissionDeadline *
            1 days;
        pool.status = PoolStatus.Active;
        pool.createdAt = block.timestamp;
        pool.updatedAt = block.timestamp;
        pool.currentCycle = 1;

        emit PoolCreated(poolCounter, params.name, msg.sender);
    }

    // Join an existing pool
    function joinPool(uint256 _poolId) public payable {
        Pool storage pool = pools[_poolId];
        require(pool.status == PoolStatus.Active, "Pool is not active");
        require(
            msg.value == pool.commitmentDeposit,
            "Incorrect commitment deposit"
        );
        require(!poolMembers[_poolId][msg.sender].isActive, "Already a member");

        pool.members.push(msg.sender);
        pool.memberCount++;
        pool.valueStored += msg.value;

        Member storage member = poolMembers[_poolId][msg.sender];
        member.memberAddress = msg.sender;
        member.isActive = true;

        // Record transaction
        TransactionInput memory txnInput = TransactionInput({
            poolId: _poolId,
            memberAddress: msg.sender,
            transactionType: TransactionType.Deposit,
            amount: msg.value,
            description: "Commitment Deposit",
            isAnonymous: false,
            cycleNumber: 0,
            penaltyAmount: 0,
            initiatedBy: "Member"
        });
        recordTransaction(txnInput);

        emit MemberJoined(_poolId, msg.sender);
    }

 // Modified to handle cross-chain deposits received via CCIP
    function ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override {
        bytes32 messageId = any2EvmMessage.messageId;
        uint64 sourceChainSelector = any2EvmMessage.sourceChainSelector;
        address sender = abi.decode(any2EvmMessage.sender, (address));
        Client.EVMTokenAmount[] memory tokenAmounts = any2EvmMessage.destTokenAmounts;

        // Expecting one token transfer per message, handle the first token amount
        require(tokenAmounts.length > 0, "No token amount received");

        address token = tokenAmounts[0].token;
        uint256 amount = tokenAmounts[0].amount;

        // Decode the message data to extract pool information
        (uint256 poolId) = abi.decode(any2EvmMessage.data, (uint256));
        Pool storage pool = pools[poolId];
        require(pool.status == PoolStatus.Active, "Pool is not active");

        // Ensure correct token is being used
        require(token == LINK_TOKEN, "Incorrect token");

        // Update the pool state with the received amount
        pool.valueStored += amount;

        emit ContributionMade(poolId, sender, amount, pool.currentCycle);
    }

    // Function to send a cross-chain deposit request using CCIP
    function sendCrossChainDeposit(
        uint256 _poolId,
        address receiver,
        uint64 targetChainId,
        address token,
        uint256 amount
    ) external {
        Pool storage pool = pools[_poolId];
        require(pool.status == PoolStatus.Active, "Pool is not active");
        require(token == LINK_TOKEN, "Incorrect token");

        // Approve the CCIP Router to transfer the specified amount of tokens
        IERC20(token).approve(address(ccipRouter), amount);

        // Create the token transfer details

            Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);

            Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({token: token, amount: amount});
        tokenAmounts[0] = tokenAmount;

        // Create the message payload to send across chains
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(_poolId),
            tokenAmounts: tokenAmounts,
            extraArgs: Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit: 200_000})),
            feeToken: address(0)
        });

        // Calculate fees required to send the message
        uint256 fees = ccipRouter.getFee(targetChainId, evm2AnyMessage);

        // Send the cross-chain message
        bytes32 messageId = ccipRouter.ccipSend{value: fees}(targetChainId, evm2AnyMessage);

        emit MessageSent(messageId, targetChainId, receiver, "Deposit Request", tokenAmount, fees);
    }

    // Make a contribution to the pool
    function contribute(uint256 _poolId) public payable {
        Pool storage pool = pools[_poolId];
        Member storage member = poolMembers[_poolId][msg.sender];
        uint256 cycle = pool.currentCycle;

        require(member.isActive, "Not a member of the pool");
        require(msg.value == pool.depositAmount, "Incorrect deposit amount");
        require(
            !hasContributed[_poolId][cycle][msg.sender],
            "Already contributed this cycle"
        );

        member.totalContributions += msg.value;
        pool.valueStored += msg.value;
        hasContributed[_poolId][cycle][msg.sender] = true;

        // Record transaction
        TransactionInput memory txnInput = TransactionInput({
            poolId: _poolId,
            memberAddress: msg.sender,
            transactionType: TransactionType.Deposit,
            amount: msg.value,
            description: "Monthly Contribution",
            isAnonymous: false,
            cycleNumber: cycle,
            penaltyAmount: 0,
            initiatedBy: "Member"
        });
        recordTransaction(txnInput);

        emit ContributionMade(_poolId, msg.sender, msg.value, cycle);
    }

    // Submit a bid in the pool
    function submitBid(uint256 _poolId, uint256 _bidAmount) public {
        Pool storage pool = pools[_poolId];
        Member storage member = poolMembers[_poolId][msg.sender];
        uint256 cycle = pool.currentCycle;

        require(member.isActive, "Not a member of the pool");
        require(
            _bidAmount >= pool.minBidAmount && _bidAmount <= pool.maxBidAmount,
            "Bid amount out of range"
        );
        require(
            block.timestamp <= pool.bidSubmissionDeadline,
            "Bidding period over"
        );
        require(
            !poolBids[_poolId][cycle][msg.sender].exists,
            "Bid already submitted"
        );

        // Record the bid
        poolBids[_poolId][cycle][msg.sender] = Bid({
            bidAmount: _bidAmount,
            bidder: msg.sender,
            voteCount: 0,
            exists: true
        });
        bidAddresses[_poolId][cycle].push(msg.sender);

        // Record transaction
        TransactionInput memory txnInput = TransactionInput({
            poolId: _poolId,
            memberAddress: msg.sender,
            transactionType: TransactionType.Bid,
            amount: _bidAmount,
            description: "Bid Submission",
            isAnonymous: pool.isAnonymousVoting,
            cycleNumber: cycle,
            penaltyAmount: 0,
            initiatedBy: "Member"
        });
        recordTransaction(txnInput);

        emit BidSubmitted(_poolId, msg.sender, _bidAmount, cycle);
    }

    // Voting function with WorldID verification
    function voteOnBid(
        uint256 _poolId,
        uint256 pollId,
        bool voteType,
        address signal,
        uint256 root,
        uint256 nullifierhash,
        uint256[8] calldata proof
    ) public {
        Pool storage pool = pools[_poolId];
        Member storage member = poolMembers[_poolId][msg.sender];
        uint256 cycle = pool.currentCycle;

        require(member.isActive, "Not a member of the pool");
        require(
            hasContributed[_poolId][cycle][msg.sender],
            "Must contribute before voting"
        );
        require(!pool.hasVoted[cycle][msg.sender], "Already voted this cycle");

        // Verify the WorldID proof
        require(
            verifyVoter(signal, root, nullifierhash, proof, _poolId, cycle),
            "user already voted"
        );

        if (voteType) {
            poolBids[_poolId][cycle][msg.sender].voteCount++;
        }

        pool.hasVoted[cycle][msg.sender] = true;
        pool.voters[cycle].push(nullifierhash);

        address bidder = msg.sender;
        // Emit the VoteCast event with corrected parameters
        emit VoteCast(_poolId, msg.sender, bidder, cycle);
    }

    function verifyAndExecute(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // First make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // Now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );

        // Record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        // Finally, execute your logic here, for example issue a token, NFT, etc...
    }

    // Finalize the cycle and determine the winning bid
    function finalizeCycle(uint256 _poolId) public {
        Pool storage pool = pools[_poolId];
        require(pool.status == PoolStatus.Active, "Pool is not active");
        uint256 cycle = pool.currentCycle;
        require(
            block.timestamp > pool.bidSubmissionDeadline,
            "Bidding period not over"
        );

        address[] storage bidders = bidAddresses[_poolId][cycle];
        require(bidders.length > 0, "No bids submitted");

        address winnerAddress = determineWinner(_poolId, cycle, bidders);
        
        // @abhishek winner determined here attest >>>>>
        processPayout(_poolId, winnerAddress, cycle);

        // Reset for next cycle
        resetCycleData(_poolId);
    }

    // Determine the winner of the cycle
    function determineWinner(
        uint256 _poolId,
        uint256 cycle,
        address[] storage bidders
    ) internal view returns (address) {
        uint256 highestVotes = 0;
        address[] memory potentialWinners = new address[](bidders.length);
        uint256 winnerCount = 0;

        // Find the bidders with the highest votes
        for (uint256 i = 0; i < bidders.length; i++) {
            Bid storage bid = poolBids[_poolId][cycle][bidders[i]];
            if (bid.voteCount > highestVotes) {
                highestVotes = bid.voteCount;
                winnerCount = 1;
                potentialWinners[0] = bid.bidder;
            } else if (bid.voteCount == highestVotes) {
                potentialWinners[winnerCount] = bid.bidder;
                winnerCount++;
            }
        }

        // Resolve tie if necessary
        if (winnerCount > 1) {
            return resolveTie(_poolId, cycle, potentialWinners, winnerCount);
        } else {
            return potentialWinners[0];
        }
    }

    function verifyVoter(
        address signal,
        uint256 root,
        uint256 nullifierhash,
        uint256[8] calldata proof,
        uint256 _poolId,
        uint256 cycle
    ) private returns (bool) {
        Pool storage pool = pools[_poolId];
        if (alreadyVoted(pool, cycle, nullifierhash)) return false;

        // Verify the provided proof
        worldId.verifyProof(
            root,
            1,
            abi.encodePacked(signal).hashToField(),
            nullifierhash,
            externalNullifierHash,
            proof
        );

        pool.voters[cycle].push(nullifierhash);
        return true;
    }

    function alreadyVoted(
        Pool storage pool,
        uint256 cycle,
        uint256 nullifierhash
    ) internal view returns (bool) {
        for (uint i = 0; i < pool.voters[cycle].length; i++) {
            if (pool.voters[cycle][i] == nullifierhash) {
                return true;
            }
        }
        return false;
    }


    //  struct PoolParameters {
    //     string name;
    //     string title;
    //     uint256 depositAmount;
    //     bool isAnonymousVoting;
    //     uint256 depositPeriodDays;
    //     uint256 withdrawPeriodDays;
    //     bool distributeRemainingCycle;
    //     uint256 minBidAmount;
    //     uint256 maxBidAmount;
    //     uint256 commitmentDeposit;
    //     uint256 penaltyRate;
    //     uint256 bidSubmissionDeadline;
    // }

    // ["Test Pool 1","Test Pool Title 1",200000000000000,true,30,10,false,100000000000000,500000000000000,1000000000000000,5,7]

    // Resolve ties by selecting the lowest bid amount
    function resolveTie(
        uint256 _poolId,
        uint256 cycle,
        address[] memory tiedBidders,
        uint256 count
    ) internal view returns (address) {
        uint256 lowestBidAmount = type(uint256).max;
        address winnerAddress;

        for (uint256 i = 0; i < count; i++) {
            Bid storage bid = poolBids[_poolId][cycle][tiedBidders[i]];
            if (bid.bidAmount < lowestBidAmount) {
                lowestBidAmount = bid.bidAmount;
                winnerAddress = bid.bidder;
            }
        }

        return winnerAddress;
    }

    // Process the payout to the winner
    function processPayout(
        uint256 _poolId,
        address winnerAddress,
        uint256 cycle
    ) internal {
        Pool storage pool = pools[_poolId];
        address payable winner = payable(winnerAddress);
        uint256 payoutAmount = pool.valueStored;
        pool.valueStored = 0;

        // Transfer funds to the winner
        (bool sent, ) = winner.call{value: payoutAmount}("");
        require(sent, "Failed to send payout to winner");

        // Update winner's data
        Member storage winningMember = poolMembers[_poolId][winnerAddress];
        winningMember.totalWinnings += payoutAmount;

        // Record transaction
        TransactionInput memory txnInput = TransactionInput({
            poolId: _poolId,
            memberAddress: winnerAddress,
            transactionType: TransactionType.Withdrawal,
            amount: payoutAmount,
            description: "Payout Distribution",
            isAnonymous: false,
            cycleNumber: cycle,
            penaltyAmount: 0,
            initiatedBy: "System"
        });
        recordTransaction(txnInput);

        emit PayoutDistributed(_poolId, winnerAddress, payoutAmount, cycle);
    }

    // Reset data for the next cycle
    function resetCycleData(uint256 _poolId) internal {
        Pool storage pool = pools[_poolId];
        uint256 cycle = pool.currentCycle;

        pool.currentCycle += 1;
        pool.bidSubmissionDeadline =
            block.timestamp +
            pool.depositPeriodDays *
            1 days;

        // Reset votes and contributions for next cycle
        uint256 memberLength = pool.members.length;
        for (uint256 i = 0; i < memberLength; i++) {
            address memberAddress = pool.members[i];
            pool.hasVoted[cycle + 1][memberAddress] = false;
            hasContributed[_poolId][cycle + 1][memberAddress] = false;
        }
    }

    // Internal function to record transactions
    function recordTransaction(TransactionInput memory input) internal {
        transactionCounter++;
        Transaction memory txn = Transaction({
            transactionId: transactionCounter,
            poolId: input.poolId,
            memberAddress: input.memberAddress,
            transactionType: input.transactionType,
            amount: input.amount,
            date: block.timestamp,
            status: TransactionStatus.Completed,
            description: input.description,
            isAnonymous: input.isAnonymous,
            cycleNumber: input.cycleNumber,
            penaltyAmount: input.penaltyAmount,
            remainingBalance: pools[input.poolId].valueStored,
            initiatedBy: input.initiatedBy,
            txHash: keccak256(
                abi.encodePacked(
                    input.memberAddress,
                    block.timestamp,
                    transactionCounter
                )
            ),
            previousTransactionId: 0,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        poolTransactions[input.poolId].push(txn);
    }

    // Apply a penalty to a member
    function applyPenalty(
        uint256 _poolId,
        address _memberAddress,
        uint256 _penaltyAmount
    ) internal {
        Pool storage pool = pools[_poolId];
        Member storage member = poolMembers[_poolId][_memberAddress];

        member.totalPenalties += _penaltyAmount;
        pool.valueStored += _penaltyAmount;

        // Record transaction
        TransactionInput memory txnInput = TransactionInput({
            poolId: _poolId,
            memberAddress: _memberAddress,
            transactionType: TransactionType.Penalty,
            amount: _penaltyAmount,
            description: "Penalty Applied",
            isAnonymous: false,
            cycleNumber: pool.currentCycle,
            penaltyAmount: _penaltyAmount,
            initiatedBy: "System"
        });
        recordTransaction(txnInput);

        emit PenaltyApplied(_poolId, _memberAddress, _penaltyAmount);
    }
}
