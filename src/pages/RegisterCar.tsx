import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, CarFront, ScanLine } from 'lucide-react';
import './RegisterCar.css';

const RegisterCar = () => {
  const [vin, setVin] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [carDetails, setCarDetails] = useState<{make: string, model: string} | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [garage, setGarage] = useState<any[]>([]);

  const fetchGarage = async () => {
    try {
      const res = await fetch('/api/cars');
      setGarage(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGarage();
  }, []);

  useEffect(() => {
    if (vin.length === 17) {
      setIsDecoding(true);
      fetch(`/api/cars/decode/${vin}`)
        .then(res => res.json())
        .then(data => {
          setCarDetails({ make: data.make, model: data.model });
          setIsDecoding(false);
        })
        .catch(() => setIsDecoding(false));
    } else {
      setCarDetails(null);
    }
  }, [vin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length !== 17) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/cars/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      
      setCarDetails({ make: data.make, model: data.model });
      setStatus('success');
      fetchGarage();
      setTimeout(() => {
        setStatus('idle');
        setVin('');
        setCarDetails(null);
      }, 3000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="container page-shell page-enter-active register-page">
      <div className="register-layout">
        <section className="register-intro">
          <span className="eyebrow">Garage setup</span>
          <h1 className="text-gradient-primary">Register your vehicle</h1>
          <p className="subtitle">Enter a 17-character VIN to create a cleaner service history and unlock smarter parts and mechanic recommendations.</p>

          <div className="register-highlights">
            <div className="surface-card highlight-card">
              <ScanLine size={20} />
              <div>
                <strong>VIN lookup in flow</strong>
                <p>Decode before saving so users get confidence early.</p>
              </div>
            </div>
            <div className="surface-card highlight-card">
              <CarFront size={20} />
              <div>
                <strong>Persistent garage</strong>
                <p>Every registered car stays available as a reusable profile.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="glass-panel register-card">
          <div className="register-card-header">
            <h2>Vehicle details</h2>
            <p>Use uppercase VIN format for best matching.</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="vin" className="field-label">Vehicle Identification Number</label>
              <input 
                type="text" 
                id="vin" 
                value={vin}
                onChange={(e) => { setVin(e.target.value.toUpperCase()); setStatus('idle'); }}
                placeholder="1HGCM82633A004352"
                maxLength={17}
                className="vintage-input"
              />
            </div>
            
            {isDecoding && (
              <div className="register-note">
                Decoding VIN and checking vehicle data...
              </div>
            )}
            
            {!isDecoding && carDetails && status !== 'success' && (
               <div className="decoded-car">
                 <p>
                   <strong>Vehicle found:</strong> {carDetails.make} {carDetails.model}
                 </p>
               </div>
            )}
            
            {status === 'error' && (
              <div className="status-message error">
                <AlertCircle size={18} />
                <span>Please enter a valid 17-character VIN, or this car may already be registered.</span>
              </div>
            )}

            {status === 'success' && (
              <div className="status-message success register-success">
                <div className="register-success-line">
                  <CheckCircle size={18} />
                  <span>Vehicle registered successfully.</span>
                </div>
                {carDetails && (
                  <div className="register-success-copy">
                    Saved to your garage: <strong>{carDetails.make} {carDetails.model}</strong>
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary register-submit" 
              disabled={status === 'loading' || status === 'success' || vin.length !== 17 || isDecoding}
            >
              {status === 'loading' ? 'Saving...' : 'Register vehicle'}
            </button>
          </form>
        </div>
      </div>

      <div className="garage-section">
        <h2 className="garage-title text-gradient-primary">
          <CarFront size={28} /> My Garage
        </h2>
        {garage.length === 0 ? (
          <p className="subtitle garage-empty">No cars in your garage yet.</p>
        ) : (
          <div className="garage-grid">
            {garage.map(car => (
              <div key={car.id} className="surface-card garage-card">
                <CarFront size={44} className="garage-icon" />
                <h3>{car.make}</h3>
                <h4>{car.model}</h4>
                <div className="garage-vin">
                  <p>{car.vin}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterCar;
