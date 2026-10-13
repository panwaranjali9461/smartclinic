import { useEffect, useState } from "react";
import "./ClinicDashboard.css";

function ClinicDashboard() {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("clinicLoggedIn");

    if (isLoggedIn !== "true") {
      window.location.href = "/clinic-login";
    }
  }, []);

  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      localStorage.getItem("appointments");

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [];
  });

  const handleApprove = (index) => {
    const updatedAppointments = [...appointments];

    updatedAppointments[index].status = "Approved";

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    setAppointments(updatedAppointments);
  };

  const handleReject = (index) => {
    const updatedAppointments = [...appointments];

    updatedAppointments[index].status = "Rejected";

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    setAppointments(updatedAppointments);
  };

  const handleLogout = () => {
    localStorage.removeItem("clinicLoggedIn");
    window.location.href = "/clinic-login";
  };

  return (
    <div className="clinic-dashboard">

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="clinic-dashboard-container">

        <h1>Clinic Dashboard</h1>

        <p>
          Total Appointments: {appointments.length}
        </p>


        {appointments.length === 0 ? (

          <p>
            No appointments found.
          </p>

        ) : (

          appointments.map((appointment, index) => {

            const isHealthCheckup =
              appointment.type === "health-checkup";

            return (

              <div
                className="clinic-appointment-card"
                key={index}
              >

                {/* HEADER */}

                <div className="clinic-card-header">

                  <div>

                    <h2>
                      {isHealthCheckup
                        ? "Health Checkup Booking"
                        : `Appointment #${index + 1}`}
                    </h2>

                    <span
                      className={
                        isHealthCheckup
                          ? "clinic-booking-type health-booking"
                          : "clinic-booking-type consultation-booking"
                      }
                    >
                      {isHealthCheckup
                        ? "HEALTH CHECKUP"
                        : "DOCTOR CONSULTATION"}
                    </span>

                  </div>

                </div>


                {/* HEALTH PACKAGE DETAILS */}

                {isHealthCheckup && (
                  <div className="clinic-package-box">

                    <div className="clinic-package-info">

                      <span>
                        SELECTED PACKAGE
                      </span>

                      <strong>
                        {appointment.service}
                      </strong>

                    </div>


                    <div className="clinic-package-price">

                      <span>
                        PACKAGE PRICE
                      </span>

                      <strong>
                        {appointment.packagePrice}
                      </strong>

                    </div>

                  </div>
                )}


                {/* APPOINTMENT DETAILS */}

                <div className="clinic-appointment-details">

                  <div className="clinic-detail-item">

                    <strong>
                      Patient Name
                    </strong>

                    <span>
                      {appointment.patientName}
                    </span>

                  </div>


                  <div className="clinic-detail-item">

                    <strong>
                      Status
                    </strong>

                    <span
                      className={`status-badge ${
                        appointment.status === "Approved"
                          ? "status-approved"
                          : appointment.status === "Rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }`}
                    >
                      {appointment.status}
                    </span>

                  </div>


                  <div className="clinic-detail-item">

                    <strong>
                      Email
                    </strong>

                    <span>
                      {appointment.email}
                    </span>

                  </div>


                  <div className="clinic-detail-item">

                    <strong>
                      Phone
                    </strong>

                    <span>
                      {appointment.phone}
                    </span>

                  </div>


                  <div className="clinic-detail-item">

                    <strong>
                      Doctor
                    </strong>

                    <span>
                      {appointment.doctor}
                    </span>

                  </div>


                  <div className="clinic-detail-item">

                    <strong>
                      Date
                    </strong>

                    <span>
                      {appointment.date}
                    </span>

                  </div>


                  <div className="clinic-detail-item">

                    <strong>
                      Time
                    </strong>

                    <span>
                      {appointment.time}
                    </span>

                  </div>

                </div>


                {/* ACTION BUTTONS */}

                <div className="clinic-action-buttons">

                  <button
                    className="approve-button"
                    onClick={() =>
                      handleApprove(index)
                    }
                    disabled={
                      appointment.status === "Approved" ||
                      appointment.status === "Rejected"
                    }
                  >
                    {appointment.status === "Approved"
                      ? "Already Approved"
                      : appointment.status === "Rejected"
                      ? "Appointment Rejected"
                      : "Approve Appointment"}
                  </button>


                  <button
                    className="reject-button"
                    onClick={() =>
                      handleReject(index)
                    }
                    disabled={
                      appointment.status === "Approved" ||
                      appointment.status === "Rejected"
                    }
                  >
                    {appointment.status === "Rejected"
                      ? "Already Rejected"
                      : appointment.status === "Approved"
                      ? "Appointment Approved"
                      : "Reject Appointment"}
                  </button>

                </div>

              </div>

            );
          })

        )}

      </div>

    </div>
  );
}

export default ClinicDashboard;