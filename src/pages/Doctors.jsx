import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Doctors.css";

function Doctors() {
  const [searchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  const doctors = [
    {
      name: "Dr. Aarav Sharma",
      specialization: "General Physician",
      experience: "10+ Years Experience",
      fee: "Consultation Fee: ₹500",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Priya Mehta",
      specialization: "Cardiologist",
      experience: "12+ Years Experience",
      fee: "Consultation Fee: ₹800",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Rohan Gupta",
      specialization: "Dermatologist",
      experience: "8+ Years Experience",
      fee: "Consultation Fee: ₹600",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Neha Verma",
      specialization: "Gynecologist",
      experience: "11+ Years Experience",
      fee: "Consultation Fee: ₹700",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Vikram Singh",
      specialization: "Orthopedic Specialist",
      experience: "15+ Years Experience",
      fee: "Consultation Fee: ₹750",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Ananya Kapoor",
      specialization: "Pediatrician",
      experience: "9+ Years Experience",
      fee: "Consultation Fee: ₹550",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dr. Rajesh Malhotra",
      specialization: "Neurologist",
      experience: "14+ Years Experience",
      fee: "Consultation Fee: ₹900",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialization.toLowerCase().includes(query)
    );
  });

  return (
    <div className="doctors-page">
      <div className="doctors-container">

        {/* HEADER */}

        <div className="doctors-header">
          <span>OUR SPECIALISTS</span>

          <h1>Find the Right Doctor for You</h1>

          <p>
            Search by doctor name or specialization and book
            your appointment with ease.
          </p>
        </div>


        {/* SEARCH */}

        <div className="doctor-search-wrapper">

          <div className="doctor-search-box">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search doctor or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

        </div>


        {/* SEARCH RESULT */}

        <div className="search-result-info">
          {search ? (
            <p>
              {filteredDoctors.length} doctor
              {filteredDoctors.length !== 1 ? "s" : ""} found for{" "}
              <strong>"{search}"</strong>
            </p>
          ) : (
            <p>
              Showing all {doctors.length} specialists
            </p>
          )}
        </div>


        {/* DOCTORS */}

        {filteredDoctors.length > 0 ? (

          <div className="doctors-grid">

            {filteredDoctors.map((doctor) => (

              <div
                className="doctor-card"
                key={doctor.name}
              >

                {/* IMAGE */}

                <div className="doctor-image-wrapper">

                  <img
                    className="doctor-image"
                    src={doctor.image}
                    alt={doctor.name}
                  />

                  <span className="available-badge">
                    Available
                  </span>

                </div>


                {/* INFO */}

                <div className="doctor-info">

                  <h2>
                    {doctor.name}
                  </h2>

                  <p className="doctor-specialization">
                    {doctor.specialization}
                  </p>

                  <div className="doctor-details">

                    <span>
                      ✓ {doctor.experience}
                    </span>

                    <span>
                      ✓ {doctor.fee}
                    </span>

                  </div>


                  <Link
                    to={`/appointment?doctor=${encodeURIComponent(
                      doctor.name
                    )}&specialization=${encodeURIComponent(
                      doctor.specialization
                    )}`}
                    className="book-doctor-button"
                  >
                    Book Appointment
                  </Link>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="no-doctors">

            <div className="no-doctors-icon">
              🔍
            </div>

            <h2>
              No doctors found
            </h2>

            <p>
              Try searching with another doctor name
              or specialization.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
            >
              Show All Doctors
            </button>

          </div>

        )}

      </div>
    </div>
  );
}

export default Doctors;