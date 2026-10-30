import { createContext, useContext, useState, useEffect } from "react";

const ClinicContext = createContext(null);

const DEFAULT_SAMPLE_APPOINTMENTS = [
  {
    id: "APT-8821",
    token: "SC-101",
    patientName: "Rahul Sharma",
    age: 32,
    gender: "Male",
    phone: "9876543210",
    email: "rahul.sharma@example.com",
    doctor: "Dr. Aarav Sharma - General Physician",
    doctorName: "Dr. Aarav Sharma",
    specialization: "General Physician",
    room: "Room 101",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    consultationType: "In-Clinic",
    type: "doctor-consultation",
    service: "General Consultation",
    symptoms: "Seasonal fever and persistent throat irritation for 3 days",
    status: "Approved",
    doctorNotes: "Prescribed Antipyretics and warm gargle. Recommended hydration.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "APT-8822",
    token: "SC-102",
    patientName: "Meera Patel",
    age: 28,
    gender: "Female",
    phone: "9823456789",
    email: "meera.patel@example.com",
    doctor: "Dr. Priya Mehta - Cardiologist",
    doctorName: "Dr. Priya Mehta",
    specialization: "Cardiologist",
    room: "Room 203",
    date: new Date().toISOString().split("T")[0],
    time: "11:30",
    consultationType: "In-Clinic",
    type: "doctor-consultation",
    service: "Cardiology Review",
    symptoms: "Mild palpitations post cardio exercise",
    status: "Pending",
    doctorNotes: "",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "APT-8823",
    token: "SC-103",
    patientName: "Vikram Malhotra",
    age: 45,
    gender: "Male",
    phone: "9712345670",
    email: "vikram.m@example.com",
    doctor: "Dr. Rohan Gupta - Dermatologist",
    doctorName: "Dr. Rohan Gupta",
    specialization: "Dermatologist",
    room: "Room 105",
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    consultationType: "Online Video",
    type: "doctor-consultation",
    service: "Dermatology",
    symptoms: "Skin allergy reaction on forearms after outdoor exposure",
    status: "Pending",
    doctorNotes: "",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: "APT-8824",
    token: "SC-104",
    patientName: "Sunita Agarwal",
    age: 52,
    gender: "Female",
    phone: "9988776655",
    email: "sunita.agarwal@example.com",
    doctor: "Dr. Aarav Sharma - General Physician",
    doctorName: "Dr. Aarav Sharma",
    specialization: "General Physician",
    room: "Room 101",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "09:30",
    consultationType: "In-Clinic",
    type: "health-checkup",
    service: "Full Body Checkup",
    packagePrice: "₹1,999",
    symptoms: "Routine annual preventive screening",
    status: "Approved",
    doctorNotes: "Fasting required for blood sugar and lipid profile before 9 AM.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "APT-8825",
    token: "SC-100",
    patientName: "Ananya Deshmukh",
    age: 24,
    gender: "Female",
    phone: "9123456780",
    email: "ananya.d@example.com",
    doctor: "Dr. Neha Verma - Gynecologist",
    doctorName: "Dr. Neha Verma",
    specialization: "Gynecologist",
    room: "Room 205",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    consultationType: "In-Clinic",
    type: "doctor-consultation",
    service: "General Checkup",
    symptoms: "Consultation regarding iron supplements & wellness",
    status: "Completed",
    doctorNotes: "Prescribed Iron & Folic Acid once daily. Recheck hemogram in 1 month.",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  }
];

