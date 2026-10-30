import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClinic } from "../context/ClinicContext";
import { ShieldIcon, MailIcon, StethoscopeIcon } from "../components/Icons";
import "./ClinicLogin.css";

function ClinicLogin() {
  const navigate = useNavigate();
  const { login } = useClinic();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) {
        navigate("/clinic-dashboard");
      }
    }, 300);
  };

  const handleQuickDemoFill = () => {
    setEmail("clinic@smartclinic.com");
    setPassword("clinic123");
  };

  return (
    <div className="clinic-login-page">
      <div className="clinic-login-container">
        <div className="login-badge-header">
          <div className="login-icon-box">
            <StethoscopeIcon size={26} />
          </div>
          <h1>Clinic Portal Login</h1>
          <p>Secure administrative access for Doctors, Nurses & Clinic Front Desk.</p>
        </div>

        {/* DEMO CREDENTIALS BANNER */}
        <div className="demo-credentials-card">
          <div className="demo-card-head">
            <ShieldIcon size={16} />
            <span>Staff Demo Credentials</span>
          </div>
          <div className="demo-creds-details">
            <div>
              <span>Email:</span> <code>clinic@smartclinic.com</code>
            </div>
            <div>
              <span>Password:</span> <code>clinic123</code>
            </div>
          </div>
          <button
            type="button"
            className="btn-fill-demo"
            onClick={handleQuickDemoFill}
          >
            ⚡ Auto-fill Demo Credentials
          </button>
        </div>

        <form className="clinic-login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Staff Email Address</label>
            <input
              type="email"
              placeholder="Enter clinic email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="smart-input"
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
              className="smart-input"
              required
            />
          </div>

          <button
            type="submit"
            className="clinic-login-submit-btn"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Clinic Dashboard →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClinicLogin;
