<!--
Source: https://docs.polymarket.com/builders/tiers.md
Downloaded: 2026-02-22T02:57:47.666Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Tiers

> Rate limits, rewards, and how to upgrade

The Builder Program uses a tiered system to manage rate limits while rewarding high-performing integrations. Higher tiers unlock increased limits, weekly rewards, and priority support.

## Feature Definitions

| Feature                     | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| **Daily Relayer Txn Limit** | Maximum Relayer transactions per day for Safe/Proxy wallet operations      |
| **API Rate Limits**         | Rate limits for non-relayer endpoints (CLOB, Gamma, etc.)                  |
| **Subsidized Transactions** | Gas fees subsidized for Relayer and CLOB operations via Safe/Proxy wallets |
| **Order Attribution**       | Orders tracked and attributed to your Builder profile                      |
| **RevShare Protocol**       | Infrastructure allowing Builders to charge fees                            |
| **Leaderboard Visibility**  | Visibility on the [Builder Leaderboard](https://builders.polymarket.com/)  |
| **Weekly Rewards**          | Weekly USDC rewards program for visible builders based on volume           |
| **Grants**                  | Builder grants subject to approval, awarded based on innovation and impact |
| **Telegram Channel**        | Private Builders channel for announcements and support                     |
| **Badge**                   | Verified Builder affiliate badge on your Builder profile                   |
| **Engineering Support**     | Direct access to engineering team                                          |
| **Marketing Support**       | Promotion via official Polymarket social accounts                          |
| **Weekly Reward Boosts**    | Multiplier on the weekly USDC rewards program for visible builders         |
| **Priority Access**         | Early access to new features and products                                  |

***

## Tier Comparison

| Feature                     |      Unverified     |       Verified      |       Partner       |
| --------------------------- | :-----------------: | :-----------------: | :-----------------: |
| **Daily Relayer Txn Limit** |       100/day       |      3,000/day      |      Unlimited      |
| **API Rate Limits**         |       Standard      |       Standard      |       Highest       |
| **Subsidized Transactions** |         Yes         |         Yes         |         Yes         |
| **Order Attribution**       |         Yes         |         Yes         |         Yes         |
| **RevShare Protocol**       |          —          |         Yes         |         Yes         |
| **Leaderboard Visibility**  |          —          |         Yes         |         Yes         |
| **Weekly Rewards**          |          —          | Subject to approval | Subject to approval |
| **Grants**                  | Subject to approval | Subject to approval | Subject to approval |
| **Telegram Channel**        |          —          |         Yes         |         Yes         |
| **Badge**                   |          —          |         Yes         |         Yes         |
| **Engineering Support**     |          —          |       Standard      |       Elevated      |
| **Marketing Support**       |          —          |       Standard      |       Elevated      |
| **Priority Access**         |          —          |          —          |         Yes         |

***

## Unverified

<Card title="100 transactions/day" icon="seedling">
  The default tier for all new builders. Start immediately with no approval
  required.
</Card>

**How to get started:**

1. Go to [polymarket.com/settings?tab=builder](https://polymarket.com/settings?tab=builder)
2. Create a builder profile
3. Click **"+ Create New"** to generate API keys
4. Implement [builder signing](/trading/orders/attribution) — required for Relayer access and CLOB order attribution

**What's included:**

* Gasless trading on all CLOB orders through Safe/Proxy wallets
* Gas subsidized on all Relayer transactions up to daily limit (through Safe/Proxy wallets)
* Order attribution to your builder profile
* Access to all client libraries and documentation

***

## Verified

<Card title="3,000 transactions/day" icon="badge-check">
  For builders who need higher throughput. Requires manual approval.
</Card>

**How to upgrade:**

Contact us with:

* Your Builder API Key
* Use case description
* Expected volume
* Links to your app, docs, or X profile

**Unlocks over Unverified:**

* 30x daily Relayer transaction limit
* RevShare Protocol access
* Leaderboard visibility at [builders.polymarket.com](https://builders.polymarket.com)
* Weekly USDC rewards based on volume
* Private Telegram channel for announcements and support
* Verified affiliate badge and promotion from [@PolymarketBuild](https://x.com/PolymarketBuild)
* Grants (subject to approval)

***

## Partner

<Card title="Unlimited transactions/day" icon="handshake">
  Enterprise tier for high-volume integrations and strategic partners.
</Card>

**How to apply:**

Reach out to [builder@polymarket.com](mailto:builder@polymarket.com) to discuss partnership opportunities.

**Unlocks over Verified:**

* Unlimited Relayer transactions
* Highest API rate limits
* Elevated engineering support
* Elevated and coordinated marketing support
* Priority access to new features and products
* Multiplier on the Weekly Rewards Program

***

## How to Upgrade

<Steps>
  <Step title="Build and Launch">
    Start with the Unverified tier and build your integration.
  </Step>

  <Step title="Generate Volume">
    Route orders through Polymarket and demonstrate consistent usage.
  </Step>

  <Step title="Apply for Verification">
    Email [builder@polymarket.com](mailto:builder@polymarket.com) with your
    builder key and use case.
  </Step>

  <Step title="Get Approved">
    The Polymarket team reviews applications and responds within a few business
    days.
  </Step>
</Steps>

## Contact

Ready to upgrade or have questions?

<Card title="builder@polymarket.com" icon="envelope" href="mailto:builder@polymarket.com">
  Email us with your Builder API Key and use case details.
</Card>

## FAQ

<AccordionGroup>
  <Accordion title="How do I know if I am verified">
    Verification is displayed in your [Builder Profile](https://polymarket.com/settings?tab=builder) settings.
  </Accordion>

  <Accordion title="What happens if I exceed my daily limit">
    Relayer requests beyond your daily limit will be rate-limited and return an
    error. Consider upgrading to Verified or Partner tier if you're hitting
    limits.
  </Accordion>

  <Accordion title="Can I get a temporary limit increase">
    For special events or product launches, contact [builder@polymarket.com](mailto:builder@polymarket.com).
  </Accordion>
</AccordionGroup>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Get API Keys" icon="key" href="/builders/api-keys">
    Create your Builder API credentials.
  </Card>

  <Card title="Attribute Orders" icon="tag" href="/trading/orders/attribution">
    Configure your client to credit trades to your account.
  </Card>
</CardGroup>
