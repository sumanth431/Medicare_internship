// app/doctors/page.jsx
// Server Component — page entry point

import DoctorList from "./DoctorList";
import styles from "./page.module.css";

export const metadata = {
  title: "MediCare – Find Doctors",
  description: "Browse and book top-rated doctors near you",
};

export default function DoctorsPage() {
  return (
    <main className={styles.main}>
      {/* Subtle background blobs */}
      <div className={styles.bg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
      </div>

      {/* All interactive logic inside client component */}
      <DoctorList />
    </main>
  );
}
