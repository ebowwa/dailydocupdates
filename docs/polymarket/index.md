> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Build on the world's largest prediction market. Trade, integrate, and access real-time market data with the Polymarket API.

export const IconCard = ({ icon, title, description, href, color }) => {
  return (
    <a
      className="group flex flex-col p-5 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all duration-200"
      href={href}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg mb-4"
        style={{ backgroundColor: color ? `${color}1A` : "#2E5CFF15" }}
      >
        <img src={"/images/icons/" + icon + ".svg"} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-zinc-400">
        {description}
      </p>
    </a>
  );
};

<svg className=" absolute stroke-black dark:stroke-white opacity-30 dark:opacity-40 top-0 right-0 md:w-[700px] md:h-[700px] w-[300px] h-[300px] pointer-events-none rotate-[-10deg] translate-x-20 md:translate-x-60 -translate-y-0 " width="1000" height="1205" viewBox="0 0 422 509" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.2" d="M399.991 0.832159C406.26 0.015159 410.64 0.654158 414.152 3.32016C417.675 5.99616 419.479 10.0462 420.389 16.3012C421.3 22.5692 421.302 30.9462 421.302 42.1872V465.86C421.302 477.11 421.3 485.492 420.389 491.76C419.479 498.015 417.675 502.06 414.153 504.727C410.631 507.394 406.251 508.037 399.984 507.222C394.49 506.507 387.627 504.683 378.742 502.199L374.809 501.096L27.221 403.558C20.692 401.727 15.839 400.366 12.144 398.847C8.461 397.332 5.977 395.678 4.16 393.287C2.344 390.897 1.42201 388.062 0.960008 384.108C0.496008 380.141 0.500001 375.102 0.500001 368.323V139.725C0.500001 132.946 0.500996 127.907 0.966996 123.939C1.431 119.985 2.353 117.149 4.161 114.759L4.16 114.758C5.977 112.368 8.461 110.715 12.144 109.2C15.839 107.68 20.692 106.32 27.221 104.489L374.809 6.95216C385.638 3.91716 393.71 1.65116 399.991 0.832159ZM374.342 290.988L86.543 371.765L84.828 372.246L86.543 372.728L374.342 453.504L374.978 453.682V290.81L374.342 290.988ZM46.789 173.266L46.807 334.782V335.441L47.441 335.264L335.205 254.505L336.92 254.023L335.205 253.542L47.424 172.784L46.789 172.605V173.266ZM374.342 54.5442L86.543 135.32L84.828 135.802L86.543 136.283L374.342 217.06L374.978 217.237V54.3652L374.342 54.5442Z" />
</svg>

<div className="relative overflow-hidden">
  <div className="relative z-10 py-18 max-w-6xl mx-auto ">
    <h1 className="block text-3xl px-4  md:px-24 font-semibold text-gray-900 dark:text-zinc-50 tracking-tight">
      Polymarket Documentation
    </h1>

    <div className="max-w-2xl px-4  md:px-24 mt-4 text-lg text-gray-500 dark:text-zinc-500">
      Build on the world's largest prediction market. APIs, SDKs, and tools for prediction market developers.
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-4  md:px-24 ">
      <div className="flex flex-col justify-center ">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-50">
          Developer Quickstart
        </h2>

        <p className="mt-3 text-gray-500 dark:text-zinc-400">
          Make your first API request in minutes. Learn the basics of the Polymarket platform, fetch market data, place orders, and redeem winning positions.
        </p>

        <div className="mt-6">
          <a href="/quickstart" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-indigo-700 transition-colors">
            Get Started →
          </a>
        </div>
      </div>

      <CodeGroup>
        ```typescript TypeScript theme={null}
        import { ClobClient, Side } from "@polymarket/clob-client";

        const client = new ClobClient(host, chainId, signer, creds);

        const order = await client.createAndPostOrder(
          { tokenID, price: 0.50, size: 10, side: Side.BUY },
          { tickSize: "0.01", negRisk: false }
        );
        ```

        ```python Python theme={null}
        from py_clob_client.client import ClobClient
        from py_clob_client.order_builder.constants import BUY

        client = ClobClient(host, key=key, chain_id=chain_id, creds=creds)
        order = client.create_and_post_order(
            OrderArgs(token_id=token_id, price=0.50, size=10, side=BUY),
            options={"tick_size": "0.01", "neg_risk": False}
        )
        ```
      </CodeGroup>
    </div>
  </div>

  <div className="max-w-6xl mx-auto px-4  md:px-24">
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">
      Get Familiar with Polymarket
    </h2>

    <p className="mt-2 text-gray-500 dark:text-zinc-400 max-w-2xl">
      Learn the fundamentals, explore our APIs, and start building on the world's largest prediction market.
    </p>

    <div className="mt-8">
      <CardGroup cols={2}>
        <Card title="Quickstart" icon="rocket" href="/quickstart">
          Set up your environment and make your first API call in minutes.
        </Card>

        <Card title="Core Concepts" icon="lightbulb" href="/concepts/markets-events">
          Understand markets, events, tokens, and how trading works.
        </Card>

        <Card title="API Reference" icon="code" href="/api-reference/introduction">
          Explore REST endpoints, WebSocket streams, and authentication.
        </Card>

        <Card title="SDKs" icon="cube" href="/api-reference/clients-sdks">
          Official Python and TypeScript libraries for faster development.
        </Card>
      </CardGroup>
    </div>

    <div className="my-12 ">
      <a href="https://builders.polymarket.com" target="_blank">
        <img src="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/banner.png?fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=d83f2f21e8474e998d8ba0f45810d978" alt="Banner" className="w-full rounded-2xl" data-og-width="2394" width="2394" data-og-height="549" height="549" data-path="images/banner.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/banner.png?w=280&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=bc33dd55b9c23cf14b4cb5c838ddbf8b 280w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/banner.png?w=560&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=1634a07f9d318c56ae22ab36469884e4 560w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/banner.png?w=840&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=42cd26eac1512fb6cb9a5e4246005127 840w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/banner.png?w=1100&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=c9b7ad82701e702fd6636108235ab493 1100w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/banner.png?w=1650&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=121075a6d26595fafb3e82922810fbff 1650w, https://mintcdn.com/polymarket-292d1b1b/FOMte3ewbG-LVy3k/images/banner.png?w=2500&fit=max&auto=format&n=FOMte3ewbG-LVy3k&q=85&s=8eb05e436df24b1078610fa69510ec35 2500w" />
      </a>
    </div>
  </div>

  <div className="max-w-6xl mx-auto px-4  md:px-24 pb-12">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <IconCard icon="medal" title="Builder Program" description="Build apps on Polymarket and earn rewards for driving volume" href="https://builders.polymarket.com" />

      <IconCard icon="quiz" title="Help Desk" description="Get support, report issues, and find answers to common questions" href="https://help.polymarket.com" />

      <IconCard icon="sensor" title="Status" description="Check API uptime, service health, and incident reports" href="https://status.polymarket.com" />
    </div>
  </div>
</div>
