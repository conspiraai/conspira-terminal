// src/pages/scanner.tsx
import React, { useEffect, useMemo, useState } from "react";
import "./scanner.css";

type Pair = {
  chainId?: string;
  dexId?: string;
  baseToken?: { symbol: string; address?: string };
  quoteToken?: { symbol: string; address?: string };
  pairAddress?: string;
  priceUsd?: number;
  volume?: { h1?: number; h24?: number };
  priceChange?: { m5?: number; h1?: number; h6?: number; h24?: number };
  liquidity?: { usd?: number };
  info?: { imageUrl?: string; websites?: { url: string }[] };
};

type Row = {
  id: string;
  token: string;
  chain: string;
  price: number;
  vol1h: number;
  vol24h: number;
  volSpike: number; // 1h / (24h/24) -> x
  momentum: number; // use priceChange.h1 (fallback to m5/h6)
  score: number;    // weighted
  dex: string;
  liq: number;
  linkChart?: string;
};

const X_HANDLE = "conspira_ai"; // ensures the button always goes to the right account

export default function Scanner() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [chain, setChain] = useState<string>("all");
  const [windowMin] = useState<number>(60); // future: 5/15/60 toggle

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // Try Dexscreener public API. If it fails, fall back to demo data.
        const res = await fetch("https://api.dexscreener.com/latest/dex/trending", {
          cache: "no-store",
        });
        const ok = res.ok;
        const data = ok ? await res.json() : null;
        const pairs: Pair[] = data?.pairs ?? [];
        const mapped = toRows(pairs);
        if (!cancelled) setRows(mapped.length ? mapped : demoRows());
      } catch {
        if (!cancelled) {
          setRows(demoRows());
          setErr("Live data unavailable — showing demo data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => rows.filter(r => (chain === "all" ? true : r.chain.toLowerCase() === chain)),
    [rows, chain]
  );

  return (
    <div className="scan-wrap">
      <header className="scan-topbar">
        <div className="brand">
          <a href="/" className="brand-back">⟵ Home</a>
          <div className="brand-dot" />
          <span className="brand-name">Market Pulse <em>Lite</em></span>
        </div>

        <nav className="top-actions">
          <a className="btn ghost" href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noreferrer">
            Follow on X
          </a>
          <a className="btn solid" href="/">Enter Terminal</a>
        </nav>
      </header>

      <section className="panel">
        <div className="panel-head">
          <div className="filters">
            <label className="select">
              <span>Chain</span>
              <select value={chain} onChange={e => setChain(e.target.value)}>
                <option value="all">All</option>
                <option value="eth">ETH</option>
                <option value="bsc">BSC</option>
                <option value="sol">SOL</option>
                <option value="base">Base</option>
                <option value="polygon">Polygon</option>
                <option value="arbitrum">Arbitrum</option>
              </select>
            </label>

            <div className="hint">Window: {windowMin}m • Score = 0.6×Spike + 0.4×Momentum</div>
          </div>

          <form
            className="email"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.querySelector("input") as HTMLInputElement | null;
              const email = input?.value?.trim();
              if (!email) return;
              // Works without a backend (opens email client). Swap to Formspree later.
              window.location.href = `mailto:ops@conspirai.com?subject=Alert%20Signup&body=${encodeURIComponent(email)}`;
            }}
          >
            <input type="email" placeholder="Get alerts — enter email" />
            <button className="btn solid" type="submit">Notify me</button>
          </form>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Chain</th>
                <th>Price</th>
                <th>Vol 1h</th>
                <th>Vol spike</th>
                <th>Momentum</th>
                <th>Score</th>
                <th>Liquidity</th>
                <th>Links</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                skeletonRows(12)
              ) : (
                filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="token">
                      <div className="tok">
                        <div className="dot" />
                        <div className="sym">{r.token}</div>
                      </div>
                    </td>
                    <td>{r.chain.toUpperCase()}</td>
                    <td>${fmt(r.price)}</td>
                    <td>${fmt(r.vol1h)}</td>
                    <td>
                      <span className={`badge ${badge(r.volSpike)}`}>{r.volSpike.toFixed(2)}×</span>
                    </td>
                    <td>
                      <span className={`badge ${r.momentum >= 0 ? "pos" : "neg"}`}>
                        {r.momentum >= 0 ? "+" : ""}
                        {r.momentum.toFixed(2)}%
                      </span>
                    </td>
                    <td>
                      <span className={`score ${scoreTone(r.score)}`}>{r.score.toFixed(2)}</span>
                    </td>
                    <td>${fmt(r.liq)}</td>
                    <td className="links">
                      {r.linkChart ? (
                        <a className="mini" href={r.linkChart} target="_blank" rel="noreferrer">
                          Chart ↗
                        </a>
                      ) : (
                        <span className="mini dim">Chart</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && filtered.length === 0 && (
            <div className="empty">No matches for this chain.</div>
          )}
          {err && <div className="notice">{err}</div>}
        </div>
      </section>
    </div>
  );
}

