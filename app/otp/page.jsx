// app/otp/page.jsx
// Server Component — page entry point

import OtpForm from "./OtpForm";
import styles from "./page.module.css";

export const metadata = {
  title: "MediCare – Verify OTP",
  description: "Verify your phone number to continue",
};

export default function OtpPage() {
  return (
    <main className={styles.main}>
      {/* Animated background blobs */}
      <div className={styles.bg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
      </div>

      {/* OTP card with all interactive logic */}
      <OtpForm phone="+91 111 ••••••99" />
    </main>
  );
}
