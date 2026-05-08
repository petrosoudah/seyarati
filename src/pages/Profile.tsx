import { useState } from 'react';
import { User, Settings, Clock, Wrench, ChevronRight, CreditCard, Save } from 'lucide-react';
import './Profile.css';

const MOCK_HISTORY = [
  { id: 1, date: '2026-03-12', service: 'Fixed the engine (i think)', mechanic: 'Bob\'s Fix-It Shop (WIP)', cost: '45.00 JOD' },
  { id: 2, date: '2026-01-05', service: 'Squeaky pads replaced', mechanic: 'Cool Cars Inc. (Testing)', cost: '78.50 JOD' },
  { id: 3, date: '2025-10-22', service: 'Tire rotated maybe', mechanic: 'Vroom Vroom Garage', cost: '25.00 JOD' },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Tariq Al-Hassan',
    email: 'tariq.hassan@example.com',
    phone: '+962 79 123 4567',
    city: 'Amman'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app this would POST to /api/users/profile
    setIsEditing(false);
  };

  return (
    <div className="container page-shell page-enter-active">
      <div className="profile-header page-header">
        <h1 className="text-gradient-primary profile-title">
          <User size={36} /> My Profile
        </h1>
        <p className="subtitle">Manage your account settings and vehicle maintenance history.</p>
      </div>

      <div className="profile-grid">
        {/* Settings Panel */}
        <div className="glass-panel profile-card settings-panel">
          <div className="card-header">
            <h2><Settings size={22} className="text-primary" /> Account Details</h2>
            {!isEditing ? (
               <button className="btn-secondary btn-sm" onClick={() => setIsEditing(true)}>Edit Profile</button>
            ) : (
               <button className="btn-primary btn-sm" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                 <Save size={16} /> Save
               </button>
            )}
          </div>
          
          <div className="profile-form">
            <div className="input-group">
              <label className="field-label">Full Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} className="vintage-input" />
            </div>
            <div className="input-group">
              <label className="field-label">Email Address</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={!isEditing} className="vintage-input" />
            </div>
            <div className="input-group">
              <label className="field-label">Phone Number</label>
              <input type="tel" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditing} className="vintage-input" />
            </div>
            <div className="input-group">
              <label className="field-label">Primary City</label>
              <input type="text" name="city" value={profile.city} onChange={handleChange} disabled={!isEditing} className="vintage-input" />
            </div>
          </div>
          
          <div className="wallet-section">
            <h3><CreditCard size={20} className="text-primary"/> Seyarti Digital Wallet</h3>
            <p>Connect a card to enable intuitive 1-click payments to registered mechanics directly on the platform.</p>
            <button className="btn-secondary wallet-button">Manage Payment Methods</button>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="history-panel">
          <div className="glass-panel profile-card profile-history-card">
            <div className="card-header history-card-header">
              <h2><Clock size={22} className="text-primary" /> Maintenance History</h2>
            </div>
            
            <div className="history-timeline">
              {MOCK_HISTORY.map((log) => (
                <div key={log.id} className="history-item">
                  <div className="history-icon">
                    <Wrench size={16} />
                  </div>
                  <div className="history-content glass-panel">
                    <div className="history-meta">
                      <span className="history-date">{log.date}</span>
                      <span className="history-cost">{log.cost}</span>
                    </div>
                    <h3 className="history-service">{log.service}</h3>
                    <p className="history-mechanic">Performed by: {log.mechanic}</p>
                    <button className="btn-link history-link">
                      View Receipt <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn-secondary history-button">Add Maintenance Log</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
