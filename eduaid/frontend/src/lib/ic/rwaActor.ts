// File: frontend/src/lib/rwaActor.ts
// Creates a typed actor for the RWA registry with robust canisterId + host resolution.

import { Actor, HttpAgent } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

// Import only the DID (no Node globals)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { idlFactory as rwaIdl } from "dfx-declarations/rwa_registry/rwa_registry.did.js";

// Keep a copy of canister_ids.json inside src/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import canisterIds from "@/canister_ids.json";

// Minimal service type. Extend with your candid if desired.
export interface RwaRegistryActor {
  list_students: () => Promise<any[]>;
  register_student: (profile: any) => Promise<number>;
  update_student_needs: (id: number, needs: string[]) => Promise<void>;
  submit_for_verification: (id: number) => Promise<void>;
}

function getEnv(key: string): string | undefined {
  return (import.meta as any).env?.[key] as string | undefined;
}

function resolveRwaCanisterId(): string {
  // Accept either variable name to be flexible with existing code
  const fromEnv = getEnv("VITE_RWA_CANISTER_ID") || getEnv("VITE_RWA_REGISTRY_CANISTER_ID");
  if (fromEnv) return fromEnv;

  const env = (import.meta as any).env ?? {};
  const network = env.VITE_DFX_NETWORK ?? (env.MODE === "production" ? "ic" : "local");

  const entry = (canisterIds as any)["rwa_registry"] || (canisterIds as any)["rwa"];
  const id = entry?.[network];
  if (!id) {
    throw new Error(
      "RWA canister id not found. Set VITE_RWA_CANISTER_ID or copy canister_ids.json into src/ (with rwa_registry.ic/local)."
    );
  }
  return id as string;
}

function resolveHost(): string {
  const env = (import.meta as any).env ?? {};
  // Why: If host points at Vite server, agent receives HTML → CBOR decode error.
  return env.VITE_IC_HOST || (env.DEV ? "http://127.0.0.1:4943" : "https://icp0.io");
}

export async function createRwaActor(
  opts?: { agent?: HttpAgent; idlFactory?: IDL.InterfaceFactory; host?: string }
): Promise<RwaRegistryActor> {
  const canisterId = resolveRwaCanisterId();
  const host = opts?.host ?? resolveHost();
  const agent = opts?.agent ?? new HttpAgent({ host });
  if (host.includes("127.0.0.1") || import.meta.env.DEV) {
    // Required for local replica certificate chain
    await agent.fetchRootKey();
  }
  const idl = (opts?.idlFactory ?? (rwaIdl as IDL.InterfaceFactory));
  return Actor.createActor<RwaRegistryActor>(idl, { agent, canisterId });
}


// Aliases to avoid name collisions with app-level AuthContext
export { useAuth as useIcAuth, AuthProvider as IcAuthProvider };
