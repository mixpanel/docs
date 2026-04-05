import express from "express";
import crypto from "crypto";
import { store, calcOrderTotals } from "../data/store.js";

export const ordersRouter = express.Router();

ordersRouter.post("/", (req, res) => {
  const { customer, shippingAddress, items, grindPreferences } = req.body || {};

  if (!customer?.email || !customer?.name) {
    return res.status(400).json({ error: "Missing customer name/email" });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const totals = calcOrderTotals(items);
  if (totals.lines.length === 0) {
    return res.status(400).json({ error: "No valid items in cart" });
  }

  const order = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "PAID (demo)",
    customer,
    shippingAddress,
    grindPreferences: grindPreferences || {},
    items: totals.lines,
    subtotalCents: totals.subtotalCents,
    shippingCents: totals.shippingCents,
    taxCents: totals.taxCents,
    totalCents: totals.totalCents
  };

  store.orders.push(order);
  res.status(201).json({ order });
});

ordersRouter.get("/:id", (req, res) => {
  const order = store.orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json({ order });
});
