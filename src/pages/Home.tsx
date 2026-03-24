import { Car, Wrench, MapPin, MessageCircle, Bot } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="page-enter-active">
      {/* Hero Section */}
      <section className="home-hero">
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2400" alt="Luxury Sports Car" className="hero-background" style={{ objectFit: 'cover' }} />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title text-gradient-primary">
            Your Car's Best <br/>Companion in Jordan
          </h1>
          <p className="hero-subtitle">
            The ultimate platform for car owners. Register your vehicle, find the best parts, discover top-rated mechanics, and get AI-powered assistance all in one place.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => window.location.href='/register'}>Get Started Now</button>
            <button className="btn-secondary" onClick={() => window.location.href='/mechanics'}>Find a Mechanic</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title">Everything You Need</h2>
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Car size={28} />
            </div>
            <h3 className="feature-title">Vehicle Registration</h3>
            <p className="feature-desc">Easily register your car using its VIN number to get personalized parts and service recommendations.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Wrench size={28} />
            </div>
            <h3 className="feature-title">Parts Marketplace</h3>
            <p className="feature-desc">Search and discover the exact spare parts you need from verified sellers across Jordan.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <MapPin size={28} />
            </div>
            <h3 className="feature-title">Local Mechanics</h3>
            <p className="feature-desc">Find trusted mechanics in your area, read raw reviews, and ensure your car gets the best care.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <MessageCircle size={28} />
            </div>
            <h3 className="feature-title">Direct Messaging</h3>
            <p className="feature-desc">Communicate directly with mechanics directly through our secure platform to ask for quotes or advice.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Bot size={28} />
            </div>
            <h3 className="feature-title">AI Assistant</h3>
            <p className="feature-desc">Have a question? Our intelligent Seyarti AI is available 24/7 to provide immediate car advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
