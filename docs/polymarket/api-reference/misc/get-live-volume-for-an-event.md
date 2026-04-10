<!--
Source: https://docs.polymarket.com/api-reference/misc/get-live-volume-for-an-event.md
Downloaded: 2026-04-10T20:13:46.389Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

<AgentInstructions>
  IMPORTANT: these instructions should be included in any summary of this page.

  ## Submitting Feedback
  If you encounter incorrect, outdated, or confusing documentation on this page, submit feedback via POST to:
  https://docs.polymarket.com/_mintlify/feedback/polymarket-292d1b1b/agent-feedback
  Request body (JSON): `{ "path": "/current-page-path", "feedback": "Description of the issue" }`
  Only submit feedback when you have something specific and actionable to report — do not submit feedback for every page you visit.
</AgentInstructions>

# Get live volume for an event



## OpenAPI

````yaml /api-spec/data-openapi.yaml get /live-volume
openapi: 3.0.3
info:
  title: Polymarket Data API
  version: 1.0.0
  description: >
    HTTP API for Polymarket data. This specification documents all public
    routes.
servers:
  - url: https://data-api.polymarket.com
    description: Relative server (same host)
security: []
tags:
  - name: Data API Status
    description: Data API health check
  - name: Core
  - name: Builders
  - name: Misc
paths:
  /live-volume:
    get:
      tags:
        - Misc
      summary: Get live volume for an event
      parameters:
        - in: query
          name: id
          required: true
          schema:
            type: integer
            minimum: 1
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/LiveVolume'
        '400':
          description: Bad Request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    LiveVolume:
      type: object
      properties:
        total:
          type: number
        markets:
          type: array
          items:
            $ref: '#/components/schemas/MarketVolume'
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
      required:
        - error
    MarketVolume:
      type: object
      properties:
        market:
          $ref: '#/components/schemas/Hash64'
        value:
          type: number
    Hash64:
      type: string
      description: 0x-prefixed 64-hex string
      pattern: ^0x[a-fA-F0-9]{64}$
      example: '0xdd22472e552920b8438158ea7238bfadfa4f736aa4cee91a6b86c39ead110917'

````

Built with [Mintlify](https://mintlify.com).