> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Geographic Restrictions

> Jurisdictions where Polymarket Perps order placement is not permitted

Polymarket restricts order placement from certain geographic locations to comply
with regulatory requirements and international sanctions. Users in restricted
jurisdictions cannot place Perps orders.

## Restricted Jurisdictions

Order placement is not permitted from:

* United States
* Canada
* Cuba
* Iran
* North Korea
* Syria
* Crimea
* Donetsk
* Luhansk

<Warning>
  This list can change. Additional restrictions may apply under Polymarket
  notices or applicable law.
</Warning>

## For Builders

If you're integrating Perps, enforce these restrictions before submitting orders
for a user:

* Verify the end user's location before [placing orders](/perps/trading#place-orders).
* Block order submission entirely for users in any of the listed jurisdictions.
  Do not only display a warning.
* Apply the same check to any flow that results in a new position, including
  programmatic strategies that act on behalf of a user.

Read-only market data is not subject to these restrictions.
