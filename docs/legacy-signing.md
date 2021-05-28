# AlgoSigner Legacy Signing

AlgoSigner launched in September 2020 with support for basic transaction signing. Over the following releases additional support for Multisig, Atomic, and Application transactions were added.

The combination of the complexity of working with non-basic transaction and the creation of a new standard for Wallets by Foundation led to the creation of (v2 signing)[].

The initial, v1, transaction signing remains in place and is documented and supported.

(v1 dApp integration)[legacy-dApp-integration.md]

### Multisig Transactions

- Multisig transactions can be signed individually through AlgoSigner.
  - Using the associated msig for the transaction an available matching unsigned address will be selected if possible to sign the txn component.
  - The resulting sign will return the a msig with only this signature in the blob and will need to be merged with other signatures before sending to the network.
- An example of this can be seen in the [existing sample dApp multisig test](https://purestake.github.io/algosigner-dapp-example/tx-test/signTesting.html).

### Atomic Transactions

- Grouped transactions intended for atomic transaction functionality need to be grouped outside of AlgoSigner, but can be signed individually.
- The grouped transactions need to have their binary components concatenated to be accepted in the AlgoSigner send method.
- An example of this can be seen in the [existing sample dApp group test](https://purestake.github.io/algosigner-dapp-example/tx-test/signTesting.html).
