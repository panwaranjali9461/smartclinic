import "./Appointment.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Appointment() {
  const [searchParams] = useSearchParams();

  const selectedPackage = searchParams.get("package");
  const selectedPrice = searchParams.get("price");

  const selectedDoctor = searchParams.get("doctor");
  const selectedSpecialization = searchParams.get("specialization");

  const isHealthCheckup = Boolean(selectedPackage);

  const doctors = [
    {
      name: "Dr. Aarav Sharma",
      specialization: "General Physician",
    },
    {
      name: "Dr. Priya Mehta",
      specialization: "Cardiologist",
    },
    {
      name: "Dr. Rohan Gupta",
      specialization: "Dermatologist",
    },
    {
      name: "Dr. Neha Verma",
      specialization: "Gynecologist",
    },
    {
      name: "Dr. Vikram Singh",
      specialization: "Orthopedic Specialist",
    },
    {
      name: "Dr. Ananya Kapoor",
      specialization: "Pediatrician",
    },
    {
      name: "Dr. Rajesh Malhotra",
      specialization: "Neurologist",
    },
  ];

  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [doctor, setDoctor] = useState(
    selectedDoctor
      ? `${selectedDoctor} - ${selectedSpecialization}`
      : ""
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      patientName,
      email,
      phone,
      doctor,
      date,
      time,

      type: isHealthCheckup
        ? "health-checkup"
        : "doctor-consultation",

      service: isHealthCheckup
        ? selectedPackage
        : "Doctor Consultation",

      packagePrice: isHealthCheckup
        ? `₹${Number(selectedPrice).toLocaleString("en-IN")}`
        : "",

      status: "Pending",
    };

    const existingAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    const isSlotBooked = existingAppointments.some(
      (existingAppointment) =>
        existingAppointment.doctor === doctor &&
        existingAppointment.date === date &&
        existingAppointment.time === time &&
        existingAppointment.status !== "Rejected"
    );

    if (isSlotBooked) {
      alert(
        "This appointment slot is already booked. Please choose another date or time."
      );
      return;
    }

    existingAppointments.push(appointment);

    localStorage.setItem(
      "appointments",
      JSON.stringify(existingAppointments)
    );

    setBookingSuccess(true);

    setPatientName("");
    setEmail("");
    setPhone("");

    // Doctor ko reset nahi karenge
    // taaki selected doctor visible rahe

    setDate("");
    setTime("");
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container">

        <h1>
          {isHealthCheckup
            ? "Book Health Checkup"
            : "Book an Appointment"}
        </h1>

        <p>
          {isHealthCheckup
            ? "Complete your details to book your selected health checkup package."
            : "Fill in your details to book an appointment."}
        </p>

        {/* Selected Package */}

        {isHealthCheckup && (
          <div className="selected-package-box">
            <div className="selected-package-content">
              <span className="selected-package-label">
                SELECTED HEALTH PACKAGE
              </span>

              <h2>{selectedPackage}</h2>

              <p>
                Comprehensive preventive healthcare package
                selected from SmartClinic.
              </p>
            </div>

            <div className="selected-package-price">
              <strong>
                ₹{Number(selectedPrice).toLocaleString("en-IN")}
              </strong>

              <span>/ package</span>
            </div>
          </div>
        )}

        {/* Success Message */}

        {bookingSuccess && (
          <div className="booking-success">
            <h3>
              {isHealthCheckup
                ? "Health Checkup Booked Successfully!"
                : "Appointment Booked Successfully!"}
            </h3>

            <p>
              Your booking request has been sent to the clinic.
            </p>

            <p>
              You can check the status from{" "}
              <strong>My Appointments</strong>.
            </p>
          </div>
        )}

        {/* Appointment Form */}

        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Patient Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={patientName}
              onChange={(e) =>
                setPatientName(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              pattern="[0-9]{10}"
              maxLength="10"
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />
          </div>

          {/* Doctor */}

          <div className="form-group">
            <label>
              {isHealthCheckup
                ? "Select Doctor for Checkup"
                : "Select Doctor"}
            </label>

            <select
              value={doctor}
              onChange={(e) =>
                setDoctor(e.target.value)
              }
              required
            >
              <option value="">
                Choose a doctor
              </option>

              {doctors.map((item) => {
                const doctorValue = `${item.name} - ${item.specialization}`;

                return (
                  <option
                    value={doctorValue}
                    key={doctorValue}
                  >
                    {doctorValue}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Appointment Date</label>

            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) =>
                setDate(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Appointment Time</label>

            <input
              type="time"
              value={time}
              min={
                date === today
                  ? currentTime
                  : "09:00"
              }
              max="18:00"
              onChange={(e) =>
                setTime(e.target.value)
              }
              required
            />
          </div>

          <button type="submit">
            {isHealthCheckup
              ? "Book Health Checkup"
              : "Book Appointment"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Appointment;