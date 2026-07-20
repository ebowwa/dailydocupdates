<!--
Source: https://docs.polymarket.com/perps/errors.md
Downloaded: 2026-07-20T21:12:08.364Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors

> Error messages returned by the API and the conditions that trigger them

The API returns descriptive error messages when a request is rejected. Below are
the errors you may encounter when placing or cancelling orders.

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

## Order Cancellation Errors

| Error                      | Condition                       |
| -------------------------- | ------------------------------- |
| `order_not_found`          | Order doesn't exist             |
| `order_not_pending_risk`   | Order is in the risk engine     |
| `order_not_pending_engine` | Order is in engine matching     |
| `order_not_in_orderbook`   | Order is not in the active book |
