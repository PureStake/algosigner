import { IPaymentTx } from '@algosigner/common/interfaces/pay';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class PaymentTx implements IPaymentTx {
  type: string = undefined;
  amount: BigInt = BigInt(0);
  from: string = undefined;
  to: string = undefined;
  closeRemainderTo?: string = null;
  reKeyTo?: any = null;
  fee?: number = 0;
  firstRound: number = undefined;
  lastRound: number = undefined;
  note?: string = null;
  genesisID: string = undefined;
  genesisHash: any = undefined;
  group?: string = null;
  lease?: any = null;
  flatFee?: any = null;
  name?: string = null;
  tag?: string = null;
}

///
// Mapping, validation and error checking for pay transactions prior to sign.
///
export class PayTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Pay Algos';
  constructor(params: IPaymentTx, v1Validations: boolean) {
    super(params, PaymentTx, v1Validations);
  }
}
