<!--
Source: https://docs.polymarket.com/trading/positions/how-positions-work.md
Downloaded: 2026-07-23T21:04:54.619Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# How Positions Work

> Understand the onchain token mechanics that power Polymarket positions.

Polymarket tokenizes market outcomes using the [Conditional Token Framework
(CTF)](https://github.com/gnosis/conditional-tokens-contracts), an open standard
developed by Gnosis. Understanding CTF explains how positions are created,
combined, and redeemed onchain.

## What Is CTF?

CTF creates ERC-1155 tokens that represent prediction-market outcomes. Each
binary market has two outcome tokens:

| Token   | Redeems for | Condition                |
| ------- | ----------- | ------------------------ |
| **YES** | \$1.00 pUSD | The event occurs         |
| **NO**  | \$1.00 pUSD | The event does not occur |

These tokens are fully collateralized. Every YES and NO pair is backed by
exactly `$1` of collateral locked through the CTF contracts.

## Core Operations

CTF provides three operations for moving between collateral and positions:

<CardGroup cols={3}>
  <Card title="Split" icon="scissors" href="/trading/positions/manage#split-a-position">
    Convert pUSD into a YES and NO token pair.
  </Card>

  <Card title="Merge" icon="merge" href="/trading/positions/manage#merge-positions">
    Convert a YES and NO token pair back into pUSD.
  </Card>

  <Card title="Redeem" icon="hand-holding-dollar" href="/trading/positions/manage#redeem-resolved-positions">
    Exchange resolved outcome tokens for their payout.
  </Card>
</CardGroup>

## Token Flow

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-flow.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=36f5a57946ac2b83136e17b6c06b358c" alt="pUSD can be split into YES and NO outcome tokens, which can be traded, merged, or redeemed after resolution." className="dark:hidden" width="1596" height="952" data-path="images/core-concepts/token-flow.png" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-flow.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=69d150ea49ffa18cd7f24689342b1bec" alt="pUSD can be split into YES and NO outcome tokens, which can be traded, merged, or redeemed after resolution." className="hidden dark:block" width="1596" height="952" data-path="images/dark/core-concepts/token-flow.png" />
</Frame>

## Token Identifiers

Each outcome token has a unique **position ID**, which is used as its ERC-1155
token ID. CTF computes it onchain in three steps.

<Steps>
  <Step title="Compute the Condition ID">
    ```solidity theme={null}
    getConditionId(oracle, questionId, outcomeSlotCount)
    ```

    | Parameter          | Type      | Value                                                            |
    | ------------------ | --------- | ---------------------------------------------------------------- |
    | `oracle`           | `address` | [UMA CTF Adapter](https://github.com/Polymarket/uma-ctf-adapter) |
    | `questionId`       | `bytes32` | Hash of the UMA ancillary data                                   |
    | `outcomeSlotCount` | `uint`    | `2` for binary markets                                           |
  </Step>

  <Step title="Compute the Collection IDs">
    ```solidity theme={null}
    getCollectionId(parentCollectionId, conditionId, indexSet)
    ```

    | Parameter            | Type      | Value                                                             |
    | -------------------- | --------- | ----------------------------------------------------------------- |
    | `parentCollectionId` | `bytes32` | `bytes32(0)` for top-level positions                              |
    | `conditionId`        | `bytes32` | Condition ID from the previous step                               |
    | `indexSet`           | `uint`    | `1` (`0b01`) for the first outcome or `2` (`0b10`) for the second |

    The `indexSet` is a bitmask identifying which outcome slots belong to a
    collection. It must be a nonempty proper subset of the condition's outcome
    slots. A binary market has one collection for each outcome.
  </Step>

  <Step title="Compute the Position IDs">
    ```solidity theme={null}
    getPositionId(collateralToken, collectionId)
    ```

    | Parameter         | Type      | Value                                |
    | ----------------- | --------- | ------------------------------------ |
    | `collateralToken` | `IERC20`  | pUSD contract address on Polygon     |
    | `collectionId`    | `bytes32` | Collection ID for one market outcome |

    The resulting position IDs are the ERC-1155 token IDs for the market's YES and
    NO outcomes. Most integrations should read these token IDs from market data.
    Computing them manually is only necessary for direct contract integrations.
  </Step>
</Steps>

## Standard and Negative-Risk Markets

Polymarket uses different CTF configurations for standard and negative-risk
markets:

| Feature           | Standard markets    | Negative-risk markets      |
| ----------------- | ------------------- | -------------------------- |
| CTF contract      | ConditionalTokens   | ConditionalTokens          |
| Exchange contract | CTF Exchange        | Negative Risk CTF Exchange |
| Multiple outcomes | Independent markets | Linked through conversion  |

For negative-risk markets, a conversion operation can exchange one NO token for
YES tokens in the event's other outcomes. See [Negative Risk
Markets](/concepts/negative-risk) for details.

## Contract Addresses

See [Contracts](/resources/contracts) for Polymarket's current smart contract
addresses on Polygon.

## Next Steps

<CardGroup cols={3}>
  <Card title="Split a Position" icon="scissors" href="/trading/positions/manage#split-a-position">
    Create outcome token pairs from pUSD.
  </Card>

  <Card title="Merge Positions" icon="merge" href="/trading/positions/manage#merge-positions">
    Convert balanced token pairs back into pUSD.
  </Card>

  <Card title="Redeem Positions" icon="hand-holding-dollar" href="/trading/positions/manage#redeem-resolved-positions">
    Collect payouts after resolution.
  </Card>
</CardGroup>
