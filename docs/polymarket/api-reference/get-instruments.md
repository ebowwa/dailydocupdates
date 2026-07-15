> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Instruments

> Get all instruments.

<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/instruments
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
  /v1/info/instruments:
    get:
      summary: Get Instruments
      description: Get all instruments.
      operationId: getInstruments
      parameters:
        - name: instrument_id
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/instrument_id'
        - name: instrument_type
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/instrument_type'
        - name: category
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/category'
      responses:
        '200':
          description: Instruments response.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Instrument'
        '400':
          $ref: '#/components/responses/Error400Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    instrument_id:
      type: integer
      description: Instrument ID
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
    Instrument:
      type: object
      required:
        - instrument_id
        - instrument_type
        - category
        - symbol
        - base_asset
        - quote_asset
        - funding_interval
        - quantity_decimals
        - price_decimals
        - price_bounds
        - liquidation_fee
        - max_order_count
        - min_notional
        - max_market_notional
        - max_limit_notional
        - max_leverage
        - risk_tiers
      properties:
        instrument_id:
          $ref: '#/components/schemas/instrument_id'
        instrument_type:
          $ref: '#/components/schemas/instrument_type'
        category:
          $ref: '#/components/schemas/category'
        symbol:
          $ref: '#/components/schemas/symbol'
        base_asset:
          $ref: '#/components/schemas/base_asset'
        quote_asset:
          $ref: '#/components/schemas/quote_asset'
        funding_interval:
          $ref: '#/components/schemas/funding_interval'
        quantity_decimals:
          $ref: '#/components/schemas/quantity_decimals'
        price_decimals:
          $ref: '#/components/schemas/price_decimals'
        price_bounds:
          $ref: '#/components/schemas/price_bounds'
        liquidation_fee:
          $ref: '#/components/schemas/liquidation_fee'
        max_order_count:
          $ref: '#/components/schemas/max_order_count'
        min_notional:
          $ref: '#/components/schemas/min_notional'
        max_market_notional:
          $ref: '#/components/schemas/max_market_notional'
        max_limit_notional:
          $ref: '#/components/schemas/max_limit_notional'
        max_leverage:
          $ref: '#/components/schemas/max_leverage'
        risk_tiers:
          type: array
          items:
            $ref: '#/components/schemas/RiskTier'
    symbol:
      type: string
      description: Instrument symbol
      example: NVDA-USDC
    base_asset:
      type: string
      description: Base asset name
      example: NVDA
    quote_asset:
      type: string
      description: Quote asset name
      example: USDC
    funding_interval:
      type: string
      description: Funding interval
      example: 1h
    quantity_decimals:
      type: integer
      description: Number of decimal places for quantity.
      example: 2
    price_decimals:
      type: integer
      description: >-
        Number of decimal places for price. Non-integer prices have a maximum of
        5 significant figures; integer prices are allowed regardless of
        significant figures.
      example: 2
    price_bounds:
      type: string
      description: Price bounds percentage
      example: '0.05'
    liquidation_fee:
      type: string
      description: Liquidation fee rate
      example: '0.025'
    max_order_count:
      type: integer
      description: Maximum open order count
      example: 200
    min_notional:
      type: string
      description: Minimum notional value in USD
      example: '1.00'
    max_market_notional:
      type: string
      description: Maximum market order notional value in USD
      example: '1000000.00'
    max_limit_notional:
      type: string
      description: Maximum limit order notional value in USD
      example: '10000000.00'
    max_leverage:
      type: integer
      description: Maximum leverage
      example: 20
    RiskTier:
      type: object
      required:
        - lower_bound
        - max_leverage
      properties:
        lower_bound:
          $ref: '#/components/schemas/lower_bound'
        max_leverage:
          $ref: '#/components/schemas/max_leverage'
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
    lower_bound:
      type: string
      description: Position size lower bound
      example: '0'
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