> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors

> Error messages returned by the API and the conditions that trigger them

The API returns descriptive error messages when a request is rejected. Use the
HTTP status and response body to decide whether to retry or correct the request.

## Service Unavailable

The gateway returns `503 Service Unavailable` when it deliberately sheds a
request it cannot serve safely. This can happen when database read capacity is
exhausted, a response cache is stale or unprimed, or a bounded deferred-write
queue is full. It is temporary overload protection, not a gateway crash.

```json theme={null}
{
  "status": "err",
  "error": "service_unavailable"
}
```

Retry with client-side backoff. By contrast, `500 Internal Server Error` with
`internal_error` means the gateway encountered an unexpected error.

## Transient Overload (`503`)

Any endpoint can answer `503` with `error: service_unavailable` when the
serving replica sheds load at its in-flight request cap. The rejection happens
before the request is parsed or dispatched, so it says nothing about the
request itself:

* The response carries a `Retry-After` header (whole seconds). Honor it and
  retry — the condition is transient by design.
* Batch endpoints keep their one-element array envelope, exactly like other
  whole-request rejections; parse it as applying to the whole batch.

## Order Placement Errors

| Error                                          | Condition                                          |
| ---------------------------------------------- | -------------------------------------------------- |
| `invalid signature`                            | EIP-712 signature verification or timestamp failed |
| `signature expired`                            | Signature older than 5 minutes                     |
| `account not found for proxy`                  | Signer proxy not linked to any account             |
| `no orders provided`                           | Empty order array                                  |
| `FOK orders cannot be post-only`               | FOK + `post_only=true`                             |
| `IOC orders cannot be post-only`               | IOC + `post_only=true`                             |
| `GTC orders require a price`                   | GTC without price                                  |
| `price cannot be zero`                         | Price = 0                                          |
| `client order id cannot be all zeros`          | Client order ID is all zeros                       |
| `price exceeds allowed decimal places`         | Too many decimal places in price                   |
| `price exceeds allowed significant figures`    | More than 5 significant figures in price           |
| `quantity must be positive`                    | Quantity is zero or negative                       |
| `quantity exceeds allowed decimal places`      | Too many decimal places in quantity                |
| `quantity exceeds allowed significant figures` | More than 5 significant figures in quantity        |
| `command expired`                              | `exp_ms` is in the past                            |
| `command expiry too far in future`             | `exp_ms` is more than 5 seconds from now           |

## Modify Order Errors

Modify Order returns one result per requested order. A rejected modification
does not change the live order, although a separately processed fill or
cancellation can still change its state.

| Error                              | Condition                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| `modify_already_pending`           | Another modification for the same order is still in progress.                              |
| `modify_no_op`                     | The requested price and total quantity equal the live order values.                        |
| `modify_limit_reached`             | The order has already reached 10,000 successful modifications.                             |
| `modify_would_cross`               | The modified order would lock or cross the live opposite best price.                       |
| `duplicate_order_in_batch`         | An earlier item in the same batch resolved to the same order ID.                           |
| `order_not_modifiable`             | The order is not an eligible standalone resting GTC limit order.                           |
| `order_has_tpsl`                   | The order is a TP/SL leg or has attached or order-scoped TP/SL.                            |
| `modify_quantity_not_above_filled` | The requested new total quantity is less than or equal to the live cumulative fill.        |
| `order_unknown`                    | The client order ID does not resolve to an order owned by the account.                     |
| `order_not_in_orderbook`           | The order ID is unknown, terminal, owned by another account, or otherwise not disclosable. |
| `order_in_flight`                  | The order is still in creation or taker delay and is not yet resting.                      |
| `invalid_command`                  | A per-item price, quantity, or notional validation failed before sequencing.               |

Shared account, instrument, margin, position, reduce-only, and rate-limit errors
can also reject a modification under the same conditions as a new order.

## Order Cancellation Errors

| Error                      | Condition                       |
| -------------------------- | ------------------------------- |
| `order_not_found`          | Order doesn't exist             |
| `order_not_pending_risk`   | Order is in the risk engine     |
| `order_not_pending_engine` | Order is in engine matching     |
| `order_not_in_orderbook`   | Order is not in the active book |

## Auto-Cancel Errors

Returned when arming the auto-cancel switch with `PATCH /v1/trade/auto-cancel`.
Disarming skips these checks and is always allowed. A deadline already in the
past is rejected earlier with a plain `400` message.

| Error                             | Condition                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `auto_cancel_deadline_too_soon`   | Deadline is less than 5 seconds in the future                                  |
| `auto_cancel_daily_limit_reached` | Account already triggered auto-cancel the maximum number of times this UTC day |
| `auto_cancel_in_flight`           | A previous trigger is still cancelling the account's open orders               |

`auto_cancel_in_flight` is transient. Arming succeeds once the engine finishes
the earlier cancellation.

## Isolated Margin Adjustment Errors

These stable identifiers are returned when an isolated margin adjustment is
rejected after sequencing.

Gateway signature validation can reject a stale or future-skewed timestamp
earlier as `invalid signature`; that request never reaches sequencing.

| Error                                | Condition                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `position_not_found`                 | The target open position does not exist                                     |
| `invalid_margin_mode`                | The target position is not using isolated margin                            |
| `invalid_margin_amount`              | The amount is zero, over-precise, or cannot be represented safely           |
| `insufficient_margin`                | An addition exceeds available, unreserved collateral                        |
| `account_liquidating`                | Cross liquidation is active, or the target isolated position is liquidating |
| `margin_below_required_initial`      | A removal would leave position equity below current required initial margin |
| `invalid_margin_signature_timestamp` | Sequencer found the timestamp over five minutes old or one minute ahead     |
| `signature_already_used`             | The exact signed margin request has already been ingested                   |
