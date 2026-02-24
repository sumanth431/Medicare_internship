"use client";
// app/book-appointment/BookingForm.jsx
// Client Component — date picker, slot selection, booking logic

import { useState, useCallback } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// ── Helpers ────────────────────────────────────────────
const DAYS_AHEAD = 7;

function getDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

const DAY_NAMES  = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const MONTH_NAMES = ["January","February","March","April","May","June",
                     "July","August","September","October","November","December"];

const MORNING_SLOTS = [
  "09:30 AM – 09:45 AM",
  "10:00 AM – 10:15 AM",
  "10:30 AM – 10:45 AM",
  "11:00 AM – 11:15 AM",
  "11:30 AM – 11:45 AM",
  "12:00 PM – 12:15 PM",
  "12:30 PM – 12:45 PM",
  "01:00 PM – 01:15 PM",
];

const EVENING_SLOTS = [
  "05:30 PM – 05:45 PM",
  "06:00 PM – 06:15 PM",
  "06:30 PM – 06:45 PM",
  "07:00 PM – 07:15 PM",
];

// Simulate some booked slots per date index
const BOOKED = {
  0: ["12:30 PM – 12:45 PM", "05:30 PM – 05:45 PM"],
  1: ["10:00 AM – 10:15 AM", "11:30 AM – 11:45 AM", "06:00 PM – 06:15 PM"],
  2: [],
};

// ── Doctor data (in real app comes from route params / API) ──
const DOCTOR = {
  name:          "Dr. Kumar Das",
  specialty:     "Cardiologist – Dombivali",
  qualification: "MBBS, MD (Internal Medicine)",
  experience:    15,
  patients:      "5,000+",
  rating:        4.8,
  reviews:       942,
  imageUrl:      "https://ui-avatars.com/api/?name=Kumar+Das&background=0ea5e9&color=fff&size=128&bold=true&rounded=true",
  about:         "15+ years of experience in all aspects of cardiology, including non-invasive and interventional procedural techniques.",
  service:       "Medicare",
  specialization: "Cardiology",
  availability:  "Monday to Friday",
  hours:         "10 AM to 5 PM",
};

// Simulated booking API
async function confirmBooking(payload) {
  await new Promise((r) => setTimeout(r, 1500));
  // await fetch("/api/appointments", { method: "POST", body: JSON.stringify(payload) });
}

// ── Sub-components ─────────────────────────────────────
function StarRating({ rating }) {
  return (
    <span className={styles.stars}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
      <span className={styles.ratingNum}>{rating}</span>
    </span>
  );
}

