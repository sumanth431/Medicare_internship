// app/book-appointment/page.jsx
// Server Component — page entry point

import BookingForm from "./BookingForm";
import styles from "./page.module.css";

export const metadata = {
  title: "MediCare – Book Appointment",
  description: "Book an appointment with your doctor",
};

export default function BookAppointmentPage() {
  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
      </div>
      <BookingForm />
    </main>
  );
}
