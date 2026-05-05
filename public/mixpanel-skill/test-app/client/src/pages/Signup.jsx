import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";
import ErrorBox from "../components/ErrorBox.jsx";

export default function Signup() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await apiPost("/api/auth/signup", form);
      login(res.user);
      nav("/");
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 16, maxWidth: 400, margin: "0 auto" }}>
      <h2 className="h2">Create Account</h2>

      <ErrorBox error={error} />

      <form className="card" style={{ padding: 16 }} onSubmit={handleSubmit}>
        <label className="label">Name</label>
        <input
          className="input"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={6}
        />

        <div className="section">
          <button className="btn primary" style={{ width: "100%" }} disabled={submitting}>
            {submitting ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        <div className="small" style={{ textAlign: "center", marginTop: 12 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}
