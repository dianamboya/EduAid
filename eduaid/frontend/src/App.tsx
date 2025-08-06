import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import StudentDashboard from './pages/dashboards/student';
import SponsorDashboard from './pages/dashboards/sponsor';
import VerifierDashboard from './pages/dashboards/verifier';
import AdminDashboard from './pages/dashboards/admin';
import Home from './pages/home';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/sponsor" element={<SponsorDashboard />} />
          <Route path="/dashboard/verifier" element={<VerifierDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
