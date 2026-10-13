import { useState } from "react";
import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      localStorage.getItem("appointments");

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [];
  });

  const handleCancel = (index) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    const updatedAppointments =
      appointments.filter(
        (_, appointmentIndex) =>
          appointmentIndex !== index
      );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    setAppointments(updatedAppointments);
  };

  return (
    <div className="appointments-page">

      <div className="appointments-container">

        <h1>My Appointments</h1>

        <p>
          Your booked appointments and health checkups
          will appear here.
        </p>


        {appointments.length > 0 ? (

          appointments.map((appointment, index) => {

            const isHealthCheckup =
              appointment.type === "health-checkup";

            return (

              <div
                className="appointment-card"
                key={index}
              >

                <div className="appointment-card-header">

                  <div>

                    <h2>
                      {isHealthCheckup
                        ? "Health Checkup"
                        : `Appointment #${index + 1}`}
                    </h2>

                    <span
                      className={
                        isHealthCheckup
                          ? "appointment-type health-type"
                          : "appointment-type consultation-type"
                      }
                    >
                      {isHealthCheckup
                        ? "HEALTH CHECKUP"
                        : "DOCTOR CONSULTATION"}
                    </span>

                  </div>

                </div>


                {/* HEALTH PACKAGE */}

                {isHealthCheckup && (
                  <div className="booked-package-box">

                    <div>

                      <strong>
                        Selected Package
                      </strong>

                      <span>
                        {appointment.service}
                      </span>

                    </div>


                    <div>

                      <strong>
                        Package Price
                      </strong>

                      <span>
                        {appointment.packagePrice}
                      </span>

                    </div>

                  </div>
                )}


                <div className="appointment-details">

                  <div className="detail-item">
                    <strong>
                      Patient Name
                    </strong>

                    <span>
                      {appointment.patientName}
                    </span>
                  </div>


                  <div className="detail-item">
                    <strong>Email</strong>

                    <span>
                      {appointment.email}
                    </span>
                  </div>


                  <div className="detail-item">
                    <strong>Phone</strong>

                    <span>
                      {appointment.phone}
                    </span>
                  </div>


                  <div className="detail-item">
                    <strong>Doctor</strong>

                    <span>
                      {appointment.doctor}
                    </span>
                  </div>


                  <div className="detail-item">
                    <strong>Date</strong>

                    <span>
                      {appointment.date}
                    </span>
                  </div>


                  <div className="detail-item">
                    <strong>Time</strong>

                    <span>
                      {appointment.time}
                    </span>
                  </div>


                  <div className="detail-item">
                    <strong>Status</strong>

                    <span>
                      {appointment.status}
                    </span>
                  </div>

                </div>


                {appointment.status === "Approved" && (
                  <div className="approval-message">
                    Your appointment has been approved
                    by the clinic.
                  </div>
                )}


                {appointment.status === "Rejected" && (
                  <div className="rejection-message">
                    Your appointment has been rejected
                    by the clinic.
                  </div>
                )}


                <button
                  className="cancel-button"
                  onClick={() =>
                    handleCancel(index)
                  }
                >
                  {appointment.status === "Approved"
                    ? "Cancel Approved Appointment"
                    : "Cancel Appointment"}
                </button>

              </div>

            );
          })

        ) : (

          <p>No appointments found.</p>

        )}

      </div>

    </div>
  );
}

export default Appointments;