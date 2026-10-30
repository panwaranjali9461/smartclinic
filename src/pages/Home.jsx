import { Link } from "react-router-dom";
import { useClinic } from "../context/ClinicContext";
import {
  StethoscopeIcon,
  ActivityIcon,
  CalendarIcon,
  ClockIcon,
  ShieldIcon,
  UserIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TvIcon,
  PhoneIcon,
} from "../components/Icons";
import "./Home.css";

const FEATURED_DOCTORS = [
  {
    name: "Dr. Aarav Sharma",
    specialization: "General Physician",
    exp: "10+ Years Exp",
    fee: "₹500",
    rating: 4.9,
    room: "Room 101",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Priya Mehta",
    specialization: "Cardiologist",
    exp: "12+ Years Exp",
    fee: "₹800",
    rating: 4.95,
    room: "Room 203",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Rohan Gupta",
    specialization: "Dermatologist",
    exp: "8+ Years Exp",
    fee: "₹600",
    rating: 4.85,
    room: "Room 105",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    name: "Vikram Malhotra",
    review: "The digital token system saved me hours. I could track my appointment live on my phone and walked right in when my token was called. Truly smart healthcare!",
    rating: 5,
    tag: "Cardiology Patient",
  },
  {
    name: "Sunita Agarwal",
    review: "Booked the Full Body Checkup package. The report summary and doctor consultation were seamlessly arranged. Very impressed with the digital slips.",
    rating: 5,
    tag: "Health Checkup Patient",
  },
  {
    name: "Ananya Deshmukh",
    review: "Finding specialized doctors and getting guaranteed time slots without phone calls or queue confusion is fantastic. Highly recommend SmartClinic.",
    rating: 5,
    tag: "General OPD Patient",
  },
];

