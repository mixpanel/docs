import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../lib/api.js";
import Loading from "../components/Loading.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import Price from "../components/Price.jsx";
import Toast from "../components/Toast.jsx";
import { useCart } from "../state/cart.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [grind, setGrind] = useState("Whole Bean");
  const [toast, setToast] = useState("");

  useEffect(() => {
    setData(null);
    setError(null);
    apiGet(`/api/products/${id}`)
      .then(setData)
      .catch(setError);
  }, [id]);

  const product = data?.product;

  useEffect(() => {
    if (product?.grindOptions?.length) setGrind(product.grindOptions[0]);
  }, [product?.id]);

  const noteLine = useMemo(() => product?.tastingNotes?.join(" • "), [product]);

  function onAdd() {
    add(product.id, Number(qty), grind);
    setToast(`${product.name} (${grind}) × ${qty}`);
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Link className="pill" to="/shop">← Back to shop</Link>
        <Link className="btn" to="/cart">View cart</Link>
      </div>

      {!data && !error && <Loading label="Loading product..." />}
      <ErrorBox error={error} />

      {product && (
        <div className="row">
          <div className="col">
            <div className="card" style={{ padding: 16 }}>
              <div className="thumb" style={{ height: 260, fontSize: 52 }}>☕</div>
              <div style={{ marginTop: 12 }}>
                <div className="pill">Origin: {product.origin}</div>{" "}
                <div className="pill">Roast: {product.roast}</div>{" "}
                <div className="pill">Size: {product.size}</div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ padding: 18 }}>
              <h2 className="h2" style={{ marginBottom: 8 }}>{product.name}</h2>
              <div className="small" style={{ marginBottom: 10 }}>{noteLine}</div>
              <div style={{ fontSize: 22, fontWeight: 850 }}><Price cents={product.priceCents} /></div>

              <div className="section">
                <div className="small" style={{ lineHeight: 1.6 }}>{product.description}</div>
              </div>

              <div className="section row">
                <div className="col" style={{ flex: "0 0 220px" }}>
                  <label className="label">Grind</label>
                  <select value={grind} onChange={(e) => setGrind(e.target.value)}>
                    {product.grindOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="col" style={{ flex: "0 0 140px" }}>
                  <label className="label">Qty</label>
                  <input className="input" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
                </div>
              </div>

              <div className="section row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <button className="btn primary" onClick={onAdd}>Add to cart</button>
                <div className="small">Free shipping over $35</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
