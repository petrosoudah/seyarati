import { Menu, Sparkles, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { to: '/register', label: 'Garage' },
    { to: '/parts', label: 'Parts' },
    { to: '/mechanics', label: 'Mechanics' },
    { to: '/messages', label: 'Messages' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <NavLink to="/" className="navbar-logo">
          <div className="navbar-logo-mark">
            <img src="/logo.png" alt="Seyarti Logo" />
          </div>
          <div className="navbar-logo-copy">
            <span className="navbar-logo-title">Seyarti</span>
            <span className="navbar-logo-subtitle">Smart ownership layer</span>
          </div>
        </NavLink>

        <div className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="navbar-badge">
            <Sparkles size={14} />
            <span>2026 refresh</span>
          </div>
          <NavLink to="/profile" className="profile-link">
            <UserCircle size={20} /> Profile
          </NavLink>
          <button className="nav-menu-button" type="button" aria-label="Navigation menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
