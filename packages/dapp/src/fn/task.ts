import { ITask } from './interfaces';

import { MessageBuilder } from '../messaging/builder';

import { Transaction, RequestErrors, MultisigTransaction } from '@algosigner/common/types';
import { JsonRpcMethod, JsonPayload } from '@algosigner/common/messaging/types';
import { Runtime } from '@algosigner/common/runtime/runtime';
import { byteArrayToBase64 } from '@algosigner/common/utils';

export class Task extends Runtime implements ITask {
  static subscriptions: { [key: string]: Function } = {};

  connect(): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Authorization, {});
  }

  accounts(params: JsonPayload, error: RequestErrors = RequestErrors.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Accounts, params as JsonPayload, error);
  }

  sign(params: Transaction, error: RequestErrors = RequestErrors.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.SignTransaction, params, error);
  }

  signMultisig(
    params: MultisigTransaction,
    error: RequestErrors = RequestErrors.None
  ): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.SignMultisigTransaction, params, error);
  }

  /**
   * Supports SDK-build transactions
   * @param txOrArray single encoded transaction, or array of encoded transactions
   * @returns signed transaction
   */
  signV2(
    txOrArray: Uint8Array | Array<Uint8Array>,
    error: RequestErrors = RequestErrors.None
  ): Promise<JsonPayload> {
    const formatError = new Error(
      'There was a problem with transaction(s) recieved. Please provide a single encoded transaction or an array of them'
    );
    let array = txOrArray;
    if (!Array.isArray(array)) {
      if (!txOrArray) throw formatError;
      array = [txOrArray as Uint8Array];
    }
    if (!array.length) throw formatError;
    array.forEach((tx) => {
      if (typeof tx !== 'object' || tx === null || !tx.length) throw formatError;
    });

    const params = {
      transactions: array.map((t) => byteArrayToBase64(t)),
    };
    console.log(params.transactions);
    return MessageBuilder.promise(JsonRpcMethod.SignV2Transaction, params, error);
  }

  send(params: Transaction, error: RequestErrors = RequestErrors.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.SendTransaction, params, error);
  }

  algod(params: JsonPayload, error: RequestErrors = RequestErrors.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Algod, params, error);
  }

  indexer(params: JsonPayload, error: RequestErrors = RequestErrors.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Indexer, params, error);
  }

  subscribe(eventName: string, callback: Function) {
    Task.subscriptions[eventName] = callback;
  }
}
