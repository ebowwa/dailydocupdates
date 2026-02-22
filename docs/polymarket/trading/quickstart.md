<!--
Source: https://docs.polymarket.com/trading/quickstart.md
Downloaded: 2026-02-22T10:30:19.694Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Place your first order on Polymarket

This guide walks you through placing an order on Polymarket end-to-end.

<Steps>
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
    Derive your API credentials and initialize the trading client. This example uses an EOA wallet (type `0`) — your wallet pays its own gas and acts as the funder:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { ClobClient } from "@polymarket/clob-client";
      import { Wallet } from "ethers"; // v5.8.0

      const HOST = "https://clob.polymarket.com";
      const CHAIN_ID = 137; // Polygon mainnet
      const signer = new Wallet(process.env.PRIVATE_KEY);

      // Derive API credentials
      const tempClient = new ClobClient(HOST, CHAIN_ID, signer);
      const apiCreds = await tempClient.createOrDeriveApiKey();

      // Initialize trading client
      const client = new ClobClient(
        HOST,
        CHAIN_ID,
        signer,
        apiCreds,
        0, // EOA
        signer.address,
      );
      ```

      ```python Python theme={null}
      from py_clob_client.client import ClobClient
      import os

      host = "https://clob.polymarket.com"
      chain_id = 137  # Polygon mainnet
      private_key = os.getenv("PRIVATE_KEY")

      # Derive API credentials
      temp_client = ClobClient(host, key=private_key, chain_id=chain_id)
      api_creds = temp_client.create_or_derive_api_creds()

      # Initialize trading client
      client = ClobClient(
          host,
          key=private_key,
          chain_id=chain_id,
          creds=api_creds,
          signature_type=0,  # EOA
          funder="YOUR_WALLET_ADDRESS"
      )
      ```
    </CodeGroup>

    <Note>
      If you have a Polymarket.com account, your funds are in a proxy wallet — use
      signature type `1` or `2` instead. See [Signature
      Types](/trading/overview#signature-types) for details.
    </Note>

    <Warning>
      Before trading, your funder address needs **USDC.e** (for buying outcome
      tokens) and **POL** (for gas, if using EOA type `0`). Proxy wallet users
      (types `1` and `2`) can use Polymarket's gasless relayer instead.
    </Warning>
  </Step>

  <Step title="Place an Order">
    Get a token ID from the [Markets API](/market-data/fetching-markets), then create and submit your order:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { Side, OrderType } from "@polymarket/clob-client";

      const response = await client.createAndPostOrder(
        {
          tokenID: "YOUR_TOKEN_ID",
          price: 0.5,
          size: 10,
          side: Side.BUY,
        },
        {
          tickSize: "0.01",
          negRisk: false, // Set to true for multi-outcome markets
        },
        OrderType.GTC,
      );

      console.log("Order ID:", response.orderID);
      console.log("Status:", response.status);
      ```

      ```python Python theme={null}
      from py_clob_client.clob_types import OrderArgs, OrderType
      from py_clob_client.order_builder.constants import BUY

      response = client.create_and_post_order(
          OrderArgs(
              token_id="YOUR_TOKEN_ID",
              price=0.50,
              size=10,
              side=BUY,
          ),
          options={
              "tick_size": "0.01",
              "neg_risk": False,  # Set to True for multi-outcome markets
          },
          order_type=OrderType.GTC
      )

      print("Order ID:", response["orderID"])
      print("Status:", response["status"])
      ```
    </CodeGroup>

    <Tip>
      Look up a market's `tickSize` and `negRisk` values using the SDK's
      `getTickSize()` and `getNegRisk()` methods, or from the market object returned
      by the API.
    </Tip>
  </Step>

  <Step title="Check Your Orders">
    <CodeGroup>
      ```typescript TypeScript theme={null}
      // View all open orders
      const openOrders = await client.getOpenOrders();
      console.log(`You have ${openOrders.length} open orders`);

      // View your trade history
      const trades = await client.getTrades();
      console.log(`You've made ${trades.length} trades`);

      // Cancel an order
      await client.cancelOrder(response.orderID);
      ```

      ```python Python theme={null}
      # View all open orders
      open_orders = client.get_orders()
      print(f"You have {len(open_orders)} open orders")

      # View your trade history
      trades = client.get_trades()
      print(f"You've made {len(trades)} trades")

      # Cancel an order
      client.cancel(order_id=response["orderID"])
      ```
    </CodeGroup>
  </Step>
</Steps>

***

## Troubleshooting

<AccordionGroup>
  <Accordion title="L2 AUTH NOT AVAILABLE - Invalid Signature">
    Wrong private key, signature type, or funder address for the derived API credentials.

    * Check that `signatureType` matches your account type (`0`, `1`, or `2`)
    * Ensure `funder` is correct for your wallet type
    * Re-derive credentials with `createOrDeriveApiKey()` if unsure
  </Accordion>

  <Accordion title="Order rejected - insufficient balance">
    Your funder address doesn't have enough tokens:

    * **BUY orders**: need USDC.e in your funder address
    * **SELL orders**: need outcome tokens in your funder address
    * Ensure you have more USDC.e than what's committed in open orders
  </Accordion>

  <Accordion title="Order rejected - insufficient allowance">
    You need to approve the Exchange contract to spend your tokens. This is
    typically done through the Polymarket UI on your first trade, or using the CTF
    contract's `setApprovalForAll()` method.
  </Accordion>

  <Accordion title="What is my funder address">
    Your funder address is the wallet where your funds are held:

    * **EOA (type 0)**: Your wallet address directly
    * **Proxy wallet (type 1 or 2)**: Go to [polymarket.com/settings](https://polymarket.com/settings) and look for the wallet address in the profile dropdown

    If the proxy wallet doesn't exist, log into Polymarket.com first (it's deployed on first login).
  </Accordion>

  <Accordion title="Blocked by Cloudflare or Geoblock">
    You're trying to place a trade from a restricted region. See [Geographic Restrictions](/api-reference/geoblock) for details.
  </Accordion>
</AccordionGroup>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Create Orders" icon="plus" href="/trading/orders/create">
    Order types, tick sizes, and error handling
  </Card>

  <Card title="Order Attribution" icon="tag" href="/trading/orders/attribution">
    Attribute orders to your builder account for volume credit
  </Card>
</CardGroup>
