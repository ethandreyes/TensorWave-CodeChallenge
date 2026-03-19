// Dashboard tile component
"use client";
import Link from "next/link";

type tileProperties = {
  label: string;
};

export default function Tile({ label }: tileProperties) {
  return (
    <Link
      href={`/stock/${label}`}  //link tiles to respective stock page
      style={{ textDecoration: "none" }}
    >
      <div
        style={{ //tile formatting
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          textAlign: "center",
          color: "black",
          background: "#ffffff",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
          fontSize: "18px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"; //tile animation mech
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <img
          src={`/logos/${label}.png`} //company logo
          alt={`${label} logo`}
          style={{
            height: "40px",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none"; // hide if missing
          }}
        />

        <div>{label}</div>
      </div>
    </Link>
  );
}