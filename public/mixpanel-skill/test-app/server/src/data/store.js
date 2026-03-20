import { products } from "./products.js";

// In-memory store for demo purposes.
// Swap to a database (Postgres/Mongo/etc.) for production.
export const store = {
  products,
  orders: [],
  contactMessages: []
};

export function centsToUsd(cents) {
  return (cents / 100).toFixed(2);
}

export function calcOrderTotals(items) {
  // items: [{ productId, qty }]
  const lines = items.map((it) => {
    const p = store.products.find((x) => x.id === it.productId);
    if (!p) return null;
    const lineSubtotalCents = p.priceCents * it.qty;
    return {
      productId: p.id,
      name: p.name,
      unitPriceCents: p.priceCents,
      qty: it.qty,
      lineSubtotalCents
    };
  }).filter(Boolean);

  const subtotalCents = lines.reduce((s, l) => s + l.lineSubtotalCents, 0);

  // Simple demo rules:
  const shippingCents = subtotalCents >= 3500 ? 0 : (lines.length ? 499 : 0); // free shipping over $35
  const taxCents = Math.round(subtotalCents * 0.06); // demo tax 6%
  const totalCents = subtotalCents + shippingCents + taxCents;

  return { lines, subtotalCents, shippingCents, taxCents, totalCents };
}
