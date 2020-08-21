# dApp integration through AlgoSigner

AlogSigner injects a JavaScript library for interacting with the extension into every web page the browser user visits. dApp’s may use the injected library to connect to the user’s wallet, discover account addresses, send transactions to the wallet user for signing approval, send signed transactions to the network and query the network. 

The sample dApp at https://purestake.github.io/algosigner-dapp-example/ demonstrates these interactions. Instructions here - https://github.com/PureStake/algosigner-dapp-example.

All access to the extension begins with a connect request -  which if approved by the user, allows the dApp to follow-up with other requests. 

Sent in transactions will be validated against the Algorand JS SDK transaction types - field names must match and the whole transaction will be rejected otherwise. 

Proxied requests are passed through to an API service - currently set to the PureStake API service. Endpoints available are limited to what the service exposes. The API backend may be configured by advanced users and is not guaranteed to respond as expected. 



## Allowed messages

### AlgoSigner.connect()
Requests access to the Wallet for the dApp, may be rejected or approved. 

### AlgoSigner.accounts({ledger: ‘MainNet|TestNet’) 
Returns an array of accounts present in the Wallet for the given network. 

**Request**

``` AlgoSigner.accounts({ledger: 'TestNet'}) ```

**Response**
```[{"address":"U2VHSZL3LNGATL3IBCXFCPBTYSXYZBW2J4OGMPLTA4NA2CB4PR7AW7C77E"},{"address":"MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"}]```

### AlgoSigner.algod({ledger: ‘MainNet|TestNet’, path: ‘algod v2 path’})
Proxies the requested path to the Algod v2 API. Limited to endpoints made available by the API server. 

**GET Request** 

```
AlgoSigner.algod({
ledger: 'TestNet', 
path: '/v2/transactions/params'})
```

**Response** 

``` {"consensus-version":"https://github.com/algorandfoundation/specs/tree/e5f565421d720c6f75cdd186f7098495caf9101f","fee":1,"genesis-hash":"SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=","genesis-id":"testnet-v1.0","last-round":8271323,"min-fee":1000} ```
      
**POST Request** 

``` 
AlgoSigner.algod({
        ledger: 'TestNet',
        path: '/v2/teal/compile',
        body: 'int 0',
        method: 'POST',
        contentType: 'text/plain'
    }) 
```

**Response**     
``` 
{
    hash: 'KI4DJG2OOFJGUERJGSWCYGFZWDNEU2KWTU56VRJHITP62PLJ5VYMBFDBFE',
    result: 'ASABACI='
} 
```


### AlgoSigner.indexer({ledger: ‘MainNet|TestNet’, path: ‘indexer v2 path’})
Proxies the requested path to the Indexer v2 API. Limited to endpoints made available by the API server. The API backend may be configured by advanced users and is not guaranteed to respond as expected. 

**Request** 
```
AlgoSigner.indexer({
                   ledger: 'TestNet',
                   path: '/v2/assets/150821'
               })
```

**Response**
```
{
      asset: {
        index: 150821,
        params: {
          clawback: 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ',
          creator: 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ',
          decimals: 15,
          'default-frozen': false,
          freeze: 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ',
          manager: 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ',
          name: 'decimal Test',
          reserve: 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ',
          total: 1000,
          'unit-name': 'dectest'
        }
      },
      'current-round': 8271410
    }
```


### AlgoSigner.sign()
Send a transaction object, conforming to the Algorand JS SDK, to AlgoSigner for approval. The network is determined from the ‘genesis-id’ property. If approved, response is a signed transaction object, with the binary blob field base64 encoded to prevent transmission issues. 

#### Transaction Requirements
- Must have a valid type ('pay', 'keyreg', 'acfg', 'axfer', 'afrz')
- Must not have additional unknown fields
- Must not have any value in the 'rekey' field
- When provided, address 'to' must be a valid address
- Numeric fields must have values that are considered safe and non-negative
- Fees above 1000 Micro Algos and any usage of 'close' fields ('AssetCloseTo' or 'CloseRemainderTo') will have internal warnings created for display purposes 
- Note field must be a string (you may encrypt it) - not an Uint8, in order to prevent transmission errors

These restrictions can be seen in https://github.com/PureStake/algosigner/blob/master/packages/extension/src/background/utils/validator.ts

Example where txParams is set by a previous call to AlgoSigner.algod().

**Request**        
```
let txn = {
                    "from": accounts[0].address,
                    "to": "PBZHOKKNBUCCDJB7KB2KLHUMWCGAMBXZKGBFGGBHYNNXFIBOYI7ONYBWK4",
                    "fee": txParams['min-fee'],
                    "amount": amount,
                    "firstRound": txParams['last-round'],
                    "lastRound": txParams['last-round'] + 1000,
                    "genesisID": txParams['genesis-id'],
                    "genesisHash": txParams['genesis-hash'],
                    "note": "NOTE is a string"
                };
                AlgoSigner.sign(txn)
```

**Response**
```
{"txID":"4F6GE5EBTBJ7DOTWKA3GK4JYARFDCVR5CYEXP6O27FUCE5SGFDYQ",
"blob":"gqNzaWfEQL6mW/7ss2HKAqsuHN/7ePx11wKSAvFocw5QEDvzSvrvJdzWYvT7ua8Lc0SS0zOmUDDaHQC/pGJ0PNqnu7W3qQKjdHhuiaNhbXQGo2ZlZc4AA7U4omZ2zgB+OrujZ2VurHRlc3RuZXQtdjEuMKJnaMQgSGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiKibHbOAH4+o6NyY3bEIHhydylNDQQhpD9QdKWejLCMBgb5UYJTGCfDW3KgLsI+o3NuZMQgZM5ZNuFgR8pz2dHBgDlmHolfGgF96zX/X4x2bnAJ3aqkdHlwZaNwYXk="}
```

Interrogation of the blob if needed can be accomplished with a basic example shown for NodeJS and Python in the associated sub folders of the example dapp. 

### AlgoSigner.send()
Send a base64 encoded signed transaction blob to AlgoSigner to transmit to the network.

**Request**

```
AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: signedTx.blob
                })
```

**Response**
```
{"txId":"OKU6A2QYMRSZAUEJUZL3PW5XKLTA6TKWQHIIBXDCO3KT5OHCULBA"}
```

## Rejection Messages

The following errors may be returned by the dApp in case of users rejecting requests or errors in the request:

```
    NotAuthorized = '[RequestErrors.NotAuthorized] The extension user does not authorize the request.',
    InvalidTransactionParams = '[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.',
    UnsupportedAlgod = '[RequestErrors.UnsupportedAlgod] The provided method is not supported.',
    UnsupportedLedger = '[RequestErrors.UnsupportedLedger] The provided ledger is not supported.',
    Undefined = '[RequestErrors.Undefined] An undefined error occurred.',
```

Errors may be passed back to the dApp from the Algorand JS SDK if a transaction is valid, but has some other issue - for example insufficient funds in the sending account. 
