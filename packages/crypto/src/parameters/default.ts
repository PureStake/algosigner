/**
 * @license
 * Copyright 2020 
 * =========================================
*/

///
// Number of iterations, quantized to amounts based on strength. 
// Weak should only be used in low-end devices where increased speed of derivation is required. 
///
export enum Iterations {
    WEAK = 200000,
    MEDIUM = 1000000,
    STRONG = 5000000,
};

///
// Array of valid versions.
///
export const ValidVersions = [1];

///
// Parameters for deriving keys.
///
export const DefaultEncryptionParameters = {
    Iterations: Iterations.STRONG,
    SaltSize: 32,
    NonceSize: 32,
    Version: 1
};

