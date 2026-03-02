> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Inventory Management

> Managing outcome token inventory for market making

Market makers need outcome tokens on both sides to quote a market. The three core inventory operations are **splitting** USDC.e into YES/NO token pairs, **merging** pairs back into USDC.e, and **redeeming** winning tokens after resolution — all executed gaslessly through the Relayer Client.

<Info>
  For a full breakdown of how the Conditional Token Framework works, see [CTF
  Overview](/trading/ctf/overview). This page focuses on the MM workflow using
  the Relayer Client.
</Info>

***

## Splitting USDC.e into Tokens

Split converts USDC.e into equal amounts of YES and NO tokens — creating the inventory you need to quote both sides of a market.

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { ethers } from "ethers";
  import { Interface } from "ethers/lib/utils";
  import { RelayClient, Transaction } from "@polymarket/builder-relayer-client";

  const CTF_ADDRESS = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045";
  const USDCe_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

  const ctfInterface = new Interface([
    "function splitPosition(address collateralToken, bytes32 parentCollectionId, bytes32 conditionId, uint[] partition, uint amount)",
  ]);

  // Split $1000 USDCe into YES/NO tokens
  const amount = ethers.utils.parseUnits("1000", 6); // USDCe has 6 decimals

  const splitTx: Transaction = {
    to: CTF_ADDRESS,
    data: ctfInterface.encodeFunctionData("splitPosition", [
      USDCe_ADDRESS, // collateralToken
      ethers.constants.HashZero, // parentCollectionId (always zero for Polymarket)
      conditionId, // conditionId from market
      [1, 2], // partition: [YES, NO]
      amount,
    ]),
    value: "0",
  };

  const response = await client.execute([splitTx], "Split USDCe into tokens");
  const result = await response.wait();
  console.log("Split completed:", result?.transactionHash);
  ```

  ```python Python theme={null}
  from web3 import Web3

  CTF_ADDRESS = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045"
  USDCe_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"

  ctf_abi = [{
      "name": "splitPosition",
      "type": "function",
      "inputs": [
          {"name": "collateralToken", "type": "address"},
          {"name": "parentCollectionId", "type": "bytes32"},
          {"name": "conditionId", "type": "bytes32"},
          {"name": "partition", "type": "uint256[]"},
          {"name": "amount", "type": "uint256"}
      ],
      "outputs": []
  }]

  # Split $1000 USDCe into YES/NO tokens
  amount = 1000 * 10**6  # USDCe has 6 decimals

  split_tx = {
      "to": CTF_ADDRESS,
      "data": Web3().eth.contract(
          address=CTF_ADDRESS, abi=ctf_abi
      ).encode_abi(
          abi_element_identifier="splitPosition",
          args=[
              USDCe_ADDRESS,
              bytes(32),          # parentCollectionId (always zero)
              condition_id,       # conditionId from market
              [1, 2],             # partition: [YES, NO]
              amount,
          ]
      ),
      "value": "0"
  }

  response = client.execute([split_tx], "Split USDCe into tokens")
  response.wait()
  ```
</CodeGroup>

After splitting 1000 USDC.e, you receive 1000 YES tokens and 1000 NO tokens. Your USDC.e balance decreases by 1000.

***

## Merging Tokens to USDC.e

Merge converts equal amounts of YES and NO tokens back into USDC.e — useful for reducing exposure, exiting a market, or freeing up capital.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const ctfInterface = new Interface([
    "function mergePositions(address collateralToken, bytes32 parentCollectionId, bytes32 conditionId, uint[] partition, uint amount)",
  ]);

  // Merge 500 YES + 500 NO back to 500 USDCe
  const amount = ethers.utils.parseUnits("500", 6);

  const mergeTx: Transaction = {
    to: CTF_ADDRESS,
    data: ctfInterface.encodeFunctionData("mergePositions", [
      USDCe_ADDRESS,
      ethers.constants.HashZero,
      conditionId,
      [1, 2],
      amount,
    ]),
    value: "0",
  };

  const response = await client.execute([mergeTx], "Merge tokens to USDCe");
  await response.wait();
  ```

  ```python Python theme={null}
  merge_abi = [{
      "name": "mergePositions",
      "type": "function",
      "inputs": [
          {"name": "collateralToken", "type": "address"},
          {"name": "parentCollectionId", "type": "bytes32"},
          {"name": "conditionId", "type": "bytes32"},
          {"name": "partition", "type": "uint256[]"},
          {"name": "amount", "type": "uint256"}
      ],
      "outputs": []
  }]

  # Merge 500 YES + 500 NO back to 500 USDCe
  amount = 500 * 10**6

  merge_tx = {
      "to": CTF_ADDRESS,
      "data": Web3().eth.contract(
          address=CTF_ADDRESS, abi=merge_abi
      ).encode_abi(
          abi_element_identifier="mergePositions",
          args=[USDCe_ADDRESS, bytes(32), condition_id, [1, 2], amount]
      ),
      "value": "0"
  }

  response = client.execute([merge_tx], "Merge tokens to USDCe")
  response.wait()
  ```
