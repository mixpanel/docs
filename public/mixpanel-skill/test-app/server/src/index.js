import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { productsRouter } from "./routes/products.js";
import { ordersRouter } from "./routes/orders.js";
import { contactRouter } from "./routes/contact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: CLIENT_ORIGIN }));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);

// Serve built client in production
const clientDist = path.join(__dirname, "..", "..", "client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
