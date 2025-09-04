import React, { useState } from "react";

/** Replace this later with your real Telegram channel link */
const TELEGRAM_URL = "https://t.me/ConspiraAI";
const X_HANDLE_URL = "https://x.com/conspira_ai";

function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (!open) return null;

  return (
    <div style={backdrop} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        {!done ? (
          <>
            <h2 style={modalTitle}>Get Early Access</h2>
            <p style={modalText}>
              Be first to try the Conspira AI Terminal. We’ll notify you as modules go live.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                style={modalInput}
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                style={modalCTA}
                onClick={() => {
                  if (!email || !email.includes("@")) return;
                  setDone(true);
                }}
              >
                Join
              </button>
            </div>
            <div style={modalFineprint}>
              Prefer chat?{" "}
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" style={modalLink}>
                Join our Telegram
              </a>
              .
            </div>
            <button style={modalGhost} onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            <h2 style={modalTitle}>You’re on the list</h2>
            <p style={modalText}>Follow us on X for drops and updates.</p>
            <a href={X_HANDLE_URL} target="_blank" rel="noreferrer" style={modalCTA as any}>
              Follow on X
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={page}>
      {/* Top bar */}
      <header style={topbar}>
        <a href="/" style={brand}>CONSPIRA AI</a>
        <nav style={{ display: "flex", gap: 10 }}>
          <a href={X_HANDLE_URL} target="_blank" rel="noreferrer" style={follow}>
            Follow on X
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" style={follow}>
            Telegram
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section style={hero}>
        <h1 style={headline}>Uncover the Crypto Undercurrent</h1>
        <p style={tagline}>
          Real-time market pull signals. Curated. Fast. Coming online soon.
        </p>
<div className="statusbar">
  <span className="status-dot"></span>
  <strong>System Status</strong>
  <span className="status-sep">•</span>
  First scanners online. More modules launching soon.
</div>
        <div style={ctaRow}>
          <button style={btnPrimary} onClick={() => setOpen(true)}>
            Get Early Access
          </button>
          <a href="#" style={btnGhost}>_ Enter Terminal</a>
        </div>
      </section>

      {/* Coming Soon feature */}
      <section style={section}>
        <div style={card}>
          <div>
            <div style={kicker}>Coming Soon</div>
            <h3 style={cardTitle}>Market Pull Signal</h3>
            <p style={cardText}>
              A single daily “Signal of the Day,” plus runner-ups. Based on near-term acceleration
              and 7-day follow-through — simple 0–10 score you can act on.
            </p>
          </div>
          <div style={cardCTAWrap}>
            <button style={btnPrimarySm} onClick={() => setOpen(true)}>Join Waitlist</button>
          </div>
        </div>
      </section>

      <footer style={footer}>© {new Date().getFullYear()} Conspira AI</footer>

      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

/* ---------- inline styles to keep this drop-in self-contained ---------- */
const page: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(1200px 600px at 50% -10%, rgba(255,46,166,.12), transparent 60%)," +
    "radial-gradient(900px 500px at 80% -5%, rgba(139,92,246,.12), transparent 65%)," +
    "#0b0f15",
  color: "#e7ecf2",
};

const topbar: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  background: "rgba(11,15,21,.6)",
  backdropFilter: "blur(8px)",
  borderBottom: "1px solid rgba(255,255,255,.06)",
};

const brand: React.CSSProperties = {
  textDecoration: "none",
  fontWeight: 800,
  letterSpacing: 1,
  color: "#fff",
};

const follow: React.CSSProperties = {
  textDecoration: "none",
  color: "#cbd5e1",
  padding: "8px 12px",
  borderRadius: 10,
  background: "rgba(26,34,48,.6)",
  border: "1px solid #2a3442",
};

const hero: React.CSSProperties = { textAlign: "center", padding: "56px 16px 22px" };

const headline: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(40px, 7vw, 96px)",
  letterSpacing: 1,
  color: "#fff",
  textShadow: "0 0 22px rgba(255,46,166,.35), 0 0 50px rgba(139,92,246,.25)",
};

const tagline: React.CSSProperties = { marginTop: 12, opacity: 0.8 };

const ctaRow: React.CSSProperties = {
  marginTop: 22,
  display: "flex",
  gap: 12,
  justifyContent: "center",
  flexWrap: "wrap",
};

const btnPrimary: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: 12,
  border: 0,
  cursor: "pointer",
  background: "linear-gradient(90deg,#ff00a8,#a64dff)",
  color: "#fff",
  fontWeight: 800,
  boxShadow: "0 10px 30px rgba(0,0,0,.35)",
};

const btnGhost: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: 12,
  border: "1px dashed rgba(255,255,255,.25)",
  color: "#e7ecf2",
  textDecoration: "none",
};

const section: React.CSSProperties = { maxWidth: 1080, margin: "18px auto 64px", padding: "0 16px" };

const card: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: 16,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,.08)",
  background: "linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,.01))",
  padding: 18,
  boxShadow: "0 10px 30px rgba(0,0,0,.35)",
};

const kicker: React.CSSProperties = { fontSize: 12, opacity: 0.8, marginBottom: 6, letterSpacing: 1 };
const cardTitle: React.CSSProperties = { margin: "0 0 6px", fontSize: 22, color: "#fff" };
const cardText: React.CSSProperties = { margin: 0, color: "#b9c0cf", lineHeight: 1.5 };
const cardCTAWrap: React.CSSProperties = { display: "flex", alignItems: "center" };
const btnPrimarySm: React.CSSProperties = { ...btnPrimary, padding: "10px 14px", fontWeight: 700 };

const footer: React.CSSProperties = {
  textAlign: "center",
  color: "#92a1b3",
  padding: "28px 0 18px",
  borderTop: "1px solid rgba(255,255,255,.06)",
};

/* Modal styles */
const backdrop: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};
const modal: React.CSSProperties = {
  width: "min(560px, 92vw)",
  background: "linear-gradient(180deg,#12121a,#0e0e14)",
  border: "1px solid rgba(255,255,255,.1)",
  boxShadow: "0 12px 40px rgba(0,0,0,.5)",
  borderRadius: 14,
  padding: 24,
  color: "#e7e7ee",
};
const modalTitle: React.CSSProperties = { margin: "0 0 6px", fontSize: 24, letterSpacing: 0.5 };
const modalText: React.CSSProperties = { margin: "0 0 16px", color: "#b9b9c8", fontSize: 14, lineHeight: 1.5 };
const modalInput: React.CSSProperties = {
  flex: 1,
  padding: "12px 14px",
  background: "#0a0a12",
  color: "#e7e7ee",
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 10,
  outline: "none",
};
const modalCTA: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 10,
  border: 0,
  background: "linear-gradient(90deg,#ff00a8,#ff4d5a)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};
const modalGhost: React.CSSProperties = {
  marginTop: 12,
  background: "transparent",
  color: "#9aa0a6",
  border: 0,
  cursor: "pointer",
  fontSize: 13,
};
const modalFineprint: React.CSSProperties = { marginTop: 10, fontSize: 12, color: "#9aa0a6" };
const modalLink: React.CSSProperties = { color: "#c6d7ff", textDecoration: "none" };
