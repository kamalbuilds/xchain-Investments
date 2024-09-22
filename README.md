## XChain Pool Investments

### 1. Introduction and Key Features

**XChain Pool Investments** is a decentralized platform designed to modernize community-based investments with advanced blockchain integrations, private bidding, and cross-chain functionalities. The platform allows participants to join pools, make contributions, and bid on funds, maintaining privacy and minimizing biases.

### Key Features

- **Private Bidding**: Secure, private bids with Sapphire's privacy layer, promoting unbiased participation.
- **Cross-Chain Swaps**: Utilize 1inch Fusion+ for swapping assets across Ethereum-based chains during deposits.
- **Dynamic Liquidity Management**: Manage liquidity within user-defined ranges on Uniswap v4 with dynamic fee adjustments.
- **Anonymous Authentication**: Worldcoin's anonymous authentication supports unbiased, private bidding.
- **Cross-Chain Interoperability**: ChainLink’s CCIP enables seamless cross-chain transactions and messaging.
- **Data Management**: TheGraph handles data fetching from various sources, including CCIP.
- **AI Agents**: Phala hosts AI agents that manage proof verification and execute smart contracts efficiently.
- **Sign Protocol Integration**: Use Sign Protocol, an omni-chain attestation protocol, to sign and store winning bid details at the end of each cycle.
- **Investment of Remaining Funds**: After withdrawals, remaining pool funds are invested using AI Agents in the best DeFi opportunities across multiple chains, utilizing CCIP for easy swaps.
- **Secure Withdrawals**: Members receive their withdrawals at the end of all cycles, ensuring proper distribution of funds.

