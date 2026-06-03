import { useState } from "react";
import { getDiscount, getProductGalleryItems, getProductImages } from "../shared.jsx";

export const ProductDetailPage = ({
  product,
  onAddToCart,
  onBack,
  onViewProduct,
  user,
  onOpenAuth,
}) => {
  const [mainImg, setMainImg] = useState(0);
  const [size, setSize] = useState("Free Size");
  const [added, setAdded] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const disc = getDiscount(product.price, product.mrp);
  const imgs = getProductImages(product);
  const activeImage = imgs[mainImg] || imgs[0] || product.img;
  const galleryItems = getProductGalleryItems(product);

  const handleAdd = () => {
    if (!user) {
      setLoginPrompt(true);
      setTimeout(() => setLoginPrompt(false), 3000);
      return;
    }
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="page-container"
      style={{ paddingTop: 28, paddingBottom: 60 }}
    >
      <p
        style={{
          fontSize: 11,
          color: "var(--brand2)",
          marginBottom: 20,
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        ← Back to Collections
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* Images */}
        <div>
          <div
            style={{
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 12,
              border: "1px solid var(--brand4)",
              aspectRatio: "1",
              background: "#f5f0eb",
            }}
          >
            <img
              src={activeImage}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {galleryItems.map(({ img, product: galleryProduct, isCurrentProduct }, i) => (
              <div
                key={`${galleryProduct.id}-${galleryProduct.img}-${i}`}
                onClick={() => {
                  if (isCurrentProduct) {
                    setMainImg(i);
                    return;
                  }
                  onViewProduct(galleryProduct);
                }}
                style={{
                  flex: 1,
                  aspectRatio: "1",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: `2px solid ${
                    isCurrentProduct && mainImg === i
                      ? "var(--brand)"
                      : "var(--brand4)"
                  }`,
                  transition: "border-color 0.2s",
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p
            style={{
              fontSize: 10,
              color: "var(--brand2)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            SHETS JEWELLERS
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: 26,
              color: "#111",
              marginBottom: 18,
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h1>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontWeight: 800, fontSize: 30, color: "#000" }}>
                ₹{product.price}
              </span>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  color: "rgba(0,0,0,0.3)",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.mrp}
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "rgb(225, 225, 225)",
                  background: "var(--brand)",
                  padding: "3px 8px",
                  borderRadius: 2,
                }}
              >
                {disc}% OFF
              </span>
            </div>
            <p
              style={{
                fontSize: 11,
                color: "var(--green)",
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              ✓ You save ₹{product.mrp - product.price}
            </p>
          </div>

          <div
            style={{
              border: "1px dashed var(--green)",
              padding: "10px 14px",
              borderRadius: 4,
              marginBottom: 22,
              background: "#f8fff8",
            }}
          >
            <p style={{ fontSize: 11, color: "var(--green)", fontWeight: 600 }}>
              🏷 Apply code <strong>SHETS50</strong> for extra 50% off at
              checkout
            </p>
          </div>

          <div style={{ marginBottom: 22 }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--brand1)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 10,
              }}
            >
              Select Size
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["Free Size"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    minWidth: 90,
                    padding: "10px 18px",
                    border: `1.5px solid ${
                      size === s ? "var(--brand)" : "var(--brand4)"
                    }`,
                    background: size === s ? "var(--brand5)" : "#fff",
                    color: size === s ? "var(--brand)" : "#111",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: 11,
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {loginPrompt ? (
            <div
              style={{
                background: "#fff8e1",
                border: "1px solid #ffe082",
                borderRadius: 6,
                padding: "14px 16px",
                marginBottom: 14,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>🔒</span>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#e65100",
                    marginBottom: 5,
                  }}
                >
                  Please login to add items to your bag
                </p>
                <button
                  onClick={onOpenAuth}
                  style={{
                    padding: "8px 20px",
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
                  Login / Sign Up
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              style={{
                width: "100%",
                padding: "15px",
                background: added ? "#2b872f" : "var(--brand)",
                color: "#fff",
                border: "none",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                borderRadius: 3,
                cursor: "pointer",
                transition: "background 0.3s",
                marginBottom: 14,
              }}
            >
              {added ? "✓ Added to Bag!" : "Add to Bag"}
            </button>
          )}

          <div
            style={{
              border: "1px solid var(--brand4)",
              borderRadius: 4,
              overflow: "hidden",
              marginBottom: 22,
            }}
          >
            {[
              { icon: "🚚", text: "Delivered in 3–5 day" },
              { icon: "💵", text: "Cash on Delivery available" },
              { icon: "↩️", text: "Easy Returns within 3 days" },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderBottom: i < 2 ? "1px solid var(--brand4)" : "none",
                  background: i % 2 === 0 ? "#fff" : "var(--brand5)",
                }}
              >
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--brand1)",
                    fontWeight: 500,
                  }}
                >
                  {t.text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              border: "1px solid var(--brand4)",
              borderRadius: 4,
              padding: "18px 20px",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: 12,
                color: "var(--brand)",
                marginBottom: 14,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Product Details
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 24px",
              }}
            >
              {[
                ["Plating", "High Gold"],
                ["Stone", "AD Diamond"],
                ["Occasion", "Daily Wear"],
                ["Items", "1 Piece"],
                ["Brand", "Shets Jewellers"],
                ["Origin", "India"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p
                    style={{
                      fontSize: 10,
                      color: "rgba(0,0,0,0.38)",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {k}
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#222" }}>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
