import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { Ledger } from './types';
import encryptionWrap from '../encryptionWrap';
import { InternalMethods } from './internalMethods';
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const algosdk = require('algosdk');

jest.mock('../encryptionWrap');

//@ts-ignore
global.chrome.runtime = {
  id: 'eecmbplnlbmoeihkjdebklofcmfadjgd',
};

const testImportAccount = {
  name: 'Imported account',
  address: 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
  mnemonic:
    'comfort horse pet soft direct okay brown vacuum squeeze real debate either text insane flash dinosaur insane lion heavy actor frost glove tackle absent amateur',
};

describe('testing GetSessions', () => {
  test("should return doesn't exist when empty storage", () => {
    const method = JsonRpcMethod.GetSession;
    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {},
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        checkStorage: (cb) => cb(false),
      };
    });

    InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({ exist: false });
  });

  test('should return exist when storage exist', () => {
    const method = JsonRpcMethod.GetSession;
    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {},
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        checkStorage: (cb) => cb(true),
      };
    });

    InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({ exist: true });
  });
});

describe('wallet flow', () => {
  test('a wallet can be created', () => {
    const method = JsonRpcMethod.CreateWallet;
    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {},
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        lock: (wallet, cb) => cb(true),
      };
    });

    InternalMethods[JsonRpcMethod.CreateWallet](request, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({
      ledger: Ledger.MainNet,
      wallet: {
        TestNet: [],
        MainNet: [],
      },
    });
  });

  test('after wallet creation, getSession should return wallet', () => {
    const method = JsonRpcMethod.GetSession;
    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {},
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    const session = {
      ledger: Ledger.MainNet,
      wallet: {
        TestNet: [],
        MainNet: [],
      },
    };

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        checkStorage: (cb) => cb(true),
      };
    });

    InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({
      exist: true,
      session: session,
    });
  });

  test('a TestNet account can be added', () => {
    const method = JsonRpcMethod.SaveAccount;
    const keys = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(keys.sk);

    const account = {
      name: 'Test account',
      address: keys.addr,
    };

    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {
          ...account,
          mnemonic: mnemonic,
          ledger: Ledger.TestNet,
        },
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        lock: (wallet, cb) => cb(true),
        unlock: (cb) =>
          cb({
            TestNet: [],
            MainNet: [],
          }),
        checkStorage: (cb) => cb(true),
      };
    });

    InternalMethods[method](request, sendResponse);

    const wallet = {
      TestNet: [account],
      MainNet: [],
    };

    expect(sendResponse).toHaveBeenCalledWith(wallet);
  });

  test('a TestNet account can be imported', () => {
    const method = JsonRpcMethod.ImportAccount;

    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {
          name: testImportAccount.name,
          mnemonic: testImportAccount.mnemonic,
          ledger: Ledger.TestNet,
        },
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        lock: (wallet, cb) => cb(true),
        unlock: (cb) =>
          cb({
            TestNet: [],
            MainNet: [],
          }),
        checkStorage: (cb) => cb(true),
      };
    });

    InternalMethods[method](request, sendResponse);

    const wallet = {
      TestNet: [
        {
          name: testImportAccount.name,
          address: testImportAccount.address,
        },
      ],
      MainNet: [],
    };

    expect(sendResponse).toHaveBeenCalledWith(wallet);
  });

  test('a TestNet account can be deleted', () => {
    const method = JsonRpcMethod.DeleteAccount;

    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {
          address: testImportAccount.address,
          ledger: Ledger.TestNet,
        },
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        lock: (wallet, cb) => cb(true),
        unlock: (cb) =>
          cb({
            TestNet: [
              {
                ...testImportAccount,
              },
            ],
            MainNet: [],
          }),
        checkStorage: (cb) => cb(true),
      };
    });

    InternalMethods[method](request, sendResponse);

    const wallet = {
      TestNet: [],
      MainNet: [],
    };

    expect(sendResponse).toHaveBeenCalledWith(wallet);
  });
});