![image](https://github.com/user-attachments/assets/ecd344df-92a0-4f59-8252-2f9dafb01493)

### 2. Problem Statement

#### Understanding Chit Funds

**Chit funds** are an ancient form of savings and credit system prevalent in many parts of the world, especially in India. They are community-based financial arrangements where a group of people agree to contribute a fixed amount of money regularly into a pool, which is then given to one member of the group in each cycle.

**How Chit Funds Work**:

- A group of individuals come together and agree on a fixed contribution amount and number of cycles.
- In each cycle, members contribute their share to the pool.
- The pooled amount is then auctioned or allocated to a member based on bidding or a lottery system.
- The member who receives the funds continues to contribute in subsequent cycles.
- This process continues until all members have received the pooled amount once.

**Why Chit Funds Were Used**:

- **Access to Credit**: Provided an alternative to formal banking systems, especially in areas where such services were inaccessible.
- **Savings Mechanism**: Encouraged disciplined savings among participants.
- **Community Trust**: Relied on mutual trust within a community, fostering cooperation and financial support.

**Challenges with Traditional Chit Funds**:

- **Lack of Transparency**: Limited visibility into fund management could lead to fraud or mismanagement.
- **Bias and Inequality**: Public bidding could be influenced by biases, affecting fair distribution.
- **Inefficiency**: Manual processes were time-consuming and prone to errors.

**Example of a Traditional Chit Fund**:

Consider a group of 10 people who agree to contribute $100 each month for 10 months. Each month, the total pool of $1,000 is given to one member. The selection of the recipient can be through bidding or a random draw. All members continue to contribute every month, ensuring that each member receives the lump sum once during the cycle.

#### Addressing the Challenges

XChain Pool Investments aims to modernize this concept by integrating blockchain technology to enhance transparency, security, and efficiency. By incorporating privacy features and decentralized governance, the platform eliminates biases and fraud risks associated with traditional chit funds.

### 3. Expected Users and User Base

**Targeted Users**:

1. **Individual Investors**: People interested in participating in community investments with privacy and decentralized governance.
2. **DeFi Enthusiasts**: Individuals who seek decentralized, private, and fair financial services.
3. **Developers**: Blockchain developers and agents who manage smart contracts and verification processes.
4. **Protocols and Platforms**: DeFi protocols integrating their services, like liquidity management and swaps, into the XChain Pool Investments ecosystem.

**User Base**:

- **General Public**: Everyday users seeking an investment platform that offers anonymity, transparency, and secure fund management.
- **Crypto Investors**: Users looking for decentralized alternatives to traditional investment models.
- **Blockchain Enthusiasts**: Those who value the ability to participate and vote anonymously without biases or external influence.

### 4. Built with >>>>

#### **1inch (Fusion+ Swap)**
- **Purpose**: Used during the deposit phase, allowing users to swap assets across any Ethereum-based chain, facilitating flexible deposits.
- **Usage**: Finds the optimal swap route, minimizing slippage and fees while ensuring users can participate with their preferred assets.

#### **Uniswap v4 hooks**
- **Purpose**: Manages liquidity within defined ranges set by users, allowing for dynamic fee adjustments based on market conditions.
- **Integration**: Uses a custom hook (`UniswapV4Hook.sol`) that adjusts fees dynamically using market data, enhancing pool sustainability and performance.

#### **Worldcoin**
- **Purpose**: Provides anonymous authentication, ensuring private participation during bidding and voting phases, eliminating biases.
- **Usage**: Ensures that bids and votes remain private, maintaining a fair environment for all participants.

#### **TheGraph**
- **Purpose**: Manages data fetched from CCIP, facilitating easy access to cross-chain data and enhancing the platform's usability.
- **Usage**: Provides real-time insights and simplifies blockchain data management for better decision-making.

#### **ChainLink (CCIP)**
- **Purpose**: Enables secure cross-chain token transfers and messaging, allowing seamless communication and asset movement between blockchains.
- **Usage**: Ensures interoperability, connecting XChain Pool Investments with other blockchain ecosystems for a fluid user experience.

ChainLink Functions along with Coinmarketcap api used -> https://functions.chain.link/sepolia/3542

#### **Phala**
- **Purpose**: Hosts AI agents responsible for proof verification and contract execution, ensuring smooth, secure operations of the platform.
- **Usage**: Verifies smart contracts and manages complex transactions, maintaining system integrity and performance.

#### **Morph Holesky**
- **Purpose**: XChainFund Pool Investment is a decentralized platform designed to modernize community-based investments with advanced blockchain integrations,
- **Usage**: Deployed XChainFund.sol on Morph Holesky Testnet. Here is the contract address :- https://explorer-holesky.morphl2.io/tx/0x612888df3f504dfba90072e4ce19779ddc008a70de4618cc68e122d8699a7638.

#### **Sign Protocol**
- **Purpose**: An omni-chain attestation protocol that allows users to attest and verify information on-chain, used to sign the winning bid details at the end of each cycle.
- **Schema**:
  - **Input Raw Data**:
    - `walletAddress`: Address of the winning member.
    - `amountWithdraw`: Amount withdrawn by the winning member.
    - `voteCount`: Number of votes received.
    - `reason`: Reason for winning the bid.
    - `RepaymentPeriod`: The period allocated for repayment if applicable.
    - `PeriodicCycleNumber`: The cycle number in which the bid was won.
    - `totalMembers`: Total members in the pool.

Code Usage -> https://github.com/kamalbuilds/xchain-Investments/blob/master/frontend/app/pools/%5BpoolId%5D/page.tsx#L459

---

### 5. How XChain Pool Investments Works

1. **Pool Creation**: Users create pools with parameters like deposit amount, voting privacy, and cycle duration.
2. **Deposits and Swaps**: Participants deposit funds, which can be swapped using 1inch Fusion+ if needed, ensuring flexible asset management.
3. **Private Bidding**: Members submit anonymous bids using Worldcoin authentication, fostering fair competition.
4. **Voting and Distribution**: Anonymous votes determine the winning bid each cycle, with Sign Protocol signing and storing winning details.
5. **Investment of Remaining Funds**: After withdrawals, any remaining pool funds are invested by AI Agents into the best DeFi opportunities across multiple chains, utilizing CCIP for seamless swaps.
6. **Withdrawal**: Withdrawals, along with any returns from investments, are processed at the end of all cycles, ensuring all contributions are accounted for and fairly distributed.


### 6. Real-World Example with Pool and Users

**Scenario**: A pool is created with the following parameters:
- **Deposit Amount**: $500 per month.
- **Anonymous Voting**: Enabled.
- **Deposit Period**: Monthly (30 days).
- **Withdraw Period**: End of the 6 cycles.
- **Number of Cycles**: 6.
- **Number of Members**: 10.

**Cycle Process**:

#### Initial Setup:

- **Total Monthly Pool Amount**: $500 * 10 members = **$5,000** per cycle.
- **Total Pool Amount Over 6 Cycles**: $5,000 * 6 = **$30,000**.

#### Cycle Calculations:

1. **Cycle 1**:
   - **Contributions**: All 10 members deposit $500 each.
   - **Total Pool**: $5,000.
   - **Bidding**: Members submit anonymous bids indicating their need or willingness to accept a discount (if applicable).
   - **Winner**: Member A wins the bid.
   - **Amount Received by Member A**: $5,000.
   - **Sign Protocol**: Winning details are signed and stored.
   - **Remaining Pool Amount**: $0 (since the entire amount is given to the winner).
   - **Investment**: No remaining funds to invest this cycle.

2. **Cycle 2**:
   - **Contributions**: All members deposit $500 each.
   - **Total Pool**: $5,000.
   - **Bidding**: Member A cannot bid again. Remaining 9 members bid.
   - **Winner**: Member B.
   - **Amount Received by Member B**: $5,000.
   - **Sign Protocol**: Winning details are signed and stored.
   - **Remaining Pool Amount**: $0.
   - **Investment**: No remaining funds to invest this cycle.

3. **Cycle 3**:
   - **Contributions**: $5,000.
   - **Bidding**: Members A and B cannot bid. Remaining 8 members bid.
   - **Winner**: Member C.
   - **Amount Received by Member C**: $5,000.
   - **Sign Protocol**: Winning details are signed and stored.
   - **Remaining Pool Amount**: $0.
   - **Investment**: No remaining funds to invest this cycle.

4. **Cycle 4**:
   - **Contributions**: $5,000.
   - **Bidding**: Members A, B, and C cannot bid. Remaining 7 members bid.
   - **Winner**: Member D.
   - **Amount Received by Member D**: $5,000.
   - **Sign Protocol**: Winning details are signed and stored.
   - **Remaining Pool Amount**: $0.
   - **Investment**: No remaining funds to invest this cycle.

5. **Cycle 5**:
   - **Contributions**: $5,000.
   - **Bidding**: Members A to D cannot bid. Remaining 6 members bid.
   - **Winner**: Member E.
   - **Amount Received by Member E**: $5,000.
   - **Sign Protocol**: Winning details are signed and stored.
   - **Remaining Pool Amount**: $0.
   - **Investment**: No remaining funds to invest this cycle.

6. **Cycle 6**:
   - **Contributions**: $5,000.
   - **Bidding**: Members A to E cannot bid. Remaining 5 members bid.
   - **Winner**: Member F.
   - **Amount Received by Member F**: $5,000.
   - **Sign Protocol**: Winning details are signed and stored.
   - **Remaining Pool Amount**: $0.
   - **Investment**: No remaining funds to invest this cycle.

#### Post-Cycle Investment:

- **Additional Funds**: Suppose during the cycles, some members delay their contributions and incur penalties or there are platform rewards.
- **Total Additional Funds**: Let's assume $1,000 accumulated over 6 cycles from penalties and rewards.
- **Investment by AI Agents**:
  - The $1,000 is invested in DeFi opportunities.
  - AI Agents analyze and choose the best options across multiple chains.
  - **Using CCIP**: Funds are swapped and moved efficiently between chains.
- **Returns**:
  - Let's assume the investment yields a 10% return over the remaining period.
  - **Total Returns**: $1,000 * 10% = $100.
  - **Total Investment Pool at End**: $1,000 + $100 = $1,100.

#### Final Withdrawals:

- **Distribution of Investment Returns**:
  - The $1,100 is distributed among all 10 members.
  - **Per Member Share**: $1,100 / 10 = $110.
- **Total Received by Each Member**:
  - **Members A to F**: Each received $5,000 when they won the bid.
  - **Additional Returns**: Each member gets an extra $110 from investment returns.
- **Total Contributions per Member**: $500 * 6 cycles = **$3,000**.
- **Net Benefit**:
  - **Members A to F**: Received $5,110 in total ($5,000 + $110).
  - **Members G to J**: Will receive their payouts in subsequent cycles or have received other benefits depending on the pool rules.

**Summary of Calculations**:

- **Total Contributions**: $3,000 per member.
- **Total Payouts**:
  - **Winning Members**: $5,110 each (including investment returns).
  - **Other Members**: Depending on pool rules, they may receive their lump sum in future cycles or other benefits.
- **Net Gain**:
  - **Winning Members**: $5,110 - $3,000 = **$2,110** net gain.
  - **Investment Returns**: An additional $110 per member.

---

### 7. Additional Use Cases for the General Public

1. **Investment Pools**: Users can join various pools, contributing periodically with a chance to receive large lump-sum payouts.
2. **Community Savings**: Groups of friends or family can pool funds for collective goals, benefiting from structured, anonymous, and decentralized management.
3. **Project Funding**: Small businesses or projects can leverage this model to raise funds while participants have a chance to receive payouts.
4. **Enhanced Returns**: By investing remaining funds using AI Agents in DeFi opportunities, participants can potentially earn additional returns on their contributions.
