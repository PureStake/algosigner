import { extensionBrowser } from './chrome';
import { logging } from './logging';
import { isFromExtension } from './utils';
import { RequestErrors, Transaction, TAccount, Note, Amount } from './types';

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

test('Type - RequestErrors undefined test', () => {
  expect(RequestErrors.Undefined).toBe(
    '[RequestErrors.Undefined] An undefined error occurred.'
  );
});

test('Type - Transaction', () => {
  expect({ amount: 1, from: 'AAA', to: 'BBB' } as Transaction).toBeInstanceOf(
    Object
  );
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
