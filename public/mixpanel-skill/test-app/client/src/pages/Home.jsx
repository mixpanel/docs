import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../lib/api.js";
import Loading from "../components/Loading.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import Price from "../components/Price.jsx";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet("/api/products")
      .then(setData)
      .catch(setError);
  }, []);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card hero">
        <div>
          <h1>Beans that taste like a small victory.</h1>
          <p>
            Fresh-roasted coffees with clear origins, honest roast profiles, and
            brew-method-friendly grind options.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="btn primary" to="/shop">Shop coffee</Link>
          <Link className="btn" to="/about">Our story</Link>
          <Link className="btn" to="/faq">Shipping & FAQ</Link>
        </div>
      </div>

      <div className="section">
        <div className="row" style={{ alignItems: "baseline", justifyContent: "space-between" }}>
          <h2 className="h2">Featured beans</h2>
          <Link className="pill" to="/shop">View all →</Link>
        </div>

        {!data && !error && <Loading label="Loading products..." />}
        <ErrorBox error={error} />

        {data?.products && (
          <div className="grid products">
            {data.products.slice(0, 4).map((p) => (
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
                <div className="small">
                  Notes: {p.tastingNotes.join(", ")}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
