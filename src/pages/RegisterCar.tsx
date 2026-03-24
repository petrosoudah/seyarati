import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, CarFront } from 'lucide-react';
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
    <div className="container page-enter-active" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="register-container">
        <div className="register-header">
          <h1 className="text-gradient-primary">Register Your Vehicle</h1>
          <p className="subtitle">Enter your 17-character VIN number to add your car to Seyarti.</p>
        </div>

        <div className="glass-panel register-card">
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="vin">Vehicle Identification Number (VIN)</label>
              <input 
                type="text" 
                id="vin" 
                value={vin}
                onChange={(e) => { setVin(e.target.value.toUpperCase()); setStatus('idle'); }}
                placeholder="e.g. 1HGCM82633A004..."
                maxLength={17}
                className="vintage-input"
              />
            </div>
            
            {isDecoding && (
              <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                Decoding VIN...
              </div>
            )}
            
            {!isDecoding && carDetails && status !== 'success' && (
               <div className="decoded-car glass-panel" style={{ padding: '12px', marginTop: '8px', marginBottom: '16px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)' }}>
                 <p style={{ margin: 0, fontSize: '0.9rem' }}>
                   <strong>Vehicle Found:</strong> {carDetails.make} {carDetails.model}
                 </p>
               </div>
            )}
            
            {status === 'error' && (
              <div className="status-message error">
                <AlertCircle size={18} />
                <span>Please enter a valid 17-character VIN. Or it's already registered.</span>
              </div>
            )}

            {status === 'success' && (
              <div className="status-message success" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} />
                  <span>Vehicle registered successfully!</span>
                </div>
                {carDetails && (
                  <div style={{ paddingLeft: '26px', fontSize: '0.9rem', opacity: 0.9 }}>
                    Saved: <strong>{carDetails.make} {carDetails.model}</strong>
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={status === 'loading' || status === 'success' || vin.length !== 17 || isDecoding}
              style={{ width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center' }}
            >
              {status === 'loading' ? 'Saving...' : 'Register Vehicle'}
            </button>
          </form>
        </div>
      </div>

      <div className="garage-section" style={{ marginTop: '80px' }}>
        <h2 className="text-gradient-primary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <CarFront size={28} /> My Garage
        </h2>
        {garage.length === 0 ? (
          <p className="subtitle" style={{ textAlign: 'center' }}>No cars in your garage yet.</p>
        ) : (
          <div className="garage-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {garage.map(car => (
              <div key={car.id} className="glass-panel" style={{ padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <CarFront size={48} color="var(--color-primary)" style={{ opacity: 0.8, marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem' }}>{car.make}</h3>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{car.model}</h4>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px', display: 'inline-block' }}>
                  <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.85rem', fontFamily: 'monospace', letterSpacing: '1px' }}>{car.vin}</p>
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
