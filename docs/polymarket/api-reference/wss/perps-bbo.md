> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# BBO

> Perps WebSocket best bid and offer updates.



## AsyncAPI

````yaml asyncapi-perps.json bbo
id: bbo
title: BBO
description: Best bid and offer real-time updates.
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
    id: BBOSubscribe
    title: B b o subscribe
    description: Subscribe to BBO
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to BBO updates for a specific instrument
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
                description: |
                  BBO subscription per instrument: `bbo::{iid}` (e.g. `bbo::1`).
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
              x-parser-schema-id: <anonymous-schema-190>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-191>
            chs:
              type: array
              description: |
                BBO subscription per instrument: `bbo::{iid}` (e.g. `bbo::1`).
              items:
                type: string
                pattern: ^bbo::\d+$
                x-parser-schema-id: <anonymous-schema-193>
              example:
                - bbo::1
              x-parser-schema-id: <anonymous-schema-192>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-189>
        title: Subscribe
        description: Subscribe to BBO updates for a specific instrument
        example: |-
          {
            "req": "sub",
            "chs": [
              "bbo::1"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: bbo
  - &ref_3
    id: BBOSubscribeResponse
    title: B b o subscribe response
    description: BBO subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to BBO subscribe request
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
              x-parser-schema-id: <anonymous-schema-195>
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
                        x-parser-schema-id: <anonymous-schema-199>
                    x-parser-schema-id: <anonymous-schema-198>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-201>
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
                        x-parser-schema-id: <anonymous-schema-202>
                    x-parser-schema-id: <anonymous-schema-200>
                x-parser-schema-id: <anonymous-schema-197>
              x-parser-schema-id: <anonymous-schema-196>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-194>
        title: Subscribe Response
        description: Response to BBO subscribe request
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
    id: BBOUnsubscribe
    title: B b o unsubscribe
    description: Unsubscribe from BBO
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from BBO updates
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
                description: |
                  BBO subscription per instrument: `bbo::{iid}` (e.g. `bbo::1`).
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
              x-parser-schema-id: <anonymous-schema-204>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-205>
            chs:
              type: array
              description: |
                BBO subscription per instrument: `bbo::{iid}` (e.g. `bbo::1`).
              items:
                type: string
                pattern: ^bbo::\d+$
                x-parser-schema-id: <anonymous-schema-207>
              example:
                - bbo::1
              x-parser-schema-id: <anonymous-schema-206>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-203>
        title: Unsubscribe
        description: Unsubscribe from BBO updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "bbo::1"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: BBOUnsubscribeResponse
    title: B b o unsubscribe response
    description: BBO unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to BBO unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-209>
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
                        x-parser-schema-id: <anonymous-schema-213>
                    x-parser-schema-id: <anonymous-schema-212>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-215>
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
                        x-parser-schema-id: <anonymous-schema-216>
                    x-parser-schema-id: <anonymous-schema-214>
                x-parser-schema-id: <anonymous-schema-211>
              x-parser-schema-id: <anonymous-schema-210>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-208>
        title: Unsubscribe Response
        description: Response to BBO unsubscribe request
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
    id: BBOUpdate
    title: B b o update
    description: Receive BBO updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time BBO updates for subscribed instruments
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
                title: BBO Data
                description: BBO object
                required: true
                properties:
                  - name: iid
                    type: integer
                    description: Instrument ID
                    required: true
                  - name: bp
                    type: string
                    description: Best bid price
                    required: true
                  - name: bq
                    type: string
                    description: Best bid quantity
                    required: true
                  - name: ap
                    type: string
                    description: Best ask price
                    required: true
                  - name: aq
                    type: string
                    description: Best ask quantity
                    required: true
        headers: []
        jsonPayloadSchema:
          title: BBO Update
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
              x-parser-schema-id: <anonymous-schema-218>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-219>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-220>
            data:
              type: object
              description: BBO object
              title: BBO Data
              properties:
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-222>
                bp:
                  type: string
                  description: Best bid price
                  example: '99.50'
                  x-parser-schema-id: <anonymous-schema-223>
                bq:
                  type: string
                  description: Best bid quantity
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-224>
                ap:
                  type: string
                  description: Best ask price
                  example: '100.50'
                  x-parser-schema-id: <anonymous-schema-225>
                aq:
                  type: string
                  description: Best ask quantity
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-226>
              required:
                - iid
                - bp
                - bq
                - ap
                - aq
              x-parser-schema-id: <anonymous-schema-221>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-217>
        title: Update
        description: Real-time BBO updates for subscribed instruments
        example: |-
          {
            "ch": "bbo::1",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": {
              "iid": 1,
              "bp": "99.50",
              "bq": "10.00",
              "ap": "100.50",
              "aq": "10.00"
            }
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
    value: bbo
securitySchemes: []

````