import { useState, useEffect } from 'react';
import { getAvailableSamples } from '../services/api';

const BloodInfo = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getAvailableSamples();
        setInventory(response.data || []);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  if (loading) return <div className="page-wrapper" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading inventory...</div>;

  return (
    <div className="page-wrapper">
      <div className="glass-card">
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Global Blood Inventory</h2>
        <p style={{ marginBottom: '1.5rem' }}>This shows all available blood samples across all hospitals.</p>
        
        {inventory.length === 0 ? (
          <p>No blood available in the inventory at the moment.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Blood Group</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.sample_id}>
                    <td>{item.hospital_name}</td>
                    <td><span className="status-badge status-available">{item.blood_group}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodInfo;