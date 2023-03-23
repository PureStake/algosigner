# ![AlgoSigner](media/algosigner-wallet-banner-3.png)

# AlgoSigner Sunset

Support for AlgoSigner by the Algorand Foundation is ending on March 31st and the extension will be unpublished from the Chrome Store. This **should not** delete the extension if it is installed through the store but neither the extension or code base will be updated or supported. 

Refer to the Algorand website for a list of [alternative providers](https://developer.algorand.org/ecosystem-projects/?tags=wallets). The Algorand Foundation also providers a list of [wallet security best practices](https://www.algorand.foundation/wallet-security-best-practices).

Existing users should migrate to a different wallet immediately. There is no way to export a mnemonic from AlgoSigner. If you did not write it down when creating an account you should migrate to another account before March 31st or rekey your account to an account you do have the secret for. 

For developers, the Github repo for the project will migrate to the Algorand Foundation on March 31st. 


## FAQ
----
#### Q: Does this have anything to do with the MyAlgo wallet breach?

A: No, this is a planned phasing out of AlgoSigner. There is no known security issue with the wallet. 

#### Q: Can I rekey my account?

A: Yes, you can, several guides are available recently depending on your new wallet. 

#### Q: Are there are any more releases planned?

A: There are no more planned releases to the Chrome Store. There is final code only release (1.11.0) in the Github repository with the last developed features. 

#### Q: Is the code Manifest v3 ready?

A: No. There will be a branch containing all the changes towards supporting v3, but it should not be considered tested or production ready. 


## 1.11.0 Final Code Release

### Main updates

- Multiple improvements to Custom Networks including:
  - Automatic fetching of genesis ID and hashes for the user.
  - Achieved full compatibility with `enable()` calls.
  - Other UI/UX changes.
- Updated a lot of error messages and data structures to better communicate the causes of errors.

### Other updates and bugfixes:
- Connecting to a dApp using an `enable()` call while logged out no longer closes the connection window after inputting your password.
- Improved validations for `keyreg` transactions regarding nonParticipation.
- Improved validations for `acfg` transactions regarding the distinctions between 'Create', 'Config' and 'Destroy'.
- Fixed account permission bug on `enable()` calls.
- SDK support updated to v2.0.0.

## 1.10.1 Final Chrome Store Release

### Main updates
As part of the process of supporting the [Algorand Foundations ARCs](https://arc.algorand.foundation/), in 1.10.0, a number of non-breaking additions have been made to support how dApps will work with AlgoSigner. In time, the existing legacy features will be deprecated. 

- A new top level object, `window.algorand` is made available and can be accessed by the dapp to make calls to AlgoSigner. The existing `window.AlgoSigner` object remains but will be deprecated over the next year. 
- An updated connection flow and address discovery process for dApps is in place, using `algorand.enable()`. **The existing connection flow persists but will be deprecated over the next 3-6 months.**
- Dapps may also now request for AlgoSigner to directly post signed transactions to the network and not return the signed blob to the dApp for handling. 
- Additional documentation regarding the use of `authAddr` for signing transactions with rekeyed accounts.

An interactive transition guide is available [here](https://purestake.github.io/algosigner-dapp-example/arcTransitionGuide.html) to aid in the migration of existing functionalities.

### Other updates (1.10.1):
- Transaction signing with Ledger devices now support signing multiple transactions in a single group at once. Also updated the Ledger libraries.
- Added support for the `boxes` field on application transactions and the `stateProofKey` & `nonParticipation` fields for key registration transactions.
- Various bugfixes:
  - Fixed an issue where custom networks weren't working correctly on `algorand.enable()` calls.
  - Fixed an issue AlgoSigner becoming unresponsive when trying to sign a transaction with a Reference Account with no `authAddr` provided.

## License

This project is under the MIT License
