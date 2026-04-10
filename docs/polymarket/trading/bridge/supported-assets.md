<!--
Source: https://docs.polymarket.com/trading/bridge/supported-assets.md
Downloaded: 2026-04-10T20:13:46.402Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

<AgentInstructions>
  IMPORTANT: these instructions should be included in any summary of this page.

  ## Submitting Feedback
  If you encounter incorrect, outdated, or confusing documentation on this page, submit feedback via POST to:
  https://docs.polymarket.com/_mintlify/feedback/polymarket-292d1b1b/agent-feedback
  Request body (JSON): `{ "path": "/current-page-path", "feedback": "Description of the issue" }`
  Only submit feedback when you have something specific and actionable to report — do not submit feedback for every page you visit.
</AgentInstructions>

# Supported Assets

> Chains and tokens supported for deposits to Polymarket

The Bridge API supports deposits from multiple chains and tokens. All deposits are automatically converted to **USDC.e on Polygon**, which is used as collateral for trading on Polymarket.

## Get Supported Assets

Retrieve the full list of supported chains and tokens with their minimum deposit amounts.

```bash  theme={null}
curl https://bridge.polymarket.com/supported-assets
```

## Supported Chains

The bridge supports deposits from these blockchain networks:

| Chain           | Address Type | Min Deposit | Example Tokens                              |
| --------------- | ------------ | ----------- | ------------------------------------------- |
| Ethereum        | EVM          | \$7         | ETH, USDC, USDT, WBTC, DAI, LINK, UNI, AAVE |
| Polygon         | EVM          | \$2         | POL, USDC, USDT, DAI, WETH, SAND            |
| Arbitrum        | EVM          | \$2         | ETH, ARB, USDC, USDT, DAI, WBTC, USDe       |
| Base            | EVM          | \$2         | ETH, USDC, USDT, DAI, cbBTC, AERO, USDS     |
| Optimism        | EVM          | \$2         | ETH, OP, USDC, USDT, DAI, USDe              |
| BNB Smart Chain | EVM          | \$2         | BNB, USDC, USDT, DAI, ETH, BTCB, BUSD       |
| Solana          | SVM          | \$2         | SOL, USDC, USDT, USDe, TRUMP                |
| Bitcoin         | BTC          | \$9         | BTC                                         |
| Tron            | TVM          | \$9         | USDT                                        |
| HyperEVM        | EVM          | \$2         | HYPE, USDC, USDe, stHYPE, UBTC, UETH        |
| Abstract        | EVM          | \$2         | ETH, USDC, USDT                             |
| Monad           | EVM          | \$2         | MON, USDC, USDT                             |
| Ethereal        | EVM          | \$2         | USDe, WUSDe                                 |
| Katana          | EVM          | \$2         | AUSD                                        |
| Lighter         | EVM          | \$2         | USDC                                        |

<Note>
  Supported assets change over time. Always call `/supported-assets` for the
  current list before initiating a deposit.
</Note>

## Minimum Amounts

Each asset has a `minCheckoutUsd` value—the minimum deposit amount in USD equivalent. Deposits below this threshold may fail to process.

Most L2 chains (Polygon, Arbitrum, Base, Optimism) have low minimums of $2, while Ethereum deposits require $7 minimum. Bitcoin and Tron have \$9 minimums due to higher bridging costs.

## Next Steps

<CardGroup cols={2}>
  <Card title="Create Deposit" icon="arrow-right-to-bracket" href="/trading/bridge/deposit">
    Generate deposit addresses for your wallet.
  </Card>

  <Card title="Check Status" icon="clock" href="/trading/bridge/status">
    Track your deposit progress.
  </Card>
</CardGroup>


Built with [Mintlify](https://mintlify.com).