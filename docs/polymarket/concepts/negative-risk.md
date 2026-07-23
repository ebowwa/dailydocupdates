<!--
Source: https://docs.polymarket.com/concepts/negative-risk.md
Downloaded: 2026-07-23T21:04:54.608Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Negative Risk Markets

> Capital-efficient trading for multi-outcome events

**Negative risk** is a mechanism for multi-outcome events where only one outcome can win. It enables capital-efficient trading by allowing positions across all outcomes within an event to be related through a **conversion** operation.

## How It Works

In a standard multi-outcome event, each market is independent. If you want to bet against one outcome, you must buy that outcome's No tokens—but those No tokens have no relationship to the other outcomes.

Negative risk changes this. In a neg risk event:

* A **No share** in any market can be converted into **1 Yes share in every other market**
* This conversion happens through the [Neg Risk Adapter contract](https://github.com/Polymarket/neg-risk-ctf-adapter)

### Example

Consider an event: "Who will win the 2024 Presidential Election?" with three outcomes:

| Outcome | Your Position |
| ------- | ------------- |
| Trump   | —             |
| Harris  | —             |
| Other   | 1 No          |

With negative risk, that 1 No on "Other" can be converted into:

| Outcome | After Conversion |
| ------- | ---------------- |
| Trump   | 1 Yes            |
| Harris  | 1 Yes            |
| Other   | —                |

This is capital-efficient because betting against one outcome is economically equivalent to betting *for* all other outcomes.

## Contract Addresses

Neg risk markets use different contracts than standard markets:

See [Contracts](/resources/contracts) for the Neg Risk Adapter and Neg Risk CTF Exchange addresses.

## Augmented Negative Risk

Standard negative risk requires the complete set of outcomes to be known at market creation. But sometimes new outcomes emerge after trading begins (e.g., a new candidate enters a race).

**Augmented negative risk** solves this with:

| Outcome Type             | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| **Named outcomes**       | Known outcomes (e.g., "Trump", "Harris")                      |
| **Placeholder outcomes** | Reserved slots that can be clarified later (e.g., "Person A") |
| **Explicit Other**       | Catches any outcome not explicitly named                      |

### How Placeholders Work

1. Event launches with named outcomes + placeholders + "Other"
2. When a new outcome emerges, a placeholder is clarified via the bulletin board
3. The "Other" definition narrows as placeholders are assigned

### Trading Rules for Augmented Neg Risk

<Warning>
  Only trade on **named outcomes**. Placeholder outcomes should be ignored until
  they are named or until resolution occurs. The Polymarket UI does not display
  unnamed outcomes.
</Warning>

* If the correct outcome at resolution is not named, the market resolves to "Other"
* The "Other" outcome's definition changes as placeholders are clarified—avoid trading it directly

## Technical Details

### Conversion Mechanics

The conversion operation is atomic and happens through the Neg Risk Adapter:

1. You hold 1 No token for Outcome A
2. Call the convert function on the adapter
3. You receive 1 Yes token for every other outcome in the event

## Next Steps

<CardGroup cols={2}>
  <Card title="Markets & Events" icon="calendar" href="/concepts/markets-events">
    Understand how multi-market events are structured.
  </Card>

  <Card title="Positions & Tokens" icon="coins" href="/concepts/positions-tokens">
    Learn about token operations like split, merge, and redeem.
  </Card>
</CardGroup>
