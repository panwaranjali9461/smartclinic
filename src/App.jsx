import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Appointments from "./pages/Appointments";
import ClinicDashboard from "./pages/ClinicDashboard";
import ClinicLogin from "./pages/ClinicLogin";
import Doctors from "./pages/Doctors";
import "./App.css";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-main">

        <div className="footer-brand">
          <h2>SmartClinic</h2>

          <p>
            Making healthcare simpler, faster and more
            accessible through technology.
          </p>

          <div className="footer-contact">
            <span>📍 Jaipur, Rajasthan</span>
            <span>✉ support@smartclinic.com</span>
            <span>☎ +91 98765 43210</span>
          </div>
        </div>


        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/doctors">Find a Doctor</a>
          <a href="/appointment">Book Appointment</a>
          <a href="/appointments">My Appointments</a>
        </div>


        <div className="footer-column">
          <h3>Our Services</h3>

          <a href="/doctors">Doctor Consultation</a>
          <a href="/appointment">Health Checkup</a>
          <a href="/appointment">Lab Tests</a>
          <a href="/appointment">Preventive Care</a>
        </div>


        <div className="footer-column">
          <h3>For Clinics</h3>

          <a href="/clinic-login">Clinic Login</a>
          <a href="/clinic-dashboard">Clinic Dashboard</a>

          <p className="footer-small-text">
            Manage appointments and keep your
            clinic workflow organized.
          </p>
        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 SmartClinic. All rights reserved.
        </p>

        <div className="footer-legal">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
        </div>

      </div>

    </footer>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/appointment"
          element={<Appointment />}
        />

        <Route
          path="/appointments"
          element={<Appointments />}
        />

        <Route
          path="/clinic-dashboard"
          element={<ClinicDashboard />}
        />

        <Route
          path="/clinic-login"
          element={<ClinicLogin />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;