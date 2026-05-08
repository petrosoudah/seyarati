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
      <div className="container page-shell page-enter-active payment-success-shell">
        <div className="glass-panel payment-success-card">
          <CheckCircle size={64} className="text-primary payment-success-icon" />
          <h2>Payment Successful!</h2>
          <p className="subtitle payment-success-copy">
            You have successfully sent <strong>{amount} JOD</strong> to {mechanic}. Your maintenance log has been automatically updated.
          </p>
          <button className="btn-secondary" onClick={() => navigate('/profile')}>View Receipt</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-shell page-enter-active payment-container">
      <div className="payment-header page-header payment-header-center">
        <span className="eyebrow">Secure checkout</span>
        <h1 className="text-gradient-primary">Secure Checkout</h1>
        <p className="subtitle payment-subtitle">
          <ShieldCheck size={18} className="text-primary" /> Powered by Seyarti Pay encrypted gateway
        </p>
      </div>

      <div className="payment-grid">
        <div className="payment-summary glass-panel">
          <h2 className="payment-summary-title">Order Summary</h2>
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
            <span className="text-primary payment-total">{amount} JOD</span>
          </div>
        </div>

        <div className="payment-form-card glass-panel">
          <div className="payment-form-header">
            <h2>Payment Details</h2>
            <div className="card-icon-row">
              <div className="card-icon visa">Visa</div>
              <div className="card-icon mastercard">MC</div>
            </div>
          </div>
          
          <form className="checkout-form" onSubmit={handlePayment}>
            <div className="input-group">
              <label className="field-label">Name on Card</label>
              <input type="text" className="vintage-input" placeholder="Tariq Al-Hassan" required disabled={status === 'processing'} />
            </div>
            <div className="input-group">
              <label className="field-label">Card Number</label>
              <div className="payment-input-icon">
                <CreditCard size={18} className="payment-card-glyph" />
                <input type="text" className="vintage-input payment-card-input" placeholder="0000 0000 0000 0000" maxLength={19} required disabled={status === 'processing'} />
              </div>
            </div>
            
            <div className="payment-row">
              <div className="input-group">
                <label className="field-label">Expiry (MM/YY)</label>
                <input type="text" className="vintage-input" placeholder="12/28" maxLength={5} required disabled={status === 'processing'} />
              </div>
              <div className="input-group">
                <label className="field-label">CVC</label>
                <input type="text" className="vintage-input" placeholder="123" maxLength={4} required disabled={status === 'processing'} />
              </div>
            </div>
            
            <button type="submit" className="btn-primary payment-submit" disabled={status === 'processing'}>
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
