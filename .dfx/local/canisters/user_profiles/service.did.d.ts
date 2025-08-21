import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Profile {
  'country' : [] | [string],
  'username' : string,
  'createdAt' : Timestamp,
  'email' : [] | [string],
  'phone' : [] | [string],
  'lastLogin' : Timestamp,
  'roles' : Array<string>,
}
export interface ProfileInput {
  'country' : [] | [string],
  'username' : string,
  'email' : [] | [string],
  'phone' : [] | [string],
  'roles' : [] | [Array<string>],
}
export type Timestamp = bigint;
export interface UserProfiles {
  'bootstrapAdmin' : ActorMethod<[], boolean>,
  'getProfile' : ActorMethod<[Principal], [] | [Profile]>,
  'grantRole' : ActorMethod<[Principal, string], [] | [Profile]>,
  'listProfiles' : ActorMethod<[], Array<[Principal, Profile]>>,
  'registerUser' : ActorMethod<[ProfileInput], Profile>,
  'updateLastLogin' : ActorMethod<[], [] | [Profile]>,
}
export interface _SERVICE extends UserProfiles {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
