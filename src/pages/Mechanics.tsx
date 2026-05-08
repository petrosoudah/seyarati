import { useState, useEffect } from 'react';
import { Star, MapPin, MessageSquare, Phone, Crosshair } from 'lucide-react';
import './Mechanics.css';
import { useNavigate } from 'react-router-dom';

const Mechanics = () => {
  const navigate = useNavigate();
  const [filterArea, setFilterArea] = useState('All');
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await res.json();
        
        let foundArea = '';
        if (data.address) {
           const city = data.address.city || data.address.town || data.address.state || '';
           if (city.includes('Amman')) foundArea = 'Amman';
           else if (city.includes('Zarq') || city.includes('Zarqa')) foundArea = 'Zarqa';
           else if (city.includes('Irbid')) foundArea = 'Irbid';
        }
        
        if (foundArea) {
          setFilterArea(foundArea);
        } else {
          alert(`Location found (${data.address?.city || 'Unknown'}), but we only have mechanics in Amman, Zarqa, and Irbid currently.`);
        }
      } catch (err) {
        console.error(err);
      }
      setLoadingLocation(false);
    }, () => {
      setLoadingLocation(false);
      alert("Unable to retrieve your location. Check browser permissions.");
    });
  };

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const res = await fetch(`/api/mechanics?area=${filterArea}`);
        const data = await res.json();
        setMechanics(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMechanics();
  }, [filterArea]);

  const handleMessage = (id: number) => {
    navigate(`/messages?mechanic=${id}`);
  };

  return (
    <div className="container page-shell page-enter-active">
      <div className="mechanics-header page-header">
        <span className="eyebrow">Workshop discovery</span>
        <h1 className="text-gradient-primary">Find Top Mechanics</h1>
        <p className="subtitle">Discover highly-rated mechanics in your area.</p>
      </div>

      <div className="mechanics-toolbar glass-panel">
        <div className="location-filter">
          <MapPin size={20} color="var(--color-primary)" />
          <select 
            value={filterArea} 
            onChange={e => setFilterArea(e.target.value)}
            className="vintage-input mechanic-select"
          >
            <option value="All">All Regions</option>
            <option value="Amman">Amman</option>
            <option value="Zarqa">Zarqa</option>
            <option value="Irbid">Irbid</option>
          </select>
        </div>
        <button 
          className="btn-secondary" 
          onClick={handleUseMyLocation} 
          disabled={loadingLocation}
        >
          <Crosshair size={16} /> 
          {loadingLocation ? 'Locating...' : 'Use My Location'}
        </button>
      </div>

      <div className="mechanics-list">
        {mechanics.map(mechanic => (
          <div key={mechanic.id} className="mechanic-card surface-card">
            <div className="mechanic-content">
              <div className="mechanic-info-main">
                <div className="mechanic-title-row">
                  {mechanic.image && (
                    <img src={mechanic.image} alt={mechanic.name} className="mechanic-avatar" />
                  )}
                  <h3>{mechanic.name}</h3>
                  <span className={`status-badge ${mechanic.status.toLowerCase()}`}>{mechanic.status}</span>
                </div>
                <p className="mechanic-area"><MapPin size={16} /> {mechanic.area}</p>
                <div className="mechanic-rating">
                  <Star size={18} fill="var(--color-primary)" color="var(--color-primary)" />
                  <span className="rating-score">{mechanic.rating}</span>
                  <span className="rating-count">({mechanic.reviews} reviews)</span>
                </div>
                <div className="mechanic-specialty">
                  <strong>Specialty:</strong> {mechanic.specialty}
                </div>
              </div>
            </div>
            <div className="mechanic-actions">
              <button className="btn-secondary">
                <Phone size={18} /> Call Now
              </button>
              <button 
                className="btn-primary" 
                onClick={() => handleMessage(mechanic.id)}
              >
                <MessageSquare size={18} /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Mechanics;
