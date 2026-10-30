import { Link } from "react-router-dom";
import { StethoscopeIcon } from "../components/Icons";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-icon-badge">
          <StethoscopeIcon size={48} />
        </div>
        <span className="notfound-code">404</span>
        <h1>Page Not Found</h1>
        <p>The page or medical record you are looking for doesn't exist or has moved.</p>
        <div className="notfound-actions">
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
          <Link to="/appointment" className="btn-secondary">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