describe('algosdk methods', () => {
  test('the UI can query account details', async () => {
    const method = JsonRpcMethod.AccountDetails;

    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {
          address: testImportAccount.address,
          ledger: Ledger.TestNet,
        },
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    const fooSpy = jest.spyOn(algosdk, 'Algodv2');
    fooSpy.mockImplementationOnce(() => {
      return {
        accountInformation: () => {
          return {
            do: () =>
              new Promise((resolve) => {
                resolve(testImportAccount);
              }),
          };
        },
      };
    });

    InternalMethods[method](request, sendResponse);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(algosdk.Algodv2).toHaveBeenCalled();
    expect(sendResponse).toHaveBeenCalledWith(testImportAccount);

    fooSpy.mockRestore();
  });

  test('the UI can query account transactions', async () => {
    const method = JsonRpcMethod.Transactions;

    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {
          address: testImportAccount.address,
          ledger: Ledger.TestNet,
        },
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    const mockResponse = {
      'current-round': 8775279,
      'next-token': 'NauEAAAAAAAAAAAA',
      'transactions': [
        {
          'close-rewards': 0,
          'closing-amount': 0,
          'confirmed-round': 8694581,
          'fee': 10000,
          'first-valid': 8694580,
          'genesis-hash': 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
          'genesis-id': 'testnet-v1.0',
          'id': 'YIIHLLSTTRCHGGD2DFDKBTLAMREKBVGBQ3JDF43PAGWZSEZ6PUAQ',
          'intra-round-offset': 0,
          'last-valid': 8695580,
          'payment-transaction': {
            'amount': 100000000,
            'close-amount': 0,
            'receiver':
              'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          },
          'receiver-rewards': 0,
          'round-time': 1597770466,
          'sender':
            'GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A',
          'sender-rewards': 0,
          'signature': {
            sig:
              'ZjD8XY8CxKnK/oXvc1bxKve2KQsxi5Yavmv9P84d/jtX10eux5nBqjoPowu3+Bs5xH3jRSNCmYgHmjZlEdD5DA==',
          },
          'tx-type': 'pay',
        },
      ],
    };

    const fooSpy = jest.spyOn(algosdk, 'Indexer');
    fooSpy.mockImplementationOnce(() => {
      return {
        lookupAccountTransactions: () => {
          return {
            do: () =>
              new Promise((resolve) => {
                resolve(mockResponse);
              }),
          };
        },
      };
    });

    InternalMethods[method](request, sendResponse);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(algosdk.Indexer).toHaveBeenCalledTimes(1);
    expect(sendResponse).toHaveBeenCalledWith(mockResponse);

    fooSpy.mockRestore();
  });

  test('the UI can query asset details', async () => {
    const method = JsonRpcMethod.AssetDetails;

    const request = {
      source: 'ui',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: {
          assetId: 12008492,
          ledger: Ledger.TestNet,
        },
        id: '17402bbaa89',
      },
    };
    const sendResponse = jest.fn();

    const mockResponse = {
      'asset': {
        index: 12008492,
        params: {
          'clawback':
            'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'creator':
            'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'decimals': 3,
          'default-frozen': false,
          'freeze':
            'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'manager':
            'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'name': 'Dm-4',
          'reserve':
            'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'total': 1000,
          'unit-name': 'DsG0I4',
        },
      },
      'current-round': 8775362,
    };

    const fooSpy = jest.spyOn(algosdk, 'Indexer');
    fooSpy.mockImplementationOnce(() => {
      return {
        lookupAssetByID: () => {
          return {
            do: () =>
              new Promise((resolve) => {
                resolve(mockResponse);
              }),
          };
        },
      };
    });

    InternalMethods[method](request, sendResponse);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(algosdk.Indexer).toHaveBeenCalledTimes(1);
    expect(sendResponse).toHaveBeenCalledWith(mockResponse);

    fooSpy.mockRestore();
  });
});
