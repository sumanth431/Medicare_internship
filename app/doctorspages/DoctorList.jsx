"use client";
// app/doctors/DoctorList.jsx
// Client Component — search, filter, favourites, booking

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const SPECIALTIES = ["All", "Cardiologist", "Psychologist", "Dermatologist", "Ophthalmologist", "Neurologist"];

const DOCTORS = [
  { id: 1, name: "Dr. Anika Mehta",    specialty: "Cardiologist",    qualification: "MBBS, MD (Cardiology)",       location: "Andheri, Mumbai",  experience: 12, rating: 4.9, reviews: 312, patients: "5,000+",  available: true,  nextSlot: "09:30 AM",        price: 800,  tag: "Top Rated",    imageUrl: "https://ui-avatars.com/api/?name=Anika+Mehta&background=0ea5e9&color=fff&size=128&bold=true", hue: "210" },
  { id: 2, name: "Dr. Rajesh Iyer",    specialty: "Psychologist",    qualification: "MBBS, M.Phil (Psychiatry)",  location: "Bandra, Mumbai",   experience: 8,  rating: 4.7, reviews: 189, patients: "3,200+",  available: true,  nextSlot: "10:00 AM",        price: 600,  tag: "Popular",      imageUrl: "https://ui-avatars.com/api/?name=Rajesh+Iyer&background=7c3aed&color=fff&size=128&bold=true",  hue: "262" },
  { id: 3, name: "Dr. Priya Nair",     specialty: "Dermatologist",   qualification: "MBBS, MD (Dermatology)",     location: "Powai, Mumbai",    experience: 15, rating: 4.8, reviews: 421, patients: "8,100+",  available: false, nextSlot: "Tomorrow 9:00 AM", price: 750,  tag: null,           imageUrl: "https://ui-avatars.com/api/?name=Priya+Nair&background=db2777&color=fff&size=128&bold=true",   hue: "340" },
  { id: 4, name: "Dr. Suresh Kumar",   specialty: "Ophthalmologist", qualification: "MBBS, MS (Ophthalmology)",   location: "Dadar, Mumbai",    experience: 20, rating: 4.6, reviews: 560, patients: "12,000+", available: true,  nextSlot: "02:00 PM",        price: 900,  tag: "Senior Expert", imageUrl: "https://ui-avatars.com/api/?name=Suresh+Kumar&background=d97706&color=fff&size=128&bold=true",  hue: "38"  },
  { id: 5, name: "Dr. Meera Krishnan", specialty: "Neurologist",     qualification: "MBBS, DM (Neurology)",       location: "Juhu, Mumbai",     experience: 10, rating: 4.9, reviews: 234, patients: "4,700+",  available: true,  nextSlot: "08:30 AM",        price: 1100, tag: "Top Rated",    imageUrl: "https://ui-avatars.com/api/?name=Meera+Krishnan&background=059669&color=fff&size=128&bold=true", hue: "160" },
  { id: 6, name: "Dr. Vikram Shah",    specialty: "Cardiologist",    qualification: "MBBS, MD, DM (Cardiology)",  location: "Thane, Mumbai",    experience: 18, rating: 4.7, reviews: 389, patients: "9,500+",  available: false, nextSlot: "Tomorrow 11 AM",  price: 950,  tag: null,           imageUrl: "https://ui-avatars.com/api/?name=Vikram+Shah&background=0891b2&color=fff&size=128&bold=true",   hue: "196" },
];

function StarRating({ rating }) {
  return (
    <span className={styles.stars}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
      <span className={styles.ratingNum}>{rating}</span>
    </span>
  );
}

