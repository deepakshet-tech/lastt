import { useState } from "react";
import { POLICY_CONTENT, PolicySection, useReveal } from "../shared.jsx";

export const PolicyPage = ({ policyKey, onBack }) => {
  const policy = POLICY_CONTENT[policyKey];
  const [activeSection, setActiveSection] = useState(null);
  const r1 = useReveal();

  if (!policy) return null;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* ── Hero ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${policy.color}ee 0%, ${policy.color}bb 100%)`,
          padding: "52px 24px 44px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 100 + i * 60,
              height: 100 + i * 60,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              top: "50%",
              left: "50%",
              marginTop: -(50 + i * 30),
              marginLeft: -(50 + i * 30),
              animation: `spin ${15 + i * 5}s linear infinite`,
            }}
          />
        ))}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "fadeUp 0.7s ease",
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 16,
              animation: "bounceIn 0.8s ease",
            }}
          >
            {policy.icon}
          </div>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "5px",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Shets Jewellers
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(24px,5vw,48px)",
              color: "#fff",
              marginBottom: 10,
              lineHeight: 1.1,
            }}
          >
            {policy.hero}
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
            {policy.subtitle}
          </p>
        </div>
      </div>

      <div
        className="page-container"
        style={{ paddingTop: 40, paddingBottom: 60 }}
      >
        {/* Back breadcrumb */}
        <p
          style={{
            fontSize: 11,
            color: "var(--brand2)",
            marginBottom: 32,
            cursor: "pointer",
          }}
          onClick={onBack}
        >
          ←{" "}
          <span style={{ color: "var(--brand)", fontWeight: 600 }}>
            Back to Home
          </span>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* ── Sticky sidebar ── */}
          <div
            ref={r1}
            className="reveal-left"
            style={{ position: "sticky", top: 100 }}
          >
            <div
              style={{
                background: "var(--brand5)",
                border: "1px solid var(--brand4)",
                borderRadius: 12,
                padding: "20px 16px",
              }}
            >
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "var(--brand2)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Contents
              </p>
              {policy.sections.map((sec, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveSection(i);
                    document
                      .getElementById(`section-${i}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "9px 12px",
                    background:
                      activeSection === i ? "var(--brand)" : "transparent",
                    color: activeSection === i ? "#fff" : "var(--brand1)",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontFamily: "Montserrat",
                    fontSize: 11,
                    fontWeight: 500,
                    marginBottom: 4,
                    transition: "all 0.2s",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== i) {
                      e.currentTarget.style.background = "var(--brand4)";
                      e.currentTarget.style.color = "var(--brand)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== i) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--brand1)";
                    }
                  }}
                >
                  {i + 1}. {sec.title}
                </button>
              ))}
            </div>
          </div>

          {/* ── Content sections ── */}
          <div>
            {policy.sections.map((sec, i) => (
              <PolicySection
                key={`${policyKey}-${sec.title}`}
                section={sec}
                index={i}
                color={policy.color}
              />
            ))}

            {/* Last updated */}
            <div
              style={{
                background: "var(--brand5)",
                border: "1px solid var(--brand4)",
                borderRadius: 8,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>📅</span>
              <p style={{ fontSize: 11, color: "var(--brand2)" }}>
                Last updated:{" "}
                <strong style={{ color: "var(--brand)" }}>January 2025</strong>{" "}
                · For questions, contact{" "}
                <strong style={{ color: "var(--brand)" }}>
                  shets@jewellers.com
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
