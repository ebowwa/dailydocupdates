> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete Proxy

> Delete a proxy by address.
Requires EOA signature, see [EOA signing](/http/signing#1-eoa-signing).


<Badge color="gray" size="md">Request Weight: **1**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json delete /v1/account/proxy
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
  /v1/account/proxy:
    delete:
      summary: Delete Proxy
      description: |
        Delete a proxy by address.
        Requires EOA signature, see [EOA signing](/http/signing#1-eoa-signing).
      operationId: deleteProxy
      requestBody:
        description: Delete proxy request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DeleteProxyRequest'
            examples:
              deleteProxy:
                summary: Delete a proxy
                value:
                  op:
                    type: deleteProxy
                    args:
                      proxy: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
                  sig: >-
                    0x9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a1c
                  salt: 888888888
                  ts: 1767000020000
      responses:
        '200':
          description: Delete proxy response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenericAccepted'
        '400':
          $ref: '#/components/responses/Error400Response'
        '422':
          $ref: '#/components/responses/Error422Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    DeleteProxyRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpDeleteProxy'
        - $ref: '#/components/schemas/BaseOp'
    GenericAccepted:
      type: object
      required:
        - status
      properties:
        status:
          type: string
          enum:
            - ok
    OpDeleteProxy:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - deleteProxy
        args:
          type: object
          required:
            - proxy
          properties:
            proxy:
              $ref: '#/components/schemas/proxy'
    BaseOp:
      type: object
      required:
        - sig
        - salt
        - ts
      properties:
        sig:
          $ref: '#/components/schemas/sig'
        salt:
          $ref: '#/components/schemas/salt'
        ts:
          $ref: '#/components/schemas/ts'
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
    GenericRejected:
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
    proxy:
      type: string
      description: Proxy address in hex format
      example: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    sig:
      type: string
      description: Signature in hex format
      example: 0x1234567890...
    salt:
      type: integer
      description: Salt
      example: 1234567890
    ts:
      type: integer
      description: >-
        Request timestamp. Unix milliseconds for most operations; Unix seconds
        for withdrawals (must match the on-chain EIP-712 struct verified against
        block.timestamp).
      example: 1767225600000
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
    Error422Response:
      description: |
        Unprocessable Entity — the request was well-formed but a domain rule
        rejected it on its merits (insufficient balance, invalid leverage,
        proxy already exists, …). The body is the discriminated rejection
        (`status: err`) with the engine error identifier in `error`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GenericRejected'
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

````