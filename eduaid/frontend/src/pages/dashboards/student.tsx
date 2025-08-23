import StudentRequests from "@/components/StudentRequests";
import StudentProfile from "@/components/StudentProfile";
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
        

        <StudentProfile active={activeSection === "profile"} />


        {activeSection === "requests" && (<StudentRequests />)}


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
                <a href="/chatbot" >
            Try the Chatbot
                </a>
                </Button>
              </CardContent>
            </Card>
          </div>

        
        )}
      </main>
    </div>
  );
}
