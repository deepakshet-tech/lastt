import { PRODUCTS } from "../data/products.js";
import { ProductCard } from "./CollectionsPage.jsx";
import { AnimatedCounter, TestimonialsSection, TrustMarkers } from "../shared.jsx";

export const HomePage = ({
  setPage,
  onAddToCart,
  onViewProduct,
  setCollectionsTab,
  user,
  onOpenAuth,
  onToggleWishlist,
  isWishlisted,
}) => {
  const featured = [...PRODUCTS.Rings, ...PRODUCTS.Necklaces].slice(0, 8);

  const categories = [
    {
      name: "BANGLES",
      img: "https://www.griiham.in/cdn/shop/files/Gold-Plated-Set-of-6-bangles-Designer-Bangles-Griiham.jpg",
      tab: "Bangles",
    },
    {
      name: "CHAINS",
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1095/1655891866_b700d796c7c491e41f4c.png",
      tab: "Chains",
    },
    {
      name: "EARRINGS",
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw677f6639/images/hi-res/511069SOEAGA00_1.jpg",
      tab: "Earrings",
    },
    {
      name: "BRACELETS",
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/229/1657886878_a04e45e53fd9ac167f31.jpg",
      tab: "Bracelets",
    },
    {
      name: "NECKLACES",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczAIyESUVrZnr2AYYIsIq5XsVlUdlPstFxQ&s.jpeg",
      tab: "Necklaces",
    },
    {
      name: "RINGS",
      img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw78538bb2/images/hi-res/511920FCMAA00.jpg",
      tab: "Rings",
    },
    {
      name: "MANGALSUTRA",
      img: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1404/1768020799_3eb22cfbef73cbb4ab71.jpg",
      tab: "Mangalsutra",
    },
    {
      name: "WATCHES",
      img: "https://m.media-amazon.com/images/I/71O9w2eWomL._AC_UY1000_.jpg",
      tab: "Watches",
    },
  ];

  const handleCategoryClick = (tab) => {
    setCollectionsTab(tab);
    setPage("Collections");
  };

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(90,55,25,0.93) 0%, rgba(60,35,10,0.85) 100%), url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=85') center/cover`,
          minHeight: 480,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating particles */}
        {["💍", "✨", "💎", "🌸", "👑", "⭐", "🔮", "🌟"].map((emoji, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: 16 + (i % 3) * 6,
              opacity: 0.18,
              top: `${10 + ((i * 11) % 80)}%`,
              left: `${5 + ((i * 13) % 88)}%`,
              animation: `float ${5 + i}s ${i * 0.8}s ease-in-out infinite`,
              pointerEvents: "none",
            }}
          >
            {emoji}
          </div>
        ))}
        {/* Animated rings */}
        {[300, 200, 120].map((size, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`,
              animation: `spin ${20 + i * 10}s linear infinite`,
              top: "50%",
              left: "50%",
              marginTop: -size / 2,
              marginLeft: -size / 2,
            }}
          />
        ))}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p
            style={{
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "6px",
              color: "rgba(255,215,0,0.85)",
              textTransform: "uppercase",
              marginBottom: 18,
              animation: "fadeIn 1s ease",
            }}
          >
            ◆ 25+ Years of Excellence ◆
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(36px,7vw,82px)",
              color: "#fff",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              marginBottom: 16,
              animation: "fadeUp 0.9s 0.15s ease both",
            }}
          >
            Elegance Redefined
          </h1>
          <p
            style={{
              fontWeight: 400,
              fontSize: 13,
              color: "rgba(255,255,255,0.72)",
              marginBottom: 36,
              maxWidth: 440,
              lineHeight: 1.9,
              animation: "fadeUp 0.9s 0.28s ease both",
            }}
          >
            5,00,000+ happy orders · Premium jewellery at affordable prices ·
            Free shipping across India
          </p>
          <div
            className="home-hero-actions"
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              animation: "fadeUp 0.9s 0.4s ease both",
            }}
          >
            <button
              onClick={() => {
                setCollectionsTab("Rings");
                setPage("Collections");
              }}
              style={{
                background: "#fff",
                color: "var(--brand)",
                border: "none",
                padding: "14px 36px",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderRadius: 4,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              Shop Now
            </button>
            <button
              onClick={() => setPage("Bridal")}
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.55)",
                padding: "12px 36px",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
              }}
            >
              Bridal Collection
            </button>
          </div>
          {/* Live stats */}
          <div
            className="home-stats"
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
              marginTop: 36,
              animation: "fadeUp 0.9s 0.55s ease both",
            }}
          >
            {[
              { n: 500000, s: "+", l: "Happy Orders" },
              { n: 25, s: "+", l: "Years" },
              { n: 50, s: "%", l: "Off Today" },
            ].map((st, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#FFD700",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter target={st.n} suffix={st.s} />
                </p>
                <p
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {st.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TrustMarkers />

      {/* Categories */}
      <div style={{ padding: "56px 0 0" }}>
        <div className="page-container">
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "4px",
                color: "var(--brand2)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Browse
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 28,
                color: "var(--brand)",
              }}
            >
              Shop by Category
            </h2>
          </div>
          <div
            className="home-category-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 14,
            }}
          >
            {categories.map((cat, i) => (
              <div
                key={i}
                onClick={() => handleCategoryClick(cat.tab)}
                style={{
                  position: "relative",
                  borderRadius: 6,
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "1",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  animation: `fadeUp 0.5s ${i * 0.06}s ease both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(90,55,25,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(60,30,5,0.82) 0%, transparent 55%)",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 10.5,
                    letterSpacing: "2px",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bestsellers */}
      <div style={{ padding: "56px 0" }}>
        <div className="page-container">
          <div
            className="responsive-section-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 24,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "4px",
                  color: "var(--brand2)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Top Picks
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "var(--brand)",
                  lineHeight: 1,
                }}
              >
                Bestsellers
              </h2>
            </div>
            <button
              onClick={() => {
                setCollectionsTab("Rings");
                setPage("Collections");
              }}
              style={{
                background: "none",
                border: "1.5px solid var(--brand)",
                color: "var(--brand)",
                padding: "8px 20px",
                borderRadius: 3,
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--brand)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "var(--brand)";
              }}
            >
              View All
            </button>
          </div>
          <div className="product-grid-4">
            {featured.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProductCard
                  product={p}
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

      {/* Free Gift Banner */}
      <div style={{ padding: "0 0 56px" }}>
        <div className="page-container">
          <div
            className="promo-banner"
            style={{
              background: "var(--brand)",
              borderRadius: 6,
              padding: "28px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: 800,
                  fontSize: 17,
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                🎁 FREE GIFT on orders above ₹999
              </p>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.6,
                }}
              >
                Get a FREE Gold Plated Pearl Chain worth ₹399 — added
                automatically to your order!
              </p>
            </div>
            <button
              onClick={() => {
                setCollectionsTab("Rings");
                setPage("Collections");
              }}
              style={{
                background: "#FFD700",
                color: "var(--brand)",
                border: "none",
                padding: "13px 30px",
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
                flexShrink: 0,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Claim Now
            </button>
          </div>
        </div>
      </div>

      {/* Festive Combos Strip */}
      <div
        style={{
          background: "var(--sale-bg)",
          padding: "56px 0",
          borderTop: "1px solid var(--brand4)",
        }}
      >
        <div className="page-container">
          <div
            className="responsive-section-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 28,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "4px",
                  color: "var(--brand2)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Special Deals
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "var(--brand)",
                }}
              >
                Festive Combos
              </h2>
            </div>
            <button
              onClick={() => {
                setCollectionsTab("FestiveCombos");
                setPage("Collections");
              }}
              style={{
                background: "var(--brand)",
                color: "#fff",
                border: "none",
                padding: "10px 22px",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              View All
            </button>
          </div>
          <div className="product-grid-4">
            {PRODUCTS.FestiveCombos.slice(0, 4).map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.07}s` }}>
                <ProductCard
                  product={p}
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

      <TestimonialsSection />
    </div>
  );
};

// ─── PAGE: COLLECTIONS ────────────────────────────────────────────────────────
