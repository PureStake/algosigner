import { getValidatedTxnWrap } from './actions';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';
import { AssetConfigTransaction } from './acfgTransaction';
import { AssetTransferTransaction } from './axferTransaction';
import { AssetCloseTransaction } from './axferCloseTransaction';
import { AssetFreezeTransaction } from './afrzTransaction';
import { KeyregTransaction } from './keyregTransaction';
import { ApplicationTransaction } from './applTransaction';

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

test('Validate build of appl transaction', () => {
  const preTransaction = {
    type: 'appl',
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    appAccounts: ['NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ'],
    appArgs: new Uint8Array(0),
    appApprovalProgram: new Uint8Array(0),
    appClearProgram: new Uint8Array(0),
    lease: new Uint8Array(0),
    fee: 1000,
    appIndex: 1,
    extraPages: 1,
    appOnComplete: 0,
    appGlobalByteSlices: 1,
    appGlobalInts: 1,
    appLocalByteSlices: 1,
    appLocalInts: 1,
    appForeignApps: [1],
    appForeignAssets: [1],
    firstRound: 1,
    lastRound: 1001,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    note: new Uint8Array(0),
    boxes: [{appIndex: 2, name: new Uint8Array(1)}],
  };

  const result = getValidatedTxnWrap(preTransaction, 'appl');
  expect(result instanceof BaseValidatedTxnWrap).toBe(true);
  expect(result instanceof ApplicationTransaction).toBe(true);
});

test('Validate build of keygreg transaction', () => {
  const preTransaction = {
    type: 'keyreg',
    fee: 1000,
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    voteKey: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    selectionKey: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    stateProofKey: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQNM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    voteFirst: 1,
    voteLast: 1001,
    firstRound: 1,
    lastRound: 1001,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    nonParticipation: true,
    note: new Uint8Array(0),
  };

  const result = getValidatedTxnWrap(preTransaction, 'keyreg');
  expect(result instanceof BaseValidatedTxnWrap).toBe(true);
  expect(result instanceof KeyregTransaction).toBe(true);
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

test('Validate build of axfer close transaction', () => {
  const preTransaction = {
    type: 'axfer',
    from: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    to: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
    closeRemainderTo: 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ',
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
  expect(result instanceof AssetCloseTransaction).toBe(true);
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
  let message: string = undefined;
  let data: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'pay');
  } catch (e) {
    message = e.message;
    data = e.data;
  }
  expect(message).toContain('Validation failed');
  expect(data).toContain('firstRound');
  expect(data).toContain('lastRound');
  expect(data).toContain('genesisID');
  expect(data).toContain('genesisHash');
  expect(data).toContain('to');
  expect(data).toContain('from');
});

test('Validate clawback transaction required fields', () => {
  const preTransaction = {
    type: 'axfer',
  };
  let message: string = undefined;
  let data: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'axfer');
  } catch (e) {
    message = e.message;
    data = e.data;
  }
  expect(message).toContain('Validation failed');
  expect(data).toContain('firstRound');
  expect(data).toContain('lastRound');
  expect(data).toContain('genesisID');
  expect(data).toContain('genesisHash');
  expect(data).toContain('from');
  expect(data).toContain('assetIndex');
  expect(data).toContain('assetRevocationTarget');
});

test('Validate accept transaction required fields', () => {
  const preTransaction = {
    type: 'axfer',
  };
  let message: string = undefined;
  let data: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'axfer');
  } catch (e) {
    message = e.message;
    data = e.data;
  }
  expect(message).toContain('Validation failed');
  expect(data).toContain('firstRound');
  expect(data).toContain('lastRound');
  expect(data).toContain('genesisID');
  expect(data).toContain('genesisHash');
  expect(data).toContain('from');
  expect(data).toContain('assetIndex');
});

test('Validate create transaction required fields', () => {
  const preTransaction = {
    type: 'acfg',
  };
  let message: string = undefined;
  let data: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'acfg');
  } catch (e) {
    message = e.message;
    data = e.data;
  }
  expect(message).toContain('Validation failed');
  expect(data).toContain('firstRound');
  expect(data).toContain('lastRound');
  expect(data).toContain('genesisID');
  expect(data).toContain('genesisHash');
  expect(data).toContain('from');
  expect(data).toContain('assetTotal');
});

test('Validate destroy transaction required fields', () => {
  const preTransaction = {
    type: 'acfg',
  };
  let message: string = undefined;
  let data: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'acfg');
  } catch (e) {
    message = e.message;
    data = e.data;
  }
  expect(message).toContain('Validation failed');
  expect(data).toContain('firstRound');
  expect(data).toContain('lastRound');
  expect(data).toContain('genesisID');
  expect(data).toContain('genesisHash');
  expect(data).toContain('from');
  expect(data).toContain('assetIndex');
});

test('Validate modify asset transaction required fields', () => {
  const preTransaction = {
    type: 'acfg',
  };
  let message: string = undefined;
  let data: string = undefined;
  try {
    getValidatedTxnWrap(preTransaction, 'acfg');
  } catch (e) {
    message = e.message;
    data = e.data;
  }
  expect(message).toContain('Validation failed');
  expect(data).toContain('firstRound');
  expect(data).toContain('lastRound');
  expect(data).toContain('genesisID');
  expect(data).toContain('genesisHash');
  expect(data).toContain('from');
  expect(data).toContain('assetIndex');
});
