> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Fees

> Get the default fee schedule for each instrument type and category. Rates returned are the $0-tier defaults; the account's actual rate on each fill depends on its trailing 30-day volume tier.

<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/fees
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
  /v1/info/fees:
    get:
      summary: Get Fees
      description: >-
        Get the default fee schedule for each instrument type and category.
        Rates returned are the $0-tier defaults; the account's actual rate on
        each fill depends on its trailing 30-day volume tier.
      operationId: getInfoFees
      responses:
        '200':
          description: Fee schedule response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FeesInfo'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    FeesInfo:
      type: object
      required:
        - fee_schedule
      properties:
        fee_schedule:
          type: array
          items:
            $ref: '#/components/schemas/FeeScheduleEntry'
    FeeScheduleEntry:
      type: object
      required:
        - instrument_type
        - category
        - taker_fee_rate
        - maker_fee_rate
      properties:
        instrument_type:
          $ref: '#/components/schemas/instrument_type'
        category:
          $ref: '#/components/schemas/category'
        taker_fee_rate:
          $ref: '#/components/schemas/taker_fee_rate'
        maker_fee_rate:
          $ref: '#/components/schemas/maker_fee_rate'
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
    instrument_type:
      type: string
      description: Instrument type
      enum:
        - perpetual
    category:
      type: string
      description: Instrument category
      enum:
        - equity
        - commodity
        - index
        - crypto
    taker_fee_rate:
      type: string
      description: >-
        Default taker fee rate for the $0 volume tier. Actual rate scales down
        with the account's trailing 30-day volume tier.
      example: '0.0004'
    maker_fee_rate:
      type: string
      description: >-
        Default maker fee rate for the $0 volume tier. Positive at lower tiers,
        zero at the $500M tier, and a rebate (negative) at the top tier.
      example: '0.000125'
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