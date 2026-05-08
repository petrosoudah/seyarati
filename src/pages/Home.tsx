import { ArrowRight, Bot, Car, MapPin, MessageCircle, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import './Home.css';

const Home = () => {
  const stats = [
    { label: 'Verified workshops', value: '280+' },
    { label: 'Parts suppliers', value: '1.2k' },
    { label: 'Avg. response time', value: '< 4 min' },
  ];

  const features = [
    {
      icon: Car,
      title: 'Vehicle Registration',
      desc: 'Register once and keep your car profile, VIN lookup, and maintenance context in one place.',
    },
    {
      icon: Wrench,
      title: 'Parts Marketplace',
      desc: 'Browse cleaner listings with fitment context, verified sellers, and price visibility across Jordan.',
    },
    {
      icon: MapPin,
      title: 'Local Mechanics',
      desc: 'Find trusted garages by city, specialty, availability, and service quality signals.',
    },
    {
      icon: MessageCircle,
      title: 'Direct Messaging',
      desc: 'Move from discovery to quote fast with chat, payment handoff, and clearer repair coordination.',
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      desc: 'Ask for diagnosis help, part guidance, and next-step recommendations without leaving the app.',
    },
  ];

  return (
    <div className="page-enter-active">
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>Rebuilt for modern car ownership</span>
            </div>
            <h1 className="hero-title">
              A cleaner, smarter <span className="text-gradient-primary">Seyarti</span> for 2026.
            </h1>
            <p className="hero-subtitle">
              Manage your garage, compare parts, book trusted mechanics, and pay securely through a calmer interface that finally feels premium.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => window.location.href='/register'}>
                Start your garage
                <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => window.location.href='/mechanics'}>
                Find a mechanic
              </button>
            </div>

            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat surface-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-panel surface-card">
              <div className="hero-panel-top">
                <span className="dashboard-pill">Live marketplace</span>
                <span className="dashboard-pill alt">Jordan-wide</span>
              </div>

              <div className="hero-car-card">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600"
                  alt="Luxury sports car"
                  className="hero-car-image"
                />
                <div className="hero-car-copy">
                  <div>
                    <p>Connected garage</p>
                    <h3>BMW M4 Coupe</h3>
                  </div>
                  <span>Service score 94</span>
                </div>
              </div>

              <div className="hero-feed">
                <div className="hero-feed-card">
                  <ShieldCheck size={18} />
                  <div>
                    <strong>Verified repair flow</strong>
                    <p>Quote, message, and pay in one place.</p>
                  </div>
                </div>
                <div className="hero-feed-card">
                  <Bot size={18} />
                  <div>
                    <strong>AI assistance</strong>
                    <p>Quick diagnosis help with next best actions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Platform layers</span>
            <h2 className="section-title">Everything you need, without the clutter.</h2>
          </div>
          <p className="subtitle">
            The refresh focuses on clearer hierarchy, faster scanning, and stronger trust cues across the product.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="feature-card surface-card">
                <div className="feature-icon-wrapper">
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