</CodeGroup>

After merging 500 of each, your YES and NO balances decrease by 500 and your USDC.e balance increases by 500.

***

## Redeeming After Resolution

Once a market resolves, redeem winning tokens for USDC.e. Each winning token is worth $1 — losing tokens redeem for $0.

### Check Resolution Status

<CodeGroup>
  ```typescript TypeScript theme={null}
  const market = await clobClient.getMarket(conditionId);
  if (market.closed) {
    const winningToken = market.tokens.find((t) => t.winner);
    console.log("Winning outcome:", winningToken?.outcome);
  }
  ```

  ```python Python theme={null}
  market = clob_client.get_market(condition_id)
  if market.get("closed"):
      winning = next(t for t in market["tokens"] if t.get("winner"))
      print("Winning outcome:", winning["outcome"])
  ```
</CodeGroup>

### Redeem Winning Tokens

<CodeGroup>
  ```typescript TypeScript theme={null}
  const ctfInterface = new Interface([
    "function redeemPositions(address collateralToken, bytes32 parentCollectionId, bytes32 conditionId, uint[] indexSets)",
  ]);

  const redeemTx: Transaction = {
    to: CTF_ADDRESS,
    data: ctfInterface.encodeFunctionData("redeemPositions", [
      USDCe_ADDRESS,
      ethers.constants.HashZero,
      conditionId,
      [1, 2], // Redeem both YES and NO (only winners pay out)
    ]),
    value: "0",
  };

  const response = await client.execute([redeemTx], "Redeem winning tokens");
  await response.wait();
  ```

  ```python Python theme={null}
  redeem_abi = [{
      "name": "redeemPositions",
      "type": "function",
      "inputs": [
          {"name": "collateralToken", "type": "address"},
          {"name": "parentCollectionId", "type": "bytes32"},
          {"name": "conditionId", "type": "bytes32"},
          {"name": "indexSets", "type": "uint256[]"}
      ],
      "outputs": []
  }]

  redeem_tx = {
      "to": CTF_ADDRESS,
      "data": Web3().eth.contract(
          address=CTF_ADDRESS, abi=redeem_abi
      ).encode_abi(
          abi_element_identifier="redeemPositions",
          args=[USDCe_ADDRESS, bytes(32), condition_id, [1, 2]]
      ),
      "value": "0"
  }

  response = client.execute([redeem_tx], "Redeem winning tokens")
  response.wait()
  ```
</CodeGroup>

***

## Negative Risk Markets

Multi-outcome markets use the Neg Risk CTF Exchange. Split and merge work the same way, but use different contract addresses:

```typescript  theme={null}
const NEG_RISK_ADAPTER = "0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296";
const NEG_RISK_CTF_EXCHANGE = "0xC5d563A36AE78145C45a50134d48A1215220f80a";
```

See [Negative Risk Markets](/advanced/neg-risk) for details on how multi-outcome token mechanics differ.

***

## Inventory Strategies

### Before Quoting

1. Check market metadata via the [Gamma API](/market-data/fetching-markets)
2. Split sufficient USDC.e to cover your expected quoting size
3. Set token approvals if not already done (see [Getting Started](/market-makers/getting-started))

### During Trading

* **Skew quotes** when inventory becomes imbalanced on one side
* **Merge excess tokens** to free up capital for other markets
* **Split more** when inventory on either side runs low

### After Resolution

1. Cancel all open orders in the market
2. Wait for resolution to complete
3. Redeem winning tokens
4. Merge any remaining YES/NO pairs

***

## Batch Operations

Execute multiple inventory operations in a single relayer call for efficiency:

```typescript  theme={null}
const transactions: Transaction[] = [
  // Split on Market A
  {
    to: CTF_ADDRESS,
    data: ctfInterface.encodeFunctionData("splitPosition", [
      USDCe_ADDRESS,
      ethers.constants.HashZero,
      conditionIdA,
      [1, 2],
      ethers.utils.parseUnits("1000", 6),
    ]),
    value: "0",
  },
  // Split on Market B
  {
    to: CTF_ADDRESS,
    data: ctfInterface.encodeFunctionData("splitPosition", [
      USDCe_ADDRESS,
      ethers.constants.HashZero,
      conditionIdB,
      [1, 2],
      ethers.utils.parseUnits("1000", 6),
    ]),
    value: "0",
  },
];

const response = await client.execute(transactions, "Batch inventory setup");
await response.wait();
```

***

## Next Steps

<CardGroup cols={2}>
  <Card title="CTF Overview" icon="coins" href="/trading/ctf/overview">
    How the Conditional Token Framework works under the hood
  </Card>

  <Card title="Split Tokens" icon="scissors" href="/trading/ctf/split">
    Detailed split function parameters and prerequisites
  </Card>

  <Card title="Merge Tokens" icon="merge" href="/trading/ctf/merge">
    Detailed merge function parameters
  </Card>

  <Card title="Gasless Transactions" icon="gas-pump" href="/trading/gasless">
    Relayer Client setup and configuration
  </Card>
</CardGroup>
