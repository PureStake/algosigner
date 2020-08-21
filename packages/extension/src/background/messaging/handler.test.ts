import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { OnMessageHandler } from './handler';
import { extensionBrowser } from '@algosigner/common/chrome';
import encryptionWrap from "../encryptionWrap";
import * as utils from '@algosigner/common/utils';
import { InternalMethods } from './internalMethods';
import { Task } from './task';

jest.mock('./internalMethods');

jest.mock('../encryptionWrap', () => {
  return jest.fn().mockImplementation(() => {
    return {checkStorage: jest.fn(cb => cb(true))};
  });
});

//@ts-ignore
global.chrome.runtime = {
  id: "eecmbplnlbmoeihkjdebklofcmfadjgd"
}

test('message from UI goes to internalMethods', () => {
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
  const sender = {
    id: "eecmbplnlbmoeihkjdebklofcmfadjgd",
    origin: "chrome-extension://eecmbplnlbmoeihkjdebklofcmfadjgd",
    url: "chrome-extension://eecmbplnlbmoeihkjdebklofcmfadjgd/index.html"
  }
  const sendResponse = () => {};

  OnMessageHandler.handle(request,sender,sendResponse);

  expect(InternalMethods[JsonRpcMethod.GetSession]).toHaveBeenCalled();
});

test('authorization request from dApp goes to public Task methods', () => {
  const method = JsonRpcMethod.Authorization;
  const request = {
    "source": "dApp",
    "body": {
      "jsonrpc": "2.0",
      "method": method,
      "params": {},
      "id": "17402bbaa89"
    }
  };
  const sender = {
    id: "eecmbplnlbmoeihkjdebklofcmfadjgd",
    origin: "https://purestake.github.io",
    url: "https://purestake.github.io/algosigner-dapp-example/",
    tab: {
      id: 41,
      title: "https://purestake.github.io/algosigner-dapp-example/"
    }
  }
  const sendResponse = () => {};

  const mockAuthorization = jest.fn();
  const mock = jest.spyOn(Task, "methods");
  mock.mockReturnValue({
    public: {
      [JsonRpcMethod.Authorization]: mockAuthorization
    }
  });

  OnMessageHandler.handle(request,sender,sendResponse);

  expect(mockAuthorization).toHaveBeenCalled();
  mock.mockRestore()
});
