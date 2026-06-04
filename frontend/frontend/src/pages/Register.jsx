import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userType, setUserType] = useState('receiver');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    // await axios.post('/api/register', { role: userType, ...formData });
    
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="user-type-selector">
        <button type="button" onClick={() => setUserType('receiver')} disabled={userType === 'receiver'}>As Receiver</button>
        <button type="button" onClick={() => setUserType('hospital')} disabled={userType === 'hospital'}>As Hospital</button>
      </div>
      
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>{userType === 'hospital' ? 'Hospital Name:' : 'Full Name:'}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {userType === 'receiver' && (
          <div className="form-group">
            <label>Blood Group:</label>
            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
