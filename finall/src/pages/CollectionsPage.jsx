import { useState } from "react";
import { PRODUCTS, ProductCard } from "../shared.jsx";

export const CollectionsPage = ({
  onAddToCart,
  onViewProduct,
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [sort, setSort] = useState("Popularity");

  const tabs = [
    { key: "Rings" },
    { key: "Necklaces" },
    { key: "Earrings" },
    { key: "Bracelets" },
    { key: "Bangles" },
    { key: "Chains" },
    { key: "FestiveCombos" },
    { key: "Mangalsutra" },
    { key: "Watches" },
  ];

  const products = PRODUCTS[activeTab] || [];

  const sorted = [...products].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  const currentLabel =
    tabs.find((t) => t.key === activeTab)?.label || activeTab;

  return (
    <div style={{ width: "100%", paddingBottom: 60, boxSizing: "border-box" }}>
      {/* ── Tab bar — full bleed edge to edge ── */}
      <div
        style={{
          width: "100%",
          borderBottom: "2px solid var(--brand4)",
          background: "#fff",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 24px",
            minWidth: "max-content",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                color:
                  activeTab === tab.key ? "var(--brand)" : "rgba(0,0,0,0.45)",
                padding: "14px 20px",
                whiteSpace: "nowrap",
                borderBottom:
                  activeTab === tab.key
                    ? "2px solid var(--brand)"
                    : "2px solid transparent",
                marginBottom: "-2px",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Page content with padding ── */}
      <div style={{ padding: "24px 24px 0", boxSizing: "border-box" }}>
        {/* Breadcrumb + sort row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <p
              style={{ fontSize: 11, color: "var(--brand2)", marginBottom: 6 }}
            >
              Home ›{" "}
              <strong style={{ color: "var(--brand)" }}>Collections</strong> ›{" "}
              {currentLabel}
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--brand)",
                lineHeight: 1,
              }}
            >
              {currentLabel}
            </h1>
            <p style={{ fontSize: 11, color: "var(--brand2)", marginTop: 4 }}>
              {sorted.length} products
            </p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              border: "1px solid var(--brand4)",
              background: "#fff",
              padding: "8px 14px",
              fontFamily: "Montserrat",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--brand)",
              borderRadius: 3,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {[
              "Popularity",
              "Price: Low to High",
              "Price: High to Low",
              "Newest First",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Product grid — 4 per row */}
        <div key={activeTab} className="product-grid-4">
          {sorted.map((product, i) => (
            <div
              key={`${product.id}-${product.img}-${i}`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <ProductCard
                product={product}
                onAdd={onAddToCart}
                onView={onViewProduct}
                user={user}
                onOpenAuth={onOpenAuth}
                isWishlisted={isWishlisted}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: PRODUCT DETAIL ─────────────────────────────────────────────────────
