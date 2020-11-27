/* eslint-disable-next-line */
const algosdk = require('algosdk');
import { getSupportedLedgers } from '@algosigner/common/types/ledgers';

///
// Validation Status
///
export enum ValidationStatus {
  /* eslint-disable */
  Valid = 0, // Field is valid or not one of the validated fields
  Invalid = 1, // Field value is invalid and should not be used
  Warning = 2, // Field is out of normal parameters and should be inspected closely
  Dangerous = 3, // Field has risky or costly fields with values and should be inspected very closely
}
///
// Helper to convert a validation status into a classname for display purposes
///
function _convertFieldResponseToClassname(
  validationStatus: ValidationStatus
): string {
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
      if (!algosdk.isValidAddress(value)) {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Address does not adhear to a valid structure.',
        });
      } else {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      }
    case 'from':
      if (!algosdk.isValidAddress(value)) {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Address does not adhear to a valid structure.',
        });
      } else {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      }
    case 'amount':
    case 'assetIndex':
    case 'firstRound':
    case 'lastRound':
    case 'voteFirst':
    case 'voteLast':
    case 'voteKeyDilution':
      if (value && (!Number.isSafeInteger(value) || parseInt(value) < 0)) {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Value unable to be cast correctly to a numeric value.',
        });
      } else {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      }

    // Warn on fee amounts above minimum, send dangerous response on those above 1 Algo.
    case 'fee':
      try {
        console.log(
          `Getting ready to test fee: ${value}, type:${typeof value}`
        );
        if (!Number.isSafeInteger(value) || parseInt(value) < 0) {
          return new ValidationResponse({
            status: ValidationStatus.Invalid,
            info: 'Value unable to be cast correctly to a numeric value.',
          });
        } else if (parseInt(value) > 1000000) {
          return new ValidationResponse({
            status: ValidationStatus.Dangerous,
            info:
              'The associated fee is very high compared to the minimum value.',
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

    // Close to types should issue a Dangerous validation warning if they contain values.
    case 'closeRemainderTo':
      if (value) {
        return new ValidationResponse({
          status: ValidationStatus.Dangerous,
          info: 'A close to address is associated to this transaction.',
        });
      } else {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      }

    case 'reKeyTo':
      if (value) {
        return new ValidationResponse({
          status: ValidationStatus.Invalid,
          info: 'Rekey transactions are not currently accepted in AlgoSigner.',
        });
      } else {
        return new ValidationResponse({ status: ValidationStatus.Valid });
      }

    // Genesis ID must be present and one of the approved values
    case 'genesisID':
      if (getSupportedLedgers().some((l) => value === l['genesisId'])) {
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
