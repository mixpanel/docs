import React from "react";

const faqs = [
  {
    q: "How fast do you ship?",
    a: "In this demo, orders are 'paid' immediately and ship in 1–2 business days (replace with your real policy)."
  },
  {
    q: "Do you offer grind options?",
    a: "Yes—select Whole Bean or a brew method grind on each product page."
  },
  {
    q: "Is payment processing real?",
    a: "No. This app uses a demo checkout that creates an order without collecting card details. Add Stripe to accept payments."
  },
  {
    q: "Can I add subscriptions?",
    a: "Yes—add a subscription model (weekly/monthly) and integrate payments accordingly."
  }
];

export default function FAQ() {
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <h2 className="h2" style={{ marginTop: 0 }}>FAQ</h2>
        <div className="small">Answers are demo placeholders—swap to your real policies.</div>
      </div>

      {faqs.map((f) => (
        <div key={f.q} className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 850, marginBottom: 6 }}>{f.q}</div>
          <div className="small" style={{ lineHeight: 1.7 }}>{f.a}</div>
        </div>
      ))}
    </div>
  );
}
