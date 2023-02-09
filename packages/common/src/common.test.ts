import { extensionBrowser } from './chrome';
import { logging } from './logging';
import { isFromExtension } from './utils';
import { Transaction, TAccount, Note, Amount } from './types';
import { RequestError } from './errors';

test('Test chrome reference', () => {
  //@ts-ignore
  expect(extensionBrowser).toBe(chrome);
});

test('Logging test', () => {
  expect(typeof logging.log).toBe('function');
});

test('Test extension parts', () => {
  extensionBrowser.runtime.id = '12345';
  expect(isFromExtension('chrome-extension://12345')).toBe(true);
});

test('Type - Transaction', () => {
  expect({ amount: 1, from: 'AAA', to: 'BBB' } as Transaction).toBeInstanceOf(Object);
});

test('Type - TAccount', () => {
  expect('string' as TAccount).toBe('string');
});

test('Type - Note', () => {
  expect('string' as Note).toBe('string');
});

test('Type - Amount', () => {
  expect(12345 as Amount).toBe(12345);
});

test('RequestError - Structure', () => {
  const address = 'MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE';
  const ledger = 'MainNet';
  const testError = RequestError.NoAccountMatch(address, ledger);

  expect(testError).toMatchObject({
    message: `No matching account found on AlgoSigner for address "${address}" on network ${ledger}.`,
    code: 4100,
  });

  expect(RequestError.SigningValidationError(4000, [testError])).toMatchObject({
    message: 'There was a problem validating the transaction(s) to be signed. Please refer to the data property for the reasons behind each transaction.',
    code: 4000,
    data: [testError],
  });
});

test('RequestError - Throwing', () => {
  function throwError() {
    throw RequestError.Undefined;
  }
  expect(() => throwError()).toThrow(RequestError.Undefined);
});