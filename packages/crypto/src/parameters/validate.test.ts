import { validateIterations, validateSalt, validateVersion } from './validate';

test('Validate Iterations - verify correct iterations for version', () => {
    expect(() => validateIterations(5000000,1)).not.toThrow();
});

test('Validate Iterations - verify error for incorrect iterations for version', () => {
    expect(() => validateIterations(1,1)).toThrow();
});

test('Validate Salt - verify correct salt length for version', () => {
    expect(() => validateSalt(new Uint8Array("a835cd8689ccd191c3f0cbaf3cf66aab4af1c017c5a8e37a82b3b001c7d5c3e6".match(/.{1,2}/g).map(byte => parseInt(byte, 16))),1)).not.toThrow();
});

test('Validate Salt - verify error for incorrect salt length for version', () => {
    expect(() => validateSalt(new Uint8Array("a835cd8689ccd191c3f0cbaf3cf66aab4af1c017c5a8e37a82b3b001c7d5c3".match(/.{1,2}/g).map(byte => parseInt(byte, 16))),1)).toThrow();
});

test('Validate Version - verify version exits', () => {
    expect(() => validateVersion(1)).not.toThrow();
});

test('Validate Version - verify error for incorrect version', () => {
    expect(() => validateVersion(999999)).toThrow();
});