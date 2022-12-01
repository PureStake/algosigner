import { ITask } from './interfaces';

import { MessageBuilder } from '../messaging/builder';

import { Transaction, WalletTransaction } from '@algosigner/common/types';
import { RequestError } from '@algosigner/common/errors';
import { JsonRpcMethod, JsonPayload } from '@algosigner/common/messaging/types';
import { Runtime } from '@algosigner/common/runtime/runtime';

export class Task extends Runtime implements ITask {
  static subscriptions: { [key: string]: Function } = {};

  connect(): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Authorization, {});
  }

  enable(opts: JsonPayload, error: RequestError = RequestError.None): Promise<JsonPayload> {
    const params = {...opts}
    return MessageBuilder.promise(JsonRpcMethod.EnableAuthorization, params, error);
  }

  accounts(params: JsonPayload, error: RequestError = RequestError.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Accounts, params as JsonPayload, error);
  }

  send(params: Transaction, error: RequestError = RequestError.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.SendTransaction, params, error);
  }

  algod(params: JsonPayload, error: RequestError = RequestError.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Algod, params, error);
  }

  indexer(params: JsonPayload, error: RequestError = RequestError.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Indexer, params, error);
  }

  subscribe(eventName: string, callback: Function) {
    Task.subscriptions[eventName] = callback;
  }

  /**
   * @param transactionsOrGroups array or nested array of grouped transaction objects
   * @returns array or nested array of signed transactions
   */
  signTxn(
    transactionsOrGroups: Array<WalletTransaction>,
    error: RequestError = RequestError.None
  ): Promise<JsonPayload> {
    const formatError = RequestError.InvalidFormat;
    // We check for empty arrays
    if (!Array.isArray(transactionsOrGroups) || !transactionsOrGroups.length) throw formatError;
    transactionsOrGroups.forEach((txOrGroup) => {
      // We check for no null values and no empty nested arrays
      if (
        txOrGroup === null ||
        txOrGroup === undefined ||
        (!Array.isArray(txOrGroup) &&
          typeof txOrGroup === 'object' &&
          (!txOrGroup.txn || (txOrGroup.txn && !txOrGroup.txn.length))) ||
        (Array.isArray(txOrGroup) &&
          (!txOrGroup.length || (txOrGroup.length && !txOrGroup.every((tx) => tx !== null))))
      )
        throw formatError;
    });

    const params = {
      transactionsOrGroups: transactionsOrGroups,
    };
    return MessageBuilder.promise(JsonRpcMethod.SignWalletTransaction, params, error);
  }
}
