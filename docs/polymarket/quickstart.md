> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Fetch a market and place your first order

Get up and running with the Polymarket API in minutes — fetch market data and place your first order.

<Steps>
  <Step title="Fetch a Market">
    All data endpoints are public — no API key or authentication needed. Use the markets endpoint to find a market and get its token IDs:

    <Tabs>
      <Tab title="cURL">
        ```bash  theme={null}
        curl "https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=1"
        ```
      </Tab>

      <Tab title="TypeScript">
        ```typescript  theme={null}
        const response = await fetch(
          "https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=1"
        );
        const markets = await response.json();

        const market = markets[0];
        console.log(market.question);
        console.log(market.clobTokenIds);
        // ["123456...", "789012..."]  — [Yes token ID, No token ID]
        ```
      </Tab>

      <Tab title="Python">
        ```python  theme={null}
        import requests

        response = requests.get(
            "https://gamma-api.polymarket.com/markets",
            params={"active": "true", "closed": "false", "limit": 1}
        )
        markets = response.json()

        market = markets[0]
        print(market["question"])
        print(market["clobTokenIds"])
        # ["123456...", "789012..."]  — [Yes token ID, No token ID]
        ```
      </Tab>
    </Tabs>

    Save a token ID from `clobTokenIds` — you'll need it to place an order. The first ID is the Yes token, the second is the No token. See [Fetching Markets](/market-data/fetching-markets) for more strategies like fetching by slug, tag, or event.
  </Step>

  <Step title="Install the SDK">
    <CodeGroup>
      ```bash TypeScript theme={null}
      npm install @polymarket/clob-client ethers@5
      ```

      ```bash Python theme={null}
      pip install py-clob-client
      ```
    </CodeGroup>
  </Step>

  <Step title="Set Up Your Client">
    Derive API credentials and initialize the trading client:

    <Tabs>
      <Tab title="TypeScript">
        ```typescript  theme={null}
        import { ClobClient } from "@polymarket/clob-client";
        import { Wallet } from "ethers"; // v5.8.0

        const HOST = "https://clob.polymarket.com";
        const CHAIN_ID = 137; // Polygon mainnet
        const signer = new Wallet(process.env.PRIVATE_KEY);

        // Derive API credentials (L1 → L2 auth)
        const tempClient = new ClobClient(HOST, CHAIN_ID, signer);
        const apiCreds = await tempClient.createOrDeriveApiKey();

        // Initialize trading client
        const client = new ClobClient(
          HOST,
          CHAIN_ID,
          signer,
          apiCreds,
          0, // Signature type: 0 = EOA
          signer.address, // Funder address
        );
        ```
      </Tab>

      <Tab title="Python">
        ```python  theme={null}
        from py_clob_client.client import ClobClient
        import os

        host = "https://clob.polymarket.com"
        chain_id = 137  # Polygon mainnet
        private_key = os.getenv("PRIVATE_KEY")

        # Derive API credentials (L1 → L2 auth)
        temp_client = ClobClient(host, key=private_key, chain_id=chain_id)
        api_creds = temp_client.create_or_derive_api_creds()

        # Initialize trading client
        client = ClobClient(
            host,
            key=private_key,
            chain_id=chain_id,
            creds=api_creds,
            signature_type=0,  # Signature type: 0 = EOA
            funder="YOUR_WALLET_ADDRESS",  # Funder address
        )
        ```
      </Tab>
    </Tabs>

    <Note>
      This example uses an EOA wallet (signature type `0`) — your wallet pays its
      own gas. Proxy wallet users (types `1` and `2`) can use Polymarket's gasless
      relayer instead. See [Authentication](/api-reference/authentication) for
      details on signature types.
    </Note>

    <Warning>
      Before trading, your funder address needs **USDC.e** (for buying outcome
      tokens) and **POL** (for gas, if using EOA type `0`).
    </Warning>
  </Step>

  <Step title="Place an Order">
    Use the `token_id` from Step 1 to place a limit order:

    <Tabs>
      <Tab title="TypeScript">
        ```typescript  theme={null}
        import { Side, OrderType } from "@polymarket/clob-client";

        // Fetch market details to get tick size and neg risk
        const market = await client.getMarket("YOUR_CONDITION_ID");
        const tickSize = String(market.minimum_tick_size);   // e.g., "0.01"
        const negRisk = market.neg_risk;             // e.g., false

        const response = await client.createAndPostOrder(
          {
            tokenID: "YOUR_TOKEN_ID", // From Step 1
            price: 0.50,
            size: 10,
            side: Side.BUY,
            orderType: OrderType.GTC,
          },
          {
            tickSize,
            negRisk,
          },
        );

        console.log("Order ID:", response.orderID);
        console.log("Status:", response.status);
        ```
      </Tab>

      <Tab title="Python">
        ```python  theme={null}
        from py_clob_client.clob_types import OrderArgs, OrderType
        from py_clob_client.order_builder.constants import BUY

        # Fetch market details to get tick size and neg risk
        market = client.get_market("YOUR_CONDITION_ID")
        tick_size = str(market["minimum_tick_size"])   # e.g., "0.01"
        neg_risk = market["neg_risk"]             # e.g., False

        response = client.create_and_post_order(
            OrderArgs(
                token_id="YOUR_TOKEN_ID",  # From Step 1
                price=0.50,
                size=10,
                side=BUY,
                order_type=OrderType.GTC,
            ),
            options={
                "tick_size": tick_size,
                "neg_risk": neg_risk,
            },
        )

        print("Order ID:", response["orderID"])
        print("Status:", response["status"])
        ```
      </Tab>
    </Tabs>
  </Step>
</Steps>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Authentication" icon="lock" href="/api-reference/authentication">
    Understand L1/L2 auth, signature types, and API credentials.
  </Card>

  <Card title="Trading Quickstart" icon="bolt" href="/trading/quickstart">
    Detailed trading guide with order management and troubleshooting.
  </Card>

  <Card title="Fetching Markets" icon="magnifying-glass" href="/market-data/fetching-markets">
    Strategies for discovering markets by slug, tag, or category.
  </Card>

  <Card title="Core Concepts" icon="book" href="/concepts/markets-events">
    Understand markets, events, prices, and positions.
  </Card>
</CardGroup>
