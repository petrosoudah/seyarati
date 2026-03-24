import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="Seyarti Logo" style={{ height: '36px', borderRadius: '8px' }} />
          <span className="text-gradient-primary" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>seyarti_v1</span>
        </Link>
        <div className="navbar-links">
          <Link to="/register">Register Car</Link>
          <Link to="/parts">Parts Search</Link>
          <Link to="/mechanics">Find Mechanics</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/profile" className="profile-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserCircle size={20} /> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
