<!--
Source: https://docs.polymarket.com/trading/positions/combinatorial.md
Downloaded: 2026-07-23T21:04:54.618Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Combinatorial Positions

> Multi-leg positions built from existing Polymarket outcomes

Combinatorial positions let traders express a single view across multiple
Polymarket outcomes. Instead of trading one market at a time, a combinatorial
position combines existing outcome tokens into one new YES/NO pair.

## What They Represent

A combinatorial **YES** position represents a conjunction of legs:

```text theme={null}
YES(
  YES(Market A) and YES(Market B) and NO(Market C)
)
```

It pays out when every leg in the combination pays out -- in above example, if
Market A resolves YES AND Market B resolves YES AND Market C resolves NO. The
matching combinatorial **NO** position is the complement:

```text theme={null}
NO(
  YES(Market A) and YES(Market B) and NO(Market C)
)
```

It pays out when the full conjunction does not pay out. In this example, it
will pay out if Market A resolves NO OR Market B resolves NO OR Market C resolves
YES.

## How Tokens Work

A combinatorial condition represents a conjuction of legs, but not a side. The
combinatorial condition from above would be:

```text theme={null}
YES(Market A) and YES(Market B) and NO(Market C)
```

Each combinatorial condition has two **combinatorial positions**, the YES and
the NO, which each have their own ERC 1155 token ID:

| Position | Meaning                               |
| -------- | ------------------------------------- |
| YES      | The full combination pays out         |
| NO       | The full combination does not pay out |

Like standard CTF positions, the YES and NO pair is fully collateralized.
Splitting collateral creates matching YES and NO combinatorial tokens, and
merging a matching pair returns collateral.

However, these positions are *not* on the Conditional Tokens Framework. These
positions exist on a new framework called the Positions Framework.

## Resolution

For normal binary outcomes, a combinatorial YES position pays out only if every
leg wins. If any leg loses, the corresponding combinatorial NO position pays
out.

If some legs are already resolved and others remain open, the position can be
compressed into a simpler position that keeps only the unresolved legs and
realizes any resolved collateral value.

## Related Pages

<CardGroup cols={3}>
  <Card title="CTF Overview" icon="coins" href="/trading/positions/how-positions-work">
    Minimal overview of Conditional Tokens
  </Card>

  <Card title="Split Tokens" icon="scissors" href="/trading/positions/manage#split-a-position">
    Create YES and NO token pairs
  </Card>

  <Card title="Combos" icon="code" href="/trading/combos/overview">
    Quote combinatorial positions through RFQ
  </Card>
</CardGroup>
