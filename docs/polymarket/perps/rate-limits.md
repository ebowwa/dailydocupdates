> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limits

> IP rate limits, action rate limits, and WebSocket limits for Perps integrations

Perps uses separate rate-limit buckets for different traffic types. Hitting one
bucket does not consume another bucket, so request volume, account trading
actions, and WebSocket traffic should be monitored separately.

## How Limits Work

Use the error type to identify which bucket rejected the request or message.

| Bucket                 | Scope          | Applies To                         | Error                                                                 |
| ---------------------- | -------------- | ---------------------------------- | --------------------------------------------------------------------- |
| IP                     | IP address     | HTTP request volume                | HTTP `429` or `ip_rate_limited`                                       |
| Action                 | Perps account  | Order placement and trade actions  | `action_rate_limited`                                                 |
| WebSocket message      | IP address     | Inbound WebSocket messages         | `message_rate_limited`                                                |
| WebSocket subscription | WebSocket link | Active subscriptions on one socket | Per-channel subscription error when the subscription cap is exhausted |

## IP Rate Limits

Every IP address gets **1,000 weighted tokens per minute**. Each HTTP request
consumes tokens equal to its request weight.

Use scoped requests when possible. Broad, unfiltered reads consume more of the IP
budget than narrow reads.

| Request Pattern                | Weight                                        |
| ------------------------------ | --------------------------------------------- |
| Lightweight reads              | 1                                             |
| Broad unfiltered reads         | Up to 20                                      |
| Order book depth 10            | 2                                             |
| Order book depth 100           | 5                                             |
| Order book depth 500           | 10                                            |
| Order book depth 1000          | 20                                            |
| Batch order actions            | `1 + floor(n / 20)`, where `n` is order count |
| Account orders by ID           | 1                                             |
| Account orders without ID      | 10                                            |
| Open orders by instrument      | 1                                             |
| Open orders without instrument | 20                                            |

## Action Rate Limits

Every account has an action budget from its current limit tier. The default tier
is **5,000 action tokens per minute** with an open-order cap of **1,000**.

Action limits are account-scoped, not IP-scoped. Batching can reduce IP weight,
but it does not reduce the number of order actions consumed.

| Action              | Action Cost                 |
| ------------------- | --------------------------- |
| Place one order     | 1 token                     |
| Place 10 orders     | 10 tokens                   |
| Auto-cancel request | 10 tokens                   |
| Open-order count    | Limited by account tier cap |

Legacy request-rate fields on limit-tier responses are not used for request-rate
enforcement. Use the IP bucket for request volume and the action bucket for
account trading activity.

## WebSocket Limits

WebSocket connections have separate limits for connection count, active
subscriptions, and inbound messages.

| Limit                  | Scope      | Value                              |
| ---------------------- | ---------- | ---------------------------------- |
| Concurrent connections | IP address | 50 WebSocket connections           |
| Active subscriptions   | Connection | 100 active subscriptions           |
| Inbound messages       | IP address | 1,000 messages per minute          |
| Subscribe message      | Message    | 1 message token                    |
| Unsubscribe message    | Message    | 1 message token                    |
| Trade post message     | Message    | Same batch-size weighting as trade |
| Other post messages    | Message    | 1 message token                    |

## Integration Guidance

* Scope reads whenever possible. For example, request one instrument's open orders instead of all open orders.
* Batch order placement when it reduces request volume, but do not expect batching to reduce action-token usage.
* Treat `429`, `ip_rate_limited`, `action_rate_limited`, and `message_rate_limited` as retryable after backoff.
* Track active WebSocket subscriptions per connection so reconnects do not accidentally exceed the subscription cap.
* If you operate many users behind shared infrastructure, monitor IP usage separately from account action usage.
