import { useState } from "react";

const BRIDAL = [
  {
    id: 1,
    name: "Duchess Bridal Set",
    price: 8500,
    mrp: 17000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZqfkNyDhWzYVfleiGvqqK4j9Ftw05BGUT-g&s.jpg",
    subtitle: "For the timeless bride",
  },
  {
    id: 2,
    name: "Blossom Bridal Suite",
    price: 5200,
    mrp: 10400,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfChw6jVgGlHPfGXMNvWlXIy6_De1eWAUOgQ&s.jpg",
    subtitle: "Floral romance in gold",
  },
  {
    id: 3,
    name: "Midnight Bridal Collection",
    price: 11000,
    mrp: 22000,
    img: "https://4.imimg.com/data4/UI/RV/MY-6914093/bridal-bangles-500x500.jpg",
    subtitle: "Sapphire and diamond luxury",
  },
  {
    id: 4,
    name: "Heritage Bridal Set",
    price: 14000,
    mrp: 28000,
    img: "https://img.tatacliq.com/images/i20//437Wx649H/MP000000024280667_437Wx649H_202411010200301.jpeg",
    subtitle: "Generational heirloom quality",
  },
  {
    id: 5,
    name: "Rajwadi Bridal Suite",
    price: 9500,
    mrp: 19000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVScExm1ulxMtGEagIylz33nf90VSetX8wTm6K2L0VA&s.jpg",
    subtitle: "Royal Rajasthani opulence",
  },
  {
    id: 6,
    name: "Minimalist Bridal Edit",
    price: 4800,
    mrp: 9600,
    img: "https://i.shgcdn.com/4c0871d3-2f53-40d9-bbbd-1b831a59ac6d/-/format/auto/-/preview/3000x3000/-/quality/lighter/.png",
    subtitle: "Modern bride, timeless gold",
  },
  {
    id: 7,
    name: "Kundan Bridal Choker Set",
    price: 7800,
    mrp: 15600,
    img: "https://images.meesho.com/images/products/405237836/egr9r_512.webp?width=512.jpg",
    subtitle: "Statement kundan for wedding rituals",
  },
  {
    id: 8,
    name: "Pearl Bridal Jewellery Set",
    price: 6400,
    mrp: 12800,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ703r6KaUUr63LKe66j01R97AcgaEJq-dXqUXgCHJuA&s.jpeg",
    subtitle: "Soft pearl details for reception looks",
  },
];

const BridalCard = ({ item, onAddToCart, onViewProduct, user, onOpenAuth }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const priceText = `From ₹${item.price.toLocaleString("en-IN")}`;
  const mrpText = `₹${item.mrp.toLocaleString("en-IN")}`;

  const handleAdd = (event) => {
    event.stopPropagation();
    if (!user) {
      setLoginPrompt(true);
      setTimeout(() => setLoginPrompt(false), 2500);
      return;
    }
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onViewProduct && onViewProduct(item)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "var(--brand3)" : "var(--brand4)"}`,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 10px 32px rgba(90,55,25,0.15)"
          : "0 2px 8px rgba(90,55,25,0.04)",
        transition: "all 0.3s",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            paddingBottom: "65%",
            position: "relative",
            background: "#f5f0eb",
          }}
        >
          <img
            src={item.img}
            alt={item.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "var(--brand)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 2,
            letterSpacing: "0.5px",
          }}
        >
          BRIDAL SPECIAL - 50% OFF
        </div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <p
          style={{
            fontSize: 10,
            color: "var(--brand2)",
            marginBottom: 5,
            fontStyle: "italic",
          }}
        >
          {item.subtitle}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 20,
            color: "var(--brand)",
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 16 }}>{priceText}</span>
          <span
            style={{
              fontSize: 12,
              color: "rgba(0,0,0,0.32)",
              textDecoration: "line-through",
            }}
          >
            {mrpText}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--sale-text)",
              background: "var(--sale-bg)",
              padding: "2px 7px",
              borderRadius: 2,
            }}
          >
            50% OFF
          </span>
        </div>
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
              Please login to add items
            </p>
            <button
              onClick={(event) => {
                event.stopPropagation();
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
              Login / Sign Up -&gt;
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              padding: "11px 0",
              border: `1.5px solid ${added ? "var(--green)" : "var(--brand)"}`,
              background: added ? "var(--green)" : "#fff",
              color: added ? "#fff" : "var(--brand)",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.25s",
            }}
          >
            {added ? "Added to Bag" : "Enquire / Add to Bag"}
          </button>
        )}
      </div>
    </div>
  );
};

export const BridalPage = ({ onAddToCart, onViewProduct, user, onOpenAuth }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "28px 24px 60px",
        boxSizing: "border-box",
      }}
    >
      <p style={{ fontSize: 11, color: "var(--brand2)", marginBottom: 14 }}>
        Home &gt; <strong style={{ color: "var(--brand)" }}>Bridal</strong>
      </p>
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          padding: "48px 24px",
          background:
            "linear-gradient(135deg, rgba(90,55,25,0.06), rgba(90,55,25,0.02))",
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
          Each collection is crafted with love for the bride who deserves the
          best.
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
            onViewProduct={onViewProduct}
            user={user}
            onOpenAuth={onOpenAuth}
          />
        ))}
      </div>
    </div>
  );
};
