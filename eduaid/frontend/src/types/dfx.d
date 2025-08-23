// Global typings to appease TS when importing dfx-generated JS files
// Place this file anywhere included by tsconfig (e.g., src/types/dfx.d.ts)

// Typed Candid IDL factory for direct imports like:
// import { idlFactory } from "../../declarations/user_profiles/user_profiles.did.js";
declare module "*.did.js" {
  import type { IDL } from "@dfinity/candid";
  export const idlFactory: IDL.InterfaceFactory;
}

// Convenience typings for imports from declaration folders, e.g.:
// import { idlFactory, canisterId } from "../../declarations/user_profiles";
declare module "*/declarations/*" {
  import type { IDL } from "@dfinity/candid";
  export const idlFactory: IDL.InterfaceFactory;
  export const canisterId: string;
  // dfx sometimes generates a helper; keep it loose.
  export const createActor: any;
}
