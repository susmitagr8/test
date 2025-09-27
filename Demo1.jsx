import React, { useEffect, useMemo, useState } from "react";

// type Props = { query: string; html: string };

export default function DemoIssue({ query, html }) {
  const [data, setData] = useState<any>(null);

  
  useEffect(() => {
    fetch(`/api/search?q=${query}`).then(r => r.json()).then(setData);
  }, []); // <- missing `query` in deps

  
  const result = useMemo(() => {
    return data ? data.items.map((x) => x.name).join(", ") : "…";
  }, []); // <- should depend on `data`

  return (
    <div>
      
      <img src="/hero.png" />

      
      <div dangerouslySetInnerHTML={{ __html: html }} />

     
      <a href="https://example.com" target="_blank">Open external</a>

      
      <button onClick={() => console.log("clicked")}>Click me</button>

      <pre>{result}</pre>
    </div>
  );
}
