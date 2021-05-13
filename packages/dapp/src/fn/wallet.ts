import { MessageBuilder } from '../messaging/builder';

import { RequestErrors, WalletTransaction } from '@algosigner/common/types';
import { JsonRpcMethod, JsonPayload } from '@algosigner/common/messaging/types';

export class Wallet {
  /**
   * @param transactions array of valid encoded transaction objects
   * @returns array of signed transactions
   */
  sign(
    transactions: Array<WalletTransaction>,
    error: RequestErrors = RequestErrors.None
  ): Promise<JsonPayload> {
    const formatError = new Error(
      'There was a problem with the transaction(s) recieved. Please provide an array of valid transaction objects.'
    );
    if (!Array.isArray(transactions) || !transactions.length) throw formatError;
    transactions.forEach((wrap) => {
      if (wrap === null || typeof wrap !== 'object' || wrap.tx === null || !wrap.tx.length)
        throw formatError;
    });

    const params = {
      transactions: transactions,
    };
    return MessageBuilder.promise(JsonRpcMethod.SignWalletTransaction, params, error);
  }
}
