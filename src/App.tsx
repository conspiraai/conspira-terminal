// src/App.tsx
import React, { useEffect, useState } from "react";

const TELEGRAM_URL = "https://t.me/ConspiraAI";
const X_HANDLE_URL = "https://x.com/conspira_ai";

function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
              Be first to try the Conspira AI Terminal. We’ll notify you as
              modules go live.
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
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                style={modalLink}
              >
                Join our Telegram
              </a>
            </div>
          </>
        ) : (
          <>
            <h2 style={modalTitle}>You’re on the list</h2>
            <p style={modalText}>Follow us on X for drops and updates.</p>
            <a
              href={X_HANDLE_URL}
              target="_blank"
              rel="noreferrer"
              style={modalCTA as any}
            >
              Follow on X
            </a>
          </>
        )}
        <button style={modalGhost} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function StatusBarRotating() {
  const messages = [
    "System Online • Early Modules Active",
    "Beta Status • Limited Invites Available",
    "Network Stable • Signals Updating Live",
  ];

  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false); // fade out
      const t = setTimeout(() => {
        setIdx((n) => (n + 1) % messages.length); // swap text
        setVisible(true); // fade in
      }, 280); // match transition below
      return () => clearTimeout(t);
    }, 3000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div style={statusBar}>
      <span style={statusDot} />
      <strong>System Status</strong>
      <span style={statusSep}> — </span>
      <span
        style={{
          ...statusText,
          opacity: visible ? 1 : 0,
          transition: "opacity 280ms ease",
        }}
      >
        {messages[idx]}
      </span>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={page}>
      <header style={topbar}>
        <a href="/" style={brand}>
          CONSPIRA AI
        </a>
        <nav style={{ display: "flex", gap: 10 }}>
          <a href={X_HANDLE_URL} target="_blank" rel="noreferrer" style={follow}>
            Follow on X
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            style={follow}
          >
            Telegram
          </a>
        </nav>
      </header>

      <section style={hero}>
        <h1 style={headline}>Uncover the Crypto Undercurrent</h1>
        <p style={tagline}>
          Real-time market pull signals. Curated. Fast. Coming online soon.
        </p>

        <StatusBarRotating />

        <div style={ctaRow}>
          <button style={btnPrimary} onClick={() => setOpen(true)}>
            Get Early Access
          </button>
          <a href="#" style={btnGhost}>
            _ Enter Terminal
          </a>
        </div>
      </section>

      <section style={section}>
        <div style={card}>
          <div style={kicker}>Coming Soon</div>
          <h3 style={cardTitle}>Market Pull Signal</h3>
          <p style={cardText}>
            A single daily “Signal of the Day,” plus runner-ups. Based on
            near-term acceleration and 7-day follow-through — simple 0–10 score
            you can act on.
          </p>
          <div style={cardCTAWrap}>
            <button style={btnPrimarySm} onClick={() => setOpen(true)}>
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      <footer style={footer}>© {new Date().getFullYear()} Conspira AI</footer>

      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

/* ------------ styles ------------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(1200px 600px at 50% -10%, rgba(245,46,166,1), #0b0f15), radial-gradient(900px 500px at 80% -5%, rgba(139,92,246,.12), #0b0f15), #0b0f15",
  color: "#7e7ec2",
};

const topbar: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 40px",
};

const brand: React.CSSProperties = {
  fontWeight: "bold",
  color: "#fff",
  textDecoration: "none",
};

const follow: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
};

const hero: React.CSSProperties = {
  textAlign: "center",
  padding: "100px 20px 60px",
};

const headline: React.CSSProperties = {
  fontSize: "42px",
  fontWeight: "bold",
  color: "#fff",
  marginBottom: "10px",
};

const tagline: React.CSSProperties = {
  fontSize: "18px",
  color: "#aaa",
  marginBottom: "28px",
};

const statusBar: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  maxWidth: 880,
  padding: "10px 14px",
  borderRadius: 8,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset",
  color: "#cfd2ff",
};

const statusDot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 999,
  background:
    "radial-gradient(circle at 30% 30%, #40ff9d, #1ed46d 60%, #0a9c4d 100%)",
  boxShadow: "0 0 10px #40ff9d, 0 0 18px #1ed46d",
};

const statusSep: React.CSSProperties = { opacity: 0.7 };

const statusText: React.CSSProperties = { color: "#edf0ff" };

const ctaRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 12,
  marginTop: 20,
};

const btnPrimary: React.CSSProperties = {
  background: "linear-gradient(90deg,#ff00cc,#3333ff)",
  border: "none",
  padding: "12px 24px",
  borderRadius: 6,
  color: "#fff",
  cursor: "pointer",
  fontSize: 16,
};

const btnGhost: React.CSSProperties = {
  border: "1px solid #555",
  padding: "12px 24px",
  borderRadius: 6,
  color: "#fff",
  cursor: "pointer",
  fontSize: 16,
  background: "transparent",
};

const section: React.CSSProperties = {
  padding: "40px 20px",
  display: "flex",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  maxWidth: 600,
  padding: 24,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8,
};

const kicker: React.CSSProperties = {
  textTransform: "uppercase",
  fontSize: 12,
  marginBottom: 8,
  color: "#ccc",
};

const cardTitle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: "bold",
  color: "#fff",
};

const cardText: React.CSSProperties = {
  fontSize: 16,
  color: "#bbb",
  marginTop: 8,
};

const cardCTAWrap: React.CSSProperties = { marginTop: 16 };

const btnPrimarySm: React.CSSProperties = {
  background: "linear-gradient(90deg,#ff00cc,#3333ff)",
  border: "none",
  padding: "10px 20px",
  borderRadius: 6,
  color: "#fff",
  cursor: "pointer",
  fontSize: 14,
};

const footer: React.CSSProperties = {
  textAlign: "center",
  padding: "40px 0",
  fontSize: 12,
  color: "#777",
};

/* modal styles */

const backdrop: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal: React.CSSProperties = {
  background: "#111",
  padding: 20,
  borderRadius: 8,
  width: "90%",
  maxWidth: 400,
  color: "#fff",
};

const modalTitle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
};

const modalText: React.CSSProperties = { fontSize: 14, marginBottom: 20 };

const modalInput: React.CSSProperties = {
  flex: 1,
  padding: 8,
  border: "1px solid #555",
  borderRadius: 4,
  background: "#222",
  color: "#fff",
};

const modalCTA: React.CSSProperties = {
  background: "linear-gradient(90deg,#ff00cc,#3333ff)",
  border: "none",
  padding: "8px 16px",
  borderRadius: 4,
  color: "#fff",
  cursor: "pointer",
  fontSize: 14,
};

const modalGhost: React.CSSProperties = {
  marginTop: 20,
  background: "transparent",
  border: "1px solid #555",
  padding: "8px 16px",
  borderRadius: 4,
  color: "#fff",
  cursor: "pointer",
};

const modalFineprint: React.CSSProperties = {
  marginTop: 12,
  fontSize: 12,
  color: "#aaa",
};

const modalLink: React.CSSProperties = { color: "#ff00cc" };
