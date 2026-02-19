// app/login/page.jsx
// This is the page entry point (Server Component)

import LoginForm from "./LoginForm";
import styles from "./page.module.css";

export const metadata = {
  title: "MediCare – Login",
  description: "Sign in to your MediCare account",
};

export default function LoginPage() {
  return (
    <main className={styles.main}>
      {/* Animated background blobs */}
      <div className={styles.bg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
      </div>

      {/* Login card with all interactive logic */}
      <LoginForm />
    </main>
  );
}
