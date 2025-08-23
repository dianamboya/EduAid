
import { useEffect, useMemo, useState } from "react";
import { computeFunding, fetchMyProfile, saveProfile, submitForVerification } from "../../lib/eduaidAgent";
import { useAuth } from "../../lib/ic/auth";
import type { StudentProfile } from "../../types";
import { ProfileForm, type ProfileFormValues } from "./ProfileForm";

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

export default function StudentProfilePage() {
  const { isReady, isAuthenticated, login, principal, agent } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "complete">("overview");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [fundingPct, setFundingPct] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
  }, [agent, principal]);

  const handleSave = async (v: ProfileFormValues) => {
    if (!agent || !principal) return;
    setSaving(true);
    try {
      const id = await saveProfile(agent, principal, profile, v);
      setProfile({ ...(profile ?? ({} as StudentProfile)), id, principal, lifecycle: profile?.lifecycle ?? "pending", ...v, created_at: profile?.created_at ?? BigInt(Date.now()), updated_at: BigInt(Date.now()) });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (v: ProfileFormValues) => {
    if (!agent || !principal) return;
    setSubmitting(true);
    try {
      const id = await saveProfile(agent, principal, profile, v);
      await submitForVerification(agent, id);
      const updated = await fetchMyProfile(agent, principal);
      setProfile(updated);
      setActiveTab("overview");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isReady) return <div className="p-6">Loading…</div>;
  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="mb-4">Sign in with Internet Identity to view and complete your profile.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2" onClick={login}>
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status</span>
          <Badge tone={lifecycleTone}>{profile?.lifecycle ?? "—"}</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          {[
            { id: "overview", label: "Overview" },
            { id: "complete", label: profile ? "Edit / Complete" : "Complete Profile" },
          ].map((t) => (
            <button
              key={t.id}
              className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium ${
                activeTab === (t.id as typeof activeTab)
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
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
              <div className="text-gray-600">No profile yet — go to <b>Complete Profile</b> to get started.</div>
            )}
          </div>

          <div className="rounded-xl shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-4">Funding</h2>
            <div className="flex items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-3 mr-4">
                <div className="h-3 rounded-full bg-blue-600" style={{ width: `${fundingPct}%` }} />
              </div>
              <span className="text-sm font-medium">{fundingPct}% Sponsored</span>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2" onClick={() => setActiveTab("complete")}>Edit Profile</button>
          </div>
        </div>
      )}

      {activeTab === "complete" && (
        <div className="rounded-xl shadow-md p-6 border">
          <h2 className="text-xl font-semibold mb-4">{profile ? "Edit / Complete Profile" : "Create Profile"}</h2>
          <ProfileForm initial={profile ?? undefined} onSave={handleSave} onSubmit={handleSubmit} saving={saving} submitting={submitting} />
        </div>
      )}
    </div>
  );
}
