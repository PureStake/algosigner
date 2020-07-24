import {Task} from './fn/task';
import {Router} from './fn/router';

class Wrapper {
    private static instance: Wrapper;
    private task: Task = new Task();
    private router: Router = new Router();
    
    public connect: Function = this.task.connect;
    public sign: Function = this.task.sign;
    public accounts: Function = this.task.accounts;
    public algod: Function = this.task.algod;
    public indexer: Function = this.task.indexer;
    public subscribe: Function = this.task.subscribe;

    public static getInstance(): Wrapper {
        if (!Wrapper.instance) {
            Wrapper.instance = new Wrapper();
        }
        return Wrapper.instance;
    }
}

export const AlgoSigner = Wrapper.getInstance();