# Coffee Beans E-commerce (React + Node/Express)

> **Note:** This app was generated using AI and is used only for testing purposes for mixpanel-skill to prevent prompt drift.

A small, fully functioning demo e-commerce app for selling coffee beans.

## Features
- Product list + product detail pages
- Cart (add/remove/update quantities)
- Checkout flow (shipping + customer info) with order confirmation
- Contact Us form
- About + FAQ pages
- Backend REST API (products, orders, contact)
- Simple in-memory data store (swap to DB later)

## Tech
- Frontend: React + Vite + React Router
- Backend: Node.js + Express + CORS
- Dev experience: two terminals (client + server) or use the root `dev` script

---

## Quick Start

### 1) Install dependencies
From the project root:

```bash
npm install
```

### 2) Run in development (two ways)

**Option A: one command (recommended)**
```bash
npm run dev
```
This starts:
- API server at http://localhost:5000
- React dev server at http://localhost:5173 (proxy to API)

**Option B: two terminals**
Terminal 1:
```bash
npm run dev:server
```
Terminal 2:
```bash
npm run dev:client
```

### 3) Build for production
```bash
npm run build
npm start
```
This will:
- build the client
- serve the built client from the Express server at http://localhost:5000

---

## Folder Structure
- `client/` React app (Vite)
- `server/` Express API server

---

## Notes / Next Up Ideas
- Add Stripe/Shopify payments
- Add admin dashboard (CRUD products, orders)
- Add persistent storage (PostgreSQL/MongoDB)
- Add auth + saved addresses
