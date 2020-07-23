# Introduction
Crypto wrapper for AlgoSigner. Creates wrapped functionality to Web Crypto API for encrypting and decrypting ArrayBuffer objects with an associated ArrayBuffer passphrase. 

## Project Use
After installation output files will be in the /dist/ folder. This includes secureStorageContext.js, and the typescript definitions for the supporting structure. 
 - SecureStorageContext -> Entry point, providing locking and unlocking capability.
#### parameters
 - default -> Contains default and acceptable range parameters used for encryption. 
 - validate -> Functions for checking validity of salt, iterations, version.
#### structures
 - blob -> Structure for locked objects. Returned as a result of lock, may used as a compatibleBlob, and is passed in for unlocking.  
 - contextSecurity -> The security context the secureStorageContext object. Contains passphrase, nIterations, and version for locking and unlocking.
#### errors 
 - types -> Error definition for InvalidCipherText and any additional custom errors. 

## Installation
Install NPM
 - npm install
 - npm run build