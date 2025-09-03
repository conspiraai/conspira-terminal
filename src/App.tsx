// src/App.tsx
import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");

  return (
    <div className="page">
      {/* Top pill navbar */}
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="topbar-left">
            <button className="chip chip-active">HOME</button>
            <button className="chip">
              MARKET <span className="caret">▾</span>
            </button>
          </div>
          <div className="spacer" />
          <button className="chip chip-ghost">
            SOURCES <span className="caret">▾</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <main className="hero">
        <h1 className="logo-neon">CONSPIRA AI</h1>
        <p className="tagline">Uncover the Crypto Undercurrent</p>

        {/* Controls row */}
        <div className="controls">
          <a className="btn btn-hollow" href="#" onClick={(e) => e.preventDefault()}>
            <span className="prompt">›_</span> Enter Terminal
          </a>

          <a
            className="btn btn-outline"
            href="https://x.com/conspira_ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Conspira AI on X"
          >
            Follow on X
          </a>

          <form
            className="notify"
            onSubmit={(e) => {
              e.preventDefault();
              // no backend yet — just a friendly nudge
              alert("Notified (stub): " + (email || "your email"));
              setEmail("");
            }}
          >
            <input
              className="input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-pink" type="submit">
              Go
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
