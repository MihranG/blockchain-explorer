export interface ITransaction {
    blockHash: string;
    blockNumber: "0xbbdef8",
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

export interface IResponseResult {
    difficulty: string,
    extraData: string,
    gasLimit: string,
    gasUsed: string,
    hash: string,
    logsBloom: string,
    miner: string,
    mixHash: string,
    nonce: string,
    number: string,
    parentHash: string,
    receiptsRoot: string,
    sha3Uncles:  string,
    size:  string,
    stateRoot:  string,
    timestamp:  string,
    totalDifficulty:  string,
    transactions: ITransaction[],
    transactionsRoot: string
    uncles: any[]
}



export interface IResponseData{
    jsonrpc: string,
    id: number,
    result: IResponseResult | null
}
