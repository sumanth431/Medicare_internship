// app/appointment-confirmed/page.jsx
// Server Component — page entry point

import AppointmentConfirmed from "./AppointmentConfirmed";
import styles from "./page.module.css";

export const metadata = {
  title: "MediCare – Appointment Scheduled",
  description: "Your appointment has been confirmed",
};

export default function AppointmentConfirmedPage() {
  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
      </div>
      <AppointmentConfirmed />
    </main>
  );
}
