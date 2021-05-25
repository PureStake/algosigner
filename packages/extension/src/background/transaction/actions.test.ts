import { getValidatedTxnWrap } from './actions';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';
import { AssetConfigTransaction } from './acfgTransaction';
import { AssetTransferTransaction } from './axferTransaction';
import { AssetFreezeTransaction } from './afrzTransaction';

test('Validate build of pay transaction', () => {
  const preTransaction = {
    type: 'pay',
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    to: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    fee: 1000,
    amount: 12345,
    firstRound: 1,
    lastRound: 1001,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    note: new Uint8Array(0),
  };

  const result = getValidatedTxnWrap(preTransaction, 'pay');
  expect(result instanceof BaseValidatedTxnWrap).toBe(true);
});

test('Validate build of keygreg transaction', () => {
  const preTransaction = {
    type: 'keyreg',
    fee: 1000,
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    voteKey: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    selectionKey: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    voteFirst: 1,
    voteLast: 1001,
    firstRound: 1,
    lastRound: 1001,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    note: new Uint8Array(0),
  };

  const result = getValidatedTxnWrap(preTransaction, 'keyreg');
  expect(result instanceof BaseValidatedTxnWrap).toBe(true);
});

test('Validate build of acfg transaction', () => {
  const preTransaction = {
    type: 'acfg',
    fee: 1000,
    assetIndex: 1,
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    firstRound: 1,
    lastRound: 1001,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    note: new Uint8Array(0),
  };

  const result = getValidatedTxnWrap(preTransaction, 'acfg');
  expect(result instanceof BaseValidatedTxnWrap).toBe(true);
  expect(result instanceof AssetConfigTransaction).toBe(true);
});

test('Validate build of afrz transaction', () => {
  const preTransaction = {
    type: 'afrz',
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    freezeAccount: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    freezeState: true,
    fee: 1000,
    assetIndex: 1,
    firstRound: 1,
    lastRound: 1001,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    note: new Uint8Array(0),
  };

  const result = getValidatedTxnWrap(preTransaction, 'afrz');
  expect(result instanceof BaseValidatedTxnWrap).toBe(true);
  expect(result instanceof AssetFreezeTransaction).toBe(true);
});

test('Validate build of axfer transaction', () => {
  const preTransaction = {
    type: 'axfer',
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    to: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    fee: 1000,
    assetIndex: 1,
    amount: 12345,
    firstRound: 1,
    lastRound: 1001,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    note: new Uint8Array(0),
  };

  const result = getValidatedTxnWrap(preTransaction, 'axfer');
  expect(result instanceof BaseValidatedTxnWrap).toBe(true);
  expect(result instanceof AssetTransferTransaction).toBe(true);
});

test('Validate build of transaction', () => {
  const preTransaction = {
    type: 'faketype',
  };
  expect(() => getValidatedTxnWrap(preTransaction, 'faketype')).toThrow();
});
// Check missing fields from transactions in all types
test('Validate pay transaction required fields', () => {
  const preTransaction = {
    type: 'pay',
  };
  let errorMessage: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'pay');
  } catch (e) {
    errorMessage = e.message;
  }
  expect(errorMessage).toContain('fee');
  expect(errorMessage).toContain('firstRound');
  expect(errorMessage).toContain('lastRound');
  expect(errorMessage).toContain('genesisID');
  expect(errorMessage).toContain('genesisHash');
  expect(errorMessage).toContain('to');
  expect(errorMessage).toContain('from');
  expect(errorMessage).toContain('amount');
});
test('Validate clawback transaction required fields', () => {
  const preTransaction = {
    type: 'axfer',
  };
  let errorMessage: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'axfer');
  } catch (e) {
    errorMessage = e.message;
  }
  expect(errorMessage).toContain('fee');
  expect(errorMessage).toContain('firstRound');
  expect(errorMessage).toContain('lastRound');
  expect(errorMessage).toContain('genesisID');
  expect(errorMessage).toContain('genesisHash');
  expect(errorMessage).toContain('from');
  expect(errorMessage).toContain('amount');
  expect(errorMessage).toContain('assetIndex');
  expect(errorMessage).toContain('assetRevocationTarget');
});
test('Validate accept transaction required fields', () => {
  const preTransaction = {
    type: 'axfer',
  };
  let errorMessage: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'axfer');
  } catch (e) {
    errorMessage = e.message;
  }
  expect(errorMessage).toContain('fee');
  expect(errorMessage).toContain('firstRound');
  expect(errorMessage).toContain('lastRound');
  expect(errorMessage).toContain('genesisID');
  expect(errorMessage).toContain('genesisHash');
  expect(errorMessage).toContain('from');
  expect(errorMessage).toContain('assetIndex');
});
test('Validate create transaction required fields', () => {
  const preTransaction = {
    type: 'acfg',
  };
  let errorMessage: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'acfg');
  } catch (e) {
    errorMessage = e.message;
  }
  expect(errorMessage).toContain('fee');
  expect(errorMessage).toContain('firstRound');
  expect(errorMessage).toContain('lastRound');
  expect(errorMessage).toContain('genesisID');
  expect(errorMessage).toContain('genesisHash');
  expect(errorMessage).toContain('from');
  expect(errorMessage).toContain('assetTotal');
  expect(errorMessage).toContain('assetDecimals');
});
test('Validate destroy transaction required fields', () => {
  const preTransaction = {
    type: 'acfg',
  };
  let errorMessage: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'acfg');
  } catch (e) {
    console.log(e.message);
    errorMessage = e.message;
  }
  expect(errorMessage).toContain('fee');
  expect(errorMessage).toContain('firstRound');
  expect(errorMessage).toContain('lastRound');
  expect(errorMessage).toContain('genesisID');
  expect(errorMessage).toContain('genesisHash');
  expect(errorMessage).toContain('from');
  expect(errorMessage).toContain('assetIndex');
});
test('Validate modify asset transaction required fields', () => {
  const preTransaction = {
    type: 'acfg',
  };
  let errorMessage: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'acfg');
  } catch (e) {
    errorMessage = e.message;
  }
  expect(errorMessage).toContain('fee');
  expect(errorMessage).toContain('firstRound');
  expect(errorMessage).toContain('lastRound');
  expect(errorMessage).toContain('genesisID');
  expect(errorMessage).toContain('genesisHash');
  expect(errorMessage).toContain('from');
  expect(errorMessage).toContain('assetIndex');
});
