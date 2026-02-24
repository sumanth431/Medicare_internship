"use client";
// app/doctors/DoctorList.jsx
// Client Component — search, filter, favourites, booking

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const SPECIALTIES = ["All", "Cardiologist", "Psychologist", "Dermatologist", "Ophthalmologist", "Neurologist"];

// ── Specialty Background Sketches (inline SVG — no external import needed) ──
const SpecialtyBackgrounds = {
  Cardiologist: () => (
    <svg className={styles.bgSketch} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 142 C65 112 50 92 50 78 C50 67 58 58 70 58 C80 58 88 63 100 73 C112 63 120 58 130 58 C142 58 150 67 150 78 C150 92 135 112 100 142Z" fill="#FFE4E9" opacity="0.8" />
        <path d="M100 142 C65 112 50 92 50 78 C50 67 58 58 70 58 C80 58 88 63 100 73 C112 63 120 58 130 58 C142 58 150 67 150 78 C150 92 135 112 100 142Z" stroke="#888" strokeWidth="1.3" />
      </g>
    </svg>
  ),
  Psychologist: () => (
    <svg className={styles.bgSketch} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.25" stroke="#666">
        <path d="M20 100 Q50 70 80 100 T140 100 T200 100" strokeWidth="2.2" />
        <path d="M20 120 Q50 90 80 120 T140 120 T200 120" strokeWidth="2.2" />
        <path d="M30 140 Q60 110 90 140 T150 140 T190 140" strokeWidth="2.2" />
        <circle cx="40" cy="50" r="10" strokeWidth="1.8" />
        <circle cx="160" cy="60" r="8" strokeWidth="1.8" />
        <circle cx="100" cy="30" r="12" strokeWidth="1.8" />
      </g>
    </svg>
  ),
  Dermatologist: () => (
    <svg className={styles.bgSketch} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.25" stroke="#666">
        <circle cx="60" cy="60" r="25" strokeWidth="2.2" />
        <circle cx="60" cy="60" r="18" strokeWidth="1.8" />
        <circle cx="140" cy="80" r="30" strokeWidth="2.2" />
        <circle cx="140" cy="80" r="22" strokeWidth="1.8" />
        <ellipse cx="100" cy="140" rx="28" ry="22" strokeWidth="2" />
        <path d="M160 160 L180 150 L175 170Z" strokeWidth="1.8" />
        <path d="M30 140 Q40 130 50 140" strokeWidth="2" />
      </g>
    </svg>
  ),
  Ophthalmologist: () => (
    <svg className={styles.bgSketch} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.25" stroke="#666">
        <ellipse cx="60" cy="80" rx="20" ry="28" strokeWidth="2.2" />
        <circle cx="60" cy="85" r="12" strokeWidth="1.8" />
        <circle cx="60" cy="85" r="6" strokeWidth="1.5" />
        <ellipse cx="140" cy="90" rx="22" ry="30" strokeWidth="2.2" />
        <circle cx="140" cy="95" r="14" strokeWidth="1.8" />
        <circle cx="140" cy="95" r="7" strokeWidth="1.5" />
        <path d="M50 50 Q60 40 70 50" strokeWidth="2" />
        <path d="M130 60 Q140 50 150 60" strokeWidth="2" />
        <circle cx="100" cy="150" r="15" strokeWidth="1.8" />
      </g>
    </svg>
  ),
  Neurologist: () => (
    <svg className={styles.bgSketch} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.25" stroke="#666">
        <circle cx="100" cy="35" r="18" strokeWidth="2" />
        <line x1="100" y1="53" x2="100" y2="110" strokeWidth="2" />
        <line x1="100" y1="65" x2="65" y2="85" strokeWidth="2" />
        <line x1="100" y1="65" x2="135" y2="85" strokeWidth="2" />
        <line x1="100" y1="110" x2="75" y2="165" strokeWidth="2" />
        <line x1="100" y1="110" x2="125" y2="165" strokeWidth="2" />
        <path d="M88 30 Q75 35 70 50" strokeWidth="1.5" />
        <path d="M112 30 Q125 35 130 50" strokeWidth="1.5" />
        <path d="M95 60 L50 70" strokeWidth="1.5" />
        <path d="M95 75 L55 85" strokeWidth="1.5" />
        <path d="M105 60 L150 70" strokeWidth="1.5" />
        <path d="M105 75 L145 85" strokeWidth="1.5" />
        <path d="M95 120 L60 140" strokeWidth="1.5" />
        <path d="M95 135 L65 160" strokeWidth="1.5" />
        <path d="M105 120 L140 140" strokeWidth="1.5" />
        <path d="M105 135 L135 160" strokeWidth="1.5" />
      </g>
    </svg>
  ),
};

