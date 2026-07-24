<!--
Source: https://docs.polymarket.com/api-reference/trading-rate-limits.md
Downloaded: 2026-07-24T21:04:03.604Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CLOB Trading Rate Limits

> Per-signer token-bucket limits for CLOB order and cancellation requests

Polymarket evaluates CLOB order and cancellation requests against separate token
buckets for each signer address. The signer address is the address associated
with your CLOB API credentials. Activity in one bucket does not consume capacity
from the other.

<Warning>
  Beginning July 24, 2026, the limiter will run in warning mode for two weeks.
  Requests will continue to be processed during this period. A request that
  would be rejected after live enforcement begins will include
  `Poly-RateLimit-Warning: true`. Monitor this header and adjust your request
  patterns before live enforcement begins. Polymarket will announce when live
  enforcement begins.
</Warning>

<Note>
  These per-signer limits are separate from the existing [Cloudflare IP-based
  limits](/api-reference/rate-limits), which remain unchanged.
</Note>

## How Rate Limits Work

Each signer has an order bucket and a cancel bucket:

| Bucket | Request                        | Token Cost                                    |
| ------ | ------------------------------ | --------------------------------------------- |
| Order  | `POST /order`                  | 1                                             |
| Order  | `POST /orders`                 | Number of orders in a non-empty batch         |
| Cancel | `DELETE /order`                | 1                                             |
| Cancel | `DELETE /orders`               | Number of submitted order IDs                 |
| Cancel | `DELETE /cancel-all`           | 1 plus the number of orders canceled          |
| Cancel | `DELETE /cancel-market-orders` | 1 plus the number of matching orders canceled |

### Refill and Burst Capacity

Tokens refill continuously at the rate assigned to the current tier. Burst
capacity is the maximum number of tokens a bucket can hold. A full bucket can
spend up to that capacity immediately; after the burst is consumed, new tokens
become available at the refill rate.

Calculate the duration of a full burst as:

```text theme={null}
burst_seconds = burst / rate_per_sec
```

### Batch Requests

Under live enforcement, a batch is admitted only when the bucket contains
enough tokens for every entry. Otherwise, the entire request is rejected and no
entries are processed. This all-or-nothing rule applies to the rate-limit check;
an admitted batch retains its normal per-order response behavior.

A batch whose token cost exceeds the tier's burst capacity can never be admitted
as one request. Split it into smaller batches.

### Cancel All and Cancel Market Orders

The number of orders that will be canceled is not known when
`DELETE /cancel-all` or `DELETE /cancel-market-orders` begins. Each request
first consumes one cancel token. After the cancellation result is known, the
bucket is debited one additional token for every order successfully canceled.

For tiers that allow a negative cancel balance, this second debit can put the
bucket into debt. Future cancel requests remain blocked until the bucket has
enough tokens for the next request. Other tiers floor the post-cancel balance at
zero regardless of debit size.

## Volume Tiers

Buckets are scoped to the signer address. Tier eligibility follows the
cumulative trading volume of the maker wallet, even when it differs from the
signer address. The volume window is currently 30 days, and tier assignments
refresh every three hours.

| Tier     | 30-Day Volume | Order Rate (tokens/s) | Order Burst (tokens) | Cancel Rate (tokens/s) | Cancel Burst (tokens) | Negative Cancel Balance |
| -------- | ------------: | --------------------: | -------------------: | ---------------------: | --------------------: | :---------------------: |
| Standard |             — |                    40 |                   60 |                     80 |                   120 |           Yes           |
| Copper   |     \$30,000+ |                    60 |                   90 |                    120 |                   180 |           Yes           |
| Bronze   |     \$50,000+ |                    80 |                  120 |                    160 |                   240 |           Yes           |
| Silver   |    \$100,000+ |                   200 |                  300 |                    400 |                   600 |           Yes           |
| Gold     |    \$500,000+ |                   400 |                  600 |                    800 |                 1,200 |           Yes           |
| Platinum |       \$2.5M+ |                   450 |                  675 |                    900 |                 1,350 |            No           |
| Diamond  |         \$5M+ |                   525 |                  787 |                  1,050 |                 1,575 |            No           |
| Elite    |        \$10M+ |                   600 |                  900 |                  1,200 |                 1,800 |            No           |

Tier thresholds, the volume window, and rate limits may change as the system is
tuned. Polymarket will provide advance notice of significant changes.

## Response Headers

Responses include the following headers when the limiter successfully evaluates
a covered request:

| Header                     | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| `Poly-RateLimit-Remaining` | Current token balance for the applicable bucket after rate-limit accounting |
| `Poly-RateLimit-Reset`     | Unix timestamp when the current rate-limit wait period ends                 |
| `Poly-RateLimit-Tier`      | Rate-limit tier applied to the request                                      |

The following headers appear only in specific cases:

| Header                   | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `Retry-After`            | Retry delay in seconds; included on `429` responses                          |
| `Poly-RateLimit-Warning` | `true` in warning mode when live enforcement would have rejected the request |

`Poly-RateLimit-Reset` is not the time when the bucket will be completely full.
On a `429` response for a request whose token cost fits within burst capacity,
it indicates when enough tokens are expected for the attempted request. On an
admitted request, it may be the current timestamp.

`Poly-RateLimit-Remaining` can be negative after `DELETE /cancel-all` or
`DELETE /cancel-market-orders` for tiers that allow a negative cancel balance.
Before sending a large batch, compare its token cost with the remaining balance.

## Handle 429 Responses

After live enforcement begins, a request that requires more tokens than the
applicable bucket contains returns `429 Too Many Requests`.

For a request whose token cost is within the tier's burst capacity,
`Retry-After` gives the minimum delay before retrying. You do not need to wait
for the bucket to refill completely. If the request costs more than the burst
capacity, split it into smaller requests instead of retrying it unchanged.

## Get Help

Contact [support@polymarket.com](mailto:support@polymarket.com) if you have
questions about your tier, believe your wallet qualifies for a higher tier,
recently moved trading activity to a new address, or believe you are being
limited incorrectly.
