> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Withdraw

> Bridge pUSD from Polymarket to any supported chain

Withdraw pUSD from your Polymarket wallet to any supported chain and token. Funds are automatically bridged and swapped to your desired token on the destination chain.

## How It Works

1. Specify your destination chain, token, and recipient address
2. Receive bridge addresses for each destination chain (EVM, Solana, Bitcoin)
3. Send pUSD from your Polymarket wallet to the appropriate bridge address
4. Funds are automatically bridged and swapped to your desired token
5. Funds arrive at your destination wallet

<Warning>
  Do not pre-generate withdrawal addresses. Only generate them when you are
  ready to execute the withdrawal. Each address is configured for a specific
  destination.
</Warning>

<Warning>
  When withdrawing, pUSD is unwrapped to USDC via the Collateral Offramp and swapped through the
  [Uniswap v3 pool](https://polygonscan.com/address/0xd36ec33c8bed5a9f7b6630855f1533455b98a418)
  for USDC (native). The UI enforces less than 10bp difference in output amount.
  At times, this pool may be exhausted. If you are having withdraw issues, try
  breaking your withdraw into smaller amounts or waiting for the pool to be
  rebalanced. Alternatively, you can withdraw pUSD directly, which does not
  require Uniswap liquidity — just be aware that some exchanges no longer accept
  pUSD deposits directly.
</Warning>

<Tip>
  For very large withdrawals (over \$50,000), consider breaking the withdrawal
  into smaller amounts or using a third-party bridge to minimize slippage.
</Tip>

## Create Withdrawal Addresses

Generate bridge addresses configured for your withdrawal destination. See the [Bridge API Reference](/api-reference/introduction) for full request and response schemas.

<Tip>
  **Builders: attach your code.** If you route user funds through this endpoint,
  pass your builder code via the optional `X-Builder-Code` header (bytes32 hex;
  `0x` + 64 hex chars). It lets our bridge provider attribute traffic to your
  app, so stuck or delayed transfers can be traced and prioritized. The header is
  optional. Requests without it still succeed but return a `missing_builder_code`
  warning, and a malformed code returns `400`. Get your code at [Settings →
  Builder](https://polymarket.com/settings?tab=builder).
</Tip>

```bash theme={null}
curl -X POST https://bridge.polymarket.com/withdraw \
  -H "Content-Type: application/json" \
  -H "X-Builder-Code: <YOUR_BUILDER_CODE>" \
  -d '{
    "address": "0x9156dd10bea4c8d7e2d591b633d1694b1d764756",
    "toChainId": "1",
    "toTokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "recipientAddr": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  }'
```

### Address Types

| Address | Use For                                                  |
| ------- | -------------------------------------------------------- |
| `evm`   | Ethereum, Arbitrum, Base, Optimism, and other EVM chains |
| `svm`   | Solana                                                   |
| `btc`   | Bitcoin                                                  |
| `tvm`   | Tron                                                     |

Withdrawals are **instant** and **free** — Polymarket does not charge withdrawal fees.

## Withdrawal Flow

<Steps>
  <Step title="Check Supported Assets">
    Verify your destination chain and token are supported via
    `/supported-assets`.
  </Step>

  <Step title="Get a Quote">
    Preview fees and estimated output via `POST /quote`.
  </Step>

  <Step title="Create Withdrawal Addresses">
    Call `POST /withdraw` with your wallet address, destination chain, token,
    and recipient.
  </Step>

  <Step title="Send pUSD">
    Transfer pUSD from your Polymarket wallet to the appropriate bridge
    address.
  </Step>

  <Step title="Track Status">Monitor progress using `/status/{address}`.</Step>
</Steps>

## Next Steps

<CardGroup cols={2}>
  <Card title="Get a Quote" icon="calculator" href="/trading/bridge/quote">
    Preview fees and estimated output before withdrawing.
  </Card>

  <Card title="Check Status" icon="clock" href="/trading/bridge/status">
    Track your withdrawal progress.
  </Card>
</CardGroup>
