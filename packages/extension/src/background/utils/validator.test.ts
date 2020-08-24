import { Validate, ValidationResponse } from  "./validator";

test('Valitdate correct to address', () => {
    let result = Validate("to", "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ");
    expect(result).toBe(ValidationResponse.Valid);
});

test('Valitdate invalid to address', () => {
    let result = Validate("to", "12345");
    expect(result).toBe(ValidationResponse.Invalid);
});

test('Valitdate correct amount', () => {
    let result = Validate("amount", 1);
    expect(result).toBe(ValidationResponse.Valid);
});

test('Valitdate invalid amount', () => {
    let result = Validate("amount", 9999999999999999999999999);
    expect(result).toBe(ValidationResponse.Invalid);
});

test('Valitdate normal fee', () => {
    let result = Validate("fee", 1000);
    expect(result).toBe(ValidationResponse.Valid);
});

test('Valitdate elevated fee', () => {
    let result = Validate("fee", 100000);
    expect(result).toBe(ValidationResponse.Warning);
});

test('Valitdate very high fee', () => {
    let result = Validate("fee", 10000000);
    expect(result).toBe(ValidationResponse.Dangerous);
});

test('Valitdate closeRemainderTo empty', () => {
    let result = Validate("closeRemainderTo", "");
    expect(result).toBe(ValidationResponse.Valid);
});

test('Valitdate closeRemainderTo', () => {
    let result = Validate("closeRemainderTo", "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ");
    expect(result).toBe(ValidationResponse.Dangerous);
});

test('Valitdate assetCloseTo', () => {
    let result = Validate("assetCloseTo", "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ");
    expect(result).toBe(ValidationResponse.Dangerous);
});

test('Valitdate correct assetIndex', () => {
    let result = Validate("assetIndex", 1);
    expect(result).toBe(ValidationResponse.Valid);
});

test('Valitdate invalid assetIndex', () => {
    let result = Validate("assetIndex", 9999999999999999999999999);
    expect(result).toBe(ValidationResponse.Invalid);
});

test('Valitdate correct rounds', () => {
    let resultFirst = Validate("firstRound", 1);
    let resultLast = Validate("lastRound", 1);
    expect(resultFirst).toBe(ValidationResponse.Valid);
    expect(resultLast).toBe(ValidationResponse.Valid);
});

test('Valitdate invalid rounds', () => {
    let resultFirst = Validate("firstRound", 9999999999999999999999999);
    let resultLast = Validate("lastRound", 9999999999999999999999999);
    expect(resultFirst).toBe(ValidationResponse.Invalid);
    expect(resultLast).toBe(ValidationResponse.Invalid);
});