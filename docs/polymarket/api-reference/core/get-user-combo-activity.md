> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get user combo activity

> Combo lifecycle and redeem events (split / merge / convert / compress / wrap / unwrap / redeem) for a user, with per-leg breakdown. The combo counterpart to /activity trade rows. Also available at /v1/data/user/{address}/activity/combos (address from the path).



## OpenAPI

````yaml /api-spec/data-openapi.yaml get /v1/activity/combos
openapi: 3.0.3
info:
  title: Polymarket Data API
  version: 1.0.0
  description: >
    HTTP API for Polymarket data. This specification documents all public
    routes.
servers:
  - url: https://data-api.polymarket.com
    description: Relative server (same host)
security: []
tags:
  - name: Data API Status
    description: Data API health check
  - name: Core
  - name: Builders
  - name: Misc
paths:
  /v1/activity/combos:
    get:
      tags:
        - Core
      summary: Get user combo activity
      description: >-
        Combo lifecycle and redeem events (split / merge / convert / compress /
        wrap / unwrap / redeem) for a user, with per-leg breakdown. The combo
        counterpart to /activity trade rows. Also available at
        /v1/data/user/{address}/activity/combos (address from the path).
      parameters:
        - in: query
          name: user
          required: true
          schema:
            $ref: '#/components/schemas/Address'
        - in: query
          name: market_id
          style: form
          explode: false
          schema:
            type: array
            items:
              $ref: '#/components/schemas/ComboConditionId'
          description: >-
            Comma-separated combo_condition_id values to filter to specific
            combos. These equal the market_id of isCombo rows on /activity. Omit
            for all of the user's combo activity.
        - in: query
          name: limit
          schema:
            type: integer
            default: 50
            minimum: 0
            maximum: 500
        - in: query
          name: offset
          schema:
            type: integer
            default: 0
            minimum: 0
            maximum: 10000
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CombosActivityResponse'
        '400':
          description: Bad Request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    Address:
      type: string
      description: User Profile Address (0x-prefixed, 40 hex chars)
      pattern: ^0x[a-fA-F0-9]{40}$
      example: '0x56687bf447db6ffa42ffe2204a05edaa20f55839'
    ComboConditionId:
      type: string
      description: >-
        Combo condition ID (0x-prefixed, 62 hex chars / bytes31). Equals the
        market_id (unified) / conditionId (legacy) of isCombo rows on /activity.
      pattern: ^0x[a-fA-F0-9]{62}$
      example: '0x0391ab0ebea17b65ba87e071b0566e816b0000000000000000000000000000'
    CombosActivityResponse:
      type: object
      properties:
        activity:
          type: array
          items:
            $ref: '#/components/schemas/ComboActivity'
        pagination:
          $ref: '#/components/schemas/Pagination'
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
      required:
        - error
    ComboActivity:
      type: object
      properties:
        id:
          type: string
        event_kind:
          type: string
          description: >-
            Raw on-chain event, e.g. PositionsSplit, PositionsMerged,
            PositionRedeemed.
        side:
          type: string
          description: Normalized label for rendering.
          enum:
            - Split
            - Merge
            - Convert
            - Compress
            - Wrap
            - Unwrap
            - Redeem
        module_kind:
          type: string
          description: Always Combinatorial.
        user_address:
          $ref: '#/components/schemas/Address'
        combo_condition_id:
          $ref: '#/components/schemas/ComboConditionId'
        combo_position_id:
          type: string
        module_id:
          type: integer
        amount_usdc:
          type: number
          nullable: true
          description: Lifecycle amount; null on redeems.
        payout_usdc:
          type: number
          nullable: true
          description: Redeem payout; null on lifecycle events.
        timestamp:
          type: integer
          format: int64
        tx_dttm:
          type: string
          description: RFC3339 UTC
        tx_hash:
          type: string
        log_index:
          type: integer
        block_number:
          type: integer
          format: int64
        legs:
          type: array
          items:
            $ref: '#/components/schemas/ComboLeg'
    Pagination:
      type: object
      description: >-
        Standard pagination metadata. No total count; has_more is derived from
        page fullness. next_cursor is opaque.
      properties:
        limit:
          type: integer
        offset:
          type: integer
        has_more:
          type: boolean
        next_cursor:
          type: string
          nullable: true
          description: Opaque cursor for the next page; null when has_more is false.
    ComboLeg:
      type: object
      properties:
        leg_index:
          type: integer
        leg_position_id:
          type: string
        leg_condition_id:
          type: string
          description: The leg market's condition ID (distinct from the combo's).
        leg_outcome_index:
          type: integer
        leg_outcome_label:
          type: string
        leg_status:
          type: string
          description: Placeholder (OPEN) until leg-resolution integration ships.
        leg_resolved_at:
          type: string
          nullable: true
        leg_current_price:
          type: string
          description: Placeholder ("0") until live-price integration ships.
        market:
          $ref: '#/components/schemas/ComboMarket'
    ComboMarket:
      type: object
      properties:
        market_id:
          type: string
        slug:
          type: string
        title:
          type: string
        outcome:
          type: string
        image_url:
          type: string
        icon_url:
          type: string
        category:
          type: string
        subcategory:
          type: string
        tags:
          type: array
          items:
            type: string
        end_date:
          type: string
          description: RFC3339 UTC
        event:
          $ref: '#/components/schemas/ComboEvent'
    ComboEvent:
      type: object
      properties:
        event_id:
          type: string
        event_slug:
          type: string
        event_title:
          type: string
        event_image:
          type: string

````