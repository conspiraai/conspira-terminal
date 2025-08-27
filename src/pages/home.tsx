// src/pages/home.tsx
import React from "react";
import { Link } from "wouter";

export default function Home() {
  return (
    <main className="min-h-[90vh] flex items-center justify-center px-6 bg-[color:var(--bg)] text-[color:var(--text-primary)]">
      <div className="w-full max-w-2xl text-center">
        {/* LOGO / TITLE */}
        <h1 className="text-4xl sm:text-5xl font-terminal tracking-wide mb-3">
          CONSPIRA AI
        </h1>
        <p className="text-sm text-[color:var(--text-muted)]">
          Surveillance Protocol online. Modules initiating.
        </p>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Follow on X — your exact handle */}
          <a
            href="https://twitter.com/conspira_ai"
            target="_blank"
            rel="noreferrer noopener"
            className="pill inline-flex items-center gap-2 rounded-[10px]
                       border border-[color:var(--stroke)] px-4 py-2
                       hover:glow-accent transition"
          >
            Follow on X
          </a>

          {/* Enter */}
          <Link href="/market-overview">
            <a
              className="inline-flex items-center gap-2 rounded-[10px]
                         border px-4 py-2 text-[14px] transition
                         border-neon-purple text-neon-purple hover:glow-cyan"
            >
              Enter
            </a>
          </Link>
        </div>

        {/* SLIM FOOTER NOTE */}
        <p className="mt-6 text-xs text-[color:var(--text-muted)]">
          Visuals are live. Additional modules will come online progressively.
        </p>

        {/* DECORATIVE LINE / GLOW */}
        <div
          className="mt-6 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(179,0,255,.45), transparent)",
            boxShadow: "0 0 18px rgba(179,0,255,.25)",
          }}
        />
      </div>
    </main>
  );
}
