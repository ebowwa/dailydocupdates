<!--
Source: https://docs.polymarket.com/api-reference/data/get-server-time.md
Downloaded: 2026-02-22T02:57:47.657Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get server time

> Returns the current Unix timestamp of the server.
This can be used to synchronize client time with server time.




## OpenAPI

````yaml api-spec/clob-openapi.yaml get /time
openapi: 3.1.0
info:
  title: Polymarket CLOB API
  description: Polymarket CLOB API Reference
  license:
    name: MIT
    identifier: MIT
  version: 1.0.0
servers:
  - url: https://clob.polymarket.com
    description: Production CLOB API
  - url: https://clob-staging.polymarket.com
    description: Staging CLOB API
security: []
tags:
  - name: Trade
    description: Trade endpoints
  - name: Markets
    description: Market data endpoints
  - name: Account
    description: Account and authentication endpoints
  - name: Notifications
    description: User notification endpoints
  - name: Rewards
    description: Rewards and earnings endpoints
paths:
  /time:
    get:
      tags:
        - Data
      summary: Get server time
      description: |
        Returns the current Unix timestamp of the server.
        This can be used to synchronize client time with server time.
      operationId: getTime
      responses:
        '200':
          description: Successfully retrieved server time
          content:
            application/json:
              schema:
                type: integer
                format: int64
                description: Unix timestamp (seconds since epoch)
              example: 1234567890
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
      security: []
components:
  schemas:
    ErrorResponse:
      type: object
      required:
        - error
      properties:
        error:
          type: string
          description: Error message

````