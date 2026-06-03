import { useState } from "react";
import { PRODUCTS } from "../data/products.js";
import { getDiscount } from "../shared.jsx";

export const ProductCard = ({
  product,
  onAdd,
  onView,
  user,
  onOpenAuth,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [adding, setAdding] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const disc = getDiscount(product.price, product.mrp);
  const wishlisted = isWishlisted ? isWishlisted(product.id) : false;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!user) {
      setLoginPrompt(true);
      setTimeout(() => setLoginPrompt(false), 2500);
      return;
    }
    onAdd(product);
    setAdding(true);
    setTimeout(() => setAdding(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      onOpenAuth && onOpenAuth();
      return;
    }
    onToggleWishlist && onToggleWishlist(product);
  };

  return (
    <div
      className="product-card"
      style={{
        background: "#fff",
        border: "1px solid var(--brand4)",
        borderRadius: 6,
        overflow: "hidden",
        transition: "box-shadow 0.25s, border-color 0.25s, transform 0.25s",
        display: "flex",
        flexDirection: "column",
        animation: "fadeUp 0.5s ease both",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(90,55,25,0.13)";
        e.currentTarget.style.borderColor = "var(--brand3)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--brand4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      onClick={() => onView && onView(product)}
    >
      <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 2,
            background: "var(--brand)",
            color: "rgb(225, 225, 225)",
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 2,
            letterSpacing: "0.5px",
          }}
        >
          {product.tag}
        </div>
        <button
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            zIndex: 2,
            background: "rgba(255,255,255,0.9)",
            border: "none",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 15,
            lineHeight: 1,
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            transition: "transform 0.2s",
          }}
          title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.15)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
        <div
          style={{
            paddingBottom: "100%",
            position: "relative",
            overflow: "hidden",
            background: "#f5f0eb",
          }}
        >
          <img
            src={product.img}
            alt={product.name}
            className="product-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "12px 12px 8px", flex: 1 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#222",
            lineHeight: 1.45,
            marginBottom: 8,
            minHeight: 34,
          }}
        >
          {product.name}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>
            ₹{product.price}
          </span>
          <span
            style={{
              fontWeight: 400,
              fontSize: 11,
              color: "rgba(0,0,0,0.32)",
              textDecoration: "line-through",
            }}
          >
            ₹{product.mrp}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--sale-text)",
              background: "var(--sale-bg)",
              padding: "1px 6px",
              borderRadius: 2,
            }}
          >
            {disc}% OFF
          </span>
        </div>
      </div>

      <div style={{ padding: "0 12px 12px" }}>
        {loginPrompt ? (
          <div
            style={{
              background: "#fff8e1",
              border: "1px solid #ffe082",
              borderRadius: 3,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#e65100",
                marginBottom: 4,
              }}
            >
              🔒 Please login to add items
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAuth && onOpenAuth();
              }}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--brand)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login / Sign Up →
            </button>
          </div>
        ) : (
          <button
            className={`card-btn ${adding ? "added" : ""}`}
            onClick={handleAdd}
          >
            {adding ? "✓ Added" : "Add to Bag"}
          </button>
        )}
      </div>
    </div>
  );
};

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
    { key: "Rings", label: "Rings" },
    { key: "Necklaces", label: "Necklaces" },
    { key: "Earrings", label: "Earrings" },
    { key: "Bracelets", label: "Bracelets" },
    { key: "Bangles", label: "Bangles" },
    { key: "Chains", label: "Chains" },
    { key: "FestiveCombos", label: "Festive Combos" },
    { key: "Mangalsutra", label: "Mangalsutra" },
    { key: "Watches", label: "Watches" },
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
