import React, { useEffect, useMemo, useState } from "react";

/** ---------- Helpers ---------- */
type CGRow = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number | null;
  total_volume: number; // 24h volume
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
};

function money(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n.toFixed(4)}`;
}

function pct(n?: number | null, digits = 2) {
  if (n == null) return "—";
  const s = n > 0 ? "+" : "";
  return `${s}${n.toFixed(digits)}%`;
}

/** Score: simple & sellable.
 * We value near-term acceleration but still care about 7d follow-through.
 * Clamp to 0–10 for a clean, producty feel.
 */
function signalScore(spike1h: number, momentum7d: number) {
  const raw = 0.7 * Math.max(0, spike1h) + 0.3 * Math.max(0, momentum7d);
  const scaled = Math.min(10, Math.max(0, raw / 3)); // tame big %s into 0–10
  return Number(scaled.toFixed(2));
}

/** ---------- Component ---------- */
export default function App() {
  const [rows, setRows] = useState<CGRow[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const url =
          "https://api.coingecko.com/api/v3/coins/markets" +
          "?vs_currency=usd&order=market_cap_desc&per_page=120&page=1" +
          "&price_change_percentage=1h,24h,7d";
        const res = await fetch(url, { headers: { accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: CGRow[] = await res.json();
        if (!cancelled) setRows(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load market data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Select 1 featured + 3 runner-ups, with simple guardrails to avoid junk.
  const picks = useMemo(() => {
    if (!rows) return null;
    const filtered = rows
      .filter(r =>
        (r.total_volume ?? 0) >= 100_000 && // avoid illiquid noise
        r.current_price > 0 &&
        r.price_change_percentage_1h_in_currency != null &&
        r.price_change_percentage_7d_in_currency != null
      )
      .map(r => {
        const s = signalScore(
          r.price_change_percentage_1h_in_currency || 0,
          r.price_change_percentage_7d_in_currency || 0
        );
        return { ...r, _signal: s };
      })
      .sort((a, b) => (b as any)._signal - (a as any)._signal);

    const top = filtered.slice(0, 4);
    if (!top.length) return { featured: null as any, runners: [] as CGRow[] };
    return { featured: top[0], runners: top.slice(1) as any[] };
  }, [rows]);

  return (
    <div style={styles.wrap}>
      {/* Top bar (simple) */}
      <div style={styles.topbar}>
        <a href="/" style={styles.badge}>HOME</a>
        <div style={{ flex: 1 }} />
        <a
          href="https://x.com/conspira_ai"
          target="_blank"
          rel="noreferrer"
          style={styles.follow}
        >
          Follow on X
        </a>
      </div>

      {/* Hero */}
      <header style={styles.hero}>
        <h1 style={styles.title}>CONSPIRA AI</h1>
        <p style={styles.tagline}>Uncover the Crypto Undercurrent</p>

        <div style={styles.ctaRow}>
          <a href="#terminal" style={styles.btnGhost}>_ Enter Terminal</a>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Added to waitlist: ${email || "(email missing)"}`);
              setEmail("");
            }}
            style={styles.waitlist}
          >
            <input
              placeholder="Join the waitlist (email)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <button style={styles.btnPrimary}>Go</button>
          </form>
        </div>
      </header>

      {/* Signal section */}
      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <div style={styles.kicker}>Live Signal</div>
          <div style={styles.formula}>Score = 0.7×Spike (1h) + 0.3×Momentum (7d)</div>
        </div>

        {loading && <div style={styles.note}>Scanning markets…</div>}
        {error && <div style={styles.error}>Error: {error}</div>}

        {picks && picks.featured && (
          <>
            <FeaturedCard row={picks.featured as any} />
            {picks.runners.length > 0 && (
              <div style={styles.runners}>
                {picks.runners.map((r) => (
                  <RunnerPill key={r.id} row={r as any} />
                ))}
              </div>
            )}
            <div style={styles.disclaimer}>
              Data via CoinGecko. Rankings refresh on page load.
            </div>
          </>
        )}

        {picks && !picks.featured && !loading && !error && (
          <div style={styles.note}>No qualifying symbols right now. Check back soon.</div>
        )}
      </section>

      <footer style={styles.footer}>© {new Date().getFullYear()} Conspira AI</footer>
    </div>
  );
}

/** ---------- UI bits ---------- */
function FeaturedCard({ row }: { row: CGRow & { _signal: number } }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardLeft}>
        <img src={row.image} alt={row.symbol} style={styles.logo} />
        <div>
          <div style={styles.nameRow}>
            <span style={styles.name}>{row.name}</span>
            <span style={styles.ticker}>{row.symbol.toUpperCase()}</span>
          </div>
          <div style={styles.price}>{money(row.current_price)}</div>
          <div style={styles.meta}>
            Vol (24h): <b>{money(row.total_volume)}</b> · Rank:{" "}
            <b>{row.market_cap_rank ?? "—"}</b>
          </div>
        </div>
      </div>

      <div style={styles.metrics}>
        <Metric label="Spike (1h)" value={pct(row.price_change_percentage_1h_in_currency)} />
        <Metric label="Shift (24h)" value={pct(row.price_change_percentage_24h_in_currency)} />
        <Metric label="Momentum (7d)" value={pct(row.price_change_percentage_7d_in_currency)} />
        <div style={styles.scoreBox}>
          <div style={styles.scoreLabel}>Signal</div>
          <div style={styles.scoreValue}>{(row as any)._signal.toFixed(2)}</div>
        </div>
      </div>

      <div style={styles.cardCTA}>
        <a href="#terminal" style={styles.btnPrimaryWide}>Analyze in Terminal</a>
      </div>
    </div>
  );
}

