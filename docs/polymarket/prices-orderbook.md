<!--
Source: https://docs.polymarket.com/concepts/prices-orderbook.md
Downloaded: 2026-02-22T04:08:22.291Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Prices & Orderbook

> How prices work and how the order book enables peer-to-peer trading

Polymarket uses a **Central Limit Order Book (CLOB)** for trading. Prices aren't set by Polymarket—they emerge from supply and demand as users trade with each other.

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/orderbook.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=119174bcaaeb3b9abbd4c2d94b7bdae6" alt="" className="dark:hidden" data-og-width="1540" width="1540" data-og-height="952" height="952" data-path="images/core-concepts/orderbook.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/orderbook.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=4cd823593d6e2ad297d0167864d1609c 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/orderbook.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=7d8dbe330255b2e9a4ad3c29cbf75314 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/orderbook.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=9cc094dc2019b2dbfbbc4599de5a2130 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/orderbook.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=74433ab1e13b0824014684a73bdfa4f1 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/orderbook.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=71a63d5439e2f2d546b0cfb42e1842f4 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/orderbook.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=e38a76f49a70c8a81e9cdb3413373ee0 2500w" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/orderbook.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=b940f4b5f28ab6ed5845dda2bfe03edb" alt="" className="hidden dark:block" data-og-width="1540" width="1540" data-og-height="952" height="952" data-path="images/dark/core-concepts/orderbook.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/orderbook.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=533188cbd9f6291614252ae4b8ab4369 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/orderbook.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=dd1f19796326f6aec10dbfbe711796a5 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/orderbook.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=f9b45316ed1c8456d48050ec5afba8ce 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/orderbook.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=e22b48d04c52f6dea3a75f0a5a234bd3 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/orderbook.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=4b41a58adc9bbb24d31b1a6c9e7a78e1 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/orderbook.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=010efa3dc9eacb8f76a4045af81b97f6 2500w" />
</Frame>

## Prices Are Probabilities

Every share on Polymarket is priced between `$0.00` and `$1.00`. The price directly represents the market's belief in the probability of that outcome.

| Price  | Implied Probability |
| ------ | ------------------- |
| \$0.25 | 25% chance          |
| \$0.50 | 50% chance          |
| \$0.75 | 75% chance          |

<Note>
  The displayed price is the **midpoint** of the bid-ask spread. If the spread
  is wider than \$0.10, the last traded price is shown instead.
</Note>

### Example

If the best bid for "Yes" is `$0.34` and the best ask is `$0.40`:

```
Displayed price = ($0.34 + $0.40) / 2 = $0.37 (37% probability)
```

You won't necessarily trade at `$0.37`—you'll pay the ask (`$0.40`) when buying or receive the bid (`$0.34`) when selling.

## The Order Book

The order book is a list of all open buy and sell orders for a market. It has two sides:

| Side | Description                                                 |
| ---- | ----------------------------------------------------------- |
| Bids | Buy orders—the highest prices traders are willing to pay    |
| Asks | Sell orders—the lowest prices traders are willing to accept |

The **spread** is the gap between the highest bid and lowest ask. Tighter spreads mean more liquid markets.

## Order Types

### Market Orders

Execute immediately at the best available price. Use when you want instant execution and are willing to pay the spread.

* **Buying**: You pay the lowest ask price
* **Selling**: You receive the highest bid price

### Limit Orders

Execute only at your specified price or better. Use when you want price control and are willing to wait.

* Your order sits in the book until someone trades against it
* Orders can **partially fill** as different traders match portions of your order
* You can cancel unfilled orders at any time

<Note>
  All orders on Polymarket are technically limit orders. A "market order" is
  simply a limit order priced to execute immediately against resting orders.
</Note>

## How Trades Work

Polymarket's CLOB is **hybrid-decentralized**:

1. **Offchain matching** — An operator matches compatible orders
2. **Onchain settlement** — Matched trades settle via smart contracts

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/trade-lifecycle.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=2acec8befdfbba57fb554170f7d5813c" alt="" className="dark:hidden" data-og-width="1540" width="1540" data-og-height="952" height="952" data-path="images/core-concepts/trade-lifecycle.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/trade-lifecycle.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=b87b109ead5fae763112e70cd9e397d0 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/trade-lifecycle.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=ce4b5a18e73aa1a0c69cc0d075ab318c 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/trade-lifecycle.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=c32ae4a5b13fbde13ae3b73387013d3c 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/trade-lifecycle.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=4df792716a2bc70678325cd40d17dc72 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/trade-lifecycle.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=0e419e401bc9e018c70e5205899d2242 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/trade-lifecycle.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=b055567fe354f162e62b3fcdb3ef26da 2500w" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/trade-lifecycle.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=d18b22ad7629820ad554dda8cb83ec18" alt="" className="hidden dark:block" data-og-width="1540" width="1540" data-og-height="952" height="952" data-path="images/dark/core-concepts/trade-lifecycle.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/trade-lifecycle.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=514a93dfdc97bf4f59e75dd689b2388e 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/trade-lifecycle.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=45e5eebd5694861b5102554bab6068d1 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/trade-lifecycle.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=25363946221517ab70226fdba090ede9 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/trade-lifecycle.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=677c7865a1df1b598af0bdee8ad803a1 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/trade-lifecycle.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=b611e2585cadcebc0a505dcac60dbf02 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/trade-lifecycle.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=ec586a31f469c5e12c199949a57bce9e 2500w" />
</Frame>

This design gives you the speed of centralized matching with the security of onchain settlement. You always maintain custody of your funds.

## Price Discovery

When a new market launches, there's no initial price. The first price emerges when:

1. Someone places a limit order to buy Yes at a price (e.g., `$0.60`)
2. Someone places a limit order to buy No at the complementary price (e.g., `$0.40`)
3. Since `$0.60` + `$0.40` = `$1.00`, the orders match

When matched, `$1.00` is converted into 1 Yes token and 1 No token, each going to their respective buyers.

## Next Steps

<Note>
  Polymarket's orderbook has **no trading size limits** — it matches willing
  buyers and sellers of any amount. However, large orders may move the price
  significantly. Always check orderbook depth before trading in size.
</Note>

<CardGroup cols={2}>
  <Card title="Positions & Tokens" icon="coins" href="/concepts/positions-tokens">
    Learn about outcome tokens and how positions work.
  </Card>

  <Card title="Order Lifecycle" icon="arrows-spin" href="/concepts/order-lifecycle">
    Understand what happens from order placement to settlement.
  </Card>
</CardGroup>
