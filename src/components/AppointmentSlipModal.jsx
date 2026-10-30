import { CloseIcon, PrinterIcon, StethoscopeIcon } from "./Icons";
import "./AppointmentSlipModal.css";

export default function AppointmentSlipModal({ appointment, onClose }) {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  const isHealthCheckup = appointment.type === "health-checkup";

  return (
    <div className="smart-modal-overlay" onClick={onClose}>
      <div className="smart-modal slip-modal" onClick={(e) => e.stopPropagation()}>
        <div className="smart-modal-header no-print">
          <h3>Digital Appointment Pass</h3>
          <button className="smart-modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="printable-slip-wrapper">
          <div className="slip-container">
            {/* CLINIC BRAND HEADER */}
            <div className="slip-clinic-header">
              <div className="slip-brand">
                <div className="slip-logo-badge">
                  <StethoscopeIcon size={22} className="slip-logo-icon" />
                </div>
                <div>
                  <h2>SmartClinic Healthcare</h2>
                  <p className="slip-sub">Smart OPD & Diagnostic Care Center</p>
                  <p className="slip-addr">📍 Plot 42, Health City, Jaipur, Rajasthan • ☎ +91 98765 43210</p>
                </div>
              </div>
              <div className="slip-token-box">
                <span className="slip-token-label">OPD TOKEN</span>
                <span className="slip-token-val">#{appointment.token || "SC-101"}</span>
                <span className={`slip-status-pill status-${(appointment.status || "Pending").toLowerCase()}`}>
                  {appointment.status || "Pending"}
                </span>
              </div>
            </div>

            <div className="slip-divider"></div>

            {/* TRACKING ID & DATE */}
            <div className="slip-meta-row">
              <div>
                <span className="meta-lbl">Appointment ID:</span>
                <strong className="meta-val">{appointment.id || "APT-0001"}</strong>
              </div>
              <div>
                <span className="meta-lbl">Booked On:</span>
                <span className="meta-val">
                  {appointment.createdAt ? new Date(appointment.createdAt).toLocaleDateString() : "Today"}
                </span>
              </div>
              <div>
                <span className="meta-lbl">Mode:</span>
                <span className="meta-val mode-highlight">
                  {appointment.consultationType || "In-Clinic"}
                </span>
              </div>
            </div>

            {/* PATIENT & DOCTOR INFO GRID */}
            <div className="slip-info-grid">
              <div className="slip-card-section">
                <h4>Patient Information</h4>
                <div className="info-line">
                  <span>Name:</span>
                  <strong>{appointment.patientName}</strong>
                </div>
                <div className="info-line">
                  <span>Age / Gender:</span>
                  <span>{appointment.age || "N/A"} yrs • {appointment.gender || "N/A"}</span>
                </div>
                <div className="info-line">
                  <span>Contact:</span>
                  <span>{appointment.phone}</span>
                </div>
                <div className="info-line">
                  <span>Email:</span>
                  <span>{appointment.email || "N/A"}</span>
                </div>
              </div>

              <div className="slip-card-section">
                <h4>Consultation Details</h4>
                <div className="info-line">
                  <span>Doctor:</span>
                  <strong>{appointment.doctorName || appointment.doctor}</strong>
                </div>
                <div className="info-line">
                  <span>Department:</span>
                  <span>{appointment.specialization || (isHealthCheckup ? "Diagnostic OPD" : "General Medicine")}</span>
                </div>
                <div className="info-line">
                  <span>OPD Room:</span>
                  <span className="room-badge">{appointment.room || "Room 101"}</span>
                </div>
                <div className="info-line">
                  <span>Date & Slot:</span>
                  <strong className="date-time-highlight">
                    {appointment.date} @ {appointment.time}
                  </strong>
                </div>
              </div>
            </div>

            {/* SERVICE / PACKAGE / SYMPTOMS */}
            <div className="slip-service-box">
              <div className="service-title-col">
                <span className="meta-lbl">{isHealthCheckup ? "Health Package:" : "Service / Symptoms:"}</span>
                <strong>{appointment.service || "Doctor Consultation"}</strong>
                {appointment.symptoms && (
                  <p className="slip-symptoms-text">“{appointment.symptoms}”</p>
                )}
              </div>
              {appointment.packagePrice && (
                <div className="service-price-col">
                  <span className="meta-lbl">Fee Payable:</span>
                  <span className="price-tag">{appointment.packagePrice}</span>
                </div>
              )}
            </div>

            {/* DOCTOR CLINICAL NOTES (IF ANY) */}
            {appointment.doctorNotes && (
              <div className="slip-notes-box">
                <span className="notes-lbl">Doctor's Clinical Notes / Advice:</span>
                <p>{appointment.doctorNotes}</p>
              </div>
            )}

            {/* PATIENT INSTRUCTIONS */}
            <div className="slip-instructions">
              <strong>Patient Instructions:</strong>
              <ul>
                <li>Please arrive at the clinic waiting room 15 minutes prior to your allocated slot.</li>
                <li>Monitor your token number on the OPD Waiting Hall Display screen or on the Live Queue tracker.</li>
                <li>Carry your valid Photo ID and previous prescriptions/investigation reports.</li>
              </ul>
            </div>

            {/* FOOTER BARCODE SIMULATION */}
            <div className="slip-footer">
              <div className="slip-barcode">
                <div className="barcode-bars">||| | |||| | ||| || ||||| || | |||| ||| | |||</div>
                <span>{appointment.id || "APT-0001"}</span>
              </div>
              <div className="slip-verified">
                <span className="seal-text">✓ VERIFIED BY SMARTCLINIC SYSTEM</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL ACTIONS */}
        <div className="slip-modal-actions no-print">
          <button className="btn-print" onClick={handlePrint}>
            <PrinterIcon size={18} /> Print / Save PDF
          </button>
          <button className="btn-close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

