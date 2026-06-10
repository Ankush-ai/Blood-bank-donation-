import { useState } from 'react';
import { addBloodSample } from '../services/api';
import { getUser } from '../utils/auth';

const AddBloodInfo = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [loading, setLoading] = useState(false);
  const user = getUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addBloodSample({
        hospital_id: user?.hospital_id,
        blood_group: bloodGroup
      });
      if (response.data?.message || response.status === 201) {
        alert(`Successfully added blood group ${bloodGroup} to inventory`);
        setBloodGroup('');
      } else {
        alert('Failed to add sample');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add sample');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', textAlign: 'center' }}>Update Inventory</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Mark a blood group as available in your hospital's inventory.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Blood Group</label>
            <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option><option value="A-">A-</option>
              <option value="B+">B+</option><option value="B-">B-</option>
              <option value="O+">O+</option><option value="O-">O-</option>
              <option value="AB+">AB+</option><option value="AB-">AB-</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Updating...' : 'Set Available'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBloodInfo;