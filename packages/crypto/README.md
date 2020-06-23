# Introduction
Crypto wrapper for AlgoSigner. Creates wrapped functionality to Web Crypto API for encrypting and decrypting ArrayBuffer objects with an associated ArrayBuffer passphrase. 

## Project Use
After installation output files will be in the /dist/ folder. This includes secureStorageContext.js, and the typescript definitions for the supporting structure. 
    -SecureStorageContext -> Entry point, providing locking and unlocking capability.
    -LockParameters -> Object that contains passphrase, encrypt objects, and compatibility.
    -PBKDF2Parameters -> Defaults to be used in password derivation with iteration options for slower machines.
    -PBKDF2Security -> Contains internally generated information needed to lock and unlock. 
    -BlobStructure -> Returned lock structure that includes security information and locked object. 

## Installation
Install NPM
 - npm install
 - npm run build