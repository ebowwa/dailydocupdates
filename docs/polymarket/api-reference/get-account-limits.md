> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Account Limits

> Get the authenticated account's effective rate-limit allowances for its current
volume-based tier: order-action rate, open-order cap, and the display-only
messages-per-minute figure. `open_orders` reflects the account's current live
open-order count; the rate-usage counters (`actions_per_minute`,
`actions_burst`, and `reset`) are not tracked here and are reported as 0.


<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/limits
openapi: 3.0.3
info:
  title: Polymarket Perps HTTP API
  version: 1.0.0
  description: HTTP API for Polymarket perpetual trading system.
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.perpetuals.polymarket.com
    description: Production Perps HTTP API
security: []
paths:
  /v1/account/limits:
    get:
      summary: Get Account Limits
      description: >
        Get the authenticated account's effective rate-limit allowances for its
        current

        volume-based tier: order-action rate, open-order cap, and the
        display-only

        messages-per-minute figure. `open_orders` reflects the account's current
        live

        open-order count; the rate-usage counters (`actions_per_minute`,

        `actions_burst`, and `reset`) are not tracked here and are reported as
        0.
      operationId: getAccountLimits
      responses:
        '200':
          description: Account limits response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AccountLimits'
        '401':
          $ref: '#/components/responses/Error401Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security:
        - polymarket_proxy: []
          polymarket_secret: []
components:
  schemas:
    AccountLimits:
      type: object
      required:
        - actions_per_minute
        - actions_per_minute_limit
        - actions_burst
        - actions_burst_limit
        - open_orders
        - open_orders_limit
        - reset
        - messages_per_minute
      properties:
        actions_per_minute:
          $ref: '#/components/schemas/actions_per_minute'
        actions_per_minute_limit:
          $ref: '#/components/schemas/actions_per_minute_limit'
        actions_burst:
          $ref: '#/components/schemas/actions_burst'
        actions_burst_limit:
          $ref: '#/components/schemas/actions_burst_limit'
        open_orders:
          $ref: '#/components/schemas/open_orders'
        open_orders_limit:
          $ref: '#/components/schemas/open_orders_limit'
        reset:
          $ref: '#/components/schemas/rate_reset'
        messages_per_minute:
          $ref: '#/components/schemas/messages_per_minute'
    actions_per_minute:
      type: integer
      description: Order action tokens used by the account in the current minute
      example: 23
    actions_per_minute_limit:
      type: integer
      description: Maximum order action tokens per account per minute
      example: 300
    actions_burst:
      type: integer
      description: Additional account action allowance remaining
    actions_burst_limit:
      type: integer
      description: Additional account action allowance limit
    open_orders:
      type: integer
      description: Current number of open orders
      example: 42
    open_orders_limit:
      type: integer
      description: Maximum number of open orders per account
      example: 1000
    rate_reset:
      type: integer
      description: Timestamp in milliseconds when the current interval resets
      example: 1767225660000
    messages_per_minute:
      type: integer
      description: >-
        Display-only per-minute action/message allowance, equal to
        actions_per_minute_limit. Not separately configured or enforced.
      example: 300
    Error401:
      title: Error401
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error429:
      title: Error429
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error500:
      title: Error500
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    error:
      type: string
      description: >-
        Error identifier. For domain rejections and transport errors
        (`401`/`404`/`429`/`500`) this is a stable, machine-readable snake_case
        identifier that is part of the API contract and safe to branch on, e.g.
        `insufficient_margin`, `insufficient_balance`, `order_not_found`,
        `reduce_only_invalid`, `unauthorized`, `not_found`. For `400` it is a
        human-readable validation detail whose wording may change. See the Error
        handling guide for the domain identifiers. (Post-only / Fill-or-Kill
        outcomes are order statuses such as `post_only_rejected`, not
        rejections.)
      example: insufficient_margin
  responses:
    Error401Response:
      description: >
        Unauthorized — missing or invalid `POLYMARKET-PROXY` /
        `POLYMARKET-SECRET`

        credentials. `error` is `unauthorized`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error401'
    Error429Response:
      description: >
        Too Many Requests. `error` distinguishes the limit that was hit:

        `ip_rate_limited` (per-IP token bucket), `action_rate_limited`
        (per-account

        action rate), or `open_orders_limit` (resting open-order cap).
      headers:
        Retry-After:
          description: >
            Whole seconds to wait before retrying. Present only on token-bucket

            rate-limit rejections (`ip_rate_limited` and `action_rate_limited`);
            a

            conservative estimate of when enough capacity will have refilled to

            admit the request. Absent on `open_orders_limit`, which is a
            capacity

            limit, not a rate limit — waiting does not free order slots; cancel

            resting orders or wait for fills instead.
          schema:
            type: integer
            example: 2
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error429'
    Error500Response:
      description: |
        Internal server error. `error` is `internal_error`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error500'
  securitySchemes:
    polymarket_proxy:
      type: apiKey
      name: POLYMARKET-PROXY
      in: header
      description: Proxy address
    polymarket_secret:
      type: apiKey
      name: POLYMARKET-SECRET
      in: header
      description: Correponding proxy secret

````