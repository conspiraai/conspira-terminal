import React, { useEffect, useState } from "react";

/** Links */
const TELEGRAM_URL = "https://t.me/ConspiraAI";
const X_HANDLE_URL = "https://x.com/conspira_ai";

export default function App() {
  // Rotate the little status pills
  const messages = ["System Online", "Network Stable", "Signals Updating Live"];
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={page}>
      {/* Top bar */}
      <header style={topbar}>
        <a href="/" style={brand}>CONSPIRA AI</a>
        <nav style={{ display: "flex", gap: 10 }}>
          <a href={X_HANDLE_URL} target="_blank" rel="noreferrer" style={follow}>Follow on X</a>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" style={follow}>Telegram</a>
        </nav>
      </header>

      {/* Hero */}
      <section style={hero}>
        <h1 style={headline}>Uncover the Crypto Undercurrent</h1>
        <p style={tagline}>Real-time market pulse signals. Curated. Fast. Coming online soon.</p>

        {/* Status bar */}
        <div className="statusbar">
          <span className="status-dot" />
          <strong>System Status</strong>
          <span className="status-sep">—</span>
          <span>{messages[msgIdx]}</span>
        </div>

        {/* CTAs */}
        <div style={ctaRow}>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" style={btnPrimary}>Get Early Access</a>
          <a href="#" style={btnGhost}>_ Enter Terminal</a>
        </div>
      </section>

      {/* Coming Soon feature */}
      <section style={section}>
        <div style={card}>
          <div style={kicker}>COMING SOON</div>
          <h3 style={cardTitle}>Market Pulse Signal</h3>
          <p style={cardText}>
            One daily “Signal of the Day,” plus runner-ups. Based on near-term acceleration and 7-day
            follow-through — a simple 0–10 score you can act on.
          </p>
          <div style={cardCTAWrap}>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" style={btnPrimarySm}>Join Waitlist</a>
          </div>
        </div>
      </section>

      <footer style={footer}>© {new Date().getFullYear()} Conspira AI</footer>
    </div>
  );
}

/* ---------- Inline styles (kept minimal & consistent with your current look) ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(1200px 600px at 50% -10%, rgba(255, 46, 166, .12), transparent 60%), radial-gradient(900px 580px at 80% -5%, rgba(139, 92, 246, .12), transparent 60%), #0b0f15",
  color: "#e7ecf2",
};

const topbar: React.CSSProperties = {
  padding: "18px 22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const brand: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "2.4px",
  fontWeight: 700,
  color: "#c9d2ff",
  textDecoration: "none",
};

const follow: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(8px)",
  textDecoration: "none",
  color: "#cfd6ff",
  fontSize: 12,
};

const hero: React.CSSProperties = {
  textAlign: "center",
  padding: "60px 18px 24px",
};

const headline: React.CSSProperties = {
  fontSize: "44px",
  lineHeight: 1.1,
  fontWeight: 800,
  color: "#ffffff",
  margin: "0 0 14px",
  textShadow: "0 10px 40px rgba(255, 20, 147, 0.25)",
};

const tagline: React.CSSProperties = {
  fontSize: "18px",
  color: "#a9b0c6",
  marginBottom: "26px",
};

const ctaRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 12,
  marginTop: 10,
};

const btnPrimary: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: 12,
  background: "linear-gradient(90deg, #ff00a8, #8a2be2)",
  color: "#fff",
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 10px 30px rgba(255, 0, 168, .25)",
};

const btnGhost: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  color: "#d9def7",
  textDecoration: "none",
  background: "rgba(255,255,255,0.02)",
};

const section: React.CSSProperties = {
  padding: "34px 18px 80px",
  display: "flex",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  width: "min(860px, 92vw)",
  padding: "22px",
  borderRadius: 14,
  background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
  boxShadow: "0 30px 80px rgba(0,0,0,.35)",
  border: "1px solid rgba(255,255,255,.06)",
  textAlign: "left",
};

const kicker: React.CSSProperties = {
  color: "#8c93a8",
  fontSize: 12,
  letterSpacing: 1.4,
  marginBottom: 8,
};

const cardTitle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  margin: "2px 0 8px",
  color: "#f0f3ff",
};

const cardText: React.CSSProperties = {
  color: "#b6bed2",
  lineHeight: 1.6,
  margin: "0 0 16px",
};

const cardCTAWrap: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
};

const btnPrimarySm: React.CSSProperties = {
  ...btnPrimary,
  padding: "10px 14px",
  fontWeight: 700,
};

const footer: React.CSSProperties = {
  textAlign: "center",
  color: "#7f879e",
  fontSize: 12,
  padding: "40px 0 28px",
};
