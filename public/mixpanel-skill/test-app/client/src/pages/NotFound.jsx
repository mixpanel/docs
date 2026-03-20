import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card" style={{ padding: 18 }}>
      <h2 className="h2" style={{ marginTop: 0 }}>Page not found</h2>
      <div className="small" style={{ marginBottom: 12 }}>
        That URL doesn’t exist.
      </div>
      <Link className="btn primary" to="/">Go home</Link>
    </div>
  );
}
