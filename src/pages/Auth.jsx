import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useStore();

  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const update = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      name: form.name || form.email.split("@")[0],
      email: form.email,
    });

    navigate(location.state?.from || "/account");
  };

  return (
    <main>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <span className="logo-icon">⌂</span>
            <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
            <p>
              {mode === "login"
                ? "Sign in to continue your HomeMart journey."
                : "Join HomeMart and make your home beautiful."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              Login
            </button>

            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                minLength={4}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="auth-note">
            Demo authentication only. No real account or password is stored.
          </p>

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}