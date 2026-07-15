> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Sessions

> How session state affects pricing feed selection

Perps trade 24/7, but the underlying markets do not. Liquidity and external price
feed availability vary by time of day and day of week. Sessions are the system's
categorization of these conditions.

## What Sessions Affect

Sessions affect one thing: which set of external feeds is used to compute [Index Price](/perps/learn-about-trading/index-price) and the [C3 candidate in Mark Price](/perps/learn-about-trading/mark-price).

Each category can use its own feed set. For example, primary venue feeds may be
used during regular hours and after-hours venue feeds may be used overnight. If
the current category has no dedicated feed set, the system falls back to the
overnight feed set.

## What Sessions Do Not Affect

Sessions do not change:

* Funding
* Margin and leverage tiers
* Order matching
* Liquidation triggers

Those systems run identically around the clock.

## Categories

* Regular: the underlying is open and primary feeds are available.
* Overnight: the underlying is closed but some external feeds may still exist.
* Weekend: a calendar-based closed period with thin or absent external data.
* Disrupted: external feeds are unavailable or failing sanity checks.
* Halted: a trading halt or corporate-action freeze on the underlying.

## How the Category Is Determined

Each market has a schedule that defines its time windows and exceptions. The
system evaluates the schedule on time boundaries to produce the current category.
When the category changes, subsequent Index and Mark updates use the feed set
assigned to the new category.
