import React from "react";

export function formatUsdFromCents(cents) {
  return `$${(Number(cents || 0) / 100).toFixed(2)}`;
}

export default function Price({ cents }) {
  return <span>{formatUsdFromCents(cents)}</span>;
}
