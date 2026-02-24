"use client";
// app/appointment-confirmed/AppointmentConfirmed.jsx
// Client Component — confirmation screen after booking

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import MedicalSketches from "@/components/MedicalSketches";

// ── Mock appointment data (in real app comes from route state / API) ──
const APPOINTMENT = {
  number:        "#34",
  doctor: {
    name:          "Dr. Kumar Das",
    specialty:     "Cardiologist – Dombivali",
    qualification: "MBBS, MD (Internal Medicine)",
    imageUrl:      "https://ui-avatars.com/api/?name=Kumar+Das&background=0ea5e9&color=fff&size=128&bold=true",
  },
  status:        "Active",
  date:          "Oct 27, 2023",
  time:          "7:30 PM",
  slot:          "07:15 PM – 07:30 PM",
  location:      "Medicare Clinic, Dombivali",
  fee:           "₹900",
};

// ── Calendar icon ──────────────────────────────────────
const CalendarIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);

// ── Confetti particle ──────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left:  `${5 + (i * 5.5) % 90}%`,
    delay: `${(i * 0.12).toFixed(2)}s`,
    dur:   `${1.2 + (i % 4) * 0.2}s`,
    color: ["#0ea5e9","#22c55e","#f59e0b","#a855f7","#ef4444","#38bdf8"][i % 6],
    size:  `${6 + (i % 4) * 2}px`,
    shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "rect",
  }));

  return (
    <div className={styles.confettiWrap} aria-hidden>
      {pieces.map((p) => (
        <div
          key={p.id}
          className={styles.confettiPiece}
          style={{
            left:            p.left,
            animationDelay:  p.delay,
            animationDuration: p.dur,
            background:      p.color,
            width:           p.shape === "rect"   ? `${parseInt(p.size) * 2}px` : p.size,
            height:          p.size,
            borderRadius:    p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "1px",
          }}
        />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────
export default function AppointmentConfirmed() {
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [patientName,     setPatientName]     = useState("");
  const [patientAge,      setPatientAge]      = useState("");
  const [patientGender,   setPatientGender]   = useState("");
  const [patientNotes,    setPatientNotes]    = useState("");
  const [patientSaved,    setPatientSaved]    = useState(false);
  const [calAdded,        setCalAdded]        = useState(false);
  const [mounted,         setMounted]         = useState(false);

  useEffect(() => {
    // slight delay so enter animation plays after mount
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSavePatient = (e) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    setPatientSaved(true);
    setShowPatientForm(false);
  };

  return (
    <div className={`${styles.page} ${mounted ? styles.pageVisible : ""}`}>
      <Confetti />

      {/* ── Top bar ──────────────────────────────────── */}
      <div className={styles.topBar}>
        <Link href="/book-appointment" className={styles.backBtn}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <h1 className={styles.topTitle}>Appointment Scheduled</h1>
        <div style={{ width: 36 }} />
      </div>

      <div className={styles.scrollArea}>

        {/* ── Success tick ─────────────────────────── */}
        <div className={styles.successRing}>
          <div className={styles.successCircle}>
            <svg width="36" height="36" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div className={styles.ringOuter} />
          <div className={styles.ringInner} />
        </div>

        {/* ── Doctor card ───────────────────────────── */}
        <div className={styles.doctorCard}>
          <MedicalSketches specialty="Cardiologist" className={styles.cardSketches} />
          <div className={styles.doctorCardInner}>
            <img
              src={APPOINTMENT.doctor.imageUrl}
              alt={APPOINTMENT.doctor.name}
              className={styles.docImage}
            />
            <div className={styles.docDetails}>
              <h2 className={styles.docName}>{APPOINTMENT.doctor.name}</h2>
              <p className={styles.docSpec}>{APPOINTMENT.doctor.specialty}</p>
              <p className={styles.docQual}>{APPOINTMENT.doctor.qualification}</p>
            </div>
          </div>
        </div>

        {/* ── Appointment details card ──────────────── */}
        <div className={styles.detailCard}>
          <MedicalSketches specialty="Cardiologist" className={styles.cardSketches} />

          <div className={styles.apptNumRow}>
            <span className={styles.apptNumLabel}>Appointment Number</span>
            <span className={styles.apptNum}>{APPOINTMENT.number}</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.statusBadge}>
                <span className={styles.statusDot} />
                {APPOINTMENT.status}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Reporting Time</span>
              <span className={styles.detailValue}>
                {APPOINTMENT.date} &nbsp; {APPOINTMENT.time}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Slot</span>
              <span className={styles.detailValue}>{APPOINTMENT.slot}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{APPOINTMENT.location}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Fee Paid</span>
              <span className={`${styles.detailValue} ${styles.feeValue}`}>{APPOINTMENT.fee}</span>
            </div>
          </div>

          {/* Add to calendar */}
          <button
            className={`${styles.calBtn} ${calAdded ? styles.calBtnAdded : ""}`}
            onClick={() => setCalAdded(true)}
          >
            <CalendarIcon />
            {calAdded ? "Added to Calendar ✓" : "Add to Calendar"}
          </button>
        </div>

        {/* ── Patient details card ──────────────────── */}
        <div className={styles.patientCard}>
          <MedicalSketches specialty="All" className={styles.cardSketches} />

          <p className={styles.patientTitle}>Add Patient Details</p>

          {patientSaved ? (
            <div className={styles.patientSaved}>
              <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
              </svg>
              <div>
                <p className={styles.patientSavedName}>{patientName} &nbsp;·&nbsp; {patientAge} yrs &nbsp;·&nbsp; {patientGender}</p>
                {patientNotes && <p className={styles.patientSavedNotes}>{patientNotes}</p>}
              </div>
              <button className={styles.editBtn} onClick={() => { setPatientSaved(false); setShowPatientForm(true); }}>Edit</button>
            </div>
          ) : !showPatientForm ? (
            <button className={styles.addPatientBtn} onClick={() => setShowPatientForm(true)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Patient Details
            </button>
          ) : (
            <form onSubmit={handleSavePatient} className={styles.patientForm}>
              <div className={styles.patientFieldRow}>
                <div className={styles.patientField}>
                  <label>Full Name *</label>
                  <input type="text" placeholder="Patient name" value={patientName}
                    onChange={(e) => setPatientName(e.target.value)} required />
                </div>
                <div className={styles.patientField}>
                  <label>Age</label>
                  <input type="number" placeholder="Age" value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)} min="0" max="120" />
                </div>
              </div>
              <div className={styles.patientField}>
                <label>Gender</label>
                <div className={styles.genderRow}>
                  {["Male", "Female", "Other"].map((g) => (
                    <button key={g} type="button"
                      className={`${styles.genderBtn} ${patientGender === g ? styles.genderBtnActive : ""}`}
                      onClick={() => setPatientGender(g)}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.patientField}>
                <label>Notes / Symptoms</label>
                <textarea placeholder="Briefly describe your symptoms…" value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)} rows={3} />
              </div>
              <div className={styles.patientFormBtns}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowPatientForm(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save Details</button>
              </div>
            </form>
          )}
        </div>

        {/* spacer */}
        <div style={{ height: 100 }} />
      </div>

      {/* ── Sticky footer button ──────────────────────── */}
      <div className={styles.stickyFooter}>
        <Link href="/doctors" className={styles.viewBtn}>
          View My Appointments
        </Link>
      </div>
    </div>
  );
}
