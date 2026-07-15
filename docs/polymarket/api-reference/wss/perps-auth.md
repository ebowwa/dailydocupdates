> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Auth

> Perps WebSocket authentication.



## AsyncAPI

````yaml asyncapi-perps.json auth
id: auth
title: Auth
description: Authentication to access private channels.
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
    id: AuthSend
    title: Auth send
    description: Authenticate connection
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Auth
            description: Authenticate this WebSocket connection for private channels
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
              - name: op
                type: object
                required: true
                properties:
                  - name: type
                    type: string
                    enumValues:
                      - auth
                    required: true
                  - name: args
                    type: object
                    required: true
                    properties:
                      - name: proxy
                        type: string
                        description: Proxy address in hex format
                        required: true
                      - name: secret
                        type: string
                        description: API secret
                        required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-134>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-135>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - auth
                  x-parser-schema-id: <anonymous-schema-137>
                args:
                  type: object
                  required:
                    - proxy
                    - secret
                  properties:
                    proxy:
                      type: string
                      description: Proxy address in hex format
                      example: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
                      x-parser-schema-id: <anonymous-schema-139>
                    secret:
                      type: string
                      description: API secret
                      example: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
                      x-parser-schema-id: <anonymous-schema-140>
                  x-parser-schema-id: <anonymous-schema-138>
              x-parser-schema-id: <anonymous-schema-136>
          required:
            - req
            - op
          x-parser-schema-id: <anonymous-schema-133>
        title: Auth
        description: Authenticate this WebSocket connection for private channels
        example: |-
          {
            "req": "post",
            "op": {
              "type": "auth",
              "args": {
                "proxy": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                "secret": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
              }
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: auth
  - &ref_2
    id: AuthReceive
    title: Auth receive
    description: Auth response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Auth Response
            description: Authentication result
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: object
                required: true
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
                      machine-readable snake_case identifier that is part of the
                      API contract and safe to branch on, e.g.
                      `insufficient_margin`, `insufficient_balance`,
                      `order_not_found`, `reduce_only_invalid`, `unauthorized`,
                      `not_found`. For `400` it is a human-readable validation
                      detail whose wording may change. See the Error handling
                      guide for the domain identifiers. (Post-only /
                      Fill-or-Kill outcomes are order statuses such as
                      `post_only_rejected`, not rejections.)
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-142>
            data:
              oneOf:
                - type: object
                  required:
                    - status
                  properties:
                    status:
                      type: string
                      enum:
                        - ok
                      x-parser-schema-id: <anonymous-schema-145>
                  x-parser-schema-id: <anonymous-schema-144>
                - type: object
                  required:
                    - status
                    - error
                  properties:
                    status:
                      type: string
                      enum:
                        - err
                      x-parser-schema-id: <anonymous-schema-147>
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
                      x-parser-schema-id: <anonymous-schema-148>
                  x-parser-schema-id: <anonymous-schema-146>
              x-parser-schema-id: <anonymous-schema-143>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-141>
        title: Auth Response
        description: Authentication result
        example: |-
          {
            "id": 123,
            "data": {
              "status": "<string>",
              "error": "<string>"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Response
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_1
receiveOperations:
  - *ref_2
sendMessages:
  - *ref_3
receiveMessages:
  - *ref_4
extensions:
  - id: x-parser-unique-object-id
    value: auth
securitySchemes: []

````