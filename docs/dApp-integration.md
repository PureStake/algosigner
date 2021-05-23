# ![AlgoSigner](/media/algosigner-wallet-banner-3.png)

# Integrating AlgoSigner to add Transaction Capabilities for dApps on Algorand

AlgoSigner injects a JavaScript library into every web page the browser user visits, which allows the site to interact with the extension. The dApp can use the injected library to connect to the user's Wallet, discover account addresses it holds, query the Network (make calls to AlgoD v2 or the Indexer) and request AlgoSigner to inquire the user to sign a transaction initiated by the application. **All methods of the injected library return a Promise that needs to be handled by the dApp.**

A sample dApp was created to showcase the methods described here:

- [Website](https://purestake.github.io/algosigner-dapp-example/) | [GitHub ](https://github.com/PureStake/algosigner-dapp-example)

This guide covers the new v2 Transactions Signing method, docs for the legacy v1 signing are [here](legacy-dApp-integration.md)

## Methods

- [AlgoSigner.connect()](#algosignerconnect)
- [AlgoSigner.accounts({ ledger: ‘MainNet|TestNet’ })](#algosigneraccounts-ledger-mainnettestnet-)
- [AlgoSigner.algod({ ledger: ‘MainNet|TestNet’, path: ‘algod v2 path’, ... })](#algosigneralgod-ledger-mainnettestnet-path-algod-v2-path--)
- [AlgoSigner.indexer({ ledger: ‘MainNet|TestNet’, path: ‘indexer v2 path’ })](#algosignerindexer-ledger-mainnettestnet-path-indexer-v2-path-)

- [AlgoSigner.sign(txnObject)](#algosignersigntxnobject)

- [AlgoSigner.send({ ledger: ‘MainNet|TestNet’, txBlob })](#algosignersend-ledger-mainnettestnet-txblob-)

## Misc

[Rejection Messages](#rejection-messages)

[Working with Custom Networks](#custom-networks)

### AlgoSigner.connect()

Requests access to the Wallet for the dApp, may be rejected or approved. Every access to the extension begins with a connect request, which if approved by the user, allows the dApp to follow-up with other requests.

<img src="dApp_int_images/req-access.png" height="500" />

### AlgoSigner.accounts({ ledger: ‘MainNet|TestNet’ })

Returns an array of accounts present in the Wallet for the given Network.

**Request**

```js
AlgoSigner.accounts({ ledger: 'TestNet' });
```

**Response**

```json
[
  {
    "address": "U2VHSZL3LNGATL3IBCXFCPBTYSXYZBW2J4OGMPLTA4NA2CB4PR7AW7C77E"
  },
  {
    "address": "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
  }
]
```

## [API Calls](#api-calls)

Developers may use AlgoSigner's connection to Algorand and Indexer API services. This is an optional convienance, dApps may establish their own connections to retrieve parameters, query the Indexer, and send transactions to the chain.

Proxied requests are passed through to an API service - currently set to the PureStake API service. Endpoints available are limited to what the service exposes. The API backend may be configured by advanced users and is not guaranteed to respond as expected. Only text responses are supported for this service (not message packed).

### AlgoSigner.algod({ ledger: ‘MainNet|TestNet’, path: ‘algod v2 path’, ... })

Proxies the requested path to the Algod v2 API. Is limited to endpoints made available by the API server. By default, all calls to the AlgoSigner.algod method are GET.

**Request (GET)**

```js
AlgoSigner.algod({
  ledger: 'TestNet',
  path: '/v2/transactions/params',
});
```

**Response**

```json
{
  "consensus-version": "https://github.com/algorandfoundation/specs/tree/e5f565421d720c6f75cdd186f7098495caf9101f",
  "fee": 1,
  "genesis-hash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
  "genesis-id": "testnet-v1.0",
  "last-round": 8271323,
  "min-fee": 1000
}
```

To make a POST requests, more details need to be included in as input. More information can be found [here](https://developer.algorand.org/docs/reference/rest-apis/algod/v2/).

**Request (POST)**

```js
AlgoSigner.algod({
  ledger: 'TestNet',
  path: '/v2/teal/compile',
  body: 'int 0',
  method: 'POST',
  contentType: 'text/plain',
});
```

**Response**

```json
{
  "hash": "KI4DJG2OOFJGUERJGSWCYGFZWDNEU2KWTU56VRJHITP62PLJ5VYMBFDBFE",
  "result": "ASABACI="
}
```

### AlgoSigner.indexer({ ledger: ‘MainNet|TestNet’, path: ‘indexer v2 path’ })

Proxies the requested path to the Indexer v2 API. Is limited to endpoints made available by the API server. The API backend may be configured by advanced users and is not guaranteed to respond as expected. More information can be found [here](https://developer.algorand.org/docs/reference/rest-apis/algod/v2/).

**Request**

```js
AlgoSigner.indexer({
  ledger: 'TestNet',
  path: '/v2/assets/150821',
});
```

**Response**

```json
{
  "asset": {
    "index": 150821,
    "params": {
      "clawback": "Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ",
      "creator": "Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ",
      "decimals": 15,
      "default-frozen": false,
      "freeze": "Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ",
      "manager": "Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ",
      "name": "decimal Test",
      "reserve": "Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ",
      "total": 1000,
      "unit-name": "dectest"
    }
  },
  "current-round": 8271410
}
```

## Working with Transactions

Sent in transactions will be validated against the Algorand JS SDK transaction types - field names must match, and the whole transaction will be rejected otherwise.

### AlgoSigner.sign(txnObject)

Send a transaction object, conforming to the Algorand JS SDK, to AlgoSigner for approval. The Network is determined from the 'genesis-id' property. If approved, the response is a signed transaction object, with the binary blob field base64 encoded to prevent transmission issues.

#### Transaction Requirements

ALL NEW

**Request**

```js
REPLACE;
```

**Response**

```json
{
  "txID": "4F6GE5EBTBJ7DOTWKA3GK4JYARFDCVR5CYEXP6O27FUCE5SGFDYQ",
  "blob": "gqNzaWfEQL6mW/7ss2HKAqsuHN/7ePx11wKSAvFocw5QEDvzSvrvJdzWYvT7ua8Lc0SS0zOmUDDaHQC/pGJ0PNqnu7W3qQKjdHhuiaNhbXQGo2ZlZc4AA7U4omZ2zgB+OrujZ2VurHRlc3RuZXQtdjEuMKJnaMQgSGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiKibHbOAH4+o6NyY3bEIHhydylNDQQhpD9QdKWejLCMBgb5UYJTGCfDW3KgLsI+o3NuZMQgZM5ZNuFgR8pz2dHBgDlmHolfGgF96zX/X4x2bnAJ3aqkdHlwZaNwYXk="
}
```

#### Atomic Transactions

WRITEUP

### AlgoSigner.signMultisig(txn)

WRITEUP

### AlgoSigner.send({ ledger: ‘MainNet|TestNet’, txBlob })

Send a base64 encoded signed transaction blob to AlgoSigner to transmit to the Network.

**Request**

```js
AlgoSigner.send({
  ledger: 'TestNet',
  tx: signedTx.blob,
});
```

**Response**

```json
{ "txId": "OKU6A2QYMRSZAUEJUZL3PW5XKLTA6TKWQHIIBXDCO3KT5OHCULBA" }
```

### Custom Networks

- Custom networks beta support is now in AlgoSigner. [Setup Guide](docs/add-network.md)
- AlgoSigner.accounts(ledger) has changed such that calls now accept names that have been added to the user's custom network list as valid ledger names.
  - A non-matching ledger name will result in a error:
    - [RequestErrors.UnsupportedLedger] The provided ledger is not supported.
  - An empty request will result with an error:
    - Ledger not provided. Please use a base ledger: [TestNet,MainNet] or an available custom one [{"name":"Theta","genesisId":"thetanet-v1.0"}].
- Transaction requests will require a valid matching "genesisId", even for custom networks.

## Rejection Messages

The dApp may return the following errors in case of users rejecting requests, or errors in the request:

```
    NotAuthorized = '[RequestErrors.NotAuthorized] The extension user does not authorize the request.',
    InvalidTransactionParams = '[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.',
    UnsupportedAlgod = '[RequestErrors.UnsupportedAlgod] The provided method is not supported.',
    UnsupportedLedger = '[RequestErrors.UnsupportedLedger] The provided ledger is not supported.',
    Undefined = '[RequestErrors.Undefined] An undefined error occurred.',
```

Errors may be passed back to the dApp from the Algorand JS SDK if a transaction is valid, but has some other issue - for example, insufficient funds in the sending account.
