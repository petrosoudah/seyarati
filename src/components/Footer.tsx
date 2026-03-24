import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <span className="text-gradient-primary">Seyarti</span>
        </div>
        <div className="footer-text">
          &copy; {new Date().getFullYear()} Seyarti. All rights reserved. For Car Owners in Jordan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
