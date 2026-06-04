import { useState } from 'react';

const AddBlood = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API to persist blood data
    alert(`Successfully added ${quantity} units of ${bloodGroup}`);
    setBloodGroup('');
    setQuantity('');
  };

  return (
    <div className="add-blood-container">
      <h2>Add Blood Information</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <div className="form-group">
          <label>Blood Group: </label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required style={{ width: '100%', padding: '8px' }}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity (in units): </label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="1" style={{ width: '100%', padding: '8px' }}/>
        </div>
        <button type="submit" style={{ padding: '10px' }}>Add Blood</button>
      </form>
    </div>
  );
};

export default AddBlood;