import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const onSoon = (label: string) => {
    alert(`${label} — coming soon`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0b10", color: "#e6e6f0", fontFamily: "JetBrains Mono, monospace" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 16px" }}>
        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: 54, fontWeight: 900, margin: 0, color: "#ff1493", textShadow: "0 0 5px #ff1493, 0 0 10px #ff1493" }}>
            CONSPIRA AI
          </h1>
          <p style={{ opacity: 0.9, fontSize: 18, marginTop: 12 }}>Uncover the Crypto Undercurrent</p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
            <Button onClick={() => onSoon("Terminal")}>Enter Terminal</Button>
            <Button onClick={() => window.open("https://x.com/conspira_ai?s=21", "_blank")} className="bg-transparent border border-white/40 hover:bg-white/10">
              Follow on X
            </Button>
          </div>

          {/* email box */}
          <div style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "center" }}>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ maxWidth: 280, background: "rgba(0,0,0,0.5)", color: "#fff", border: "1px solid #ff1493" }}
            />
            <Button onClick={() => { alert("You’re on the list (mock)."); setEmail(""); }}>
              Notify me
            </Button>
          </div>
        </header>

        {/* Quick cards */}
        <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <Card>
            <h3 style={{ margin: "0 0 8px", fontWeight: 700 }}>ENHANCED FLOW</h3>
            <p style={{ opacity: 0.8, margin: "0 0 12px" }}>Premium flow analysis with advanced filtering.</p>
            <Button onClick={() => onSoon("Enhanced Flow")}>Open</Button>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 8px", fontWeight: 700 }}>FLOW INTEL</h3>
            <p style={{ opacity: 0.8, margin: "0 0 12px" }}>Real-time trade streams with whale tracking.</p>
            <Button onClick={() => onSoon("Flow Intel")}>Open</Button>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 8px", fontWeight: 700 }}>MARKET HUB</h3>
            <p style={{ opacity: 0.8, margin: "0 0 12px" }}>Live market data and token analytics.</p>
            <Button onClick={() => onSoon("Market Hub")}>Open</Button>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 8px", fontWeight: 700 }}>ENHANCED MARKET</h3>
            <p style={{ opacity: 0.8, margin: "0 0 12px" }}>Deep analytics and volume tracking.</p>
            <Button onClick={() => onSoon("Enhanced Market")}>Open</Button>
          </Card>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: "center", opacity: 0.7, marginTop: 40 }}>
          <small>© {new Date().getFullYear()} Conspira AI</small>
        </footer>
      </div>
    </div>
  );
}
