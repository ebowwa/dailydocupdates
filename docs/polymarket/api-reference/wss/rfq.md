> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quoter Gateway

> Authenticated WebSocket for combinatorial RFQ quoters — receive requests, submit quotes, confirm last look, and track execution.



## AsyncAPI

````yaml asyncapi-rfq.json quoter
id: quoter
title: Quoter Gateway
description: >-
  Authenticated quoter channel. Send the `auth` message as the first message
  within 30 seconds. The gateway broadcasts active RFQ requests, accepts signed
  quotes and cancellations, issues last-look confirmation requests, streams
  execution updates, and sends confirmed trade broadcasts.
servers:
  - id: production
    protocol: wss
    host: combos-rfq-gateway-quoter.polymarket.com
    bindings: []
    variables: []
address: /ws/rfq
parameters: []
bindings: []
operations:
  - &ref_4
    id: authenticate
    title: Authenticate
    description: Authenticate the connection (send as the first message)
    type: receive
    messages:
      - &ref_17
        id: auth
        contentType: application/json
        payload:
          - name: Auth
            description: Authenticate the connection
            type: object
            properties:
              - name: type
                type: string
                description: auth
                required: true
              - name: auth
                type: object
                description: CLOB API credentials.
                required: true
                properties:
                  - name: apiKey
                    type: string
                    description: CLOB API key.
                    required: true
                  - name: secret
                    type: string
                    description: CLOB API secret.
                    required: true
                  - name: passphrase
                    type: string
                    description: CLOB API passphrase.
                    required: true
              - name: identity
                type: object
                description: Signer/maker identity used for RFQ orders.
                required: true
                properties:
                  - name: signer_address
                    type: string
                    description: Address that signs orders.
                    required: true
                  - name: maker_address
                    type: string
                    description: Wallet that funds orders.
                    required: true
                  - name: signature_type
                    type: integer
                    description: >-
                      CLOB signature type: 0 EOA, 1 POLY_PROXY, 2 GNOSIS_SAFE, 3
                      POLY_1271.
                    enumValues:
                      - 0
                      - 1
                      - 2
                      - 3
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Authentication message. Must be the first message after connecting.
          required:
            - type
            - auth
            - identity
          properties:
            type:
              type: string
              const: auth
              x-parser-schema-id: <anonymous-schema-1>
            auth:
              type: object
              description: CLOB API credentials.
              required:
                - apiKey
                - secret
                - passphrase
              properties:
                apiKey:
                  type: string
                  description: CLOB API key.
                  x-parser-schema-id: <anonymous-schema-3>
                secret:
                  type: string
                  description: CLOB API secret.
                  x-parser-schema-id: <anonymous-schema-4>
                passphrase:
                  type: string
                  description: CLOB API passphrase.
                  x-parser-schema-id: <anonymous-schema-5>
              x-parser-schema-id: <anonymous-schema-2>
            identity:
              type: object
              description: Signer/maker identity used for RFQ orders.
              required:
                - signer_address
                - maker_address
                - signature_type
              properties:
                signer_address:
                  type: string
                  description: Address that signs orders.
                  x-parser-schema-id: <anonymous-schema-7>
                maker_address:
                  type: string
                  description: Wallet that funds orders.
                  x-parser-schema-id: <anonymous-schema-8>
                signature_type: &ref_1
                  type: integer
                  description: >-
                    CLOB signature type: 0 EOA, 1 POLY_PROXY, 2 GNOSIS_SAFE, 3
                    POLY_1271.
                  enum:
                    - 0
                    - 1
                    - 2
                    - 3
                  x-parser-schema-id: SignatureType
              x-parser-schema-id: <anonymous-schema-6>
          x-parser-schema-id: AuthMessage
        title: Auth
        description: Authenticate the connection
        example: |-
          {
            "type": "auth",
            "auth": {
              "apiKey": "YOUR_API_KEY",
              "secret": "YOUR_API_SECRET",
              "passphrase": "YOUR_API_PASSPHRASE"
            },
            "identity": {
              "signer_address": "0xYourSigner",
              "maker_address": "0xYourQuoterWallet",
              "signature_type": 0
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: auth
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: quoter
  - &ref_8
    id: authResult
    title: Auth Result
    description: Gateway response to the auth message
    type: send
    messages:
      - &ref_21
        id: authResponse
        contentType: application/json
        payload:
          - name: Auth Response
            description: Gateway response to the auth message
            type: object
            properties:
              - name: type
                type: string
                description: auth
                required: true
              - name: success
                type: boolean
                required: true
              - name: address
                type: string
                description: Authenticated address, present on success.
                required: false
              - name: error
                type: string
                description: Error detail, present on failure.
                required: false
        headers: []
        jsonPayloadSchema:
          type: object
          description: Gateway response to the auth message.
          required:
            - type
            - success
          properties:
            type:
              type: string
              const: auth
              x-parser-schema-id: <anonymous-schema-9>
            success:
              type: boolean
              x-parser-schema-id: <anonymous-schema-10>
            address:
              type: string
              description: Authenticated address, present on success.
              x-parser-schema-id: <anonymous-schema-11>
            error:
              type: string
              description: Error detail, present on failure.
              x-parser-schema-id: <anonymous-schema-12>
          x-parser-schema-id: AuthResponse
        title: Auth Response
        description: Gateway response to the auth message
        example: |-
          {
            "type": "auth",
            "success": true,
            "address": "0xAuthenticatedAddress"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: authResponse
    bindings: []
    extensions: *ref_0
  - &ref_9
    id: receiveRfqRequest
    title: RFQ Request
    description: Broadcast of an active RFQ request to quote
    type: send
    messages:
      - &ref_22
        id: rfqRequest
        contentType: application/json
        payload:
          - name: RFQ_REQUEST
            description: Broadcast of an active RFQ request
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_REQUEST
                required: true
              - name: rfq_id
                type: string
                description: Server-assigned RFQ ID.
                required: true
              - name: requestor_public_id
                type: string
                description: Opaque public ID for the RFQ source.
                required: true
              - name: leg_position_ids
                type: array
                description: Canonical leg position IDs in the combo.
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
              - name: condition_id
                type: string
                description: Derived combinatorial condition ID.
                required: true
              - name: yes_position_id
                type: string
                description: Derived YES combo position ID.
                required: true
              - name: no_position_id
                type: string
                description: Derived NO combo position ID.
                required: true
              - name: direction
                type: string
                description: Requester trade direction.
                enumValues:
                  - BUY
                  - SELL
                required: true
              - name: side
                type: string
                description: Combinatorial position side. Currently only YES is supported.
                enumValues:
                  - 'YES'
                  - 'NO'
                required: true
              - name: requested_size
                type: object
                description: Requested RFQ size and unit.
                required: true
                properties:
                  - name: unit
                    type: string
                    description: >-
                      `notional` for requester BUY RFQs and `shares` for
                      requester SELL RFQs.
                    enumValues:
                      - notional
                      - shares
                    required: true
                  - name: value_e6
                    type: string
                    description: Six-decimal fixed-point value encoded as a string.
                    required: true
              - name: submission_deadline
                type: integer
                description: Quote submission deadline in Unix milliseconds.
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Broadcast of an active RFQ request.
          required:
            - type
            - rfq_id
            - requestor_public_id
            - leg_position_ids
            - condition_id
            - yes_position_id
            - no_position_id
            - direction
            - side
            - requested_size
            - submission_deadline
          properties:
            type:
              type: string
              const: RFQ_REQUEST
              x-parser-schema-id: <anonymous-schema-13>
            rfq_id:
              type: string
              description: Server-assigned RFQ ID.
              x-parser-schema-id: <anonymous-schema-14>
            requestor_public_id:
              type: string
              description: Opaque public ID for the RFQ source.
              x-parser-schema-id: <anonymous-schema-15>
            leg_position_ids:
              type: array
              description: Canonical leg position IDs in the combo.
              items:
                type: string
                x-parser-schema-id: <anonymous-schema-17>
              x-parser-schema-id: <anonymous-schema-16>
            condition_id:
              type: string
              description: Derived combinatorial condition ID.
              x-parser-schema-id: <anonymous-schema-18>
            yes_position_id:
              type: string
              description: Derived YES combo position ID.
              x-parser-schema-id: <anonymous-schema-19>
            no_position_id:
              type: string
              description: Derived NO combo position ID.
              x-parser-schema-id: <anonymous-schema-20>
            direction: &ref_2
              type: string
              description: Requester trade direction.
              enum:
                - BUY
                - SELL
              x-parser-schema-id: Direction
            side: &ref_3
              type: string
              description: Combinatorial position side. Currently only YES is supported.
              enum:
                - 'YES'
                - 'NO'
              x-parser-schema-id: Side
            requested_size:
              type: object
              description: Requested RFQ size and unit.
              required:
                - unit
                - value_e6
              properties:
                unit:
                  type: string
                  description: >-
                    `notional` for requester BUY RFQs and `shares` for requester
                    SELL RFQs.
                  enum:
                    - notional
                    - shares
                  x-parser-schema-id: <anonymous-schema-21>
                value_e6:
                  type: string
                  description: Six-decimal fixed-point value encoded as a string.
                  x-parser-schema-id: <anonymous-schema-22>
              x-parser-schema-id: RequestedSize
            submission_deadline:
              type: integer
              format: int64
              description: Quote submission deadline in Unix milliseconds.
              x-parser-schema-id: <anonymous-schema-23>
          x-parser-schema-id: RfqRequest
        title: RFQ_REQUEST
        description: Broadcast of an active RFQ request
        example: |-
          {
            "type": "RFQ_REQUEST",
            "rfq_id": "rfq_<id>",
            "requestor_public_id": "req_<public_id>",
            "leg_position_ids": [
              "<leg_position_id_1>",
              "<leg_position_id_2>"
            ],
            "condition_id": "0x<condition_id>",
            "yes_position_id": "<yes_position_id>",
            "no_position_id": "<no_position_id>",
            "direction": "BUY",
            "side": "YES",
            "requested_size": {
              "unit": "notional",
              "value_e6": "1000000"
            },
            "submission_deadline": 1780575184000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqRequest
    bindings: []
    extensions: *ref_0
  - &ref_5
    id: submitQuote
    title: Submit Quote
    description: Submit a signed maker quote before the submission deadline
    type: receive
    messages:
      - &ref_18
        id: rfqQuote
        contentType: application/json
        payload:
          - name: RFQ_QUOTE
            description: Submit a signed maker quote
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_QUOTE
                required: true
              - name: rfq_id
                type: string
                description: RFQ ID from RFQ_REQUEST.
                required: true
              - name: price_e6
                type: string
                description: Quote price in six-decimal fixed-point units.
                required: true
              - name: size_e6
                type: string
                description: Fillable share count in six-decimal fixed-point units.
                required: true
              - name: signed_order
                type: object
                description: Signed Exchange v3 order.
                required: true
                properties:
                  - name: salt
                    type: string
                    description: Order salt (uint256 as a decimal string).
                    required: true
                  - name: maker
                    type: string
                    description: Wallet that funds the order.
                    required: true
                  - name: signer
                    type: string
                    description: Address that signs the order.
                    required: true
                  - name: tokenId
                    type: string
                    description: YES or NO combo position ID (uint256 as a decimal string).
                    required: true
                  - name: makerAmount
                    type: string
                    description: Amount the maker pays, in six-decimal base units.
                    required: true
                  - name: takerAmount
                    type: string
                    description: Amount the maker receives, in six-decimal base units.
                    required: true
                  - name: side
                    type: integer
                    description: Order side — 0 BUY, 1 SELL.
                    enumValues:
                      - 0
                      - 1
                    required: true
                  - name: signatureType
                    type: integer
                    description: >-
                      CLOB signature type: 0 EOA, 1 POLY_PROXY, 2 GNOSIS_SAFE, 3
                      POLY_1271.
                    enumValues:
                      - 0
                      - 1
                      - 2
                      - 3
                    required: true
                  - name: timestamp
                    type: string
                    description: Order timestamp in Unix seconds (as a string).
                    required: true
                  - name: metadata
                    type: string
                    description: 32-byte hex field; defaults to the zero value.
                    required: false
                  - name: builder
                    type: string
                    description: 32-byte hex field; defaults to the zero value.
                    required: false
                  - name: signature
                    type: string
                    description: EIP-712 signature over the order.
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Submit a signed maker quote before the submission deadline.
          required:
            - type
            - rfq_id
            - price_e6
            - size_e6
            - signed_order
          properties:
            type:
              type: string
              const: RFQ_QUOTE
              x-parser-schema-id: <anonymous-schema-24>
            rfq_id:
              type: string
              description: RFQ ID from RFQ_REQUEST.
              x-parser-schema-id: <anonymous-schema-25>
            price_e6:
              type: string
              description: Quote price in six-decimal fixed-point units.
              x-parser-schema-id: <anonymous-schema-26>
            size_e6:
              type: string
              description: Fillable share count in six-decimal fixed-point units.
              x-parser-schema-id: <anonymous-schema-27>
            signed_order:
              type: object
              description: Signed Exchange v3 order.
              required:
                - salt
                - maker
                - signer
                - tokenId
                - makerAmount
                - takerAmount
                - side
                - signatureType
                - timestamp
                - signature
              properties:
                salt:
                  type: string
                  description: Order salt (uint256 as a decimal string).
                  x-parser-schema-id: <anonymous-schema-28>
                maker:
                  type: string
                  description: Wallet that funds the order.
                  x-parser-schema-id: <anonymous-schema-29>
                signer:
                  type: string
                  description: Address that signs the order.
                  x-parser-schema-id: <anonymous-schema-30>
                tokenId:
                  type: string
                  description: YES or NO combo position ID (uint256 as a decimal string).
                  x-parser-schema-id: <anonymous-schema-31>
                makerAmount:
                  type: string
                  description: Amount the maker pays, in six-decimal base units.
                  x-parser-schema-id: <anonymous-schema-32>
                takerAmount:
                  type: string
                  description: Amount the maker receives, in six-decimal base units.
                  x-parser-schema-id: <anonymous-schema-33>
                side:
                  type: integer
                  description: Order side — 0 BUY, 1 SELL.
                  enum:
                    - 0
                    - 1
                  x-parser-schema-id: <anonymous-schema-34>
                signatureType: *ref_1
                timestamp:
                  type: string
                  description: Order timestamp in Unix seconds (as a string).
                  x-parser-schema-id: <anonymous-schema-35>
                metadata:
                  type: string
                  description: 32-byte hex field; defaults to the zero value.
                  x-parser-schema-id: <anonymous-schema-36>
                builder:
                  type: string
                  description: 32-byte hex field; defaults to the zero value.
                  x-parser-schema-id: <anonymous-schema-37>
                signature:
                  type: string
                  description: EIP-712 signature over the order.
                  x-parser-schema-id: <anonymous-schema-38>
              x-parser-schema-id: ExchangeV3Order
          x-parser-schema-id: RfqQuote
        title: RFQ_QUOTE
        description: Submit a signed maker quote
        example: |-
          {
            "type": "RFQ_QUOTE",
            "rfq_id": "rfq_<id>",
            "price_e6": "450000",
            "size_e6": "1000000",
            "signed_order": {
              "salt": "<order_salt>",
              "maker": "0xYourQuoterWallet",
              "signer": "0xYourSigner",
              "tokenId": "<yes_or_no_position_id>",
              "makerAmount": "<amount_to_pay>",
              "takerAmount": "<taker_amount>",
              "side": 0,
              "signatureType": 0,
              "timestamp": "<unix_seconds>",
              "metadata": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "builder": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "signature": "0x..."
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqQuote
    bindings: []
    extensions: *ref_0
  - &ref_10
    id: acknowledgeQuote
    title: Quote Ack
    description: Returns the server-generated quote ID
    type: send
    messages:
      - &ref_23
        id: ackRfqQuote
        contentType: application/json
        payload:
          - name: ACK_RFQ_QUOTE
            description: Returns the server-generated quote ID
            type: object
            properties:
              - name: type
                type: string
                description: ACK_RFQ_QUOTE
                required: true
              - name: rfq_id
                type: string
                required: true
              - name: quote_id
                type: string
                description: Server-generated quote ID.
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Returns the server-generated quote ID.
          required:
            - type
            - rfq_id
            - quote_id
          properties:
            type:
              type: string
              const: ACK_RFQ_QUOTE
              x-parser-schema-id: <anonymous-schema-39>
            rfq_id:
              type: string
              x-parser-schema-id: <anonymous-schema-40>
            quote_id:
              type: string
              description: Server-generated quote ID.
              x-parser-schema-id: <anonymous-schema-41>
          x-parser-schema-id: AckRfqQuote
        title: ACK_RFQ_QUOTE
        description: Returns the server-generated quote ID
        example: |-
          {
            "type": "ACK_RFQ_QUOTE",
            "rfq_id": "rfq_<id>",
            "quote_id": "quote_<id>"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: ackRfqQuote
    bindings: []
    extensions: *ref_0
  - &ref_6
    id: cancelQuote
    title: Cancel Quote
    description: Cancel an active maker quote before it is selected
    type: receive
    messages:
      - &ref_19
        id: rfqQuoteCancel
        contentType: application/json
        payload:
          - name: RFQ_QUOTE_CANCEL
            description: Cancel an active maker quote
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_QUOTE_CANCEL
                required: true
              - name: rfq_id
                type: string
                required: true
              - name: quote_id
                type: string
                description: Server-generated quote ID.
                required: true
              - name: signer_address
                type: string
                description: Must match the authenticated signer_address.
                required: true
              - name: maker_address
                type: string
                description: Must match the authenticated maker_address.
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Cancel an active maker quote before it is selected.
          required:
            - type
            - rfq_id
            - quote_id
            - signer_address
            - maker_address
          properties:
            type:
              type: string
              const: RFQ_QUOTE_CANCEL
              x-parser-schema-id: <anonymous-schema-42>
            rfq_id:
              type: string
              x-parser-schema-id: <anonymous-schema-43>
            quote_id:
              type: string
              description: Server-generated quote ID.
              x-parser-schema-id: <anonymous-schema-44>
            signer_address:
              type: string
              description: Must match the authenticated signer_address.
              x-parser-schema-id: <anonymous-schema-45>
            maker_address:
              type: string
              description: Must match the authenticated maker_address.
              x-parser-schema-id: <anonymous-schema-46>
          x-parser-schema-id: RfqQuoteCancel
        title: RFQ_QUOTE_CANCEL
        description: Cancel an active maker quote
        example: |-
          {
            "type": "RFQ_QUOTE_CANCEL",
            "rfq_id": "rfq_<id>",
            "quote_id": "quote_<id>",
            "signer_address": "0xYourSigner",
            "maker_address": "0xYourQuoterWallet"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqQuoteCancel
    bindings: []
    extensions: *ref_0
  - &ref_11
    id: acknowledgeQuoteCancel
    title: Quote Cancel Ack
    description: Confirms quote cancellation
    type: send
    messages:
      - &ref_24
        id: ackRfqQuoteCancel
        contentType: application/json
        payload:
          - name: ACK_RFQ_QUOTE_CANCEL
            description: Confirms quote cancellation
            type: object
            properties:
              - name: type
                type: string
                description: ACK_RFQ_QUOTE_CANCEL
                required: true
              - name: rfq_id
                type: string
                required: true
              - name: quote_id
                type: string
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Confirms quote cancellation.
          required:
            - type
            - rfq_id
            - quote_id
          properties:
            type:
              type: string
              const: ACK_RFQ_QUOTE_CANCEL
              x-parser-schema-id: <anonymous-schema-47>
            rfq_id:
              type: string
              x-parser-schema-id: <anonymous-schema-48>
            quote_id:
              type: string
              x-parser-schema-id: <anonymous-schema-49>
          x-parser-schema-id: AckRfqQuoteCancel
        title: ACK_RFQ_QUOTE_CANCEL
        description: Confirms quote cancellation
        example: |-
          {
            "type": "ACK_RFQ_QUOTE_CANCEL",
            "rfq_id": "rfq_<id>",
            "quote_id": "quote_<id>"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: ackRfqQuoteCancel
    bindings: []
    extensions: *ref_0
  - &ref_12
    id: receiveConfirmationRequest
    title: Confirmation Request
    description: Last-look confirmation request for a selected quote
    type: send
    messages:
      - &ref_25
        id: rfqConfirmationRequest
        contentType: application/json
        payload:
          - name: RFQ_CONFIRMATION_REQUEST
            description: Last-look confirmation request for a selected quote
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_CONFIRMATION_REQUEST
                required: true
              - name: rfq_id
                type: string
                required: true
              - name: quote_id
                type: string
                description: Selected quote ID.
                required: true
              - name: signer_address
                type: string
                required: true
              - name: maker_address
                type: string
                required: true
              - name: signature_type
                type: integer
                description: >-
                  CLOB signature type: 0 EOA, 1 POLY_PROXY, 2 GNOSIS_SAFE, 3
                  POLY_1271.
                enumValues:
                  - 0
                  - 1
                  - 2
                  - 3
                required: true
              - name: leg_position_ids
                type: array
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
              - name: condition_id
                type: string
                required: true
              - name: yes_position_id
                type: string
                required: true
              - name: no_position_id
                type: string
                required: true
              - name: direction
                type: string
                description: Requester trade direction.
                enumValues:
                  - BUY
                  - SELL
                required: true
              - name: side
                type: string
                description: Combinatorial position side. Currently only YES is supported.
                enumValues:
                  - 'YES'
                  - 'NO'
                required: true
              - name: fill_size_e6
                type: string
                description: Selected fill size in six-decimal fixed-point units.
                required: true
              - name: price_e6
                type: string
                description: Selected quote price in six-decimal fixed-point units.
                required: true
              - name: confirm_by
                type: integer
                description: Confirmation deadline in Unix milliseconds.
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Last-look confirmation request for a selected quote.
          required:
            - type
            - rfq_id
            - quote_id
            - signer_address
            - maker_address
            - signature_type
            - leg_position_ids
            - condition_id
            - yes_position_id
            - no_position_id
            - direction
            - side
            - fill_size_e6
            - price_e6
            - confirm_by
          properties:
            type:
              type: string
              const: RFQ_CONFIRMATION_REQUEST
              x-parser-schema-id: <anonymous-schema-50>
            rfq_id:
              type: string
              x-parser-schema-id: <anonymous-schema-51>
            quote_id:
              type: string
              description: Selected quote ID.
              x-parser-schema-id: <anonymous-schema-52>
            signer_address:
              type: string
              x-parser-schema-id: <anonymous-schema-53>
            maker_address:
              type: string
              x-parser-schema-id: <anonymous-schema-54>
            signature_type: *ref_1
            leg_position_ids:
              type: array
              items:
                type: string
                x-parser-schema-id: <anonymous-schema-56>
              x-parser-schema-id: <anonymous-schema-55>
            condition_id:
              type: string
              x-parser-schema-id: <anonymous-schema-57>
            yes_position_id:
              type: string
              x-parser-schema-id: <anonymous-schema-58>
            no_position_id:
              type: string
              x-parser-schema-id: <anonymous-schema-59>
            direction: *ref_2
            side: *ref_3
            fill_size_e6:
              type: string
              description: Selected fill size in six-decimal fixed-point units.
              x-parser-schema-id: <anonymous-schema-60>
            price_e6:
              type: string
              description: Selected quote price in six-decimal fixed-point units.
              x-parser-schema-id: <anonymous-schema-61>
            confirm_by:
              type: integer
              format: int64
              description: Confirmation deadline in Unix milliseconds.
              x-parser-schema-id: <anonymous-schema-62>
          x-parser-schema-id: RfqConfirmationRequest
        title: RFQ_CONFIRMATION_REQUEST
        description: Last-look confirmation request for a selected quote
        example: |-
          {
            "type": "RFQ_CONFIRMATION_REQUEST",
            "rfq_id": "rfq_<id>",
            "quote_id": "quote_<id>",
            "signer_address": "0xYourSigner",
            "maker_address": "0xYourQuoterWallet",
            "signature_type": 0,
            "leg_position_ids": [
              "<leg_position_id_1>",
              "<leg_position_id_2>"
            ],
            "condition_id": "0x<condition_id>",
            "yes_position_id": "<yes_position_id>",
            "no_position_id": "<no_position_id>",
            "direction": "BUY",
            "side": "YES",
            "fill_size_e6": "1000000",
            "price_e6": "450000",
            "confirm_by": 1780575184000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqConfirmationRequest
    bindings: []
    extensions: *ref_0
  - &ref_7
    id: respondConfirmation
    title: Confirmation Response
    description: Confirm or decline a selected quote during last look
    type: receive
    messages:
      - &ref_20
        id: rfqConfirmationResponse
        contentType: application/json
        payload:
          - name: RFQ_CONFIRMATION_RESPONSE
            description: Confirm or decline a selected quote
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_CONFIRMATION_RESPONSE
                required: true
              - name: rfq_id
                type: string
                required: true
              - name: quote_id
                type: string
                description: Selected quote ID.
                required: true
              - name: decision
                type: string
                enumValues:
                  - CONFIRM
                  - DECLINE
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: >-
            Confirm or decline a selected quote. Identity is applied from the
            authenticated session.
          required:
            - type
            - rfq_id
            - quote_id
            - decision
          properties:
            type:
              type: string
              const: RFQ_CONFIRMATION_RESPONSE
              x-parser-schema-id: <anonymous-schema-63>
            rfq_id:
              type: string
              x-parser-schema-id: <anonymous-schema-64>
            quote_id:
              type: string
              description: Selected quote ID.
              x-parser-schema-id: <anonymous-schema-65>
            decision:
              type: string
              enum:
                - CONFIRM
                - DECLINE
              x-parser-schema-id: <anonymous-schema-66>
          x-parser-schema-id: RfqConfirmationResponse
        title: RFQ_CONFIRMATION_RESPONSE
        description: Confirm or decline a selected quote
        example: |-
          {
            "type": "RFQ_CONFIRMATION_RESPONSE",
            "rfq_id": "rfq_<id>",
            "quote_id": "quote_<id>",
            "decision": "CONFIRM"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqConfirmationResponse
    bindings: []
    extensions: *ref_0
  - &ref_13
    id: acknowledgeConfirmation
    title: Confirmation Ack
    description: Confirms the maker's last-look response
    type: send
    messages:
      - &ref_26
        id: ackRfqConfirmationResponse
        contentType: application/json
        payload:
          - name: ACK_RFQ_CONFIRMATION_RESPONSE
            description: Confirms the maker's last-look response
            type: object
            properties:
              - name: type
                type: string
                description: ACK_RFQ_CONFIRMATION_RESPONSE
                required: true
              - name: rfq_id
                type: string
                required: true
              - name: quote_id
                type: string
                required: true
              - name: decision
                type: string
                enumValues:
                  - CONFIRM
                  - DECLINE
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Confirms the maker's last-look response.
          required:
            - type
            - rfq_id
            - quote_id
            - decision
          properties:
            type:
              type: string
              const: ACK_RFQ_CONFIRMATION_RESPONSE
              x-parser-schema-id: <anonymous-schema-67>
            rfq_id:
              type: string
              x-parser-schema-id: <anonymous-schema-68>
            quote_id:
              type: string
              x-parser-schema-id: <anonymous-schema-69>
            decision:
              type: string
              enum:
                - CONFIRM
                - DECLINE
              x-parser-schema-id: <anonymous-schema-70>
          x-parser-schema-id: AckRfqConfirmationResponse
        title: ACK_RFQ_CONFIRMATION_RESPONSE
        description: Confirms the maker's last-look response
        example: |-
          {
            "type": "ACK_RFQ_CONFIRMATION_RESPONSE",
            "rfq_id": "rfq_<id>",
            "quote_id": "quote_<id>",
            "decision": "CONFIRM"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: ackRfqConfirmationResponse
    bindings: []
    extensions: *ref_0
  - &ref_14
    id: receiveExecutionUpdate
    title: Execution Update
    description: Execution progress for selected makers
    type: send
    messages:
      - &ref_27
        id: rfqExecutionUpdate
        contentType: application/json
        payload:
          - name: RFQ_EXECUTION_UPDATE
            description: Execution progress for selected makers
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_EXECUTION_UPDATE
                required: true
              - name: rfq_id
                type: string
                required: true
              - name: status
                type: string
                enumValues:
                  - MATCHED
                  - MINED
                  - RETRYING
                  - CONFIRMED
                  - FAILED
                required: true
              - name: tx_hash
                type: string
                description: Transaction hash, when available.
                required: false
        headers: []
        jsonPayloadSchema:
          type: object
          description: >-
            Reports execution progress for selected makers. CONFIRMED and FAILED
            are terminal.
          required:
            - type
            - rfq_id
            - status
          properties:
            type:
              type: string
              const: RFQ_EXECUTION_UPDATE
              x-parser-schema-id: <anonymous-schema-71>
            rfq_id:
              type: string
              x-parser-schema-id: <anonymous-schema-72>
            status:
              type: string
              enum:
                - MATCHED
                - MINED
                - RETRYING
                - CONFIRMED
                - FAILED
              x-parser-schema-id: <anonymous-schema-73>
            tx_hash:
              type: string
              description: Transaction hash, when available.
              x-parser-schema-id: <anonymous-schema-74>
          x-parser-schema-id: RfqExecutionUpdate
        title: RFQ_EXECUTION_UPDATE
        description: Execution progress for selected makers
        example: |-
          {
            "type": "RFQ_EXECUTION_UPDATE",
            "rfq_id": "rfq_<id>",
            "status": "MINED",
            "tx_hash": "0x<transaction_hash>"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqExecutionUpdate
    bindings: []
    extensions: *ref_0
  - &ref_15
    id: receiveTradeBroadcast
    title: Trade Broadcast
    description: Confirmed Combo RFQ trade broadcast
    type: send
    messages:
      - &ref_28
        id: rfqTrade
        contentType: application/json
        payload:
          - name: RFQ_TRADE
            description: Confirmed Combo RFQ trade broadcast
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_TRADE
                required: true
              - name: rfq_id
                type: string
                description: RFQ ID for deduplication and reconciliation.
                required: true
              - name: requester_id
                type: string
                description: Opaque public ID for the RFQ source.
                required: true
              - name: condition_id
                type: string
                description: Derived combinatorial condition ID.
                required: true
              - name: leg_position_ids
                type: array
                description: Canonical leg position IDs in the combo.
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
              - name: direction
                type: string
                description: Requester trade direction.
                enumValues:
                  - BUY
                  - SELL
                required: true
              - name: side
                type: string
                description: Combinatorial position side. Currently only YES is supported.
                enumValues:
                  - 'YES'
                  - 'NO'
                required: true
              - name: price_e6
                type: string
                description: Accepted blended price in six-decimal fixed-point units.
                required: true
              - name: size_e6
                type: string
                description: Matched Combo share size in six-decimal fixed-point units.
                required: true
              - name: executed_at
                type: integer
                description: Execution timestamp in Unix milliseconds.
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: >-
            Confirmed Combo RFQ trade broadcast. Excludes maker identity and
            per-maker fill allocations.
          required:
            - type
            - rfq_id
            - requester_id
            - condition_id
            - leg_position_ids
            - direction
            - side
            - price_e6
            - size_e6
            - executed_at
          properties:
            type:
              type: string
              const: RFQ_TRADE
              x-parser-schema-id: <anonymous-schema-75>
            rfq_id:
              type: string
              description: RFQ ID for deduplication and reconciliation.
              x-parser-schema-id: <anonymous-schema-76>
            requester_id:
              type: string
              description: Opaque public ID for the RFQ source.
              x-parser-schema-id: <anonymous-schema-77>
            condition_id:
              type: string
              description: Derived combinatorial condition ID.
              x-parser-schema-id: <anonymous-schema-78>
            leg_position_ids:
              type: array
              description: Canonical leg position IDs in the combo.
              items:
                type: string
                x-parser-schema-id: <anonymous-schema-80>
              x-parser-schema-id: <anonymous-schema-79>
            direction: *ref_2
            side: *ref_3
            price_e6:
              type: string
              description: Accepted blended price in six-decimal fixed-point units.
              x-parser-schema-id: <anonymous-schema-81>
            size_e6:
              type: string
              description: Matched Combo share size in six-decimal fixed-point units.
              x-parser-schema-id: <anonymous-schema-82>
            executed_at:
              type: integer
              format: int64
              description: Execution timestamp in Unix milliseconds.
              x-parser-schema-id: <anonymous-schema-83>
          x-parser-schema-id: RfqTrade
        title: RFQ_TRADE
        description: Confirmed Combo RFQ trade broadcast
        example: |-
          {
            "type": "RFQ_TRADE",
            "rfq_id": "rfq_<id>",
            "requester_id": "req_<public_id>",
            "condition_id": "0x<condition_id>",
            "leg_position_ids": [
              "<leg_position_id_1>",
              "<leg_position_id_2>"
            ],
            "direction": "BUY",
            "side": "YES",
            "price_e6": "125000",
            "size_e6": "800000",
            "executed_at": 1780854786039
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqTrade
    bindings: []
    extensions: *ref_0
  - &ref_16
    id: receiveError
    title: Error
    description: Sent when a command fails validation or cannot be applied
    type: send
    messages:
      - &ref_29
        id: rfqError
        contentType: application/json
        payload:
          - name: RFQ_ERROR
            description: Sent when a command fails validation or cannot be applied
            type: object
            properties:
              - name: type
                type: string
                description: RFQ_ERROR
                required: true
              - name: request_type
                type: string
                description: Inbound command that failed, when parsed.
                required: false
              - name: rfq_id
                type: string
                description: RFQ ID, when present on the failed command.
                required: false
              - name: quote_id
                type: string
                description: Quote ID, when present on the failed command.
                required: false
              - name: code
                type: string
                description: Stable machine-readable error code.
                enumValues:
                  - ADDRESS_MISMATCH
                  - ALLOWANCE_VALIDATION_FAILED
                  - BALANCE_VALIDATION_FAILED
                  - CONTRADICTORY_LEGS
                  - EXPIRED_RFQ
                  - INVALID_ACCEPTANCE
                  - INVALID_CONFIRMATION
                  - INVALID_EXECUTION_RESULT
                  - INVALID_IDENTITY
                  - INVALID_MESSAGE
                  - INVALID_QUOTE
                  - INVALID_RFQ
                  - INVALID_RFQ_STATE
                  - INVALID_ROLE
                  - LEG_METADATA_UNAVAILABLE
                  - MAKER_ALREADY_RESPONDED
                  - MAKER_NOT_REQUIRED
                  - PRE_EXECUTION_BALANCE_RESERVATION_FAILED
                  - QUOTE_MISMATCH
                  - QUOTE_UNAVAILABLE
                  - RATE_LIMITED
                  - REQUEST_FAILED
                  - SERVICE_UNAVAILABLE
                  - SUBMISSION_WINDOW_CLOSED
                  - TRADE_SUBMISSION_FAILED
                  - UNAUTHENTICATED
                  - UNAUTHORIZED_ROLE
                  - UNKNOWN_RFQ
                required: true
              - name: error
                type: string
                description: Human-readable error detail for logging and debugging.
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          description: Sent when a command fails validation or cannot be applied.
          required:
            - type
            - code
            - error
          properties:
            type:
              type: string
              const: RFQ_ERROR
              x-parser-schema-id: <anonymous-schema-84>
            request_type:
              type: string
              description: Inbound command that failed, when parsed.
              x-parser-schema-id: <anonymous-schema-85>
            rfq_id:
              type: string
              description: RFQ ID, when present on the failed command.
              x-parser-schema-id: <anonymous-schema-86>
            quote_id:
              type: string
              description: Quote ID, when present on the failed command.
              x-parser-schema-id: <anonymous-schema-87>
            code:
              type: string
              description: Stable machine-readable error code.
              enum:
                - ADDRESS_MISMATCH
                - ALLOWANCE_VALIDATION_FAILED
                - BALANCE_VALIDATION_FAILED
                - CONTRADICTORY_LEGS
                - EXPIRED_RFQ
                - INVALID_ACCEPTANCE
                - INVALID_CONFIRMATION
                - INVALID_EXECUTION_RESULT
                - INVALID_IDENTITY
                - INVALID_MESSAGE
                - INVALID_QUOTE
                - INVALID_RFQ
                - INVALID_RFQ_STATE
                - INVALID_ROLE
                - LEG_METADATA_UNAVAILABLE
                - MAKER_ALREADY_RESPONDED
                - MAKER_NOT_REQUIRED
                - PRE_EXECUTION_BALANCE_RESERVATION_FAILED
                - QUOTE_MISMATCH
                - QUOTE_UNAVAILABLE
                - RATE_LIMITED
                - REQUEST_FAILED
                - SERVICE_UNAVAILABLE
                - SUBMISSION_WINDOW_CLOSED
                - TRADE_SUBMISSION_FAILED
                - UNAUTHENTICATED
                - UNAUTHORIZED_ROLE
                - UNKNOWN_RFQ
              x-parser-schema-id: <anonymous-schema-88>
            error:
              type: string
              description: Human-readable error detail for logging and debugging.
              x-parser-schema-id: <anonymous-schema-89>
          x-parser-schema-id: RfqError
        title: RFQ_ERROR
        description: Sent when a command fails validation or cannot be applied
        example: |-
          {
            "type": "RFQ_ERROR",
            "request_type": "RFQ_QUOTE",
            "rfq_id": "rfq_<id>",
            "code": "SUBMISSION_WINDOW_CLOSED",
            "error": "submission window closed"
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: rfqError
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_4
  - *ref_5
  - *ref_6
  - *ref_7
receiveOperations:
  - *ref_8
  - *ref_9
  - *ref_10
  - *ref_11
  - *ref_12
  - *ref_13
  - *ref_14
  - *ref_15
  - *ref_16
sendMessages:
  - *ref_17
  - *ref_18
  - *ref_19
  - *ref_20
receiveMessages:
  - *ref_21
  - *ref_22
  - *ref_23
  - *ref_24
  - *ref_25
  - *ref_26
  - *ref_27
  - *ref_28
  - *ref_29
extensions:
  - id: x-parser-unique-object-id
    value: quoter
securitySchemes: []

````