// app/signup/page.jsx
// Server Component — page entry point

import SignupForm from "./SignupForm";
import styles from "./page.module.css";

export const metadata = {
  title: "MediCare – Create Account",
  description: "Sign up for your MediCare account",
};

export default function SignupPage() {
  return (
    <main className={styles.main}>
      {/* Animated background blobs */}
      <div className={styles.bg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      {/* Signup card with all interactive logic */}
      <SignupForm />
    </main>
  );
}
