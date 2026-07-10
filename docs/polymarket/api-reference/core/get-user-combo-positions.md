<!--
Source: https://docs.polymarket.com/api-reference/core/get-user-combo-positions.md
Downloaded: 2026-07-10T21:05:51.306Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get user combo positions

> Combinatorial (multi-market) positions held by a user, with per-leg breakdown. Also available at /v1/data/user/{address}/positions/combos (address from the path).



## OpenAPI

````yaml /api-spec/data-openapi.yaml get /v1/positions/combos
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
  /v1/positions/combos:
    get:
      tags:
        - Core
      summary: Get user combo positions
      description: >-
        Combinatorial (multi-market) positions held by a user, with per-leg
        breakdown. Also available at /v1/data/user/{address}/positions/combos
        (address from the path).
      parameters:
        - in: query
          name: user
          required: true
          schema:
            $ref: '#/components/schemas/Address'
        - in: query
          name: status
          schema:
            type: string
            enum:
              - OPEN
              - PARTIAL
              - RESOLVED_WIN
              - RESOLVED_LOSS
        - in: query
          name: sort
          schema:
            type: string
            enum:
              - current_value_desc
              - first_entry_desc
              - entry_cost_desc
              - resolved_at_desc
              - updated_asc
            default: current_value_desc
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
            for all of the user's combos.
        - in: query
          name: limit
          schema:
            type: integer
            default: 20
            minimum: 0
            maximum: 1000
        - in: query
          name: offset
          schema:
            type: integer
            default: 0
            minimum: 0
            maximum: 100000
        - in: query
          name: updatedAfter
          schema:
            type: integer
          description: >-
            Incremental-sync watermark (epoch seconds, inclusive): only rows
            whose updated_at is at or after this time. Positions mutate on
            resolution and redemption, so this catches changes a creation-time
            filter cannot. In sync mode
            (updatedAfter/updatedBefore/sort=updated_asc) every live row is
            returned regardless of balance, and the effective upper bound is
            clamped ~90s behind now (commit-visibility safety lag) — very recent
            rows appear on the next poll. Rows at the boundary may re-deliver:
            upsert by (combo_condition_id, combo_position_id).
        - in: query
          name: updatedBefore
          schema:
            type: integer
          description: >-
            Optional upper bound (epoch seconds, inclusive) for updated_at;
            clamped to the safety lag. Must be >= updatedAfter.
        - in: query
          name: cursor
          schema:
            type: string
          description: >-
            Opaque continuation token from a previous response's
            pagination.next_cursor. When present it supersedes offset (which is
            ignored). Invalid, tampered, or cross-endpoint tokens return 400.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CombosResponse'
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
    CombosResponse:
      type: object
      properties:
        combos:
          type: array
          items:
            $ref: '#/components/schemas/ComboPosition'
        pagination:
          $ref: '#/components/schemas/Pagination'
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
      required:
        - error
    ComboPosition:
      type: object
      properties:
        combo_condition_id:
          $ref: '#/components/schemas/ComboConditionId'
        combo_position_id:
          type: string
        module_id:
          type: integer
          description: 3 = Combinatorial
        user_address:
          $ref: '#/components/schemas/Address'
        shares_balance:
          type: string
          description: Decimal string (precision-preserving).
        entry_avg_price_usdc:
          type: string
        entry_cost_usdc:
          type: string
          description: >-
            REMAINING cost basis (entry_avg_price × shares_balance). Reads ~0
            after a winning combo is redeemed — use total_cost_usdc to display
            what was paid on closed positions.
        realized_payout_usdc:
          type: string
          description: >-
            Gross redemption proceeds (winning combo shares redeem 1:1 at $1).
            "0.00" while OPEN / unredeemed / RESOLVED_LOSS; accumulates under
            PARTIAL. Gross payout, not net PnL — net = realized_payout_usdc −
            total_cost_usdc.
        total_cost_usdc:
          type: string
          description: >-
            Original cost basis = entry_avg_price × (shares_balance +
            realized_payout). Survives redemption burning the shares; equals
            entry_cost_usdc while OPEN.
        status:
          type: string
          enum:
            - OPEN
            - PARTIAL
            - RESOLVED_WIN
            - RESOLVED_LOSS
        first_entry_at:
          type: string
          description: RFC3339 UTC
        resolved_at:
          type: string
          nullable: true
        updated_at:
          type: string
          description: >-
            Last-modified time (UTC, ISO 8601). Bumps on any recompute of the
            row (trade, redemption, resolution classification) — the
            incremental-sync watermark field. Omitted on responses served by the
            legacy backend.
        legs_total:
          type: integer
        legs_resolved:
          type: integer
        legs_pending:
          type: integer
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
          description: >-
            Opaque signed cursor for the next page; null when has_more is false.
            Pass it back verbatim as ?cursor= on the next request (keep the same
            sort where the endpoint has one). Never parse or construct it. On
            cursor-enabled endpoints this makes deep pagination O(page) and
            stable against concurrent inserts.
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
          enum:
            - OPEN
            - RESOLVED_WIN
            - RESOLVED_LOSS
          description: >-
            Live per-leg resolution state, derived from the leg market's
            on-chain payout vector. Markets resolved with a fractional payout
            (e.g. a 50/50 void) currently surface as OPEN with leg_resolved_at
            set.
        leg_resolved_at:
          type: string
          nullable: true
          description: >-
            RFC3339 UTC. Set once the leg's market resolves on-chain, including
            fractional resolutions that still report leg_status OPEN.
        leg_current_price:
          type: string
          description: >-
            Live price for the leg outcome (decimal string, 0–1). "0" when no
            price is available.
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