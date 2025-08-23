
import { Actor, HttpAgent } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

/**
 * Why: Centralized actor factory avoids duplicating host/config logic.
 */
export function createActor<T>({
  agent,
  canisterId,
  idlFactory,
}: {
  agent: HttpAgent;
  canisterId: string;
  idlFactory: IDL.InterfaceFactory;
}): T {
  return Actor.createActor<T>(idlFactory, {
    agent,
    canisterId,
  });
}

