// File: frontend/src/lib/eduaidAgent.ts
import { createActor } from "./ic/agent";
import type { HttpAgent } from "@dfinity/agent";
import type { StudentProfile, FundingProgress, Need } from "../types";

// Import only the DID to avoid Node globals in generated index.js
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { idlFactory as rwaIdl } from "dfx-declarations/rwa_registry/rwa_registry.did.js";

// Keep a copy of canister_ids.json under src/ and import via alias
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import canisterIds from "@/canister_ids.json";

// ---- Types for the RWA registry actor
interface RwaRegistryActor {
  list_students: () => Promise<StudentProfile[]>;
  register_student: (profile: StudentProfile) => Promise<number>;
  update_student_needs: (id: number, needs: Need[]) => Promise<void>;
  submit_for_verification: (id: number) => Promise<void>;
}

function getCanisterId(name: string): string {
  const env = (import.meta as any).env ?? {};
  // Prefer env override when present
  const envKey = `VITE_${name.toUpperCase()}_CANISTER_ID`;
  const fromEnv = env[envKey];
  if (fromEnv) return fromEnv as string;

  // Fallback to JSON copied into src/
  const network = env?.VITE_DFX_NETWORK ?? (env?.MODE === "production" ? "ic" : "local");
  const ids = (canisterIds as any)[name];
  if (!ids) throw new Error(`canister_ids.json missing entry for ${name}`);
  const id = ids[network];
  if (!id) throw new Error(`canister_ids.json missing network '${network}' for ${name}`);
  return id as string;
}

export function getRwaRegistry(agent: HttpAgent): RwaRegistryActor {
  const canisterId = getCanisterId("rwa_registry");
  return createActor<RwaRegistryActor>({ agent, canisterId, idlFactory: rwaIdl });
}

export async function fetchMyProfile(agent: HttpAgent, principal: string): Promise<StudentProfile | null> {
  const rwa = getRwaRegistry(agent);
  const all = await rwa.list_students();
  return all.find((s) => s.principal === principal) ?? null;
}

// TEMP: Donation canister not wired yet → return zero funding to keep UI stable.
export async function computeFunding(_agent: HttpAgent, _rwaId: number): Promise<FundingProgress> {
  return { percent: 0, totalMinor: 0, currency: "KES" };
}

export async function saveProfile(
  agent: HttpAgent,
  principal: string,
  existing: StudentProfile | null,
  data: Omit<StudentProfile, "id" | "principal" | "created_at" | "updated_at" | "lifecycle"> & { needs: Need[] }
): Promise<number> {
  const rwa = getRwaRegistry(agent);
  const base: StudentProfile = {
    id: existing?.id ?? 0,
    principal,
    full_name: data.full_name,
    school: data.school,
    county: data.county,
    date_of_birth: data.date_of_birth,
    guardian_contact: data.guardian_contact,
    needs: data.needs,
    lifecycle: existing?.lifecycle ?? "pending",
    created_at: existing?.created_at ?? BigInt(Date.now()),
    updated_at: BigInt(Date.now()),
    verifier: existing?.verifier,
    sbt_token_id: existing?.sbt_token_id,
    meta_hash: existing?.meta_hash,
  };

  if (existing) {
    // For MVP we only update needs; extend with more update endpoints as you add them.
    await rwa.update_student_needs(existing.id, data.needs);
    return existing.id;
  }
  const id = await rwa.register_student(base);
  return id;
}

export async function submitForVerification(agent: HttpAgent, studentId: number): Promise<void> {
  const rwa = getRwaRegistry(agent);
  await rwa.submit_for_verification(studentId);
}
