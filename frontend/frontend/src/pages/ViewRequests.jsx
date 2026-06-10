import { useState, useEffect } from 'react';
import { getHospitalRequests } from '../services/api';
import { getUser } from '../utils/auth';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getHospitalRequests(user?.hospital_id);
        setRequests(response.data || []);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    // The backend does not currently have an endpoint for updating the status of a request.
    // Simulating the update on the frontend for UI purposes.
    alert(`Request ${newStatus}! (Note: Backend endpoint for status updates is not yet implemented)`);
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus.toLowerCase() } : req));
  };

  if (loading) return <div className="page-wrapper" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading requests...</div>;

  return (
    <div className="page-wrapper">
      <div className="glass-card">
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Blood Requests</h2>
        {requests.length === 0 ? (
          <p>No requests at the moment.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Receiver Name</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.receiver_name}</td>
                    <td><span className="status-badge status-available">{req.blood_group}</span></td>
                    <td>
                      <span className={`status-badge status-${req.status.toLowerCase()}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status.toLowerCase() === 'pending' && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => handleUpdateStatus(req.id, 'Approved')} style={{ backgroundColor: 'var(--success-color)', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Approve</button>
                          <button onClick={() => handleUpdateStatus(req.id, 'Rejected')} style={{ backgroundColor: 'var(--danger-color)', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Reject</button>
                        </div>
                      )}
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

export default ViewRequests;