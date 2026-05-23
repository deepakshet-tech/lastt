/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Field, useReveal } from "../shared.jsx";

export const CustomOrderPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setActiveStep(["name", "email", "description", "budget"].indexOf(k) + 1);
  };

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();

  const steps = [
    {
      icon: "✍️",
      title: "Share Your Vision",
      desc: "Tell us about the design, style and occasion you have in mind.",
    },
    {
      icon: "💎",
      title: "Master Craftsmen",
      desc: "Our artisans with 25+ years of experience bring your idea to life.",
    },
    {
      icon: "📦",
      title: "Delivered to You",
      desc: "Your bespoke piece arrives safely, ready to be cherished forever.",
    },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* ── Animated Hero Banner ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(90,55,25,0.96) 0%, rgba(60,30,8,0.92) 100%)",
          padding: "60px 24px 50px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating decorative circles */}
        {[
          { size: 180, top: "-40px", left: "-40px", delay: "0s", dur: "6s" },
          { size: 120, top: "20px", right: "-20px", delay: "2s", dur: "8s" },
          { size: 80, bottom: "-20px", left: "30%", delay: "1s", dur: "7s" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              top: c.top,
              left: c.left,
              right: c.right,
              bottom: c.bottom,
              animation: `float ${c.dur} ${c.delay} ease-in-out infinite`,
            }}
          />
        ))}
        {/* Floating jewel emojis */}
        {["💍", "✨", "💎", "🌸", "👑"].map((emoji, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: 20,
              opacity: 0.2,
              top: `${15 + i * 15}%`,
              left: `${8 + i * 18}%`,
              animation: `particleDrift ${4 + i}s ${
                i * 0.7
              }s ease-in-out infinite`,
            }}
          >
            {emoji}
          </div>
        ))}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "fadeUp 0.8s ease",
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "6px",
              color: "rgba(255,215,0,0.8)",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            ✦ Bespoke Service ✦
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(28px,5vw,52px)",
              color: "#fff",
              marginBottom: 14,
              lineHeight: 1.1,
            }}
          >
            Custom Order Request
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.9,
            }}
          >
            Tell us your vision and our master jewellers will craft something
            extraordinary, just for you.
          </p>
        </div>
      </div>

      {/* ── How it Works ── */}
      <div
        style={{
          background: "var(--brand5)",
          borderBottom: "1px solid var(--brand4)",
          padding: "44px 24px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            ref={r1}
            className="reveal"
            style={{ textAlign: "center", marginBottom: 32 }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "4px",
                color: "var(--brand2)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              The Process
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 26,
                color: "var(--brand)",
              }}
            >
              How It Works
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                ref={useReveal()}
                className="reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--brand4)",
                    borderRadius: 12,
                    padding: "28px 20px",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    animation: `fadeUp 0.6s ${i * 0.15}s ease both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(90,55,25,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      margin: "0 auto 16px",
                      animation: `pulse 3s ${i * 0.5}s ease-in-out infinite`,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--sale-bg)",
                      color: "var(--brand)",
                      fontSize: 11,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: "var(--brand)",
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--brand1)",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <div style={{ padding: "48px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "var(--brand2)", marginBottom: 24 }}>
            Home ›{" "}
            <strong style={{ color: "var(--brand)" }}>Custom Order</strong>
          </p>

          {submitted ? (
            <div
              ref={r2}
              className="reveal-scale"
              style={{
                textAlign: "center",
                padding: "56px 32px",
                border: "1px solid var(--brand3)",
                borderRadius: 16,
                background: "var(--brand5)",
                animation: "bounceIn 0.7s ease",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  marginBottom: 20,
                  animation: "bounceIn 0.8s 0.2s ease both",
                }}
              >
                🎉
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "var(--brand)",
                  marginBottom: 12,
                }}
              >
                Request Received!
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--brand1)",
                  lineHeight: 1.9,
                  marginBottom: 20,
                }}
              >
                Our team will reach out to{" "}
                <strong>{form.email || "you"}</strong> within 24 hours via
                WhatsApp or email.
              </p>
              <div
                style={{ display: "flex", gap: 8, justifyContent: "center" }}
              >
                {["📞", "✉️", "💬"].map((e, i) => (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      animation: `bounceIn 0.5s ${0.4 + i * 0.15}s ease both`,
                      opacity: 0,
                    }}
                  >
                    {e}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              ref={r3}
              className="reveal"
              style={{
                background: "#fff",
                border: "1px solid var(--brand4)",
                borderRadius: 12,
                padding: "32px",
                boxShadow: "0 4px 24px rgba(90,55,25,0.06)",
              }}
            >
              {/* Progress dots */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 28,
                }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: n <= activeStep ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background:
                        n <= activeStep ? "var(--brand)" : "var(--brand4)",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <Field
                    label="Your Name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full name"
                  />
                  <Field
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                  />
                </div>
                <Field
                  label="Design Description"
                  textarea
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Describe your dream piece — style, occasion, inspirations..."
                />
                <Field
                  label="Budget Range"
                  value={form.budget}
                  onChange={set("budget")}
                  placeholder="e.g. ₹2,000 – ₹5,000"
                />
                <button
                  onClick={() => {
                    if (form.name && form.email) setSubmitted(true);
                  }}
                  style={{
                    padding: "14px",
                    background: "var(--brand)",
                    color: "#fff",
                    border: "none",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: 6,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 16px rgba(90,55,25,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(90,55,25,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(90,55,25,0.3)";
                  }}
                >
                  Submit Request ✨
                </button>
              </div>
            </div>
          )}

          {/* WhatsApp strip */}
          <div
            ref={r4}
            className="reveal"
            style={{
              marginTop: 20,
              padding: "18px 22px",
              background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
              border: "1px solid #c8e6c9",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 16,
              animation: "fadeUp 0.6s 0.4s ease both",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              💬
            </div>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#2e7d32",
                  marginBottom: 4,
                }}
              >
                Prefer WhatsApp?
              </p>
              <p style={{ fontSize: 12, color: "#388e3c", lineHeight: 1.6 }}>
                Chat with us: <strong>+91 76006 59791</strong> · Mon–Fri, 10 AM
                – 6 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: CONTACT ────────────────────────────────────────────────────────────
