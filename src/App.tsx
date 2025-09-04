import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

/* External links */
const TELEGRAM_URL = "https://t.me/ConspiraAI";
const X_HANDLE_URL = "https://x.com/conspira_ai";

/* Rotating status messages */
const STATUS_MESSAGES = [
  "System Online",
  "Network Stable",
  "Signals Updating Live",
];

/* Waitlist modal (email only, no backend yet) */
function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setDone(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!done ? (
          <>
            <h2>Get Early Access</h2>
            <p>Be first to try the Conspira AI Terminal. We’ll notify you.</p>
            <div className="row">
              <input
                type="email"
                inputMode="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="btnPrimary"
                onClick={() => {
                  if (!email || !email.includes("@")) return;
                  setDone(true);
                }}
              >
                Join
              </button>
            </div>
            <div className="fine">
              Prefer chat?{" "}
              <a
                className="link"
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join our Telegram
              </a>
            </div>
            <button className="btnGhost close" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <h2>You’re on the list ✅</h2>
            <p>Follow us on X for drops and updates.</p>
            <a
              className="btnPrimary"
              href={X_HANDLE_URL}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-flex" }}
            >
              Follow on X
            </a>
            <button className="btnGhost close" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // rotate status text every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const status = useMemo(() => STATUS_MESSAGES[idx], [idx]);

  return (
    <div className="container">
      {/* gradient backdrop */}
      <div className="hero-gradient" />

      {/* top bar */}
      <header className="topbar">
        <a className="brand" href="#" aria-label="Conspira AI">
          CONSPIRA AI
        </a>
        <nav className="links" aria-label="Primary">
          <a className="link" href={X_HANDLE_URL} target="_blank" rel="noreferrer">
            Follow on X
          </a>
          <a className="link" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            Telegram
          </a>
        </nav>
      </header>

      {/* hero */}
      <section className="hero" aria-label="Hero">
        <h1 className="headline">Uncover the Crypto Undercurrent</h1>
        <p className="tagline">
          Real-time market pull signals. Curated. Fast. Coming online soon.
        </p>

        <div className="statusbar" role="status" aria-live="polite">
          <span className="status-dot" aria-hidden="true" />
          <strong>System Status</strong>
          <span className="status-sep">—</span>
          <span>{status}</span>
        </div>

        <div className="ctaRow">
          <button className="btnPrimary" onClick={() => setOpen(true)}>
            Get Early Access
          </button>
          <a className="btnGhost" href="#" aria-disabled="true">
            _ Enter Terminal
          </a>
        </div>
      </section>

      {/* feature card */}
      <section className="section" aria-label="Market Pull Signal">
        <div className="card">
          <div className="kicker">Coming Soon</div>
          <h3 className="cardTitle">Market Pull Signal</h3>
          <p className="cardText">
            A single daily “Signal of the Day,” plus runner-ups. Based on near-term
            acceleration and 7-day follow-through — simple 0–10 score you can act on.
          </p>
          <div className="cardCTAWrap">
            <button className="btnPrimarySm" onClick={() => setOpen(true)}>
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Conspira AI</footer>

      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
