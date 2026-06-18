> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel a quote

> Cancel an active maker quote before it is selected. Requires CLOB L2
authentication for the maker role. `signer_address` and `maker_address`
must match the authenticated identity.




## OpenAPI

````yaml /api-spec/combos-rfq-openapi.yaml post /v1/maker/quotes/cancel
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
  /v1/maker/quotes/cancel:
    post:
      tags:
        - Maker
      summary: Cancel a quote
      description: |
        Cancel an active maker quote before it is selected. Requires CLOB L2
        authentication for the maker role. `signer_address` and `maker_address`
        must match the authenticated identity.
      operationId: cancelMakerQuote
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CancelQuoteRequest'
            example:
              rfq_id: rfq_<id>
              quote_id: quote_<id>
              signer_address: 0xYourSigner
              maker_address: 0xYourQuoterWallet
              signature_type: 0
      responses:
        '200':
          description: Current RFQ snapshot after the cancellation was applied
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RFQSnapshot'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
        '409':
          $ref: '#/components/responses/Conflict'
        '429':
          $ref: '#/components/responses/TooManyRequests'
        '503':
          $ref: '#/components/responses/ServiceUnavailable'
      security:
        - polyApiKey: []
          polyAddress: []
          polySignature: []
          polyPassphrase: []
          polyTimestamp: []
