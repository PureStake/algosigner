/**
 * @license
 * Copyright 2020 
 * =========================================
*/

///
// Number of iterations, quantized to amounts based on strength. 
// Weak should only be used in low-end devices where increased speed of derivation is required. 
///
enum Iterations {
    WEAK = 200000,
    MEDIUM = 1000000,
    STRONG = 5000000
};

///
// The PBKDF2 parameters. We use a salt and IV size of 32 with one of the set options for iterations.
///
export const PBKDF2Parameters = {
    Iterations: Iterations,
    SaltSize: 32,
    IVSize: 32
};
