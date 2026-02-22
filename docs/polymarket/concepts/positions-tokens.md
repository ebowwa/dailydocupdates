<!--
Source: https://docs.polymarket.com/concepts/positions-tokens.md
Downloaded: 2026-02-22T05:37:55.151Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Positions & Tokens

> Understanding outcome tokens and how positions work on Polymarket

Every prediction on Polymarket is represented by **outcome tokens**. When you trade, you're buying and selling these tokens. Your **position** is simply your balance of tokens for a given market.

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-lifecycle.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=cad279109c43c68c541123c2d348c4c5" alt="" className="dark:hidden" data-og-width="1596" width="1596" data-og-height="952" height="952" data-path="images/core-concepts/token-lifecycle.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-lifecycle.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=0ffccd48fc17a9f42af63ef241da60bc 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-lifecycle.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=01cd5803170451665113299880e5e7c6 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-lifecycle.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=858762e2dfd9f89a3a2e9356f74baa2d 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-lifecycle.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=984d76c377540e42777ae7d55f0d85bd 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-lifecycle.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=b29bd8c950689ad8dc8a960368d85152 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/token-lifecycle.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=b99b9c4e684ca44f096dbfa4e5c3d9fc 2500w" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-lifecycle.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=204d16c1d89892a3c8573060aa04780e" alt="" className="hidden dark:block" data-og-width="1596" width="1596" data-og-height="952" height="952" data-path="images/dark/core-concepts/token-lifecycle.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-lifecycle.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=23a54d7a2360619ac2e40adadd586f4d 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-lifecycle.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=903265a9549d5e0c98ec5c27052fdef2 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-lifecycle.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=a319bab4226ccd72ae0904db21cb08ff 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-lifecycle.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=3ab25065f1b7247c2162c8e3a94ffc76 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-lifecycle.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=6f2ed88467e198b6c4a76704669436c4 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/token-lifecycle.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=125a45e3954df870f6d1ade7d7a9e389 2500w" />
</Frame>

## Outcome Tokens

Each market has exactly two outcome tokens:

| Token   | Redeems for | If...                    |
| ------- | ----------- | ------------------------ |
| **Yes** | \$1.00      | The event occurs         |
| **No**  | \$1.00      | The event does not occur |

Tokens are **ERC1155** assets on Polygon, using the [Gnosis Conditional Token Framework](https://github.com/gnosis/conditional-tokens-contracts/) (CTF). This means they're fully onchain and function as standard ERC1155 tokens.

<Note>
  Outcome tokens are always fully backed. Every Yes/No pair in existence is
  backed by exactly `$1` of USDC.e collateral locked in the CTF contract.
</Note>

### Split

Convert USDC.e into outcome tokens. Splitting \$1 creates 1 Yes token and 1 No token.

```
$100 USDC.e → 100 Yes tokens + 100 No tokens
```

Use this when you want to:

* Create inventory for market making
* Obtain both sides of a market

### Trade

Buy or sell tokens on the order book. This is how most users acquire positions.

* **Buy Yes** at `$0.60` → Pay `$0.60`, receive 1 Yes token
* **Sell Yes** at `$0.60` → Give up 1 Yes token, receive `$0.60`

You can sell your position at any time before resolution.

### Merge

Convert a complete set of tokens back into USDC.e. Merging requires equal amounts of Yes and No tokens.

```
100 Yes tokens + 100 No tokens → $100 USDC.e
```

Use this when you want to:

* Exit a position without trading
* Convert accumulated tokens back to collateral

### Redeem

After a market resolves, exchange winning tokens for USDC.e.

| Outcome             | Yes tokens     | No tokens      |
| ------------------- | -------------- | -------------- |
| Event occurs        | Worth \$1 each | Worth \$0      |
| Event doesn't occur | Worth \$0      | Worth \$1 each |

```
100 winning tokens → $100 USDC.e
```

### Position Value

The value of your position depends on the current market price:

```
Position value = Token balance × Current price
```

If you hold 100 Yes tokens and Yes is trading at \$0.75:

```
Position value = 100 × $0.75 = $75
```

## Profit and Loss

Your profit depends on how the market resolves compared to your entry price.

### Example - Buying Yes at 0.40

| Scenario            | Outcome  | Return | Profit                    |
| ------------------- | -------- | ------ | ------------------------- |
| Event occurs        | Yes wins | \$1.00 | +\$0.60 per token (150%)  |
| Event doesn't occur | No wins  | \$0.00 | -\$0.40 per token (-100%) |

### Holding Rewards

Polymarket pays a **4.00% annualized** Holding Reward based on your total position value in eligible markets. Your total position value is randomly sampled once each hour, and the reward is distributed daily. The rate is variable and subject to change at Polymarket's discretion.

### Example - Selling Before Resolution

You can lock in profits or cut losses by selling before the market resolves:

* Bought Yes at `$0.40`
* Price rises to `$0.70`
* Sell at `$0.70` → Profit of `$0.30` per token (75%)
