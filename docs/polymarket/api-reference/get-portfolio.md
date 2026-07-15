> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Portfolio

> Get current portfolio snapshot including open positions, margin summary, and withdrawable balance.


<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/portfolio
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
  /v1/account/portfolio:
    get:
      summary: Get Portfolio
      description: >
        Get current portfolio snapshot including open positions, margin summary,
        and withdrawable balance.
      operationId: getPortfolio
      responses:
        '200':
          description: Portfolio response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Portfolio'
        '400':
          $ref: '#/components/responses/Error400Response'
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
    Portfolio:
      type: object
      required:
        - positions
        - margin
        - withdrawable
        - in_liquidation
        - timestamp
      properties:
        positions:
          type: array
          items:
            $ref: '#/components/schemas/PortfolioPosition'
        margin:
          $ref: '#/components/schemas/MarginSummary'
        withdrawable:
          $ref: '#/components/schemas/withdrawable'
        in_liquidation:
          $ref: '#/components/schemas/in_liquidation'
        timestamp:
          $ref: '#/components/schemas/update_timestamp'
    PortfolioPosition:
      type: object
      required:
        - instrument_id
        - symbol
        - size
        - entry_price
        - leverage
        - cross
        - initial_margin
        - maintenance_margin
        - position_value
        - liquidation_price
        - unrealized_pnl
        - return_on_equity
        - cumulative_funding
      properties:
        instrument_id:
          $ref: '#/components/schemas/instrument_id'
        symbol:
          $ref: '#/components/schemas/symbol'
        size:
          $ref: '#/components/schemas/size'
        entry_price:
          $ref: '#/components/schemas/entry_price'
        leverage:
          $ref: '#/components/schemas/leverage'
        cross:
          $ref: '#/components/schemas/cross'
        initial_margin:
          $ref: '#/components/schemas/initial_margin'
        maintenance_margin:
          $ref: '#/components/schemas/maintenance_margin_amount'
        position_value:
          $ref: '#/components/schemas/position_value'
        liquidation_price:
          $ref: '#/components/schemas/liquidation_price'
        unrealized_pnl:
          $ref: '#/components/schemas/unrealized_pnl'
        return_on_equity:
          $ref: '#/components/schemas/return_on_equity'
        cumulative_funding:
          $ref: '#/components/schemas/cumulative_funding'
    MarginSummary:
      type: object
      required:
        - total_account_value
        - total_initial_margin
        - total_maintenance_margin
        - total_position_value
      properties:
        total_account_value:
          $ref: '#/components/schemas/total_account_value'
        total_initial_margin:
          $ref: '#/components/schemas/total_initial_margin'
        total_maintenance_margin:
          $ref: '#/components/schemas/total_maintenance_margin'
        total_position_value:
          $ref: '#/components/schemas/total_position_value'
    withdrawable:
      type: string
      description: Withdrawable balance in USD
      example: '13104.51'
    in_liquidation:
      type: boolean
      description: Whether the account is currently under liquidation
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
    leverage:
      type: integer
      description: Leverage
      example: 10
    cross:
      type: boolean
      description: Whether to use cross margin mode
    initial_margin:
      type: string
      description: Initial margin in USD
      example: '10.00'
    maintenance_margin_amount:
      type: string
      description: Maintenance margin amount
      example: '100.00'
    position_value:
      type: string
      description: Notional position value in USD
      example: '100.03'
    liquidation_price:
      type: string
      description: Liquidation price
      example: '2866.27'
    unrealized_pnl:
      type: string
      description: Unrealized PnL in USD
      example: '-0.01'
    return_on_equity:
      type: string
      description: Return on equity as a decimal
      example: '-0.0027'
    cumulative_funding:
      type: string
      description: Cumulative funding paid/received in USD
      example: '514.09'
    total_account_value:
      type: string
      description: Total account value in USD (equity + unrealized PnL)
      example: '13109.48'
    total_initial_margin:
      type: string
      description: Total initial margin in use across all positions
      example: '4.97'
    total_maintenance_margin:
      type: string
      description: Total maintenance margin across all positions
      example: '2.49'
    total_position_value:
      type: string
      description: Total notional position value in USD
      example: '100.03'
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