import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SearchIcon,
  CloseIcon,
  StarIcon,
  StethoscopeIcon,
  ClockIcon,
  CalendarIcon,
  FilterIcon,
  UserIcon,
} from "../components/Icons";
import "./Doctors.css";

const DOCTORS_DATA = [
  {
    id: "doc-1",
    name: "Dr. Aarav Sharma",
    specialization: "General Physician",
    department: "Internal Medicine",
    experience: "10+ Years",
    expYears: 10,
    qualification: "MBBS, MD - General Medicine (AIIMS)",
    fee: 500,
    rating: 4.9,
    reviewsCount: 184,
    room: "Room 101 (Ground Floor)",
    schedule: "Mon - Sat (09:00 AM - 02:00 PM)",
    languages: "English, Hindi",
    bio: "Specialist in preventative healthcare, lifestyle diseases, seasonal illnesses, and chronic health management with over a decade of clinical experience at premier hospitals.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "doc-2",
    name: "Dr. Priya Mehta",
    specialization: "Cardiologist",
    department: "Cardiology",
    experience: "12+ Years",
    expYears: 12,
    qualification: "MBBS, MD, DM - Cardiology",
    fee: 800,
    rating: 4.95,
    reviewsCount: 230,
    room: "Room 203 (2nd Floor)",
    schedule: "Mon - Fri (10:00 AM - 04:00 PM)",
    languages: "English, Hindi, Gujarati",
    bio: "Renowned cardiologist focusing on hypertension, preventive heart care, ECG interpretation, lipid management, and non-invasive cardiovascular health.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "doc-3",
    name: "Dr. Rohan Gupta",
    specialization: "Dermatologist",
    department: "Dermatology & Cosmetology",
    experience: "8+ Years",
    expYears: 8,
    qualification: "MBBS, MD - Dermatology & Venereology",
    fee: 600,
    rating: 4.85,
    reviewsCount: 142,
    room: "Room 105 (Ground Floor)",
    schedule: "Tue - Sun (11:00 AM - 05:00 PM)",
    languages: "English, Hindi",
    bio: "Expert in clinical dermatology, acne therapeutics, allergic reactions, hair fall solutions, and procedural skincare treatments.",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "doc-4",
    name: "Dr. Neha Verma",
    specialization: "Gynecologist",
    department: "Obstetrics & Gynecology",
    experience: "11+ Years",
    expYears: 11,
    qualification: "MBBS, MS - Obstetrics & Gynaecology",
    fee: 700,
    rating: 4.92,
    reviewsCount: 195,
    room: "Room 205 (2nd Floor)",
    schedule: "Mon - Sat (09:30 AM - 03:30 PM)",
    languages: "English, Hindi, Punjabi",
    bio: "Dedicated women's health specialist with extensive expertise in maternity health, adolescent care, hormonal disorders (PCOS/PCOD), and preventive wellness.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "doc-5",
    name: "Dr. Vikram Singh",
    specialization: "Orthopedic Specialist",
    department: "Orthopedics & Joint Care",
    experience: "15+ Years",
    expYears: 15,
    qualification: "MBBS, MS - Orthopaedics (Gold Medalist)",
    fee: 750,
    rating: 4.88,
    reviewsCount: 210,
    room: "Room 108 (Ground Floor)",
    schedule: "Mon, Wed, Fri (10:00 AM - 04:00 PM)",
    languages: "English, Hindi",
    bio: "Senior consultant treating joint arthritis, sports injuries, spine health, back pains, and post-traumatic rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "doc-6",
    name: "Dr. Ananya Kapoor",
    specialization: "Pediatrician",
    department: "Pediatrics & Child Care",
    experience: "9+ Years",
    expYears: 9,
    qualification: "MBBS, MD - Pediatrics",
    fee: 550,
    rating: 4.96,
    reviewsCount: 167,
    room: "Room 104 (Ground Floor)",
    schedule: "Mon - Sat (09:00 AM - 01:30 PM)",
    languages: "English, Hindi",
    bio: "Compassionate child healthcare provider managing newborn care, immunizations, childhood infections, growth monitoring, and pediatric nutrition.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "doc-7",
    name: "Dr. Rajesh Malhotra",
    specialization: "Neurologist",
    department: "Neurology",
    experience: "14+ Years",
    expYears: 14,
    qualification: "MBBS, MD, DM - Neurology",
    fee: 900,
    rating: 4.91,
    reviewsCount: 178,
    room: "Room 201 (2nd Floor)",
    schedule: "Tue, Thu, Sat (10:00 AM - 03:00 PM)",
    languages: "English, Hindi",
    bio: "Specialist in treating migraines, neuropathy, vertigo, nerve disorders, epilepsy, and cognitive neurological health.",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
  },
];

