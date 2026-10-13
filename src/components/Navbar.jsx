import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("clinicLoggedIn") === "true"
  );

  const handleLogout = () => {
    localStorage.removeItem("clinicLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav>
      <h2>SmartClinic</h2>

      <div>
        <a href="/">Home</a>
        <a href="/doctors">Doctors</a>
        <a href="/appointments">Appointments</a>

        {isLoggedIn ? (
          <>
            <a href="/clinic-dashboard">Clinic Dashboard</a>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <a href="/clinic-login">Clinic Login</a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;