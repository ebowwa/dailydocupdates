> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Split Tokens

> Convert USDC.e into outcome token pairs

**Splitting** converts USDC.e collateral into a full (position) set of outcome tokens. For every \$1 USDC.e you split, you receive 1 Yes token and 1 No token.

```
$100 USDC.e → 100 Yes tokens + 100 No tokens
```

## Prerequisites

Before splitting, ensure you have:

1. **USDC.e balance** on Polygon
2. **USDC.e approval** for the CTF contract to spend your tokens
3. **Condition ID** of the market — the condition must already be prepared on the CTF contract (via `prepareCondition`)

<Note>
  If the partition is trivial, invalid, or refers to more slots than the
  condition is prepared with, the transaction will revert.
</Note>

## How It Works

1. You approve the CTF contract to spend your USDC.e
2. You call `splitPosition()` with the amount and market details
3. The CTF contract transfers USDC.e from your wallet and mints both outcome tokens

The operation is atomic — if any step fails, the entire transaction reverts.

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
  Array of index sets: `[1, 2]` for binary markets (Yes = 1, No = 2)
</ResponseField>

<ResponseField name="amount" type="uint256">
  The amount of collateral or stake to split. Also the number of full sets to
  receive.
</ResponseField>

## Next Steps

<CardGroup cols={2}>
  <Card title="Merge Tokens" icon="merge" href="/trading/ctf/merge">
    Convert token pairs back to USDC.e
  </Card>

  <Card title="Trade on Orderbook" icon="chart-line" href="/trading/orders/create">
    Place orders using your newly split tokens
  </Card>
</CardGroup>
