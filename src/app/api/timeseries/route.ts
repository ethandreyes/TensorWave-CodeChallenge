export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`,
    {
      next: { revalidate: 86400 }, // 🔥 CACHE FOR 24 HOURS
    }
  );

  const data = await res.json();

  return Response.json(data);
}