components:
  schemas:
    CancelQuoteRequest:
      type: object
      properties:
        rfq_id:
          type: string
          example: rfq_<id>
        quote_id:
          type: string
          example: quote_<id>
        signer_address:
          type: string
          description: Must match the authenticated `signer_address`.
          example: 0xYourSigner
        maker_address:
          type: string
          description: Must match the authenticated `maker_address`.
          example: 0xYourQuoterWallet
        signature_type:
          $ref: '#/components/schemas/SignatureType'
      required:
        - rfq_id
        - quote_id
        - signer_address
        - maker_address
        - signature_type
    RFQSnapshot:
      type: object
      description: Point-in-time view of an RFQ and its competition/confirmation windows.
      properties:
        request:
          $ref: '#/components/schemas/RFQRequest'
        status:
          $ref: '#/components/schemas/RFQStatus'
        competition_started_at:
          type: integer
          format: int64
          description: Unix milliseconds.
        competition_ends_at:
          type: integer
          format: int64
          description: Unix milliseconds.
        confirmation_started_at:
          type: integer
          format: int64
          description: Unix milliseconds.
        confirmation_ends_at:
          type: integer
          format: int64
          description: Unix milliseconds.
        quote_id:
          type: string
        bundle:
          $ref: '#/components/schemas/FillBundle'
        maker_confirmations:
          type: array
          items:
            $ref: '#/components/schemas/MakerConfirmationSnapshot'
      required:
        - request
        - status
    SignatureType:
      type: integer
      description: |
        CLOB signature type:
        - `0` EOA
        - `1` POLY_PROXY
        - `2` GNOSIS_SAFE
        - `3` POLY_1271
      enum:
        - 0
        - 1
        - 2
        - 3
      example: 0
    RFQRequest:
      type: object
      description: The RFQ request as stored by the engine.
      properties:
        rfq_id:
          type: string
        auth_address:
          type: string
        signer_address:
          type: string
        maker_address:
          type: string
        signature_type:
          $ref: '#/components/schemas/SignatureType'
        requestor_public_id:
          type: string
        leg_position_ids:
          type: array
          items:
            type: string
        condition_id:
          type: string
        yes_position_id:
          type: string
        no_position_id:
          type: string
        direction:
          $ref: '#/components/schemas/Direction'
        side:
          $ref: '#/components/schemas/Side'
        requested_size:
          $ref: '#/components/schemas/RequestedSize'
        created_at:
          type: integer
          format: int64
          description: Creation time in Unix milliseconds.
      required:
        - rfq_id
        - leg_position_ids
        - direction
        - side
    RFQStatus:
      type: string
      description: Lifecycle status of the RFQ
      enum:
        - CREATED
        - COLLECTING_QUOTES
        - AWAITING_REQUESTER_ACCEPTANCE
        - AWAITING_MAKER_CONFIRMATION
        - EXECUTING
        - FILLED
        - FAILED
        - EXPIRED
        - CANCELED
        - REJECTED
    FillBundle:
      type: object
      description: The selected executable bundle of maker allocations.
      properties:
        requested_shares_e6:
          type: string
          description: Requested share size in six-decimal fixed-point units.
        requested_notional_e6:
          type: string
          description: Requested notional in six-decimal fixed-point units (BUY RFQs only).
        blended_price_e6:
          type: string
          description: Blended bundle price in six-decimal fixed-point units.
        allocations:
          type: array
          items:
            $ref: '#/components/schemas/FillAllocation'
      required:
        - requested_shares_e6
        - blended_price_e6
        - allocations
    MakerConfirmationSnapshot:
      type: object
      properties:
        quote_id:
          type: string
        signer_address:
          type: string
        maker_address:
          type: string
        decision:
          type: string
          enum:
            - CONFIRM
            - DECLINE
            - TIMED_OUT
        reason:
          type: string
        responded_at:
          type: integer
          format: int64
          description: Response time in Unix milliseconds.
      required:
        - quote_id
        - signer_address
        - maker_address
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
          description: Human-readable error detail
      required:
        - error
    Direction:
      type: string
      description: Requester trade direction
      enum:
        - BUY
        - SELL
    Side:
      type: string
      description: Combinatorial position side. Currently only `YES` is supported.
      enum:
        - 'YES'
        - 'NO'
    RequestedSize:
      type: object
      description: Requested RFQ size and unit
      properties:
        unit:
          type: string
          description: >
            `notional` for requester BUY RFQs and `shares` for requester SELL
            RFQs.
          enum:
            - notional
            - shares
        value_e6:
          type: string
          description: Six-decimal fixed-point value encoded as a string.
          example: '1000000'
      required:
        - unit
        - value_e6
    FillAllocation:
      type: object
      properties:
        maker_quote_id:
          type: string
        signer_address:
          type: string
        maker_address:
          type: string
        size_e6:
          type: string
          description: >-
            Accepted fill size for this maker quote, in six-decimal fixed-point
            units.
        price_e6:
          type: string
          description: Fill price in six-decimal fixed-point units.
        received_at:
          type: integer
          format: int64
          description: Receipt time in Unix milliseconds.
      required:
        - maker_quote_id
        - signer_address
        - maker_address
        - size_e6
        - price_e6
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
    Unauthorized:
      description: Missing or invalid CLOB L2 authentication
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: unauthenticated
    Forbidden:
      description: >-
        Authenticated identity does not match the request, or role is not
        allowed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: auth address mismatch
    NotFound:
      description: The referenced RFQ is not active or no longer exists
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: unknown rfq
    Conflict:
      description: The RFQ is not in a state that accepts this command
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: competition window closed
    TooManyRequests:
      description: Rate limited
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: rate limited
    ServiceUnavailable:
      description: An RFQ service dependency is temporarily unavailable
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error: service unavailable
  securitySchemes:
    polyApiKey:
      type: apiKey
      in: header
      name: POLY_API_KEY
      description: CLOB API key
    polyAddress:
      type: apiKey
      in: header
      name: POLY_ADDRESS
      description: Wallet address associated with the API key
    polySignature:
      type: apiKey
      in: header
      name: POLY_SIGNATURE
      description: HMAC-SHA256 signature of the request
    polyPassphrase:
      type: apiKey
      in: header
      name: POLY_PASSPHRASE
      description: CLOB API key passphrase
    polyTimestamp:
      type: apiKey
      in: header
      name: POLY_TIMESTAMP
      description: Unix timestamp of the request

````