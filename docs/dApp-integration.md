# ![AlgoSigner](/media/algosigner-wallet-banner-3.png)

# Integrating AlgoSigner to add Transaction Capabilities for dApps on Algorand

AlgoSigner injects a JavaScript library into every web page the browser user visits, which allows the site to interact with the extension. The dApp can use the injected library to connect to the user's Wallet, request account addresses it holds, ask AlgoSigner to request the user to sign a transaction initiated by the application, and to post signed transactions to the network.

## AlgoSigner 1.10.0 Update

As part of the process of supporting the [Algorand Foundations ARCs](https://arc.algorand.foundation/), in 1.10.0 a number of non-breaking additions have been made to support how dApps will work with AlgoSigner. In time, the existing legacy features will be deprecated. 

### Additions

- A new top level object, `window.algorand` is made available and can be accessed by the dapp to make calls to AlgoSigner. The existing `window.AlgoSigner` object remains but will be deprecated over the next year.

- An updated connection flow and address discovery process for dApps is in place, using `algorand.enable()`. The existing connection flow persists but will be deprecated over the next 3-6 months.

- Dapps may also now request for AlgoSigner to directly post signed transactions to the network and not return the signed blob to the dApp for handling.

- Additional documentation regarding the use of `authAddr` for signing transactions with rekeyed accounts.

**NOTE: This guide refers only to the post-1.10.0 features and the `window.algorand` object. If you're looking for information on the `window.AlgoSigner` object, please refer to the [legacy Integration Guide](legacy-dApp-integration.md)**

## Methods

- [algorand.enable()](#algorandenable)
- [algorand.signTxns([txnObjects, ...])](#algorandsigntxnstxnobjects-txnobject--txnobject)
- [algorand.postTxns([signedTxns, ...])](#algorandposttxnsstxns-signedtxn--signedtxn)
- [algorand.signAndPostTxns([txnObjects, ...])](#algorandsignandposttxnstxnobjects-txnobject--txnobject)

## Misc

[Rejection Messages](#rejection-messages)

[Working with Custom Networks](#custom-networks)

[Helper Encoding Functions](#encoding-functions)

## Method Detail

### algorand.enable()

@TODO: Expand

## Working with Transactions

Transactions provided to AlgoSigner will be validated against the Algorand JS SDK transaction types. Field names must match and the whole transaction will be rejected otherwise. 

#### Transaction Requirements

Transactions objects need to be presented with the following structure:

```
export type TxnObject = {
  txn:        Base64-encoded string of a transaction binary,
  signers?:   [optional] array of addresses to sign with (defaults to the sender),
  stxn?:      [optional] Base64-encoded string of a signed transaction binary,
  multisig?:  [optional] extra metadata needed for multisig transactions,
  authAddr?:  [optional] used to specify which account is doing the signing when dealing with rekeyed accounts,
};
```

In order to facilitate conversion between different formats and encodings, [helper encoding functions](#encoding-functions) are available on the `algorand.encoding.*` namespace.

Also available on transactions built with the JS SDK is the `.toByte()` method that converts the SDK transaction object into it's binary format.

### algorand.signTxns(txnObjects: TxnObject[] | TxnObject[][])

Send transaction objects, conforming to the Algorand JS SDK, to AlgoSigner for approval. The *network* is determined from the `genesis-id` property.
If approved, the response is an array of base64-encoded signed transaction objects.

**Request**

```js
algorand.signTxns([
  {
    txn: 'iqNhbXRko2ZlZc0D6KJmds4A259Go2dlbqx0ZXN0bmV0LXYxLjCiZ2jEIEhjtRiks8hOyBDyLU8QgcsPcfBZp6wg3sYvf3DlCToio2dycMQgdsLAGqgrtwqqQS4UEN7O8CZHjfhPTwLHrB1A2pXwvKGibHbOANujLqNyY3bEIK0TEDcptY0uFvk2V5LDVzRfdz7O4freYHEuZbpI+6hMo3NuZMQglmyhKUPeU2KALzt/Jcs0GQ55k2vsqZ4pGeNlzpnYLbukdHlwZaNwYXk=',
  },
]);
```

**NOTE:** Even though the method accepts an array of transactions, it requires atomic transactions that share a groupId and will error on non-atomic groups.

**Response**

```json
[
  "gqNzaWfEQL6mW/7ss2HKAqsuHN/7ePx11wKSAvFocw5QEDvzSvrvJdzWYvT7ua8Lc0SS0zOmUDDaHQC/pGJ0PNqnu7W3qQKjdHhuiaNhbXQGo2ZlZc4AA7U4omZ2zgB+OrujZ2VurHRlc3RuZXQtdjEuMKJnaMQgSGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiKibHbOAH4+o6NyY3bEIHhydylNDQQhpD9QdKWejLCMBgb5UYJTGCfDW3KgLsI+o3NuZMQgZM5ZNuFgR8pz2dHBgDlmHolfGgF96zX/X4x2bnAJ3aqkdHlwZaNwYXk=",
]
```

**Example**

```js
// Connect to AlgoSigner
// @TODO: enable params
await algorand.enable();

// Create an Algod client to get suggested transaction params
let client = new algosdk.Algodv2(token, server, port, headers);
let suggestedParams = await client.getTransactionParams().do();

// Use the JS SDK to build a Transaction
let sdkTxn = new algosdk.Transaction({
  to: 'RECEIVER_ADDRESS',
  from: 'SENDER_ADDRESS',
  amount: 100,
  ...suggestedParams,
});

// Get the binary and base64 encode it
let binaryTxn = sdkTxn.toByte();
let base64Txn = algorand.encoding.msgpackToBase64(binaryTxn);

let signedTxns = await algorand.signTxns([
  {
    txn: base64Txn,
  },
]);
```

Alternatively, you can provide multiple arrays of transactions at once. Same rules regarding the contents of the groups apply.

**Request**

```js
algorand.signTxns([
  [
    {
      txn: 'iqNhbXRko2ZlZc0D6KJmds4A259Go2dlbqx0ZXN0bmV0LXYxLjCiZ2jEIEhjtRiks8hOyBDyLU8QgcsPcfBZp6wg3sYvf3DlCToio2dycMQgdsLAGqgrtwqqQS4UEN7O8CZHjfhPTwLHrB1A2pXwvKGibHbOANujLqNyY3bEIK0TEDcptY0uFvk2V5LDVzRfdz7O4freYHEuZbpI+6hMo3NuZMQglmyhKUPeU2KALzt/Jcs0GQ55k2vsqZ4pGeNlzpnYLbukdHlwZaNwYXk=',
    },
  ],
  [
    {
      txn: 'iaRhZnJ6w6RmYWRkxCCWbKEpQ95TYoAvO38lyzQZDnmTa+ypnikZ42XOmdgtu6RmYWlkzgDITmiiZnbOAQNjIKNnZW6sdGVzdG5ldC12MS4womdoxCBIY7UYpLPITsgQ8i1PEIHLD3HwWaesIN7GL39w5Qk6IqJsds4BA2cIo3NuZMQglmyhKUPeU2KALzt/Jcs0GQ55k2vsqZ4pGeNlzpnYLbukdHlwZaRhZnJ6',
    },
  ],
]);
```

**Response**

```json
[
  [
    "gqNzaWfEQL6mW/7ss2HKAqsuHN/7ePx11wKSAvFocw5QEDvzSvrvJdzWYvT7ua8Lc0SS0zOmUDDaHQC/pGJ0PNqnu7W3qQKjdHhuiaNhbXQGo2ZlZc4AA7U4omZ2zgB+OrujZ2VurHRlc3RuZXQtdjEuMKJnaMQgSGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiKibHbOAH4+o6NyY3bEIHhydylNDQQhpD9QdKWejLCMBgb5UYJTGCfDW3KgLsI+o3NuZMQgZM5ZNuFgR8pz2dHBgDlmHolfGgF96zX/X4x2bnAJ3aqkdHlwZaNwYXk=",
  ],
  [
    "gqNzaWfEQC8ZIPYimAypJD2TmEQjuWxEEk8/gJbBegEHdtyKr6TuA78otKIEB9PYQimgMLGn87YOEB6GgRe5vjWRTuWGsAqjdHhuiaRhZnJ6w6RmYWRkxCCWbKEpQ95TYoAvO38lyzQZDnmTa+ypnikZ42XOmdgtu6RmYWlkzgDITmiiZnbOAQNjO6NnZW6sdGVzdG5ldC12MS4womdoxCBIY7UYpLPITsgQ8i1PEIHLD3HwWaesIN7GL39w5Qk6IqJsds4BA2cjo3NuZMQglmyhKUPeU2KALzt/Jcs0GQ55k2vsqZ4pGeNlzpnYLbukdHlwZaRhZnJ6",
  ]
]
```

The signed transactions can then be sent using the SDK (example below) or using the [algorand.postTxns()](#algorandposttxnsstxns-signedtxn--signedtxn) method.

```js
// Get the base64 encoded signed transaction and convert it to binary
let binarySignedTxn = algorand.encoding.base64ToMsgpack(signedTxns[0]);

// Send the transaction through the SDK client
await client.sendRawTransaction(binarySignedTxn).do();
```

### Atomic Transactions

For Atomic transactions, provide an array of transaction objects with the same group ID, _provided in the same order as when the group was assigned_.

**Example**

```js
let txn1 = new algosdk.Transaction({
  to: 'SECOND_ADDRESS',
  from: 'FIRST_ADDRESS',
  amount: 100,
  ...suggestedParams,
});
let txn2 = new algosdk.Transaction({
  to: 'FIRST_ADDRESS',
  from: 'SECOND_ADDRESS',
  amount: 100,
  ...suggestedParams,
});

// Assign a Group ID to the transactions using the SDK
algosdk.assignGroupID([txn1, txn2]);

let binaryTxns = [txn1.toByte(), txn2.toByte()];
let base64Txns = binaryTxns.map((binary) => algorand.encoding.msgpackToBase64(binary));

let signedTxns = await algorand.signTxns([
  {
    txn: base64Txns[0],
  },
  {
    txn: base64Txns[1],
  },
]);
```

The signed transaction array can then be sent using the SDK.

```js
let binarySignedTxns = signedTxns.map((stxn) => algorand.encoding.base64ToMsgpack(stxn));
await client.sendRawTransaction(binarySignedTxns).do();
```

#### Reference Atomic transactions

In case not all group transactions belong to accounts on AlgoSigner, you can set the `signers` field of the transaction object as an empty array to specify that it's only being sent to AlgoSigner for reference and group validation, not for signing. Reference transactions should look like this:

```js
{
  txn: 'B64_TXN',
  signers: [],
  // This tells AlgoSigner that this transaction is not meant to be signed
}
```

`algorand.signTxns()` will return `null` in the position(s) where reference transactions were provided. In these instances, you'd have to sign the missing transaction(s) by your own means before they can be sent. This is useful for transactions that require external signing, like `lsig` transactions.

#### Providing Signed reference transaction(s)

You can provide a signed reference transaction to AlgoSigner via the `stxn` field of the transaction object for it to be validated and returned as part of the group. For the transaction(s) where `stxn` was provided, `algorand.signTxns()` will return the `stxn` string in the same position of the response array as the corresponding reference transaction(s) instead of `null`.

**Example**

```js
let txn1 = new algosdk.Transaction({
  to: 'EXTERNAL_ACCOUNT',
  from: 'ACCOUNT_IN_ALGOSIGNER',
  amount: 100,
  ...suggestedParams,
});
let txn2 = new algosdk.Transaction({
  to: 'ACCOUNT_IN_ALGOSIGNER',
  from: 'EXTERNAL_ACCOUNT',
  amount: 100,
  ...suggestedParams,
});

algosdk.assignGroupID([txn1, txn2]);
let binaryTxns = [txn1.toByte(), txn2.toByte()];
let base64Txns = binaryTxns.map((binary) => algorand.encoding.msgpackToBase64(binary));

let signedTxns = await algorand.signTxns([
  {
    txn: base64Txns[0],
  },
  {
    txn: base64Txns[1],
    signers: [],
    stxn: 'MANUALLY_SIGNED_SECOND_TXN_B64',
  },
]);
```

**Response**

```js
[
  'ALGOSIGNER_SIGNED_B64',
  'MANUALLY_SIGNED_SECOND_TXN_B64',
];
```

#### Signing reference transactions manually
 
In case you can't or don't want to provide the `stxn`, the provided transaction should look like this:

**Example**

```js
let signedTxns = await algorand.signTxns([
  {
    txn: base64Txns[0],
  },
  {
    txn: base64Txns[1],
    signers: [],
  },
]);
```

**Response**

```js
[
  'ALGOSIGNER_SIGNED_B64',
  null,
];
```

Afterwards, you can sign and send the remaining transaction(s) with the SDK:

```js
// Convert first transaction to binary from the response
let signedTxn1Binary = algorand.encoding.base64ToMsgpack(signedTxns[0]);
// Sign leftover transaction with the SDK
let externalAccount = algosdk.mnemonicToSecretKey('EXTERNAL_ACCOUNT_MNEMONIC');
let signedTxn2Binary = txn2.signTxn(externalAccount.sk);

await client.sendRawTransaction([signedTxn1Binary, signedTxn2Binary]).do();
```

#### Multisig Transactions

For Multisig transactions, an additional metadata object is required that adheres to the [Algorand multisig parameters](https://developer.algorand.org/docs/features/accounts/create/#how-to-generate-a-multisignature-account) structure when creating a new multisig account:

```js
{
  version: number,
  threshold: number,
  addrs: string[]
}
```

`algorand.signTxns()` will validate that the resulting multisig address made from the provided parameters matches the sender address and try to sign with every account on the `addrs` array that is also on AlgoSigner.

**NOTE:** `algorand.signTxns()` only accepts unsigned multisig transactions. In case you need to add more signatures to partially signed multisig transactions, please use the SDK.

**Example**

```js
let multisigParams = {
  version: 1,
  threshold: 1,
  addrs: ['FIRST_ADDRESS', 'SECOND_ADDRESS', 'ADDRESS_NOT_IN_ALGOSIGNER'],
};

let multisigAddress = algosdk.multisigAddress(multisigParams);

let multisigTxn = new algosdk.Transaction({
  to: 'RECEIVER_ADDRESS',
  from: multisigAddress,
  amount: 100,
  ...suggestedParams,
});

// Get the binary and base64 encode it
let binaryMultisigTxn = multisigTxn.toByte();
let base64MultisigTxn = algorand.encoding.msgpackToBase64(binaryMultisigTxn);

// This returns a partially signed Multisig Transaction with signatures for FIRST_ADDRESS and SECOND_ADDRESS
let signedTxns = await algorand.signTxns([
  {
    txn: base64MultisigTxn,
    msig: multisigParams,
  },
]);
```

In case you want to specify a subset of addresses to sign with, you can add them to the `signers` list on the transaction object, like so:

```js
// This returns a partially signed Multisig Transaction with signatures for SECOND_ADDRESS
let signedTxns = await algorand.signTxns([
  {
    txn: base64MultisigTxn,
    msig: multisigParams,
    signers: ['SECOND_ADDRESS'],
  },
]);
```
#### Authorized Addresses

When dealing with rekeyed accounts, the authorized address to be used to sign the transaction differs from the rekeyed account. The `TxnObject.authAddr` field allows to specify a different sender address in those cases.

**NOTE:** If specified, AlgoSigner will sign the transaction using this authorized address even if it sees the sender address was not rekeyed to authAddr. This is because the sender may be rekeyed before the transaction is committed.

**Example**

```js
let txn = new algosdk.Transaction({
  to: 'REKEYED_ACCOUNT',
  from: 'REKEYED_ACCOUNT',
  amount: 100,
  ...suggestedParams,
});

let base64Txn = algorand.encoding.msgpackToBase64(txn.toByte());

let signedTxns = await algorand.signTxns([
  {
    txn: base64Txn,
    authAddr: 'AUTHORIZED_ADDRESS_FOR_REKEY',
  },
]);
```

**Special Considerations**

In cases where both `TxnObject.authAddr` and `TxnObject.msig` are provided, both addresses need to match or the transaction will be rejected.

In cases where both `TxnObject.authAddr` and a `TxnObject.signers` array with a single address are provided, but no `TxnObject.msig` was provided; `authAddr` needs to match the `signer` or the transaction will be rejected.

### algorand.postTxns(stxns: SignedTxn[] | SignedTxn[][])

Send a base64 encoded signed transaction blob to AlgoSigner to transmit to the Network.

**Request**

```js
algorand.postTxns([signedTx]);
```

**Response**

```
export type PostResult = {
  txnIDs: string[] | string[][],
};
```

```json
{
  "txnIDs": [
    "OKU6A2QYMRSZAUEJUZL3PW5XKLTA6TKWQHIIBXDCO3KT5OHCULBA"
  ]
}
```

When providing more than one group of transactions at the same time, all transactions will be sent to the network simultaneously. In case some of the groups were unable to be commited to the network, the returning error will provide information on which ones were successful, as well as the reason behind the failed ones.

```
export type PartialPostError = {
  successTxnIDs: (string | null)[][],
  data: (string | null)[][],
  code: number,
  message: string,
};
```
The `successTxnIDs` property includes the IDs of the transactions that were succesfully commited to the network while the `data` property includes the reasons behind the failing ones. Both arrays are *ordered* respecting the original positions of the provided groups of transactions.

**Request**

```js
algorand.postTxns([successfulTxn], [rejectedTxn]);
```

**Response**

```json
{
  "successTxnIDs": [
    "OKU6A2QYMRSZAUEJUZL3PW5XKLTA6TKWQHIIBXDCO3KT5OHCULBA",
    null,
  ],
  "data": [
    null,
    "Reason behind network refusal",
  ],
  "code": 4400,
  "message": "...",
}
```

### algorand.signAndPostTxns(txnObjects: TxnObject[] | TxnObject[][])

This methods takes the input from [algorand.signTxns()](#algorandsigntxnstxnobjects-txnobject--txnobject) and internally posts the signed transactions to the network before returning the response of [algorand.postTxns()](#algorandposttxnsstxns-signedtxn--signedtxn) to the dApp.

**Request**

```js
algorand.signTxns([
  {
    txn: 'iqNhbXRko2ZlZc0D6KJmds4A259Go2dlbqx0ZXN0bmV0LXYxLjCiZ2jEIEhjtRiks8hOyBDyLU8QgcsPcfBZp6wg3sYvf3DlCToio2dycMQgdsLAGqgrtwqqQS4UEN7O8CZHjfhPTwLHrB1A2pXwvKGibHbOANujLqNyY3bEIK0TEDcptY0uFvk2V5LDVzRfdz7O4freYHEuZbpI+6hMo3NuZMQglmyhKUPeU2KALzt/Jcs0GQ55k2vsqZ4pGeNlzpnYLbukdHlwZaNwYXk=',
  },
]);
```

**Response**

```json
{
  "txnIDs": [
    "OKU6A2QYMRSZAUEJUZL3PW5XKLTA6TKWQHIIBXDCO3KT5OHCULBA"
  ]
}
```

## Custom Networks

- Custom networks beta support is now in AlgoSigner. [Setup Guide](add-network.md)
- algorand.enable() calls accept genesis IDs/hashes that have been added to the user's custom network list as valid networks.
  @TODO: rewrite with new enable
  - A non-matching ledger name will result in a error:
    - The provided ledger is not supported (Code: 4200).
  - An empty request will result with an error:
    - Ledger not provided. Please use a base ledger: [TestNet,MainNet] or an available custom one [{"name":"Theta","genesisId":"thetanet-v1.0"}].
- Transaction requests will require a valid matching "genesisId", even for custom networks.

## Rejection Messages

AlgoSigner may return some of the following error codes when requesting signatures:

| Error Code | Description | Additional notes |
| ---------- | ----------- | ---------------- |
| 4000 | An unknown error occured. | N/A |
| 4001 | The user rejected the signature request. | N/A |
| 4100 | The requested operation and/or account has not been authorized by the user. | This is usually due to the connection between the dApp and the wallet becoming stale and the user [needing to reconnect](connection-issues.md). Otherwise, it may signal that you are trying to sign with private keys not found on AlgoSigner. | 
| 4200 | The wallet does not support the requested operation. | N/A |
| 4201 | The wallet does not support signing that many transactions at a time. | The max number of transactions per group is 16. For Ledger devices, they currently can't sign more than one transaction at the same time. |
| 4202 | The wallet was not initialized properly beforehand. | Users need to have imported or created an account on AlgoSigner before connecting to dApps. |
| 4300 | The input provided is invalid. | AlgoSigner rejected some of the transactions due to invalid fields. |
| 4400 | Some transactions were not sent properly. | Some, but not all of the transactions were able to be posted to the network. The IDs of the succesfully posted transactions as well as information on the failing ones are provided on the error.

Additional information, if available, would be provided in the `data` field of the error object.

Returned errors have the following object structure:

```
{
  message: string;
  code: number;
  name: string;
  data?: any;
}
```

Errors may be passed back to the dApp from the Algorand JS SDK if a transaction is valid, but has some other issue - for example, insufficient funds in the sending account.

## Encoding Functions

`algorand.enconding.*` contains a few different methods in order to help with the different formats and encodings that are needed when working with dApps and the SDK.

```
  algorand.encoding.msgpackToBase64(): receives a binary object (as a Uint8Array) and returns the corresponding base64 encoded string,
  algorand.encoding.base64ToMsgpack(): receives a base64 encoded string and returns the corresponding binary object (as a Uint8Array),
  algorand.encoding.stringToByteArray(): receives a plain unencoded string and returns the corresponding binary object (as a Uint8Array),
  algorand.encoding.byteArrayToString(): receives a binary object (as a Uint8Array) and returns the corresponding plain unencoded string,
```
