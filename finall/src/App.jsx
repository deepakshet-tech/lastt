import { useEffect, useState } from "react";
import { GlobalStyle, Navbar, Footer, SearchModal, CartDrawer, AuthModal } from "./shared.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { CollectionsPage } from "./pages/CollectionsPage.jsx";
import { ProductDetailPage } from "./pages/ProductDetailPage.jsx";
import { BridalPage } from "./pages/BridalPage.jsx";
import { CustomOrderPage } from "./pages/CustomOrderPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { PolicyPage } from "./pages/PolicyPage.jsx";
import heroImage from "./assets/hero.png";

const AUTH_STORAGE_KEY = "shets-auth-profile";

const PAGE_PATHS = {
  Home: "/",
  Collections: "/collections",
  Bridal: "/bridal",
  "Custom Order": "/custom-order",
  Contact: "/contact",
};

const POLICY_KEYS = [
  "About Us",
  "Privacy Policy",
  "Return Policy",
  "Shipping Policy",
  "Terms & Conditions",
];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const titleFromSegment = (segment) =>
  segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const getRouteState = () => {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const [, first = "", second = ""] = path.split("/");

  if (first === "collections") {
    return {
      page: "Collections",
      collectionsTab: second ? titleFromSegment(decodeURIComponent(second)) : "Rings",
      policyPage: null,
    };
  }

  if (first === "policy") {
    const key = POLICY_KEYS.find((item) => slugify(item) === second) || "About Us";
    return { page: "Policy", collectionsTab: "Rings", policyPage: key };
  }

  if (first === "bridal") return { page: "Bridal", collectionsTab: "Rings", policyPage: null };
  if (first === "custom-order") return { page: "Custom Order", collectionsTab: "Rings", policyPage: null };
  if (first === "contact") return { page: "Contact", collectionsTab: "Rings", policyPage: null };

  return { page: "Home", collectionsTab: "Rings", policyPage: null };
};

