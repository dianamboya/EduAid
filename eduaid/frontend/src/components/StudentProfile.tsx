import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/ic/auth";
import { fetchMyProfile, computeFunding } from "@/lib/eduaidAgent";
import type { StudentProfile } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Badge({ children, tone = "gray" as const }) {
  const map: Record<string, string> = {
    gray: "bg-gray-200 text-gray-900",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[tone]}`}>{children}</span>;
}

export default function StudentProfileSection({ active }: { active: boolean }) {
  const nav = useNavigate();
  const { isReady, isAuthenticated, login, principal, agent } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [fundingPct, setFundingPct] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const lifecycleTone = useMemo(() => {
    switch (profile?.lifecycle) {
      case "verified":
        return "green";
      case "sponsored":
        return "blue";
      case "pending":
        return "yellow";
      case "revoked":
        return "red";
      default:
        return "gray";
    }
  }, [profile?.lifecycle]);

  useEffect(() => {
    if (!active) return;
    if (!agent || !principal) return;
    (async () => {
      setLoading(true);
      const p = await fetchMyProfile(agent, principal);
      setProfile(p);
      if (p) {
        try {
          const f = await computeFunding(agent, p.id);
          setFundingPct(Math.round(f.percent));
        } catch {
          setFundingPct(0);
        }
      }
      setLoading(false);
    })();
  }, [active, agent, principal]);

  if (!active) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status</span>
          <Badge tone={lifecycleTone}>{profile?.lifecycle ?? "—"}</Badge>
        </div>
      </div>

      {!isReady ? (
        <div className="text-gray-600">Loading…</div>
      ) : !isAuthenticated ? (
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="mb-4">Sign in with Internet Identity to view and edit your profile.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={login}>
              Sign in
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              {loading ? (
                <p>Loading…</p>
              ) : profile ? (
                <div className="grid gap-2">
                  <p>
                    <span className="font-semibold">Name:</span> {profile.full_name}
                  </p>
                  <p>
                    <span className="font-semibold">Institution:</span> {profile.school}
                  </p>
                  <p>
                    <span className="font-semibold">County:</span> {profile.county}
                  </p>
                  <p>
                    <span className="font-semibold">Date of Birth:</span> {profile.date_of_birth}
                  </p>
                  <p>
                    <span className="font-semibold">Needs:</span> {profile.needs?.join(", ")}
                  </p>
                </div>
              ) : (
                <div className="text-gray-600">No profile yet — click Edit Profile to complete your details.</div>
              )}
            </div>
            <div>
              <p>
                <span className="font-semibold">Funding Status:</span> {fundingPct}% Sponsored
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div className="h-3 rounded-full bg-blue-600" style={{ width: `${fundingPct}%` }} />
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => nav("/dashboard/student/profile")}> 
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
