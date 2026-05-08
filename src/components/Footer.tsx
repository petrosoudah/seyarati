import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="text-gradient-primary">Seyarti</span>
          </div>
          <p className="footer-text">
            Jordan’s car care OS for owners who want less friction and better decisions.
          </p>
        </div>
        <div className="footer-meta">
          <span>Marketplace</span>
          <span>Mechanics</span>
          <span>AI support</span>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Seyarti. Designed for a sharper 2026 experience.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
