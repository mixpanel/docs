import React from "react";

export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed",
      right: 16,
      bottom: 16,
      maxWidth: 420,
      zIndex: 50
    }}>
      <div className="card" style={{ padding: 14, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>Added to cart</div>
          <div className="small">{message}</div>
        </div>
        <button className="btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
