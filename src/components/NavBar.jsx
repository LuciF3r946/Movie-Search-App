import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link to="/" aria-current="page">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link" aria-current="page">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  );
}

export default NavBar;