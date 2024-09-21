pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";

library ByteHasher {
    /// @dev Creates a keccak256 hash of a bytestring.
    /// @param value The bytestring to hash
    /// @return The hash of the specified value
    /// @dev `>> 8` makes sure that the result is included in our field
    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(value))) >> 8;
    }
}

interface IWorldID {
    /// @notice Reverts if the zero-knowledge proof is invalid.
    /// @param root The of the Merkle tree
    /// @param groupId The id of the Semaphore group
    /// @param signalHash A keccak256 hash of the Semaphore signal
    /// @param nullifierHash The nullifier hash
    /// @param externalNullifierHash A keccak256 hash of the external nullifier
    /// @param proof The zero-knowledge proof
    /// @dev  Note that a double-signaling check is not included here, and should be carried by the caller.
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external view;
}

contract PoolFund is ISPHook {
    using ByteHasher for bytes;

    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifier;

    address public ispContractAddress =
        0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD;

    error UnsupportedOperation();

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

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    // Create a new pool with parameters grouped into a struct
    function createPool(PoolParameters memory params) public {
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

        emit VoteCast(_poolId, pollId, voteType);
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
            externalNullifier,
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

    /**
     * Sign Protocol attestation logic
     * @param address of the attester
     * @param schemaId of the schema that is created from sign platform
     * @param attestationId
     * @param null
     */
    function didReceiveAttestation(
        address, // attester
        uint64, // schemaId
        uint64 attestationId,
        bytes calldata // extraData
    ) external payable {
        // Attestation memory attestation = ISP(_msgSender()).getAttestation(attestationId);
        bytes memory attestationData = fetchAttestationData(attestationId);

        //TODO: @kamal to do this
        // attestation data will have the address of the user that is receiving the amount and we can extract it from here
        // extract address from the attesation data and then send the money to the address.
        // _checkThreshold(abi.decode(attestation.data, (uint256)));
    }

    function didReceiveAttestation(
        address, // attester
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure {
        revert UnsupportedOperation();
    }

    function didReceiveRevocation(
        address, // attester
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata // extraData
    ) external payable {
        revert UnsupportedOperation();
    }

    function didReceiveRevocation(
        address, // attester
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure {
        revert UnsupportedOperation();
    }

    // Function to call the ISP contract's getAttestation function and return only the data field
    function fetchAttestationData(
        uint64 attestationId
    ) public view returns (bytes memory) {
        // Create an instance of the ISP interface
        ISPInterface ispContract = ISPInterface(ispContractAddress);

        // Call the getAttestation function and retrieve the full attestation
        ISPInterface.Attestation memory attestation = ispContract
            .getAttestation(attestationId);

        // Return only the data field of the attestation
        return attestation.data;
    }
}
