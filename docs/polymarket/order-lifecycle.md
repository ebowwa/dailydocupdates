<!--
Source: https://docs.polymarket.com/concepts/order-lifecycle.md
Downloaded: 2026-02-22T04:08:22.291Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Lifecycle

> Understanding how orders flow from creation to settlement

Every trade on Polymarket follows a specific lifecycle. Orders are created offchain, matched by an operator, and settled onchain through smart contracts. This hybrid approach combines the speed of centralized matching with the security of blockchain settlement.

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/order-lifecycle.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=4db07008193421bfe359afe44b5f604e" alt="" className="dark:hidden" data-og-width="2336" width="2336" data-og-height="952" height="952" data-path="images/core-concepts/order-lifecycle.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/order-lifecycle.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=7269f450774ef5d4886455043ade1d83 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/order-lifecycle.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=e5329a354884b11c94c2ce1ffc89c1d4 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/order-lifecycle.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=2e31c345d92dcce72a824361c1522ab5 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/order-lifecycle.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=8dead82080254f84858526c62c5b003b 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/order-lifecycle.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=557ef2f860a87dc7c3e47a66707a34ad 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/order-lifecycle.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=f69b7cd9fb0ccb6e4a058b187d51eb24 2500w" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/order-lifecycle.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=5a0f3eba2f20c44471bae05c0670de4a" alt="" className="hidden dark:block" data-og-width="2336" width="2336" data-og-height="952" height="952" data-path="images/dark/core-concepts/order-lifecycle.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/order-lifecycle.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=6c7265f6dfed87cb901bde64686ce13e 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/order-lifecycle.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=bbf111f3efe60e15b9022c313befaf0e 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/order-lifecycle.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=9e81f0b099ce605683d7c0fcca2d2006 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/order-lifecycle.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=98ffaa7a741369b9b5fa9aefcc851e37 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/order-lifecycle.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=96126a395420dbe087ac104ca0fbc773 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/order-lifecycle.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=e6f9c36ce23716a00a6563bf428d3aa8 2500w" />
</Frame>

## How Orders Work

All orders on Polymarket are **limit orders**. A limit order specifies the price you're willing to pay (or accept) and the quantity you want to trade.

<Note>
  "Market orders" are simply limit orders with a price set to execute
  immediately against the best available resting orders.
</Note>

Orders are **EIP712-signed messages**. When you place an order, you sign a structured message with your private key. This signature authorizes the Exchange contract to execute the trade on your behalf—without ever taking custody of your funds.

## Order Types

| Type    | Behavior                                                      | Use Case                 |
| ------- | ------------------------------------------------------------- | ------------------------ |
| **GTC** | Good Till Cancelled — rests on book until filled or cancelled | Standard limit orders    |
| **GTD** | Good Till Date — auto-expires at specified time               | Time-limited orders      |
| **FOK** | Fill Or Kill — fill entirely or cancel immediately            | All-or-nothing execution |
| **FAK** | Fill And Kill — fill what's available, cancel the rest        | Partial fills acceptable |

### Post-Only Orders

Post-only orders will only rest on the book. If a post-only order would match immediately (cross the spread), it's rejected instead of executed. This guarantees you're always the maker, never the taker.

<Steps>
  <Step title="Create and Sign">
    Your client creates an order object containing:

    * Token ID (which outcome you're trading)
    * Side (buy or sell)
    * Price and size
    * Expiration time
    * Nonce (for replay protection)

    You sign this order with your private key, creating an EIP712 signature.
  </Step>

  <Step title="Submit to CLOB">
    The signed order is submitted to the Central Limit Order Book (CLOB) operator. The operator validates:

    * Signature is valid
    * You have sufficient balance
    * You have set the required allowances
    * Price meets minimum tick size requirements
  </Step>

  <Step title="Match or Rest">
    **If the order is marketable** (your buy price ≥ lowest ask, or your sell price ≤ highest bid), it matches immediately against resting orders.

    **If the order is not marketable**, it rests on the book waiting for a counterparty. It remains open until:

    * Another order matches against it
    * You cancel it
    * It expires (GTD orders only)
  </Step>

  <Step title="Settlement">
    When orders match, the operator submits the trade to the blockchain. The Exchange contract:

    * Verifies both signatures
    * Transfers tokens from seller to buyer
    * Transfers USDC.e from buyer to seller

    Settlement is **atomic**—either the entire trade succeeds or nothing happens.
  </Step>

  <Step title="Confirmation">
    The trade achieves finality on Polygon. Your token balances update and the trade appears in your history.
  </Step>
</Steps>

## Order Statuses

When you place an order, it receives one of these statuses:

| Status      | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `live`      | Order is resting on the book                                                |
| `matched`   | Order matched immediately                                                   |
| `delayed`   | Marketable order subject to a 3-second matching delay (sports markets)      |
| `unmatched` | Marketable order placed on the book after the delay expired without a match |

## Trade Statuses

After matching, trades progress through these statuses:

| Status      | Terminal | Description                                            |
| ----------- | -------- | ------------------------------------------------------ |
| `MATCHED`   | No       | Trade matched, sent to executor for onchain submission |
| `MINED`     | No       | Transaction mined into the blockchain                  |
| `CONFIRMED` | Yes      | Trade achieved finality, successful                    |
| `RETRYING`  | No       | Transaction failed, being retried                      |
| `FAILED`    | Yes      | Trade failed permanently                               |

## Maker vs Taker

| Role      | Description                     | When                                                  |
| --------- | ------------------------------- | ----------------------------------------------------- |
| **Maker** | Adds liquidity to the book      | Your order rests and is later matched                 |
| **Taker** | Removes liquidity from the book | Your order matches immediately against resting orders |

Price improvement always benefits the taker. If you place a buy order at `$0.55` and it matches against a resting sell at `$0.52`, you pay `$0.52`.

## Cancellation

You can cancel orders at any time before they're matched:

* **Via API** — Cancel through the CLOB API (instant)
* **Onchain** — Cancel directly on the Exchange contract (fallback if API is unavailable)

Partial fills cannot be cancelled—only the unfilled portion of an order can be cancelled.

## Requirements

Before placing orders, ensure:

| Requirement         | Description                                        |
| ------------------- | -------------------------------------------------- |
| **Balance**         | Sufficient USDC.e (for buys) or tokens (for sells) |
| **Allowance**       | Approve the Exchange contract to spend your assets |
| **API Credentials** | Valid API key for authenticated endpoints          |

<Info>
  Order size is limited by your available balance minus any amounts reserved by existing open orders.

  $$
  \text{maxOrderSize} = \text{balance} - \sum(\text{openOrderSize} - \text{filledAmount})
  $$
</Info>

## Next Steps

<CardGroup cols={2}>
  <Card title="Resolution" icon="gavel" href="/concepts/resolution">
    Learn how markets are resolved and winning tokens redeemed.
  </Card>

  <Card title="Trading Guide" icon="book" href="/trading/overview">
    Start placing orders with our step-by-step guide.
  </Card>
</CardGroup>
