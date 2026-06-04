import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout, isAuthenticated } from '../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BloodBank</Link>
      </div>
      <div className="navbar-links">
        {isAuth ? (
          <>
            <span className="navbar-greeting">Hello, {user.hospital_name || user.receiver_name}</span>
            {user.role === 'hospital' && (
              <>
                <Link to="/add-blood-info">Add Blood Info</Link>
                <Link to="/blood-info">View Inventory</Link>
                <Link to="/view-requests">View Requests</Link>
              </>
            )}
            {user.role === 'receiver' && (
              <>
                <Link to="/available-samples">Available Blood</Link>
              </>
            )}
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
