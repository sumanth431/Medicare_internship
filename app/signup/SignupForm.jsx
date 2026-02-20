"use client";
// app/signup/SignupForm.jsx
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
    <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
    <path d="M6.3 14.7l7 5.1C15.1 16.4 19.3 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.3 6.3 14.7z" fill="#FF3D00"/>
    <path d="M24 46c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.5C29.9 37 27.1 38 24 38c-6.1 0-11.2-4-13-9.5l-7 5.4C7.5 41.8 15.2 46 24 46z" fill="#4CAF50"/>
    <path d="M44.5 20H24v8.5h11.8c-1.2 3.2-3.9 5.8-7.3 7.1l6.6 5.5C41.6 38 46 32 46 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
  </svg>
);

// ── Plus Cross Logo ────────────────────────────────────
function MedicareLogo() {
  return (
    <div className={styles.logoWrap}>
      <div className={styles.logoBox}>
        <div className={styles.shimmer} />
        {/* Medical cross with pulse ring */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ position: "relative", zIndex: 2 }}>
          {/* Outer ring pulse */}
          <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" className={styles.ringPulse} />
          {/* Medical cross */}
          <rect x="18" y="8" width="8" height="28" rx="4" fill="white" />
          <rect x="8" y="18" width="28" height="8" rx="4" fill="white" />
          {/* Heartbeat line across cross */}
          <polyline
            className={styles.ecgLine}
            points="8,22 13,22 15,17 17,27 19,19 21,22 23,22 25,16 27,28 29,22 36,22"
            stroke="rgba(14,165,233,0.9)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <h1 className={styles.brand}>MediCare</h1>
      <p className={styles.tagline}>Create your free account today.</p>
    </div>
  );
}

// ── Password Strength ──────────────────────────────────
function getStrength(pw) {
  if (!pw) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Weak", color: "#ef4444" };
  if (score === 2) return { level: 2, label: "Fair", color: "#f97316" };
  if (score === 3) return { level: 3, label: "Good", color: "#eab308" };
  return { level: 4, label: "Strong", color: "#22c55e" };
}

// ── Validation ─────────────────────────────────────────
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidPhone(v) { return /^\d{10}$/.test(v); }

// Simulated signup — replace with your real API / NextAuth call
async function registerUser(data) {
  await new Promise((r) => setTimeout(r, 1600));
  // Example: await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
}

// ── Main Form Component ────────────────────────────────
export default function SignupForm() {
  const [fullName,        setFullName]        = useState("");
  const [identifier,      setIdentifier]      = useState(""); // email or phone
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw,          setShowPw]          = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [agreeTerms,      setAgreeTerms]      = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState("");
  const [success,         setSuccess]         = useState(false);

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !identifier.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields."); return;
    }
    if (!isValidEmail(identifier.trim()) && !isValidPhone(identifier.trim())) {
      setError("Enter a valid email or 10-digit mobile number."); return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match."); return;
    }
    if (!agreeTerms) {
      setError("Please accept the Terms & Privacy Policy."); return;
    }

    setError("");
    setLoading(true);

    try {
      await registerUser({ fullName, identifier, password });
      setSuccess(true);
      // router.push("/otp"); // ← redirect to OTP page
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // signIn("google");
    alert("Connect your Google auth provider here.");
  };

  return (
    <div className={styles.card}>
      <MedicareLogo />

      <h2 className={styles.heading}>Create your account</h2>

      <form onSubmit={handleSubmit} noValidate>

        {/* Full Name */}
        <div className={styles.field}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Priya Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
          />
        </div>

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
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

          {/* Strength meter */}
          {password && (
            <div className={styles.strengthWrap}>
              <div className={styles.strengthBar}>
                {[1, 2, 3, 4].map((seg) => (
                  <div
                    key={seg}
                    className={styles.strengthSeg}
                    style={{
                      background: seg <= strength.level ? strength.color : "#e0eaf3",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
              <span className={styles.strengthLabel} style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className={styles.field}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={styles.inputWrap}>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowConfirm((v) => !v)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
          </div>
          {/* Match hint */}
          {confirmPassword && (
            <p className={styles.matchHint} style={{
              color: confirmPassword === password ? "#22c55e" : "#ef4444"
            }}>
              {confirmPassword === password ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}
        </div>

        {/* Terms */}
        <label className={styles.termsRow}>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className={styles.termsLink}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className={styles.termsLink}>Privacy Policy</Link>
          </span>
        </label>

        {/* Error */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Submit */}
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={loading || success}
          style={success ? { background: "linear-gradient(135deg,#22c55e,#16a34a)" } : {}}
        >
          {success ? "✓ Account created!" : loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      {/* Divider */}
      <div className={styles.divider}>
        <span>Or sign up with</span>
      </div>

      {/* Google */}
      <button type="button" className={styles.btnGoogle} onClick={handleGoogle}>
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Login link */}
      <p className={styles.signupText}>
        Already have an account?{" "}
        <Link href="/login">Sign In</Link>
      </p>
    </div>
  );
}
