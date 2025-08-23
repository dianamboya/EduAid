import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Contribution {
  'id' : ContributionId,
  'createdAt' : bigint,
  'needId' : NeedId,
  'amount_e8s' : bigint,
  'donor' : Principal,
}
export type ContributionId = bigint;
export type Error = { 'NotVerified' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'AlreadyExists' : null } |
  { 'BadInput' : string } |
  { 'InvalidState' : string };
export interface Need {
  'id' : NeedId,
  'status' : NeedStatus,
  'funded_e8s' : bigint,
  'title' : string,
  'token' : [] | [TokenId],
  'createdAt' : bigint,
  'tags' : Array<string>,
  'subaccount' : Uint8Array | number[],
  'description' : string,
  'updatedAt' : bigint,
  'category' : string,
  'target_e8s' : bigint,
  'student' : Principal,
  'proofs' : Array<string>,
}
export type NeedId = bigint;
export type NeedStatus = { 'Open' : null } |
  { 'Closed' : null } |
  { 'Proposed' : null } |
  { 'Funded' : null } |
  { 'Cancelled' : null };
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = {
    'ok' : {
      'contributionId' : ContributionId,
      'accepted_e8s' : bigint,
      'remaining_e8s' : bigint,
    }
  } |
  { 'err' : Error };
export type Result_2 = { 'ok' : NeedId } |
  { 'err' : Error };
export type Result_3 = { 'ok' : TokenId } |
  { 'err' : Error };
export type TokenId = bigint;
export interface _SERVICE {
  'add_admin' : ActorMethod<[Principal], Result>,
  'add_sponsor' : ActorMethod<[Principal], Result>,
  'add_student' : ActorMethod<[Principal], Result>,
  'add_verifier' : ActorMethod<[Principal], Result>,
  'approve_need' : ActorMethod<[NeedId, [] | [string]], Result_3>,
  'cancel_need' : ActorMethod<[NeedId], Result>,
  'close_need' : ActorMethod<[NeedId], Result>,
  'get_need' : ActorMethod<[NeedId], [] | [Need]>,
  'is_admin' : ActorMethod<[Principal], boolean>,
  'is_sponsor' : ActorMethod<[Principal], boolean>,
  'is_student_role' : ActorMethod<[Principal], boolean>,
  'is_student_verified' : ActorMethod<[Principal], boolean>,
  'is_verifier_role' : ActorMethod<[Principal], boolean>,
  'list_contributions' : ActorMethod<[NeedId], Array<Contribution>>,
  'list_needs' : ActorMethod<[bigint, bigint], Array<Need>>,
  'list_needs_by_student' : ActorMethod<[Principal], Array<Need>>,
  'need_subaccount' : ActorMethod<[NeedId], Uint8Array | number[]>,
  'propose_need' : ActorMethod<
    [string, string, string, bigint, Array<string>, Array<string>],
    Result_2
  >,
  'record_deposit' : ActorMethod<[NeedId, Principal, bigint], Result_1>,
  'register_sponsor' : ActorMethod<[], undefined>,
  'register_student' : ActorMethod<[], undefined>,
  'remove_admin' : ActorMethod<[Principal], Result>,
  'remove_sponsor' : ActorMethod<[Principal], Result>,
  'remove_student' : ActorMethod<[Principal], Result>,
  'remove_verifier' : ActorMethod<[Principal], Result>,
  'token_of_need' : ActorMethod<[NeedId], [] | [TokenId]>,
  'token_owner' : ActorMethod<[TokenId], [] | [Principal]>,
  'verify_student' : ActorMethod<[Principal], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
