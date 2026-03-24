import { useState, useEffect } from 'react';
import { Search, Filter, Wrench } from 'lucide-react';
import './Parts.css';

const Parts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState('All Makes');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/parts?make=${filterMake}&category=${filterCategory}`);
        const data = await res.json();
        setParts(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchParts();
  }, [filterMake, filterCategory]);

  const filteredParts = parts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container page-enter-active" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="parts-header">
        <h1 className="text-gradient-primary">Spare Parts Marketplace</h1>
        <p className="subtitle">Find genuine and aftermarket parts from verified sellers across Jordan.</p>
      </div>

      <div className="parts-layout">
        <aside className="parts-filters glass-panel">
          <div className="filter-header">
            <Filter size={20} />
            <h3>Filters</h3>
          </div>
          
          <div className="filter-group">
            <label>Car Make</label>
            <select className="vintage-input" style={{ padding: '10px' }} value={filterMake} onChange={(e) => setFilterMake(e.target.value)}>
              <option>All Makes</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Hyundai</option>
              <option>Universal</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select className="vintage-input" style={{ padding: '10px' }} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option>All Categories</option>
              <option>Engine</option>
              <option>Brakes</option>
              <option>Tires</option>
              <option>Fluids</option>
              <option>Exterior</option>
            </select>
          </div>
        </aside>

        <main className="parts-main">
          <div className="search-bar glass-panel">
            <Search size={20} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search by part name, brand, or car make..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="parts-grid">
            {loading ? <p>Loading parts...</p> : filteredParts.map(part => (
              <div key={part.id} className="part-card glass-panel">
                <div className="part-image-placeholder">
                  {part.image ? (
                    <img src={part.image} alt={part.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Wrench size={40} color="rgba(255,255,255,0.1)" />
                  )}
                </div>
                <div className="part-info">
                  <span className="part-category">{part.category} &bull; {part.make}</span>
                  <h3 className="part-name">{part.name}</h3>
                  <p className="part-seller">Seller: {part.seller}</p>
                  <div className="part-footer">
                    <span className="part-price">{part.price}</span>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Contact</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
export default Parts;
