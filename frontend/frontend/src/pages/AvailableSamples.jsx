import { useState, useEffect } from 'react';
import { getAvailableSamples, requestSample } from '../services/api';
import { getUser } from '../utils/auth';

const AvailableSamples = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    const loadSamples = async () => {
      try {
        const response = await getAvailableSamples();
        setSamples(response.data || []);
      } catch (error) {
        console.error("Failed to fetch samples", error);
      } finally {
        setLoading(false);
      }
    };
    loadSamples();
  }, []);

  const handleRequest = async (sampleId) => {
    try {
      const response = await requestSample({
        receiver_id: user?.receiver_id,
        sample_id: sampleId
      });
      if (response.data?.success || response.status === 201) {
        alert('Request sent successfully!');
        // Refresh samples to reflect quantity changes
        try {
          const updatedResponse = await getAvailableSamples();
          setSamples(updatedResponse.data || []);
        } catch (err) {
          console.error("Failed to refresh samples", err);
        }
      } else {
        alert(response.data?.message || response.data?.error || 'Failed to send request');
      }
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || 'You have already requested this sample or an error occurred.');
    }
  };

  if (loading) return <div className="page-wrapper" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading samples...</div>;

  return (
    <div className="page-wrapper">
      <div className="glass-card">
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Available Blood Samples</h2>
        {samples.length === 0 ? (
          <p>No samples available at the moment.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Blood Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((sample) => (
                  <tr key={sample.sample_id}>
                    <td>{sample.hospital_name}</td>
                    <td><span className="status-badge status-available">{sample.blood_group}</span></td>
                    <td>
                      <button className="btn-primary" onClick={() => handleRequest(sample.sample_id)}>Request Sample</button>
                    </td>
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

export default AvailableSamples;