import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
} from "../components/Icons";
import "./Appointments.css";

export default function Appointments() {
  const { appointments, cancelAppointment, rescheduleAppointment, activeQueue } = useClinic();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlipAppointment, setSelectedSlipAppointment] = useState(null);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("11:00");

  const todayStr = new Date().toISOString().split("T")[0];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      // 1. Tab filter
      if (activeTab === "today") {
        if (apt.date !== todayStr) return false;
      } else if (activeTab === "pending") {
        if (apt.status !== "Pending") return false;
      } else if (activeTab === "approved") {
        if (apt.status !== "Approved") return false;
      } else if (activeTab === "completed") {
        if (apt.status !== "Completed") return false;
      }

      // 2. Search query filter
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
  }, [appointments, activeTab, searchQuery, todayStr]);

  const handleOpenReschedule = (apt) => {
    setRescheduleTarget(apt);
    setNewDate(apt.date || todayStr);
    setNewTime(apt.time || "10:00");
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleTarget || !newDate || !newTime) return;
    rescheduleAppointment(rescheduleTarget.id, newDate, newTime);
    setRescheduleTarget(null);
  };

  const handleCancelClick = (apt) => {
    const ok = window.confirm(`Are you sure you want to cancel appointment #${apt.token} for ${apt.patientName}?`);
    if (ok) {
      cancelAppointment(apt.id);
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        {/* HEADER */}
        <div className="appointments-header">
          <div>
            <span className="appointments-pill-badge">PATIENT PORTAL</span>
            <h1>My Appointments & Health Checkups</h1>
            <p>Track your clinic appointments, view OPD queue status, and access digital slips.</p>
          </div>
          <Link to="/appointment" className="btn-book-new">
            + Book New Appointment
          </Link>
        </div>

        {/* LIVE QUEUE NOTIFICATION BANNER */}
        {activeQueue && (
          <div className="live-queue-banner">
            <div className="live-banner-left">
              <span className="live-tag">
                <span className="pulse-dot"></span> LIVE OPD QUEUE
              </span>
              <p>
                Currently serving Token <strong>#{activeQueue.token}</strong> ({activeQueue.patientName}) at{" "}
                <strong>{activeQueue.room}</strong> with <strong>{activeQueue.doctorName}</strong>.
              </p>
            </div>
            <Link to="/queue" className="live-view-btn">
              View Waiting Lounge Screen →
            </Link>
          </div>
        )}

        {/* TOOLBAR: SEARCH & TABS */}
        <div className="appointments-toolbar">
          <div className="search-bar">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by patient name, phone, token # (e.g. SC-101)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery("")}>
                <CloseIcon size={16} />
              </button>
            )}
          </div>

          <div className="status-tabs">
            <button
              className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All ({appointments.length})
            </button>
            <button
              className={`tab-btn ${activeTab === "today" ? "active" : ""}`}
              onClick={() => setActiveTab("today")}
            >
              Today's
            </button>
            <button
              className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`tab-btn ${activeTab === "approved" ? "active" : ""}`}
              onClick={() => setActiveTab("approved")}
            >
              Approved
            </button>
            <button
              className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {/* APPOINTMENT LIST */}
        {filteredAppointments.length > 0 ? (
          <div className="appointments-list-grid">
            {filteredAppointments.map((apt) => {
              const isHealthCheckup = apt.type === "health-checkup";
              return (
                <div className="appointment-card-modern" key={apt.id || apt.token}>
                  {/* CARD HEADER */}
                  <div className="card-top">
                    <div className="card-token-area">
                      <span className="token-label">OPD TOKEN</span>
                      <strong className="token-number">#{apt.token}</strong>
                    </div>

                    <div className="card-type-area">
                      <span
                        className={`type-tag ${
                          isHealthCheckup ? "health-tag" : "consultation-tag"
                        }`}
                      >
                        {isHealthCheckup ? "HEALTH CHECKUP" : "DOCTOR CONSULTATION"}
                      </span>
                      <span
                        className={`status-pill status-${(apt.status || "Pending").toLowerCase()}`}
                      >
                        {apt.status || "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* DOCTOR / SERVICE BANNER */}
                  <div className="card-doctor-banner">
                    <div className="doc-avatar-badge">
                      <StethoscopeIcon size={20} />
                    </div>
                    <div>
                      <h3 className="doc-title">{apt.doctorName || apt.doctor}</h3>
                      <p className="doc-dept">
                        {apt.specialization || (isHealthCheckup ? "Diagnostic OPD" : "Specialist")} •{" "}
                        <span className="room-highlight">{apt.room || "Room 101"}</span>
                      </p>
                    </div>
                  </div>

                  {/* PACKAGE / SERVICE DETAILS */}
                  {isHealthCheckup && (
                    <div className="package-info-strip">
                      <div>
                        <span className="strip-lbl">Package:</span>
                        <strong>{apt.service}</strong>
                      </div>
                      <div>
                        <span className="strip-lbl">Price:</span>
                        <strong className="strip-price">{apt.packagePrice}</strong>
                      </div>
                    </div>
                  )}

                  {/* PATIENT INFO & TIME */}
                  <div className="card-info-grid">
                    <div className="info-block">
                      <span className="info-lbl">Patient Name</span>
                      <strong className="info-val">{apt.patientName}</strong>
                      <span className="info-sub">{apt.age ? `${apt.age} yrs • ${apt.gender}` : ""}</span>
                    </div>

                    <div className="info-block">
                      <span className="info-lbl">Contact</span>
                      <span className="info-val">{apt.phone}</span>
                    </div>

                    <div className="info-block">
                      <span className="info-lbl">Schedule Date & Slot</span>
                      <strong className="info-val highlight-val">
                        {apt.date} @ {apt.time}
                      </strong>
                    </div>

                    <div className="info-block">
                      <span className="info-lbl">Mode</span>
                      <span className="info-val">{apt.consultationType || "In-Clinic"}</span>
                    </div>
                  </div>

                  {/* SYMPTOMS / NOTES */}
                  {apt.symptoms && (
                    <div className="card-symptoms-snippet">
                      <span className="snippet-lbl">Symptoms / Reason:</span>
                      <p>“{apt.symptoms}”</p>
                    </div>
                  )}

                  {/* DOCTOR NOTES */}
                  {apt.doctorNotes && (
                    <div className="card-doctor-notes">
                      <strong>Doctor's Advice / Prescription:</strong>
                      <p>{apt.doctorNotes}</p>
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="card-actions-bar">
                    <button
                      className="btn-pass-view"
                      onClick={() => setSelectedSlipAppointment(apt)}
                    >
                      <PrinterIcon size={16} /> View Digital Pass / Slip
                    </button>

                    <div className="secondary-action-btns">
                      <button
                        className="btn-reschedule"
                        onClick={() => handleOpenReschedule(apt)}
                        disabled={apt.status === "Completed" || apt.status === "Cancelled"}
                      >
                        Reschedule
                      </button>

                      <button
                        className="btn-cancel"
                        onClick={() => handleCancelClick(apt)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-appointments-card">
            <CalendarIcon size={44} className="empty-icon" />
            <h2>No appointments found</h2>
            <p>
              {searchQuery || activeTab !== "all"
                ? "Try adjusting your search query or switching tabs."
                : "You don't have any booked appointments yet. Schedule your first consultation now."}
            </p>
            <Link to="/appointment" className="btn-book-now-empty">
              Book Appointment Now
            </Link>
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

      {/* RESCHEDULE MODAL */}
      {rescheduleTarget && (
        <div className="smart-modal-overlay" onClick={() => setRescheduleTarget(null)}>
          <div className="smart-modal reschedule-modal" onClick={(e) => e.stopPropagation()}>
            <div className="smart-modal-header">
              <h3>Reschedule Appointment #{rescheduleTarget.token}</h3>
              <button
                className="smart-modal-close"
                onClick={() => setRescheduleTarget(null)}
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmReschedule} className="smart-modal-body">
              <p className="reschedule-doc-summary">
                Doctor: <strong>{rescheduleTarget.doctorName || rescheduleTarget.doctor}</strong>
              </p>

              <div className="form-group">
                <label>Select New Date</label>
                <input
                  type="date"
                  min={todayStr}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="smart-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Select New Time</label>
                <input
                  type="time"
                  value={newTime}
                  min="09:00"
                  max="18:00"
                  onChange={(e) => setNewTime(e.target.value)}
                  className="smart-input"
                  required
                />
                <small className="time-hint">Available 9:00 AM - 6:00 PM</small>
              </div>

              <div className="reschedule-modal-actions">
                <button type="submit" className="btn-confirm-reschedule">
                  Confirm Reschedule
                </button>
                <button
                  type="button"
                  className="btn-cancel-modal"
                  onClick={() => setRescheduleTarget(null)}
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
