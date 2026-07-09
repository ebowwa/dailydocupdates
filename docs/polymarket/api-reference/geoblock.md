> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Geographic Restrictions

> Check geographic restrictions before placing orders on the Polymarket API

Polymarket restricts order placement from certain geographic locations due to regulatory requirements and compliance with international sanctions. Before placing orders, builders should verify the location.

<Warning>
  Orders submitted from blocked regions will be rejected. Implement geoblock
  checks in your application to provide users with appropriate feedback before
  they attempt to trade.
</Warning>

***

## Geoblock Endpoint

Check the geographic eligibility of the requesting IP address:

```bash theme={null}
GET https://polymarket.com/api/geoblock
```

<Note>This endpoint is on `polymarket.com`, not the API servers.</Note>

### Response

```json theme={null}
{
  "blocked": true,
  "ip": "203.0.113.42",
  "country": "US",
  "region": "NY"
}
```

| Field     | Type    | Description                                     |
| --------- | ------- | ----------------------------------------------- |
| `blocked` | boolean | Whether the user is blocked from placing orders |
| `ip`      | string  | Detected IP address                             |
| `country` | string  | ISO 3166-1 alpha-2 country code                 |
| `region`  | string  | Region/state code                               |

***

## Restricted Jurisdictions

Restrictions fall into three groups. **Block completely** means no new orders and no closing of existing positions. **Close-only** means users can close existing positions but cannot open new ones. Each group notes whether it applies on the frontend, the API, or both. Codes are ISO 3166-1 alpha-2 for countries and ISO 3166-2 for sub-national regions.

### OFAC-Sanctioned Jurisdictions (Block Completely)

Blocked on both the frontend and the API. No new orders, and existing positions cannot be closed.

| Jurisdiction      | Code  |
| ----------------- | ----- |
| Iran              | IR    |
| Syria             | SY    |
| Cuba              | CU    |
| North Korea       | KP    |
| Ukraine — Crimea  | UA-43 |
| Ukraine — Donetsk | UA-14 |
| Ukraine — Luhansk | UA-09 |

### Regulatory-Restricted Jurisdictions (Close-Only on Frontend and API)

Users can close existing positions but cannot open new ones, on both the frontend and the API.

| Jurisdiction                         | Code  |
| ------------------------------------ | ----- |
| Australia                            | AU    |
| Belarus                              | BY    |
| Belgium                              | BE    |
| Burundi                              | BI    |
| Brazil                               | BR    |
| Canada — British Columbia            | CA-BC |
| Canada — Ontario                     | CA-ON |
| Canada — Alberta                     | CA-AB |
| Canada — Quebec                      | CA-QC |
| Central African Republic             | CF    |
| Congo (Kinshasa)                     | CD    |
| Ethiopia                             | ET    |
| France                               | FR    |
| Germany                              | DE    |
| Iraq                                 | IQ    |
| Italy                                | IT    |
| Lebanon                              | LB    |
| Libya                                | LY    |
| Myanmar                              | MM    |
| Nicaragua                            | NI    |
| North Korea                          | KP    |
| Poland                               | PL    |
| Russia                               | RU    |
| Singapore                            | SG    |
| Somalia                              | SO    |
| Slovakia                             | SK    |
| South Sudan                          | SS    |
| Sudan                                | SD    |
| Taiwan                               | TW    |
| Thailand                             | TH    |
| United Kingdom                       | GB    |
| United States                        | US    |
| United States Minor Outlying Islands | UM    |
| Venezuela                            | VE    |
| Yemen                                | YE    |
| Zimbabwe                             | ZW    |

### Regulatory-Restricted Jurisdictions (Close-Only on Frontend)

Close-only on the Polymarket frontend; the API itself is not restricted.

| Jurisdiction        | Code |
| ------------------- | ---- |
| Japan               | JP   |
| Netherlands         | NL   |
| Malta (Sports Only) | MT   |

***

## Blocking Logic

The geoblocking system includes:

1. **OFAC-Sanctioned Countries**: Countries sanctioned by the U.S. Office of Foreign Assets Control (OFAC)
2. **Additional Regulatory Restrictions**: Countries added for specific regulatory compliance reasons

***

## Server Infrastructure

* **Primary Servers**: eu-west-2
* **Closest Non-Georestricted Region**: eu-west-1

<Tip>
  **Direct co-location available.** Users who complete the [KYC/KYB
  form](https://docs.google.com/forms/d/e/1FAIpQLSfY-3Dl3yxq8HKFjFad8YzKZmm0k3Gdg29HD6gL-K-AmI6KXw/viewform) can get access to co-locate
  directly in `eu-west-2` for the lowest possible latency to Polymarket's
  primary servers.
</Tip>

***

## Usage Examples

<Tabs>
  <Tab title="TypeScript">
    ```typescript theme={null}
    interface GeoblockResponse {
      blocked: boolean;
      ip: string;
      country: string;
      region: string;
    }

    async function checkGeoblock(): Promise<GeoblockResponse> {
      const response = await fetch("https://polymarket.com/api/geoblock");
      return response.json();
    }

    // Usage
    const geo = await checkGeoblock();

    if (geo.blocked) {
      console.log(`Trading not available in ${geo.country}`);
    } else {
      console.log("Trading available");
    }
    ```
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    import requests

    def check_geoblock() -> dict:
        response = requests.get("https://polymarket.com/api/geoblock")
        return response.json()

    # Usage
    geo = check_geoblock()

    if geo["blocked"]:
        print(f"Trading not available in {geo['country']}")
    else:
        print("Trading available")
    ```
  </Tab>

  <Tab title="Rust">
    ```rust theme={null}
    use polymarket_client_sdk_v2::clob::{Client, Config};

    let client = Client::new("https://clob.polymarket.com", Config::default())?;
    let geo = client.check_geoblock().await?;

    if geo.blocked {
        println!("Trading not available in {}", geo.country);
    } else {
        println!("Trading available");
    }
    ```
  </Tab>
</Tabs>

***

## Why These Restrictions

Geographic restrictions are implemented to ensure compliance with:

* International sanctions and embargoes
* Local financial regulations
* Gambling and prediction market laws
* Anti-money laundering (AML) requirements
* Know Your Customer (KYC) regulations

If you believe you are incorrectly restricted or have questions about geographic availability, please contact [Polymarket Support](https://polymarket.com/support).

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Authentication" icon="key" href="/api-reference/authentication">
    Learn how to authenticate trading requests.
  </Card>

  <Card title="Place Orders" icon="plus" href="/trading/quickstart">
    Start placing orders (from eligible regions).
  </Card>
</CardGroup>
