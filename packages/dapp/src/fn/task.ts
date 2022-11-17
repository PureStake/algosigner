import { ITask } from './interfaces';

import { MessageBuilder } from '../messaging/builder';

import { SignTxnsOpts, OptsKeys, WalletTransaction } from '@algosigner/common/types';
import { RequestError } from '@algosigner/common/errors';
import { JsonRpcMethod, JsonPayload } from '@algosigner/common/messaging/types';
import { Runtime } from '@algosigner/common/runtime/runtime';

export class Task extends Runtime implements ITask {
  static subscriptions: { [key: string]: Function } = {};

  private static validateFormat(transactionsOrGroups: WalletTransaction[]): void {
    const formatError = RequestError.InvalidSignTxnsFormat;
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
  }

  connect(): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Authorization, {});
  }

  accounts(params: JsonPayload, error: RequestError = RequestError.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.Accounts, params, error);
  }

  send(params: JsonPayload, error: RequestError = RequestError.None): Promise<JsonPayload> {
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
    transactionsOrGroups: WalletTransaction[],
    error: RequestError = RequestError.None
  ): Promise<JsonPayload> {
    Task.validateFormat(transactionsOrGroups);

    const params = {
      transactionsOrGroups: transactionsOrGroups,
    };
    return MessageBuilder.promise(JsonRpcMethod.SignWalletTransaction, params, error);
  }

  /**
   * @param transactionsOrGroups array or nested array of grouped transaction objects
   * @param opts optional parameters passed to the function
   * @returns array or nested array of signed transactions
   */
  signTxns(
    transactionsOrGroups: WalletTransaction[],
    opts?: SignTxnsOpts,
    error: RequestError = RequestError.None
  ): Promise<JsonPayload> {
    Task.validateFormat(transactionsOrGroups);

    const params = {
      transactionsOrGroups: transactionsOrGroups,
      opts: {
        [OptsKeys.ARC01Return]: true,
        ...opts,
      },
    };
    return MessageBuilder.promise(JsonRpcMethod.SignWalletTransaction, params, error);
  }

  /**
   * @param transactionsOrGroups array or nested array of grouped transaction objects
   * @param opts optional parameters passed to the function
   * @returns array or nested array of confirmed transactions sent to the network
   */
  signAndPostTxns(
    transactionsOrGroups: WalletTransaction[],
    opts?: SignTxnsOpts,
    error: RequestError = RequestError.None
  ): Promise<JsonPayload> {
    Task.validateFormat(transactionsOrGroups);

    const params = {
      transactionsOrGroups: transactionsOrGroups,
      opts: {
        [OptsKeys.ARC01Return]: true,
        [OptsKeys.sendTxns]: true,
        ...opts,
      },
    };
    return MessageBuilder.promise(JsonRpcMethod.SignWalletTransaction, params, error);
  }

  /**
   * @param stxns array or nested array of grouped signed transaction
   * @returns array or nested array of confirmed transactions sent to the network
   */
  postTxns(stxns: string[] | string[][], error: RequestError = RequestError.None): Promise<JsonPayload> {
    return MessageBuilder.promise(JsonRpcMethod.PostTransactions, { stxns }, error);
  }
}
