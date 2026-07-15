> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Auto-Cancel Status

> Get the current auto-cancel dead-man-switch status for the authenticated
account, including the armed deadline, today's trigger count, and when
the daily counter resets.


<Badge color="gray" size="md">Request Weight: **1**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/auto-cancel
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
  /v1/account/auto-cancel:
    get:
      summary: Get Auto-Cancel Status
      description: |
        Get the current auto-cancel dead-man-switch status for the authenticated
        account, including the armed deadline, today's trigger count, and when
        the daily counter resets.
      operationId: getAutoCancel
      responses:
        '200':
          description: Auto-cancel status response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AutoCancelStatus'
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
    AutoCancelStatus:
      type: object
      required:
        - deadline
        - triggered
        - daily_limit
        - next_reset
      properties:
        deadline:
          $ref: '#/components/schemas/auto_cancel_deadline'
        triggered:
          $ref: '#/components/schemas/auto_cancel_triggered'
        daily_limit:
          $ref: '#/components/schemas/auto_cancel_daily_limit'
        next_reset:
          $ref: '#/components/schemas/auto_cancel_next_reset'
    auto_cancel_deadline:
      type: integer
      description: |
        Unix-ms deadline for the per-account auto-cancel dead-man-switch.
        Zero means no schedule is armed. When the deadline elapses, every
        open order on the account is cancelled and the schedule clears.
      example: 1767000045000
    auto_cancel_triggered:
      type: integer
      description: |
        Number of times auto-cancel has fired for this account during the
        current UTC day. Resets to zero at 00:00 UTC.
      example: 0
    auto_cancel_daily_limit:
      type: integer
      description: |
        Maximum number of auto-cancel triggers allowed per UTC day.
      example: 10
    auto_cancel_next_reset:
      type: integer
      description: |
        Unix-ms timestamp of the next UTC midnight when the daily trigger
        count resets to zero.
      example: 1767052800000
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