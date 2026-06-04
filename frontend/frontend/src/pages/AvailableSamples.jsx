import { useState } from 'react';

const AvailableSamples = () => {
  const [samples, setSamples] = useState([
    { id: 1, hospitalName: 'City Hospital', bloodGroup: 'A+', quantity: 10 },
    { id: 2, hospitalName: 'General Med', bloodGroup: 'O-', quantity: 5 },
    { id: 3, hospitalName: 'City Hospital', bloodGroup: 'B+', quantity: 8 },
  ]);

  const handleRequest = (sampleId) => {
    // TODO: Send POST request to backend API to request sample
    alert(`Request sent successfully for sample ID: ${sampleId}`);
    
    // Update state to decrease quantity and remove the row if quantity becomes 0
    setSamples((prevSamples) =>
      prevSamples
        .map((sample) => (sample.id === sampleId ? { ...sample, quantity: sample.quantity - 1 } : sample))
        .filter((sample) => sample.quantity > 0)
    );
  };

  return (
    <div className="available-samples-container">
      <h2>Available Blood Samples</h2>
      {samples.length === 0 ? (
        <p>No samples available at the moment.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hospital</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Blood Group</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity Available</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => (
              <tr key={sample.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sample.hospitalName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sample.bloodGroup}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sample.quantity} units</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button onClick={() => handleRequest(sample.id)} style={{ padding: '5px 10px', cursor: 'pointer' }}>Request Sample</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AvailableSamples;