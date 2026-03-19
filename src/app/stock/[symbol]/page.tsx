import StockChartData from "@/components/StockChartData";
import Link from "next/link";

//get company overview data
async function getOverview(symbol: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const res = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`,
    {
      next: { revalidate: 86400 },//cache data all day, to refrain from using too many rates
    }
  );

  return res.json();
}

type Props = {
  params: Promise<{
    symbol: string;
  }>;
};

export default async function StockPage({ params }: Props) {
  const { symbol } = await params;

  const overviewData = await getOverview(symbol);

  //check if api limit reached
  const isApiError =
    overviewData?.Information || overviewData?.Note;

  //check data
  const noData = (value: any) =>
    value !== undefined && value !== "" ? value : "N/A";

  //format the data header, to have correct spacing for table
  const formatKey = (key: string) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .trim();
  };

  //format number value, to have correct spacing and commas
  const formatNumber = (value: any) => {
    if (!value || isNaN(value)) return "N/A";
    return Number(value).toLocaleString();
  };

  //format monetary value, especially large money values
  const formatCurrency = (value: any) => {
    if (!value || isNaN(value)) return "N/A";

    const num = Number(value);

    if (num >= 1_000_000_000_000)
      return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    if (num >= 1_000_000_000)
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000)
      return `$${(num / 1_000_000).toFixed(2)}M`;

    return `$${num.toFixed(2)}`;
  };

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div style={{ //back to home button
        marginBottom: "30px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "14px 24px",
              minWidth: "220px",
              backgroundColor: "#ffffff",
              color: "#000",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "800",
              cursor: "pointer",
              textAlign: "center",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            ← Back to Homepage
          </button>
        </Link>
      </div>

      <div
        style={{ //page header
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >

        <h1 style={{ //stock name
          margin: 0 }}>
          {symbol} Stock Details
        </h1>

        <img //stock logo
          src={`/logos/${symbol}.png`}
          alt={`${symbol} logo`}
          style={{
            height: "100px",
            objectFit: "contain",
          }}
        />
      </div>

      <section style={{ //stock description
        marginBottom: "30px" }}>
        <h2>Description</h2>
        <p style={{ lineHeight: "1.6" }}>
          {noData(overviewData.Description)}
        </p>
      </section>

      <section style={{ //company overview data
        marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>
          Company Overview
        </h2>

        {isApiError ? ( //if api error
          <p style={{ color: "red" }}>
            API rate limit reached. Please try again later.
          </p>
        ) : Object.keys(overviewData).length === 0 ? (
          <p>No company data available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              wordBreak: "break-word",
            }}
          >
            {Object.entries(overviewData)
              .filter(([key]) => key !== "Description")
              .map(([key, value]) => {
                let displayValue: any = value;

                if (key === "MarketCapitalization") {
                  displayValue = formatCurrency(value);
                } else if (
                  key.includes("Revenue") ||
                  key.includes("Profit") ||
                  key.includes("EBITDA")
                ) {
                  displayValue = formatCurrency(value);
                } else if (!isNaN(Number(value))) {
                  displayValue = formatNumber(value);
                }

                return (
                  <div key={key}>
                    <strong style={{ color: "#60a5fa" }}>
                      {formatKey(key)}:
                    </strong>
                    <div>{noData(displayValue)}</div>
                  </div>
                );
              })}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ //historical data header, but actually printed in stockchartdata.tsx
          marginBottom: "20px" }}>
          Historical Prices (Last 5 Days)
        </h2>

        <StockChartData symbol={symbol} />
      </section>
    </main>
  );
}