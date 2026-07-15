> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Public Portfolio

> Get public portfolio for an address including equity and open positions.


<Badge color="gray" size="md">Request Weight: **5**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/portfolio
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
  /v1/info/portfolio:
    get:
      summary: Get Public Portfolio
      description: |
        Get public portfolio for an address including equity and open positions.
      operationId: getPublicPortfolio
      parameters:
        - name: address
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/address'
      responses:
        '200':
          description: Public portfolio response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicPortfolio'
        '400':
          $ref: '#/components/responses/Error400Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    address:
      type: string
      description: Address
      example: '0x1234567890abcdef1234567890abcdef12345678'
    PublicPortfolio:
      type: object
      required:
        - positions
        - equity
        - timestamp
      properties:
        positions:
          type: array
          items:
            $ref: '#/components/schemas/PublicPortfolioPosition'
        equity:
          $ref: '#/components/schemas/equity'
        timestamp:
          $ref: '#/components/schemas/update_timestamp'
    PublicPortfolioPosition:
      type: object
      required:
        - instrument_id
        - symbol
        - size
        - entry_price
        - unrealized_pnl
        - return_on_equity
      properties:
        instrument_id:
          $ref: '#/components/schemas/instrument_id'
        symbol:
          $ref: '#/components/schemas/symbol'
        size:
          $ref: '#/components/schemas/size'
        entry_price:
          $ref: '#/components/schemas/entry_price'
        unrealized_pnl:
          $ref: '#/components/schemas/unrealized_pnl'
        return_on_equity:
          $ref: '#/components/schemas/return_on_equity'
    equity:
      type: string
      description: Equity in USD
      example: '10000.00'
    update_timestamp:
      type: integer
      description: Update timestamp in milliseconds
      example: 1767225600000
    Error400:
      title: Error400
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
    instrument_id:
      type: integer
      description: Instrument ID
    symbol:
      type: string
      description: Instrument symbol
      example: NVDA-USDC
    size:
      type: string
      description: >-
        Signed position size in no. of contracts (positive = long, negative =
        short)
      example: '10.00'
    entry_price:
      type: string
      description: Average entry price
      example: '2986.30'
    unrealized_pnl:
      type: string
      description: Unrealized PnL in USD
      example: '-0.01'
    return_on_equity:
      type: string
      description: Return on equity as a decimal
      example: '-0.0027'
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
    Error400Response:
      description: |
        Bad request — the request was malformed or failed validation (bad query
        parameters, unparseable body, invalid signature, or a domain pre-check).
        The `error` field is a human-readable validation detail.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error400'
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