export function ClinicProvider({ children }) {
  // 1. Appointments State
  const [appointments, setAppointments] = useState(() => {
    try {
      const stored = localStorage.getItem("appointments");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize legacy appointments that don't have id or token
          return parsed.map((item, idx) => ({
            ...item,
            id: item.id || `APT-${1000 + idx}`,
            token: item.token || `SC-${101 + idx}`,
            consultationType: item.consultationType || "In-Clinic",
            age: item.age || 30,
            gender: item.gender || "Not specified",
            symptoms: item.symptoms || item.service || "Routine consultation",
            status: item.status || "Pending",
            doctorNotes: item.doctorNotes || "",
          }));
        }
      }
    } catch (e) {
      console.error("Failed to parse appointments:", e);
    }
    // Return sample appointments if nothing in storage
    localStorage.setItem("appointments", JSON.stringify(DEFAULT_SAMPLE_APPOINTMENTS));
    return DEFAULT_SAMPLE_APPOINTMENTS;
  });

  // 2. Sync to localStorage
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // 3. Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("clinicLoggedIn") === "true";
  });

  const login = (email, password) => {
    if (email === "clinic@smartclinic.com" && password === "clinic123") {
      localStorage.setItem("clinicLoggedIn", "true");
      setIsLoggedIn(true);
      showToast("Welcome back! Clinic Staff logged in.", "success");
      return true;
    }
    showToast("Invalid email or password. Try clinic@smartclinic.com / clinic123", "error");
    return false;
  };

  const logout = () => {
    localStorage.removeItem("clinicLoggedIn");
    setIsLoggedIn(false);
    showToast("Logged out successfully.", "info");
  };

  // 4. Live OPD Queue Serving State
  const [activeQueue, setActiveQueue] = useState(() => {
    try {
      const saved = localStorage.getItem("activeQueue");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      token: "SC-101",
      patientName: "Rahul Sharma",
      doctorName: "Dr. Aarav Sharma",
      room: "Room 101",
      calledAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  });

  useEffect(() => {
    localStorage.setItem("activeQueue", JSON.stringify(activeQueue));
  }, [activeQueue]);

  // 5. Toast Notification System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Helper actions
  const addAppointment = (data) => {
    const nextTokenNum = 100 + appointments.length + 1;
    const newAppointment = {
      ...data,
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      token: `SC-${nextTokenNum}`,
      createdAt: new Date().toISOString(),
      status: data.status || "Pending",
      doctorNotes: data.doctorNotes || "",
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment booked! Your Token is #${newAppointment.token}`, "success");
    return newAppointment;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
    showToast(`Appointment status updated to ${newStatus}.`, "success");
  };

  const updateAppointmentNotes = (id, doctorNotes) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, doctorNotes } : apt))
    );
    showToast("Doctor clinical notes saved.", "success");
  };

  const rescheduleAppointment = (id, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, date: newDate, time: newTime } : apt))
    );
    showToast(`Rescheduled to ${newDate} at ${newTime}`, "success");
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    showToast("Appointment cancelled successfully.", "info");
  };

  const callNextToken = (tokenToCall) => {
    const apt = appointments.find((a) => a.token === tokenToCall || a.id === tokenToCall);
    if (apt) {
      setActiveQueue({
        token: apt.token,
        patientName: apt.patientName,
        doctorName: apt.doctorName || apt.doctor.split(" - ")[0],
        room: apt.room || "Room 101",
        calledAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
      showToast(`Now Calling Token #${apt.token} (${apt.patientName})`, "info");
    } else {
      showToast("No active token matching this selection.", "error");
    }
  };

  const resetToDemoData = () => {
    setAppointments(DEFAULT_SAMPLE_APPOINTMENTS);
    localStorage.setItem("appointments", JSON.stringify(DEFAULT_SAMPLE_APPOINTMENTS));
    showToast("Reset to sample clinic appointments.", "info");
  };

  const clearAllAppointments = () => {
    setAppointments([]);
    localStorage.removeItem("appointments");
    showToast("All appointments cleared.", "info");
  };

  return (
    <ClinicContext.Provider
      value={{
        appointments,
        isLoggedIn,
        login,
        logout,
        activeQueue,
        callNextToken,
        addAppointment,
        updateAppointmentStatus,
        updateAppointmentNotes,
        rescheduleAppointment,
        cancelAppointment,
        resetToDemoData,
        clearAllAppointments,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className={`smart-toast smart-toast-${toast.type}`} role="alert">
          <div className="smart-toast-content">
            <span className="smart-toast-icon">
              {toast.type === "success" && "✓"}
              {toast.type === "error" && "✕"}
              {toast.type === "info" && "ℹ"}
            </span>
            <span className="smart-toast-msg">{toast.message}</span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="smart-toast-close"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
}

