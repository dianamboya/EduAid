// Path: frontend/src/components/StudentRequests.tsx
import { useEffect, useMemo, useState } from "react";
import { createRwaActor } from "../lib/ic/rwaActor"; // keep your path
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Principal } from "@dfinity/principal";

function icpToE8s(n: number) {
  return BigInt(Math.round(n * 1e8));
}

type Need = {
  id: bigint;
  student: string;
  category: string;
  title: string;
  description: string;
  target_e8s: bigint;
  funded_e8s: bigint;
  status: Record<string, null>;
  token: [] | [bigint];
  createdAt: bigint;
  updatedAt: bigint;
  tags: string[];
  proofs: string[];
  subaccount: number[];
};

export default function StudentRequests() {
  const { actor, agent }: any = useMemo(() => createRwaActor(), []);

  const [me, setMe] = useState<string>("");
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [category, setCategory] = useState("School Fees");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState("1");

  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const statusLabel = (s: Record<string, null>) => Object.keys(s)[0];

  async function refresh() {
    setError(null);
    setNotice(null);
    try {
      const anon = await agent.getPrincipal();
      // Normalize to @dfinity/principal instance to avoid CBOR encode issues
      const p = Principal.fromText(anon.toText());
      setMe(p.toText());

      const [studentRole, verified] = await Promise.all([
        actor.is_student_role(p),
        actor.is_student_verified(p),
      ]);
      setIsStudent(studentRole);
      setIsVerified(verified);

      const list: Need[] = await actor.list_needs_by_student(p);
      setNeeds(list);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function ensureStudentRole() {
    if (!isStudent) {
      await actor.register_student();
      setNotice(
        "Registered as student. Ask a verifier/admin to verify your account."
      );
      await refresh();
    }
  }

  async function submit() {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      await ensureStudentRole();
      if (!isVerified) {
        setError(
          "Your account is not verified yet. A verifier/admin must verify you before proposing a need."
        );
        setLoading(false);
        return;
      }
      const t = Number(target);
      if (!title.trim() || !desc.trim() || isNaN(t) || t <= 0) {
        setError("Provide title, description, and a positive ICP target.");
        setLoading(false);
        return;
      }
      const res = await actor.propose_need(
        category,
        title.trim(),
        desc.trim(),
        icpToE8s(t),
        [],
        []
      );
      if ("err" in res) throw new Error(JSON.stringify(res.err));
      setTitle("");
      setDesc("");
      setTarget("1");
      setNotice("Request submitted. Awaiting verifier/admin approval.");
      await refresh();
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Funding Requests</h1>

      <Card className="shadow-md mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Create New Request</h2>
          {me && (
            <div className="text-xs text-gray-500 mb-2">
              Principal: <code>{me}</code>
            </div>
          )}
          {!isStudent && (
            <div className="mb-3 text-amber-700 text-sm">
              You are not registered as a student yet. Submitting will auto-register you.
            </div>
          )}
          {!isVerified && (
            <div className="mb-3 text-amber-700 text-sm">
              Not verified. A verifier/admin must verify you before approval.
            </div>
          )}
          {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
          {notice && <div className="mb-3 text-green-700 text-sm">{notice}</div>}

          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option>School Fees</option>
              <option>Sanitary Pads</option>
              <option>Books & Uniforms</option>
              <option>Mentorship & Guidance</option>
            </select>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (e.g., Semester 2 Tuition)"
              className="border rounded-lg p-3"
            />
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter request details..."
            className="w-full p-3 border rounded-lg mb-3"
          />
          <div className="flex items-center gap-2 mb-3">
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="border rounded-lg p-3 w-32"
            />
            <span className="text-sm text-gray-600">ICP target</span>
          </div>
          <Button
            disabled={loading}
            onClick={submit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Existing Requests</h2>
          <ul className="space-y-3">
            {needs.map((n) => (
              <li
                key={String(n.id)}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-2"
              >
                <div>
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600">
                    {n.category} • {statusLabel(n.status)} •
                    {" "}
                    {(Number(n.funded_e8s) / 1e8).toFixed(2)} /
                    {(Number(n.target_e8s) / 1e8).toFixed(2)} ICP
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={async () => {
                      const sub: number[] = await actor.need_subaccount(n.id);
                      const hex = Array.from(sub)
                        .map((b: number) => b.toString(16).padStart(2, "0"))
                        .join("");
                      alert(`Deposit subaccount (hex):\n${hex}`);
                    }}
                  >
                    Deposit Address
                  </Button>
                </div>
              </li>
            ))}
            {needs.length === 0 && (
              <li className="text-sm text-gray-600">No requests yet.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
