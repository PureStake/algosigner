import algosdk from 'algosdk';
import { WalletMultisigMetadata } from '@algosigner/common/types';
import { Validate, ValidationResponse, ValidationStatus } from '../utils/validator';
import { logging } from '@algosigner/common/logging';
import { InvalidTransactionStructure } from '../../errors/validation';

type AssetInfo = {
  unitName: string;
  displayAmount: string;
};

const BIGINT_FIELDS = ['amount', 'assetTotal'];
const V1_WARNING = `This signing method is going to be deprecated in favor of the more secure 'AlgoSigner.signTxn()' method.`;

//
// Base validated transaction wrap
///
export class BaseValidatedTxnWrap {
  transaction: any = undefined;
  validityObject: object = {};
  txDerivedTypeText: string;
  estimatedFee: number;
  assetInfo: AssetInfo;
  msigData: WalletMultisigMetadata;
  signers: Array<string>;
  authAddr: string;

  constructor(
    params: any,
    txnType: any,
    v1Validations: boolean = true,
    requiredParamsSet: Array<string> = undefined
  ) {
    this.transaction = new txnType();
    const missingFields = [];
    const extraFields = [];

    // Cycle base transaction fields for this type of transaction to verify require fields are present.
    // Nullable type fields are being initialized to null instead of undefined.
    Object.entries(this.transaction).forEach(([key, value]) => {
      if (value === undefined && (params[key] === undefined || params[key] === null)) {
        missingFields.push(key);
      }
    });

    // Check required values in the case where one of a set is required.
    if (requiredParamsSet && requiredParamsSet.length > 0) {
      const foundRequiredParams = [];
      requiredParamsSet.forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          foundRequiredParams.push(key);
        }
      });
      const missingRequiredParams = requiredParamsSet.filter(
        (p) => !foundRequiredParams.includes(p)
      );
      missingFields.concat(missingRequiredParams);
    }

    // Throwing error here so that missing fields can be combined.
    if (missingFields.length > 0) {
      throw new InvalidTransactionStructure(
        `Creation of ${
          txnType.name
        } has missing or invalid required properties: ${missingFields.toString()}.`
      );
    }

    // Check the properties included versus the interface. Reject transactions with unknown fields.
    for (const prop in params) {
      if (!Object.keys(this.transaction).includes(prop)) {
        extraFields.push(prop);
      } else {
        try {
          this.transaction[prop] = params[prop];
          // This is where conversion for different keys happens
          // This could be done for validation purposes or improving readability on the UI
          // Done more liberally on v2 since we use the unmodified transaction afterwards
          if (
            // First we check for UintArrays and make them readable
            (prop === 'group' ||
              prop === 'appApprovalProgram' ||
              prop === 'appClearProgram' ||
              prop === 'assetMetadataHash' ||
              prop === 'lease' ||
              prop === 'selectionKey' ||
              prop === 'stateProofKey' ||
              prop === 'voteKey') &&
            !v1Validations
          ) {
            this.transaction[prop] = Buffer.from(params[prop]).toString('base64');
            // Then we check for UintArray arrays
          } else if (prop === 'appArgs' && !v1Validations) {
            this.transaction[prop] = this.transaction[prop].map((arg) =>
              Buffer.from(arg).toString('base64')
            );
            // Then for address arrays
          } else if (prop === 'appAccounts' && !v1Validations) {
            const accArray = params[prop];
            if (Array.isArray(accArray) && accArray.every((accObj) => 'publicKey' in accObj)) {
              this.transaction[prop] = accArray.map((a) => algosdk.encodeAddress(a.publicKey));
            }
          } else if (prop === 'note') {
            this.transaction[prop] = Buffer.from(params[prop]).toString();
          } else if (BIGINT_FIELDS.includes(prop)) {
            this.transaction[prop] = BigInt(params[prop]);
          }
          this.validityObject[prop] = Validate(prop, this.transaction[prop]) as ValidationResponse;
        } catch (e) {
          logging.log(e);
          throw new Error(`Transaction has encountered an unknown error while processing.`);
        }
      }
    }

    // Throwing error here so that extra fields can be combined.
    if (extraFields.length > 0) {
      throw new InvalidTransactionStructure(
        `Creation of ${txnType.name} has extra or invalid fields: ${extraFields.toString()}.`
      );
    }

    if (v1Validations) {
      // We mark all v1 transactions as soon to be deprecated
      this.validityObject['Deprecated'] = new ValidationResponse({
        status: ValidationStatus.Dangerous,
        info: V1_WARNING,
      });

      // We mark atomic transactions as an invalid field for v1
      if (params['group']) {
        this.validityObject['group'] = new ValidationResponse({
          status: ValidationStatus.Invalid,
        });
      }

      // If we don't have a flatFee or it is falsy and we have a non-zero fee, create a warning.
      if (!params['flatFee'] && params['fee'] && params['fee'] > 0) {
        this.validityObject['flatFee'] = new ValidationResponse({
          status: ValidationStatus.Warning,
          info: 'The fee is subject to change without flatFee enabled.',
        });
      }
    }
  }
}
