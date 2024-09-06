import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : Array<Transaction> } |
  { 'err' : string };
export type Result_1 = { 'ok' : WalletInfo } |
  { 'err' : string };
export type Result_2 = { 'ok' : number } |
  { 'err' : string };
export type Time = bigint;
export interface Transaction {
  'id' : string,
  'recipient' : string,
  'timestamp' : Time,
  'amount' : number,
}
export interface WalletInfo {
  'id' : string,
  'balance' : number,
  'createdAt' : Time,
}
export interface _SERVICE {
  'createWallet' : ActorMethod<[], Result_1>,
  'fundWallet' : ActorMethod<[number], Result_2>,
  'getTransactionHistory' : ActorMethod<[], Array<Transaction>>,
  'getWalletInfo' : ActorMethod<[], Result_1>,
  'sendMassPayout' : ActorMethod<[Array<string>, number], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
