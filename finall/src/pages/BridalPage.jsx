import { BRIDAL, BridalCard } from "../shared.jsx";

export const BridalPage = ({ onAddToCart, user, onOpenAuth }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "28px 24px 60px",
        boxSizing: "border-box",
      }}
    >
      <p style={{ fontSize: 11, color: "var(--brand2)", marginBottom: 14 }}>
        Home › <strong style={{ color: "var(--brand)" }}>Bridal</strong>
      </p>
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          padding: "48px 24px",
          background: `linear-gradient(135deg, rgba(90,55,25,0.06), rgba(90,55,25,0.02))`,
          border: "1px solid var(--brand4)",
          borderRadius: 8,
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: "var(--brand2)",
            letterSpacing: "5px",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          For Your Special Day
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 36,
            color: "var(--brand)",
            marginBottom: 12,
          }}
        >
          Bridal Collections
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "var(--brand1)",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.9,
          }}
        >
          Curated suites designed for the most precious moments of your life.
          Each set crafted with love, for the bride who deserves the best.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {BRIDAL.map((item) => (
          <BridalCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            user={user}
            onOpenAuth={onOpenAuth}
          />
        ))}
      </div>
    </div>
  );
};

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
