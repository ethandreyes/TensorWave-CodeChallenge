//Page navigation/setup
import Tile from "@/components/tiles";

export default function Home() {
  const stockTiles = [
    "AAPL", "ADBE", "AMD", "AMZN", "CSCO",
    "GOOGL", "INTC", "META", "MSFT", "NOW",
    "NVDA", "ORCL", "SHOP", "TSLA", "UBER"
  ];

  return (
    <main style={{  //all text
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px",
    }}
    >
    <h1   style={{ //header/title
    marginBottom: "30px",
    textShadow: `
      -1px -1px 0 #000,
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000
    `,
  }}>
      Homepage
    </h1>

    <div style={{ //tile grid
        display: "grid", 
        gridTemplateColumns: "repeat(5, 1fr)", //set tile grid layout
        gap: "30px",
    }}
    >
    {stockTiles.map((stockSymbol) => ( //map the stock names
      <Tile key={stockSymbol} label={stockSymbol} /> //render tiles
    ))}
    </div>

    <img //ethan logo
      src="/ethanlogo.png"
      alt="logo"
      style={{
        marginTop: "auto",
        opacity: 0.6,        
        width: "200px",
    }}
  />

    <p //footer
    style={{
      fontSize: "12px",
      opacity: 0.6,
    }}
  >
    TensorWave Coding Challenge 
  </p>
    </main>
  );
}