// ---------- helpers

function toRows(pairs: Pair[]): Row[] {
  const rows: Row[] = pairs.slice(0, 100).map((p, i) => {
    const chain = (p.chainId || "all").toLowerCase();
    const token = p.baseToken?.symbol || "UNK";
    const price = p.priceUsd ?? 0;
    const vol1h = p.volume?.h1 ?? 0;
    const vol24h = p.volume?.h24 ?? 0;
    const hourlyAvg = vol24h > 0 ? vol24h / 24 : 0;
    const volSpike = hourlyAvg > 0 ? vol1h / hourlyAvg : 0;
    const mom =
      p.priceChange?.h1 ??
      p.priceChange?.m5 ??
      p.priceChange?.h6 ??
      p.priceChange?.h24 ??
      0;
    const score = 0.6 * clamp(volSpike, 0, 50) + 0.4 * (mom / 2); // simple weighting
    const liq = p.liquidity?.usd ?? 0;

    return {
      id: `${p.pairAddress || token}-${i}`,
      token,
      chain,
      price,
      vol1h,
      vol24h,
      volSpike,
      momentum: mom,
      score,
      dex: p.dexId || "-",
      liq,
      linkChart: p.pairAddress
        ? `https://dexscreener.com/${chain}/${p.pairAddress}`
        : undefined,
    };
  });

  // sort by score descending
  rows.sort((a, b) => b.score - a.score);
  return rows;
}

function demoRows(): Row[] {
  const demo: Row[] = [
    row("NEON", "sol", 0.0032, 125000, 900000, 3.33, 8.2, 1_200_000),
    row("FATHOM", "base", 0.014, 98000, 450000, 5.23, 12.4, 820_000),
    row("PULSE", "eth", 0.22, 310000, 2_400_000, 2.85, -3.5, 5_900_000),
    row("SEER", "bsc", 0.0011, 67000, 280000, 5.74, 6.1, 430_000),
    row("OCEANX", "polygon", 0.009, 54000, 120000, 10.80, 22.9, 210_000),
  ];
  return demo.sort((a, b) => b.score - a.score);
}

function row(
  token: string,
  chain: string,
  price: number,
  vol1h: number,
  vol24h: number,
  volSpike: number,
  momentum: number,
  liq: number
): Row {
  return {
    id: `${token}-${chain}`,
    token,
    chain,
    price,
    vol1h,
    vol24h,
    volSpike,
    momentum,
    score: 0.6 * clamp(volSpike, 0, 50) + 0.4 * (momentum / 2),
    dex: "-",
    liq,
    linkChart: undefined,
  };
}

function fmt(n: number) {
  if (!isFinite(n)) return "-";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(2) + "k";
  return n.toFixed(4).replace(/\.?0+$/, "");
}
function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
function badge(spike: number) {
  if (spike >= 8) return "hot";
  if (spike >= 3) return "warm";
  return "cool";
}
function scoreTone(s: number) {
  if (s >= 12) return "t1";
  if (s >= 8) return "t2";
  if (s >= 5) return "t3";
  return "t4";
}

function skeletonRows(n: number) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <tr key={i} className="skeleton">
          <td colSpan={9}>
            <div className="sk-bar" />
          </td>
        </tr>
      ))}
    </>
  );
}
