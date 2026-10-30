import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useClinic } from "../context/ClinicContext";
import {
  StethoscopeIcon,
  TvIcon,
  LogOutIcon,
  LogInIcon,
  CalendarIcon,
  UserIcon,
} from "./Icons";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, logout } = useClinic();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="smart-nav">
      <div className="nav-container">
        {/* BRAND LOGO */}
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="brand-icon-wrapper">
            <StethoscopeIcon size={22} />
          </div>
          <div className="brand-text">
            <h2>Smart<span>Clinic</span></h2>
            <span className="brand-tagline">Healthcare Portal</span>
          </div>
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* NAV LINKS */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/doctors"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            Find Doctors
          </NavLink>

          <NavLink
            to="/appointment"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            Book Appointment
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            My Appointments
          </NavLink>

          {/* LIVE OPD QUEUE LINK */}
          <NavLink
            to="/queue"
            className={({ isActive }) => (isActive ? "nav-link live-queue-link active" : "nav-link live-queue-link")}
            onClick={closeMenu}
          >
            <span className="live-ping-dot"></span>
            <TvIcon size={16} />
            <span>Live OPD Queue</span>
          </NavLink>

          {/* CLINIC STAFF CONTROLS */}
          {isLoggedIn ? (
            <div className="staff-nav-group">
              <NavLink
                to="/clinic-dashboard"
                className={({ isActive }) => (isActive ? "nav-link staff-link active" : "nav-link staff-link")}
                onClick={closeMenu}
              >
                Clinic Dashboard
              </NavLink>

              <button className="nav-logout-btn" onClick={handleLogout} title="Log out">
                <LogOutIcon size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/clinic-login"
              className={({ isActive }) => (isActive ? "nav-login-btn active" : "nav-login-btn")}
              onClick={closeMenu}
            >
              <LogInIcon size={16} />
              <span>Clinic Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
