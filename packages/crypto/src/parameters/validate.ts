import { DefaultEncryptionParameters, Iterations, ValidVersions } from "./default";

///
// Verify that the iterations amount is included in the enum structure.
///
export function validateIterations(iterations: number, version?: number) {
    if(!Object.values(Iterations).includes(iterations)) {
        throw new RangeError(`The iterations value of ${iterations} must match one from DefaultEncryptionParameters.Iterations for version ${version||DefaultEncryptionParameters.Version}.`);
    }
};

///
// Verify that the salt is the correct length for the version.
///
export function validateSalt(salt: Uint8Array, version?: number) {  
    // FUTURE: Use version to get valid salt sizes 
    if(salt.byteLength != DefaultEncryptionParameters.SaltSize) {
        throw new RangeError(`The compatible Salt must be ${DefaultEncryptionParameters.SaltSize} for version ${version || DefaultEncryptionParameters.Version}.`);
    }
}

///
// Verify that the version is known and valid.
///
export function validateVersion(version: number) {  
    if(!ValidVersions.includes(version)) {
        throw new RangeError(`The provided version (${version}) is not valid.`);
    }
}