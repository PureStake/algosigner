export const JSONRPC_VERSION: string = "2.0";

export enum JsonRpcMethod {
    SignTransaction = "sign-transaction"
}

export type JsonRpcParams = Array<string | number | undefined>;

export type JsonRpcBody = {
    readonly jsonrpc: string;
    readonly method: JsonRpcMethod;
    readonly params: JsonRpcParams;
    readonly id: string;
}

export type JsonRpcResponse = string;