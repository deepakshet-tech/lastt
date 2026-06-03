/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { PRODUCTS } from "./data/products.js";

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
export const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
export const AnimatedCounter = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.unobserve(el);
          let start = 0;
          const duration = 1800;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
export const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --brand: rgba(90,55,25,1);
      --brand1: rgba(90,55,25,0.7);
      --brand2: rgba(90,55,25,0.45);
      --brand3: rgba(90,55,25,0.25);
      --brand4: rgba(90,55,25,0.12);
      --brand5: rgba(90,55,25,0.04);
      --white: #fff;
      --off: #fafaf8;
      --sale-bg: rgba(90,55,25,0.08);
      --sale-text: rgba(90,55,25,1);
      --green: #2b872f;
      --red: #d24343;
      --grey-light: #f5f0eb;
    }

    html, body, #root {
      width: 100%;
      min-width: 100%;
      margin: 0;
      background: #fff;
    }
    html { min-height: 100%; }
    html, body {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      background: #fff;
      color: #111;
    }
    body {
      min-height: 100vh;
      overscroll-behavior: none;
      overflow-x: hidden;
    }
    #root { min-height: 100vh; }
    a { text-decoration: none; color: inherit; }
    button { font-family: 'Montserrat', sans-serif; cursor: pointer; }
    img { max-width: 100%; display: block; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeLeft {
      from { opacity: 0; transform: translateX(-32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeRight {
      from { opacity: 0; transform: translateX(32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to   { transform: translateX(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33%  { transform: translateY(-14px) rotate(3deg); }
      66%  { transform: translateY(-7px) rotate(-2deg); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%  { transform: scale(1.06); opacity: 0.85; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes bounceIn {
      0%   { opacity: 0; transform: scale(0.3); }
      50%  { transform: scale(1.08); }
      70%  { transform: scale(0.96); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes ripple {
      0%   { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(4); opacity: 0; }
    }
    @keyframes typewriter {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes starTwinkle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }
    @keyframes particleDrift {
      0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7; }
      100% { transform: translateY(-120px) translateX(40px) rotate(360deg); opacity: 0; }
    }

    /* ── Intersection-triggered reveal classes ── */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left {
      opacity: 0;
      transform: translateX(-36px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right {
      opacity: 0;
      transform: translateX(36px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }
    .reveal-scale {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal-scale.visible { opacity: 1; transform: scale(1); }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--brand4); }
    ::-webkit-scrollbar-thumb { background: var(--brand2); border-radius: 3px; }

    /* ── Layout utility ── */
    .page-container {
      width: 100%;
      padding: 0 24px;
      box-sizing: border-box;
    }
    @media (max-width: 600px) {
      .page-container { padding: 0 12px; }
    }

    /* ── Navbar ── */
    .navbar-outer {
      width: 100%;
      background: #fff;
      border-bottom: 1px solid var(--brand4);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar-inner {
      width: 100%;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
    }
    .navbar-logo {
      flex: 0 0 auto;
      cursor: pointer;
      text-align: left;
    }
    .navbar-links {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
    }
    .navbar-icons {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .subnav-inner {
      width: 100%;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 0;
      box-sizing: border-box;
      justify-content: space-between;
    }
    @media (max-width: 768px) {
      .navbar-inner {
        height: auto;
        padding: 10px 12px 6px;
        flex-wrap: wrap;
        gap: 8px;
      }
      .navbar-links {
        order: 3;
        flex: 0 0 100%;
        justify-content: flex-start;
        overflow-x: auto;
        padding-top: 4px;
      }
      .nav-link {
        padding: 8px 10px;
        font-size: 10px;
      }
      .subnav-inner { padding: 0 12px; }
      .page-container { padding: 0 12px; }
    }

    .nav-link {
      background: none; border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 11px;
      letter-spacing: 0.8px; text-transform: uppercase;
      padding: 8px 13px;
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
      color: rgba(90,55,25,0.5);
      white-space: nowrap;
    }
    .nav-link:hover, .nav-link.active {
      color: var(--brand);
      border-bottom-color: var(--brand);
    }
    .subnav-btn {
      background: none; border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 10.5px;
      color: rgba(0,0,0,0.65); padding: 10px 14px; white-space: nowrap;
      border-bottom: 2px solid transparent; transition: all 0.2s;
    }
    .subnav-btn:hover {
      color: var(--brand);
      border-bottom-color: var(--brand);
    }
    .subnav-btn.active {
      color: var(--brand);
      border-bottom-color: var(--brand);
    }
    /* ── Product grids ── */
    .product-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    @media (max-width: 900px) {
      .product-grid-4 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 480px) {
      .product-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    }
    @media (max-width: 640px) {
      .home-hero-actions {
        width: 100%;
        flex-direction: column;
        align-items: stretch;
      }
      .home-hero-actions button {
        width: 100%;
      }
      .home-stats {
        width: 100%;
        gap: 16px !important;
        justify-content: space-between !important;
      }
      .home-stats > div {
        flex: 1 1 0;
      }
      .home-category-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 10px !important;
      }
      .responsive-section-header {
        align-items: flex-start !important;
        flex-direction: column;
        gap: 14px;
      }
      .responsive-section-header button {
        width: 100%;
      }
      .promo-banner {
        align-items: stretch !important;
        padding: 22px 18px !important;
      }
      .promo-banner button {
        width: 100%;
      }
      .product-card p {
        word-break: break-word;
      }
      .card-btn {
        font-size: 9px;
        letter-spacing: 0.8px;
        padding: 9px 4px;
      }
    }
    @media (max-width: 380px) {
      .product-grid-4 {
        grid-template-columns: 1fr;
      }
      .home-category-grid {
        grid-template-columns: 1fr !important;
      }
    }
    /* ── Card button ── */
    .card-btn {
      width: 100%; padding: 10px 0; border: 1.5px solid var(--brand);
      background: #fff; color: var(--brand);
      font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 10px;
      letter-spacing: 1.5px; text-transform: uppercase; border-radius: 2px;
      cursor: pointer; transition: all 0.22s ease;
    }
    .card-btn:hover { background: var(--brand); color: #fff; }
    .card-btn.added { background: var(--brand); color: #fff; }
    .product-img { transition: transform 0.45s ease; }
    .product-card:hover .product-img { transform: scale(1.06); }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
export { PRODUCTS };

export const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    city: "Mumbai",
    text: "Absolutely gorgeous quality! The necklace I ordered looks way more expensive than what I paid. Delivered in 3 days. 10/10!",
    stars: 5,
  },
  {
    name: "Sunita Rathod",
    city: "Rajkot",
    text: "Shets Jewellers is my go-to for every festival. The Navratri combo was stunning and received so many compliments!",
    stars: 5,
  },
  {
    name: "Anjali Sharma",
    city: "Ahmedabad",
    text: "Custom order for my wedding was handled so professionally. The earrings were exactly what I imagined. Highly recommended.",
    stars: 5,
  },
  {
    name: "Kavita Patel",
    city: "Surat",
    text: "Cash on delivery option is very convenient. The gold plated ring is beautiful and hasn't tarnished even after 3 months.",
    stars: 5,
  },
  {
    name: "Deepa Joshi",
    city: "Vadodara",
    text: "Best bridal jewellery at this price point in India. The Duchess set turned heads at my reception. Worth every rupee!",
    stars: 5,
  },
  {
    name: "Reena Bhanushali",
    city: "Jamnagar",
    text: "Fast delivery, great packaging, and the product quality is excellent. The jhumkas are my favourite pair now!",
    stars: 5,
  },
];

export const getDiscount = (price, mrp) =>
  Math.round(((mrp - price) / mrp) * 100);

export const getProductImages = (product) => {
  const providedImages = product.images || product.gallery || [];
  return [...new Set([product.img, ...providedImages].filter(Boolean))];
};

export const getRelatedProducts = (product, limit = 4) => {
  const sourceCategory = Object.values(PRODUCTS).find((items) =>
    items.some((item) => item === product || item.img === product.img)
  );

  const allProducts = Object.values(PRODUCTS).flat();
  const products = sourceCategory || allProducts;
  const productIndex = products.findIndex(
    (item) => item === product || item.img === product.img
  );
  const orderedProducts =
    productIndex >= 0
      ? [
          ...products.slice(productIndex + 1),
          ...products.slice(0, productIndex),
        ]
      : products;

  return orderedProducts
    .filter((item) => item !== product && item.img !== product.img)
    .filter(
      (item, index, items) =>
        items.findIndex((candidate) => candidate.img === item.img) === index
    )
    .slice(0, limit);
};

export const getProductGalleryItems = (product) => {
  const imageItems = getProductImages(product).map((img) => ({
    img,
    product,
    isCurrentProduct: true,
  }));
  const relatedItems = getRelatedProducts(
    product,
    Math.max(0, 4 - imageItems.length)
  ).map((item) => ({
    img: item.img,
    product: item,
    isCurrentProduct: false,
  }));

  return [...imageItems, ...relatedItems].slice(0, 4);
};

// Sub-nav category to PRODUCTS key mapping
export const SUBNAV_MAP = {
  BANGLES: "Bangles",
  RINGS: "Rings",
  CHAIN: "Chains",
  "FESTIVE COMBOS": "FestiveCombos",
  MANGALSUTRA: "Mangalsutra",
  WATCHES: "Watches",
  NECKLACE: "Necklaces",
  EARRINGS: "Earrings",
  BRACELETS: "Bracelets",
};

// ─── SEARCH MODAL ─────────────────────────────────────────────────────────────
export const SEARCH_SUGGESTIONS = {
  ring: ["Gold Ring", "Diamond Ring", "Adjustable Ring", "Floral Ring"],
  necklace: [
    "Necklace Set",
    "Pearl Necklace",
    "Long Chain Necklace",
    "Bahubali Chain",
  ],
  earring: [
    "Jhumka Earrings",
    "Stud Earrings",
    "Drop Earrings",
    "Hoop Earrings",
  ],
  bangle: [
    "Gold Bangle Set",
    "Stone Bangle",
    "Kundan Bangle",
    "Twisted Bangle",
  ],
  bracelet: [
    "Charm Bracelet",
    "Gold Bracelet",
    "Butterfly Bracelet",
    "Bangle Bracelet",
  ],
  chain: ["Gold Chain", "Rope Chain", "Box Chain", "Figaro Chain"],
  mangalsutra: [
    "Black Bead Mangalsutra",
    "Diamond Mangalsutra",
    "Long Chain Mangalsutra",
  ],
  watch: ["Gold Watch", "Rose Gold Watch", "Diamond Watch", "Bangle Watch"],
  bridal: ["Bridal Set", "Bridal Necklace", "Bridal Earrings", "Bridal Combo"],
  gold: ["Gold Ring", "Gold Chain", "Gold Bangle", "Gold Necklace"],
};

export const TRENDING = [
  "Jhumka Earrings",
  "Mangalsutra",
  "Bridal Set",
  "Gold Bangle",
  "Pearl Necklace",
  "Diamond Ring",
];
export const CATEGORIES_QUICK = [
  { label: "Rings", emoji: "💍" },
  { label: "Necklaces", emoji: "📿" },
  { label: "Earrings", emoji: "✨" },
  { label: "Bangles", emoji: "🌸" },
  { label: "Watches", emoji: "⌚" },
  { label: "Bridal", emoji: "👰" },
];

export const SearchModal = ({ onClose, onViewProduct }) => {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(["Gold Ring", "Jhumka"]);
  const allProducts = Object.values(PRODUCTS).flat();

  // Smart filtering: match name words
  const results =
    query.length > 1
      ? allProducts
          .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 8)
      : [];

  // Autocomplete suggestions based on keyword
  const suggestions =
    query.length > 0
      ? Object.entries(SEARCH_SUGGESTIONS)
          .filter(
            ([key]) =>
              key.startsWith(query.toLowerCase()) ||
              query.toLowerCase().includes(key)
          )
          .flatMap(([, vals]) => vals)
          .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      : [];

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const handleSearch = (term) => {
    setQuery(term);
    setRecent((prev) => [term, ...prev.filter((r) => r !== term)].slice(0, 5));
  };

  const handleSelect = (product) => {
    setRecent((prev) =>
      [product.name, ...prev.filter((r) => r !== product.name)].slice(0, 5)
    );
    onViewProduct(product);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 70,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "94%",
          maxWidth: 600,
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          animation: "fadeUp 0.22s ease",
        }}
      >
        {/* ── Search Input Bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 18px",
            borderBottom: "1px solid var(--brand4)",
            gap: 10,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: "var(--brand)", flexShrink: 0 }}
          >
            <path
              d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) handleSelect(results[0]);
            }}
            placeholder="Search rings, necklaces, bangles, bridal sets..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "Montserrat",
              color: "#111",
              background: "transparent",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--brand2)",
                fontSize: 18,
                lineHeight: 1,
                padding: "0 4px",
              }}
            >
              ×
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: "var(--brand5)",
              border: "1px solid var(--brand4)",
              borderRadius: 4,
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--brand)",
              fontFamily: "Montserrat",
            }}
          >
            ESC
          </button>
        </div>

        <div style={{ maxHeight: 480, overflowY: "auto" }}>
          {/* ── Autocomplete suggestions (while typing, before results) ── */}
          {query.length > 0 &&
            suggestions.length > 0 &&
            results.length === 0 && (
              <div style={{ padding: "12px 18px 4px" }}>
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--brand2)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Suggestions
                </p>
                {suggestions.map((s) => (
                  <div
                    key={s}
                    onClick={() => handleSearch(s)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--brand5)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ color: "var(--brand2)", flexShrink: 0 }}
                    >
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{ fontSize: 13, color: "#333" }}>{s}</span>
                  </div>
                ))}
              </div>
            )}

          {/* ── Search Results ── */}
          {results.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: "var(--brand2)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  padding: "14px 18px 6px",
                }}
              >
                {results.length} Result{results.length !== 1 ? "s" : ""} for "
                {query}"
              </p>
              {results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 18px",
                    cursor: "pointer",
                    borderBottom: "1px solid var(--brand4)",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--brand5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: "cover",
                      borderRadius: 6,
                      flexShrink: 0,
                      border: "1px solid var(--brand4)",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#111",
                        marginBottom: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--brand)",
                        }}
                      >
                        ₹{p.price}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(0,0,0,0.3)",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{p.mrp}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "var(--sale-text)",
                          background: "var(--sale-bg)",
                          padding: "1px 5px",
                          borderRadius: 2,
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--brand2)", flexShrink: 0 }}
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {/* ── No results ── */}
          {query.length > 1 &&
            results.length === 0 &&
            suggestions.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 20px" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--brand)",
                    marginBottom: 6,
                  }}
                >
                  No results for "{query}"
                </p>
                <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                  Try "ring", "necklace", "bangle" or browse categories below
                </p>
              </div>
            )}

          {/* ── Default state: no query ── */}
          {query.length === 0 && (
            <div style={{ padding: "16px 18px 20px" }}>
              {/* Recent */}
              {recent.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: "var(--brand2)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}
                    >
                      Recent Searches
                    </p>
                    <span
                      onClick={() => setRecent([])}
                      style={{
                        fontSize: 10,
                        color: "var(--brand)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Clear
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {recent.map((r) => (
                      <span
                        key={r}
                        onClick={() => handleSearch(r)}
                        style={{
                          padding: "6px 13px",
                          border: "1px solid var(--brand4)",
                          borderRadius: 20,
                          fontSize: 11,
                          cursor: "pointer",
                          color: "#444",
                          background: "#fafaf8",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--brand5)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fafaf8")
                        }
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div style={{ marginBottom: 20 }}>
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--brand2)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  🔥 Trending Now
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TRENDING.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleSearch(tag)}
                      style={{
                        padding: "6px 14px",
                        border: "1px solid var(--brand3)",
                        borderRadius: 20,
                        fontSize: 11,
                        cursor: "pointer",
                        color: "var(--brand)",
                        background: "var(--brand5)",
                        fontWeight: 500,
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--brand)";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderColor = "var(--brand)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--brand5)";
                        e.currentTarget.style.color = "var(--brand)";
                        e.currentTarget.style.borderColor = "var(--brand3)";
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "var(--brand2)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Browse Categories
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {CATEGORIES_QUICK.map((cat) => (
                    <div
                      key={cat.label}
                      onClick={() => handleSearch(cat.label)}
                      style={{
                        padding: "10px 8px",
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        background: "#fafaf8",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--brand5)";
                        e.currentTarget.style.borderColor = "var(--brand3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fafaf8";
                        e.currentTarget.style.borderColor = "var(--brand4)";
                      }}
                    >
                      <div style={{ fontSize: 20, marginBottom: 4 }}>
                        {cat.emoji}
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--brand)",
                        }}
                      >
                        {cat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
export const CartDrawer = ({
  items,
  onClose,
  onRemove,
  onClear,
  onPlaceOrder,
  user,
  onSaveProfileAddress,
  onOpenAuth,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [addressError, setAddressError] = useState("");
  const [address, setAddress] = useState({
    name: user?.name || "",
    phone: "",
    line1: "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const total = items.reduce(
    (sum, item) => sum + (typeof item.price === "number" ? item.price : 0),
    0
  );
  const paymentMethods = [
    "Cash on Delivery",
    "UPI",
    "Credit / Debit Card",
    "Net Banking",
  ];

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const startCheckout = () => {
    setCheckoutStep("address");
    setAddressError("");
  };

  const confirmAddress = () => {
    const missing = Object.entries(address).find(([, value]) => !value.trim());
    if (missing) {
      setAddressError("Please fill all address details before payment.");
      return;
    }
    if (!/^\d{6}$/.test(address.pincode.trim())) {
      setAddressError("Enter a valid 6 digit pincode.");
      return;
    }
    setAddressError("");
    onSaveProfileAddress?.({
      ...address,
      name: address.name.trim(),
      phone: address.phone.trim(),
      line1: address.line1.trim(),
      city: address.city.trim(),
      pincode: address.pincode.trim(),
    });
    setCheckoutStep("payment");
  };

  const handleCheckout = () => {
    const orderId = "SJ" + Math.floor(100000 + Math.random() * 900000);
    const deliveryDate = new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const date = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const details = {
      orderId,
      deliveryDate,
      date,
      total,
      count: items.length,
      name: user.name,
      items: [...items],
      address: { ...address },
      paymentMethod,
    };
    setOrderDetails(details);
    setOrderPlaced(true);
    onPlaceOrder(details);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 998,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: 390,
          maxWidth: "96vw",
          background: "#fff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
          animation: "slideInRight 0.28s ease",
        }}
      >
        {/* ── ORDER CONFIRMED screen ── */}
        {orderPlaced ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                fontSize: 36,
              }}
            >
              ✅
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--brand)",
                marginBottom: 8,
              }}
            >
              Order Confirmed!
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#333",
                marginBottom: 20,
                lineHeight: 1.7,
              }}
            >
              Thank you, <strong>{orderDetails?.name}</strong>! Your order has
              been placed successfully.
            </p>
            <div
              style={{
                width: "100%",
                background: "var(--brand5)",
                border: "1px solid var(--brand4)",
                borderRadius: 8,
                padding: "16px 18px",
                marginBottom: 20,
                textAlign: "left",
              }}
            >
              {[
                { label: "Order ID", value: orderDetails?.orderId },
                {
                  label: "Items Ordered",
                  value: `${orderDetails?.count} item${
                    orderDetails?.count !== 1 ? "s" : ""
                  }`,
                },
                { label: "Amount Paid", value: `₹${orderDetails?.total}` },
                {
                  label: "Estimated Delivery",
                  value: orderDetails?.deliveryDate,
                },
                { label: "Payment", value: orderDetails?.paymentMethod },
                {
                  label: "Delivery To",
                  value: orderDetails?.address
                    ? `${orderDetails.address.line1}, ${orderDetails.address.city} - ${orderDetails.address.pincode}`
                    : user?.email,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    borderBottom: "1px solid var(--brand4)",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--brand2)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{ fontSize: 12, fontWeight: 600, color: "#111" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#e8f5e9",
                border: "1px solid #c8e6c9",
                borderRadius: 6,
                padding: "12px 16px",
                width: "100%",
                marginBottom: 20,
                fontSize: 12,
                color: "#2e7d32",
                lineHeight: 1.6,
              }}
            >
              📱 A confirmation has been sent to <strong>{user?.email}</strong>.
              Track your order via WhatsApp: <strong>+91 76006 59791</strong>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "13px",
                background: "var(--brand)",
                color: "#fff",
                border: "none",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                padding: "18px 20px 14px",
                borderBottom: "1px solid var(--brand4)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--brand)",
                  }}
                >
                  Your Bag
                </h2>
                <p
                  style={{ fontSize: 11, color: "var(--brand2)", marginTop: 2 }}
                >
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "1px solid var(--brand4)",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  fontSize: 18,
                  color: "var(--brand1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Items list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 20px" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 64 }}>
                  <div style={{ fontSize: 52, marginBottom: 14 }}>🛍️</div>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--brand)",
                      marginBottom: 6,
                    }}
                  >
                    Your bag is empty
                  </p>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    Add some beautiful jewellery!
                  </p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "12px 0",
                      borderBottom: "1px solid var(--brand4)",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: 58,
                        height: 58,
                        objectFit: "cover",
                        borderRadius: 6,
                        flexShrink: 0,
                        border: "1px solid var(--brand4)",
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#111",
                          marginBottom: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--brand)",
                        }}
                      >
                        ₹{item.price}
                      </p>
                      {item.tag && (
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: "var(--sale-text)",
                            background: "var(--sale-bg)",
                            padding: "1px 5px",
                            borderRadius: 2,
                            marginTop: 3,
                            display: "inline-block",
                          }}
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onRemove(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--brand2)",
                        fontSize: 18,
                        padding: "0 4px",
                        flexShrink: 0,
                        alignSelf: "flex-start",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--red)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--brand2)")
                      }
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "16px 20px",
                  borderTop: "1px solid var(--brand4)",
                  background: "#fafaf8",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--brand1)" }}>
                    Subtotal ({items.length} items)
                  </span>
                  <span
                    style={{ fontSize: 15, fontWeight: 700, color: "#111" }}
                  >
                    ₹{total}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--green)",
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  ✓ Free delivery on this order · COD available
                </p>

                {/* NOT LOGGED IN — show login prompt */}
                {!user ? (
                  <div>
                    <div
                      style={{
                        background: "#fff8e1",
                        border: "1px solid #ffe082",
                        borderRadius: 6,
                        padding: "12px 14px",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
                      <div>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#e65100",
                            marginBottom: 3,
                          }}
                        >
                          Please login to place your order
                        </p>
                        <p
                          style={{
                            fontSize: 11,
                            color: "#bf360c",
                            lineHeight: 1.5,
                          }}
                        >
                          Create an account or sign in to securely checkout and
                          track your order.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      style={{
                        width: "100%",
                        padding: "13px",
                        background: "var(--brand)",
                        color: "#fff",
                        border: "none",
                        fontFamily: "Montserrat",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                        marginBottom: 8,
                        display: checkoutStep === "cart" ? "block" : "none",
                      }}
                    >
                      Login / Sign Up to Checkout
                    </button>
                    <button
                      onClick={onClear}
                      style={{
                        width: "100%",
                        padding: "9px",
                        background: "none",
                        color: "var(--brand2)",
                        border: "1px solid var(--brand4)",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                      }}
                    >
                      Clear Bag
                    </button>
                  </div>
                ) : (
                  /* LOGGED IN — show checkout */
                  <div>
                    <div
                      style={{
                        background: "#e8f5e9",
                        border: "1px solid #c8e6c9",
                        borderRadius: 6,
                        padding: "8px 12px",
                        marginBottom: 12,
                        fontSize: 11,
                        color: "#2e7d32",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span>✓</span> Ordering as <strong>{user.name}</strong>
                    </div>
                    {checkoutStep !== "cart" && (
                      <div
                        style={{
                          background: "#fff",
                          border: "1px solid var(--brand4)",
                          borderRadius: 8,
                          padding: 12,
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 8,
                            marginBottom: 12,
                          }}
                        >
                          {["Address", "Payment"].map((step, index) => {
                            const active =
                              (checkoutStep === "address" && index === 0) ||
                              (checkoutStep === "payment" && index === 1);
                            const done =
                              checkoutStep === "payment" && index === 0;
                            return (
                              <div
                                key={step}
                                style={{
                                  padding: "8px 10px",
                                  borderRadius: 4,
                                  background:
                                    active || done
                                      ? "var(--brand)"
                                      : "var(--brand5)",
                                  color:
                                    active || done ? "#fff" : "var(--brand1)",
                                  fontSize: 10,
                                  fontWeight: 800,
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}. {step}
                              </div>
                            );
                          })}
                        </div>

                        {checkoutStep === "address" && (
                          <div>
                            <p
                              style={{
                                fontSize: 12,
                                fontWeight: 800,
                                color: "var(--brand)",
                                marginBottom: 10,
                              }}
                            >
                              Confirm Delivery Address
                            </p>
                            {[
                              ["name", "Full Name"],
                              ["phone", "Mobile Number"],
                              ["line1", "House / Street Address"],
                              ["city", "City"],
                              ["pincode", "Pincode"],
                            ].map(([key, label]) => (
                              <input
                                key={key}
                                value={address[key]}
                                onChange={(e) => {
                                  setAddress((prev) => ({
                                    ...prev,
                                    [key]: e.target.value,
                                  }));
                                  setAddressError("");
                                }}
                                placeholder={label}
                                maxLength={key === "pincode" ? 6 : undefined}
                                style={{
                                  width: "100%",
                                  padding: "10px 11px",
                                  border: "1px solid var(--brand4)",
                                  borderRadius: 4,
                                  marginBottom: 8,
                                  fontFamily: "Montserrat",
                                  fontSize: 12,
                                  outline: "none",
                                }}
                              />
                            ))}
                            {addressError && (
                              <p
                                style={{
                                  fontSize: 11,
                                  color: "var(--red)",
                                  marginBottom: 10,
                                }}
                              >
                                {addressError}
                              </p>
                            )}
                            <button
                              onClick={confirmAddress}
                              style={{
                                width: "100%",
                                padding: "12px",
                                background: "var(--brand)",
                                color: "#fff",
                                border: "none",
                                borderRadius: 3,
                                fontFamily: "Montserrat",
                                fontWeight: 700,
                                fontSize: 10,
                                letterSpacing: "1.5px",
                                textTransform: "uppercase",
                              }}
                            >
                              Deliver Here
                            </button>
                          </div>
                        )}

                        {checkoutStep === "payment" && (
                          <div>
                            <p
                              style={{
                                fontSize: 12,
                                fontWeight: 800,
                                color: "var(--brand)",
                                marginBottom: 10,
                              }}
                            >
                              Select Payment Type
                            </p>
                            <div style={{ display: "grid", gap: 8 }}>
                              {paymentMethods.map((method) => (
                                <button
                                  key={method}
                                  onClick={() => setPaymentMethod(method)}
                                  style={{
                                    width: "100%",
                                    padding: "11px 12px",
                                    border: `1px solid ${
                                      paymentMethod === method
                                        ? "var(--brand)"
                                        : "var(--brand4)"
                                    }`,
                                    borderRadius: 4,
                                    background:
                                      paymentMethod === method
                                        ? "var(--brand5)"
                                        : "#fff",
                                    color: "#111",
                                    fontFamily: "Montserrat",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    textAlign: "left",
                                    cursor: "pointer",
                                  }}
                                >
                                  {paymentMethod === method ? "●" : "○"}{" "}
                                  {method}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={() => setCheckoutStep("address")}
                              style={{
                                width: "100%",
                                padding: "9px",
                                background: "none",
                                color: "var(--brand2)",
                                border: "none",
                                fontFamily: "Montserrat",
                                fontWeight: 700,
                                fontSize: 10,
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                marginTop: 4,
                              }}
                            >
                              Change Address
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      onClick={
                        checkoutStep === "payment"
                          ? handleCheckout
                          : startCheckout
                      }
                      style={{
                        width: "100%",
                        padding: "13px",
                        background: "var(--brand)",
                        color: "#fff",
                        border: "none",
                        fontFamily: "Montserrat",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                        marginBottom: 8,
                      }}
                    >
                      Place Order — ₹{total}
                    </button>
                    <button
                      onClick={onClear}
                      style={{
                        width: "100%",
                        padding: "9px",
                        background: "none",
                        color: "var(--brand2)",
                        border: "1px solid var(--brand4)",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        borderRadius: 3,
                        cursor: "pointer",
                      }}
                    >
                      Clear Bag
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ─── LOGIN / PROFILE MODAL ────────────────────────────────────────────────────
export const AuthModal = ({
  onClose,
  user,
  onLogin,
  onUpdateUser,
  onLogout,
  orders,
  wishlist,
  onRemoveWishlist,
}) => {
  const [mode, setMode] = useState(user ? "profile" : "login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [reviewForm, setReviewForm] = useState({
    product: "",
    rating: 5,
    comment: "",
  });
  const [reviews, setReviews] = useState([]);
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newAddr, setNewAddr] = useState({
    label: "",
    line1: "",
    line2: "",
    phone: "",
  });
  const [addingAddr, setAddingAddr] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    setMode(user ? "profile" : "login");
    setAddresses(user?.addresses || []);
  }, [user]);
  useEffect(() => {
    const fn = (e) =>
      e.key === "Escape" &&
      (mode === "profile"
        ? onClose()
        : mode === "login" || mode === "signup"
        ? onClose()
        : setMode("profile"));
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [mode]);

  const handleLogin = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const name = form.email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    onLogin({
      name,
      email: form.email,
      avatar: name[0].toUpperCase(),
      joinDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      }),
    });
    setSuccess("Login successful! Welcome back.");
    setTimeout(() => {
      setSuccess("");
      setMode("profile");
    }, 1200);
  };

  const handleSignup = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.password || form.password.length < 6)
      errs.password = "Password must be 6+ characters";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onLogin({
      name: form.name,
      email: form.email,
      avatar: form.name[0].toUpperCase(),
      joinDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      }),
    });
    setSuccess("Account created! Welcome to Shets Jewellers 🎉");
    setTimeout(() => {
      setSuccess("");
      setMode("profile");
    }, 1500);
  };

  const submitReview = () => {
    if (!reviewForm.product || !reviewForm.comment) return;
    setReviews((prev) => [
      {
        ...reviewForm,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...prev,
    ]);
    setReviewForm({ product: "", rating: 5, comment: "" });
    setSuccess("Review submitted! Thank you.");
    setTimeout(() => setSuccess(""), 2000);
  };

  const saveAddress = () => {
    if (!newAddr.label || !newAddr.line1) return;
    setAddresses((prev) => {
      const next = [
        ...prev,
        { ...newAddr, id: Date.now(), default: prev.length === 0 },
      ];
      onUpdateUser?.({ addresses: next });
      return next;
    });
    setNewAddr({ label: "", line1: "", line2: "", phone: "" });
    setAddingAddr(false);
  };

  const deleteAddress = (id) =>
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      onUpdateUser?.({ addresses: next });
      return next;
    });
  const setDefault = (id) =>
    setAddresses((prev) => {
      const next = prev.map((a) => ({ ...a, default: a.id === id }));
      onUpdateUser?.({ addresses: next });
      return next;
    });

  // shared input style
  const inp = (err) => ({
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${err ? "var(--red)" : "var(--brand4)"}`,
    borderRadius: 3,
    fontFamily: "Montserrat",
    fontSize: 12,
    outline: "none",
    boxSizing: "border-box",
  });
  const lbl = {
    display: "block",
    fontSize: 9.5,
    fontWeight: 700,
    color: "var(--brand1)",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: 5,
  };

  const subModes = ["orders", "wishlist", "addresses", "reviews"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(3px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: subModes.includes(mode) ? 520 : 420,
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          animation: "fadeUp 0.25s ease",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background: "var(--brand)",
            padding: "22px 24px 18px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {subModes.includes(mode) && (
              <button
                onClick={() => setMode("profile")}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ←
              </button>
            )}
            <div
              style={{
                flex: 1,
                textAlign: subModes.includes(mode) ? "left" : "center",
              }}
            >
              {!subModes.includes(mode) && (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {user ? user.avatar : "👤"}
                </div>
              )}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                {mode === "profile"
                  ? `Hello, ${user?.name}!`
                  : mode === "orders"
                  ? "My Orders"
                  : mode === "wishlist"
                  ? "My Wishlist"
                  : mode === "addresses"
                  ? "My Addresses"
                  : mode === "reviews"
                  ? "My Reviews"
                  : mode === "login"
                  ? "Welcome Back"
                  : "Create Account"}
              </p>
              {mode === "profile" && (
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 2,
                  }}
                >
                  {user?.email}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                fontSize: 16,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 24px 24px" }}>
          {success && (
            <div
              style={{
                background: "#e8f5e9",
                border: "1px solid #c8e6c9",
                borderRadius: 6,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 12,
                color: "#2e7d32",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              ✓ {success}
            </div>
          )}

          {/* ═══ PROFILE HOME ═══ */}
          {mode === "profile" && user && (
            <div>
              <div
                style={{
                  background: "var(--brand5)",
                  border: "1px solid var(--brand4)",
                  borderRadius: 8,
                  padding: "14px 16px",
                  marginBottom: 16,
                }}
              >
                {[
                  ["Full Name", user.name],
                  ["Email", user.email],
                  ["Member ID", user.memberId],
                  ["Member Since", user.joinDate],
                  ["Last Login", user.lastLogin],
                  ["Password Strength", user.passwordStrength],
                  ["Status", "Gold Member ✨"],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "7px 0",
                        borderBottom: "1px solid var(--brand4)",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "var(--brand2)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {k}
                      </span>
                      <span
                        style={{ fontSize: 12, fontWeight: 600, color: "#111" }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                {[
                  {
                    icon: "📦",
                    label: "My Orders",
                    mode: "orders",
                    count: orders.length,
                  },
                  {
                    icon: "❤️",
                    label: "Wishlist",
                    mode: "wishlist",
                    count: wishlist.length,
                  },
                  {
                    icon: "🏠",
                    label: "Addresses",
                    mode: "addresses",
                    count: addresses.length,
                  },
                  {
                    icon: "⭐",
                    label: "My Reviews",
                    mode: "reviews",
                    count: reviews.length,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setMode(item.mode)}
                    style={{
                      background: "var(--brand5)",
                      border: "1px solid var(--brand4)",
                      borderRadius: 8,
                      padding: "14px 10px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.18s",
                      fontFamily: "Montserrat",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--brand4)";
                      e.currentTarget.style.borderColor = "var(--brand3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--brand5)";
                      e.currentTarget.style.borderColor = "var(--brand4)";
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>
                      {item.icon}
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--brand)",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: 10, color: "var(--brand2)" }}>
                      {item.count} item{item.count !== 1 ? "s" : ""}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                style={{
                  width: "100%",
                  padding: "11px",
                  background: "#fff",
                  color: "var(--red)",
                  border: "1.5px solid var(--red)",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "var(--red)";
                }}
              >
                Sign Out
              </button>
            </div>
          )}

          {/* ═══ MY ORDERS ═══ */}
          {mode === "orders" && (
            <div>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "var(--brand)",
                      marginBottom: 6,
                    }}
                  >
                    No orders yet
                  </p>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    Your placed orders will appear here
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {orders.map((order, i) => (
                    <div
                      key={i}
                      style={{
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: "var(--brand5)",
                          padding: "10px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px solid var(--brand4)",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "var(--brand)",
                            }}
                          >
                            Order #{order.orderId}
                          </p>
                          <p
                            style={{
                              fontSize: 10,
                              color: "var(--brand2)",
                              marginTop: 2,
                            }}
                          >
                            {order.date}
                          </p>
                        </div>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            background: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "3px 10px",
                            borderRadius: 12,
                            border: "1px solid #c8e6c9",
                          }}
                        >
                          CONFIRMED
                        </span>
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            marginBottom: 10,
                          }}
                        >
                          {order.items.map((item, j) => (
                            <div
                              key={j}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                style={{
                                  width: 40,
                                  height: 40,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                  border: "1px solid var(--brand4)",
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#111",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {item.name}
                                </p>
                                <p
                                  style={{
                                    fontSize: 11,
                                    color: "var(--brand)",
                                    fontWeight: 700,
                                  }}
                                >
                                  ₹{item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: 8,
                            borderTop: "1px solid var(--brand4)",
                          }}
                        >
                          <p style={{ fontSize: 11, color: "var(--brand2)" }}>
                            Est. delivery:{" "}
                            <strong style={{ color: "#111" }}>
                              {order.deliveryDate}
                            </strong>
                          </p>
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "var(--brand)",
                            }}
                          >
                            ₹{order.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ WISHLIST ═══ */}
          {mode === "wishlist" && (
            <div>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>❤️</div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "var(--brand)",
                      marginBottom: 6,
                    }}
                  >
                    Wishlist is empty
                  </p>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    Click ❤️ on any product to save it here
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {wishlist.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        background: "var(--brand5)",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: 52,
                          height: 52,
                          objectFit: "cover",
                          borderRadius: 6,
                          flexShrink: 0,
                          border: "1px solid var(--brand4)",
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#111",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: 3,
                          }}
                        >
                          {item.name}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "var(--brand)",
                            }}
                          >
                            ₹{item.price}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: "rgba(0,0,0,0.3)",
                              textDecoration: "line-through",
                            }}
                          >
                            ₹{item.mrp}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveWishlist(i)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 18,
                          color: "var(--red)",
                          padding: "4px",
                          flexShrink: 0,
                        }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ ADDRESSES ═══ */}
          {mode === "addresses" && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                {addresses.length === 0 && (
                  <div
                    style={{
                      border: "1px dashed var(--brand3)",
                      borderRadius: 8,
                      padding: "14px",
                      background: "var(--brand5)",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 20,
                        marginBottom: 6,
                      }}
                    >
                      🏠
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--brand)",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      No address saved yet
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--brand2)",
                        lineHeight: 1.5,
                      }}
                    >
                      Your checkout delivery address will appear here.
                    </p>
                  </div>
                )}
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    style={{
                      border: `1.5px solid ${
                        addr.default ? "var(--brand)" : "var(--brand4)"
                      }`,
                      borderRadius: 8,
                      padding: "12px 14px",
                      background: addr.default ? "var(--brand5)" : "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 13 }}>🏠</span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--brand)",
                          }}
                        >
                          {addr.label}
                        </span>
                        {addr.default && (
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: "var(--brand)",
                              background: "var(--brand4)",
                              padding: "2px 7px",
                              borderRadius: 10,
                            }}
                          >
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {!addr.default && (
                          <button
                            onClick={() => setDefault(addr.id)}
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: "var(--brand)",
                              background: "none",
                              border: "1px solid var(--brand4)",
                              borderRadius: 4,
                              padding: "3px 8px",
                              cursor: "pointer",
                              fontFamily: "Montserrat",
                            }}
                          >
                            SET DEFAULT
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: "var(--red)",
                            background: "none",
                            border: "1px solid #ffcdd2",
                            borderRadius: 4,
                            padding: "3px 8px",
                            cursor: "pointer",
                            fontFamily: "Montserrat",
                          }}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                      {addr.line1}
                    </p>
                    <p style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                      {addr.line2}
                    </p>
                    {addr.phone && (
                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--brand2)",
                          marginTop: 4,
                        }}
                      >
                        📞 {addr.phone}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {addingAddr ? (
                <div
                  style={{
                    border: "1px solid var(--brand4)",
                    borderRadius: 8,
                    padding: "14px",
                    background: "var(--brand5)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--brand)",
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    New Address
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div>
                      <label style={lbl}>Label (e.g. Home / Office)</label>
                      <input
                        value={newAddr.label}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, label: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="Home"
                      />
                    </div>
                    <div>
                      <label style={lbl}>Address Line 1</label>
                      <input
                        value={newAddr.line1}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, line1: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="Street / Society / Flat No."
                      />
                    </div>
                    <div>
                      <label style={lbl}>City, State – Pincode</label>
                      <input
                        value={newAddr.line2}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, line2: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="Rajkot, Gujarat – 360005"
                      />
                    </div>
                    <div>
                      <label style={lbl}>Phone</label>
                      <input
                        value={newAddr.phone}
                        onChange={(e) =>
                          setNewAddr((p) => ({ ...p, phone: e.target.value }))
                        }
                        style={inp(false)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={saveAddress}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "var(--brand)",
                          color: "#fff",
                          border: "none",
                          fontFamily: "Montserrat",
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          borderRadius: 3,
                          cursor: "pointer",
                        }}
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setAddingAddr(false)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "#fff",
                          color: "var(--brand2)",
                          border: "1px solid var(--brand4)",
                          fontFamily: "Montserrat",
                          fontWeight: 600,
                          fontSize: 10,
                          textTransform: "uppercase",
                          borderRadius: 3,
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingAddr(true)}
                  style={{
                    width: "100%",
                    padding: "11px",
                    background: "#fff",
                    color: "var(--brand)",
                    border: "1.5px dashed var(--brand3)",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  + Add New Address
                </button>
              )}
            </div>
          )}

          {/* ═══ REVIEWS ═══ */}
          {mode === "reviews" && (
            <div>
              {/* Write review */}
              <div
                style={{
                  border: "1px solid var(--brand4)",
                  borderRadius: 8,
                  padding: "14px",
                  marginBottom: 16,
                  background: "var(--brand5)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--brand)",
                    marginBottom: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Write a Review
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div>
                    <label style={lbl}>Product Name</label>
                    <input
                      value={reviewForm.product}
                      onChange={(e) =>
                        setReviewForm((p) => ({
                          ...p,
                          product: e.target.value,
                        }))
                      }
                      style={inp(false)}
                      placeholder="e.g. High Gold Jhumka Earrings"
                    />
                  </div>
                  <div>
                    <label style={lbl}>Rating</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() =>
                            setReviewForm((p) => ({ ...p, rating: n }))
                          }
                          style={{
                            fontSize: 22,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            opacity: n <= reviewForm.rating ? 1 : 0.3,
                            transition: "opacity 0.15s",
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Your Review</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm((p) => ({
                          ...p,
                          comment: e.target.value,
                        }))
                      }
                      rows={3}
                      style={{ ...inp(false), resize: "vertical" }}
                      placeholder="Share your experience with this product..."
                    />
                  </div>
                  <button
                    onClick={submitReview}
                    style={{
                      padding: "10px",
                      background: "var(--brand)",
                      color: "#fff",
                      border: "none",
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      borderRadius: 3,
                      cursor: "pointer",
                    }}
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Past reviews */}
              {reviews.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ fontSize: 12, color: "var(--brand2)" }}>
                    No reviews yet. Be the first to share your experience!
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        border: "1px solid var(--brand4)",
                        borderRadius: 8,
                        padding: "12px 14px",
                        background: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 6,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--brand)",
                          }}
                        >
                          {r.product}
                        </p>
                        <p style={{ fontSize: 10, color: "var(--brand2)" }}>
                          {r.date}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: 1, marginBottom: 6 }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            style={{
                              fontSize: 13,
                              color: n <= r.rating ? "#F5A623" : "#ddd",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#444",
                          lineHeight: 1.6,
                          fontStyle: "italic",
                        }}
                      >
                        "{r.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ LOGIN FORM ═══ */}
          {mode === "login" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={lbl}>Email Address</label>
                <input
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  placeholder="you@example.com"
                  style={inp(errors.email)}
                />
                {errors.email && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label style={lbl}>Password</label>
                <input
                  value={form.password}
                  onChange={set("password")}
                  type="password"
                  placeholder="Enter your password"
                  style={inp(errors.password)}
                />
                {errors.password && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                onClick={handleLogin}
                style={{
                  padding: "13px",
                  background: "var(--brand)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                Sign In
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--brand2)",
                }}
              >
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setMode("signup");
                    setErrors({});
                  }}
                  style={{
                    color: "var(--brand)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          )}

          {/* ═══ SIGNUP FORM ═══ */}
          {mode === "signup" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={lbl}>Full Name</label>
                <input
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your full name"
                  style={inp(errors.name)}
                />
                {errors.name && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label style={lbl}>Email Address</label>
                <input
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  placeholder="you@example.com"
                  style={inp(errors.email)}
                />
                {errors.email && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label style={lbl}>Password</label>
                <input
                  value={form.password}
                  onChange={set("password")}
                  type="password"
                  placeholder="Minimum 6 characters"
                  style={inp(errors.password)}
                />
                {errors.password && (
                  <p
                    style={{ fontSize: 10, color: "var(--red)", marginTop: 4 }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                onClick={handleSignup}
                style={{
                  padding: "13px",
                  background: "var(--brand)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                Create Account
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--brand2)",
                }}
              >
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setMode("login");
                    setErrors({});
                  }}
                  style={{
                    color: "var(--brand)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── ANNOUNCEMENT BAR ─────────────────────────────────────────────────────────
export const AnnouncementBar = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 24, s: 3 });
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div style={{ background: "var(--brand)", padding: "9px 16px" }}>
      <div
        className="page-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 11,
            color: "#fff",
            letterSpacing: "0.5px",
          }}
        >
          🔥 MEGA SALE — Hurry Up, Shop Now!
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
          }}
        />
        <span style={{ fontWeight: 800, fontSize: 12, color: "#FFD700" }}>
          Extra 50% OFF
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            color: "#FFD700",
            fontWeight: 700,
          }}
        >
          ⏱ {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
          }}
        />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>
          Code: <strong style={{ color: "#FFD700" }}>SHETS50</strong> | Free
          Delivery above ₹499
        </span>
      </div>
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export const Navbar = ({
  page,
  setPage,
  cartCount,
  setCollectionsTab,
  onSearchOpen,
  onCartOpen,
  onProfileOpen,
  user,
  activeCollectionTab,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { label: "Home", page: "Home" },
    { label: "Collections", page: "Collections" },
    { label: "Bridal", page: "Bridal" },
    { label: "Custom Order", page: "Custom Order" },
    { label: "Contact", page: "Contact" },
  ];
  const subNavItems = [
    "HOME",
    "BANGLES",
    "RINGS",
    "CHAIN",
    "FESTIVE COMBOS",
    "MANGALSUTRA",
    "WATCHES",
    "NECKLACE",
    "EARRINGS",
    "BRACELETS",
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubNav = (item) => {
    if (item === "HOME") {
      setPage("Home");
      return;
    }
    const tabKey = SUBNAV_MAP[item];
    if (tabKey) {
      setCollectionsTab(tabKey);
      setPage("Collections");
    }
  };

  return (
    <div
      className="navbar-outer"
      style={{ boxShadow: scrolled ? "0 2px 16px rgba(90,55,25,0.1)" : "none" }}
    >
      <AnnouncementBar />

      {/* ── Main Navbar Row ── */}
      <div className="navbar-inner">
        {/* LEFT — Logo */}
        <div className="navbar-logo" onClick={() => setPage("Home")}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 26,
              color: "var(--brand)",
              letterSpacing: "4px",
              display: "block",
              lineHeight: 1,
            }}
          >
            SHETS
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: 8,
              color: "var(--brand2)",
              letterSpacing: "5px",
              textTransform: "uppercase",
              display: "block",
              marginTop: 2,
            }}
          >
            JEWELLERS
          </span>
        </div>

        {/* CENTER — Nav links */}
        <nav className="navbar-links">
          {navLinks.map(({ label, page: targetPage }) => (
            <button
              key={label}
              className={`nav-link ${page === targetPage ? "active" : ""}`}
              onClick={() => setPage(targetPage)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* RIGHT — Icons */}
        <div className="navbar-icons">
          {/* Search */}
          <button
            onClick={onSearchOpen}
            style={{
              background: "none",
              border: "none",
              padding: "9px 8px",
              color: "var(--brand1)",
              display: "flex",
              alignItems: "center",
              borderRadius: 4,
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand1)")
            }
            title="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Profile */}
          <button
            onClick={onProfileOpen}
            style={{
              background: "none",
              border: "none",
              padding: "6px 8px",
              color: "var(--brand1)",
              display: "flex",
              alignItems: "center",
              borderRadius: 4,
              transition: "all 0.2s",
              cursor: "pointer",
              gap: 6,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand1)")
            }
            title={user ? user.name : "Account"}
          >
            {user ? (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--brand)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {user.avatar}
              </div>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={onCartOpen}
            title="Cart"
            style={{
              background: "none",
              border: "none",
              padding: "9px 8px",
              color: "var(--brand1)",
              display: "flex",
              alignItems: "center",
              position: "relative",
              borderRadius: 4,
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand1)")
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "var(--brand)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 14,
                  height: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  fontWeight: 800,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Sub Nav — single scrollable row (original style) ── */}
      <div
        style={{
          borderTop: "1px solid var(--brand4)",
          background: "#fff",
          overflowX: "auto",
        }}
      >
        <div
          className="subnav-inner"
          style={{
            display: "flex",
            padding: "0 24px",
            minWidth: "max-content",
            gap: 0,
          }}
        >
          {subNavItems.map((item) => {
            const isActive =
              (item === "HOME" && page === "Home") ||
              (page === "Collections" &&
                SUBNAV_MAP[item] === activeCollectionTab);
            return (
              <button
                key={item}
                onClick={() => handleSubNav(item)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: 11,
                  color: isActive ? "var(--brand)" : "rgba(0,0,0,0.7)",
                  padding: "10px 14px",
                  whiteSpace: "nowrap",
                  borderBottom: `2px solid ${
                    isActive ? "var(--brand)" : "transparent"
                  }`,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--brand)";
                  e.currentTarget.style.borderBottomColor = "var(--brand)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive
                    ? "var(--brand)"
                    : "rgba(0,0,0,0.7)";
                  e.currentTarget.style.borderBottomColor = isActive
                    ? "var(--brand)"
                    : "transparent";
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
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
        {/* Tag */}
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
        {/* Wishlist heart */}
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

// ─── TRUST MARKERS ────────────────────────────────────────────────────────────
export const TrustMarkers = () => (
  <div
    style={{
      background: "var(--brand5)",
      borderTop: "1px solid var(--brand4)",
      borderBottom: "1px solid var(--brand4)",
      padding: "14px 0",
    }}
  >
    <div
      className="page-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px 0",
      }}
    >
      {[
        { icon: "🚚", text: "Delivered in 3–5 days" },
        { icon: "💵", text: "Cash on Delivery" },
        { icon: "↩️", text: "Easy Returns – 3 days" },
        { icon: "⭐", text: "5,00,000+ Happy Orders" },
        { icon: "🔒", text: "100% Secure Payments" },
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          <span
            style={{ fontSize: 11, fontWeight: 600, color: "var(--brand1)" }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const TestimonialsSection = () => (
  <div
    style={{
      background: "var(--brand5)",
      padding: "56px 0",
      borderTop: "1px solid var(--brand4)",
    }}
  >
    <div className="page-container">
      <div style={{ marginBottom: 36 }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "4px",
            color: "var(--brand2)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          What our customers say
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 28,
            color: "var(--brand)",
          }}
        >
          Happy Stories
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid var(--brand4)",
              borderRadius: 6,
              padding: "20px",
              animation: `fadeUp 0.5s ${i * 0.08}s ease both`,
            }}
          >
            <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
              {[...Array(t.stars)].map((_, si) => (
                <span key={si} style={{ color: "#F5A623", fontSize: 13 }}>
                  ★
                </span>
              ))}
            </div>
            <p
              style={{
                fontSize: 12,
                color: "#444",
                lineHeight: 1.75,
                marginBottom: 14,
                fontStyle: "italic",
              }}
            >
              "{t.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--brand4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                  color: "var(--brand)",
                  fontWeight: 700,
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--brand)",
                  }}
                >
                  {t.name}
                </p>
                <p style={{ fontSize: 10, color: "var(--brand2)" }}>{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── PAGE: HOME ───────────────────────────────────────────────────────────────
export const Field = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  textarea,
}) => {
  const [focused, setFocused] = useState(false);
  const shared = {
    width: "100%",
    padding: "11px 14px",
    border: `1px solid ${focused ? "var(--brand)" : "var(--brand4)"}`,
    borderRadius: 3,
    fontFamily: "Montserrat",
    fontSize: 12,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "#fff",
    color: "#111",
    resize: textarea ? "vertical" : "none",
    boxShadow: focused ? "0 0 0 3px var(--brand5)" : "none",
  };
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 9.5,
          fontWeight: 700,
          color: "var(--brand1)",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 7,
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={shared}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={shared}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
};

// ─── PAGE: CUSTOM ORDER ───────────────────────────────────────────────────────
export const POLICY_CONTENT = {
  "About Us": {
    icon: "💎",
    hero: "Our Story",
    subtitle: "25+ Years of Crafting Dreams",
    color: "#5a3719",
    sections: [
      {
        title: "Who We Are",
        content:
          "Shets Jewellers was founded in 1999 in the heart of Rajkot, Gujarat — India's jewellery capital. What began as a small family workshop has grown into one of the most trusted names in premium imitation and gold-plated jewellery, serving over 5,00,000 happy customers across India.",
      },
      {
        title: "Our Craft",
        content:
          "Every piece at Shets Jewellers is handcrafted by master artisans who have inherited generations of jewellery-making knowledge. We combine traditional Indian craftsmanship with modern design sensibilities to create jewellery that is both timeless and contemporary.",
      },
      {
        title: "Our Promise",
        content:
          "We believe every woman deserves to feel like royalty — without spending a fortune. Our jewellery is made with the finest materials: high gold plating, AD diamonds, and hand-set stones that capture the brilliance of precious gems at a fraction of the cost.",
      },
      {
        title: "Why Choose Us",
        content:
          "✦ 25+ years of excellence\n✦ 5,00,000+ happy orders delivered\n✦ ISO-certified quality standards\n✦ Cash on delivery available\n✦ Easy 3-day return & exchange\n✦ Free delivery on orders above ₹499\n✦ Dedicated customer support 6 days a week",
      },
      {
        title: "Visit Us",
        content:
          "Come experience our collection in person at our flagship store in Rajkot.\n\nShrinathji Imitation, Pushkardham Main Road,\nKalawad Road, Rajkot – 360005, Gujarat\n\nMon–Fri: 10 AM – 6 PM | Sun: By appointment only\n📞 +91 76006 59791",
      },
    ],
  },
  "Privacy Policy": {
    icon: "🔒",
    hero: "Privacy Policy",
    subtitle: "Your privacy is our priority",
    color: "#1565C0",
    sections: [
      {
        title: "Information We Collect",
        content:
          "We collect information you provide directly to us, such as your name, email address, phone number, shipping address, and payment information when you make a purchase or create an account. We also automatically collect certain information about your device and how you interact with our website.",
      },
      {
        title: "How We Use Your Information",
        content:
          "We use the information we collect to:\n✦ Process and fulfill your orders\n✦ Send order confirmations and shipping updates\n✦ Respond to your comments and questions\n✦ Send promotional communications (with your consent)\n✦ Improve and personalise your shopping experience\n✦ Detect and prevent fraudulent transactions",
      },
      {
        title: "Information Sharing",
        content:
          "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, and serving our customers — all subject to strict confidentiality agreements.",
      },
      {
        title: "Data Security",
        content:
          "We implement industry-standard security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All sensitive data is encrypted using SSL technology. However, no method of transmission over the Internet is 100% secure.",
      },
      {
        title: "Your Rights",
        content:
          "You have the right to:\n✦ Access your personal data\n✦ Correct inaccurate data\n✦ Request deletion of your data\n✦ Opt out of marketing communications\n✦ Lodge a complaint with a supervisory authority\n\nTo exercise any of these rights, contact us at shets@jewellers.com",
      },
      {
        title: "Cookies",
        content:
          "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of our service may not function properly.",
      },
      {
        title: "Contact Us",
        content:
          "If you have any questions about this Privacy Policy, please contact us at:\n\nShets Jewellers\n📧 shets@jewellers.com\n📞 +91 76006 59791",
      },
    ],
  },
  "Return Policy": {
    icon: "↩️",
    hero: "Return & Exchange Policy",
    subtitle: "Shop with complete confidence",
    color: "#2e7d32",
    sections: [
      {
        title: "Our Return Window",
        content:
          "We offer a hassle-free 3-day return and exchange policy from the date of delivery. If you are not completely satisfied with your purchase, you may return it within 3 days for an exchange or store credit.",
      },
      {
        title: "Eligibility for Returns",
        content:
          "To be eligible for a return, your item must be:\n✦ Unused and in the same condition you received it\n✦ In its original packaging with all tags intact\n✦ Accompanied by the original receipt or proof of purchase\n✦ Not a customised or bespoke order (custom orders are non-returnable)",
      },
      {
        title: "How to Initiate a Return",
        content:
          "Step 1: WhatsApp us at +91 76006 59791 within 3 days of delivery\nStep 2: Share your order ID and photos of the item\nStep 3: Our team will confirm the return within 24 hours\nStep 4: Ship the item back (we'll provide the address)\nStep 5: Exchange or store credit processed within 3–5 business days",
      },
      {
        title: "Non-Returnable Items",
        content:
          "The following items cannot be returned:\n✦ Customised or personalised jewellery\n✦ Items marked as final sale\n✦ Items that have been worn, used, or altered\n✦ Gift cards\n✦ Items returned after the 3-day window",
      },
      {
        title: "Damaged or Defective Items",
        content:
          "If you receive a damaged or defective item, please contact us immediately at shets@jewellers.com or WhatsApp us with photos. We will arrange a replacement or full refund at no additional cost to you.",
      },
      {
        title: "Refund Processing",
        content:
          "Refunds are issued as store credit or product exchange. Cash refunds are processed to the original payment method within 5–7 business days if applicable. Shipping charges are non-refundable unless the return is due to our error.",
      },
    ],
  },
  "Shipping Policy": {
    icon: "🚚",
    hero: "Shipping Policy",
    subtitle: "Fast, reliable delivery across India",
    color: "#E65100",
    sections: [
      {
        title: "Delivery Timeframe",
        content:
          "Orders are typically delivered within 3–5 business days across India. Metropolitan cities (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata) may receive delivery in 2–3 business days. Remote areas may take up to 7 business days.",
      },
      {
        title: "Shipping Charges",
        content:
          "✦ Orders above ₹499 — FREE shipping\n✦ Orders below ₹499 — ₹49 flat shipping fee\n✦ Express delivery (1–2 days) — ₹99 additional charge (select cities)\n\nAll prices are inclusive of taxes.",
      },
      {
        title: "Order Processing",
        content:
          "Orders placed before 2 PM IST on business days are processed the same day. Orders placed after 2 PM or on weekends/holidays are processed the next business day. You will receive an order confirmation email and a shipping notification with tracking details.",
      },
      {
        title: "Tracking Your Order",
        content:
          "Once your order is shipped, you will receive a WhatsApp message and email with your tracking number and courier partner details. You can track your order directly on the courier's website or contact us at +91 76006 59791 for updates.",
      },
      {
        title: "Cash on Delivery",
        content:
          "We offer Cash on Delivery (COD) on all orders across India. COD is available for orders up to ₹5,000. Please ensure someone is available at the delivery address to accept and pay for the order. A COD convenience fee of ₹30 may apply.",
      },
      {
        title: "Delivery Issues",
        content:
          "If your order has not arrived within the expected timeframe, please contact us at shets@jewellers.com or WhatsApp +91 76006 59791. We will investigate and resolve the issue within 24–48 hours.",
      },
    ],
  },
  "Terms & Conditions": {
    icon: "📋",
    hero: "Terms & Conditions",
    subtitle: "Please read these terms carefully",
    color: "#4A148C",
    sections: [
      {
        title: "Acceptance of Terms",
        content:
          "By accessing and using the Shets Jewellers website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
      },
      {
        title: "Products and Pricing",
        content:
          "All products are subject to availability. We reserve the right to modify or discontinue any product without notice. Prices are in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to change prices at any time without prior notice.",
      },
      {
        title: "Orders and Payment",
        content:
          "By placing an order, you confirm that the information provided is accurate and complete. We accept UPI, credit/debit cards, net banking, and Cash on Delivery. Orders are confirmed only after successful payment or COD confirmation. We reserve the right to cancel any order at our discretion.",
      },
      {
        title: "Intellectual Property",
        content:
          "All content on this website — including images, logos, text, and designs — is the exclusive property of Shets Jewellers and is protected by Indian and international copyright laws. Unauthorised reproduction, distribution, or use of any content is strictly prohibited.",
      },
      {
        title: "Limitation of Liability",
        content:
          "Shets Jewellers shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services. Our maximum liability shall not exceed the purchase price of the specific product that gave rise to the claim.",
      },
      {
        title: "Governing Law",
        content:
          "These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Rajkot, Gujarat, India.",
      },
      {
        title: "Changes to Terms",
        content:
          "We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes constitutes acceptance of the new terms.",
      },
      {
        title: "Contact Us",
        content:
          "For any questions about these Terms and Conditions, please contact:\n\nShets Jewellers\n📧 shets@jewellers.com\n📞 +91 76006 59791\nRajkot, Gujarat – 360005",
      },
    ],
  },
};

// ─── POLICY PAGE COMPONENT ────────────────────────────────────────────────────
export const PolicySection = ({ section, index, color }) => {
  const revealRef = useReveal();

  return (
    <div
      id={`section-${index}`}
      ref={revealRef}
      className="reveal"
      style={{ marginBottom: 28, transitionDelay: `${index * 0.07}s` }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--brand4)",
          borderRadius: 12,
          overflow: "hidden",
          transition: "box-shadow 0.25s, transform 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(90,55,25,0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "none";
        }}
      >
        <div
          style={{
            background: `${color}0d`,
            borderBottom: "1px solid var(--brand4)",
            padding: "16px 22px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {index + 1}
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 18,
              color,
            }}
          >
            {section.title}
          </h2>
        </div>
        <div style={{ padding: "20px 22px" }}>
          <p
            style={{
              fontSize: 13,
              color: "#444",
              lineHeight: 1.9,
              whiteSpace: "pre-line",
            }}
          >
            {section.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Footer = ({ setPage, onPolicyPage, onShopCategory }) => (
  <footer>
    <div
      style={{
        background: "var(--brand)",
        color: "#fff",
        padding: "48px 0 24px",
      }}
    >
      <div className="page-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
            gap: 40,
            marginBottom: 36,
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: "3px",
                }}
              >
                SHETS
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  fontSize: 8,
                  letterSpacing: "5px",
                  opacity: 0.6,
                }}
              >
                JEWELLERS
              </p>
            </div>
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.9,
                opacity: 0.78,
                maxWidth: 280,
              }}
            >
              25+ years of excellence. 5,00,000+ happy orders. Premium jewellery
              at prices that feel like a celebration.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              {/* {["📘", "📸", "▶"].map((icon, i) => ( */}
              {[
                { icon: "📘", url: "https://www.facebook.com/" },
                { icon: "📸", url: "https://www.instagram.com/" },
                { icon: "▶", url: "https://www.youtube.com/" },
              ].map(({ icon, url }, i) => (
                <div
                  key={i}
                  onClick={() => window.open(url, "_blank")}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.12)")
                  }
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Navigate
            </p>
            {["Home", "Collections", "Bridal", "Custom Order", "Contact"].map(
              (item) => (
                <p
                  key={item}
                  onClick={() => setPage(item)}
                  style={{
                    fontSize: 11,
                    opacity: 0.78,
                    marginBottom: 12,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.78")}
                >
                  {item}
                </p>
              )
            )}
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Shop
            </p>
            {[
              "Bangles",
              "Chains",
              "Earrings",
              "Necklaces",
              "Rings",
              "Watches",
            ].map((item) => (
              <p
                key={item}
                onClick={() => onShopCategory(item)}
                style={{
                  fontSize: 11,
                  opacity: 0.78,
                  marginBottom: 12,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.78")}
              >
                {item}
              </p>
            ))}
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Contact
            </p>
            <p
              style={{
                fontSize: 11,
                opacity: 0.78,
                marginBottom: 10,
                lineHeight: 1.6,
              }}
            >
              📞 +91 8618713231
            </p>
            <p style={{ fontSize: 11, opacity: 0.78, marginBottom: 10 }}>
              ✉️ shets@jewellers.com
            </p>
            <p style={{ fontSize: 10, opacity: 0.6, lineHeight: 1.7 }}>
              Rajkot, Gujarat – 360005
            </p>
            <p style={{ fontSize: 10, opacity: 0.6, marginTop: 6 }}>
              Mon–Fri · 10 AM – 6 PM
            </p>
            <div
              style={{
                marginTop: 16,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 4,
                padding: "10px 14px",
              }}
            >
              <p style={{ fontSize: 10, opacity: 0.85, fontWeight: 600 }}>
                💬 WhatsApp us anytime
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, marginTop: 3 }}>
                +91 76006 59791
              </p>
            </div>
          </div>
        </div>

        {/* ── Policy links — fully clickable ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 18,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px 4px",
            marginBottom: 18,
          }}
        >
          {[
            "About Us",
            "Privacy Policy",
            "Return Policy",
            "Shipping Policy",
            "Terms & Conditions",
          ].map((item, i) => (
            <span
              key={item}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              {i > 0 && (
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
                  ·
                </span>
              )}
              <span
                onClick={() => onPolicyPage(item)}
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  padding: "3px 6px",
                  borderRadius: 4,
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
    <div
      style={{
        background: "rgba(50,25,5,1)",
        padding: "14px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
        © 2025 Shets Jewellers · All rights reserved · Made with ❤️ in India
      </p>
    </div>
  </footer>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

