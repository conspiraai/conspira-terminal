// src/pages/home.tsx
import React from "react";
import { Link } from "wouter";

export default function Home() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-terminal tracking-wide mb-4">
          CONSPIRA AI
        </h1>

        <p className="text-[15px] text-[color:var(--text-muted)] mb-8">
          Site is live. Modules are coming online.
        </p>

        <div className="flex items-center justify-center gap-3">
          {/* Follow on X */}
          <a
            href="https://x.com/conspira_ai"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-[10px] border px-4 py-2
                       hover:glow-accent border-[color:var(--stroke)]
                       text-[14px] transition"
          >
            <span className="i">Follow on X</span>
          </a>

          {/* Enter placeholder (routes to market overview for now) */}
          <Link href="/market-overview">
            <a
              className="inline-flex items-center gap-2 rounded-[10px] border px-4 py-2
                         border-terminal-purple text-terminal-purple hover:glow-cyan
                         text-[14px] transition"
            >
              Enter (placeholder)
            </a>
          </Link>
        </div>

        {/* tiny footer note */}
        <p className="mt-6 text-xs text-[color:var(--text-muted)]">
          UI is evolving. Some sections are placeholders.
        </p>
      </div>
    </main>
  );
}
