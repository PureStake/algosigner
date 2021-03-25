import { ITask } from './interfaces';

import { MessageBuilder } from '../messaging/builder';

import { Transaction, RequestErrors, MultisigTransaction } from '@algosigner/common/types';
import { JsonRpcMethod, JsonPayload } from '@algosigner/common/messaging/types';
import { Runtime } from '@algosigner/common/runtime/runtime';
import { removeEmptyFields } from '@algosigner/common/utils';

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
   * @param txOrArray single transaction object, or array of transaction objects
   * @returns signed transaction
   */
  signV2(
    txOrArray: Transaction | Array<Transaction>,
    error: RequestErrors = RequestErrors.None
  ): Promise<JsonPayload> {
    const formatError = new Error(
      'There was a problem with transaction(s) recieved. Please provide a single transaction object or an array of them'
    );
    let array = txOrArray;
    if (!Array.isArray(array)) {
      if (!txOrArray) throw formatError;
      array = [txOrArray as Transaction];
    }
    if (!array.length) throw formatError;
    array.forEach((tx) => {
      if (typeof tx !== 'object' || tx === null) throw formatError;
    });

    const params = {
      transactions: array.map((t) => btoa(removeEmptyFields(t).toString())),
    };
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
