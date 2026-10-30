import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClinic } from "../context/ClinicContext";
import {
  TvIcon,
  ClockIcon,
  StethoscopeIcon,
  UserIcon,
  RefreshIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ActivityIcon,
} from "../components/Icons";
import "./QueueBoard.css";

export default function QueueBoard() {
  const { appointments, activeQueue, callNextToken, isLoggedIn } = useClinic();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];

  // Active / Waiting appointments for today
  const todaysAppointments = appointments.filter(
    (a) => a.date === todayStr && a.status !== "Rejected" && a.status !== "Cancelled"
  );

  const waitingAppointments = todaysAppointments.filter(
    (a) => a.token !== activeQueue?.token && a.status !== "Completed"
  );

  const completedCount = todaysAppointments.filter((a) => a.status === "Completed").length;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const doctorRooms = [
    { doctor: "Dr. Aarav Sharma", dept: "General Medicine", room: "Room 101", status: "Active OPD" },
    { doctor: "Dr. Priya Mehta", dept: "Cardiology", room: "Room 203", status: "Active OPD" },
    { doctor: "Dr. Rohan Gupta", dept: "Dermatology", room: "Room 105", status: "Active OPD" },
    { doctor: "Dr. Neha Verma", dept: "Gynecology", room: "Room 205", status: "Consultation" },
  ];

  return (
    <div className={`queue-page ${isFullscreen ? "fullscreen-mode" : ""}`}>
      {/* QUEUE HEADER */}
      <div className="queue-top-bar">
        <div className="queue-brand">
          <span className="live-indicator">
            <span className="live-dot"></span> LIVE OPD
          </span>
          <h1>SmartClinic Waiting Lounge Display</h1>
        </div>

        <div className="queue-clock-controls">
          <div className="clock-badge">
            <ClockIcon size={16} />
            <span>{currentTime}</span>
          </div>

          <button className="queue-action-btn" onClick={toggleFullscreen} title="Toggle TV Fullscreen">
            <TvIcon size={18} />
            <span>{isFullscreen ? "Exit TV Mode" : "TV Fullscreen"}</span>
          </button>

          {!isLoggedIn && (
            <Link to="/clinic-login" className="queue-staff-link">
              Clinic Staff Login →
            </Link>
          )}
        </div>
      </div>

      {/* MAIN QUEUE GRID */}
      <div className="queue-grid-layout">
        {/* LEFT / HERO: NOW CALLING TOKEN */}
        <div className="queue-hero-card">
          <div className="hero-status-pill">
            <ActivityIcon size={18} className="pulse-icon" />
            <span>NOW CALLING / CURRENT TOKEN</span>
          </div>

          <div className="token-huge-display">
            <span className="token-prefix">TOKEN NUMBER</span>
            <div className="token-digits">{activeQueue?.token || "SC-101"}</div>
          </div>

          <div className="hero-patient-details">
            <div className="hero-patient-name">
              <UserIcon size={24} />
              <span>{activeQueue?.patientName || "Waiting for next patient..."}</span>
            </div>

            <div className="hero-location-pills">
              <div className="loc-pill loc-room">
                <span>Room:</span>
                <strong>{activeQueue?.room || "Room 101"}</strong>
              </div>
              <div className="loc-pill loc-doctor">
                <StethoscopeIcon size={16} />
                <strong>{activeQueue?.doctorName || "Dr. Aarav Sharma"}</strong>
              </div>
            </div>

            <div className="hero-called-time">
              <span>Called at {activeQueue?.calledAt || "Just now"}</span>
            </div>
          </div>

          {isLoggedIn && waitingAppointments.length > 0 && (
            <div className="queue-control-strip">
              <button
                className="btn-call-next"
                onClick={() => callNextToken(waitingAppointments[0].token)}
              >
                Call Next Token (#{waitingAppointments[0].token})
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: UPCOMING QUEUE LIST */}
        <div className="queue-sidebar-card">
          <div className="sidebar-header">
            <h3>Next in Queue</h3>
            <span className="waiting-badge">
              {waitingAppointments.length} Waiting • {completedCount} Done
            </span>
          </div>

          <div className="queue-patient-list">
            {waitingAppointments.length === 0 ? (
              <div className="queue-empty">
                <CheckCircleIcon size={36} />
                <p>No patients in waiting line right now.</p>
                <small>New booked appointments will show up here automatically.</small>
              </div>
            ) : (
              waitingAppointments.slice(0, 6).map((apt, index) => (
                <div className="queue-row-item" key={apt.id || index}>
                  <div className="row-token-col">
                    <span className="queue-seq">#{index + 1}</span>
                    <strong className="queue-token-tag">#{apt.token}</strong>
                  </div>

                  <div className="row-patient-col">
                    <strong>{apt.patientName}</strong>
                    <span>{apt.doctorName || apt.doctor.split(" - ")[0]} • {apt.consultationType || "In-Clinic"}</span>
                  </div>

                  <div className="row-wait-col">
                    <span className="wait-time-tag">~{(index + 1) * 12} mins</span>
                    {isLoggedIn && (
                      <button
                        className="btn-call-mini"
                        onClick={() => callNextToken(apt.token)}
                        title="Call this patient"
                      >
                        Call
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DOCTOR CONSULTATION ROOM DIRECTORY */}
          <div className="opd-rooms-widget">
            <h4>OPD Chambers Status</h4>
            <div className="rooms-grid">
              {doctorRooms.map((r, i) => (
                <div className="room-status-item" key={i}>
                  <div className="room-meta">
                    <strong>{r.room}</strong>
                    <span>{r.doctor}</span>
                  </div>
                  <span className="room-pill-active">{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TICKER AT BOTTOM */}
      <div className="queue-ticker">
        <span className="ticker-label">HOSPITAL NOTICE:</span>
        <div className="ticker-text">
          📢 Please keep your digital appointment pass or token ready • Emergency cases receive immediate triage priority • For help, visit the reception desk or call +91 98765 43210.
        </div>
      </div>
    </div>
  );
}

