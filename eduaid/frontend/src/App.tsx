// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Register from "./pages/register";
// import Login from "./pages/login";
// import StudentDashboard from "./pages/dashboards/student";
// import SponsorDashboard from "./pages/dashboards/sponsor";
// import VerifierDashboard from "./pages/dashboards/verifier";
// import AdminDashboard from "./pages/dashboards/admin";
// import Home from "./pages/home";
// import LoginProfileCard from "./components/loginprofilecard";
// import { AuthProvider } from "./contexts/AuthContext";

// export default function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold">EduAid</h1>
//             <p className="text-gray-600">
//               Decentralized Education Sponsorship on ICP
//             </p>
//           </div>

//           {/* Auth/Profile login card visible on home */}
//           <Routes>
//             <Route path="/" element={<><LoginProfileCard /><Home /></>} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard/student" element={<StudentDashboard />} />
//             <Route path="/dashboard/sponsor" element={<SponsorDashboard />} />
//             <Route path="/dashboard/verifier" element={<VerifierDashboard />} />
//             <Route path="/dashboard/admin" element={<AdminDashboard />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
//       </AuthProvider>
//     </Router>
//   );
// }


// src/App.tsx
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

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
