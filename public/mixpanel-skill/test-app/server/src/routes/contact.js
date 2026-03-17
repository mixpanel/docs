import express from "express";
import crypto from "crypto";
import { store } from "../data/store.js";

export const contactRouter = express.Router();

contactRouter.post("/", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing name, email, or message" });
  }

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    message
  };

  store.contactMessages.push(record);
  res.status(201).json({ ok: true, id: record.id });
});
