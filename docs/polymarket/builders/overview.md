<!--
Source: https://docs.polymarket.com/builders/overview.md
Downloaded: 2026-02-22T05:01:17.205Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Builder Program

> Build applications that route orders through Polymarket

A **builder** is a person, group, or organization that routes orders from users to Polymarket. If you've created a platform that allows users to trade on Polymarket through your system, this program is for you.

## Program Benefits

<CardGroup cols={2}>
  <Card title="Gasless Transactions" icon="gas-pump">
    All onchain operations are gas-free through our relayer
  </Card>

  <Card title="Order Attribution" icon="tag">
    Get credit for orders and compete for grants on the Builder Leaderboard
  </Card>
</CardGroup>

### What You Get

| Benefit             | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| **Relayer Access**  | Gas-free wallet deployment, approvals, order execution and CTF operations       |
| **Volume Tracking** | All orders attributed to your builder profile                                   |
| **Weekly Rewards**  | USDC rewards program based on volume (Verified+)                                |
| **Leaderboard**     | Public visibility on [builders.polymarket.com](https://builders.polymarket.com) |
| **Support**         | Telegram channel and engineering support (Verified+)                            |

<Warning>
  EOA wallets do not have relayer access. Users trading directly from an EOA pay
  their own gas fees.
</Warning>

## How It Works

<Steps>
  <Step title="User Places Order">
    User places an order through your application.
  </Step>

  <Step title="Sign Request">
    Your app signs the request with Builder API credentials.
  </Step>

  <Step title="Submit to CLOB">
    Order is submitted to Polymarket's CLOB with attribution headers.
  </Step>

  <Step title="Trade Execution">
    Polymarket matches the order and covers gas fees for onchain operations.
  </Step>

  <Step title="Volume Attribution">
    Volume is credited to your builder account.
  </Step>
</Steps>

## Getting Started

<Steps>
  <Step title="Create Builder Profile">
    Go to
    [polymarket.com/settings?tab=builder](https://polymarket.com/settings?tab=builder)
    and generate your API keys.
  </Step>

  <Step title="Configure Attribution">
    Set up your CLOB client to include builder authentication headers with every
    order.
  </Step>

  <Step title="Enable Gasless Transactions">
    Use the Relayer Client for gas-free wallet deployment and onchain
    operations.
  </Step>

  <Step title="Track Performance">
    Monitor your volume on the [Builder
    Leaderboard](https://builders.polymarket.com).
  </Step>
</Steps>

## SDKs and Libraries

<CardGroup cols={2}>
  <Card title="CLOB Client (TypeScript)" icon="github" href="https://github.com/Polymarket/clob-client">
    Place orders with builder attribution
  </Card>

  <Card title="CLOB Client (Python)" icon="github" href="https://github.com/Polymarket/py-clob-client">
    Place orders with builder attribution
  </Card>

  <Card title="Relayer Client (TypeScript)" icon="github" href="https://github.com/Polymarket/builder-relayer-client">
    Gasless onchain transactions
  </Card>

  <Card title="Relayer Client (Python)" icon="github" href="https://github.com/Polymarket/py-builder-relayer-client">
    Gasless onchain transactions
  </Card>

  <Card title="CLOB Client (Rust)" icon="github" href="https://github.com/Polymarket/rs-clob-client">
    Place orders with builder attribution
  </Card>

  <Card title="Signing SDK (TypeScript)" icon="github" href="https://github.com/Polymarket/builder-signing-sdk">
    Sign builder authentication headers
  </Card>

  <Card title="Signing SDK (Python)" icon="github" href="https://github.com/Polymarket/py-builder-signing-sdk">
    Sign builder authentication headers
  </Card>
</CardGroup>

## Examples

These open-source demo applications show how to integrate Polymarket's CLOB Client and Builder Relayer Client for gasless trading with builder order attribution.

<CardGroup cols={3}>
  <Card title="Authentication" icon="user-check">
    Multiple wallet providers
  </Card>

  <Card title="Gasless Trading" icon="gas-pump">
    Safe & Proxy wallet support
  </Card>

  <Card title="Full Integration" icon="puzzle-piece">
    Orders, positions, CTF ops
  </Card>
</CardGroup>

### Safe Wallet Examples

Deploy Gnosis Safe wallets for your users:

<CardGroup cols={2}>
  <Card title="wagmi + Safe" icon="wallet" href="https://github.com/Polymarket/wagmi-safe-builder-example">
    MetaMask, Phantom, Rabby, and other browser wallets
  </Card>

  <Card title="Privy + Safe" icon="shield-check" href="https://github.com/Polymarket/privy-safe-builder-example">
    Privy embedded wallets
  </Card>

  <Card title="Magic Link + Safe" icon="wand-magic-sparkles" href="https://github.com/Polymarket/magic-safe-builder-example">
    Magic Link email/social authentication
  </Card>

  <Card title="Turnkey + Safe" icon="key" href="https://github.com/Polymarket/turnkey-safe-builder-example">
    Turnkey embedded wallets
  </Card>
</CardGroup>

### Proxy Wallet Examples

For existing Magic Link users from Polymarket.com:

<CardGroup cols={1}>
  <Card title="Magic Link + Proxy" icon="wand-magic-sparkles" href="https://github.com/Polymarket/magic-proxy-builder-example">
    Auto-deploying proxy wallets for Polymarket.com Magic users
  </Card>
</CardGroup>

### What Each Demo Covers

<Tabs>
  <Tab title="Authentication">
    * User sign-in via wallet provider
    * User API credential derivation (L2 auth)
    * Builder config with remote signing
    * Signature types for Safe vs Proxy wallets
  </Tab>

  <Tab title="Wallet Operations">
    * Safe wallet deployment via Relayer
    * Batch token approvals (USDC.e + outcome tokens)
    * CTF operations (split, merge, redeem)
    * Transaction monitoring
  </Tab>

  <Tab title="Trading">
    * CLOB client initialization
    * Order placement with builder attribution
    * Position and order management
    * Market discovery via Gamma API
  </Tab>
</Tabs>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Get API Keys" icon="key" href="/builders/api-keys">
    Create and manage your Builder API credentials.
  </Card>

  <Card title="Understand Tiers" icon="layer-group" href="/builders/tiers">
    Learn about rate limits and how to upgrade.
  </Card>

  <Card title="Attribute Orders" icon="tag" href="/trading/orders/attribution">
    Configure your client to credit trades to your account.
  </Card>

  <Card title="Gasless Guide" icon="gas-pump" href="/trading/gasless">
    Set up gasless transactions for your users.
  </Card>
</CardGroup>
