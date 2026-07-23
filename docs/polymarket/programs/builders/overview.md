<!--
Source: https://docs.polymarket.com/programs/builders/overview.md
Downloaded: 2026-07-23T21:04:54.614Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

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
| **Leaderboard**     | Public visibility on [builders.polymarket.com](https://builders.polymarket.com) |
| **Support**         | Telegram channel and engineering support (Verified+)                            |

## How It Works

<Steps>
  <Step title="User Places Order">
    User places an order through your application.
  </Step>

  <Step title="Attach Builder Code">
    Your app adds your builder code to each order.
  </Step>

  <Step title="Submit to CLOB">
    Order is submitted to Polymarket's CLOB — the builder code is serialized
    onchain as part of the signed order.
  </Step>

  <Step title="Trade Execution">
    Polymarket matches the order and covers gas fees for onchain operations.
  </Step>

  <Step title="Volume Attribution">
    Volume is credited to your builder account for every matched trade where
    your code is attached.
  </Step>
</Steps>

## Getting Started

<Steps>
  <Step title="Create Builder Profile">
    Open polymarket.com → Settings →
    [Builders](https://polymarket.com/settings?tab=builder) and copy your builder
    code.
  </Step>

  <Step title="Attach Your Builder Code">
    Attach your builder code to every order you submit. See [Builder
    Attribution](/trading/place-orders#builder-attribution).
  </Step>

  <Step title="Enable Gasless Transactions">
    Use the Polymarket relayer to deploy wallets and [execute gasless
    transactions](/trading/wallets-auth#execute-gasless-transactions).
  </Step>

  <Step title="Track Performance">
    Monitor your volume on the [Builder
    Leaderboard](https://builders.polymarket.com).

    Allow up to **24 hours** for matched volume to appear on the leaderboard.
  </Step>
</Steps>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Create New Accounts" icon="key" href="/trading/wallets-auth#create-new-accounts">
    Create a builder account and the credentials used to provision accounts for
    your users.
  </Card>

  <Card title="Understand Tiers" icon="layer-group" href="/programs/builders/tiers">
    Learn about rate limits and how to upgrade.
  </Card>

  <Card title="Attribute Orders" icon="tag" href="/trading/place-orders#builder-attribution">
    Configure your client to credit trades to your account.
  </Card>

  <Card title="Execute Gasless Transactions" icon="gas-pump" href="/trading/wallets-auth#execute-gasless-transactions">
    Approve tokens, transfer funds, and manage positions without paying gas.
  </Card>
</CardGroup>
