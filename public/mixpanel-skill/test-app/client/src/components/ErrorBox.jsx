import React from "react";

export default function ErrorBox({ error }) {
  if (!error) return null;
  return (
    <div className="card" style={{ padding: 16, borderColor: "rgba(239,68,68,0.45)" }}>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>Something went wrong</div>
      <div className="small">{String(error.message || error)}</div>
    </div>
  );
}
