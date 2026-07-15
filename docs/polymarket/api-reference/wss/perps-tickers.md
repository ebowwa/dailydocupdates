> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Tickers

> Perps WebSocket ticker updates.



## AsyncAPI

````yaml asyncapi-perps.json tickers
id: tickers
title: Tickers
description: Ticker updates. Pushed every 100ms.
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
    id: TickersSubscribe
    title: Tickers subscribe
    description: Subscribe to tickers
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to ticker updates for all instruments or a specific one
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
                description: >
                  Ticker subscription: `tickers::all` for every active
                  instrument,

                  or `tickers::{iid}` (e.g. `tickers::1`) for a specific one.
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-301>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-302>
            chs:
              type: array
              description: |
                Ticker subscription: `tickers::all` for every active instrument,
                or `tickers::{iid}` (e.g. `tickers::1`) for a specific one.
              items:
                type: string
                pattern: ^tickers::(\d+|all)$
                x-parser-schema-id: <anonymous-schema-304>
              example:
                - tickers::all
              x-parser-schema-id: <anonymous-schema-303>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-300>
        title: Subscribe
        description: Subscribe to ticker updates for all instruments or a specific one
        example: |-
          {
            "req": "sub",
            "chs": [
              "tickers::all"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: tickers
  - &ref_3
    id: TickersSubscribeResponse
    title: Tickers subscribe response
    description: Tickers subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to tickers subscribe request
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
              x-parser-schema-id: <anonymous-schema-306>
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
                        x-parser-schema-id: <anonymous-schema-310>
                    x-parser-schema-id: <anonymous-schema-309>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-312>
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
                        x-parser-schema-id: <anonymous-schema-313>
                    x-parser-schema-id: <anonymous-schema-311>
                x-parser-schema-id: <anonymous-schema-308>
              x-parser-schema-id: <anonymous-schema-307>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-305>
        title: Subscribe Response
        description: Response to tickers subscribe request
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
    id: TickersUnsubscribe
    title: Tickers unsubscribe
    description: Unsubscribe from tickers
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from ticker updates
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
                description: >
                  Ticker subscription: `tickers::all` for every active
                  instrument,

                  or `tickers::{iid}` (e.g. `tickers::1`) for a specific one.
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-315>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-316>
            chs:
              type: array
              description: |
                Ticker subscription: `tickers::all` for every active instrument,
                or `tickers::{iid}` (e.g. `tickers::1`) for a specific one.
              items:
                type: string
                pattern: ^tickers::(\d+|all)$
                x-parser-schema-id: <anonymous-schema-318>
              example:
                - tickers::all
              x-parser-schema-id: <anonymous-schema-317>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-314>
        title: Unsubscribe
        description: Unsubscribe from ticker updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "tickers::all"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: TickersUnsubscribeResponse
    title: Tickers unsubscribe response
    description: Tickers unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to tickers unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-320>
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
                        x-parser-schema-id: <anonymous-schema-324>
                    x-parser-schema-id: <anonymous-schema-323>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-326>
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
                        x-parser-schema-id: <anonymous-schema-327>
                    x-parser-schema-id: <anonymous-schema-325>
                x-parser-schema-id: <anonymous-schema-322>
              x-parser-schema-id: <anonymous-schema-321>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-319>
        title: Unsubscribe Response
        description: Response to tickers unsubscribe request
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
    id: TickersUpdate
    title: Tickers update
    description: Receive ticker updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time ticker updates for subscribed instruments
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
                description: Array of ticker objects
                required: true
                properties:
                  - name: iid
                    type: integer
                    description: Instrument ID
                    required: true
                  - name: idx
                    type: string
                    description: Index price
                    required: true
                  - name: mark
                    type: string
                    description: Mark price
                    required: true
                  - name: last
                    type: string
                    description: Last traded price
                    required: true
                  - name: mid
                    type: string
                    description: Mid price
                    required: true
                  - name: oi
                    type: string
                    description: Open interest in number of contracts
                    required: true
                  - name: fr
                    type: string
                    description: Funding rate
                    required: true
                  - name: nxf
                    type: integer
                    description: Next funding timestamp in milliseconds
                    required: true
        headers: []
        jsonPayloadSchema:
          title: Ticker Update
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
              x-parser-schema-id: <anonymous-schema-329>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-330>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-331>
            data:
              type: object
              description: Array of ticker objects
              properties:
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-333>
                idx:
                  type: string
                  description: Index price
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-334>
                mark:
                  type: string
                  description: Mark price
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-335>
                last:
                  type: string
                  description: Last traded price
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-336>
                mid:
                  type: string
                  description: Mid price
                  example: '100.00'
                  x-parser-schema-id: <anonymous-schema-337>
                oi:
                  type: string
                  description: Open interest in number of contracts
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-338>
                fr:
                  type: string
                  description: Funding rate
                  example: '0.0001'
                  x-parser-schema-id: <anonymous-schema-339>
                nxf:
                  type: integer
                  description: Next funding timestamp in milliseconds
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-340>
              required:
                - iid
                - idx
                - mark
                - last
                - mid
                - oi
                - fr
                - nxf
              x-parser-schema-id: <anonymous-schema-332>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-328>
        title: Update
        description: Real-time ticker updates for subscribed instruments
        example: |-
          {
            "ch": "tickers::all",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
              {
                "iid": 1,
                "idx": "100.00",
                "mark": "100.00",
                "last": "100.00",
                "mid": "100.00",
                "oi": "10.00",
                "fr": "0.0001",
                "nxf": 1767225600000
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
    value: tickers
securitySchemes: []

````