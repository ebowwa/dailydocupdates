<!--
Source: https://docs.polymarket.com/trading/ctf/overview.md
Downloaded: 2026-02-22T23:06:41.933Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Conditional Token Framework

> Onchain token mechanics powering Polymarket positions

All outcomes on Polymarket are tokenized using the **Conditional Token Framework (CTF)**, an open standard developed by Gnosis. Understanding CTF operations enables advanced trading strategies, market making, and direct smart contract interactions.

## What is CTF

The Conditional Token Framework creates **ERC1155 tokens** representing outcomes of prediction markets. Each binary market has two tokens:

| Token   | Redeems for   | Condition            |
| ------- | ------------- | -------------------- |
| **Yes** | \$1.00 USDC.e | Event occurs         |
| **No**  | \$1.00 USDC.e | Event does not occur |

These tokens are always **fully collateralized** — every Yes/No pair is backed by exactly \$1.00 USDC.e locked in the CTF contract.

## Core Operations

CTF provides three fundamental operations:

<CardGroup cols={3}>
  <Card title="Split" icon="scissors" href="/trading/ctf/split">
    Convert USDC.e into Yes + No token pairs
  </Card>

  <Card title="Merge" icon="merge" href="/trading/ctf/merge">
    Convert Yes + No pairs back to USDC.e
  </Card>

  <Card title="Redeem" icon="hand-holding-dollar" href="/trading/ctf/redeem">
    Exchange winning tokens for USDC.e after resolution
  </Card>
</CardGroup>

## Token Flow

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=36f5a57946ac2b83136e17b6c06b358c" alt="" className="dark:hidden" data-og-width="1596" width="1596" data-og-height="952" height="952" data-path="images/core-concepts/token-flow.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=abc92640ec62d9e02f2097f1c67231cb 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=0f3f010e10a5cf39e78e594cdf8e579d 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=e26855cc3aeac4b609657690df3d0086 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=78547971ce2f750cb824d2cfdc705171 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=bfdcab4d02ad6fe37e0549b33b940869 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=78ec4b0dae7b6dc701e180fbb2e755e4 2500w" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=69d150ea49ffa18cd7f24689342b1bec" alt="" className="hidden dark:block" data-og-width="1596" width="1596" data-og-height="952" height="952" data-path="images/dark/core-concepts/token-flow.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=0ef33ff2c0ab77156745d8b381dafe00 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=8ab82e34078a6811fc929d3bb15ee448 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=750c6e303bc8df05bbb335dd79edd2d6 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=4d5553bef579cd8b50f5be39e8e91e61 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=d69588b8286d2a561101ffbd55364ebd 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=633d6ce55594e89381b81b30f5f0ad45 2500w" />
</Frame>

## Token Identifiers

Each outcome token has a unique **position ID** (also called token ID or asset ID), computed onchain in three steps.

### Step 1 - Condition ID

```
getConditionId(oracle, questionId, outcomeSlotCount)
```

| Parameter          | Type      | Value                                                            |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `oracle`           | `address` | [UMA CTF Adapter](https://github.com/Polymarket/uma-ctf-adapter) |
| `questionId`       | `bytes32` | Hash of the UMA ancillary data                                   |
| `outcomeSlotCount` | `uint`    | `2` for all binary markets                                       |

### Step 2 - Collection IDs

```
getCollectionId(parentCollectionId, conditionId, indexSet)
```

| Parameter            | Type      | Value                                                           |
| -------------------- | --------- | --------------------------------------------------------------- |
| `parentCollectionId` | `bytes32` | `bytes32(0)` — always zero for top-level positions              |
| `conditionId`        | `bytes32` | The condition ID from step 1                                    |
| `indexSet`           | `uint`    | `1` (`0b01`) for the first outcome, `2` (`0b10`) for the second |

The `indexSet` is a bitmask denoting which outcome slots belong to a collection. It must be a nonempty proper subset of the condition's outcome slots. Binary markets always have exactly two collections — one per outcome.

### Step 3 - Position IDs

```
getPositionId(collateralToken, collectionId)
```

| Parameter         | Type      | Value                                     |
| ----------------- | --------- | ----------------------------------------- |
| `collateralToken` | `IERC20`  | USDC.e contract address on Polygon        |
| `collectionId`    | `bytes32` | One of the two collection IDs from step 2 |

The two resulting position IDs are the ERC1155 token IDs for the Yes and No outcomes of the market.

<Note>
  You can look up token IDs directly via the Gamma API (`GET /markets` or `GET /events`
  — the `tokens` array on each market contains both outcome token IDs). Computing them
  manually is only necessary for direct smart contract integration.
</Note>

## Standard vs Neg Risk Markets

Polymarket has two market types with different CTF configurations:

| Feature           | Standard Markets    | Neg Risk Markets      |
| ----------------- | ------------------- | --------------------- |
| CTF Contract      | ConditionalTokens   | ConditionalTokens     |
| Exchange Contract | CTF Exchange        | Neg Risk CTF Exchange |
| Multi-outcome     | Independent markets | Linked via conversion |
| `negRisk` flag    | `false`             | `true`                |

For neg risk markets, an additional **conversion** operation allows exchanging a No token for Yes tokens in all other outcomes. See [Negative Risk Markets](/advanced/neg-risk) for details.

## Contract Addresses

See [Contract Addresses](/resources/contract-addresses) for all Polymarket smart contract addresses on Polygon.

## Resources

<CardGroup cols={2}>
  <Card title="CTF Source Code" icon="github" href="https://github.com/gnosis/conditional-tokens-contracts">
    Gnosis Conditional Tokens smart contracts
  </Card>

  <Card title="Code Examples" icon="code" href="https://github.com/Polymarket/examples/tree/main/examples">
    Python and TypeScript examples for onchain operations
  </Card>
</CardGroup>

## Next Steps

<CardGroup cols={3}>
  <Card title="Split Tokens" icon="scissors" href="/trading/ctf/split">
    Create outcome token pairs from USDC.e
  </Card>

  <Card title="Merge Tokens" icon="merge" href="/trading/ctf/merge">
    Convert token pairs back to USDC.e
  </Card>

  <Card title="Redeem Tokens" icon="hand-holding-dollar" href="/trading/ctf/redeem">
    Collect winnings after resolution
  </Card>
</CardGroup>
