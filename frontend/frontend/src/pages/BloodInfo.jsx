import { useState } from 'react';

const BloodInfo = () => {
  const [inventory] = useState([
    { id: 1, bloodGroup: 'A+', quantity: 15 },
    { id: 2, bloodGroup: 'O-', quantity: 8 },
    { id: 3, bloodGroup: 'B+', quantity: 12 },
    { id: 4, bloodGroup: 'AB+', quantity: 4 },
  ]);

  return (
    <div className="blood-info-container">
      <h2>Current Blood Inventory</h2>
      {inventory.length === 0 ? (
        <p>No blood available in the inventory at the moment.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Blood Group</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity (Units)</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.bloodGroup}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BloodInfo;