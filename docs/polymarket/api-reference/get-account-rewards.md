> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Account Rewards

> Get per-instrument daily liquidity reward shares for the authenticated account.
Reward periods run from 12:00 UTC to 12:00 UTC and are labeled by their UTC end date.
OI rewards pay 6% APR on the account's full daily average gross OI across all
instruments when the combined daily average gross OI of its rewards entity is
at least $1M. Accounts without an entity mapping qualify independently.
The first reward period starts at 2026-05-08 12:00 UTC. If no date range is provided,
the latest computed reward period is returned.


<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/rewards
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
  /v1/account/rewards:
    get:
      summary: Get Account Rewards
      description: >
        Get per-instrument daily liquidity reward shares for the authenticated
        account.

        Reward periods run from 12:00 UTC to 12:00 UTC and are labeled by their
        UTC end date.

        OI rewards pay 6% APR on the account's full daily average gross OI
        across all

        instruments when the combined daily average gross OI of its rewards
        entity is

        at least $1M. Accounts without an entity mapping qualify independently.

        The first reward period starts at 2026-05-08 12:00 UTC. If no date range
        is provided,

        the latest computed reward period is returned.
      operationId: getAccountRewards
      parameters:
        - name: date
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/date'
        - name: start_date
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/start_date'
        - name: end_date
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/end_date'
        - name: limit
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/limit'
      responses:
        '200':
          description: Account rewards response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AccountRewards'
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
    date:
      type: string
      description: UTC reward period end date in YYYY-MM-DD format
      example: '2026-05-10'
    start_date:
      type: string
      description: Inclusive UTC start date in YYYY-MM-DD format
      example: '2026-05-01'
    end_date:
      type: string
      description: Inclusive UTC end date in YYYY-MM-DD format
      example: '2026-05-10'
    limit:
      type: integer
      description: Maximum number of entries to return
      example: 100
    AccountRewards:
      type: object
      required:
        - data
        - more
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/AccountReward'
        more:
          $ref: '#/components/schemas/more'
    AccountReward:
      type: object
      required:
        - date
        - maker_share_7d
        - reward_distributed
        - breakdown
      properties:
        date:
          $ref: '#/components/schemas/date'
        maker_share_7d:
          $ref: '#/components/schemas/maker_share_7d'
        reward_distributed:
          $ref: '#/components/schemas/reward_distributed'
        breakdown:
          type: array
          items:
            $ref: '#/components/schemas/AccountRewardInstrument'
        oi_rewards:
          $ref: '#/components/schemas/AccountRewardOi'
    more:
      type: boolean
      description: More data available
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
    maker_share_7d:
      type: string
      description: Rolling 7-day account maker volume divided by total exchange volume
      example: '0.35'
    reward_distributed:
      type: boolean
      description: Whether rewards for this period have been marked as distributed
      example: true
    AccountRewardInstrument:
      type: object
      required:
        - instrument_id
        - reward_pool
        - reward_amount
      properties:
        instrument_id:
          $ref: '#/components/schemas/instrument_id'
        reward_pool:
          $ref: '#/components/schemas/reward_pool'
        reward_amount:
          $ref: '#/components/schemas/reward_amount'
    AccountRewardOi:
      type: object
      required:
        - account_oi
        - reward_amount
      properties:
        account_oi:
          $ref: '#/components/schemas/account_oi'
        reward_amount:
          $ref: '#/components/schemas/reward_amount'
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
    instrument_id:
      type: integer
      description: Instrument ID
    reward_pool:
      type: string
      description: Configured reward pool for the instrument
      example: '1000'
    reward_amount:
      type: string
      description: Reward amount attributed to this reward row
      example: '127.50344'
    account_oi:
      type: string
      description: >-
        Daily average gross open-interest notional for this account across all
        instruments
      example: '3200000'
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