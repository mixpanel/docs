import React from "react";

export default function About() {
  return (
    <div className="card" style={{ padding: 18 }}>
      <h2 className="h2" style={{ marginTop: 0 }}>About Cinder & Bloom</h2>
      <div className="small" style={{ lineHeight: 1.7 }}>
        We roast coffees that make it easy to brew something great at home.
        Our focus is clarity: clean sourcing, transparent roast profiles, and simple grind choices.
        <br /><br />
        This project is a demo e-commerce app. Replace text, branding, policies, and integrate real payments before launching.
      </div>

      <div className="section">
        <h3 style={{ marginBottom: 6 }}>Policies (Demo)</h3>
        <div className="small" style={{ lineHeight: 1.7 }}>
          <b>Returns:</b> Coffee is perishable; contact us if there’s an issue and we’ll make it right.<br />
          <b>Shipping:</b> Free over $35; otherwise a flat $4.99 (demo rule).<br />
          <b>Freshness:</b> Roasted to order (demo copy).
        </div>
      </div>
    </div>
  );
}
