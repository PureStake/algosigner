import { ITask } from './interfaces';

import { MessageBuilder } from '../messaging/builder';

import {
  Transaction,
  RequestErrors,
  MultisigTransaction,
  WalletTransaction,
} from '@algosigner/common/types';
import { JsonRpcMethod, JsonPayload } from '@algosigner/common/messaging/types';
import { Runtime } from '@algosigner/common/runtime/runtime';

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

  /**
   * @param transactions array of valid encoded transaction objects
   * @returns array of signed transactions
   */
  signTxn(
    transactions: Array<WalletTransaction>,
    error: RequestErrors = RequestErrors.None
  ): Promise<JsonPayload> {
    const formatError = new Error(
      'There was a problem with the transaction(s) recieved. Please provide an array of valid transaction objects.'
    );
    if (!Array.isArray(transactions) || !transactions.length) throw formatError;
    transactions.forEach((walletTx) => {
      if (
        walletTx === null ||
        typeof walletTx !== 'object' ||
        walletTx.txn === null ||
        !walletTx.txn.length
      )
        throw formatError;
    });

    const params = {
      transactions: transactions,
    };
    return MessageBuilder.promise(JsonRpcMethod.SignWalletTransaction, params, error);
  }
}
