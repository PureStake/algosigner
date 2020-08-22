import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { OnMessageHandler } from './handler';
import { extensionBrowser } from '@algosigner/common/chrome';
import { Ledger } from './types';
import encryptionWrap from "../encryptionWrap";
import Session from '../utils/session';
import { InternalMethods } from './internalMethods';
import { Task } from './task';
const algosdk = require("algosdk");

jest.mock('../encryptionWrap');

//@ts-ignore
global.chrome.runtime = {
  id: "eecmbplnlbmoeihkjdebklofcmfadjgd"
}

const testImportAccount = {
  name: "Imported account",
  address: "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A",
  mnemonic: "comfort horse pet soft direct okay brown vacuum squeeze real debate either text insane flash dinosaur insane lion heavy actor frost glove tackle absent amateur"
}


describe('testing GetSessions', () => {
  test("should return doesn't exist when empty storage", () => {
    const method = JsonRpcMethod.GetSession;
    const request = {
      "source": "ui",
      "body": {
        "jsonrpc": "2.0",
        "method": method,
        "params": {},
        "id": "17402bbaa89"
      }
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        checkStorage: cb => cb(false),
      };
    });

    InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({exist: false});
  });

  test("should return exist when storage exist", () => {
    const method = JsonRpcMethod.GetSession;
    const request = {
      "source": "ui",
      "body": {
        "jsonrpc": "2.0",
        "method": method,
        "params": {},
        "id": "17402bbaa89"
      }
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        checkStorage: cb => cb(true),
      };
    });

    InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({exist: true});
  });
});


describe('wallet flow', () => {
  test("should return doesn't exist when empty storage", () => {
    const method = JsonRpcMethod.CreateWallet;
    const request = {
      "source": "ui",
      "body": {
        "jsonrpc": "2.0",
        "method": method,
        "params": {},
        "id": "17402bbaa89"
      }
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
        MainNet: []
      }
    });
  });

  test("after wallet creation, getSession should return wallet", () => {
    const method = JsonRpcMethod.GetSession;
    const request = {
      "source": "ui",
      "body": {
        "jsonrpc": "2.0",
        "method": method,
        "params": {},
        "id": "17402bbaa89"
      }
    };
    const sendResponse = jest.fn();

    const session = {
      ledger: Ledger.MainNet,
      wallet: {
        TestNet: [],
        MainNet: []
      }
    };

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        checkStorage: cb => cb(true),
      };
    });

    InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({exist: true, session: session});
  });

  test("a TestNet account can be added", () => {
    const method = JsonRpcMethod.SaveAccount;
    const keys = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(keys.sk);

    const account = {
      name: "Test account",
      address: keys.addr
    }

    const request = {
      "source": "ui",
      "body": {
        "jsonrpc": "2.0",
        "method": method,
        "params": {
          ...account,
          mnemonic: mnemonic,
          ledger: Ledger.TestNet
        },
        "id": "17402bbaa89"
      }
    };
    const sendResponse = jest.fn();


    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        lock: (wallet, cb) => cb(true),
        unlock: cb => cb({
          TestNet: [],
          MainNet: []
        }),
        checkStorage: cb => cb(true),
      };
    });

    InternalMethods[method](request, sendResponse);

    const wallet = {
      TestNet: [account],
      MainNet: []
    };

    expect(sendResponse).toHaveBeenCalledWith(wallet);
  });


  test("a TestNet account can be imported", () => {
    const method = JsonRpcMethod.ImportAccount;

    const request = {
      "source": "ui",
      "body": {
        "jsonrpc": "2.0",
        "method": method,
        "params": {
          name: testImportAccount.name,
          mnemonic: testImportAccount.mnemonic,
          ledger: Ledger.TestNet
        },
        "id": "17402bbaa89"
      }
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        lock: (wallet, cb) => cb(true),
        unlock: cb => cb({
          TestNet: [],
          MainNet: []
        }),
        checkStorage: cb => cb(true),
      };
    });

    InternalMethods[method](request, sendResponse);

    const wallet = {
      TestNet: [{
        name: testImportAccount.name,
        address: testImportAccount.address
      }],
      MainNet: []
    };

    expect(sendResponse).toHaveBeenCalledWith(wallet);
  });

  test("an account can be deleted", () => {
    const method = JsonRpcMethod.DeleteAccount;

    const request = {
      "source": "ui",
      "body": {
        "jsonrpc": "2.0",
        "method": method,
        "params": {
          address: testImportAccount.address,
          ledger: Ledger.TestNet
        },
        "id": "17402bbaa89"
      }
    };
    const sendResponse = jest.fn();

    //@ts-ignore
    encryptionWrap.mockImplementationOnce(() => {
      return {
        lock: (wallet, cb) => cb(true),
        unlock: cb => cb({
          TestNet: [{
            ...testImportAccount
          }],
          MainNet: []
        }),
        checkStorage: cb => cb(true),
      };
    });

    InternalMethods[method](request, sendResponse);

    const wallet = {
      TestNet: [],
      MainNet: []
    };

    expect(sendResponse).toHaveBeenCalledWith(wallet);
  });
});
