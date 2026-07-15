> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Markets

> Listed perpetual markets and trading parameters

Polymarket Perps markets track underlying assets across indices, commodities,
crypto assets, and equities. Each market has its own trading parameters.

## Instruments

Perps markets are represented by instruments, which are the listed perpetual
contracts available to trade.

| ID | Symbol       | Category    | Base Asset | Max Leverage |
| -- | ------------ | ----------- | ---------- | ------------ |
| 1  | `SP500-USD`  | `index`     | `SP500`    | 20x          |
| 2  | `GOLD-USD`   | `commodity` | `GOLD`     | 20x          |
| 3  | `WTIOIL-USD` | `commodity` | `WTIOIL`   | 20x          |
| 4  | `NAS100-USD` | `index`     | `NAS100`   | 20x          |
| 5  | `SILVER-USD` | `commodity` | `SILVER`   | 20x          |
| 6  | `BTC-USD`    | `crypto`    | `BTC`      | 20x          |
| 7  | `ETH-USD`    | `crypto`    | `ETH`      | 20x          |
| 8  | `SOL-USD`    | `crypto`    | `SOL`      | 20x          |
| 9  | `SPCX-USD`   | `equity`    | `SPCX`     | 10x          |

Each instrument also includes details that shape how it trades:

* Underlying asset
* Collateral and quote asset
* Price and quantity precision
* Tick size
* Minimum order size
* Risk tiers and leverage caps
* Mark, index, and funding configuration

<Note>
  Market parameters can change as markets evolve. Builders should read live
  instrument details from [Market Data](/perps/market-data#fetch-instruments)
  before submitting orders.
</Note>

## Price Feeds

Each market tracks an underlying market through external price feeds. Those
feeds drive the [Index Price](/perps/learn-about-trading/index-price), and the Index Price helps anchor the [Mark Price](/perps/learn-about-trading/mark-price).
