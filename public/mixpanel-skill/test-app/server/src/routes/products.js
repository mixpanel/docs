import express from "express";
import { store } from "../data/store.js";

export const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.json({ products: store.products });
});

productsRouter.get("/:id", (req, res) => {
  const product = store.products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json({ product });
});
