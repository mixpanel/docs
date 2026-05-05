import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../lib/api.js";
import { useCart } from "../state/cart.jsx";
import Loading from "../components/Loading.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import { formatUsdFromCents } from "../components/Price.jsx";

export default function Checkout() {
  const nav = useNavigate();
  const { items, clear } = useCart();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({ line1: "", line2: "", city: "", state: "", postalCode: "" });

  useEffect(() => {
    apiGet("/api/products")
      .then((d) => setProducts(d.products))
      .catch(setError);
  }, []);

  const orderItems = useMemo(() => items.map((it) => ({ productId: it.productId, qty: it.qty })), [items]);
  const grindPreferences = useMemo(() => {
    const map = {};
    items.forEach((it) => { map[it.productId] = it.grind; });
    return map;
  }, [items]);

  const rows = useMemo(() => {
    const list = products || [];
    return items.map((it) => {
      const p = list.find((x) => x.id === it.productId);
      return {
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

  async function submitOrder(e) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError(new Error("Your cart is empty."));
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customer,
        shippingAddress: shipping,
        items: orderItems,
        grindPreferences
      };
      const res = await apiPost("/api/orders", payload);
      clear();
      nav(`/order/${res.order.id}`);
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!products && !error) return <Loading label="Preparing checkout..." />;

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="h2" style={{ margin: 0 }}>Checkout</h2>
        <Link className="pill" to="/cart">← Back to cart</Link>
      </div>

      <ErrorBox error={error} />

      <div className="row">
        <div className="col">
          <form className="card" style={{ padding: 16 }} onSubmit={submitOrder}>
            <h3 style={{ marginTop: 0 }}>Customer</h3>
            <label className="label">Name</label>
            <input className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required />
            <label className="label">Email</label>
            <input className="input" type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} required />
            <label className="label">Phone (optional)</label>
            <input className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />

            <h3 className="section">Shipping Address</h3>
            <label className="label">Address line 1</label>
            <input className="input" value={shipping.line1} onChange={(e) => setShipping({ ...shipping, line1: e.target.value })} required />
            <label className="label">Address line 2 (optional)</label>
            <input className="input" value={shipping.line2} onChange={(e) => setShipping({ ...shipping, line2: e.target.value })} />
            <div className="row">
              <div className="col">
                <label className="label">City</label>
                <input className="input" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} required />
              </div>
              <div className="col" style={{ flex: "0 0 120px" }}>
                <label className="label">State</label>
                <input className="input" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} required />
              </div>
              <div className="col" style={{ flex: "0 0 140px" }}>
                <label className="label">Postal</label>
                <input className="input" value={shipping.postalCode} onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })} required />
              </div>
            </div>

            <div className="section">
              <button className="btn primary" style={{ width: "100%" }} disabled={submitting}>
                {submitting ? "Placing order..." : "Place order (demo payment)"}
              </button>
              <div className="small" style={{ marginTop: 10 }}>
                This demo does not collect card details. Integrate Stripe to accept real payments.
              </div>
            </div>
          </form>
        </div>

        <div className="col" style={{ flex: "0 0 360px" }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Order Summary</h3>
            {items.length === 0 ? (
              <div className="small">Cart is empty.</div>
            ) : (
              <>
                <div className="small">
                  {rows.map((r, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span>
                        {r.product?.name || "Unknown"} <span className="small">({r.grind})</span> × {r.qty}
                      </span>
                      <span>{formatUsdFromCents(r.subtotalCents)}</span>
                    </div>
                  ))}
                </div>

                <div className="section small" style={{ borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span>Subtotal</span><span>{formatUsdFromCents(subtotalCents)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span>Shipping</span><span>{formatUsdFromCents(shippingCents)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span>Tax</span><span>{formatUsdFromCents(taxCents)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 850 }}>
                    <span>Total</span><span>{formatUsdFromCents(totalCents)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
