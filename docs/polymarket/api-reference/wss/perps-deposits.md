> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Deposits

> Perps WebSocket private deposit updates.



## AsyncAPI

````yaml asyncapi-perps.json deposits
id: deposits
title: Deposits
description: >-
  Real-time deposit status updates. Requires authentication, see
  [Auth](/ws/auth).
servers:
  - id: production
    protocol: wss
    host: ws.perpetuals.polymarket.com
    bindings: []
    variables: []
address: /v1/ws
parameters: []
bindings: []
operations:
  - &ref_1
    id: DepositsSubscribe
    title: Deposits subscribe
    description: Subscribe to deposits
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private deposit updates (requires prior auth)
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: req
                type: string
                description: Request type
                enumValues:
                  - post
                  - sub
                  - unsub
                required: true
              - name: chs
                type: array
                description: 'Deposits private channel: "deposits"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - deposits
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-606>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-607>
            chs:
              type: array
              description: 'Deposits private channel: "deposits"'
              items:
                type: string
                enum:
                  - deposits
                x-parser-schema-id: <anonymous-schema-609>
              example:
                - deposits
              x-parser-schema-id: <anonymous-schema-608>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-605>
        title: Subscribe
        description: Subscribe to private deposit updates (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "deposits"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: deposits
  - &ref_3
    id: DepositsSubscribeResponse
    title: Deposits subscribe response
    description: Deposits subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to deposits subscribe request
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                title: Subscribe Response
                required: true
                properties:
                  - name: item
                    type: object
                    required: false
                    properties:
                      - name: status
                        type: string
                        enumValues:
                          - ok
                        required: true
                      - name: status
                        type: string
                        enumValues:
                          - err
                        required: true
                      - name: error
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `unauthorized`, `not_found`. For `400` it is a
                          human-readable validation detail whose wording may
                          change. See the Error handling guide for the domain
                          identifiers. (Post-only / Fill-or-Kill outcomes are
                          order statuses such as `post_only_rejected`, not
                          rejections.)
                        required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-611>
            data:
              title: Subscribe Response
              type: array
              items:
                oneOf:
                  - type: object
                    required:
                      - status
                    properties:
                      status:
                        type: string
                        enum:
                          - ok
                        x-parser-schema-id: <anonymous-schema-615>
                    x-parser-schema-id: <anonymous-schema-614>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-617>
                      error:
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `unauthorized`, `not_found`. For `400` it is a
                          human-readable validation detail whose wording may
                          change. See the Error handling guide for the domain
                          identifiers. (Post-only / Fill-or-Kill outcomes are
                          order statuses such as `post_only_rejected`, not
                          rejections.)
                        example: insufficient_margin
                        x-parser-schema-id: <anonymous-schema-618>
                    x-parser-schema-id: <anonymous-schema-616>
                x-parser-schema-id: <anonymous-schema-613>
              x-parser-schema-id: <anonymous-schema-612>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-610>
        title: Subscribe Response
        description: Response to deposits subscribe request
        example: |-
          {
            "data": []
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeResponse
    bindings: []
    extensions: *ref_0
  - &ref_2
    id: DepositsUnsubscribe
    title: Deposits unsubscribe
    description: Unsubscribe from deposits
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private deposit updates
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: req
                type: string
                description: Request type
                enumValues:
                  - post
                  - sub
                  - unsub
                required: true
              - name: chs
                type: array
                description: 'Deposits private channel: "deposits"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - deposits
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-620>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-621>
            chs:
              type: array
              description: 'Deposits private channel: "deposits"'
              items:
                type: string
                enum:
                  - deposits
                x-parser-schema-id: <anonymous-schema-623>
              example:
                - deposits
              x-parser-schema-id: <anonymous-schema-622>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-619>
        title: Unsubscribe
        description: Unsubscribe from private deposit updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "deposits"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: DepositsUnsubscribeResponse
    title: Deposits unsubscribe response
    description: Deposits unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to deposits unsubscribe request
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                title: Subscribe Response
                required: true
                properties:
                  - name: item
                    type: object
                    required: false
                    properties:
                      - name: status
                        type: string
                        enumValues:
                          - ok
                        required: true
                      - name: status
                        type: string
                        enumValues:
                          - err
                        required: true
                      - name: error
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `unauthorized`, `not_found`. For `400` it is a
                          human-readable validation detail whose wording may
                          change. See the Error handling guide for the domain
                          identifiers. (Post-only / Fill-or-Kill outcomes are
                          order statuses such as `post_only_rejected`, not
                          rejections.)
                        required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-625>
            data:
              title: Subscribe Response
              type: array
              items:
                oneOf:
                  - type: object
                    required:
                      - status
                    properties:
                      status:
                        type: string
                        enum:
                          - ok
                        x-parser-schema-id: <anonymous-schema-629>
                    x-parser-schema-id: <anonymous-schema-628>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-631>
                      error:
                        type: string
                        description: >-
                          Error identifier. For domain rejections and transport
                          errors (`401`/`404`/`429`/`500`) this is a stable,
                          machine-readable snake_case identifier that is part of
                          the API contract and safe to branch on, e.g.
                          `insufficient_margin`, `insufficient_balance`,
                          `order_not_found`, `reduce_only_invalid`,
                          `unauthorized`, `not_found`. For `400` it is a
                          human-readable validation detail whose wording may
                          change. See the Error handling guide for the domain
                          identifiers. (Post-only / Fill-or-Kill outcomes are
                          order statuses such as `post_only_rejected`, not
                          rejections.)
                        example: insufficient_margin
                        x-parser-schema-id: <anonymous-schema-632>
                    x-parser-schema-id: <anonymous-schema-630>
                x-parser-schema-id: <anonymous-schema-627>
              x-parser-schema-id: <anonymous-schema-626>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-624>
        title: Unsubscribe Response
        description: Response to deposits unsubscribe request
        example: |-
          {
            "data": []
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeResponse
    bindings: []
    extensions: *ref_0
  - &ref_5
    id: DepositsUpdate
    title: Deposits update
    description: Receive deposit updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Deposit status updates for authenticated users
            type: object
            properties:
              - name: ch
                type: string
                description: >-
                  Channel name for push data. Parameterized channels include the
                  instrument ID (e.g. "trades::1", "book::1", "klines::1::1m",
                  "tickers::all"). Private channels use plain names (e.g.
                  "fills", "orders").
                required: true
              - name: ts
                type: integer
                description: >-
                  Request timestamp. Unix milliseconds for most operations; Unix
                  seconds for withdrawals (must match the on-chain EIP-712
                  struct verified against block.timestamp).
                required: true
              - name: sq
                type: integer
                description: Sequence number
                required: true
              - name: data
                type: object
                description: Array of deposit objects
                required: true
                properties:
                  - name: hash
                    type: string
                    description: On-chain transaction hash, "0x" if not yet mined
                    required: true
                  - name: asset
                    type: string
                    description: Asset name
                    required: true
                  - name: amount
                    type: string
                    description: >-
                      Raw token amount including decimals. For withdrawals this
                      matches the uint256 amount in the EIP-712 signature (e.g.
                      "100000000" for 100 USDC with 6 decimals).
                    required: true
                  - name: status
                    type: string
                    description: Deposit status
                    enumValues:
                      - pending
                      - confirmed
                      - removed
                    required: true
        headers: []
        jsonPayloadSchema:
          title: Deposits Update
          type: object
          properties:
            ch:
              type: string
              description: >-
                Channel name for push data. Parameterized channels include the
                instrument ID (e.g. "trades::1", "book::1", "klines::1::1m",
                "tickers::all"). Private channels use plain names (e.g. "fills",
                "orders").
              example: trades::1
              x-parser-schema-id: <anonymous-schema-634>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-635>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-636>
            data:
              type: object
              description: Array of deposit objects
              properties:
                hash:
                  type: string
                  description: On-chain transaction hash, "0x" if not yet mined
                  default: 0x
                  example: >-
                    0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
                  x-parser-schema-id: <anonymous-schema-638>
                asset:
                  type: string
                  description: Asset name
                  example: USDC
                  x-parser-schema-id: <anonymous-schema-639>
                amount:
                  type: string
                  description: >-
                    Raw token amount including decimals. For withdrawals this
                    matches the uint256 amount in the EIP-712 signature (e.g.
                    "100000000" for 100 USDC with 6 decimals).
                  example: '100000000'
                  x-parser-schema-id: <anonymous-schema-640>
                status:
                  type: string
                  description: Deposit status
                  enum:
                    - pending
                    - confirmed
                    - removed
                  x-parser-schema-id: <anonymous-schema-641>
              required:
                - hash
                - asset
                - amount
                - status
              x-parser-schema-id: <anonymous-schema-637>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-633>
        title: Update
        description: Deposit status updates for authenticated users
        example: |-
          {
            "ch": "deposits",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
              {
                "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
                "asset": "USDC",
                "amount": "100000000",
                "status": "pending"
              }
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Update
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_1
  - *ref_2
receiveOperations:
  - *ref_3
  - *ref_4
  - *ref_5
sendMessages:
  - *ref_6
  - *ref_7
receiveMessages:
  - *ref_8
  - *ref_9
  - *ref_10
extensions:
  - id: x-parser-unique-object-id
    value: deposits
securitySchemes: []

````