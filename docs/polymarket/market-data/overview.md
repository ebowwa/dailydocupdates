<!--
Source: https://docs.polymarket.com/market-data/overview.md
Downloaded: 2026-07-23T21:04:54.610Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Learn how Polymarket organizes market data and where to begin.

Market data starts with identifying the event, market, or outcome your
application cares about. The pages in this section take you from that choice to
the data your application needs.

## Understand the Data Model

On Polymarket, an event groups one or more markets. Each market is a tradable
question with YES and NO outcomes, and each outcome has its own token ID. Use
the token ID for the outcome whose price or order book you want to read.

<Frame>
  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/core-concepts/event.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=0c9a264aec9a22ce5a20c4cc7980806d" alt="" className="dark:hidden" width="1540" height="952" data-path="images/core-concepts/event.png" />

  <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/dark/core-concepts/event.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=912e41bebfe8c1a43ef53b89685ca3d2" alt="" className="hidden dark:block" width="1540" height="952" data-path="images/dark/core-concepts/event.png" />
</Frame>

<Steps>
  <Step title="Discover an event">
    Browse active events, search by topic, or fetch an event directly from its
    Polymarket URL.
  </Step>

  <Step title="Select a market">
    Inspect the event's markets and choose the specific question your app cares
    about.
  </Step>

  <Step title="Choose an outcome">
    Choose YES or NO and keep its token ID. You'll use it to read prices, access
    the order book, and place orders.
  </Step>

  <Step title="Read or stream data">
    Use the identifiers you've collected to retrieve or stream the market data
    your application needs.
  </Step>
</Steps>

## Choose a Workflow

If you are new to Polymarket market data, start with [Discover
Markets](/market-data/discover-markets).

<CardGroup cols={2}>
  <Card title="Discover Markets" icon="magnifying-glass" href="/market-data/discover-markets">
    Find the events and markets your application cares about.
  </Card>

  <Card title="Get Market Details" icon="list-tree" href="/market-data/market-details">
    Understand a market's outcomes, status, trading constraints, fees, and other
    properties.
  </Card>

  <Card title="Prices and Order Books" icon="chart-line" href="/market-data/prices-order-books">
    Understand current pricing and liquidity, or inspect how prices have
    changed.
  </Card>

  <Card title="Analytics" icon="chart-column" href="/market-data/public-analytics">
    Analyze market activity and compare trader and builder performance.
  </Card>

  <Card title="Real-Time Data" icon="radio" href="/market-data/realtime-data">
    Keep your application current as markets and related data change.
  </Card>
</CardGroup>
