> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Contract Addresses

> All Polymarket smart contract addresses on Polygon

All Polymarket contracts are deployed on **Polygon mainnet** (Chain ID: 137). This is the single source of truth for all contract addresses used across the platform.

***

## Core Trading Contracts

| Contract                 | Address                                                                                                                    | Description                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| CTF Exchange             | [`0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E`](https://polygonscan.com/address/0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E) | Standard market order matching and settlement                             |
| Neg Risk CTF Exchange    | [`0xC5d563A36AE78145C45a50134d48A1215220f80a`](https://polygonscan.com/address/0xC5d563A36AE78145C45a50134d48A1215220f80a) | Order matching for [neg risk](/advanced/neg-risk) (multi-outcome) markets |
| Neg Risk Adapter         | [`0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296`](https://polygonscan.com/address/0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296) | Converts No tokens between outcomes in neg risk markets                   |
| Conditional Tokens (CTF) | [`0x4D97DCd97eC945f40cF65F87097ACe5EA0476045`](https://polygonscan.com/address/0x4D97DCd97eC945f40cF65F87097ACe5EA0476045) | ERC1155 token storage — split, merge, and redeem operations               |

***

## Token Contracts

| Contract              | Address                                                                                                                    | Description                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| USDC.e (Bridged USDC) | [`0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`](https://polygonscan.com/address/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174) | Collateral token used for all Polymarket trading (6 decimals) |

***

## Wallet Factory Contracts

| Contract                 | Address                                                                                                                    | Description           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Gnosis Safe Factory      | [`0xaacfeea03eb1561c4e67d661e40682bd20e3541b`](https://polygonscan.com/address/0xaacfeea03eb1561c4e67d661e40682bd20e3541b) | Deploys Safe wallets  |
| Polymarket Proxy Factory | [`0xaB45c5A4B0c941a2F231C04C3f49182e1A254052`](https://polygonscan.com/address/0xaB45c5A4B0c941a2F231C04C3f49182e1A254052) | Deploys proxy wallets |

***

## Resolution Contracts

| Contract              | Address                                                                                                                    | Description                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| UMA Adapter           | [`0x6A9D222616C90FcA5754cd1333cFD9b7fb6a4F74`](https://polygonscan.com/address/0x6A9D222616C90FcA5754cd1333cFD9b7fb6a4F74) | Adapter connecting Polymarket to the UMA Optimistic Oracle |
| UMA Optimistic Oracle | [`0xCB1822859cEF82Cd2Eb4E6276C7916e692995130`](https://polygonscan.com/address/0xCB1822859cEF82Cd2Eb4E6276C7916e692995130) | Handles market resolution proposals and disputes           |

***

## Liquidity

| Contract                    | Address                                                                                                                    | Description                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Uniswap v3 USDC.e/USDC Pool | [`0xd36ec33c8bed5a9f7b6630855f1533455b98a418`](https://polygonscan.com/address/0xd36ec33c8bed5a9f7b6630855f1533455b98a418) | Used for USDC.e ↔ USDC conversion during withdrawals |

***

## Source Code

<CardGroup cols={2}>
  <Card title="CTF Exchange" icon="github" href="https://github.com/Polymarket/ctf-exchange">
    Order matching and settlement contracts
  </Card>

  <Card title="Conditional Tokens" icon="github" href="https://github.com/gnosis/conditional-tokens-contracts">
    Gnosis Conditional Token Framework (ERC1155)
  </Card>
</CardGroup>

***

## Usage in Code

<CodeGroup>
  ```typescript TypeScript theme={null}
  const ADDRESSES = {
    USDC_E: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    CTF: "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045",
    CTF_EXCHANGE: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
    NEG_RISK_CTF_EXCHANGE: "0xC5d563A36AE78145C45a50134d48A1215220f80a",
  };
  ```

  ```python Python theme={null}
  ADDRESSES = {
      "USDC_E": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "CTF": "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045",
      "CTF_EXCHANGE": "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
      "NEG_RISK_CTF_EXCHANGE": "0xC5d563A36AE78145C45a50134d48A1215220f80a",
  }
  ```
</CodeGroup>
