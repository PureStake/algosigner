import { Validate, ValidationStatus } from  "./validator";

test('Valitdate correct to address', () => {
    let result = Validate("to", "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ");
    expect(result.status).toBe(ValidationStatus.Valid);
});

test('Valitdate invalid to address', () => {
    let result = Validate("to", "12345");
    expect(result.status).toBe(ValidationStatus.Invalid);
});

test('Valitdate correct amount', () => {
    let result = Validate("amount", 1);
    expect(result.status).toBe(ValidationStatus.Valid);
});

test('Valitdate invalid amount', () => {
    let result = Validate("amount", 9999999999999999999999999);
    expect(result.status).toBe(ValidationStatus.Invalid);
});

test('Valitdate normal fee', () => {
    let result = Validate("fee", 1000);
    expect(result.status).toBe(ValidationStatus.Valid);
});

test('Valitdate elevated fee', () => {
    let result = Validate("fee", 100000);
    expect(result.status).toBe(ValidationStatus.Warning);
});

test('Valitdate very high fee', () => {
    let result = Validate("fee", 10000000);
    expect(result.status).toBe(ValidationStatus.Dangerous);
});

test('Valitdate closeRemainderTo empty', () => {
    let result = Validate("closeRemainderTo", "");
    expect(result.status).toBe(ValidationStatus.Valid);
});

test('Valitdate closeRemainderTo', () => {
    let result = Validate("closeRemainderTo", "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ");
    expect(result.status).toBe(ValidationStatus.Dangerous);
});

test('Valitdate correct assetIndex', () => {
    let result = Validate("assetIndex", 1);
    expect(result.status).toBe(ValidationStatus.Valid);
});

test('Valitdate invalid assetIndex', () => {
    let result = Validate("assetIndex", 9999999999999999999999999);
    expect(result.status).toBe(ValidationStatus.Invalid);
});

test('Valitdate correct rounds', () => {
    let resultFirst = Validate("firstRound", 1);
    let resultLast = Validate("lastRound", 1);
    expect(resultFirst.status).toBe(ValidationStatus.Valid);
    expect(resultLast.status).toBe(ValidationStatus.Valid);
});

test('Valitdate invalid rounds', () => {
    let resultFirst = Validate("firstRound", 9999999999999999999999999);
    let resultLast = Validate("lastRound", 9999999999999999999999999);
    expect(resultFirst.status).toBe(ValidationStatus.Invalid);
    expect(resultLast.status).toBe(ValidationStatus.Invalid);
});