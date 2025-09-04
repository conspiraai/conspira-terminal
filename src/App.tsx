import React from "react";
import "./App.css";

const X_HANDLE = "conspira_ai"; // ✅ correct handle

export default function App() {
  return (
    <div className="shell">
      {/* Top bar */}
      <header className="topbar">
        <nav className="nav">
          <div className="nav-left">
            <a className="pill active" href="#">Home</a>
            <div className="dropdown">
              <button className="pill">Market ▾</button>
            </div>
          </div>

          <div className="nav-right">
            <a
              className="cta cta-outline"
              href={`https://x.com/${X_HANDLE}`}
              target="_blank"
              rel="noreferrer"
            >
              Follow on X
            </a>
            <div className="dropdown">
              <button className="pill">Sources ▾</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1 className="logo">CONSPIRA AI</h1>
        <p className="tag">Uncover the Crypto Undercurrent</p>

        <div className="actions">
          <a className="btn ghost">_ Enter Terminal</a>
          <a
            className="btn solid"
            href={`https://x.com/${X_HANDLE}`}
            target="_blank"
            rel="noreferrer"
          >
            Follow on X
          </a>

          <div className="waitlist">
            <input
              className="input"
              placeholder="Join the waitlist (email)"
              inputMode="email"
            />
            <button className="btn go">Go</button>
          </div>
        </div>
      </section>

      {/* Filters / meta */}
      <section className="meta">
        <div className="row">
          <label className="label">Chain</label>
          <select className="select">
            <option>All</option>
          </select>

          <span className="formula">
            Score = <b>0.6×Spike</b> + <b>0.4×Momentum</b>/2
          </span>

          <span className="live-note">
            Live data unavailable — showing demo data.
          </span>
        </div>
      </section>

      {/* Table (wrapped for horizontal scroll on small screens) */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>CHAIN</th>
              <th>PRICE</th>
              <th>VOL 1H</th>
              <th className="chip-col">SPIKE</th>
              <th className="chip-col">MOMENTUM</th>
              <th className="chip-col">SCORE</th>
              <th>LIQUIDITY</th>
              <th>LINKS</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["FATHOM", "BASE", "$0.014", "$98.00k", "5.23×", "+12.40%", "5.62", "$820.00k"],
              ["SEER", "BSC", "$0.0011", "$67.00k", "5.74×", "+6.10%", "4.66", "$430.00k"],
              ["NEON", "SOL", "$0.0032", "$125.00k", "3.33×", "+8.20%", "3.64", "$1.20M"],
              ["PULSE", "ETH", "$0.22", "$310.00k", "2.85×", "-3.50%", "1.01", "$5.90M"],
            ].map((r, i) => (
              <tr key={i}>
                <td><span className="dot" /> {r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td>{r[3]}</td>
                <td><span className="chip chip-spike">{r[4]}</span></td>
                <td>
                  <span className={`chip ${r[5].startsWith("-") ? "chip-neg" : "chip-pos"}`}>
                    {r[5]}
                  </span>
                </td>
                <td><span className="chip chip-score">{r[6]}</span></td>
                <td>{r[7]}</td>
                <td><a className="link" href="#">Chart</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="foot">
        <span>© {new Date().getFullYear()} Conspira AI</span>
      </footer>
    </div>
  );
}
