> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Subgraph

> Query onchain Polymarket data using GraphQL

Polymarket's subgraphs provide indexed onchain data via GraphQL. Use them to query positions, volume, liquidity data, orders, activity, and market data.

## Available Subgraphs

| Subgraph          | Description                 | Endpoint                                                                                                                         |
| ----------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Positions**     | User token balances         | [GraphQL Playground](https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/positions-subgraph/0.0.7/gn) |
| **Orders**        | Order book and trade events | [GraphQL Playground](https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/orderbook-subgraph/0.0.1/gn) |
| **Activity**      | Splits, merges, redemptions | [GraphQL Playground](https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/activity-subgraph/0.0.4/gn)  |
| **Open Interest** | Market and global OI        | [GraphQL Playground](https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/oi-subgraph/0.0.6/gn)        |
| **PNL**           | User position P\&L          | [GraphQL Playground](https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/pnl-subgraph/0.0.14/gn)      |

<Note>
  Subgraphs are hosted by [Goldsky](https://goldsky.com). Each endpoint includes
  an interactive GraphQL playground for exploring the schema.
</Note>

## Querying

Send GraphQL queries via POST request to any subgraph endpoint.

```bash  theme={null}
curl -X POST \
  https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/orderbook-subgraph/0.0.1/gn \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query MyQuery { orderbooks { id tradesQuantity } }"
  }'
```

## Schema Reference

### Positions

| Query                                    | Description                    |
| ---------------------------------------- | ------------------------------ |
| `userBalance` / `userBalances`           | User token balances            |
| `netUserBalance` / `netUserBalances`     | Aggregated net balances        |
| `tokenIdCondition` / `tokenIdConditions` | Token ID to condition mappings |
| `condition` / `conditions`               | Market conditions              |

### Orders

| Query                                          | Description             |
| ---------------------------------------------- | ----------------------- |
| `marketData` / `marketDatas`                   | Market-level data       |
| `orderFilledEvent` / `orderFilledEvents`       | Order fill events       |
| `ordersMatchedEvent` / `ordersMatchedEvents`   | Order match events      |
| `orderbook` / `orderbooks`                     | Orderbook state         |
| `ordersMatchedGlobal` / `ordersMatchedGlobals` | Global match statistics |

### Activity

| Query                                                  | Description          |
| ------------------------------------------------------ | -------------------- |
| `split` / `splits`                                     | USDC to token splits |
| `merge` / `merges`                                     | Token to USDC merges |
| `redemption` / `redemptions`                           | Position redemptions |
| `negRiskConversion` / `negRiskConversions`             | Neg risk conversions |
| `negRiskEvent` / `negRiskEvents`                       | Neg risk event data  |
| `fixedProductMarketMaker` / `fixedProductMarketMakers` | FPMM data            |
| `position` / `positions`                               | Position records     |
| `condition` / `conditions`                             | Market conditions    |

### Open Interest

| Query                                        | Description              |
| -------------------------------------------- | ------------------------ |
| `condition` / `conditions`                   | Market conditions        |
| `negRiskEvent` / `negRiskEvents`             | Neg risk event data      |
| `marketOpenInterest` / `marketOpenInterests` | Per-market open interest |
| `globalOpenInterest` / `globalOpenInterests` | Global open interest     |

### PNL

| Query                            | Description                     |
| -------------------------------- | ------------------------------- |
| `userPosition` / `userPositions` | User position P\&L data         |
| `negRiskEvent` / `negRiskEvents` | Neg risk event data             |
| `condition` / `conditions`       | Market conditions               |
| `fpmm` / `fpmms`                 | Fixed product market maker data |

## Source Code

The subgraph is open source. Review the schema and mappings on GitHub:

<Card title="polymarket-subgraph" icon="github" href="https://github.com/Polymarket/polymarket-subgraph">
  View source code, schema definitions, and deployment configuration.
</Card>
