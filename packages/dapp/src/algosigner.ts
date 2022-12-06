import { Task } from './fn/task';
import { Router } from './fn/router';
import {
  base64ToByteArray,
  byteArrayToBase64,
  stringToByteArray,
  byteArrayToString,
} from '@algosigner/common/encoding';

class Wrapper {
  private static instance: Wrapper;
  private task: Task = new Task();
  private router: Router = new Router();

  public encoding: object = {
    msgpackToBase64: byteArrayToBase64,
    base64ToMsgpack: base64ToByteArray,
    stringToByteArray,
    byteArrayToString,
  };

  public connect: Function = this.task.connect;
  public send: Function = this.task.send;
  public accounts: Function = this.task.accounts;
  public algod: Function = this.task.algod;
  public indexer: Function = this.task.indexer;
  public subscribe: Function = this.task.subscribe;
  public signTxn: Function = this.task.signTxn;

  public static getInstance(): Wrapper {
    if (!Wrapper.instance) {
      Wrapper.instance = new Wrapper();
    }
    return Wrapper.instance;
  }
}

export const AlgoSigner = Wrapper.getInstance();