const SPECIALTIES = [
  "All",
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Gynecologist",
  "Orthopedic Specialist",
  "Pediatrician",
  "Neurologist",
];

export default function Doctors() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeModalDoctor, setActiveModalDoctor] = useState(null);

  const filteredDoctors = useMemo(() => {
    let result = DOCTORS_DATA.filter((doctor) => {
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.department.toLowerCase().includes(query) ||
        doctor.qualification.toLowerCase().includes(query);

      const matchesSpecialty =
        selectedSpecialty === "All" ||
        doctor.specialization.toLowerCase() === selectedSpecialty.toLowerCase();

      return matchesSearch && matchesSpecialty;
    });

    if (sortBy === "fee-low") {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === "experience") {
      result.sort((a, b) => b.expYears - a.expYears);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, selectedSpecialty, sortBy]);

  return (
    <div className="doctors-page">
      <div className="doctors-container">
        {/* HEADER */}
        <div className="doctors-header">
          <span className="doctors-pill-badge">OUR MEDICAL TEAM</span>
          <h1>Find the Right Doctor for You</h1>
          <p>
            Consult highly experienced specialists across key medical disciplines.
            Book in-person clinic visits or online consultations in a few seconds.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="doctors-toolbar">
          <div className="doctor-search-box">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or condition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <CloseIcon size={16} />
              </button>
            )}
          </div>

          <div className="doctor-sort-box">
            <span className="sort-label">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Top Rated (★)</option>
              <option value="experience">Most Experienced</option>
              <option value="fee-low">Consultation Fee (Low to High)</option>
            </select>
          </div>
        </div>

        {/* SPECIALTY FILTER PILLS */}
        <div className="specialty-pills-scroll">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              className={`specialty-pill ${selectedSpecialty === spec ? "active" : ""}`}
              onClick={() => setSelectedSpecialty(spec)}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* SEARCH RESULT META */}
        <div className="search-result-info">
          <span>
            Showing <strong>{filteredDoctors.length}</strong> verified specialist
            {filteredDoctors.length !== 1 ? "s" : ""}
          </span>
          {(search || selectedSpecialty !== "All") && (
            <button
              className="reset-filters-link"
              onClick={() => {
                setSearch("");
                setSelectedSpecialty("All");
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* DOCTORS GRID */}
        {filteredDoctors.length > 0 ? (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <div className="doctor-card-enhanced" key={doctor.id}>
                {/* DOCTOR IMAGE WRAPPER */}
                <div className="doctor-image-wrapper">
                  <img
                    className="doctor-image"
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                  />
                  <div className="doctor-card-overlay-tags">
                    <span className="available-badge">
                      <span className="badge-dot"></span> Available Today
                    </span>
                    <span className="room-indicator">{doctor.room.split(" ")[0] + " " + doctor.room.split(" ")[1]}</span>
                  </div>
                </div>

                {/* DOCTOR INFO */}
                <div className="doctor-info-content">
                  <div className="doctor-top-row">
                    <div>
                      <h2 className="doctor-name">{doctor.name}</h2>
                      <p className="doctor-spec">{doctor.specialization}</p>
                    </div>
                    <div className="doctor-rating-badge">
                      <StarIcon size={14} />
                      <strong>{doctor.rating}</strong>
                      <span>({doctor.reviewsCount})</span>
                    </div>
                  </div>

                  <p className="doctor-qual">{doctor.qualification}</p>

                  <div className="doctor-meta-chips">
                    <span className="chip">
                      <ClockIcon size={14} /> {doctor.experience} Exp
                    </span>
                    <span className="chip">
                      <CalendarIcon size={14} /> Mon-Sat
                    </span>
                  </div>

                  <div className="doctor-fee-row">
                    <div>
                      <span className="fee-label">Consultation Fee</span>
                      <strong className="fee-amount">₹{doctor.fee}</strong>
                    </div>
                    <button
                      className="view-profile-btn"
                      onClick={() => setActiveModalDoctor(doctor)}
                    >
                      View Profile
                    </button>
                  </div>

                  <Link
                    to={`/appointment?doctor=${encodeURIComponent(
                      doctor.name
                    )}&specialization=${encodeURIComponent(
                      doctor.specialization
                    )}&fee=${doctor.fee}`}
                    className="book-doctor-cta"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-doctors-found">
            <div className="no-doctors-icon">
              <SearchIcon size={36} />
            </div>
            <h2>No doctors found matching criteria</h2>
            <p>Try searching for a different name, condition, or clear the active specialty filter.</p>
            <button
              type="button"
              className="btn-show-all"
              onClick={() => {
                setSearch("");
                setSelectedSpecialty("All");
              }}
            >
              Show All Doctors
            </button>
          </div>
        )}
      </div>

      {/* DOCTOR QUICK VIEW MODAL */}
      {activeModalDoctor && (
        <div
          className="smart-modal-overlay"
          onClick={() => setActiveModalDoctor(null)}
        >
          <div
            className="smart-modal doctor-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="smart-modal-header">
              <h3>Doctor Profile</h3>
              <button
                className="smart-modal-close"
                onClick={() => setActiveModalDoctor(null)}
                aria-label="Close modal"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="smart-modal-body">
              <div className="modal-doc-hero">
                <img
                  src={activeModalDoctor.image}
                  alt={activeModalDoctor.name}
                  className="modal-doc-img"
                />
                <div className="modal-doc-intro">
                  <h2>{activeModalDoctor.name}</h2>
                  <p className="modal-spec">{activeModalDoctor.specialization}</p>
                  <p className="modal-qual">{activeModalDoctor.qualification}</p>
                  <div className="modal-rating">
                    <StarIcon size={16} />
                    <strong>{activeModalDoctor.rating}</strong> / 5.0 Rating from {activeModalDoctor.reviewsCount} patients
                  </div>
                </div>
              </div>

              <div className="modal-doc-bio">
                <h4>About Doctor</h4>
                <p>{activeModalDoctor.bio}</p>
              </div>

              <div className="modal-details-grid">
                <div className="modal-detail-card">
                  <span className="lbl">Clinical Experience</span>
                  <strong>{activeModalDoctor.experience}</strong>
                </div>
                <div className="modal-detail-card">
                  <span className="lbl">Consultation Fee</span>
                  <strong className="fee-color">₹{activeModalDoctor.fee}</strong>
                </div>
                <div className="modal-detail-card">
                  <span className="lbl">OPD Chamber</span>
                  <strong>{activeModalDoctor.room}</strong>
                </div>
                <div className="modal-detail-card">
                  <span className="lbl">Languages Spoken</span>
                  <strong>{activeModalDoctor.languages}</strong>
                </div>
              </div>

              <div className="modal-schedule-box">
                <ClockIcon size={16} />
                <div>
                  <strong>OPD Consultation Hours:</strong>
                  <span>{activeModalDoctor.schedule}</span>
                </div>
              </div>

              <div className="modal-cta-row">
                <Link
                  to={`/appointment?doctor=${encodeURIComponent(
                    activeModalDoctor.name
                  )}&specialization=${encodeURIComponent(
                    activeModalDoctor.specialization
                  )}&fee=${activeModalDoctor.fee}`}
                  className="modal-book-btn"
                  onClick={() => setActiveModalDoctor(null)}
                >
                  Proceed to Book Appointment →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
