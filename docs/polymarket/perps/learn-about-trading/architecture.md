> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Architecture

> High-level architecture of the Polymarket Perps exchange

Polymarket Perps is a hybrid exchange: matching happens offchain for speed, while
custody and settlement live on Polygon. Exchange state is periodically committed
onchain so offchain activity remains verifiable.

## Offchain Matching

When a trader places an order, the matching engine maintains the order book,
applies risk checks, matches orders, and updates balances, positions, margin, and
funding offchain. This gives the exchange its latency profile because matching
does not wait on block times.

Orders are authorized by the trader, so the system can only act on trades the
trader approved.

## Onchain Components

The following operations are onchain and settle on Polygon:

* Deposits move funds from a user's Polymarket wallet into the exchange and
  credit their Perps account.
* Withdrawals move funds out of the exchange back to a user's Polymarket wallet.

Deposits and withdrawals are the only way assets enter or leave the exchange.
Trading itself does not produce per-trade onchain transactions.

## State Root Commitments

The exchange periodically commits its trading state onchain in the form of state
root commitments. A state root summarizes the offchain ledger at a point in time,
including account balances, and lets observers verify that reported exchange
state matches what Polymarket has committed to Polygon.

## Data Flow

1. A trader deposits collateral from their Polymarket wallet into the exchange,
   crediting their Perps account.
2. The engine credits the deposit and opens the account for trading.
3. The trader authorizes and places orders.
4. The engine matches orders and updates state offchain.
5. The engine publishes state root commitments onchain on a recurring cadence.
6. The trader authorizes a withdrawal, and funds move back to their Polymarket wallet on Polygon.
