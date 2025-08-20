import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router
import {
  ShieldCheck,
  GraduationCap,
  User,
  Flag,
  Bell,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function VerifierDashboard() {
  const [activeSection, setActiveSection] = useState("pending");
  const navigate = useNavigate(); // Correct hook for React Router

  const handleLogout = () => {
    // Clear tokens/cookies if needed
    // localStorage.removeItem("token");

    navigate("/"); // Correct React Router navigation
  };

  return (
    <div className="flex min-h-screen bg-blue-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6">Verifier Panel</h2>
          <nav className="flex flex-col gap-4 px-4">
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "pending" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("pending")}
            >
              <ShieldCheck className="w-5 h-5 mr-2" />
              Pending Verifications
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "students" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("students")}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Verified Students
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "flags" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("flags")}
            >
              <Flag className="w-5 h-5 mr-2" />
              Flagged Accounts
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "notifications" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("notifications")}
            >
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "chat" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("chat")}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Admin Chat
            </Button>
          </nav>
        </div>

        <div className="p-4">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Pending Verifications */}
        {activeSection === "pending" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Pending Verifications</h1>
            <Card className="p-6 shadow-md mb-4">
              <h3 className="font-semibold">John Doe - Computer Science</h3>
              <p className="text-gray-500 mb-2">University of Nairobi</p>
              <div className="flex gap-4">
                <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
                <Button className="bg-red-600 hover:bg-red-700">Reject</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Verified Students */}
        {activeSection === "students" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Verified Students</h1>
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Institution</th>
                  <th className="p-3 text-left">Verified On</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">Michael Johnson</td>
                  <td className="p-3">Kenyatta University</td>
                  <td className="p-3">12/08/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Flagged Accounts */}
        {activeSection === "flags" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Flagged Accounts</h1>
            <Card className="p-6 shadow-md">
              <h3 className="font-semibold">Jane Smith - Suspicious Activity</h3>
              <p className="text-gray-500 mb-2">Review flagged behavior</p>
              <div className="flex gap-4">
                <Button className="bg-yellow-600 hover:bg-yellow-700">Investigate</Button>
                <Button className="bg-red-600 hover:bg-red-700">Suspend</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Notifications */}
        {activeSection === "notifications" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            <Card className="p-6 shadow-md">
              <ul className="space-y-2">
                <li>🔔 5 new students waiting for verification.</li>
                <li>⚠️ 1 account flagged by the system.</li>
              </ul>
            </Card>
          </div>
        )}

        {/* Admin Chat */}
        {activeSection === "chat" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Admin Chat</h1>
            <Card className="p-6 shadow-md">
              <p className="mb-4">Communicate with the admin team in real time.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Open Chat</Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
