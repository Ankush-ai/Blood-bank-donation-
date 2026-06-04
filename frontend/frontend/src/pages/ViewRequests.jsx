import { useState, useEffect } from 'react';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // TODO: Fetch requests from backend API for this hospital
    // Mock data for initial rendering
    const mockRequests = [
      { id: 1, receiverName: 'Alice Smith', bloodGroup: 'O+', quantity: 2, status: 'Pending' },
      { id: 2, receiverName: 'Bob Jones', bloodGroup: 'AB-', quantity: 1, status: 'Pending' },
    ];
    
    // Use setTimeout to defer state update and avoid cascading renders
    const timer = setTimeout(() => {
      setRequests(mockRequests);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    // TODO: Update status in backend API via PUT/PATCH request
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  return (
    <div className="view-requests-container">
      <h2>Blood Requests</h2>
      {requests.length === 0 ? (
        <p>No requests at the moment.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Receiver</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Blood Group</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{req.receiverName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{req.bloodGroup}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{req.quantity}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{req.status}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {req.status === 'Pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(req.id, 'Approved')} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Approve</button>
                      <button onClick={() => handleUpdateStatus(req.id, 'Rejected')} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewRequests;