import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../lib/api.js";
import Loading from "../components/Loading.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import Price from "../components/Price.jsx";

export default function Shop() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [roast, setRoast] = useState("All");

  useEffect(() => {
    apiGet("/api/products")
      .then(setData)
      .catch(setError);
  }, []);

  const products = data?.products || [];
  const roasts = useMemo(() => {
    const set = new Set(products.map((p) => p.roast));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.tastingNotes.join(" ").toLowerCase().includes(q);
      const matchesRoast = roast === "All" || p.roast === roast;
      return matchesQ && matchesRoast;
    });
  }, [products, query, roast]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 className="h2" style={{ marginBottom: 6 }}>Shop Coffee</h2>
            <div className="small">Pick an origin, choose your grind, and checkout.</div>
          </div>
          <Link to="/cart" className="btn">Go to cart</Link>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <div className="col">
            <label className="label">Search</label>
            <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ethiopia, chocolate, light roast..." />
          </div>
          <div className="col" style={{ flex: "0 0 260px" }}>
            <label className="label">Roast</label>
            <select value={roast} onChange={(e) => setRoast(e.target.value)}>
              {roasts.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      {!data && !error && <Loading label="Loading products..." />}
      <ErrorBox error={error} />

      {data && (
        <div className="grid products">
          {filtered.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="card product">
              <div className="thumb">☕</div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <h3>{p.name}</h3>
                <div className="price"><Price cents={p.priceCents} /></div>
              </div>
              <div className="meta">
                <span>Origin: {p.origin}</span>
                <span>Roast: {p.roast}</span>
                <span>Size: {p.size}</span>
              </div>
              <div className="small">Notes: {p.tastingNotes.join(", ")}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
