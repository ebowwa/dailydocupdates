> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get combo markets

> Returns active markets that can be used as combo legs, ordered by volume
descending. This endpoint is public and does not require CLOB
authentication.

Entries in `position_ids`, `outcomes`, and `outcome_prices` correspond by
array index (`[0]` is YES, `[1]` is NO). Use `next_cursor` unchanged in
the next request; a value of `null` indicates the final page.




## OpenAPI

````yaml /api-spec/combos-rfq-openapi.yaml get /v1/rfq/combo-markets
openapi: 3.1.0
info:
  title: Polymarket Combinatorial RFQ API
  description: >
    REST API for the combinatorial RFQ (Request for Quote) system.


    This spec covers the publicly documented endpoints used by quoters (market

    makers): the combo-market catalog and the authenticated maker commands for

    submitting, cancelling, and confirming quotes.


    Conventions:

    - All `*_e6` fields are six-decimal fixed-point values encoded as
    **strings**
      to avoid number precision issues.
    - All timestamps are **Unix milliseconds** (integer); zero/omitted means
    unset.

    - Errors return an HTTP status code with a body of the form `{ "error":
    "..." }`.
  license:
    name: MIT
    identifier: MIT
  version: 1.0.0
servers:
  - url: https://combos-rfq-api.polymarket.com
    description: Production combinatorial RFQ API
security: []
tags:
  - name: Combo Markets
    description: Public catalog of markets that can be used as combo legs
  - name: Maker
    description: Authenticated quoter (maker) commands
paths:
  /v1/rfq/combo-markets:
    get:
      tags:
        - Combo Markets
      summary: Get combo markets
      description: >
        Returns active markets that can be used as combo legs, ordered by volume

        descending. This endpoint is public and does not require CLOB

        authentication.


        Entries in `position_ids`, `outcomes`, and `outcome_prices` correspond
        by

        array index (`[0]` is YES, `[1]` is NO). Use `next_cursor` unchanged in

        the next request; a value of `null` indicates the final page.
      operationId: getComboMarkets
      parameters:
        - name: limit
          in: query
          required: false
          description: Number of markets to return. Defaults to `50`; maximum `100`.
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 50
        - name: cursor
          in: query
          required: false
          description: Opaque cursor returned as `next_cursor` by the previous response.
          schema:
            type: string
        - name: exclude
          in: query
          required: false
          description: >-
            Comma-separated condition IDs to omit, such as markets already
            shown.
          schema:
            type: string
          example: 0x4cd7...110ff,0x0391ab0e...
      responses:
        '200':
          description: Catalog page of combo-able markets
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ComboMarketsResponse'
              example:
                markets:
                  - id: '1897034'
                    condition_id: 0x4cd7...110ff
                    position_ids:
                      - 1012585...362880
                      - 1012585...362881
                    slug: fifwc-mex-rsa-2026-06-11-mex
                    title: Will Mexico win on 2026-06-11?
                    outcomes:
                      - 'Yes'
                      - 'No'
                    outcome_prices:
                      - '0.685'
                      - '0.315'
                    image: https://...
                    volume: 330327.7128580074
                    tags:
                      - sports
                      - soccer
                      - games
                      - world-cup
                next_cursor: Mg
        '400':
          $ref: '#/components/responses/BadRequest'
      security: []
components:
  schemas:
    ComboMarketsResponse:
      type: object
      properties:
        markets:
          type: array
          items:
            $ref: '#/components/schemas/ComboMarket'
        next_cursor:
          type:
            - string
            - 'null'
          description: Cursor for the next page, or `null` on the final page.
      required:
        - markets
        - next_cursor
    ComboMarket:
      type: object
      properties:
        id:
          type: string
        condition_id:
          type: string
        position_ids:
          type: array
          description: Combo position IDs; `[0]` is YES, `[1]` is NO.
          items:
            type: string
        slug:
          type: string
        title:
          type: string
        outcomes:
          type: array
          items:
            type: string
        outcome_prices:
          type: array
          items:
            type: string
        image:
          type: string
        volume:
          type: number
          format: double
        tags:
          type: array
          items:
            type: string
      required:
        - id
        - condition_id
        - position_ids
        - slug
        - title
        - outcomes
        - outcome_prices
        - image
        - volume
        - tags
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
          description: Human-readable error detail
      required:
        - error
  responses:
    BadRequest:
      description: >-
        Invalid request (malformed JSON, invalid parameters, or failed
        validation)
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: invalid quote

````