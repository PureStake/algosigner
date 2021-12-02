import { extensionBrowser } from './chrome';
import { logging } from './logging';
import { isFromExtension } from './utils';
import { RequestError, Transaction, TAccount, Note, Amount } from './types';

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
  expect(RequestError.Undefined).toMatchObject({
    message: '[RequestError.Undefined] An undefined error occurred.',
    code: 4000,
  });
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
