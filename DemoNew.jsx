import React, { useEffect, useMemo, useState } from "react";

//type Props = { query: string; html: string };

export default function DemoIssue({ query, html }) {
  const [data, setData] = useState<any>(null);

  // Intentional issues for the AI to flag:
  useEffect(() => {
    fetch(`/api/search?q=${query}`).then(r => r.json()).then(setData);
  }, []); // missing `query` in deps

  const result = useMemo(() => {
    return data ? data.items.map((x) => x.name).join(", ") : "…";
  }, []); // should depend on `data`

  return (
    <div>
      <img src="/hero.png" /> {/* no width/height/alt */}
      <div dangerouslySetInnerHTML={{ __html: html }} /> {/* possible XSS */}
      <a href="https://example.com" target="_blank">Open</a> {/* missing rel */}
      <button onClick={() => console.log("clicked")}>Click me</button> {/* missing type */}
      <pre>{result}</pre>
    </div>
  );
}
