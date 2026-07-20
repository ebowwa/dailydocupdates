<!--
Source: https://docs.polymarket.com/perps/changelog.md
Downloaded: 2026-07-20T21:12:08.364Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

> Recent changes to the Polymarket Perps API and platform

Notable changes to the Polymarket Perps API.

<Update label="Jul 6, 2026" description="Cancel all orders added">
  Added <code>DELETE /v1/trade/orders/all</code> to cancel all open orders in
  one request, optionally scoped to a single instrument. Available in the SDKs
  as <code>cancelAllOrders</code> (TypeScript) and{" "}
  <code>cancel\_all\_orders</code> (Python).
</Update>

<Update label="Jun 11, 2026" description="Cancel responses include order IDs">
  Cancel responses now include `oid` and `coid` fields.
</Update>

<Update label="Jun 10, 2026" description="Taker delay added for immediately matching orders">
  Added a 20ms taker delay for orders that immediately match on entry.
</Update>

<Update label="Jun 9, 2026" description="Reduce-only orders added">
  Added the reduce-only field to order submission and order updates.
</Update>

<Update label="Jun 8, 2026" description="Auto-cancel and rate-limit updates">
  <ul>
    <li>
      Added <code>PATCH /v1/trade/auto-cancel</code> to arm or clear a dead
      man's switch that cancels all open orders at a specified time.
    </li>

    <li>
      Added <code>GET /v1/account/auto-cancel</code> to check the current
      auto-cancel status, trigger count, and daily reset time.
    </li>

    <li>Auto-cancel is limited to 1000 triggers per UTC day per account.</li>

    <li>
      Added <code>updateLeverage</code> and <code>autoCancel</code> WebSocket
      post messages.
    </li>

    <li>
      <code>portfolio</code> and <code>balances</code> WebSocket channels no
      longer push updates on every order or fill, only periodically.
    </li>

    <li>
      Rate limit error messages now distinguish between{" "}
      <code>ip\_rate\_limited</code>, <code>action\_rate\_limited</code>, and{" "}
      <code>message\_rate\_limited</code>.
    </li>
  </ul>
</Update>
