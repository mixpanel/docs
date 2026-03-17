import React, { useState } from "react";
import { apiPost } from "../lib/api.js";
import ErrorBox from "../components/ErrorBox.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await apiPost("/api/contact", form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="row">
      <div className="col">
        <div className="card" style={{ padding: 18 }}>
          <h2 className="h2" style={{ marginTop: 0 }}>Contact Us</h2>
          <div className="small" style={{ lineHeight: 1.6 }}>
            Questions about orders, wholesale, or brewing? Send a message and we’ll get back soon.
          </div>

          <div className="section">
            <ErrorBox error={error} />
            {sent && (
              <div className="card" style={{ padding: 14, borderColor: "rgba(34,197,94,0.35)", marginBottom: 12 }}>
                <div style={{ fontWeight: 800 }}>Message sent ✅</div>
                <div className="small">We’ll reply to {form.email || "your email"} as soon as we can.</div>
              </div>
            )}

            <form onSubmit={submit}>
              <label className="label">Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

              <label className="label">Email</label>
              <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

              <label className="label">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />

              <div className="section">
                <button className="btn primary" disabled={sending}>
                  {sending ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col" style={{ flex: "0 0 360px" }}>
        <div className="card" style={{ padding: 18 }}>
          <h3 style={{ marginTop: 0 }}>Store Info</h3>
          <div className="small" style={{ lineHeight: 1.7 }}>
            <b>Email:</b> hello@cinderbloom.example<br />
            <b>Hours:</b> Mon–Fri, 9am–5pm<br />
            <b>Shipping:</b> Roasted to order, ships in 1–2 business days
          </div>

          <div className="section">
            <h3 style={{ marginBottom: 6 }}>Wholesale</h3>
            <div className="small">
              Interested in café supply? Include “Wholesale” in your message and your weekly volume.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
