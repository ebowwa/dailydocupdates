> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Account Stats

> Get the authenticated account's 7-day trading stats (taker volume, maker volume,
account maker share, and entity maker share when applicable).
Stats are cached by UTC day and may be stale by up to 24 hours.


<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/stats
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
  /v1/account/stats:
    get:
      summary: Get Account Stats
      description: >
        Get the authenticated account's 7-day trading stats (taker volume, maker
        volume,

        account maker share, and entity maker share when applicable).

        Stats are cached by UTC day and may be stale by up to 24 hours.
      operationId: getAccountStats
      responses:
        '200':
          description: Account stats response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AccountStats'
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
    AccountStats:
      type: object
      required:
        - volume_7d
        - taker_volume_7d
        - maker_volume_7d
        - account_maker_share_7d
      properties:
        volume_7d:
          $ref: '#/components/schemas/volume_7d'
        taker_volume_7d:
          $ref: '#/components/schemas/taker_volume_7d'
        maker_volume_7d:
          $ref: '#/components/schemas/maker_volume_7d'
        account_maker_share_7d:
          $ref: '#/components/schemas/account_maker_share_7d'
        entity_maker_share_7d:
          $ref: '#/components/schemas/entity_maker_share_7d'
        entity_id:
          $ref: '#/components/schemas/entity_id'
        entity_name:
          $ref: '#/components/schemas/entity_name'
    volume_7d:
      type: string
      description: Rolling 7-day perpetual trading volume in USD
      example: '5000000'
    taker_volume_7d:
      type: string
      description: Rolling 7-day perpetual taker volume in USD
      example: '3500000'
    maker_volume_7d:
      type: string
      description: Rolling 7-day perpetual maker volume in USD
      example: '1500000'
    account_maker_share_7d:
      type: string
      description: Rolling 7-day account maker volume divided by total exchange volume
      example: '0.35'
    entity_maker_share_7d:
      type: string
      description: Rolling 7-day entity maker volume divided by total exchange volume
      example: '0.35'
    entity_id:
      type: integer
      description: Liquidity rewards entity ID
      example: 42
    entity_name:
      type: string
      description: Liquidity rewards entity name
      example: desk
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