import { useState } from "react";
import {
  User,
  GraduationCap,
  FileText,
  PlusCircle,
  Bell,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication/session data
    localStorage.removeItem("eduaid-current-user");
    localStorage.removeItem("token"); // if using JWT
    navigate("/"); // Redirect to landing page
  };

  return (
    <div className="flex min-h-screen bg-blue-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6">Student Panel</h2>
          <nav className="flex flex-col gap-2 px-2">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "requests", label: "Funding Requests", icon: GraduationCap },
              { id: "donations", label: "Donations", icon: FileText },
              { id: "updates", label: "Updates", icon: PlusCircle },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "chatbot", label: "AI Chatbot", icon: MessageSquare },
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                aria-label={item.label}
                className={`justify-start w-full text-white hover:bg-blue-700 ${
                  activeSection === item.id ? "bg-blue-700 font-semibold" : ""
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-5 h-5 mr-2" /> {item.label}
              </Button>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Profile Section */}
        {activeSection === "profile" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <Card className="shadow-md">
              <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <p>
                    <span className="font-semibold">Name:</span> Student
                  </p>
                  <p>
                    <span className="font-semibold">Institution:</span> University of Nairobi
                  </p>
                  <p>
                    <span className="font-semibold">Course:</span> Computer Science
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Funding Status:</span> 65% Sponsored
                  </p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Funding Requests Section */}
        {activeSection === "requests" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">My Funding Requests</h1>
            <Card className="shadow-md mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Create New Request</h2>
                <textarea
                  placeholder="Enter request details..."
                  className="w-full p-3 border rounded-lg mb-3"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Submit Request
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Existing Requests</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Semester 2 Tuition - Pending</span>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Cancel
                    </Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Books & Materials - Funded</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      View
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Donations Section */}
        {activeSection === "donations" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">My Donations</h1>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Alice donated $100 on 01/08/2025</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Thank Donor
                    </Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Bob donated $50 on 10/08/2025</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Thank Donor
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Updates Section */}
        {activeSection === "updates" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">My Updates</h1>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <textarea
                  placeholder="Share your progress..."
                  className="w-full p-3 border rounded-lg mb-3"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Post Update
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === "notifications" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <ul className="space-y-2">
                  <li>✅ Your "Books & Materials" request was funded.</li>
                  <li>⏳ "Semester 2 Tuition" is under review.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chatbot Section */}
        {activeSection === "chatbot" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">AI Chatbot</h1>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <p className="mb-4">
                  Ask questions about your sponsorship, funding process, or system usage.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
