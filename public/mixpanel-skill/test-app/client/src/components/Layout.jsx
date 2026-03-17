import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../state/cart.jsx";
import { useAuth } from "../state/auth.jsx";

function CartCount() {
  const { items } = useCart();
  const count = items.reduce((s, it) => s + it.qty, 0);
  return <span className="badge">{count} item{count === 1 ? "" : "s"}</span>;
}

function AuthNav() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/");
  }

  if (user) {
    return (
      <>
        <span className="small" style={{ opacity: 0.7 }}>{user.name}</span>
        <button className="btn" onClick={handleLogout} style={{ marginLeft: 8 }}>
          Log Out
        </button>
      </>
    );
  }

  return (
    <>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/signup" className="btn">Sign Up</NavLink>
    </>
  );
}

export default function Layout({ children }) {
  return (
    <div>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <span style={{ fontSize: 18 }}>☕</span>
            <span>Cinder & Bloom</span>
            <span className="badge">Coffee Beans</span>
          </Link>

          <nav className="navlinks">
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/about">About</NavLink>
            <CartCount />
            <AuthNav />
          </nav>
        </div>
      </header>

      <main className="container">{children}</main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Cinder & Bloom Coffee</div>
        <div className="small" style={{ marginTop: 8 }}>
          Demo store • Replace branding, products, and policies before launching.
        </div>
      </footer>
    </div>
  );
}
