import { IPaymentTx } from '@algosigner/common/interfaces/pay';
import { IAssetConfigTx } from '@algosigner/common/interfaces/acfg';
import { IAssetCreateTx } from '@algosigner/common/interfaces/acfg_create';
import { IAssetDestroyTx } from '@algosigner/common/interfaces/acfg_destroy';
import { IAssetFreezeTx } from '@algosigner/common/interfaces/afrz';
import { IAssetTransferTx } from '@algosigner/common/interfaces/axfer';
import { IAssetAcceptTx } from '@algosigner/common/interfaces/axfer_accept';
import { IAssetCloseTx } from '@algosigner/common/interfaces/axfer_close';
import { IAssetClawbackTx } from '@algosigner/common/interfaces/axfer_clawback';
import { IKeyRegistrationTx } from '@algosigner/common/interfaces/keyreg';
import { IApplTx } from '@algosigner/common/interfaces/appl';
import { PayTransaction } from './payTransaction';
import { AssetConfigTransaction } from './acfgTransaction';
import { AssetCreateTransaction } from './acfgCreateTransaction';
import { AssetDestroyTransaction } from './acfgDestroyTransaction';
import { AssetFreezeTransaction } from './afrzTransaction';
import { AssetTransferTransaction } from './axferTransaction';
import { AssetAcceptTransaction } from './axferAcceptTransaction';
import { AssetCloseTransaction } from './axferCloseTransaction';
import { AssetClawbackTransaction } from './axferClawbackTransaction';
import { KeyregTransaction } from './keyregTransaction';
import { ApplTransaction } from './applTransaction';
import { TransactionType } from '@algosigner/common/types/transaction';
import { RequestError } from '@algosigner/common/errors';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';
import { Settings } from '../config';
import { getBaseSupportedLedgers, LedgerTemplate } from '@algosigner/common/types/ledgers';
import { removeEmptyFields } from '@algosigner/common/utils';
import algosdk from 'algosdk';

///
// Sign transaction and return.
///
export function getValidatedTxnWrap(
  txn: object,
  type: string,
): BaseValidatedTxnWrap {
  let validatedTxnWrap: BaseValidatedTxnWrap = undefined;
  let error: RequestError = undefined;

  // We clear the txn object of empty fields
  removeEmptyFields(txn);

  switch (type.toLowerCase()) {
    case TransactionType.Pay:
      validatedTxnWrap = new PayTransaction(txn as IPaymentTx);
      break;
    case TransactionType.Acfg:
      // Validate any of the 3 types of transactions that can occur with acfg
      // Use the first error as the passback error.
      try {
        validatedTxnWrap = new AssetConfigTransaction(txn as IAssetConfigTx);
      } catch (e) {
        error = e;
      }
      if (!validatedTxnWrap) {
        try {
          validatedTxnWrap = new AssetCreateTransaction(txn as IAssetCreateTx);
        } catch (e) {
          e.data = [error.data, e.data].join(' ');
          error = e;
        }
      }
      if (!validatedTxnWrap) {
        try {
          validatedTxnWrap = new AssetDestroyTransaction(txn as IAssetDestroyTx);
        } catch (e) {
          e.data = [error.data, e.data].join(' ');
          error = e;
        }
      }
      if (!validatedTxnWrap && error) {
        throw error;
      }
      break;
    case TransactionType.Afrz:
      validatedTxnWrap = new AssetFreezeTransaction(txn as IAssetFreezeTx);
      break;
    case TransactionType.Axfer:
      // Validate any of the 4 types of transactions that can occur with axfer
      // Use the first error as the passback error.
      try {
        validatedTxnWrap = new AssetAcceptTransaction(txn as IAssetAcceptTx);
      } catch (e) {
        error = e;
      }
      if (!validatedTxnWrap) {
        try {
          validatedTxnWrap = new AssetCloseTransaction(txn as IAssetCloseTx);
        } catch (e) {
          e.message = [error.message, e.message].join(' ');
          error = e;
        }
      }
      if (!validatedTxnWrap) {
        try {
          validatedTxnWrap = new AssetTransferTransaction(txn as IAssetTransferTx);
        } catch (e) {
          e.message = [error.message, e.message].join(' ');
          error = e;
        }
      }
      if (!validatedTxnWrap) {
        try {
          validatedTxnWrap = new AssetClawbackTransaction(txn as IAssetClawbackTx);
        } catch (e) {
          e.message = [error.message, e.message].join(' ');
          error = e;
        }
      }
      if (!validatedTxnWrap && error) {
        throw error;
      }
      break;
    case TransactionType.Keyreg:
      validatedTxnWrap = new KeyregTransaction(txn as IKeyRegistrationTx);
      break;
    case TransactionType.Appl:
      validatedTxnWrap = new ApplTransaction(txn as IApplTx);
      break;
    default:
      throw new Error('Type of transaction not specified or known.');
  }

  return validatedTxnWrap;
}

