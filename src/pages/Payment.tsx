import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, ShieldCheck, Lock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00');
  const [mechanic, setMechanic] = useState('Verified Mechanic');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    // If we passed state from another page (e.g., Messages / Mechanics)
    if (location.state) {
      if (location.state.amount) setAmount(location.state.amount);
      if (location.state.mechanicName) setMechanic(location.state.mechanicName);
    }
  }, [location.state]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        navigate('/profile'); // Redirect to profile or history after success
      }, 3000);
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="container page-enter-active payment-container" style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', borderRadius: '24px', maxWidth: '500px', width: '100%' }}>
          <CheckCircle size={64} className="text-primary" style={{ margin: '0 auto 24px auto' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Payment Successful!</h2>
          <p className="subtitle" style={{ marginBottom: '32px' }}>
            You have successfully sent <strong>{amount} JOD</strong> to {mechanic}. Your maintenance log has been automatically updated.
          </p>
          <button className="btn-secondary" onClick={() => navigate('/profile')}>View Receipt</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-enter-active payment-container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="payment-header text-center" style={{ marginBottom: '40px' }}>
        <h1 className="text-gradient-primary">Secure Checkout</h1>
        <p className="subtitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ShieldCheck size={18} className="text-primary" /> Powered by Seyarti Pay encrypted gateway
        </p>
      </div>

      <div className="payment-grid">
        <div className="payment-summary glass-panel">
          <h2 style={{ marginBottom: '24px', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Order Summary</h2>
          <div className="summary-row">
            <span>Mechanic / Shop</span>
            <strong>{mechanic}</strong>
          </div>
          <div className="summary-row">
            <span>Service Description</span>
            <span>Auto Repair Services</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total Payable</span>
            <span className="text-primary" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{amount} JOD</span>
          </div>
        </div>

        <div className="payment-form-card glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Payment Details</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="card-icon" style={{ background: '#1a1f36' }}>Visa</div>
              <div className="card-icon" style={{ background: '#ff5f00' }}>MC</div>
            </div>
          </div>
          
          <form className="checkout-form" onSubmit={handlePayment}>
            <div className="input-group">
              <label>Name on Card</label>
              <input type="text" className="vintage-input" placeholder="Tariq Al-Hassan" required disabled={status === 'processing'} />
            </div>
            <div className="input-group">
              <label>Card Number</label>
              <div style={{ position: 'relative' }}>
                <CreditCard size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input type="text" className="vintage-input" placeholder="0000 0000 0000 0000" maxLength={19} required disabled={status === 'processing'} style={{ paddingLeft: '44px' }} />
              </div>
            </div>
            
            <div className="payment-row">
              <div className="input-group" style={{ flex: 1 }}>
                <label>Expiry (MM/YY)</label>
                <input type="text" className="vintage-input" placeholder="12/28" maxLength={5} required disabled={status === 'processing'} />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>CVC</label>
                <input type="text" className="vintage-input" placeholder="123" maxLength={4} required disabled={status === 'processing'} />
              </div>
            </div>
            
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '24px', padding: '16px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} disabled={status === 'processing'}>
              {status === 'processing' ? 'Processing...' : (
                <>
                 <Lock size={18} /> Pay {amount} JOD
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
