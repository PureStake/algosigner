import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { Ledger } from '@algosigner/common/types';
import encryptionWrap from '../encryptionWrap';
import { InternalMethods } from './internalMethods';
import algosdk from 'algosdk';

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
      availableLedgers: [],
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
      availableLedgers: [],
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

    expect(sendResponse).toHaveBeenCalledWith({ exist: true, session: session });
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

    const fooSpy = jest.spyOn(algosdk as any, 'Algodv2');
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

    const mockIndexerResponse = {
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
            'receiver': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          },
          'receiver-rewards': 0,
          'round-time': 1597770466,
          'sender': 'GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A',
          'sender-rewards': 0,
          'signature': {
            sig: 'ZjD8XY8CxKnK/oXvc1bxKve2KQsxi5Yavmv9P84d/jtX10eux5nBqjoPowu3+Bs5xH3jRSNCmYgHmjZlEdD5DA==',
          },
          'tx-type': 'pay',
        },
      ],
    };

    const mockAlgodResponse = {
      'top-transactions': [
        {
          // prettier-ignore
          sig: [ 74, 228, 71, 146, 119, 76, 166, 241, 67, 124, 77, 127, 58, 176, 22, 247, 156, 221, 112, 103, 193, 75, 34, 47, 95, 250, 33, 44, 3, 126, 107, 58, 216, 252, 236, 206, 215, 3, 148, 74, 234, 81, 224, 5, 3, 44, 32, 45, 165, 251, 7, 234, 74, 221, 163, 241, 187, 88, 95, 221, 90, 47, 220, 12 ],
          txn: {
            amt: 1000000,
            fee: 1000,
            fv: 11013986,
            gen: 'testnet-v1.0',
            // prettier-ignore
            gh: [ 72, 99, 181, 24, 164, 179, 200, 78, 200, 16, 242, 45, 79, 16, 129, 203, 15, 113, 240, 89, 167, 172, 32, 222, 198, 47, 127, 112, 229, 9, 58, 34 ],
            lv: 11014986,
            // prettier-ignore
            rcv: [ 100, 206, 89, 54, 225, 96, 71, 202, 115, 217, 209, 193, 128, 57, 102, 30, 137, 95, 26, 1, 125, 235, 53, 255, 95, 140, 118, 110, 112, 9, 221, 170 ],
            // prettier-ignore
            snd: [ 100, 206, 89, 54, 225, 96, 71, 202, 115, 217, 209, 193, 128, 57, 102, 30, 137, 95, 26, 1, 125, 235, 53, 255, 95, 140, 118, 110, 112, 9, 221, 170 ],
            type: 'pay',
          },
        },
      ],
      'total-transactions': 1,
    };

    const mockedUiResponse = {
      'next-token': mockIndexerResponse['next-token'],
      'transactions': mockIndexerResponse['transactions'],
      'pending': [
        {
          type: mockAlgodResponse['top-transactions'][0]['txn']['type'],
          amount: mockAlgodResponse['top-transactions'][0]['txn']['amt'],
          sender: algosdk.encodeAddress(
            new Uint8Array(mockAlgodResponse['top-transactions'][0]['txn']['snd'])
          ),
          receiver: algosdk.encodeAddress(
            new Uint8Array(mockAlgodResponse['top-transactions'][0]['txn']['rcv'])
          ),
          assetSender: undefined,
          assetName: undefined,
          id: undefined,
        },
      ],
    };

    const indexerSpy = jest.spyOn(algosdk as any, 'Indexer');
    indexerSpy.mockImplementationOnce(() => {
      return {
        lookupAccountTransactions: () => {
          return {
            do: () =>
              new Promise((resolve) => {
                resolve(mockIndexerResponse);
              }),
          };
        },
      };
    });

    const algodSpy = jest.spyOn(algosdk as any, 'Algodv2');
    algodSpy.mockImplementationOnce(() => {
      return {
        pendingTransactionByAddress: () => {
          return {
            do: () =>
              new Promise((resolve) => {
                resolve(mockAlgodResponse);
              }),
          };
        },
      };
    });

    InternalMethods[method](request, sendResponse);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(algosdk.Indexer).toHaveBeenCalledTimes(1);
    expect(algosdk.Algodv2).toHaveBeenCalledTimes(1);
    expect(sendResponse).toHaveBeenCalledWith(mockedUiResponse);

    indexerSpy.mockRestore();
    algodSpy.mockRestore();
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
          'clawback': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'creator': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'decimals': 3,
          'default-frozen': false,
          'freeze': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'manager': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'name': 'Dm-4',
          'reserve': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
          'total': 1000,
          'unit-name': 'DsG0I4',
        },
      },
      'current-round': 8775362,
    };

    const fooSpy = jest.spyOn(algosdk as any, 'Indexer');
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
