// src/App.tsx
import React from "react";
import "./App.css";

export default function App() {
  return (
    <>
      {/* Top Navbar */}
      <header className="nav">
        <div className="nav-left">
          <a className="chip chip-active" href="#">HOME</a>

          <div className="menu">
            <button className="chip">MARKET ▾</button>
            {/* (Optional) dropdown items could go here later */}
          </div>
        </div>

        <div className="nav-right">
          <div className="menu">
            <button className="chip chip-primary">SOURCES ▾</button>
            {/* (Optional) dropdown items could go here later */}
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="hero">
        <h1 className="brand">CONSPIRA AI</h1>
        <p className="tagline">Uncover the Crypto Undercurrent</p>

        <div className="actions">
          <a className="btn btn-hollow" href="#" aria-label="Enter Terminal">
            <span className="caret">▸</span> Enter Terminal
          </a>

          <a
            className="btn btn-solid"
            href="https://x.com/conspira_ai"
            target="_blank"
            rel="noreferrer"
          >
            Follow on X
          </a>

          <div className="email">
            <input
              className="input"
              type="email"
              placeholder="Enter email"
              inputMode="email"
              autoComplete="email"
            />
            <button className="btn btn-go">Go</button>
          </div>
        </div>
      </main>
    </>
  );
}
