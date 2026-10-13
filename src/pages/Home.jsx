import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-label">
            SMART & SIMPLE HEALTHCARE
          </span>

          <h1>
            Your Health,
            <br />
            Our Priority.
          </h1>

          <p>
            Book appointments with trusted doctors
            quickly and easily. No long queues,
            no unnecessary waiting.
          </p>

          <div className="hero-buttons">

            <Link
              to="/appointment"
              className="primary-button"
            >
              Book an Appointment
            </Link>

            <Link
              to="/doctors"
              className="secondary-button"
            >
              Find a Doctor
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <strong>10+</strong>
              <span>Experienced Doctors</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>Appointments</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Easy Access</span>
            </div>

          </div>

        </div>


        {/* HERO IMAGE */}

        <div className="hero-image-wrapper">

          <div className="hero-photo-wrapper">

            <img
              src="https://primediagnosticandpolyclinic.com/opd.png"
              alt="Doctor consulting with a patient"
              className="hero-image"
            />

            <div className="floating-card">

              <div className="floating-icon">
                ✓
              </div>

              <div>
                <strong>
                  Easy Appointment
                </strong>

                <span>
                  Book in just a few clicks
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          HEALTH SERVICES
      ========================= */}

      <section className="services-section">

        <div className="section-heading">

          <span>
            OUR SERVICES
          </span>

          <h2>
            Healthcare services made simple
          </h2>

          <p>
            Access essential healthcare services and
            manage your health from one place.
          </p>

        </div>


        <div className="services-grid">

          {/* GENERAL CONSULTATION */}

          <div className="service-card">

            <div className="service-icon">
              🩺
            </div>

            <h3>
              General Consultation
            </h3>

            <p>
              Consult experienced doctors for common
              health concerns and regular checkups.
            </p>

            <Link to="/doctors">
              Find a Doctor →
            </Link>

          </div>


          {/* FULL BODY CHECKUP */}

          <div className="service-card">

            <div className="service-icon">
              ♥
            </div>

            <h3>
              Full Body Checkup
            </h3>

            <p>
              Comprehensive preventive health screening
              to help you keep track of your wellbeing.
            </p>

            <a href="#full-body-checkup">
              View Package →
            </a>

          </div>


          {/* LAB TESTS */}

          <div className="service-card">

            <div className="service-icon">
              +
            </div>

            <h3>
              Lab Tests
            </h3>

            <p>
              Keep track of important health parameters
              through essential laboratory tests.
            </p>

            <Link
              to="/appointment?service=Lab%20Tests"
            >
              Explore Tests →
            </Link>

          </div>


          {/* PREVENTIVE CARE */}

          <div className="service-card">

            <div className="service-icon">
              ✓
            </div>

            <h3>
              Preventive Care
            </h3>

            <p>
              Focus on regular health monitoring and
              preventive care for a healthier lifestyle.
            </p>

            <Link
              to="/appointment?service=Preventive%20Care"
            >
              Learn More →
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          HEALTH CHECKUP PACKAGES
      ========================= */}

      <section
        className="health-package-section"
        id="health-package"
      >

        <div className="section-heading health-package-heading">

          <span>
            HEALTH CHECKUP PACKAGES
          </span>

          <h2>
            Choose the right health checkup for you
          </h2>

          <p>
            Preventive health packages designed to help
            you keep track of important health parameters.
          </p>

        </div>


        <div className="package-grid">

          {/* BASIC */}

          <div className="package-card">

            <div className="package-top">

              <span className="package-tag">
                ESSENTIAL
              </span>

              <h3>
                Basic Health Checkup
              </h3>

              <p>
                Essential screening for routine
                health monitoring.
              </p>

            </div>


            <div className="package-price">

              <strong>
                ₹999
              </strong>

              <span>
                / package
              </span>

            </div>


            <div className="package-tests">

              <span>✓ Complete Blood Count</span>
              <span>✓ Blood Sugar</span>
              <span>✓ Blood Pressure</span>
              <span>✓ Basic Urine Test</span>
              <span>✓ General Health Screening</span>

            </div>


            <Link
              to="/appointment?package=Basic%20Health%20Checkup&price=999"
              className="package-button secondary-package-button"
            >
              Book Checkup
            </Link>

          </div>


          {/* FULL BODY */}

          <div
            className="package-card featured-package"
            id="full-body-checkup"
          >

            <div className="popular-badge">
              MOST POPULAR
            </div>


            <div className="package-top">

              <span className="package-tag">
                COMPLETE
              </span>

              <h3>
                Full Body Checkup
              </h3>

              <p>
                Comprehensive screening for
                complete preventive monitoring.
              </p>

            </div>


            <div className="package-price">

              <strong>
                ₹1,999
              </strong>

              <span>
                / package
              </span>

            </div>


            <div className="package-tests">

              <span>✓ Complete Blood Count</span>
              <span>✓ Blood Sugar & HbA1c</span>
              <span>✓ Lipid Profile</span>
              <span>✓ Liver Function Test</span>
              <span>✓ Kidney Function Test</span>
              <span>✓ Thyroid Screening</span>

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

              <span className="package-tag">
                ADVANCED
              </span>

              <h3>
                Advanced Health Checkup
              </h3>

              <p>
                Extended preventive screening for
                detailed health monitoring.
              </p>

            </div>


            <div className="package-price">

              <strong>
                ₹2,999
              </strong>

              <span>
                / package
              </span>

            </div>


            <div className="package-tests">

              <span>✓ Complete Blood Count</span>
              <span>✓ Diabetes Screening</span>
              <span>✓ Complete Lipid Profile</span>
              <span>✓ Liver & Kidney Tests</span>
              <span>✓ Thyroid Profile</span>
              <span>✓ Vitamin Screening</span>

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
          Package details shown are for the SmartClinic demo project.
          Actual tests and pricing may vary by clinic and healthcare provider.
        </p>

      </section>


      {/* =========================
          WHY SMARTCLINIC
      ========================= */}

      <section className="why-section">

        <div className="section-heading">

          <span>
            WHY SMARTCLINIC?
          </span>

          <h2>
            Everything you need in one place
          </h2>

          <p>
            We make the appointment process easier,
            faster and more convenient.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              01
            </div>

            <h3>
              Easy Booking
            </h3>

            <p>
              Choose your doctor, date and time without
              waiting in long queues.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              02
            </div>

            <h3>
              Trusted Doctors
            </h3>

            <p>
              Find experienced doctors across different
              medical specialities.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              03
            </div>

            <h3>
              Track Appointment
            </h3>

            <p>
              Easily check whether your appointment is
              pending, approved or rejected.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="how-section">

        <div className="section-heading">

          <span>
            HOW IT WORKS
          </span>

          <h2>
            Book your appointment in 3 simple steps
          </h2>

        </div>


        <div className="steps-grid">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <h3>
              Find a Doctor
            </h3>

            <p>
              Explore doctors and choose the specialist
              that matches your needs.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <h3>
              Choose Date & Time
            </h3>

            <p>
              Select a convenient appointment date
              and available time.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <h3>
              Get Confirmation
            </h3>

            <p>
              Submit your appointment and track its
              status from your appointments page.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="final-cta">

        <div>

          <span>
            YOUR HEALTH MATTERS
          </span>

          <h2>
            Ready to take the next step?
          </h2>

          <p>
            Find a doctor and book your appointment today.
          </p>

          <Link
            to="/appointment"
            className="cta-button"
          >
            Book an Appointment
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;