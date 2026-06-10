import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [userType, setUserType] = useState('receiver');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const payload = {
        role: userType,
        email: formData.email,
        password: formData.password,
      };
      
      if (userType === 'hospital') {
        payload.hospital_name = formData.name;
        payload.address = formData.address;
      } else {
        payload.receiver_name = formData.name;
        payload.blood_group = formData.bloodGroup;
      }

      const response = await registerUser(payload);
      if (response.data.success || response.status === 201) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(response.data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Create an Account</h2>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            type="button" 
            className={userType === 'receiver' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setUserType('receiver')}
            style={{ flex: 1 }}
          >
            Receiver
          </button>
          <button 
            type="button" 
            className={userType === 'hospital' ? 'btn-primary' : 'btn-outline'} 
            onClick={() => setUserType('hospital')}
            style={{ flex: 1 }}
          >
            Hospital
          </button>
        </div>
        
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center', backgroundColor: '#FEE2E2', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>{userType === 'hospital' ? 'Hospital Name' : 'Full Name'}</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter name" />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter email" />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a password" />
          </div>
          
          {userType === 'receiver' && (
            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
            </div>
          )}
          
          {userType === 'hospital' && (
            <div className="form-group">
              <label>Hospital Address</label>
              <input type="text" name="address" value={formData.address || ''} onChange={handleChange} required placeholder="Enter full address" />
            </div>
          )}
          
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
