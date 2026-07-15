> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Check Invite Code

> Check whether an invite code can be used. When `address` is provided, the
response is invalid if that address already has an account.


<Badge color="gray" size="md">Request Weight: **1**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/invite
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
  /v1/info/invite:
    get:
      summary: Check Invite Code
      description: >
        Check whether an invite code can be used. When `address` is provided,
        the

        response is invalid if that address already has an account.
      operationId: checkInviteCode
      parameters:
        - name: code
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/code'
        - name: address
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/address'
      responses:
        '200':
          description: Invite code validation response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InviteCheckResponse'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    code:
      type: string
      description: Referral or invite code
      example: ABC123
    address:
      type: string
      description: Address
      example: '0x1234567890abcdef1234567890abcdef12345678'
    InviteCheckResponse:
      type: object
      required:
        - valid
      properties:
        valid:
          type: boolean
          description: Whether the invite code can be used.
        error:
          type: string
          description: Present when the invite code is invalid or unusable.
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