function SlotButton({ slot, state, onClick }) {
  // state: "available" | "booked" | "selected"
  return (
    <button
      className={[
        styles.slot,
        state === "selected" ? styles.slotSelected : "",
        state === "booked"   ? styles.slotBooked   : "",
      ].join(" ")}
      disabled={state === "booked"}
      onClick={() => state !== "booked" && onClick(slot)}
      title={state === "booked" ? "Already booked" : ""}
    >
      {slot}
      {state === "booked" && <span className={styles.slotCross}>✕</span>}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────
export default function BookingForm() {
  const dates = getDates();
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedSlot,    setSelectedSlot]    = useState(null);
  const [loading,         setLoading]         = useState(false);
  const [success,         setSuccess]         = useState(false);
  const [error,           setError]           = useState(null);
  const [showAbout,       setShowAbout]       = useState(false);

  const selectedDate = dates[selectedDateIdx];
  const booked = BOOKED[selectedDateIdx] ?? [];

  const slotState = useCallback(
    (slot) => {
      if (slot === selectedSlot)   return "selected";
      if (booked.includes(slot))   return "booked";
      return "available";
    },
    [selectedSlot, booked]
  );

  const handleBook = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    setError(null);
    try {
      // Simulate random booking failure (20% chance)
      if (Math.random() < 0.2) {
        throw new Error("This slot was just booked by another patient. Please select a different time.");
      }
      await confirmBooking({
        doctor:    DOCTOR.name,
        date:      selectedDate.toDateString(),
        slot:      selectedSlot,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Unable to book appointment. Please try again.");
      setSelectedSlot(null);
    } finally {
      setLoading(false);
    }
  };

  // Month/year label for the selected date
  const monthLabel = `${MONTH_NAMES[selectedDate.getMonth()]}, ${selectedDate.getFullYear()}`;

  return (
    <div className={styles.page} data-specialty={DOCTOR.specialization.toLowerCase()}>

      {/* ── Top bar ──────────────────────────────────── */}
      <div className={styles.topBar}>
        <Link href="/doctors" className={styles.backBtn}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <h1 className={styles.topTitle}>Book Appointment</h1>
        <div style={{ width: 36 }} />
      </div>

      <div className={styles.scrollArea}>

        {/* ── Doctor card ───────────────────────────── */}
        <div className={styles.doctorCard}>
          <div className={styles.doctorCardInner}>
            <div className={styles.docDetails}>
              <h2 className={styles.docName}>{DOCTOR.name}</h2>
              <p className={styles.docSpec}>{DOCTOR.specialty}</p>
              <p className={styles.docQual}>{DOCTOR.qualification}</p>
              <div className={styles.docMeta}>
                <StarRating rating={DOCTOR.rating} />
                <span className={styles.docReviews}>({DOCTOR.reviews} reviews)</span>
              </div>
            </div>
            <img
              src={DOCTOR.imageUrl}
              alt={DOCTOR.name}
              className={styles.docImage}
            />
          </div>

          {/* Quick stats */}
          <div className={styles.docStats}>
            <div className={styles.docStat}>
              <span className={styles.docStatNum}>{DOCTOR.patients}</span>
              <span className={styles.docStatLabel}>Patients</span>
            </div>
            <div className={styles.docStatDiv} />
            <div className={styles.docStat}>
              <span className={styles.docStatNum}>{DOCTOR.experience}+</span>
              <span className={styles.docStatLabel}>Years exp.</span>
            </div>
            <div className={styles.docStatDiv} />
            <div className={styles.docStat}>
              <span className={styles.docStatNum}>{DOCTOR.rating}</span>
              <span className={styles.docStatLabel}>Rating</span>
            </div>
            <div className={styles.docStatDiv} />
            <div className={styles.docStat}>
              <span className={styles.docStatNum}>{DOCTOR.reviews}</span>
              <span className={styles.docStatLabel}>Reviews</span>
            </div>
          </div>
        </div>

        {/* ── About doctor (collapsible) ─────────────── */}
        <div className={styles.section}>
          <button className={styles.sectionToggle} onClick={() => setShowAbout((v) => !v)}>
            <span className={styles.sectionTitle}>About Doctor</span>
            <svg
              width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              style={{ transform: showAbout ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {showAbout && (
            <div className={styles.aboutContent}>
              <p className={styles.aboutText}>{DOCTOR.about}</p>
              <div className={styles.aboutGrid}>
                <div className={styles.aboutRow}>
                  <span className={styles.aboutKey}>Service</span>
                  <span className={styles.aboutVal}>{DOCTOR.service}</span>
                </div>
                <div className={styles.aboutRow}>
                  <span className={styles.aboutKey}>Specialization</span>
                  <span className={styles.aboutVal}>{DOCTOR.specialization}</span>
                </div>
                <div className={styles.aboutRow}>
                  <span className={styles.aboutKey}>Availability</span>
                  <span className={styles.aboutVal}>{DOCTOR.availability}</span>
                </div>
                <div className={styles.aboutRow}>
                  <span className={styles.aboutKey}>Hours</span>
                  <span className={styles.aboutVal}>{DOCTOR.hours}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Date picker ───────────────────────────── */}
        <div className={styles.section}>
          <div className={styles.dateHeader}>
            <span className={styles.sectionTitle}>Book Appointment</span>
            <span className={styles.monthLabel}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {monthLabel}
            </span>
          </div>
          <div className={styles.dateScroll}>
            {dates.map((d, i) => (
              <button
                key={i}
                className={`${styles.dateBtn} ${selectedDateIdx === i ? styles.dateBtnActive : ""}`}
                onClick={() => { setSelectedDateIdx(i); setSelectedSlot(null); }}
              >
                <span className={styles.dateNum}>{d.getDate()}</span>
                <span className={styles.dateDayName}>{DAY_NAMES[d.getDay()]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Morning slots ─────────────────────────── */}
        <div className={styles.section}>
          <div className={styles.slotSectionHeader}>
            <svg width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <span className={styles.slotSectionTitle}>Morning Slot</span>
          </div>
          <div className={styles.slotsGrid}>
            {MORNING_SLOTS.map((slot) => (
              <SlotButton
                key={slot}
                slot={slot}
                state={slotState(slot)}
                onClick={setSelectedSlot}
              />
            ))}
          </div>
        </div>

        {/* ── Evening slots ─────────────────────────── */}
        <div className={styles.section}>
          <div className={styles.slotSectionHeader}>
            <svg width="16" height="16" fill="none" stroke="#7c3aed" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <span className={styles.slotSectionTitle}>Evening Slot</span>
          </div>
          <div className={styles.slotsGrid}>
            {EVENING_SLOTS.map((slot) => (
              <SlotButton
                key={slot}
                slot={slot}
                state={slotState(slot)}
                onClick={setSelectedSlot}
              />
            ))}
          </div>
        </div>

        {/* ── Error banner ───────────────────────────── */}
        {error && (
          <div className={styles.errorBanner}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <div>
              <strong>Booking Failed</strong>
              <p>{error}</p>
            </div>
            <button className={styles.errorClose} onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* ── No slot selected warning ───────────────── */}
        {!selectedSlot && !error && (
          <div className={styles.noSlotBanner}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Please select a time slot to continue booking.
          </div>
        )}

        {/* ── Selected summary ──────────────────────── */}
        {selectedSlot && !success && (
          <div className={styles.selectedSummary}>
            <svg width="16" height="16" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
            </svg>
            <span>
              <strong>{selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]}</strong>
              {" · "}
              <strong>{selectedSlot}</strong>
            </span>
          </div>
        )}

        {/* spacer for sticky footer */}
        <div style={{ height: 90 }} />
      </div>

      {/* ── Sticky Book button ────────────────────────── */}
      <div className={styles.stickyFooter}>
        {success ? (
          <div className={styles.successBanner}>
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
            </svg>
            Appointment Confirmed! 🎉
          </div>
        ) : (
          <button
            className={styles.bookBtn}
            onClick={handleBook}
            disabled={!selectedSlot || loading}
          >
            {loading ? "Confirming…" : "Book Appointment"}
          </button>
        )}
      </div>
    </div>
  );
}
