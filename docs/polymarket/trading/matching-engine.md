<!--
Source: https://docs.polymarket.com/trading/matching-engine.md
Downloaded: 2026-07-23T21:04:54.618Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Matching Engine Restarts

> Maintenance windows, restart handling, and post-restart post-only mode

The Polymarket matching engine undergoes restarts for maintenance and upgrades. This page covers how to detect and handle downtime, the post-restart post-only period, and where to get advance notice of changes.

***

## Announcements

Matching engine changes — planned restarts, updates, and maintenance windows — are announced **before they happen** in these channels:

<CardGroup cols={2}>
  <Card title="Telegram" icon="telegram" href="https://t.me/polytradingapis">
    Join the Polymarket Trading APIs channel for real-time announcements.
  </Card>

  <Card title="Discord" icon="discord" href="https://discord.com/channels/710897173927297116/1473553279421255803">
    Join the #trading-apis channel in the Polymarket Discord.
  </Card>
</CardGroup>

Announcements typically include **what's changing**, the **scheduled time**, and the **expected downtime window**. The goal is \~2 days notice when possible.

***

## Handling HTTP 425

During a restart window, the CLOB API returns **HTTP 425 (Too Early)** on all order-related endpoints. This tells your client that the matching engine is restarting and will be back shortly.

After every restart, the matching engine enters **post-only mode for 2 minutes**. During this period, cancels are accepted and new orders must use `postOnly: true`; non-post-only orders are rejected.

### Recommended Retry Strategy

<Steps>
  <Step title="Detect 425">
    When you receive an HTTP `425` response, the matching engine is restarting. Do not treat this as a permanent error.
  </Step>

  <Step title="Back off and retry">
    Wait and retry with exponential backoff. Start at 1–2 seconds and increase the
    interval on each retry.
  </Step>

  <Step title="Handle post-only mode">
    Once `425` responses stop, the engine is back online but remains in post-only mode for 2 minutes. During that period, only cancels and orders with `postOnly: true` are accepted.
  </Step>
</Steps>

### Code Examples

Retry an eligible post-only limit order when the matching engine returns `425`:

<Tabs>
  <Tab title="TypeScript">
    Given a `SecureClient`, call `placeLimitOrder()` again after
    each backoff interval:

    ```typescript TypeScript theme={null} theme={null}
    import { OrderSide, RequestRejectedError } from "@polymarket/client";

    async function placeWithRestartRetry() {
      const MAX_RETRIES = 10;
      let delay = 1000;

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          return await client.placeLimitOrder({
            tokenId: yesTokenId,
            side: OrderSide.BUY,
            price: "0.52",
            size: "10",
            postOnly: true,
          });
        } catch (error) {
          if (!(error instanceof RequestRejectedError) || error.status !== 425) {
            throw error;
          }

          await new Promise((r) => setTimeout(r, delay));
          delay = Math.min(delay * 2, 30000);
        }
      }

      throw new Error("Engine restart exceeded maximum retry attempts");
    }

    const response = await placeWithRestartRetry();
    ```
  </Tab>

  <Tab title="Python">
    Given an `AsyncSecureClient`, call `place_limit_order()` again
    after each backoff interval. The synchronous `SecureClient` raises the same
    error:

    ```python Python theme={null} theme={null}
    import asyncio

    from polymarket import RequestRejectedError


    async def place_with_restart_retry():
        max_retries = 10
        delay = 1

        for _ in range(max_retries):
            try:
                return await client.place_limit_order(
                    token_id=yes_token_id,
                    side="BUY",
                    price="0.52",
                    size="10",
                    post_only=True,
                )
            except RequestRejectedError as error:
                if error.status != 425:
                    raise

                await asyncio.sleep(delay)
                delay = min(delay * 2, 30)

        raise RuntimeError("Engine restart exceeded maximum retry attempts")


    response = await place_with_restart_retry()
    ```
  </Tab>
</Tabs>

***

## Restricted Trading Modes

During restricted trading modes, order placement behavior changes for `POST /order` and `POST /orders`. Cancel endpoints continue to accept cancels unless trading is fully disabled.

### Cancel-Only Mode

In cancel-only mode, new orders are rejected, but cancel requests are still accepted.

`POST /order` and `POST /orders` return `503`:

```json theme={null} theme={null}
{
  "error": "Trading is currently cancel-only. New orders are not accepted, but cancels are allowed."
}
```

### Post-Only Mode

After every restart, the matching engine enters post-only mode for **2 minutes**. Cancel requests are accepted and new orders must use `postOnly: true`. Non-post-only orders are rejected.

`POST /order` returns `503` with a retry delay in both the response body and the `Retry-After` HTTP header:

```json theme={null} theme={null}
{
  "error": "post-only mode: only post-only orders and cancels are allowed",
  "code": "post_only_mode",
  "retry_after_seconds": 79
}
```

`POST /orders` returns per-order errors for non-post-only orders in the batch:

```json theme={null} theme={null}
[
  {
    "errorMsg": "post-only mode: only post-only orders and cancels are allowed",
    "orderID": "",
    "takingAmount": "",
    "makingAmount": "",
    "status": "",
    "success": true
  },
  {
    "errorMsg": "post-only mode: only post-only orders and cancels are allowed",
    "orderID": "",
    "takingAmount": "",
    "makingAmount": "",
    "status": "",
    "success": true
  }
]
```

When you receive either restricted-mode response, do not retry the same non-post-only order unchanged. Cancel existing orders, retry after the indicated delay when one is provided, or resubmit eligible maker orders with `postOnly: true`.

***

## Best Practices

* **Subscribe to announcement channels** — get notified before restarts happen so you can prepare
* **Handle 425 gracefully** — treat it as a temporary condition, not an error; your retry logic should resume automatically
* **Handle 503 mode responses on order placement** — cancel-only and post-only responses require changing order flow, not blind retrying
* **Avoid aggressive retries** — the engine needs time to reload orderbooks; rapid-fire retries won't speed things up and may hit rate limits once the engine is back
* **Log restart events** — track when your client encounters 425s to correlate with announced maintenance windows
