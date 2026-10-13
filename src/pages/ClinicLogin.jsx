import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClinicLogin.css";

function ClinicLogin() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = (e) => {
  e.preventDefault();

  if (
    email === "clinic@smartclinic.com" &&
    password === "clinic123"
  ) {
    alert("Login successful!");
    localStorage.setItem("clinicLoggedIn", "true");
    navigate("/clinic-dashboard");
  } else {
    alert("Invalid email or password.");
  }
};
  return (
    <div className="clinic-login-page">
      <div className="clinic-login-container">
        <h1>Clinic Login</h1>

        <p>Login to access the clinic dashboard.</p>

<form className="clinic-login-form" onSubmit={handleLogin}>          <div className="form-group">
            <label>Email Address</label>

            <input
  type="email"
  placeholder="Enter clinic email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
          </div>

          <div className="form-group">
            <label>Password</label>

           <input
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
          </div>

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClinicLogin;