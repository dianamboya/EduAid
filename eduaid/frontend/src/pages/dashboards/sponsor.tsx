import { useState } from "react";
import {
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SponsorDashboard() {
  const [activeSection, setActiveSection] = useState("students");

  return (
    <div className="flex min-h-screen bg-blue-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6">Sponsor Panel</h2>
          <nav className="flex flex-col gap-4 px-4">
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "students" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("students")}
            >
              <GraduationCap className="w-5 h-5 mr-2" /> Browse Students
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "donations" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("donations")}
            >
              <DollarSign className="w-5 h-5 mr-2" /> My Donations
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "updates" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("updates")}
            >
              <FileText className="w-5 h-5 mr-2" /> Student Updates
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "notifications" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("notifications")}
            >
              <Bell className="w-5 h-5 mr-2" /> Notifications
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${
                activeSection === "settings" && "bg-blue-700"
              }`}
              onClick={() => setActiveSection("settings")}
            >
              <Settings className="w-5 h-5 mr-2" /> Settings
            </Button>
          </nav>
        </div>
        <div className="p-4">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Browse Students */}
        {activeSection === "students" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Browse Students</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 shadow-md">
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-gray-500">Computer Science - 65% funded</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Sponsor</Button>
              </Card>
              <Card className="p-6 shadow-md">
                <h3 className="font-semibold">Jane Smith</h3>
                <p className="text-gray-500">Medicine - 40% funded</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Sponsor</Button>
              </Card>
            </div>
          </div>
        )}

        {/* Donations */}
        {activeSection === "donations" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">My Donations</h1>
            <Card className="p-6 shadow-md">
              <ul className="space-y-3">
                <li>✅ $200 donated to John Doe - Aug 2025</li>
                <li>✅ $150 donated to Jane Smith - Jul 2025</li>
              </ul>
            </Card>
          </div>
        )}

        {/* Student Updates */}
        {activeSection === "updates" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Student Updates</h1>
            <Card className="p-6 shadow-md">
              <p><strong>John Doe:</strong> "Thank you for the support! I passed my semester exams."</p>
            </Card>
            <Card className="p-6 shadow-md mt-4">
              <p><strong>Jane Smith:</strong> "Your funding helped me buy essential medical books."</p>
            </Card>
          </div>
        )}

        {/* Notifications */}
        {activeSection === "notifications" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            <Card className="p-6 shadow-md">
              <ul className="space-y-2">
                <li>📩 You have 2 new student sponsorship requests.</li>
                <li>🎉 A student you sponsored just posted an update.</li>
              </ul>
            </Card>
          </div>
        )}

        {/* Settings */}
        {activeSection === "settings" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
            <Card className="p-6 shadow-md">
              <p>Update payment methods, profile details, or preferences.</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