const pushPath = (path) => {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const passwordRules = [
  { label: "At least 8 characters", test: (value) => value.length >= 8 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
  { label: "One number", test: (value) => /\d/.test(value) },
  {
    label: "One special character",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

const getSavedUser = () => {
  try {
    const savedProfile = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return savedProfile ? JSON.parse(savedProfile) : null;
  } catch {
    return null;
  }
};

const getPasswordStrength = (password) =>
  passwordRules.filter((rule) => rule.test(password)).length;

const createMemberId = (username, email) => {
  const base = `${username}${email}`.replace(/[^a-z0-9]/gi, "").toUpperCase();
  return `SJ-${base.slice(0, 3).padEnd(3, "X")}-${Date.now().toString().slice(-4)}`;
};

const LoginGate = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const username = form.username.trim();
    const email = form.email.trim();

    if (!username) nextErrors.username = "Username is required";
    if (!email) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address";

    const failedRule = passwordRules.find((rule) => !rule.test(form.password));
    if (!form.password) nextErrors.password = "Password is required";
    else if (failedRule) nextErrors.password = failedRule.label;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const username = form.username.trim();
    const email = form.email.trim();
    const strength = getPasswordStrength(form.password);
    onLogin({
      name: username,
      email,
      avatar: username.charAt(0).toUpperCase(),
      memberId: createMemberId(username, email),
      passwordStrength: `${strength}/${passwordRules.length}`,
      profileCreatedFrom: "Login credentials",
      lastLogin: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      joinDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      }),
    });
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "14px 15px",
    border: `1px solid ${hasError ? "var(--red)" : "rgba(90,55,25,0.18)"}`,
    borderRadius: 4,
    fontFamily: "Montserrat",
    fontSize: 13,
    outline: "none",
    background: "rgba(255,255,255,0.9)",
    boxShadow: hasError
      ? "0 0 0 3px rgba(210,67,67,0.08)"
      : "0 10px 28px rgba(90,55,25,0.06)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
  });

  return (
    <div
      className="login-stage"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.05fr) minmax(390px, 0.95fr)",
        background: "#120c08",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes loginFadeRise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loginImageDrift {
          0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
          50% { transform: scale(1.09) translate3d(-10px, -8px, 0); }
        }
        @keyframes loginSheen {
          0% { transform: translateX(-130%) skewX(-14deg); opacity: 0; }
          18% { opacity: 0.52; }
          44% { opacity: 0; }
          100% { transform: translateX(180%) skewX(-14deg); opacity: 0; }
        }
        @keyframes loginLine {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes loginFloatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes loginGlow {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.34; transform: scale(1.05); }
        }
        @keyframes loginSlideIn {
          from { opacity: 0; transform: translateX(22px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes loginGoldSweep {
          0% { transform: translate3d(-26%, -16%, 0) rotate(18deg); opacity: 0.18; }
          50% { transform: translate3d(18%, 10%, 0) rotate(18deg); opacity: 0.34; }
          100% { transform: translate3d(54%, 28%, 0) rotate(18deg); opacity: 0.12; }
        }
        @keyframes loginPanelWash {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .login-gold-sweep {
          position: absolute;
          width: 72%;
          height: 150%;
          top: -22%;
          left: -34%;
          background: linear-gradient(90deg, transparent, rgba(218,174,103,0.22), rgba(255,235,187,0.18), transparent);
          filter: blur(3px);
          animation: loginGoldSweep 9s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .login-info-card {
          animation: loginFloatCard 5s ease-in-out infinite;
        }
        .login-detail-card {
          animation: loginSlideIn 0.7s ease both;
        }
        .login-card {
          position: relative;
        }
        .login-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(202,157,94,0.16) 42%, rgba(255,255,255,0.2) 50%, rgba(202,157,94,0.12) 58%, transparent 100%);
          transform: translateX(-100%);
          animation: loginSheen 5.8s ease-in-out infinite;
          pointer-events: none;
        }
        .login-stage input:focus {
          border-color: var(--brand) !important;
          box-shadow: 0 0 0 4px rgba(90,55,25,0.11), 0 12px 30px rgba(90,55,25,0.08) !important;
          transform: translateY(-1px);
        }
        .login-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 34px rgba(90,55,25,0.26);
        }
        .login-submit::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 45%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.32), transparent);
          animation: loginSheen 3.4s ease-in-out infinite;
        }
        @media (max-width: 860px) {
          .login-stage {
            grid-template-columns: 1fr !important;
            min-height: 100vh;
          }
          .login-visual {
            min-height: 34vh !important;
          }
          .login-panel-wrap {
            padding: 18px !important;
            align-items: flex-start !important;
          }
          .login-card {
            margin-top: -58px;
          }
          .login-visual-stats {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .login-visual {
            min-height: 30vh !important;
          }
          .login-card-body {
            padding: 22px 18px 20px !important;
          }
        }
      `}</style>
      <section
        className="login-visual"
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        <div className="login-gold-sweep" />
        <div className="login-gold-sweep" style={{ animationDelay: "2.2s", opacity: 0.16, left: "22%" }} />
        <img
          src={heroImage}
          alt="Premium jewellery display"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.02) contrast(1.04)",
            animation: "loginImageDrift 16s ease-in-out infinite",
            transformOrigin: "center",
            zIndex: -3,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(18,12,8,0.86) 0%, rgba(18,12,8,0.42) 48%, rgba(18,12,8,0.82) 100%)",
            zIndex: -2,
          }}
        />
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "56px clamp(24px, 6vw, 74px)",
            color: "#fff",
            animation: "loginFadeRise 0.8s ease both",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
              fontWeight: 600,
            }}
          >
            Private Access
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 7vw, 84px)",
              lineHeight: 0.92,
              fontWeight: 700,
              maxWidth: 720,
              marginTop: 14,
              letterSpacing: 0,
            }}
          >
            Shets Jewellers
          </h1>
          <div
            style={{
              width: 140,
              height: 1,
              background: "rgba(255,255,255,0.72)",
              margin: "24px 0 20px",
              transformOrigin: "left",
              animation: "loginLine 0.9s ease 0.25s both",
            }}
          />
          <p
            style={{
              maxWidth: 560,
              fontSize: 14,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            Login to unlock the complete collection, save favourites, and continue your jewellery journey.
          </p>
          <div
            style={{
              display: "grid",
              gap: 10,
              maxWidth: 610,
              marginTop: 24,
            }}
          >
            {[
              "Curated bridal, festive, and everyday jewellery edits in one private space.",
              "Your profile keeps favourites, cart choices, and order details connected.",
              "Member access gives every visit a personalised boutique feel.",
            ].map((item, index) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                  animation: `loginFadeRise 0.7s ease ${0.22 + index * 0.1}s both`,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    marginTop: 7,
                    background: "#d5aa67",
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div
            className="login-visual-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 12,
              maxWidth: 620,
              marginTop: 28,
            }}
          >
            {[
              ["500+", "Signature Pieces"],
              ["24K", "Gold Finish"],
              ["1:1", "Profile Access"],
            ].map(([value, label], index) => (
              <div
                className="login-info-card"
                key={label}
                style={{
                  padding: "16px 14px",
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  animationDelay: `${index * 0.25}s`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28,
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "1.6px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.64)",
                    marginTop: 8,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              maxWidth: 620,
              marginTop: 22,
              padding: "18px 20px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "2.6px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.64)",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Member Experience
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 24,
                lineHeight: 1.2,
                color: "#fff",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Your jewellery journey stays personal from first pick to final delivery.
            </p>
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.74)",
              }}
            >
              Browse occasion-ready collections, keep your delivery details ready, and return to saved favourites whenever a celebration calls.
            </p>
          </div>
        </div>
      </section>

      <section
        className="login-panel-wrap"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "34px",
          background:
            "linear-gradient(135deg, rgba(255,252,247,0.98), rgba(243,232,216,0.98), rgba(255,250,241,0.98))",
          backgroundSize: "220% 220%",
          animation: "loginPanelWash 9s ease-in-out infinite",
          overflow: "hidden",
        }}
      >
        <div className="login-gold-sweep" style={{ opacity: 0.22, left: "-44%", top: "-36%" }} />
        <div className="login-gold-sweep" style={{ opacity: 0.16, left: "18%", top: "-18%", animationDelay: "2s" }} />
        <form
          className="login-card"
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: 460,
            background: "rgba(255,255,255,0.86)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(90,55,25,0.14)",
            borderRadius: 8,
            boxShadow: "0 28px 90px rgba(90,55,25,0.2)",
            overflow: "hidden",
            animation: "loginFadeRise 0.75s ease 0.12s both",
          }}
        >
        <div
          style={{
            padding: "28px 30px 0",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 4,
              lineHeight: 1,
              color: "var(--brand)",
            }}
          >
            SHETS
          </p>
          <p
            style={{
              fontSize: 9,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "var(--brand2)",
              marginTop: 6,
            }}
          >
            Jewellers
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 30,
              marginTop: 24,
              fontWeight: 700,
              color: "#1b120d",
              lineHeight: 1.1,
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              color: "rgba(0,0,0,0.56)",
              fontSize: 13,
              lineHeight: 1.7,
              marginTop: 8,
            }}
          >
            Enter your details to access the full website, save your favourites, and track every order from one place.
          </p>
          <div
            style={{
              display: "grid",
              gap: 8,
              marginTop: 18,
              padding: "14px 15px",
              background: "rgba(213,170,103,0.12)",
              border: "1px solid rgba(90,55,25,0.12)",
              borderRadius: 6,
            }}
          >
            {[
              "Quick checkout with saved profile details",
              "Wishlist access for bridal and festive picks",
              "Order updates kept neatly in your account",
            ].map((item) => (
              <p
                key={item}
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.62)",
                  fontWeight: 600,
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="login-card-body" style={{ padding: "24px 30px 30px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
              marginBottom: 18,
            }}
          >
            {[
              ["Profile", "Auto-created"],
              ["Access", "Members only"],
            ].map(([label, value], index) => (
              <div
                className="login-detail-card"
                key={label}
                style={{
                  border: "1px solid rgba(90,55,25,0.13)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,247,243,0.84))",
                  borderRadius: 6,
                  padding: "12px 13px",
                  animationDelay: `${0.18 + index * 0.12}s`,
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: "var(--brand2)",
                    fontWeight: 700,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18,
                    color: "var(--brand)",
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {[
            ["username", "Username", "Your username", "text"],
            ["email", "Email Address", "you@example.com", "email"],
            ["password", "Password", "Enter your password", "password"],
          ].map(([key, label, placeholder, type]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--brand1)",
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {label}
              </label>
              <input
                value={form[key]}
                onChange={set(key)}
                type={type}
                placeholder={placeholder}
                style={inputStyle(errors[key])}
              />
              {errors[key] && (
                <p style={{ fontSize: 11, color: "var(--red)", marginTop: 5 }}>
                  {errors[key]}
                </p>
              )}
            </div>
          ))}

          <div
            style={{
              background: "var(--brand5)",
              border: "1px solid rgba(90,55,25,0.12)",
              borderRadius: 6,
              padding: "12px 14px",
              marginBottom: 18,
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--brand1)",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Password Requirements
            </p>
            <div style={{ display: "grid", gap: 5 }}>
              {passwordRules.map((rule) => {
                const passed = rule.test(form.password);
                return (
                  <span
                    key={rule.label}
                    style={{
                      fontSize: 12,
                      color: passed ? "var(--green)" : "rgba(0,0,0,0.58)",
                    }}
                  >
                    {passed ? "OK" : "--"} {rule.label}
                  </span>
                );
              })}
            </div>
          </div>

          <button
            className="login-submit"
            type="submit"
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              padding: "14px",
              background: "var(--brand)",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "2px",
              textTransform: "uppercase",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>Login</span>
          </button>
          <p
            style={{
              marginTop: 14,
              textAlign: "center",
              fontSize: 11,
              lineHeight: 1.6,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Your profile is saved on this browser from the username and email you enter.
          </p>
        </div>
        </form>
      </section>
    </div>
  );
};

export default function App() {
  const initialRoute = getRouteState();
  const [page, setPage] = useState(initialRoute.page);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [collectionsTab, setCollectionsTab] = useState(initialRoute.collectionsTab);
  const [policyPage, setPolicyPage] = useState(initialRoute.policyPage);

  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(() => getSavedUser());

  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteState();
      setPage(route.page);
      setCollectionsTab(route.collectionsTab);
      setPolicyPage(route.policyPage);
      setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (targetPage) => {
    setPage(targetPage);
    setPolicyPage(null);
    setSelectedProduct(null);
    pushPath(PAGE_PATHS[targetPage] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPolicyPage = (key) => {
    setPolicyPage(key);
    setPage("Policy");
    setSelectedProduct(null);
    pushPath(`/policy/${slugify(key)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openShopCategory = (category) => {
    setCollectionsTab(category);
    setPage("Collections");
    setPolicyPage(null);
    setSelectedProduct(null);
    pushPath(`/collections/${slugify(category)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => setCartItems((prev) => [...prev, product]);
  const removeFromCart = (idx) =>
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  const clearCart = () => setCartItems([]);
  const placeOrder = (orderDetails) => {
    setOrders((prev) => [orderDetails, ...prev]);
    setCartItems([]);
  };
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.findIndex((p) => p.id === product.id);
      if (exists >= 0) return prev.filter((_, i) => i !== exists);
      return [...prev, product];
    });
  };
  const removeWishlist = (idx) =>
    setWishlist((prev) => prev.filter((_, i) => i !== idx));
  const isWishlisted = (id) => wishlist.some((p) => p.id === id);

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setPage("ProductDetail");
    pushPath("/product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAuth = () => setShowAuth(true);

  const loginUser = (nextUser) => {
    setUser(nextUser);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  };

  const updateUser = (updates) => {
    setUser((current) => {
      if (!current) return current;
      const nextUser = { ...current, ...updates };
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const saveProfileAddress = (address) => {
    updateUser({
      addresses: [
        {
          id: Date.now(),
          label: "Delivery Address",
          line1: address.line1,
          line2: `${address.city} - ${address.pincode}`,
          phone: address.phone,
          default: true,
        },
      ],
    });
  };

  const logoutUser = () => {
    setUser(null);
    setWishlist([]);
    setCartItems([]);
    setShowAuth(false);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff" }}>
        <GlobalStyle />
        <LoginGate onLogin={loginUser} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <GlobalStyle />
      <Navbar
        page={page}
        setPage={navigateTo}
        cartCount={cartItems.length}
        setCollectionsTab={setCollectionsTab}
        onSearchOpen={() => setShowSearch(true)}
        onCartOpen={() => setShowCart(true)}
        onProfileOpen={() => setShowAuth(true)}
        user={user}
        activeCollectionTab={collectionsTab}
      />

      <main style={{ minHeight: "70vh" }}>
        {page === "Home" && (
          <HomePage
            setPage={navigateTo}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            setCollectionsTab={setCollectionsTab}
            user={user}
            onOpenAuth={openAuth}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}
        {page === "Collections" && (
          <CollectionsPage
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            activeTab={collectionsTab}
            setActiveTab={setCollectionsTab}
            user={user}
            onOpenAuth={openAuth}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />
        )}
        {page === "ProductDetail" && selectedProduct && (
          <ProductDetailPage
            key={`${selectedProduct.id}-${selectedProduct.img}`}
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => navigateTo("Collections")}
            onViewProduct={viewProduct}
            user={user}
            onOpenAuth={openAuth}
            isWishlisted={isWishlisted}
            onToggleWishlist={toggleWishlist}
          />
        )}
        {page === "Bridal" && (
          <BridalPage
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            user={user}
            onOpenAuth={openAuth}
          />
        )}
        {page === "Custom Order" && <CustomOrderPage />}
        {page === "Contact" && <ContactPage />}
        {page === "Policy" && policyPage && (
          <PolicyPage policyKey={policyPage} onBack={() => navigateTo("Home")} />
        )}
      </main>

      <Footer
        setPage={navigateTo}
        onPolicyPage={openPolicyPage}
        onShopCategory={openShopCategory}
      />

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onViewProduct={(p) => {
            viewProduct(p);
            setShowSearch(false);
          }}
        />
      )}
      {showCart && (
        <CartDrawer
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onClear={clearCart}
          onPlaceOrder={placeOrder}
          user={user}
          onSaveProfileAddress={saveProfileAddress}
          onOpenAuth={() => {
            setShowCart(false);
            setShowAuth(true);
          }}
        />
      )}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          user={user}
          onLogin={loginUser}
          onUpdateUser={updateUser}
          onLogout={logoutUser}
          orders={orders}
          wishlist={wishlist}
          onRemoveWishlist={removeWishlist}
        />
      )}
    </div>
  );
}
