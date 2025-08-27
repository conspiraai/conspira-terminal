// src/App.tsx — minimal, self-contained landing page (no external imports)
import React from "react";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0b10",
        color: "#e6e6f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'JetBrains Mono','Roboto Mono',monospace",
      }}
    >
      <main style={{ width: "100%", maxWidth: 880 }}>
        <h1 style={{ fontSize: 36, margin: 0, letterSpacing: "0.02em" }}>
          CONSPIRA AI
        </h1>
        <p style={{ opacity: 0.8, marginTop: 10 }}>
          Site is live. Modules are coming online.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
          <a
            href="https://x.com/conspiraai"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #b300ff",
              textDecoration: "none",
              color: "#e6e6f0",
            }}
          >
            Follow on X
          </a>
          <a
            href="./"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,.12)",
              textDecoration: "none",
              color: "#e6e6f0",
              opacity: 0.9,
            }}
          >
            Enter (placeholder)
          </a>
        </div>
      </main>
    </div>
  );
}
