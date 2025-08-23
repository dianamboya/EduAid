
import { useMemo, useState } from "react";
import type { Need, StudentProfile } from "../../types";

export interface ProfileFormValues {
  full_name: string;
  school: string;
  county: string;
  date_of_birth: string;
  guardian_contact?: string;
  needs: Need[];
}

export function ProfileForm({
  initial,
  onSave,
  onSubmit,
  saving,
  submitting,
}: {
  initial?: StudentProfile | null;
  onSave: (values: ProfileFormValues) => Promise<void>;
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  saving?: boolean;
  submitting?: boolean;
}) {
  const [values, setValues] = useState<ProfileFormValues>(
    initial
      ? {
          full_name: initial.full_name,
          school: initial.school,
          county: initial.county,
          date_of_birth: initial.date_of_birth?.slice(0, 10) ?? "",
          guardian_contact: initial.guardian_contact ?? "",
          needs: initial.needs as Need[],
        }
      : { full_name: "", school: "", county: "", date_of_birth: "", guardian_contact: "", needs: [] }
  );

  const canSubmit = useMemo(() => {
    return (
      values.full_name.trim() &&
      values.school.trim() &&
      values.county.trim() &&
      values.date_of_birth.trim() &&
      values.needs.length > 0
    );
  }, [values]);

  const toggleNeed = (n: Need) => {
    setValues((v) => ({ ...v, needs: v.needs.includes(n) ? v.needs.filter((x) => x !== n) : [...v.needs, n] }));
  };

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit(values);
      }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium">Full Name</span>
          <input
            className="border rounded-md p-2"
            value={values.full_name}
            onChange={(e) => setValues({ ...values, full_name: e.target.value })}
            placeholder="Jane Njeri"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">School / Institution</span>
          <input
            className="border rounded-md p-2"
            value={values.school}
            onChange={(e) => setValues({ ...values, school: e.target.value })}
            placeholder="University of Nairobi"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">County</span>
          <input
            className="border rounded-md p-2"
            value={values.county}
            onChange={(e) => setValues({ ...values, county: e.target.value })}
            placeholder="Nairobi"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Date of Birth</span>
          <input
            type="date"
            className="border rounded-md p-2"
            value={values.date_of_birth}
            onChange={(e) => setValues({ ...values, date_of_birth: e.target.value })}
          />
        </label>
        <label className="grid gap-1 md:col-span-2">
          <span className="text-sm font-medium">Guardian Contact (optional)</span>
          <input
            className="border rounded-md p-2"
            value={values.guardian_contact}
            onChange={(e) => setValues({ ...values, guardian_contact: e.target.value })}
            placeholder="+2547xxxxxxx"
          />
        </label>
      </div>

      <fieldset className="border rounded-md p-3">
        <legend className="px-1 text-sm font-medium">Needs</legend>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {(["fees", "pads", "books", "uniforms", "mentorship"] as Need[]).map((n) => (
            <label key={n} className="flex items-center gap-2">
              <input type="checkbox" checked={values.needs.includes(n)} onChange={() => toggleNeed(n)} />
              <span className="capitalize">{n}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
          onClick={() => onSave(values)}
          disabled={!!saving}
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 disabled:opacity-50"
          disabled={!canSubmit || !!submitting}
        >
          {submitting ? "Submitting..." : "Submit for Verification"}
        </button>
      </div>
    </form>
  );
}

