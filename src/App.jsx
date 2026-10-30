import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ClinicProvider } from "./context/ClinicContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Appointments from "./pages/Appointments";
import ClinicDashboard from "./pages/ClinicDashboard";
import ClinicLogin from "./pages/ClinicLogin";
import Doctors from "./pages/Doctors";
import QueueBoard from "./pages/QueueBoard";
import NotFound from "./pages/NotFound";
import { StethoscopeIcon } from "./components/Icons";
import "./App.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        {/* BRAND COLUMN */}
        <div className="footer-brand">
          <div className="footer-brand-header">
            <div className="footer-logo-badge">
              <StethoscopeIcon size={20} />
            </div>
            <h2>Smart<span>Clinic</span></h2>
          </div>

          <p>
            Smart OPD queuing and intelligent appointment booking system.
            Making quality healthcare accessible, transparent, and completely wait-free.
          </p>

          <div className="footer-contact">
            <span>📍 Plot 42, Health City, Jaipur, Rajasthan</span>
            <span>✉ support@smartclinic.com</span>
            <span>☎ +91 98765 43210 (24x7 Helpdesk)</span>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/doctors">Find a Doctor</Link>
          <Link to="/appointment">Book Appointment</Link>
          <Link to="/appointments">My Appointments</Link>
          <Link to="/queue">Live OPD Queue Board</Link>
        </div>

        {/* SERVICES */}
        <div className="footer-column">
          <h3>Our Services</h3>
          <Link to="/doctors">Doctor Consultation</Link>
          <Link to="/appointment?package=Full%20Body%20Checkup&price=1999">Full Body Checkup</Link>
          <Link to="/appointment?service=Lab%20Tests">Diagnostic Lab Tests</Link>
          <Link to="/appointment?service=Preventive%20Care">Preventive Healthcare</Link>
        </div>

        {/* FOR CLINICS */}
        <div className="footer-column">
          <h3>For Clinics & Staff</h3>
          <Link to="/clinic-login">Clinic Staff Login</Link>
          <Link to="/clinic-dashboard">Operations Dashboard</Link>
          <Link to="/queue">Waiting Lounge TV Screen</Link>
          <p className="footer-small-text">
            Streamline patient queues, approve slots, and manage prescriptions digitally.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SmartClinic Healthcare System. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Patient Charter</Link>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <ClinicProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/clinic-dashboard" element={<ClinicDashboard />} />
          <Route path="/clinic-login" element={<ClinicLogin />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/queue" element={<QueueBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ClinicProvider>
  );
}

export default App;
