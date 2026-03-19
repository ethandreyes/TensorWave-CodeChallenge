//time_series_daily workaround to not hit rate limit for AlphaVantage API, (historical data + pricing)
"use client";
import { useEffect, useState } from "react";

type Props = {
  symbol: string;
};

export default function StockChartData({ symbol }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //today's price
  const [currentPrice, setCurrentPrice] = useState("N/A");
  const [priceChange, setPriceChange] = useState("N/A");
  const [isPositive, setIsPositive] = useState(false);

  //load and format number with commas
  const formatNumber = (value: any) => {
    if (!value || isNaN(value)) return "N/A";
    return Number(value).toLocaleString();
  };

  //load and format money
  const formatCurrency = (value: any) => {
    if (!value || isNaN(value)) return "N/A";
    return `$${Number(value).toFixed(2)}`;
  };

  //load and format percentages
  const formatPercent = (value: any) => {
    if (value === "N/A") return "N/A";
    const num = Number(value);
    return `${num > 0 ? "+" : ""}${num}%`;
  };

  //api rate limit handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        // delay to avoid rate limit
        await new Promise((res) => setTimeout(res, 60000));

        const res = await fetch(`/api/timeseries?symbol=${symbol}`);

        if (!res.ok) throw new Error("API request failed");

        const json = await res.json();

        if (json?.Note || json?.Information)
        {
          setError("Rate limit reached. Try again later.");
          setLoading(false);
          return;
        }

        const timeSeries = json["Time Series (Daily)"] || {};
        const dates = Object.keys(timeSeries);

        if (dates.length === 0)
          {
          setError("No data available.");
          setLoading(false);
          return;
        }

        // collect data for today's price
        if (dates.length >= 2) {
          const latest = timeSeries[dates[0]];
          const prev = timeSeries[dates[1]];
          const current = parseFloat(latest["4. close"]);
          const previous = parseFloat(prev["4. close"]);

          setCurrentPrice(formatCurrency(current));

          const percent = (
            ((current - previous) / previous) * 100
          ).toFixed(2);

          setPriceChange(percent);
          setIsPositive(current > previous);
        }

        // collect historical price data
        const parsed = dates.slice(0, 5).map((date, index) => {
          const current = timeSeries[date];
          const prev = timeSeries[dates[index + 1]];

          const close = parseFloat(current["4. close"]);
          const prevClose = prev
            ? parseFloat(prev["4. close"])
            : null;

          const percentChange =
            prevClose && close
              ? (((close - prevClose) / prevClose) * 100).toFixed(2)
              : "N/A"; //show n/a if unavail

          return {
            date,
            close,
            volume: current["5. volume"],
            percentChange,
          };
        });

        setData(parsed);
      } catch (err) {
        setError("Failed to fetch data.");
      }

      setLoading(false);
    };

    fetchData(); //collect data of stock
  }, [symbol]);

  //loading animation/text for historical and prices
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "120px",
        }}
      >
        <p style={{ marginBottom: "10px" }}>
          Fetching (time_series_daily) and avoiding AlphaVantage API rate restrictions...
        </p>
        <div className="spinner" />
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "grid", gap: "15px" }}>
      
      <div
        style={{ //Today's Price
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          fontSize: "24px",
        }}
      >
        <strong style={{ color: "#60a5fa" }}>
          Today's Share Price:
        </strong>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "600",
            marginTop: "5px",
            color:
              currentPrice === "N/A" //color of price
                ? "white"
                : isPositive
                ? "green"
                : "red",
          }}
        >
          {currentPrice !== "N/A"
            ? `${currentPrice} (${formatPercent(priceChange)})`
            : "N/A"}
        </div>
      </div>

      <div
        style={{ //historical prices table
          display: "grid",
          gap: "15px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {data.map((item) => (
          <div
            key={item.date}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              padding: "10px",
              borderBottom: "1px solid #444",
            }}
          >
            <div>
              <strong style={{ color: "#60a5fa" }}>Date:</strong>
              <div>{item.date}</div>
            </div>

            <div>
              <strong style={{ color: "#60a5fa" }}>Close:</strong>
              <div>{formatCurrency(item.close)}</div>
            </div>

            <div>
              <strong style={{ color: "#60a5fa" }}>Volume:</strong>
              <div>{formatNumber(item.volume)}</div>
            </div>

            <div>
              <strong style={{ color: "#60a5fa" }}>% Change:</strong>
              <div
                style={{
                  color:
                    item.percentChange === "N/A" //color of change
                      ? "white"
                      : parseFloat(item.percentChange) > 0
                      ? "green"
                      : "red",
                }}
              >
                {formatPercent(item.percentChange)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}