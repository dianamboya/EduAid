
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import StudentDashboard from "./pages/dashboards/student";
import SponsorDashboard from "./pages/dashboards/sponsor";
import VerifierDashboard from "./pages/dashboards/verifier";
import AdminDashboard from "./pages/dashboards/admin";
import Chatbot from "./components/Chatbot";
// Internet Identity provider for ICP (aliased to avoid name collision)
import { AuthProvider as ICAuthProvider } from "@/lib/ic/auth";
import StudentProfilePage from "./components/profile/ProfileView";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* App's existing auth context */}
      <AuthProvider>
        {/* Internet Identity context for canister calls (StudentProfilePage etc.) */}
        <ICAuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chatbot" element={<Chatbot />} />

            {/* Dashboards */}
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/sponsor"
              element={
                <ProtectedRoute>
                  <SponsorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/verifier"
              element={
                <ProtectedRoute>
                  <VerifierDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Student on-chain profile (new) */}
            <Route
              path="/dashboard/student/profile"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <StudentProfilePage />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </ICAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
