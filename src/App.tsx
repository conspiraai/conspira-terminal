import React, { useEffect, useMemo, useState } from "react";

type Pair = {
  chainId?: string;
  dexId?: string;
  baseToken?: { symbol: string; address?: string };
  pairAddress?: string;
  priceUsd?: number;
  volume?: { h1?: number; h24?: number };
  priceChange?: { m5?: number; h1?: number; h6?: number; h24?: number };
  liquidity?: { usd?: number };
};

type Row = {
  id: string;
  token: string;
  chain: string;
  price: number;
  vol1h: number;
  vol24h: number;
  spike: number;     // 1h vs 24h/24  → x
  momentum: number;  // % last hour (fallbacks)
  score: number;     // 0.6*spike + 0.4*(momentum/2)
  liq: number;
  chart?: string;
};

const X_HANDLE = "conspira_ai";

export default function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [chain, setChain] = useState("all");

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // Public endpoint (no key). If it fails, we use demo data.
        const res = await fetch("https://api.dexscreener.com/latest/dex/trending", { cache: "no-store" });
        const ok = res.ok;
        const data = ok ? await res.json() : null;
        const pairs: Pair[] = data?.pairs ?? [];
        const mapped = toRows(pairs);
        if (!cancel) setRows(mapped.length ? mapped : demoRows());
        if (!ok && !cancel) setErr("Live data unavailable — showing demo data.");
      } catch {
        if (!cancel) {
          setRows(demoRows());
          setErr("Live data unavailable — showing demo data.");
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  const filtered = useMemo(
    () => rows.filter(r => (chain === "all" ? true : r.chain.toLowerCase() === chain)),
    [rows, chain]
  );

  return (
    <>
      {/* Top bar */}
      <header className="header">
        <nav className="nav">
          <div className="left">
            <a className="btn" href="/">HOME</a>
            <button className="btn" type="button" disabled>MARKET ▾</button>
          </div>
          <div className="right">
            <a className="btn" href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noreferrer">
              Follow on X
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="main">
        <h1 className="brand">CONSPIRA AI</h1>
        <p className="tagline">Uncover the Crypto Undercurrent</p>

        {/* CTA row */}
        <div className="ctaRow">
          <a className="btn btn--hollow" href="#" aria-disabled="true">›_ Enter Terminal</a>

          <a
            className="btn btn--accent"
            href={`https://x.com/${X_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on X
          </a>

          <form
            className="email"
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("email") as HTMLInputElement | null);
              const email = input?.value?.trim();
              if (!email) return;
              window.location.href = `mailto:ops@conspirai.com?subject=Alert%20Signup&body=${encodeURIComponent(email)}`;
              if (input) input.value = "";
            }}
          >
            <input className="input" name="email" type="email" placeholder="Join the waitlist (email)" required />
            <button className="go go--accent" type="submit">Go</button>
          </form>
        </div>

        {/* Controls */}
        <section className="panel">
          <div className="panelHead">
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
              <div className="hint">Score = 0.6×Spike + 0.4×Momentum/2</div>
            </div>

            {err && <div className="notice">{err}</div>}
          </div>

          {/* Table */}
          <div className="tableWrap">
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
                  skeleton(10)
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
                      <td><span className={`badge ${spikeTone(r.spike)}`}>{r.spike.toFixed(2)}×</span></td>
                      <td>
                        <span className={`badge ${r.momentum >= 0 ? "pos" : "neg"}`}>
                          {r.momentum >= 0 ? "+" : ""}{r.momentum.toFixed(2)}%
                        </span>
                      </td>
                      <td><span className={`score ${scoreTone(r.score)}`}>{r.score.toFixed(2)}</span></td>
                      <td>${fmt(r.liq)}</td>
                      <td className="links">
                        {r.chart ? (
                          <a className="mini" href={r.chart} target="_blank" rel="noreferrer">Chart ↗</a>
                        ) : <span className="mini dim">Chart</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {!loading && filtered.length === 0 && (
              <div className="empty">No matches for this chain.</div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

/* ---------------- helpers ---------------- */

function toRows(pairs: Pair[]): Row[] {
  const rows = pairs.slice(0, 120).map((p, i) => {
    const chain = (p.chainId || "all").toLowerCase();
    const token = p.baseToken?.symbol || "UNK";
    const price = p.priceUsd ?? 0;
    const vol1h = p.volume?.h1 ?? 0;
    const vol24h = p.volume?.h24 ?? 0;
    const hourlyAvg = vol24h > 0 ? vol24h / 24 : 0;
    const spike = hourlyAvg > 0 ? vol1h / hourlyAvg : 0;
    const mom = p.priceChange?.h1 ?? p.priceChange?.m5 ?? p.priceChange?.h6 ?? p.priceChange?.h24 ?? 0;
    const score = 0.6 * clamp(spike, 0, 50) + 0.4 * (mom / 2);
    const liq = p.liquidity?.usd ?? 0;
    return {
      id: `${p.pairAddress || token}-${i}`,
      token,
      chain,
      price,
      vol1h,
      vol24h,
      spike,
      momentum: mom,
      score,
      liq,
      chart: p.pairAddress ? `https://dexscreener.com/${chain}/${p.pairAddress}` : undefined,
    };
  });
  rows.sort((a, b) => b.score - a.score);
  return rows;
}

function demoRows(): Row[] {
  const list: Row[] = [
    mk("NEON","sol",0.0032,125000,900000,3.33, 8.2,1_200_000),
    mk("FATHOM","base",0.014, 98000,450000,5.23,12.4, 820_000),
    mk("PULSE","eth",0.22, 310000,2_400_000,2.85,-3.5,5_900_000),
    mk("SEER","bsc",0.0011, 67000,280000,5.74, 6.1, 430_000),
    mk("OCEANX","polygon",0.009, 54000,120000,10.80,22.9, 210_000),
  ];
  return list.sort((a,b)=>b.score-a.score);
}
function mk(token:string, chain:string, price:number, vol1h:number, vol24h:number, spike:number, momentum:number, liq:number): Row {
  return { id:`${token}-${chain}`, token, chain, price, vol1h, vol24h, spike, momentum,
    score: 0.6*clamp(spike,0,50)+0.4*(momentum/2), liq, chart: undefined };
}
function clamp(n:number, lo:number, hi:number){ return Math.max(lo, Math.min(hi, n)); }
function fmt(n:number){ if(!isFinite(n)) return "-"; if(n>=1_000_000) return (n/1_000_000).toFixed(2)+"M"; if(n>=1_000) return (n/1_000).toFixed(2)+"k"; return n.toFixed(4).replace(/\.?0+$/, ""); }
function spikeTone(x:number){ if(x>=8) return "hot"; if(x>=3) return "warm"; return "cool"; }
function scoreTone(s:number){ if(s>=12) return "t1"; if(s>=8) return "t2"; if(s>=5) return "t3"; return "t4"; }
function skeleton(n:number){
  return (
    <>
      {Array.from({length:n}).map((_,i)=>(
        <tr key={i} className="skeleton">
          <td colSpan={9}><div className="sk"/></td>
        </tr>
      ))}
    </>
  );
}
