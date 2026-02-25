"use client";
// app/login/LoginForm.jsx
// Client Component — handles all interactivity & state

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// ── Icons ──────────────────────────────────────────────
const EyeOpenIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107" />
    <path d="M6.3 14.7l7 5.1C15.1 16.4 19.3 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.3 6.3 14.7z" fill="#FF3D00" />
    <path d="M24 46c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.5C29.9 37 27.1 38 24 38c-6.1 0-11.2-4-13-9.5l-7 5.4C7.5 41.8 15.2 46 24 46z" fill="#4CAF50" />
    <path d="M44.5 20H24v8.5h11.8c-1.2 3.2-3.9 5.8-7.3 7.1l6.6 5.5C41.6 38 46 32 46 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2" />
  </svg>
);

// ── Heartbeat Logo ─────────────────────────────────────
function HeartbeatLogo() {
  return (
    <div className={styles.logoWrap}>
      <div className={styles.logoBox}>
        <div className={styles.shimmer} />
        <svg width="56" height="30" viewBox="0 0 56 30" fill="none" style={{ position: "relative", zIndex: 2 }}>
          <polyline
            className={styles.ecgLine}
            points="0,15 10,15 14,3 18,27 22,9 26,15 30,15 35,6 39,24 43,15 56,15"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle className={styles.ecgDot} cx="56" cy="15" r="2.5" fill="white" />
        </svg>
      </div>
      <h1 className={styles.brand}>MediCare</h1>
      <p className={styles.tagline}>Your health, simplified.</p>
    </div>
  );
}

// ── Validation helpers ─────────────────────────────────
function isValidIdentifier(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
}

// Simulated login — replace with your real API / NextAuth call
async function loginUser(identifier, password) {
  await new Promise((r) => setTimeout(r, 1500));
  // Example NextAuth call:
  // const result = await signIn("credentials", { identifier, password, redirect: false });
  // if (result?.error) throw new Error("Invalid credentials");
}

// ── Main Form Component ────────────────────────────────
export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword]     = useState("");
  const [remember, setRemember]     = useState(false);
  const [showPw, setShowPw]         = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!identifier.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidIdentifier(identifier.trim())) {
      setError("Enter a valid email or 10-digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await loginUser(identifier.trim(), password);
      setSuccess(true);
      router.push("/doctorspages"); // ← uncomment after adding useRouter
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // signIn("google"); // ← NextAuth Google provider
    alert("Connect your Google auth provider here.");
  };

  return (
    <div className={styles.card}>
      <HeartbeatLogo />

      <h2 className={styles.heading}>Sign in to your account</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Mobile / Email */}
        <div className={styles.field}>
          <label htmlFor="identifier">Mobile / Email</label>
          <input
            id="identifier"
            type="text"
            placeholder="Enter mobile or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
          />
        </div>

        {/* Password */}
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputWrap}>
            <input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPw((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPw ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
          </div>
        </div>

        {/* Remember me + Forgot password */}
        <div className={styles.rowBetween}>
          <label className={styles.remember}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <Link href="/forgot-password" className={styles.forgot}>
            Forgot Password?
          </Link>
        </div>

        {/* Error message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Submit */}
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={loading || success}
          style={success ? { background: "linear-gradient(135deg,#22c55e,#16a34a)" } : {}}
        >
          {success ? "✓ Welcome back!" : loading ? "Signing in…" : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className={styles.divider}>
        <span>Or login with</span>
      </div>

      {/* Google */}
      <button type="button" className={styles.btnGoogle} onClick={handleGoogle}>
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Sign up link */}
      <p className={styles.signupText}>
        Don't have an account?{" "}
        <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
