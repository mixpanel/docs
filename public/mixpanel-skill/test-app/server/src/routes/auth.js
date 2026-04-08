import { Router } from "express";
import crypto from "crypto";

const router = Router();

// In-memory user store (demo only)
const users = [];

function generateId() {
  return crypto.randomUUID();
}

// POST /api/auth/signup
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "An account with this email already exists" });
  }

  const user = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    password, // In production, hash this!
    createdAt: new Date().toISOString()
  };

  users.push(user);

  // Return user without password
  const { password: _, ...safeUser } = user;
  res.status(201).json({ user: safeUser });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Return user without password
  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser });
});

export default router;
