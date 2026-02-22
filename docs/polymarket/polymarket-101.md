<!--
Source: https://docs.polymarket.com/polymarket-101.md
Downloaded: 2026-02-22T05:01:17.206Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Polymarket 101

> An intro to Polymarket - the world's largest prediction market

Polymarket is a prediction market platform where users trade on the outcomes of real-world events. Instead of betting against a house, you trade shares with other users in an open, peer-to-peer market. Prices reflect the market's collective belief in the probability of an event occurring.

The platform is non-custodial, meaning you always control your funds. All trades are settled through smart contracts on the blockchain, ensuring transparent and trustless operation.

## Self-Custody

Polymarket operates on a non-custodial model. You maintain full control of your funds at all times.

* **You control your funds** - Assets are held in your wallet, secured by your private key
* **Smart contract enforcement** - Trades execute automatically through audited smart contracts
* **No intermediary risk** - Polymarket never takes possession of your funds — you maintain full control through your private key
* **Full transparency** - All trades and positions are recorded onchain and publicly verifiable
* **Trustless execution** - Settlement happens automatically based on market resolution

<Warning>
  Keep your private key safe and never share it with anyone. If you lose your
  private key, you lose access to your funds. If you signed up via Magic Link
  or have a proxy wallet, recovery may be possible through
  [recovery.polymarket.com](https://recovery.polymarket.com).
</Warning>

## How Polymarket Works

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/polymarket-101.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=059e9831d1c51b99996d9747c0139d49" alt="Polymarket Overview" className="dark:hidden" data-og-width="1526" width="1526" data-og-height="952" height="952" data-path="images/core-concepts/polymarket-101.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/polymarket-101.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=cee8a9c30e5f8eeb52ce1533c9ed20a6 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/polymarket-101.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=195d47349ffa7b8121cd8145cfb59c10 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/polymarket-101.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=9ca0bddd2f81d006e2133fe3a62c2efb 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/polymarket-101.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=c36604501b95b21d7935271369de9d29 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/polymarket-101.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=05150d8151fef216d54681d9150dfc50 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/polymarket-101.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=db38c27a42a4056f0fb2d0bceaede56d 2500w" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/polymarket-101.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=4e929eca98a2bb83ef7421f7bbaf9f1d" alt="Polymarket Overview" className="hidden dark:block" data-og-width="1526" width="1526" data-og-height="952" height="952" data-path="images/dark/core-concepts/polymarket-101.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/polymarket-101.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=5c229d1c21d6add21f0110272eefd038 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/polymarket-101.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=8f74de58b1dd88aa997965fd48b6ccc3 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/polymarket-101.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=84a3a963a45d7e0afa5663c99e1a0d6c 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/polymarket-101.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=b555e8fce14ceefe920847c1b60d6e89 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/polymarket-101.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=066b0d2496c7cc67c6468455e48d38f1 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/polymarket-101.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=9d2e44ea93790ce3cd2bf96b7aaad1a4 2500w" />
</Frame>

### Prices Are Probabilities

Every share on Polymarket is priced between `$0.00` and `$1.00`. The price represents the market's belief in the probability of that outcome occurring.

For example, if "Yes" shares for an event are trading at `$0.65`, the market believes there's approximately a `65%` chance the event will happen.

### Collateral and Tokens

Polymarket uses USDC.e (Bridged USDC on Polygon) as collateral. Every Yes/No pair is fully backed:

* `$1 USDC.e` creates one Yes share and one No share
* Winning shares are redeemable for `$1.00`
* Losing shares are worth `$0.00`

Shares are represented as tokens using the [Gnosis Conditional Token Framework](https://github.com/gnosis/conditional-tokens-contracts/) (ERC1155 standard), enabling seamless onchain trading and settlement.

### Trading

Polymarket uses a peer-to-peer order book (CLOB) for trading. You trade directly with other users, not against the house.

* **Buy shares** when you think the market underestimates the probability
* **Sell shares** when you think the market overestimates the probability
* **Exit anytime** - Sell your position before resolution to lock in profits or cut losses

| Action  | When to Use                           | Profit Scenario           |
| ------- | ------------------------------------- | ------------------------- |
| Buy Yes | You think the probability is too low  | Event occurs              |
| Buy No  | You think the probability is too high | Event does not occur      |
| Sell    | Lock in gains or limit losses         | Price moves in your favor |

### Resolution

When an event concludes, markets are resolved through the **UMA Optimistic Oracle**:

1. A proposer submits the outcome with a bond
2. There's a challenge period where anyone can dispute
3. If disputed, UMA token holders vote on the correct resolution
4. Winning tokens become redeemable for \$1 USDC.e

This community-driven process ensures fair and accurate market resolution.

## Why Blockchain

Polymarket is built on **Polygon**, a blockchain network, for several key reasons:

* **Global accessibility** - Anyone with an internet connection can participate
* **Non-custodial** - You control your funds, not a centralized entity
* **Transparent** - All activity is publicly verifiable onchain
* **Fast and affordable** - Polygon enables quick, low-cost transactions
* **Stable value** - USDC.e is pegged 1:1 to the US dollar, avoiding crypto volatility

## Proxy Wallets

When a user first uses Polymarket.com to trade they are prompted to create a wallet. When they do this, a 1 of 1 multisig is deployed to Polygon which is controlled/owned by the accessing EOA (either MetaMask wallet or MagicLink wallet). This proxy wallet is where all the user's positions (ERC1155) and USDC.e (ERC20) are held.

Using proxy wallets allows Polymarket to provide an improved UX where multi-step transactions can be executed atomically and transactions can be relayed by relayers on the gas station network. If you are a developer looking to programmatically access positions you accumulated via the Polymarket.com interface, you can either continue using the smart contract wallet by executing transactions through it from the owner account, or you can transfer these assets to a new address using the owner account.

### Deployments

Each user has their own proxy wallet (and thus proxy wallet address). See [Contract Addresses](/resources/contract-addresses) for all deployed factory and trading contract addresses on Polygon.

<Tip>
  For details on signature types (`EOA`, `POLY_PROXY`, `GNOSIS_SAFE`) and how to
  configure your trading client for each wallet type, see [Signature
  Types](/trading/overview#signature-types).
</Tip>

***

## Getting Started

Ready to start trading?

<CardGroup cols={2}>
  <Card title="Quickstart Guide" icon="rocket" href="/quickstart">
    Set up your account and make your first trade.
  </Card>

  <Card title="Explore Markets" icon="chart-line" href="https://polymarket.com">
    Browse active prediction markets on Polymarket.
  </Card>
</CardGroup>
