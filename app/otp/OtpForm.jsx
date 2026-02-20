"use client";
// app/otp/OtpForm.jsx
// Client Component — handles all interactivity & state

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// ── Shield Logo ────────────────────────────────────────
function MedicareLogo() {
  return (
    <div className={styles.logoWrap}>
      <div className={styles.logoBox}>
        <div className={styles.shimmer} />
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ position: "relative", zIndex: 2 }}>
          {/* Shield shape */}
          <path
            d="M22 4 L36 10 L36 22 C36 30 29 37 22 40 C15 37 8 30 8 22 L8 10 Z"
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
          {/* Checkmark — animates in */}
          <polyline
            className={styles.checkLine}
            points="14,22 20,28 30,16"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Tiny lock body */}
          <rect x="18" y="19" width="8" height="6" rx="1.5" fill="rgba(255,255,255,0.3)" className={styles.lockBody} />
        </svg>
      </div>
      <h1 className={styles.brand}>MediCare</h1>
      <p className={styles.tagline}>Secure verification.</p>
    </div>
  );
}

// Simulated verify — replace with your real API call
async function verifyOtp(otp, phone) {
  await new Promise((r) => setTimeout(r, 1400));
  if (otp !== "123456") throw new Error("Invalid OTP. Please try again.");
}

// ── Main Form Component ────────────────────────────────
export default function OtpForm({ phone = "+91 111 ••••••99" }) {
  const OTP_LENGTH = 6;
  const [digits,    setDigits]    = useState(Array(OTP_LENGTH).fill(""));
  const [timer,     setTimer]     = useState(55);
  const [canResend, setCanResend] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;           // digits only
    const next = [...digits];
    next[index] = value.slice(-1);              // keep last typed digit
    setDigits(next);
    setError("");

    // Advance to next
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...digits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    // Focus last filled or first empty
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setError(`Please enter all ${OTP_LENGTH} digits.`); return;
    }
    setError("");
    setLoading(true);
    try {
      await verifyOtp(otp, phone);
      setSuccess(true);
      // router.push("/doctors"); // ← redirect to doctor listing
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setTimer(55);
    setCanResend(false);
    setError("");
    inputRefs.current[0]?.focus();
    // resendOtp(phone); // ← your API call
  };

  const filledCount = digits.filter(Boolean).length;

  return (
    <div className={styles.card}>
      <MedicareLogo />

      <h2 className={styles.heading}>OTP Verification</h2>
      <p className={styles.subheading}>
        Code has been sent to <strong className={styles.phoneHl}>{phone}</strong>
      </p>

      <form onSubmit={handleSubmit} noValidate>

        {/* OTP digit boxes */}
        <div className={styles.otpRow} onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={[
                styles.otpInput,
                digit        ? styles.otpFilled   : "",
                error        ? styles.otpError    : "",
                success      ? styles.otpSuccess  : "",
              ].join(" ")}
              aria-label={`Digit ${i + 1}`}
              disabled={success}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div className={styles.progressDots}>
          {digits.map((d, i) => (
            <div key={i} className={`${styles.dot} ${d ? styles.dotFilled : ""}`} />
          ))}
        </div>

        {/* Error */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Resend row */}
        <div className={styles.resendRow}>
          {canResend ? (
            <button type="button" className={styles.resendBtn} onClick={handleResend}>
              Resend Code
            </button>
          ) : (
            <p className={styles.resendTimer}>
              Resend code in{" "}
              <span className={styles.timerBadge}>{timer}s</span>
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={filledCount < OTP_LENGTH || loading || success}
          style={success ? { background: "linear-gradient(135deg,#22c55e,#16a34a)" } : {}}
        >
          {success
            ? "✓ Verified!"
            : loading
            ? "Verifying…"
            : "Verify OTP"}
        </button>
      </form>

      {/* Back to signup */}
      <p className={styles.signupText}>
        Wrong number?{" "}
        <Link href="/signup">Go back</Link>
      </p>
    </div>
  );
}
