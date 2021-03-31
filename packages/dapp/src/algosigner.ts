import { Task } from './fn/task';
import { Router } from './fn/router';
import { HTTPClient } from './fn/client';

class Wrapper {
  private static instance: Wrapper;
  private task: Task = new Task();
  private router: Router = new Router();

  public connect: Function = this.task.connect;
  public sign: Function = this.task.sign;
  public signMultisig: Function = this.task.signMultisig;
  public send: Function = this.task.send;
  public accounts: Function = this.task.accounts;
  public algod: Function = this.task.algod;
  public indexer: Function = this.task.indexer;
  public subscribe: Function = this.task.subscribe;

  public getAlgodHTTPClient(ledger: string): HTTPClient {
    this.task.connect();
    return new HTTPClient(ledger, this.task.algod);
  }

  public getIndexerHTTPClient(ledger: string): HTTPClient {
    this.task.connect();
    return new HTTPClient(ledger, this.task.indexer);
  }

  public static getInstance(): Wrapper {
    if (!Wrapper.instance) {
      Wrapper.instance = new Wrapper();
    }
    return Wrapper.instance;
  }
}

export const AlgoSigner = Wrapper.getInstance();
