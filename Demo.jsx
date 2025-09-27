import React, { useEffect, useMemo, useState } from "react";

// type Props = { query: string; html: string };

export default function DemoIssue({ query, html }) {
  const [data, setData] = useState<any>(null);

  // ❌ uses `query` inside but not in deps (stale fetch risk)
  useEffect(() => {
    fetch(`/api/search?q=${query}`).then(r => r.json()).then(setData);
  }, []); // <- missing `query` in deps

  // ❌ missing deps (re-computation issues)
  const result = useMemo(() => {
    return data ? data.items.map((x) => x.name).join(", ") : "…";
  }, []); // <- should depend on `data`

  return (
    <div>
      {/* ❌ No width/height/alt → CLS and a11y */}
      <img src="/hero.png" />

      {/* ❌ XSS risk if html is untrusted */}
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {/* ❌ target=_blank without rel=noopener */}
      <a href="https://example.com" target="_blank">Open external</a>

      {/* ❌ Button w/o explicit type can submit unexpectedly in forms */}
      <button onClick={() => console.log("clicked")}>Click me</button>

      <pre>{result}</pre>
    </div>
  );
}
