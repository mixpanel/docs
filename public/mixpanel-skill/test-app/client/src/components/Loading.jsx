import React from "react";

export default function Loading({ label = "Loading..." }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="small">{label}</div>
    </div>
  );
}
