import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const TELEGRAM_URL = "https://t.me/ConspiraAI";
const X_HANDLE_URL = "https://x.com/conspira_ai";

export default function App() {
  const phrases = useMemo(
    () => ["System Online", "Network Stable", "Signals Updating Live"],
    []
  );
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIdx((v) => (v + 1) % phrases.length);
        setFade(false);
      }, 240);
    }, 2600);
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <div className="page">
      <header className="topbar">
        <a href="/" className="brand">CONSPIRA AI</a>
        <nav className="nav">
          <a className="link" href={X_HANDLE_URL} target="_blank" rel="noreferrer">Follow on X</a>
          <a className="link" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Telegram</a>
        </nav>
      </header>

      <main className="hero">
        <h1 className="headline">Uncover the Crypto Undercurrent</h1>
        <p className="tagline">Real-time market pull signals. Curated. Fast. Coming online soon.</p>

        <div className="statusbar">
          <span className="status-dot" />
          <strong className="status-label">System Status</strong>
          <span className="status-sep">—</span>
          <span className={`status-rot ${fade ? "fade" : ""}`}>{phrases[idx]}</span>
        </div>

        <div className="cta-row">
          <a className="btn-primary" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            Get Early Access
          </a>
          <a className="btn-ghost" href="#" aria-disabled="true">
            _ Enter Terminal
          </a>
        </div>

        <section className="feature-card">
          <div className="kicker">COMING SOON</div>
          <h3 className="card-title">Market Pull Signal</h3>
          <p className="card-text">
            A single daily “Signal of the Day,” plus runner-ups. Based on near-term acceleration
            and 7-day follow-through — simple 0–10 score you can act on.
          </p>
          <div className="card-cta">
            <a className="btn-primary-sm" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              Join Waitlist
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Conspira AI</footer>
    </div>
  );
}
