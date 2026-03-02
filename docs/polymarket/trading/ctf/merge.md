> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Merge Tokens

> Convert outcome token pairs back to USDC.e

**Merging** is the inverse of splitting — it converts a full set of outcome tokens back into USDC.e collateral. For every 1 Yes token and 1 No token you merge, you receive \$1 USDC.e. The condition must already be prepared on the CTF contract (via `prepareCondition`).

```
100 Yes tokens + 100 No tokens → $100 USDC.e
```

## Prerequisites

Before merging, you need:

1. **Equal amounts** of both Yes and No tokens
2. **Condition ID** of the market
3. **Sufficient gas** for the transaction

## How It Works

1. You call `mergePositions()` with the amount and market details
2. One unit of each position in a full set is burned in return for 1 collateral unit
3. The CTF contract releases USDC.e back to your wallet

The operation is atomic — if you don't have enough of both tokens, the transaction reverts.

## Function Parameters

<ResponseField name="collateralToken" type="IERC20">
  USDC.e (Bridged USDC) contract address: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
</ResponseField>

<ResponseField name="parentCollectionId" type="bytes32">
  Always `0x0000...0000` (32 zero bytes) for Polymarket markets
</ResponseField>

<ResponseField name="conditionId" type="bytes32">
  The market's condition ID, available from the Markets API
</ResponseField>

<ResponseField name="partition" type="uint[]">
  Array of index sets: `[1, 2]` for binary markets
</ResponseField>

<ResponseField name="amount" type="uint256">
  The number of full sets to merge. Also the amount of collateral to receive.
</ResponseField>

## Next Steps

<CardGroup cols={2}>
  <Card title="Redeem Tokens" icon="hand-holding-dollar" href="/trading/ctf/redeem">
    Exchange winning tokens for USDC.e after resolution
  </Card>

  <Card title="CTF Overview" icon="book" href="/trading/ctf/overview">
    Learn more about the Conditional Token Framework
  </Card>
</CardGroup>
