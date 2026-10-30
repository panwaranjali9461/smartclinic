import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useClinic } from "../context/ClinicContext";
import AppointmentSlipModal from "../components/AppointmentSlipModal";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  StethoscopeIcon,
  CheckCircleIcon,
  ShieldIcon,
  VideoIcon,
} from "../components/Icons";
import "./Appointment.css";

const DOCTORS = [
  { name: "Dr. Aarav Sharma", specialization: "General Physician", fee: 500, room: "Room 101" },
  { name: "Dr. Priya Mehta", specialization: "Cardiologist", fee: 800, room: "Room 203" },
  { name: "Dr. Rohan Gupta", specialization: "Dermatologist", fee: 600, room: "Room 105" },
  { name: "Dr. Neha Verma", specialization: "Gynecologist", fee: 700, room: "Room 205" },
  { name: "Dr. Vikram Singh", specialization: "Orthopedic Specialist", fee: 750, room: "Room 108" },
  { name: "Dr. Ananya Kapoor", specialization: "Pediatrician", fee: 550, room: "Room 104" },
  { name: "Dr. Rajesh Malhotra", specialization: "Neurologist", fee: 900, room: "Room 201" },
];

const TIME_SLOTS = [
  { group: "Morning", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"] },
  { group: "Afternoon", slots: ["12:00", "12:30", "14:00", "14:30", "15:00", "15:30"] },
  { group: "Evening", slots: ["16:00", "16:30", "17:00", "17:30", "18:00"] },
];

const QUICK_SYMPTOMS = [
  "Seasonal Fever / Cough",
  "Severe Headache / Migraine",
  "Skin Rash / Allergy",
  "High Blood Pressure Review",
  "Joint Pain / Stiffness",
  "Routine Health Checkup",
];

export default function Appointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { appointments, addAppointment } = useClinic();

  const selectedPackage = searchParams.get("package");
  const selectedPrice = searchParams.get("price");
  const selectedService = searchParams.get("service");
  const selectedDoctorParam = searchParams.get("doctor");
  const selectedSpecializationParam = searchParams.get("specialization");

  const isHealthCheckup = Boolean(selectedPackage);

  // Form State
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [consultationType, setConsultationType] = useState("In-Clinic");

  const initialDoctor = selectedDoctorParam
    ? `${selectedDoctorParam} - ${selectedSpecializationParam || ""}`
    : `${DOCTORS[0].name} - ${DOCTORS[0].specialization}`;

  const [doctor, setDoctor] = useState(initialDoctor);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:00");
  const [symptoms, setSymptoms] = useState("");

  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Selected doctor object
  const currentDocObj = useMemo(() => {
    return DOCTORS.find((d) => doctor.startsWith(d.name)) || DOCTORS[0];
  }, [doctor]);

  // Check which time slots are already booked for this doctor and date
  const bookedSlots = useMemo(() => {
    return appointments
      .filter(
        (a) =>
          a.doctor.startsWith(currentDocObj.name) &&
          a.date === date &&
          a.status !== "Rejected" &&
          a.status !== "Cancelled"
      )
      .map((a) => a.time);
  }, [appointments, currentDocObj, date]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (bookedSlots.includes(time)) {
      alert("This time slot is already booked for this doctor. Please select another slot.");
      return;
    }

    const newApt = addAppointment({
      patientName,
      email,
      phone,
      age: Number(age) || 30,
      gender,
      doctor: `${currentDocObj.name} - ${currentDocObj.specialization}`,
      doctorName: currentDocObj.name,
      specialization: currentDocObj.specialization,
      room: currentDocObj.room,
      date,
      time,
      consultationType,
      type: isHealthCheckup ? "health-checkup" : "doctor-consultation",
      service: isHealthCheckup ? selectedPackage : selectedService || "Doctor Consultation",
      packagePrice: isHealthCheckup
        ? `₹${Number(selectedPrice || 0).toLocaleString("en-IN")}`
        : `₹${currentDocObj.fee}`,
      symptoms: symptoms || (isHealthCheckup ? selectedPackage : "Regular OPD Consultation"),
    });

    setBookedAppointment(newApt);
    setShowSlipModal(true);
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        {/* HEADER */}
        <div className="appointment-header">
          <span className="appointment-pill-badge">ONLINE APPOINTMENT DESK</span>
          <h1>{isHealthCheckup ? "Book Health Checkup Package" : "Schedule Your Medical Consultation"}</h1>
          <p>
            {isHealthCheckup
              ? "Complete your patient details to confirm your preventive health package booking."
              : "Choose your specialist, preferred date, and verified time slot with zero queue hassle."}
          </p>
        </div>

        {/* HEALTH PACKAGE OR SERVICE BANNER */}
        {isHealthCheckup && (
          <div className="selected-package-box">
            <div className="selected-package-content">
              <span className="selected-package-label">PREVENTIVE PACKAGE SELECTED</span>
              <h2>{selectedPackage}</h2>
              <p>Includes complete blood analysis, vital screening, and doctor report review.</p>
            </div>
            <div className="selected-package-price">
              <strong>₹{Number(selectedPrice || 0).toLocaleString("en-IN")}</strong>
              <span>/ package</span>
            </div>
          </div>
        )}

        <div className="appointment-grid-layout">
          {/* MAIN FORM */}
          <div className="appointment-form-card">
            <form className="appointment-form" onSubmit={handleSubmit}>
              {/* SECTION 1: CONSULTATION MODE */}
              <div className="form-section-title">
                <span className="step-num">1</span>
                <h3>Consultation Mode</h3>
              </div>

              <div className="mode-toggle-group">
                <button
                  type="button"
                  className={`mode-btn ${consultationType === "In-Clinic" ? "active" : ""}`}
                  onClick={() => setConsultationType("In-Clinic")}
                >
                  <StethoscopeIcon size={18} />
                  <div>
                    <strong>In-Clinic Visit</strong>
                    <span>Physical OPD at SmartClinic</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`mode-btn ${consultationType === "Online Video" ? "active" : ""}`}
                  onClick={() => setConsultationType("Online Video")}
                >
                  <VideoIcon size={18} />
                  <div>
                    <strong>Video Consultation</strong>
                    <span>Tele-health via secure call</span>
                  </div>
                </button>
              </div>

              {/* SECTION 2: SPECIALIST SELECTION */}
              <div className="form-section-title">
                <span className="step-num">2</span>
                <h3>Doctor & Specialization</h3>
              </div>

              <div className="form-group">
                <label>Select Specialist</label>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="smart-input select-input"
                  required
                >
                  {DOCTORS.map((item) => {
                    const doctorValue = `${item.name} - ${item.specialization}`;
                    return (
                      <option value={doctorValue} key={item.name}>
                        {item.name} ({item.specialization}) • ₹{item.fee} • {item.room}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* SECTION 3: DATE & SLOT PICKER */}
              <div className="form-section-title">
                <span className="step-num">3</span>
                <h3>Date & Time Slot</h3>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="smart-input"
                    required
                  />
                </div>
              </div>

              {/* VISUAL TIME SLOTS */}
              <div className="time-slots-wrapper">
                <label className="slot-heading">Available Time Slots for {date}:</label>
                <div className="time-groups">
                  {TIME_SLOTS.map((group) => (
                    <div className="slot-group" key={group.group}>
                      <span className="slot-group-title">{group.group}</span>
                      <div className="slots-chips">
                        {group.slots.map((s) => {
                          const isBooked = bookedSlots.includes(s);
                          const isSelected = time === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              disabled={isBooked}
                              className={`slot-chip ${isSelected ? "selected" : ""} ${
                                isBooked ? "booked" : ""
                              }`}
                              onClick={() => setTime(s)}
                            >
                              {s} {isBooked && "• Booked"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: PATIENT DETAILS */}
              <div className="form-section-title">
                <span className="step-num">4</span>
                <h3>Patient Information</h3>
              </div>

              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Patient Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Anjali Sharma"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="smart-input"
                    required
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Age *</label>
                  <input
                    type="number"
                    min="1"
                    max="115"
                    placeholder="Years"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="smart-input"
                    required
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="smart-input select-input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Phone Number (10 digits) *</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="smart-input"
                    required
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="smart-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Reason for Visit / Symptoms</label>
                <textarea
                  rows="3"
                  placeholder="Describe your health symptoms or specific questions for the doctor..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="smart-input textarea-input"
                ></textarea>

                {/* Quick Symptom Chips */}
                <div className="quick-symptoms-chips">
                  <span className="chips-label">Quick select:</span>
                  {QUICK_SYMPTOMS.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className="symptom-tag"
                      onClick={() => setSymptoms(item)}
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-booking-btn">
                Confirm & Book Appointment →
              </button>
            </form>
          </div>

          {/* SIDEBAR SUMMARY CARD */}
          <div className="booking-summary-sidebar">
            <div className="summary-card">
              <h3>Appointment Summary</h3>
              <div className="summary-divider"></div>

              <div className="summary-item">
                <span className="s-label">Doctor</span>
                <strong className="s-val">{currentDocObj.name}</strong>
                <span className="s-sub">{currentDocObj.specialization}</span>
              </div>

              <div className="summary-item">
                <span className="s-label">OPD Chamber</span>
                <strong className="s-val chamber-tag">{currentDocObj.room}</strong>
              </div>

              <div className="summary-item">
                <span className="s-label">Date & Time</span>
                <strong className="s-val date-time-tag">
                  {date} at {time}
                </strong>
              </div>

              <div className="summary-item">
                <span className="s-label">Mode</span>
                <span className="mode-pill">{consultationType}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-fee-row">
                <span>Total Consultation Fee</span>
                <strong>
                  {isHealthCheckup
                    ? `₹${Number(selectedPrice || 0).toLocaleString("en-IN")}`
                    : `₹${currentDocObj.fee}`}
                </strong>
              </div>

              <div className="summary-guarantee">
                <ShieldIcon size={18} />
                <span>Zero pre-payment penalty. Pay securely at the clinic reception or online.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPOINTMENT DIGITAL SLIP MODAL */}
      {showSlipModal && bookedAppointment && (
        <AppointmentSlipModal
          appointment={bookedAppointment}
          onClose={() => {
            setShowSlipModal(false);
            navigate("/appointments");
          }}
        />
      )}
    </div>
  );
}
