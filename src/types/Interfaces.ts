export interface ITransaction {
  blockHash: string;
  blockNumber: '0xbbdef8';
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
}

export interface IStringKeys {
  [key: string]: string;
}

export interface IResponseResultStrings {
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  logsBloom: string;
  number: string;
  receiptsRoot: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactionsRoot: string;
}

export interface IResponseResultHashes {
  hash: string;
  parentHash: string;
  sha3Uncles: string;
  stateRoot: string;
  nonce: string;
  miner: string;
  mixHash: string;
}

export interface IResponseResultArrays {
  transactions: ITransaction[];
  uncles: any[];
}

export type IResponseResult = IResponseResultArrays &
  IResponseResultStrings &
  IResponseResultHashes;

export interface IResponseData {
  jsonrpc: string;
  id: number;
  result: IResponseResult | null;
}

export interface IErrorObject {
  errorMessage: string;
}
