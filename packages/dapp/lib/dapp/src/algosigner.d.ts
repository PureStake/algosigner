declare class Wrapper {
    private static instance;
    private task;
    private router;
    connect: Function;
    sign: Function;
    accounts: Function;
    algod: Function;
    indexer: Function;
    subscribe: Function;
    static getInstance(): Wrapper;
}
export declare const AlgoSigner: Wrapper;
export {};