export function getLedgerFromGenesisId(genesisId: string): string {
  // Default the ledger to mainnet
  const defaultLedger = 'MainNet';

  // Check Genesis ID for base supported ledgers first
  const defaultLedgers = getBaseSupportedLedgers();
  let ledger = defaultLedgers.find((l) => genesisId === l['genesisId']);
  if (ledger !== undefined) {
    return ledger.name;
  }
  // Injected networks may have additional information, multiples, or additional checks
  // so we will check them separately
  ledger = Settings.getCleansedInjectedNetworks().find((l) => genesisId === l['genesisId']);
  if (ledger !== undefined) {
    return ledger.name;
  }
  return defaultLedger;
}

export function getLedgerFromMixedGenesis(genesisId: string, genesisHash?: string): LedgerTemplate {
  // Check Genesis Id and Hash for base supported ledgers first
  const defaultLedgers = getBaseSupportedLedgers();
  let ledger;
  if (genesisId) {
    ledger = defaultLedgers.find((l) => genesisId === l['genesisId']);
    if (ledger !== undefined) {
      // Found genesisId, make sure the hash matches 
      if (!genesisHash || genesisHash === ledger.genesisHash) { 
        return ledger;
      }
    }
    
    // Injected networks may have additional validations so we check them separately
    const injectedNetworks = Settings.getCleansedInjectedNetworks();
    ledger = injectedNetworks.find((network) => network['genesisId'] === genesisId);
    if (ledger) {
      return ledger;
    }
  }

  // We didn't match on the genesis id so check the hashes
  if (genesisHash) {
    ledger = defaultLedgers.find((l) => genesisHash === l['genesisHash']);
    if (ledger !== undefined) {
      // Found genesisHash, make sure the id matches 
      if (!genesisId || genesisId === ledger.genesisId) { 
        return ledger;
      }
    }

    // We don't currently store the genesisHash of the custom networks
  }

  // Default the ledger to mainnet
  return defaultLedgers.find((l) => 'MainNet' === l['name']);
}

export function calculateEstimatedFee(transactionWrap: BaseValidatedTxnWrap, params: any): void {
  const transaction = transactionWrap.transaction;
  const minFee = +params['min-fee'];
  let estimatedFee = +transaction['fee'];
  if (transaction['flatFee']) {
    // If flatFee is enabled, we compare the presented fee by the dApp against the
    // Ledger suggested min-fee and use the min-fee if higher than the presented fee
    if (estimatedFee < minFee) {
      estimatedFee = minFee;
    }
  } else {
    const dappFee = estimatedFee;
    if (dappFee === 0) {
      // If the dApp doesn't suggest a per-byte fee, we use the Ledger suggested total min-fee
      estimatedFee = minFee;
    } else {
      /*
        Since the final fee depends on the transaction size we create a
        dummy replica transaction that's similar to what the SDK eventually sends
        For this we ignore all empty fields and shorten field names to 4 characters 
        so we use smaller field names like the SDK does
        i.e.: the SDK uses 'gen' fpr 'genesisId', 'amt' for 'amount', etc
      */
      const dummyTransaction = {};
      Object.keys(transaction).map((key, index) => {
        if (transaction[key]) {
          dummyTransaction[index.toString().padStart(4, '0')] = transaction[key];
        }
      });
      // We use algosdk to encode our dummy transaction into MessagePack
      // and use the resulting MessagePack to determine an estimate byte size
      const transactionSize: number = algosdk.encodeObj(dummyTransaction).byteLength;
      // Finally we estimate the final fee with the dApp fee
      // and our estimated transaction byte-size
      estimatedFee = dappFee * transactionSize;
    }
  }
  transactionWrap.estimatedFee = estimatedFee;
}
