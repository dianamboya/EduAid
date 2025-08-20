import { useState } from "react";
import { Users, GraduationCap, Globe, ShieldCheck, Settings, FileBarChart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", donations: 400 },
  { name: "Feb", donations: 800 },
  { name: "Mar", donations: 600 },
  { name: "Apr", donations: 1200 },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex min-h-screen bg-blue-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6">Admin Panel</h2>
          <nav className="flex flex-col gap-4 px-4">
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${activeSection === "overview" && "bg-blue-700"}`}
              onClick={() => setActiveSection("overview")}
            >
              <FileBarChart className="w-5 h-5 mr-2" /> Overview
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${activeSection === "students" && "bg-blue-700"}`}
              onClick={() => setActiveSection("students")}
            >
              <GraduationCap className="w-5 h-5 mr-2" /> Students
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${activeSection === "sponsors" && "bg-blue-700"}`}
              onClick={() => setActiveSection("sponsors")}
            >
              <Users className="w-5 h-5 mr-2" /> Sponsors
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${activeSection === "verification" && "bg-blue-700"}`}
              onClick={() => setActiveSection("verification")}
            >
              <ShieldCheck className="w-5 h-5 mr-2" /> Verification
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${activeSection === "reports" && "bg-blue-700"}`}
              onClick={() => setActiveSection("reports")}
            >
              <Globe className="w-5 h-5 mr-2" /> Reports
            </Button>
            <Button
              variant="ghost"
              className={`justify-start text-white hover:bg-blue-700 ${activeSection === "settings" && "bg-blue-700"}`}
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
        {/* Overview Section */}
        {activeSection === "overview" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">1,200</h3>
                  <p className="text-gray-500">Students</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <Users className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">850</h3>
                  <p className="text-gray-500">Sponsors</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <Globe className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">$350K</h3>
                  <p className="text-gray-500">Donations</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">45</h3>
                  <p className="text-gray-500">Pending Verifications</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Donations Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="donations" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Students Management */}
        {activeSection === "students" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Program</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">Computer Science</td>
                  <td className="p-3">Verified</td>
                  <td className="p-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Edit</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Sponsors Management */}
        {activeSection === "sponsors" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Sponsors</h1>
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Total Donated</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Jane Smith</td>
                  <td className="p-3">jane@example.com</td>
                  <td className="p-3">$5,000</td>
                  <td className="p-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Verification */}
        {activeSection === "verification" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Pending Verification</h1>
            <Card className="bg-white shadow-md p-6 mb-4">
              <h3 className="font-semibold">Michael Johnson</h3>
              <p className="text-gray-500 mb-2">Economics, University of Nairobi</p>
              <div className="flex gap-4">
                <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
                <Button className="bg-red-600 hover:bg-red-700">Reject</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Reports */}
        {activeSection === "reports" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
            <p>Coming soon... (graphs, donor impact analysis, etc.)</p>
          </div>
        )}

        {/* Settings */}
        {activeSection === "settings" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">System Settings</h1>
            <Card className="bg-white shadow-md p-6">
              <p>Admin can configure system preferences here.</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
