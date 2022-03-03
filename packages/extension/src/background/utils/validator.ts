import algosdk from 'algosdk';
import { getBaseSupportedLedgers } from '@algosigner/common/types/ledgers';
import { Settings } from '../config';

const STRING_MAX_LENGTH = 1000;

///
// Validation Status
///
export enum ValidationStatus {
  /* eslint-disable no-unused-vars */
  Valid = 0, // Field is valid or not one of the validated fields
  Invalid = 1, // Field value is invalid and should not be used
  Warning = 2, // Field is out of normal parameters and should be inspected closely
  Dangerous = 3, // Field has risky or costly fields with values and should be inspected very closely
}
///
// Helper to convert a validation status into a classname for display purposes
///
function _convertFieldResponseToClassname(validationStatus: ValidationStatus): string {
  switch (validationStatus) {
    case ValidationStatus.Dangerous:
      return 'tx-field-danger';
    case ValidationStatus.Warning:
      return 'tx-field-warning';
    default:
      return '';
  }
}

///
// Validation responses.
///
export class ValidationResponse {
  status: ValidationStatus;
  info: string;
  className: string;
  constructor(props) {
    this.status = props.status;
    this.info = props.info;
    this.className = _convertFieldResponseToClassname(this.status);
  }
}

///
// Return field if valid based on type.
///
export function Validate(field: any, value: any): ValidationResponse {
  switch (field) {
    // Validate the addresses are accurate
    case 'to':
    case 'from':
    case 'closeRemainderTo':
      if (!algosdk.isValidAddress(value)) {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Address does not adhere to a valid structure.',
        });
      } else {
        // Close to types should issue a Dangerous validation warning if they contain values.
        if (field === 'closeRemainderTo') {
          return new ValidationResponse({
            status: ValidationStatus.Dangerous,
            info: `A 'close to' address is associated to this transaction.`,
          });
        } else {
          return new ValidationResponse({ status: ValidationStatus.Valid });
        }
      }
    // Safety checks for numbers
    case 'firstRound':
    case 'lastRound':
    case 'assetIndex':
    case 'assetDecimals':
    case 'appOnComplete':
    case 'appIndex':
    case 'voteFirst':
    case 'voteLast':
    case 'voteKeyDilution':
    case 'appGlobalInts':
    case 'appGlobalByteSlices':
    case 'appLocalInts':
    case 'appLocalByteSlices':
    case 'extraPages':
      if (value && (!Number.isSafeInteger(value) || parseInt(value) < 0)) {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Value unable to be cast correctly to a numeric value.',
        });
      } else {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      }
    // Safety checks for BigInts
    case 'amount':
    case 'assetTotal':
      try {
        if (value && BigInt(value) < 0) {
          return new ValidationResponse({
            status: ValidationStatus.Invalid,
            info: 'Number needs to have a positive value.',
          });
        } else {
          return new ValidationResponse({ status: ValidationStatus.Valid });
        }
      } catch {
        // For any case where the converting to bigint may fail.
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Value unable to be cast correctly to a numeric value.',
        });
      }
    // Safety checks for strings
    case 'note':
    case 'name':
    case 'tag':
    case 'group':
      if (
        value &&
        (typeof value === 'string' || value instanceof String) &&
        value.length < STRING_MAX_LENGTH
      ) {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      } else {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Value exceeds permitted string length.',
        });
      }

    // Warn on fee amounts above minimum, send dangerous response on those above 1 Algo.
    case 'fee':
      try {
        if (!Number.isSafeInteger(value) || parseInt(value) < 0) {
          return new ValidationResponse({
            status: ValidationStatus.Invalid,
            info: 'Value unable to be cast correctly to a numeric value.',
          });
        } else if (parseInt(value) > 1000000) {
          return new ValidationResponse({
            status: ValidationStatus.Dangerous,
            info: 'The associated fee is very high compared to the minimum value.',
          });
        } else if (parseInt(value) > 1000) {
          return new ValidationResponse({
            status: ValidationStatus.Warning,
            info: 'The fee is higher than the minimum value.',
          });
        } else {
          return new ValidationResponse({ status: ValidationStatus.Valid });
        }
      } catch {
        // For any case where the parse int may fail.
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Value unable to be cast correctly to a numeric value.',
        });
      }

    case 'reKeyTo':
      if (value && !algosdk.isValidAddress(value)) {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Address does not adhere to a valid structure.',
        });
      } else {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      }

    // Genesis ID must be present and one of the approved values
    case 'genesisID':
      if (
        getBaseSupportedLedgers().some((l) => value === l['genesisId']) ||
        Settings.getCleansedInjectedNetworks().find((l) => value === l['genesisId'])
      ) {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      } else {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'The associated genesis id does not match a supported ledger.',
        });
      }

    // Genesis hash must be present and one of the approved values
    case 'genesisHash':
      if (value) {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      } else {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'The genesis hash value is invalid or does not exist.',
        });
      }

    default:
      // Our field isn't one of the listed ones, so we can mark it as valid
      return new ValidationResponse({ status: ValidationStatus.Valid });
  }

  // If for some reason the case falls through mark the field invalid.
  return new ValidationResponse({
    status: ValidationStatus.Invalid,
    info: 'An unknown error has occurred during validation.',
  });
}
