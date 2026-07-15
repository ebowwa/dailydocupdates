> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Limit Tiers

> Get the list of account limit tiers. Action and open-order fields are enforced per account; legacy request-rate fields are not used for gateway request enforcement.

<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/limit-tiers
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
  /v1/info/limit-tiers:
    get:
      summary: Get Limit Tiers
      description: >-
        Get the list of account limit tiers. Action and open-order fields are
        enforced per account; legacy request-rate fields are not used for
        gateway request enforcement.
      operationId: getLimitTiers
      responses:
        '200':
          description: Limit tiers response.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/LimitTier'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    LimitTier:
      type: object
      required:
        - min_volume_14d
        - rate_per_minute_limit
        - rate_burst_limit
        - actions_per_minute_limit
        - actions_burst_limit
        - open_orders_limit
        - messages_per_minute
      properties:
        min_volume_14d:
          $ref: '#/components/schemas/min_volume'
        rate_per_minute_limit:
          $ref: '#/components/schemas/rate_per_minute_limit'
        rate_burst_limit:
          $ref: '#/components/schemas/rate_burst_limit'
        actions_per_minute_limit:
          $ref: '#/components/schemas/actions_per_minute_limit'
        actions_burst_limit:
          $ref: '#/components/schemas/actions_burst_limit'
        open_orders_limit:
          $ref: '#/components/schemas/open_orders_limit'
        messages_per_minute:
          $ref: '#/components/schemas/messages_per_minute'
    min_volume:
      type: string
      description: Minimum volume threshold for this tier
      example: '0'
    rate_per_minute_limit:
      type: integer
      description: >-
        Maximum IP request weight per minute. In limit tiers, this is a legacy
        field and is not used for gateway enforcement.
      example: 1200
    rate_burst_limit:
      type: integer
      description: >-
        Legacy limit-tier request-rate field. It is not used for gateway
        enforcement.
    actions_per_minute_limit:
      type: integer
      description: Maximum order action tokens per account per minute
      example: 300
    actions_burst_limit:
      type: integer
      description: Additional account action allowance limit
    open_orders_limit:
      type: integer
      description: Maximum number of open orders per account
      example: 1000
    messages_per_minute:
      type: integer
      description: >-
        Display-only per-minute action/message allowance, equal to
        actions_per_minute_limit. Not separately configured or enforced.
      example: 300
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

````