function RunnerPill({ row }: { row: CGRow & { _signal: number } }) {
  return (
    <div style={styles.pill}>
      <img src={row.image} alt={row.symbol} style={styles.pillImg} />
      <div style={{ marginRight: 8, fontWeight: 600 }}>{row.symbol.toUpperCase()}</div>
      <div style={styles.pillScore}>{(row as any)._signal.toFixed(2)}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  const isNeg = value.startsWith("-"); // crude but fine
  return (
    <div style={styles.metric}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={{ ...styles.metricValue, color: isNeg ? "#ff616e" : "#7dffa3" }}>{value}</div>
    </div>
  );
}

/** ---------- Styles (inline to keep this drop-in self-contained) ---------- */
const styles: Record<string, React.CSSProperties> = {
  wrap: { minHeight: "100vh", background: "linear-gradient(#0d0f14,#0b0d12)", color: "#dfe3ec" },
  topbar: {
    height: 56, display: "flex", alignItems: "center", padding: "0 14px",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  badge: {
    fontSize: 12, letterSpacing: 1, padding: "6px 10px", borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)", color: "#dfe3ec", textDecoration: "none"
  },
  follow: {
    fontSize: 12, padding: "6px 10px", borderRadius: 8, background: "#12131a",
    border: "1px solid rgba(255,255,255,0.12)", color: "#dfe3ec", textDecoration: "none"
  },
  hero: { textAlign: "center", padding: "48px 16px 8px" },
  title: {
    fontSize: "clamp(44px, 9vw, 112px)", margin: 0,
    fontWeight: 800, letterSpacing: 6, color: "#fff",
    textShadow: "0 0 32px rgba(255,0,128,0.35), 0 0 64px rgba(255,0,128,0.2)"
  },
  tagline: { opacity: 0.8, marginTop: 10 },
  ctaRow: { marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  btnGhost: {
    padding: "12px 18px", borderRadius: 12, border: "1px dashed rgba(255,255,255,0.25)",
    background: "transparent", color: "#dfe3ec", textDecoration: "none"
  },
  waitlist: { display: "flex", gap: 10 },
  input: {
    width: 280, padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)",
    background: "#0f1117", color: "#dfe3ec", outline: "none"
  },
  btnPrimary: {
    padding: "12px 16px", borderRadius: 12, border: "none",
    background: "linear-gradient(90deg,#ff008c,#a64dff)", color: "#fff", fontWeight: 700
  },
  section: { maxWidth: 1080, margin: "36px auto 80px", padding: "0 16px" },
  sectionHead: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 },
  kicker: { fontSize: 12, letterSpacing: 1, opacity: 0.9 },
  formula: { fontSize: 12, opacity: 0.6 },
  note: { opacity: 0.7, padding: "18px 0" },
  error: { color: "#ff6b7a", padding: "18px 0" },

  card: {
    borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))",
    padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 16,
  },
  cardLeft: { display: "flex", gap: 14, alignItems: "center" },
  logo: { width: 42, height: 42, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" },
  nameRow: { display: "flex", gap: 8, alignItems: "baseline" },
  name: { fontSize: 18, fontWeight: 700, color: "#fff" },
  ticker: { fontSize: 13, opacity: 0.7, letterSpacing: 1.5 },
  price: { marginTop: 6, fontWeight: 700 },
  meta: { marginTop: 4, opacity: 0.7, fontSize: 12 },

  metrics: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, alignItems: "center" },
  metric: { padding: 12, borderRadius: 12, background: "#0f1117", border: "1px solid rgba(255,255,255,0.08)" },
  metricLabel: { fontSize: 12, opacity: 0.7, marginBottom: 6 },
  metricValue: { fontSize: 16, fontWeight: 800 },

  scoreBox: {
    padding: 12, borderRadius: 12, textAlign: "center",
    background: "linear-gradient(90deg,rgba(255,0,140,0.12),rgba(166,77,255,0.12))",
    border: "1px solid rgba(255,0,140,0.25)"
  },
  scoreLabel: { fontSize: 12, opacity: 0.8, marginBottom: 4 },
  scoreValue: { fontSize: 22, fontWeight: 900, color: "#fff" },

  cardCTA: { display: "flex", alignItems: "center", justifyContent: "flex-end" },
  btnPrimaryWide: {
    padding: "12px 18px", borderRadius: 12, border: "none",
    background: "linear-gradient(90deg,#ff008c,#a64dff)", color: "#fff", fontWeight: 800,
    textDecoration: "none", whiteSpace: "nowrap"
  },

  runners: { display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" },
  pill: {
    display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
    borderRadius: 999, background: "#101219", border: "1px solid rgba(255,255,255,0.08)"
  },
  pillImg: { width: 18, height: 18, borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)" },
  pillScore: {
    padding: "2px 8px", borderRadius: 999, fontWeight: 800, fontSize: 12,
    background: "rgba(255,0,140,0.15)", border: "1px solid rgba(255,0,140,0.3)"
  },

  disclaimer: { opacity: 0.55, fontSize: 12, marginTop: 10 },
  footer: { opacity: 0.5, textAlign: "center", padding: "40px 0 30px" },

  // responsive tweak
  "@media (max-width: 860px)": {}
};