export default function Home() {
  const { activeQueue } = useClinic();

  return (
    <div className="home-page">
      {/* =========================
          LIVE OPD TICKER NOTIFICATION
      ========================= */}
      {activeQueue && (
        <div className="home-live-ticker">
          <div className="home-ticker-inner">
            <span className="ticker-badge">
              <span className="live-dot-ticker"></span> LIVE OPD QUEUE
            </span>
            <p>
              Now Serving in Waiting Lounge: <strong>Token #{activeQueue.token}</strong> (
              {activeQueue.patientName}) with <strong>{activeQueue.doctorName}</strong> in{" "}
              <strong>{activeQueue.room}</strong>.
            </p>
            <Link to="/queue" className="ticker-link">
              View TV Lounge Display →
            </Link>
          </div>
        </div>
      )}

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">
            SMART HEALTHCARE & OPD PLATFORM
          </span>

          <h1>
            Your Health,<br />
            Our Priority.
          </h1>

          <p>
            Book verified appointments with experienced doctors quickly and easily.
            Enjoy smart digital queue tracking, zero waiting lines, and transparent clinic care.
          </p>

          <div className="hero-buttons">
            <Link to="/appointment" className="primary-button">
              Book an Appointment
            </Link>

            <Link to="/doctors" className="secondary-button">
              Find a Doctor
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>15+</strong>
              <span>Senior Specialists</span>
            </div>

            <div>
              <strong>1,200+</strong>
              <span>Happy Patients</span>
            </div>

            <div>
              <strong>Live Queue</strong>
              <span>Digital OPD Tokens</span>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="hero-image-wrapper">
          <div className="hero-photo-wrapper">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
              alt="Smart clinic doctor consulting patient"
              className="hero-image"
            />

            <div className="floating-card">
              <div className="floating-icon">
                <CheckCircleIcon size={24} />
              </div>
              <div>
                <strong>Smart OPD Queuing</strong>
                <span>Instant token & digital pass</span>
              </div>
            </div>

            <div className="floating-card-second">
              <div className="floating-icon-second">
                <ShieldIcon size={22} />
              </div>
              <div>
                <strong>100% Verified Care</strong>
                <span>Certified medical doctors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SERVICES SECTION
      ========================= */}
      <section className="services-section">
        <div className="section-heading">
          <span>COMPREHENSIVE SERVICES</span>
          <h2>Healthcare services made simple</h2>
          <p>
            Access essential healthcare services and manage your appointments seamlessly from one place.
          </p>
        </div>

        <div className="services-grid">
          {/* GENERAL CONSULTATION */}
          <div className="service-card">
            <div className="service-icon-box">
              <StethoscopeIcon size={26} />
            </div>
            <h3>General Consultation</h3>
            <p>
              Consult experienced physicians for seasonal concerns, fever, infections, and regular health checkups.
            </p>
            <Link to="/doctors" className="service-link">
              Find a Doctor →
            </Link>
          </div>

          {/* FULL BODY CHECKUP */}
          <div className="service-card">
            <div className="service-icon-box">
              <ActivityIcon size={26} />
            </div>
            <h3>Full Body Checkup</h3>
            <p>
              Comprehensive preventive health screening with lipid, liver, kidney, blood sugar, and vital reports.
            </p>
            <Link to="/appointment?package=Full%20Body%20Checkup&price=1999" className="service-link">
              Book Package (₹1,999) →
            </Link>
          </div>

          {/* LAB TESTS */}
          <div className="service-card">
            <div className="service-icon-box">
              <CalendarIcon size={26} />
            </div>
            <h3>Essential Lab Tests</h3>
            <p>
              Keep track of key biological parameters through verified laboratory diagnostics and instant reports.
            </p>
            <Link to="/appointment?service=Lab%20Tests" className="service-link">
              Schedule Diagnostic Test →
            </Link>
          </div>

          {/* PREVENTIVE CARE */}
          <div className="service-card">
            <div className="service-icon-box">
              <ShieldIcon size={26} />
            </div>
            <h3>Preventive Wellness</h3>
            <p>
              Proactive lifestyle guidance, diet counseling, blood pressure monitoring, and diabetic health care.
            </p>
            <Link to="/appointment?service=Preventive%20Care" className="service-link">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          HEALTH CHECKUP PACKAGES
      ========================= */}
      <section className="health-package-section" id="health-package">
        <div className="section-heading health-package-heading">
          <span>HEALTH CHECKUP PACKAGES</span>
          <h2>Choose the right checkup for your family</h2>
          <p>
            Preventive health packages designed to diagnose underlying health issues early and accurately.
          </p>
        </div>

        <div className="package-grid">
          {/* BASIC */}
          <div className="package-card">
            <div className="package-top">
              <span className="package-tag">ESSENTIAL</span>
              <h3>Basic Health Screening</h3>
              <p>Essential clinical screening for routine wellness monitoring.</p>
            </div>

            <div className="package-price">
              <strong>₹999</strong>
              <span>/ package</span>
            </div>

            <div className="package-tests">
              <span>✓ Complete Blood Count (CBC)</span>
              <span>✓ Fasting Blood Sugar</span>
              <span>✓ Blood Pressure & BMI</span>
              <span>✓ Routine Urine Examination</span>
              <span>✓ Physician Review & Guidance</span>
            </div>

            <Link
              to="/appointment?package=Basic%20Health%20Checkup&price=999"
              className="package-button secondary-package-button"
            >
              Book Checkup
            </Link>
          </div>

          {/* FULL BODY */}
          <div className="package-card featured-package" id="full-body-checkup">
            <div className="popular-badge">MOST POPULAR</div>

            <div className="package-top">
              <span className="package-tag">COMPLETE</span>
              <h3>Full Body Checkup</h3>
              <p>Comprehensive 60+ parameters for complete preventive health monitoring.</p>
            </div>

            <div className="package-price">
              <strong>₹1,999</strong>
              <span>/ package</span>
            </div>

            <div className="package-tests">
              <span>✓ Complete Blood Count (CBC)</span>
              <span>✓ Blood Sugar & HbA1c (Diabetes)</span>
              <span>✓ Complete Lipid Profile (Heart)</span>
              <span>✓ Liver Function Tests (LFT)</span>
              <span>✓ Kidney Function Tests (KFT)</span>
              <span>✓ Thyroid Screening (TSH)</span>
            </div>

            <Link
              to="/appointment?package=Full%20Body%20Checkup&price=1999"
              className="package-button"
            >
              Book Full Body Checkup
            </Link>
          </div>

          {/* ADVANCED */}
          <div className="package-card">
            <div className="package-top">
              <span className="package-tag">ADVANCED</span>
              <h3>Comprehensive Executive</h3>
              <p>Detailed investigation including vital vitamins, cardiac markers & metabolic review.</p>
            </div>

            <div className="package-price">
              <strong>₹2,999</strong>
              <span>/ package</span>
            </div>

            <div className="package-tests">
              <span>✓ Complete Blood Count & ESR</span>
              <span>✓ Diabetes Profile (FBS + HbA1c)</span>
              <span>✓ Lipid, Liver & Renal Panel</span>
              <span>✓ Vitamin D & Vitamin B12 Screening</span>
              <span>✓ Cardiac Risk Assessment (ECG)</span>
              <span>✓ Senior Specialist Consultation</span>
            </div>

            <Link
              to="/appointment?package=Advanced%20Health%20Checkup&price=2999"
              className="package-button secondary-package-button"
            >
              Book Checkup
            </Link>
          </div>
        </div>

        <p className="package-disclaimer">
          All health packages include sterile sample collection, certified laboratory testing, and digital consultation review.
        </p>
      </section>

      {/* =========================
          FEATURED DOCTORS SPOTLIGHT
      ========================= */}
      <section className="featured-doctors-section">
        <div className="section-heading">
          <span>TOP SPECIALISTS</span>
          <h2>Meet our experienced doctors</h2>
          <p>Consult with board-certified physicians dedicated to compassionate, quality care.</p>
        </div>

        <div className="featured-doctors-grid">
          {FEATURED_DOCTORS.map((doc, idx) => (
            <div className="feat-doc-card" key={idx}>
              <div className="feat-doc-img-wrap">
                <img src={doc.img} alt={doc.name} className="feat-doc-img" />
                <span className="feat-doc-room">{doc.room}</span>
              </div>
              <div className="feat-doc-info">
                <h3>{doc.name}</h3>
                <p className="feat-doc-spec">{doc.specialization}</p>
                <div className="feat-doc-meta">
                  <span>{doc.exp}</span>
                  <div className="rating-pill">
                    <StarIcon size={12} /> {doc.rating}
                  </div>
                </div>
                <div className="feat-doc-bottom">
                  <span className="feat-fee">{doc.fee} / consult</span>
                  <Link
                    to={`/appointment?doctor=${encodeURIComponent(doc.name)}&specialization=${encodeURIComponent(
                      doc.specialization
                    )}`}
                    className="feat-book-btn"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-docs-row">
          <Link to="/doctors" className="btn-explore-all-docs">
            Explore All Specialists →
          </Link>
        </div>
      </section>

      {/* =========================
          WHY SMARTCLINIC
      ========================= */}
      <section className="why-section">
        <div className="section-heading">
          <span>WHY SMARTCLINIC?</span>
          <h2>Smart healthcare built for patients</h2>
          <p>We leverage technology to eliminate medical wait times and make visits effortless.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <CalendarIcon size={24} />
            </div>
            <h3>Guaranteed Time Slots</h3>
            <p>
              Choose your doctor and preferred slot in advance. Say goodbye to unpredictable clinic waiting rooms.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <TvIcon size={24} />
            </div>
            <h3>Live OPD Queue Tracking</h3>
            <p>
              Check the live token number being served directly on your phone or on the waiting lounge TV screen.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldIcon size={24} />
            </div>
            <h3>Digital Appointment Pass</h3>
            <p>
              Receive an instant digital pass with OPD token, doctor chamber details, and clinical instructions.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          PATIENT TESTIMONIALS
      ========================= */}
      <section className="testimonials-section">
        <div className="section-heading">
          <span>PATIENT EXPERIENCES</span>
          <h2>Trusted by thousands of families</h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <StarIcon size={14} key={i} />
                ))}
              </div>
              <p className="test-quote">“{t.review}”</p>
              <div className="test-author">
                <strong>{t.name}</strong>
                <span>{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          EMERGENCY CALLOUT BANNER
      ========================= */}
      <section className="emergency-banner-section">
        <div className="emergency-card">
          <div className="emergency-left">
            <span className="emergency-tag">24/7 HELPLINE</span>
            <h3>Need urgent medical assistance?</h3>
            <p>Our emergency triage desk and ambulance services are on standby round the clock.</p>
          </div>
          <div className="emergency-right">
            <a href="tel:+919876543210" className="btn-call-emergency">
              <PhoneIcon size={18} /> Call +91 98765 43210
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="final-cta">
        <div>
          <span>YOUR HEALTH MATTERS</span>
          <h2>Ready to consult a top specialist?</h2>
          <p>Book your appointment online today and experience hassle-free healthcare.</p>
          <Link to="/appointment" className="cta-button">
            Book an Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
}
