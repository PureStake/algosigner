import { Validate, ValidationStatus } from './validator';

test('Validate correct to address', () => {
  const result = Validate('to', 'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ');
  expect(result.status).toBe(ValidationStatus.Valid);
});

test('Validate invalid to address', () => {
  const result = Validate('to', '12345');
  expect(result.status).toBe(ValidationStatus.Invalid);
});

test('Validate correct amount', () => {
  const result = Validate('amount', 1);
  expect(result.status).toBe(ValidationStatus.Valid);
});

test('Validate invalid amount', () => {
  const result = Validate('amount', -1);
  expect(result.status).toBe(ValidationStatus.Invalid);
});

test('Validate normal fee', () => {
  const result = Validate('fee', 1000);
  expect(result.status).toBe(ValidationStatus.Valid);
});

test('Validate elevated fee', () => {
  const result = Validate('fee', 100000);
  expect(result.status).toBe(ValidationStatus.Warning);
});

test('Validate very high fee', () => {
  const result = Validate('fee', 10000000);
  expect(result.status).toBe(ValidationStatus.Dangerous);
});

test('Validate closeRemainderTo is a valid address', () => {
  const result = Validate('closeRemainderTo', 'AAAAAAAAAAAANOTAVALIDADDRESSAAAAAAAAAAAA');
  expect(result.status).toBe(ValidationStatus.Invalid);
});

test('Validate closeRemainderTo is dangerous', () => {
  const result = Validate(
    'closeRemainderTo',
    'NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ'
  );
  expect(result.status).toBe(ValidationStatus.Dangerous);
});

test('Validate correct assetIndex', () => {
  const result = Validate('assetIndex', 1);
  expect(result.status).toBe(ValidationStatus.Valid);
});

test('Validate invalid assetIndex', () => {
  const result = Validate('assetIndex', -1);
  expect(result.status).toBe(ValidationStatus.Invalid);
});

test('Validate correct rounds', () => {
  const resultFirst = Validate('firstRound', 1);
  const resultLast = Validate('lastRound', 1);
  expect(resultFirst.status).toBe(ValidationStatus.Valid);
  expect(resultLast.status).toBe(ValidationStatus.Valid);
});

test('Validate invalid rounds', () => {
  const resultFirst = Validate('firstRound', -1);
  const resultLast = Validate('lastRound', -1);
  expect(resultFirst.status).toBe(ValidationStatus.Invalid);
  expect(resultLast.status).toBe(ValidationStatus.Invalid);
});
