import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet } from "../lib/api.js";
import { useCart } from "../state/cart.jsx";
import Loading from "../components/Loading.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import Price, { formatUsdFromCents } from "../components/Price.jsx";

export default function Cart() {
  const { items, remove, setQty } = useCart();
  const nav = useNavigate();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet("/api/products")
      .then((d) => setProducts(d.products))
      .catch(setError);
  }, []);

  const rows = useMemo(() => {
    const list = products || [];
    return items.map((it, idx) => {
      const p = list.find((x) => x.id === it.productId);
      return {
        idx,
        product: p,
        qty: it.qty,
        grind: it.grind,
        subtotalCents: p ? p.priceCents * it.qty : 0
      };
    });
  }, [items, products]);

  const subtotalCents = rows.reduce((s, r) => s + r.subtotalCents, 0);
  const shippingCents = rows.length ? (subtotalCents >= 3500 ? 0 : 499) : 0;
  const taxCents = Math.round(subtotalCents * 0.06);
  const totalCents = subtotalCents + shippingCents + taxCents;

  if (!products && !error) return <Loading label="Loading cart..." />;

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="h2" style={{ margin: 0 }}>Your Cart</h2>
        <Link to="/shop" className="pill">Continue shopping →</Link>
      </div>

      <ErrorBox error={error} />

      <div className="row">
        <div className="col">
          <div className="card" style={{ padding: 16 }}>
            {items.length === 0 ? (
              <div className="small">
                Your cart is empty. <Link to="/shop" style={{ textDecoration: "underline" }}>Shop coffee</Link>.
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Grind</th>
                    <th style={{ width: 110 }}>Qty</th>
                    <th style={{ width: 120 }}>Price</th>
                    <th style={{ width: 120 }}>Subtotal</th>
                    <th style={{ width: 90 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.idx}>
                      <td>
                        {r.product ? (
                          <Link to={`/products/${r.product.id}`} style={{ textDecoration: "underline" }}>
                            {r.product.name}
                          </Link>
                        ) : (
                          <span className="small">Unknown product</span>
                        )}
                      </td>
                      <td className="small">{r.grind}</td>
                      <td>
                        <input
                          className="input"
                          type="number"
                          min="1"
                          value={r.qty}
                          onChange={(e) => setQty(r.idx, e.target.value)}
                        />
                      </td>
                      <td className="small">{r.product ? <Price cents={r.product.priceCents} /> : "—"}</td>
                      <td className="small">{formatUsdFromCents(r.subtotalCents)}</td>
                      <td>
                        <button className="btn danger" onClick={() => remove(r.idx)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="col" style={{ flex: "0 0 360px" }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0 }}>Summary</h3>
            <div className="section small">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Subtotal</span><span>{formatUsdFromCents(subtotalCents)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Shipping</span><span>{formatUsdFromCents(shippingCents)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Tax (demo)</span><span>{formatUsdFromCents(taxCents)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 850 }}>
                <span>Total</span><span>{formatUsdFromCents(totalCents)}</span>
              </div>
            </div>

            <div className="section">
              <button
                className="btn primary"
                style={{ width: "100%" }}
                disabled={items.length === 0}
                onClick={() => nav("/checkout")}
              >
                Checkout
              </button>
              <div className="small" style={{ marginTop: 10 }}>
                Payments are mocked in this demo (order status: <b>PAID (demo)</b>).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