function getSpecialtyBackground(specialty) {
  return SpecialtyBackgrounds[specialty] || null;
}

const DOCTORS = [
  { id: 1, name: "Dr. Anika Mehta",    specialty: "Cardiologist",    qualification: "MBBS, MD (Cardiology)",       location: "Andheri, Mumbai",  experience: 12, rating: 4.9, reviews: 312, patients: "5,000+",  available: true,  nextSlot: "09:30 AM",         price: 800,  tag: "Top Rated",    imageUrl: "https://ui-avatars.com/api/?name=Anika+Mehta&background=0ea5e9&color=fff&size=128&bold=true",    hue: "210" },
  { id: 2, name: "Dr. Rajesh Iyer",    specialty: "Psychologist",    qualification: "MBBS, M.Phil (Psychiatry)",  location: "Bandra, Mumbai",   experience: 8,  rating: 4.7, reviews: 189, patients: "3,200+",  available: true,  nextSlot: "10:00 AM",         price: 600,  tag: "Popular",      imageUrl: "https://ui-avatars.com/api/?name=Rajesh+Iyer&background=7c3aed&color=fff&size=128&bold=true",    hue: "262" },
  { id: 3, name: "Dr. Priya Nair",     specialty: "Dermatologist",   qualification: "MBBS, MD (Dermatology)",     location: "Powai, Mumbai",    experience: 15, rating: 4.8, reviews: 421, patients: "8,100+",  available: false, nextSlot: "Tomorrow 9:00 AM", price: 750,  tag: null,           imageUrl: "https://ui-avatars.com/api/?name=Priya+Nair&background=db2777&color=fff&size=128&bold=true",     hue: "340" },
  { id: 4, name: "Dr. Suresh Kumar",   specialty: "Ophthalmologist", qualification: "MBBS, MS (Ophthalmology)",   location: "Dadar, Mumbai",    experience: 20, rating: 4.6, reviews: 560, patients: "12,000+", available: true,  nextSlot: "02:00 PM",         price: 900,  tag: "Senior Expert", imageUrl: "https://ui-avatars.com/api/?name=Suresh+Kumar&background=d97706&color=fff&size=128&bold=true",   hue: "38"  },
  { id: 5, name: "Dr. Meera Krishnan", specialty: "Neurologist",     qualification: "MBBS, DM (Neurology)",       location: "Juhu, Mumbai",     experience: 10, rating: 4.9, reviews: 234, patients: "4,700+",  available: true,  nextSlot: "08:30 AM",         price: 1100, tag: "Top Rated",    imageUrl: "https://ui-avatars.com/api/?name=Meera+Krishnan&background=059669&color=fff&size=128&bold=true",  hue: "160" },
  { id: 6, name: "Dr. Vikram Shah",    specialty: "Cardiologist",    qualification: "MBBS, MD, DM (Cardiology)",  location: "Thane, Mumbai",    experience: 18, rating: 4.7, reviews: 389, patients: "9,500+",  available: false, nextSlot: "Tomorrow 11 AM",   price: 950,  tag: null,           imageUrl: "https://ui-avatars.com/api/?name=Vikram+Shah&background=0891b2&color=fff&size=128&bold=true",    hue: "196" },
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
  const BgComponent = getSpecialtyBackground(doc.specialty);
  return (
    <div className={styles.card}>
      {BgComponent && (
        <div className={styles.bgSketchContainer}>
          <BgComponent />
        </div>
      )}
      {doc.tag && <div className={styles.cardTag}>{doc.tag}</div>}
      <button className={`${styles.favBtn} ${isFav ? styles.favActive : ""}`} onClick={() => onToggleFav(doc.id)} aria-label="Toggle favourite">
        {isFav ? "♥" : "♡"}
      </button>
      <div className={styles.cardTop}>
        <div className={styles.avatarWrap}>
          <img src={doc.imageUrl} alt={doc.name} className={styles.avatar} style={{ borderColor: `hsl(${doc.hue},70%,80%)` }} />
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
        <div className={styles.stat}><span className={styles.statIcon}>👤</span><span>{doc.patients}</span><span className={styles.statLabel}>patients</span></div>
        <div className={styles.statDiv} />
        <div className={styles.stat}><span className={styles.statIcon}>🏥</span><span>{doc.experience} yrs</span><span className={styles.statLabel}>experience</span></div>
        <div className={styles.statDiv} />
        <div className={styles.stat}><span className={styles.statIcon}>📍</span><span className={styles.statSmall}>{doc.location.split(",")[0]}</span><span className={styles.statLabel}>location</span></div>
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
        <Link href="/book-appointment" className={styles.bookBtn}>Book Appointment</Link>
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
    setFavourites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  const filtered = DOCTORS
    .filter((d) => {
      const matchSpec   = activeSpec === "All" || d.specialty === activeSpec;
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
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
      {/* Page-level background medical sketches */}
      <svg className={styles.bgMedicineSketch} viewBox="0 0 1000 800">
        <g opacity="0.08" stroke="#888" strokeWidth="1.5">
          <rect x="50" y="100" width="80" height="30" rx="15" fill="none" />
          <line x1="130" y1="115" x2="160" y2="105" strokeWidth="1.5" />
          <circle cx="155" cy="100" r="5" fill="none" />
          <rect x="45" y="130" width="10" height="40" fill="none" />
        </g>
        <g opacity="0.08" stroke="#888" strokeWidth="1.5">
          <rect x="850" y="80" width="80" height="120" rx="8" fill="none" />
          <rect x="870" y="60" width="40" height="25" rx="3" fill="none" />
          <circle cx="890" cy="120" r="25" fill="none" opacity="0.4" />
        </g>
        <g opacity="0.08" stroke="#888" strokeWidth="1.5">
          <ellipse cx="80" cy="400" rx="20" ry="12" fill="none" />
          <ellipse cx="120" cy="390" rx="22" ry="13" fill="none" transform="rotate(-20 120 390)" />
          <ellipse cx="150" cy="385" rx="18" ry="11" fill="none" transform="rotate(15 150 385)" />
        </g>
        <g opacity="0.08" stroke="#888" strokeWidth="1.5">
          <path d="M 100 700 Q 80 680 60 700" fill="none" />
          <circle cx="50" cy="710" r="8" fill="none" />
          <circle cx="150" cy="710" r="8" fill="none" />
          <path d="M 60 710 Q 105 750 150 710" fill="none" />
        </g>
        <g opacity="0.08" stroke="#888" strokeWidth="1.5">
          <rect x="820" y="680" width="60" height="80" fill="none" rx="3" />
          <circle cx="828" cy="695" r="4" fill="none" opacity="0.5" />
          <circle cx="843" cy="695" r="4" fill="none" opacity="0.5" />
          <circle cx="828" cy="720" r="4" fill="none" opacity="0.5" />
          <circle cx="843" cy="720" r="4" fill="none" opacity="0.5" />
        </g>
      </svg>

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
        {[{ num: "2,400+", label: "Doctors" },{ num: "50+", label: "Specialties" },{ num: "98%", label: "Satisfaction" },{ num: "24/7", label: "Support" }].map(({ num, label }) => (
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
        <input type="text" className={styles.searchInput} placeholder="Search doctors, specialties, locations…"
          value={search} onChange={(e) => setSearch(e.target.value)} />
        {search && <button className={styles.clearBtn} onClick={() => setSearch("")}>✕</button>}
      </div>

      <div className={styles.chips}>
        {SPECIALTIES.map((s) => (
          <button key={s} className={`${styles.chip} ${activeSpec === s ? styles.chipActive : ""}`} onClick={() => setActiveSpec(s)}>{s}</button>
        ))}
      </div>

      <div className={styles.toolbar}>
        <p className={styles.count}><strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? "s" : ""} found</p>
        <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="rating">Sort: Rating</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}><p>No doctors found. Try a different search or filter.</p></div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((doc, i) => (
            <div key={doc.id} style={{ animationDelay: `${i * 0.07}s` }} className={styles.gridItem}>
              <DoctorCard doc={doc} isFav={favourites.includes(doc.id)} onToggleFav={toggleFav} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
