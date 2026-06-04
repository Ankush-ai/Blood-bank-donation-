import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBloodInfo from './pages/AddBloodInfo';
import BloodInfo from './pages/BloodInfo';
import ViewRequests from './pages/ViewRequests';
import AvailableSamples from './pages/AvailableSamples';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container" style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Hospital Protected Routes */}
          <Route path="/add-blood-info" element={
            <ProtectedRoute roleRequired="hospital">
              <AddBloodInfo />
            </ProtectedRoute>
          } />
          <Route path="/blood-info" element={
            <ProtectedRoute roleRequired="hospital">
              <BloodInfo />
            </ProtectedRoute>
          } />
          <Route path="/view-requests" element={
            <ProtectedRoute roleRequired="hospital">
              <ViewRequests />
            </ProtectedRoute>
          } />
          
          {/* Receiver Protected Routes */}
          <Route path="/available-samples" element={
            <ProtectedRoute roleRequired="receiver">
              <AvailableSamples />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
