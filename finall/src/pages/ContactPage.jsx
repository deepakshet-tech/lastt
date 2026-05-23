/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { AnimatedCounter, Field, useReveal } from "../shared.jsx";

export const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();

  const contactInfo = [
    {
      icon: "📍",
      label: "Address",
      value:
        "Shrinathji Imitation, Pushkardham Main Road,\nKalawad Road, Rajkot – 360005, Gujarat",
      color: "#ff6b6b",
    },
    {
      icon: "📞",
      label: "Phone / WhatsApp",
      value: "+91 8618713231",
      color: "#25D366",
    },
    {
      icon: "✉️",
      label: "Email",
      value: "shets@jewellers.com",
      color: "#4285F4",
    },
    {
      icon: "🕐",
      label: "Store Hours",
      value: "Mon–Fri: 10 AM – 6 PM\nSun: By appointment only",
      color: "#F5A623",
    },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* ── Animated Hero ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(90,55,25,0.95), rgba(50,25,5,0.9))",
          padding: "52px 24px 44px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {["💎", "✨", "💍", "🌸", "⭐", "👑"].map((e, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: 18,
              opacity: 0.15,
              top: `${10 + i * 14}%`,
              left: `${5 + i * 16}%`,
              animation: `float ${5 + i}s ${i * 0.6}s ease-in-out infinite`,
            }}
          >
            {e}
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
              marginBottom: 12,
            }}
          >
            ✦ Get in Touch ✦
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(26px,5vw,48px)",
              color: "#fff",
              marginBottom: 10,
            }}
          >
            Contact & Appointments
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            We'd love to hear from you. Visit us or book an appointment.
          </p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: "var(--brand)", padding: "20px 24px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            textAlign: "center",
          }}
        >
          {[
            { val: 25, suffix: "+", label: "Years" },
            { val: 500000, suffix: "+", label: "Happy Customers" },
            { val: 50, suffix: "%", label: "Off Today" },
            { val: 3, suffix: "-5", label: "Day Delivery" },
          ].map((s, i) => (
            <div
              key={i}
              style={{ animation: `fadeUp 0.6s ${i * 0.1}s ease both` }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#FFD700",
                }}
              >
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="page-container"
        style={{ paddingTop: 48, paddingBottom: 60 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* ── Info side ── */}
          <div>
            <div ref={r1} className="reveal-left">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: "var(--brand)",
                  marginBottom: 24,
                  paddingBottom: 12,
                  borderBottom: "2px solid var(--brand4)",
                }}
              >
                Shets Jewellers
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 28,
              }}
            >
              {contactInfo.map(({ icon, label, value, color }, i) => (
                <div
                  key={label}
                  ref={useReveal()}
                  className="reveal-left"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                  onMouseEnter={() => setHoveredInfo(i)}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      padding: "14px 16px",
                      borderRadius: 10,
                      border: `1px solid ${
                        hoveredInfo === i ? color + "44" : "var(--brand4)"
                      }`,
                      background: hoveredInfo === i ? color + "08" : "#fff",
                      transition: "all 0.3s",
                      cursor: "default",
                      transform: hoveredInfo === i ? "translateX(4px)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background:
                          hoveredInfo === i ? color + "18" : "var(--brand5)",
                        border: `1px solid ${
                          hoveredInfo === i ? color + "44" : "var(--brand4)"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        flexShrink: 0,
                        transition: "all 0.3s",
                        animation:
                          hoveredInfo === i
                            ? "pulse 1s ease-in-out infinite"
                            : "none",
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: hoveredInfo === i ? color : "var(--brand2)",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          marginBottom: 5,
                          transition: "color 0.3s",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#444",
                          lineHeight: 1.75,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div ref={r2} className="reveal-left">
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "var(--brand2)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Follow Us
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "📘 Facebook", color: "#1877F2" },
                  { label: "📸 Instagram", color: "#E1306C" },
                  { label: "▶ YouTube", color: "#FF0000" },
                ].map((s, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      window.open(
                        [
                          "https://www.facebook.com/",
                          "https://www.instagram.com/",
                          "https://www.youtube.com/",
                        ][i],
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    style={{
                      background: "var(--brand5)",
                      border: "1px solid var(--brand4)",
                      color: "var(--brand)",
                      padding: "8px 14px",
                      fontSize: 10,
                      fontWeight: 600,
                      borderRadius: 6,
                      cursor: "pointer",
                      fontFamily: "Montserrat",
                      transition: "all 0.2s",
                      animation: `fadeUp 0.5s ${0.5 + i * 0.1}s ease both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = s.color;
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = s.color;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--brand5)";
                      e.currentTarget.style.color = "var(--brand)";
                      e.currentTarget.style.borderColor = "var(--brand4)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Booking form ── */}
          <div ref={r3} className="reveal-right">
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--brand4)",
                borderRadius: 16,
                padding: "32px",
                boxShadow: "0 8px 40px rgba(90,55,25,0.08)",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 16px 56px rgba(90,55,25,0.13)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 40px rgba(90,55,25,0.08)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    animation: "pulse 3s ease-in-out infinite",
                  }}
                >
                  📅
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--brand)",
                  }}
                >
                  Book a Store Visit
                </h2>
              </div>

              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 0",
                    animation: "bounceIn 0.7s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: 56,
                      marginBottom: 16,
                      animation: "bounceIn 0.6s 0.2s ease both",
                    }}
                  >
                    🎊
                  </div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "var(--brand)",
                      marginBottom: 10,
                    }}
                  >
                    Appointment Confirmed!
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--brand1)",
                      lineHeight: 1.7,
                    }}
                  >
                    We'll send a confirmation to <strong>{form.email}</strong>{" "}
                    shortly.
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      padding: "10px 16px",
                      background: "var(--brand5)",
                      border: "1px solid var(--brand4)",
                      borderRadius: 8,
                      fontSize: 11,
                      color: "var(--brand1)",
                    }}
                  >
                    📞 We may also call you on the day before to confirm.
                  </div>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                  <Field
                    label="Your Name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full name"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="your@email.com"
                  />
                  <Field
                    label="Preferred Date"
                    type="date"
                    value={form.date}
                    onChange={set("date")}
                  />
                  <Field
                    label="Message (Optional)"
                    textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Any specific pieces or queries?"
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
                      borderRadius: 8,
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
                    Book Appointment 📅
                  </button>
                </div>
              )}
            </div>

            {/* Quick contact card */}
            <div
              ref={r4}
              className="reveal"
              style={{
                marginTop: 16,
                padding: "16px 20px",
                background:
                  "linear-gradient(135deg, rgba(90,55,25,0.05), rgba(90,55,25,0.02))",
                border: "1px solid var(--brand4)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 14,
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
                  animation: "pulse 2.5s ease-in-out infinite",
                }}
              >
                💬
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: "var(--brand)",
                    marginBottom: 3,
                  }}
                >
                  Prefer a quick chat?
                </p>
                <p style={{ fontSize: 11, color: "var(--brand1)" }}>
                  WhatsApp: <strong>+91 76006 59791</strong> · Mon–Fri 10–6
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── POLICY PAGE DATA ─────────────────────────────────────────────────────────
