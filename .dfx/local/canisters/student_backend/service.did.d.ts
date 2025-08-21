import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Donation {
  'date' : bigint,
  'amount' : bigint,
  'donor' : string,
}
export interface Notification { 'createdAt' : bigint, 'message' : string }
export interface Profile {
  'institution' : string,
  'name' : string,
  'createdAt' : bigint,
  'fundingStatus' : string,
  'updatedAt' : bigint,
  'course' : string,
}
export interface Request {
  'id' : bigint,
  'status' : string,
  'createdAt' : bigint,
  'description' : string,
}
export interface Update { 'content' : string, 'createdAt' : bigint }
export interface _SERVICE {
  'addDonation' : ActorMethod<[string, bigint], Donation>,
  'addNotification' : ActorMethod<[string], Notification>,
  'createRequest' : ActorMethod<[string], Request>,
  'getDonations' : ActorMethod<[], Array<Donation>>,
  'getNotifications' : ActorMethod<[], Array<Notification>>,
  'getProfile' : ActorMethod<[], [] | [Profile]>,
  'getRequests' : ActorMethod<[], Array<Request>>,
  'getUpdates' : ActorMethod<[], Array<Update>>,
  'postUpdate' : ActorMethod<[string], Update>,
  'saveProfile' : ActorMethod<[string, string, string, string], Profile>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
