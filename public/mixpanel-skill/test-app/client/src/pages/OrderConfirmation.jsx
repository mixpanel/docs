import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../lib/api.js";
import Loading from "../components/Loading.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import { formatUsdFromCents } from "../components/Price.jsx";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet(`/api/orders/${id}`)
      .then(setData)
      .catch(setError);
  }, [id]);

  const order = data?.order;

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <h2 className="h2" style={{ marginTop: 0 }}>Order confirmed ✅</h2>
        <div className="small">
          Thanks, {order?.customer?.name || "friend"}! Your order has been placed.
        </div>

        <div className="section row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Link className="btn primary" to="/shop">Shop more</Link>
          <Link className="btn" to="/contact">Need help?</Link>
        </div>
      </div>

      {!order && !error && <Loading label="Loading order..." />}
      <ErrorBox error={error} />

      {order && (
        <div className="row">
          <div className="col">
            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>Order Details</h3>
              <div className="small">Order ID: <b>{order.id}</b></div>
              <div className="small">Status: <b>{order.status}</b></div>
              <div className="small">Created: {new Date(order.createdAt).toLocaleString()}</div>

              <div className="section">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th style={{ width: 90 }}>Qty</th>
                      <th style={{ width: 130 }}>Unit</th>
                      <th style={{ width: 130 }}>Line</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((it) => (
                      <tr key={it.productId}>
                        <td>{it.name}</td>
                        <td>{it.qty}</td>
                        <td>{formatUsdFromCents(it.unitPriceCents)}</td>
                        <td>{formatUsdFromCents(it.lineSubtotalCents)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col" style={{ flex: "0 0 360px" }}>
            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>Totals</h3>
              <div className="small" style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Subtotal</span><span>{formatUsdFromCents(order.subtotalCents)}</span>
              </div>
              <div className="small" style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Shipping</span><span>{formatUsdFromCents(order.shippingCents)}</span>
              </div>
              <div className="small" style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Tax</span><span>{formatUsdFromCents(order.taxCents)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 850 }}>
                <span>Total</span><span>{formatUsdFromCents(order.totalCents)}</span>
              </div>

              <div className="section">
                <h3 style={{ marginBottom: 6 }}>Ship to</h3>
                <div className="small" style={{ lineHeight: 1.6 }}>
                  {order.shippingAddress?.line1}<br />
                  {order.shippingAddress?.line2 ? <>{order.shippingAddress.line2}<br /></> : null}
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
