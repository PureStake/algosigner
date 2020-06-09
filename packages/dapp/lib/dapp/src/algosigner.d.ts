declare class Wrapper {
    private static instance;
    private task;
    private router;
    connect: Function;
    sign: Function;
    query: Function;
    subscribe: Function;
    static getInstance(): Wrapper;
}
export declare const AlgoSigner: Wrapper;
export {};