function DoctorCard({ doc, isFav, onToggleFav }) {
  return (
    <div className={styles.card}>
      {doc.tag && <div className={styles.cardTag}>{doc.tag}</div>}

      <button
        className={`${styles.favBtn} ${isFav ? styles.favActive : ""}`}
        onClick={() => onToggleFav(doc.id)}
        aria-label="Toggle favourite"
      >
        {isFav ? "♥" : "♡"}
      </button>

      <div className={styles.cardTop}>
        <div className={styles.avatarWrap}>
          <img
            src={doc.imageUrl}
            alt={doc.name}
            className={styles.avatar}
            style={{ borderColor: `hsl(${doc.hue},70%,80%)` }}
          />
          <span className={`${styles.availDot} ${doc.available ? styles.green : styles.grey}`} />
        </div>

        <div className={styles.cardInfo}>
          <h3 className={styles.docName}>{doc.name}</h3>
          <p className={styles.docSpec} style={{ color: `hsl(${doc.hue},55%,42%)` }}>{doc.specialty}</p>
          <p className={styles.docQual}>{doc.qualification}</p>
          <div className={styles.metaRow}>
            <StarRating rating={doc.rating} />
            <span className={styles.reviewCount}>({doc.reviews})</span>
          </div>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>👤</span>
          <span>{doc.patients}</span>
          <span className={styles.statLabel}>patients</span>
        </div>
        <div className={styles.statDiv} />
        <div className={styles.stat}>
          <span className={styles.statIcon}>🏥</span>
          <span>{doc.experience} yrs</span>
          <span className={styles.statLabel}>experience</span>
        </div>
        <div className={styles.statDiv} />
        <div className={styles.stat}>
          <span className={styles.statIcon}>📍</span>
          <span className={styles.statSmall}>{doc.location.split(",")[0]}</span>
          <span className={styles.statLabel}>location</span>
        </div>
      </div>

      <div className={styles.availRow}>
        <span className={`${styles.availBadge} ${doc.available ? styles.availGreen : styles.availGrey}`}>
          {doc.available ? "● Available today" : "○ " + doc.nextSlot}
        </span>
        {doc.available && <span className={styles.slotPreview}>Next: {doc.nextSlot}</span>}
      </div>

      <div className={styles.cardFooter}>
        <div>
          <p className={styles.priceLabel}>Consultation fee</p>
          <p className={styles.price}>₹{doc.price}</p>
        </div>
        <Link href="/book-appointment" className={styles.bookBtn}>
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default function DoctorList() {
  const [search,     setSearch]     = useState("");
  const [activeSpec, setActiveSpec] = useState("All");
  const [favourites, setFavourites] = useState([]);
  const [sortBy,     setSortBy]     = useState("rating");

  const toggleFav = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const filtered = DOCTORS
    .filter((d) => {
      const matchSpec   = activeSpec === "All" || d.specialty === activeSpec;
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase());
      return matchSpec && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating")     return b.rating - a.rating;
      if (sortBy === "price_asc")  return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "experience") return b.experience - a.experience;
      return 0;
    });

  return (
    <div className={styles.pageInner}>

      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerAvatar}>P</div>
          <div>
            <p className={styles.greetingLine}>Good morning 👋</p>
            <h2 className={styles.greetingName}>Hello, Priya!</h2>
          </div>
        </div>
        <button className={styles.notifBtn} aria-label="Notifications">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className={styles.notifDot} />
        </button>
      </header>

      <div className={styles.statsStrip}>
        {[
          { num: "2,400+", label: "Doctors" },
          { num: "50+",    label: "Specialties" },
          { num: "98%",    label: "Satisfaction" },
          { num: "24/7",   label: "Support" },
        ].map(({ num, label }) => (
          <div key={label} className={styles.stripItem}>
            <span className={styles.stripNum}>{num}</span>
            <span className={styles.stripLabel}>{label}</span>
          </div>
        ))}
      </div>

      <div className={styles.searchWrap}>
        <svg className={styles.searchIcon} width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search doctors, specialties, locations…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => setSearch("")} aria-label="Clear">✕</button>
        )}
      </div>

      <div className={styles.chips}>
        {SPECIALTIES.map((s) => (
          <button
            key={s}
            className={`${styles.chip} ${activeSpec === s ? styles.chipActive : ""}`}
            onClick={() => setActiveSpec(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className={styles.toolbar}>
        <p className={styles.count}>
          <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? "s" : ""} found
        </p>
        <select
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rating">Sort: Rating</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No doctors found. Try a different search or filter.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((doc, i) => (
            <div key={doc.id} style={{ animationDelay: `${i * 0.07}s` }} className={styles.gridItem}>
              <DoctorCard
                doc={doc}
                isFav={favourites.includes(doc.id)}
                onToggleFav={toggleFav}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
