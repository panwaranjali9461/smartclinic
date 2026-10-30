import { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useClinic } from "../context/ClinicContext";
import AppointmentSlipModal from "../components/AppointmentSlipModal";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  SearchIcon,
  PrinterIcon,
  ActivityIcon,
  StethoscopeIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  CloseIcon,
  RefreshIcon,
  PlusIcon,
  TvIcon,
  FileTextIcon,
  DownloadIcon,
  LogOutIcon,
} from "../components/Icons";
import "./ClinicDashboard.css";

const DOCTORS_LIST = [
  "Dr. Aarav Sharma",
  "Dr. Priya Mehta",
  "Dr. Rohan Gupta",
  "Dr. Neha Verma",
  "Dr. Vikram Singh",
  "Dr. Ananya Kapoor",
  "Dr. Rajesh Malhotra",
];

export default function ClinicDashboard() {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    logout,
    appointments,
    updateAppointmentStatus,
    updateAppointmentNotes,
    callNextToken,
    activeQueue,
    resetToDemoData,
    addAppointment,
    showToast,
  } = useClinic();

  // Route protection
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/clinic-login");
    }
  }, [isLoggedIn, navigate]);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [selectedSlipAppointment, setSelectedSlipAppointment] = useState(null);
  const [notesModalTarget, setNotesModalTarget] = useState(null);
  const [tempNotes, setTempNotes] = useState("");
  const [showWalkInModal, setShowWalkInModal] = useState(false);

  // Walk-in form state
  const todayStr = new Date().toISOString().split("T")[0];
  const [walkInName, setWalkInName] = useState("");
  const [walkInPhone, setWalkInPhone] = useState("");
  const [walkInAge, setWalkInAge] = useState("");
  const [walkInGender, setWalkInGender] = useState("Male");
  const [walkInDoctor, setWalkInDoctor] = useState(DOCTORS_LIST[0]);
  const [walkInSymptoms, setWalkInSymptoms] = useState("Walk-in General Consultation");

  // KPI Statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    const todayCount = appointments.filter((a) => a.date === todayStr).length;
    const approved = appointments.filter((a) => a.status === "Approved").length;
    const pending = appointments.filter((a) => a.status === "Pending").length;
    const completed = appointments.filter((a) => a.status === "Completed").length;
    const rejected = appointments.filter((a) => a.status === "Rejected").length;

    // Calculate approximate clinic revenue
    const revenue = appointments.reduce((acc, curr) => {
      if (curr.status === "Rejected") return acc;
      const priceStr = curr.packagePrice || "₹500";
      const cleanNum = Number(priceStr.replace(/[^0-9]/g, "")) || 500;
      return acc + cleanNum;
    }, 0);

    return { total, todayCount, approved, pending, completed, rejected, revenue };
  }, [appointments, todayStr]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      // 1. Status Filter
      if (statusFilter === "today" && apt.date !== todayStr) return false;
      if (statusFilter === "pending" && apt.status !== "Pending") return false;
      if (statusFilter === "approved" && apt.status !== "Approved") return false;
      if (statusFilter === "completed" && apt.status !== "Completed") return false;
      if (statusFilter === "rejected" && apt.status !== "Rejected") return false;

      // 2. Doctor Filter
      if (selectedDoctorFilter !== "All") {
        if (!apt.doctor.includes(selectedDoctorFilter)) return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = apt.patientName?.toLowerCase().includes(q);
        const matchesPhone = apt.phone?.includes(q);
        const matchesDoctor = apt.doctor?.toLowerCase().includes(q);
        const matchesToken = apt.token?.toLowerCase().includes(q);
        const matchesId = apt.id?.toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesDoctor || matchesToken || matchesId;
      }

      return true;
    });
  }, [appointments, statusFilter, selectedDoctorFilter, searchQuery, todayStr]);

  // Handle Note Save
  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (!notesModalTarget) return;
    updateAppointmentNotes(notesModalTarget.id, tempNotes);
    setNotesModalTarget(null);
  };

  // Handle Walk-In Creation
  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    if (walkInPhone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    addAppointment({
      patientName: walkInName,
      phone: walkInPhone,
      email: "walkin@patient.local",
      age: Number(walkInAge) || 30,
      gender: walkInGender,
      doctor: `${walkInDoctor} - General Specialist`,
      doctorName: walkInDoctor,
      specialization: "General Consultation",
      room: "Room 101",
      date: todayStr,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      consultationType: "In-Clinic (Walk-in)",
      type: "doctor-consultation",
      service: "Walk-in Consultation",
      packagePrice: "₹500",
      symptoms: walkInSymptoms,
      status: "Approved",
    });

    setShowWalkInModal(false);
    setWalkInName("");
    setWalkInPhone("");
    setWalkInAge("");
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Token,ID,Patient Name,Phone,Doctor,Date,Time,Status,Service,Price"];
    const rows = filteredAppointments.map((a) =>
      [
        a.token,
        a.id,
        `"${a.patientName}"`,
        a.phone,
        `"${a.doctorName || a.doctor}"`,
        a.date,
        a.time,
        a.status,
        `"${a.service}"`,
        `"${a.packagePrice || '₹500'}"`,
      ].join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `smartclinic_appointments_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported schedule to CSV", "success");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="clinic-dashboard">
      <div className="clinic-dashboard-container">
        {/* TOP BAR */}
        <div className="dashboard-topbar">
          <div>
            <span className="portal-badge">CLINIC STAFF PORTAL</span>
            <h1>Clinic Operations Dashboard</h1>
            <p>Manage appointments, OPD waiting queue, patient records & clinical advice.</p>
          </div>

          <div className="dashboard-top-actions">
            <button className="btn-walkin" onClick={() => setShowWalkInModal(true)}>
              <PlusIcon size={16} /> Register Walk-In Patient
            </button>
            <Link to="/queue" className="btn-tv-board" target="_blank" rel="noreferrer">
              <TvIcon size={16} /> Open OPD TV Screen
            </Link>
            <button className="btn-dashboard-logout" onClick={logout}>
              <LogOutIcon size={16} /> Logout
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW CARDS */}
        <div className="dashboard-kpi-grid">
          <div className="kpi-card">
            <span className="kpi-label">Total Bookings</span>
            <strong className="kpi-num">{stats.total}</strong>
            <span className="kpi-sub">Lifetime registered</span>
          </div>

          <div className="kpi-card highlight-kpi">
            <span className="kpi-label">Today's OPD Queue</span>
            <strong className="kpi-num">{stats.todayCount}</strong>
            <span className="kpi-sub">{todayStr}</span>
          </div>

          <div className="kpi-card approved-kpi">
            <span className="kpi-label">Approved</span>
            <strong className="kpi-num">{stats.approved}</strong>
            <span className="kpi-sub">Ready for chamber</span>
          </div>

          <div className="kpi-card pending-kpi">
            <span className="kpi-label">Pending Verification</span>
            <strong className="kpi-num">{stats.pending}</strong>
            <span className="kpi-sub">Requires staff action</span>
          </div>

          <div className="kpi-card completed-kpi">
            <span className="kpi-label">Completed Consults</span>
            <strong className="kpi-num">{stats.completed}</strong>
            <span className="kpi-sub">Consulted today</span>
          </div>

          <div className="kpi-card revenue-kpi">
            <span className="kpi-label">Estimated Revenue</span>
            <strong className="kpi-num">₹{stats.revenue.toLocaleString("en-IN")}</strong>
            <span className="kpi-sub">Consultation & Packages</span>
          </div>
        </div>

        {/* LIVE OPD QUEUE CONTROLLER BAR */}
        <div className="queue-control-banner">
          <div className="qc-left">
            <span className="qc-pulse-badge">
              <span className="live-dot-green"></span> OPD CONTROLLER
            </span>
            <div className="qc-active-info">
              <span>Now Serving in Chambers:</span>
              <strong>
                Token #{activeQueue?.token || "SC-101"} • {activeQueue?.patientName} (
                {activeQueue?.doctorName || "Dr. Aarav Sharma"})
              </strong>
            </div>
          </div>

          <div className="qc-right">
            <button
              className="btn-call-next-global"
              onClick={() => {
                const nextCandidate = appointments.find(
                  (a) => a.token !== activeQueue?.token && a.status === "Approved"
                );
                if (nextCandidate) {
                  callNextToken(nextCandidate.token);
                } else {
                  showToast("No further approved patients waiting in queue.", "info");
                }
              }}
            >
              ⚡ Call Next Waiting Token
            </button>
          </div>
        </div>

        {/* TOOLBAR CONTROLS */}
        <div className="clinic-toolbar">
          <div className="clinic-search-box">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search patients by name, phone, token #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery("")}>
                <CloseIcon size={16} />
              </button>
            )}
          </div>

          <div className="doctor-filter-dropdown">
            <span>Filter Doctor:</span>
            <select
              value={selectedDoctorFilter}
              onChange={(e) => setSelectedDoctorFilter(e.target.value)}
              className="select-doc-filter"
            >
              <option value="All">All Specialists</option>
              {DOCTORS_LIST.map((doc) => (
                <option value={doc} key={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          <div className="toolbar-export-group">
            <button className="btn-tool" onClick={handleExportCSV} title="Export to Excel / CSV">
              <DownloadIcon size={16} /> Export CSV
            </button>
            <button className="btn-tool" onClick={() => window.print()} title="Print Schedule">
              <PrinterIcon size={16} /> Print
            </button>
            <button className="btn-tool" onClick={resetToDemoData} title="Reset to Sample Data">
              <RefreshIcon size={16} /> Reset Demo
            </button>
          </div>
        </div>

        {/* STATUS TABS */}
        <div className="clinic-tabs-row">
          <button
            className={`clinic-tab ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All Appointments ({appointments.length})
          </button>
          <button
            className={`clinic-tab ${statusFilter === "today" ? "active" : ""}`}
            onClick={() => setStatusFilter("today")}
          >
            Today ({stats.todayCount})
          </button>
          <button
            className={`clinic-tab ${statusFilter === "pending" ? "active" : ""}`}
            onClick={() => setStatusFilter("pending")}
          >
            Pending ({stats.pending})
          </button>
          <button
            className={`clinic-tab ${statusFilter === "approved" ? "active" : ""}`}
            onClick={() => setStatusFilter("approved")}
          >
            Approved ({stats.approved})
          </button>
          <button
            className={`clinic-tab ${statusFilter === "completed" ? "active" : ""}`}
            onClick={() => setStatusFilter("completed")}
          >
            Completed ({stats.completed})
          </button>
          <button
            className={`clinic-tab ${statusFilter === "rejected" ? "active" : ""}`}
            onClick={() => setStatusFilter("rejected")}
          >
            Rejected ({stats.rejected})
          </button>
        </div>

        {/* APPOINTMENTS CARDS GRID */}
        {filteredAppointments.length > 0 ? (
          <div className="clinic-cards-container">
            {filteredAppointments.map((appointment) => {
              const isHealthCheckup = appointment.type === "health-checkup";
              return (
                <div className="clinic-appointment-card" key={appointment.id || appointment.token}>
                  {/* CARD HEADER */}
                  <div className="clinic-card-header">
                    <div className="token-meta-box">
                      <span className="token-lbl">TOKEN</span>
                      <strong className="token-val">#{appointment.token}</strong>
                      <span className="apt-id-text">({appointment.id})</span>
                    </div>

                    <div className="clinic-status-area">
                      <span
                        className={`clinic-booking-type ${
                          isHealthCheckup ? "health-booking" : "consultation-booking"
                        }`}
                      >
                        {isHealthCheckup ? "HEALTH CHECKUP" : "DOCTOR CONSULTATION"}
                      </span>
                      <span
                        className={`status-badge ${
                          appointment.status === "Approved"
                            ? "status-approved"
                            : appointment.status === "Rejected"
                            ? "status-rejected"
                            : appointment.status === "Completed"
                            ? "status-completed"
                            : "status-pending"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>

                  {/* PACKAGE / SERVICE DETAILS */}
                  {isHealthCheckup && (
                    <div className="clinic-package-box">
                      <div className="clinic-package-info">
                        <span>SELECTED PACKAGE:</span>
                        <strong>{appointment.service}</strong>
                      </div>
                      <div className="clinic-package-price">
                        <span>FEE:</span>
                        <strong>{appointment.packagePrice}</strong>
                      </div>
                    </div>
                  )}

                  {/* MAIN DETAILS GRID */}
                  <div className="clinic-appointment-details">
                    <div className="clinic-detail-item">
                      <strong>Patient Name</strong>
                      <span>{appointment.patientName}</span>
                      <small className="patient-demographics">
                        {appointment.age ? `${appointment.age} yrs • ${appointment.gender}` : ""}
                      </small>
                    </div>

                    <div className="clinic-detail-item">
                      <strong>Phone Number</strong>
                      <span>{appointment.phone}</span>
                    </div>

                    <div className="clinic-detail-item">
                      <strong>Doctor & Chamber</strong>
                      <span>{appointment.doctorName || appointment.doctor}</span>
                      <small className="chamber-text">{appointment.room || "Room 101"}</small>
                    </div>

                    <div className="clinic-detail-item">
                      <strong>Appointment Slot</strong>
                      <span className="slot-date-text">
                        {appointment.date} @ {appointment.time}
                      </span>
                    </div>
                  </div>

                  {/* SYMPTOMS REASON */}
                  {appointment.symptoms && (
                    <div className="clinic-symptoms-box">
                      <span className="symptom-lbl">Symptoms / Chief Complaint:</span>
                      <p>“{appointment.symptoms}”</p>
                    </div>
                  )}

                  {/* DOCTOR CLINICAL NOTES (IF RECORDED) */}
                  {appointment.doctorNotes && (
                    <div className="clinic-presc-box">
                      <strong>Doctor's Advice & Prescription:</strong>
                      <p>{appointment.doctorNotes}</p>
                    </div>
                  )}

                  {/* STAFF ACTION BUTTONS */}
                  <div className="clinic-action-buttons">
                    {/* APPROVE */}
                    <button
                      className="approve-button"
                      onClick={() => updateAppointmentStatus(appointment.id, "Approved")}
                      disabled={appointment.status === "Approved"}
                    >
                      {appointment.status === "Approved" ? "✓ Approved" : "Approve"}
                    </button>

                    {/* CALL IN REAL-TIME TO QUEUE */}
                    <button
                      className="btn-call-chamber"
                      onClick={() => callNextToken(appointment.token)}
                    >
                      🔊 Call to Chamber
                    </button>

                    {/* COMPLETE CONSULTATION */}
                    <button
                      className="btn-complete-consult"
                      onClick={() => updateAppointmentStatus(appointment.id, "Completed")}
                      disabled={appointment.status === "Completed"}
                    >
                      {appointment.status === "Completed" ? "✓ Consulted" : "Mark Completed"}
                    </button>

                    {/* ADD CLINICAL NOTES */}
                    <button
                      className="btn-add-notes"
                      onClick={() => {
                        setNotesModalTarget(appointment);
                        setTempNotes(appointment.doctorNotes || "");
                      }}
                    >
                      <FileTextIcon size={14} /> Add Notes / Rx
                    </button>

                    {/* VIEW PASS */}
                    <button
                      className="btn-view-pass"
                      onClick={() => setSelectedSlipAppointment(appointment)}
                    >
                      <PrinterIcon size={14} /> Digital Slip
                    </button>

                    {/* REJECT */}
                    <button
                      className="reject-button"
                      onClick={() => updateAppointmentStatus(appointment.id, "Rejected")}
                      disabled={appointment.status === "Rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-records-card">
            <p>No appointments match the current filter selection.</p>
            <button
              className="btn-reset-filters"
              onClick={() => {
                setStatusFilter("all");
                setSelectedDoctorFilter("All");
                setSearchQuery("");
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* APPOINTMENT DIGITAL SLIP MODAL */}
      {selectedSlipAppointment && (
        <AppointmentSlipModal
          appointment={selectedSlipAppointment}
          onClose={() => setSelectedSlipAppointment(null)}
        />
      )}

      {/* DOCTOR NOTES / PRESCRIPTION MODAL */}
      {notesModalTarget && (
        <div className="smart-modal-overlay" onClick={() => setNotesModalTarget(null)}>
          <div className="smart-modal notes-modal" onClick={(e) => e.stopPropagation()}>
            <div className="smart-modal-header">
              <h3>Doctor Clinical Advice & Prescription</h3>
              <button
                className="smart-modal-close"
                onClick={() => setNotesModalTarget(null)}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNotes} className="smart-modal-body">
              <div className="patient-snippet">
                <strong>Patient: {notesModalTarget.patientName}</strong> • Token #{notesModalTarget.token} • {notesModalTarget.doctorName || notesModalTarget.doctor}
              </div>

              <div className="form-group">
                <label>Clinical Notes, Diagnosis & Prescribed Medicines:</label>
                <textarea
                  rows="5"
                  className="smart-input"
                  placeholder="e.g. Tab Paracetamol 650mg TDS x 3 days, Syrup Ambroxol 10ml TDS x 5 days. Advised warm saline gargle and rest."
                  value={tempNotes}
                  onChange={(e) => setTempNotes(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="notes-modal-actions">
                <button type="submit" className="btn-save-notes">
                  Save Clinical Notes
                </button>
                <button
                  type="button"
                  className="btn-cancel-modal"
                  onClick={() => setNotesModalTarget(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WALK-IN REGISTRATION MODAL */}
      {showWalkInModal && (
        <div className="smart-modal-overlay" onClick={() => setShowWalkInModal(false)}>
          <div className="smart-modal walkin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="smart-modal-header">
              <h3>Fast Walk-In Patient Registration</h3>
              <button
                className="smart-modal-close"
                onClick={() => setShowWalkInModal(false)}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleWalkInSubmit} className="smart-modal-body">
              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Patient Full Name *</label>
                  <input
                    type="text"
                    className="smart-input"
                    placeholder="Enter patient name"
                    value={walkInName}
                    onChange={(e) => setWalkInName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Age *</label>
                  <input
                    type="number"
                    min="1"
                    className="smart-input"
                    placeholder="Age"
                    value={walkInAge}
                    onChange={(e) => setWalkInAge(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Gender *</label>
                  <select
                    className="smart-input select-input"
                    value={walkInGender}
                    onChange={(e) => setWalkInGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    className="smart-input"
                    placeholder="10-digit mobile"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={walkInPhone}
                    onChange={(e) => setWalkInPhone(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Assign Doctor *</label>
                  <select
                    className="smart-input select-input"
                    value={walkInDoctor}
                    onChange={(e) => setWalkInDoctor(e.target.value)}
                  >
                    {DOCTORS_LIST.map((doc) => (
                      <option value={doc} key={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Chief Health Complaint</label>
                <input
                  type="text"
                  className="smart-input"
                  placeholder="e.g. Acute stomach pain, severe cold, routine consultation"
                  value={walkInSymptoms}
                  onChange={(e) => setWalkInSymptoms(e.target.value)}
                />
              </div>

              <div className="walkin-modal-actions">
                <button type="submit" className="btn-confirm-walkin">
                  Issue OPD Token & Register →
                </button>
                <button
                  type="button"
                  className="btn-cancel-modal"
                  onClick={() => setShowWalkInModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
