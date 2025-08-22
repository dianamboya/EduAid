import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Message {
  'at' : bigint,
  'text' : string,
  'sender' : { 'bot' : null } |
    { 'user' : null },
}
export interface Reply { 'suggestions' : Array<string>, 'reply' : string }
export interface _SERVICE {
  'history' : ActorMethod<[bigint], Array<Message>>,
  'ping' : ActorMethod<[], string>,
  'sendWebMessage' : ActorMethod<[string], Reply>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
