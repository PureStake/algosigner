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

  public enable: Function = this.task.enable;
  public signAndPostTxns: Function = this.task.signAndPostTxns;
  // public getAlgodv2Client: Function = this.task.algod;
  // public getIndexerClient: Function = this.task.indexer;
  public signTxns: Function = this.task.signTxns;
  public postTxns: Function = this.task.postTxns;

  public static getInstance(): Wrapper {
    if (!Wrapper.instance) {
      Wrapper.instance = new Wrapper();
    }
    return Wrapper.instance;
  }
}

export const algorand = Wrapper.getInstance();
