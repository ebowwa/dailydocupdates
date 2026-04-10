<!--
Source: https://docs.polymarket.com/api-reference/sports/get-valid-sports-market-types.md
Downloaded: 2026-04-10T20:13:46.393Z
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

# Get valid sports market types



## OpenAPI

````yaml /api-spec/gamma-openapi.yaml get /sports/market-types
openapi: 3.0.3
info:
  title: Markets API
  version: 1.0.0
  description: REST API specification for public endpoints used by the Markets service.
servers:
  - url: https://gamma-api.polymarket.com
    description: Polymarket Gamma API Production Server
security: []
tags:
  - name: Gamma Status
    description: Gamma API status and health check
  - name: Sports
    description: Sports-related endpoints including teams and game data
  - name: Tags
    description: Tag management and related tag operations
  - name: Events
    description: Event management and event-related operations
  - name: Markets
    description: Market data and market-related operations
  - name: Comments
    description: Comment system and user interactions
  - name: Series
    description: Series management and related operations
  - name: Profiles
    description: User profile management
  - name: Search
    description: Search functionality across different entity types
paths:
  /sports/market-types:
    get:
      tags:
        - Sports
      summary: Get valid sports market types
      operationId: getSportsMarketTypes
      responses:
        '200':
          description: List of valid sports market types
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SportsMarketTypesResponse'
components:
  schemas:
    SportsMarketTypesResponse:
      type: object
      properties:
        marketTypes:
          type: array
          description: List of all valid sports market types
          items:
            type: string

````

Built with [Mintlify](https://mintlify.com).