import { useEffect } from "react";
import { PAGE_META, type PageMetaKey } from "@/lib/page-meta";

interface PageHeaderProps {
  pageKey: PageMetaKey;
}

export default function PageHeader({ pageKey }: PageHeaderProps) {
  const meta = PAGE_META[pageKey];

  // Update document title
  useEffect(() => {
    document.title = meta.title;
    return () => {
      document.title = "ConspirAI";
    };
  }, [meta.title]);

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[color:var(--text-primary)] tracking-wider">
        {meta.h1}
      </h1>
      {'sub' in meta && meta.sub && (
        <h2 className="subtitle">
          {meta.sub}
        </h2>
      )}
    </div>
  );
}