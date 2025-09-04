import React from "react";

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="container nav">
          <div className="nav-left">
            <a className="pill active" href="#">Home</a>
            <button className="pill">Market ▾</button>
          </div>
          <div className="nav-right">
            <a
              className="link-x"
              href="https://x.com/conspira_ai"
              target="_blank"
              rel="noreferrer"
            >
              Follow on X
            </a>
            <button className="pill">Sources ▾</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">CONSPIRA AI</h1>
            <p className="subtitle">Uncover the Crypto Undercurrent</p>

            <div className="cta">
              <a className="btn btn-hollow" href="#">_ Enter Terminal</a>

              <a
                className="btn btn-primary"
                href="https://x.com/conspira_ai"
                target="_blank"
                rel="noreferrer"
              >
                Follow on X
              </a>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Join the waitlist (email)"
                  aria-label="Email"
                />
                <button className="btn btn-go">Go</button>
              </div>
            </div>

            <div className="meta">
              <div className="meta-left">
                <label className="chain-label">Chain</label>
                <select className="select">
                  <option>All</option>
                  <option>ETH</option>
                  <option>SOL</option>
                  <option>BSC</option>
                  <option>BASE</option>
                </select>
                <span className="formula">
                  Score = 0.6×Spike + 0.4×Momentum / 2
                </span>
              </div>
              <div className="meta-right">
                Live data unavailable — showing demo data.
              </div>
            </div>

            <div className="card table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>TOKEN</th>
                    <th>CHAIN</th>
                    <th>PRICE</th>
                    <th>VOL 1H</th>
                    <th>SPIKE</th>
                    <th>MOMENTUM</th>
                    <th>SCORE</th>
                    <th>LIQUIDITY</th>
                    <th>LINKS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { t: "FATHOM", c: "BASE", p: "$0.014", v: "$98.00k", s: "5.23×", m: "+12.40%", sc: "5.62", l: "$820.00k" },
                    { t: "SEER", c: "BSC", p: "$0.0011", v: "$67.00k", s: "5.74×", m: "+6.10%", sc: "4.66", l: "$430.00k" },
                    { t: "NEON", c: "SOL", p: "$0.0032", v: "$125.00k", s: "3.33×", m: "+8.20%", sc: "3.64", l: "$1.20M" },
                    { t: "PULSE", c: "ETH", p: "$0.22", v: "$310.00k", s: "2.85×", m: "-3.50%", sc: "1.01", l: "$5.90M" },
                  ].map((row) => (
                    <tr key={row.t}>
                      <td className="token">
                        <span className="dot" /> {row.t}
                      </td>
                      <td>{row.c}</td>
                      <td>{row.p}</td>
                      <td>{row.v}</td>
                      <td><span className="pill soft">{row.s}</span></td>
                      <td>
                        <span className={`pill soft ${row.m.startsWith("-") ? "neg" : "pos"}`}>
                          {row.m}
                        </span>
                      </td>
                      <td><span className="pill soft">{row.sc}</span></td>
                      <td>{row.l}</td>
                      <td><a className="link" href="#">Chart</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="footer">
              © {new Date().getFullYear()} Conspira AI
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
