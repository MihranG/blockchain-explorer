import { IResponseResultHashes } from '../types/Interfaces';
// type THashNames = {
//     'hash' |
//     'parentHash'|
//     'sha3Uncles'|
//     'stateRoot'|
//     'nonce'
// }

const arrayOfHashes: string[] = [
  'hash',
  'parentHash',
  'sha3Uncles',
  'stateRoot',
  'nonce',
  'miner',
  'mixHash',
];
export const setOfHashes = new Set(arrayOfHashes);
