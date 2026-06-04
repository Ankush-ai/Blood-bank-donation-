import { Navigate } from 'react-router-dom';
import { getUser, isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children, roleRequired }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const user = getUser();
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
