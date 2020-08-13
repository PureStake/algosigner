import { getValidatedTxnWrap } from  "./actions";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

test('Valitdate build of pay transaction', () => {
    let preTransaction = {
        "type": "pay",
        "from": "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ",
        "to": "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ",
        "fee": 1000,
        "amount": 12345,
        "firstRound": 1,
        "lastRound": 1001,
        "genesisID": "testnet-v1.0",
        "genesisHash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
        "note": new Uint8Array(0)
    }

    let result = getValidatedTxnWrap(preTransaction, "pay");
    expect(result instanceof BaseValidatedTxnWrap).toBe(true);
});

test('Valitdate build of keygreg transaction', () => {
    let preTransaction = {
        "type": "keyreg",
        "fee": 1000,
        voteKey: "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ",
        selectionKey: "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ",
        voteFirst: 1,
        voteLast: 1001,
        "firstRound": 1,
        "lastRound": 1001,
        "genesisID": "testnet-v1.0",
        "genesisHash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
        "note": new Uint8Array(0)
    }

    let result = getValidatedTxnWrap(preTransaction, "keyreg");
    expect(result instanceof BaseValidatedTxnWrap).toBe(true);
});

test('Valitdate build of acfg transaction', () => {
    let preTransaction = {
        "type": "acfg",
        "fee": 1000,
        "firstRound": 1,
        "lastRound": 1001,
        "genesisID": "testnet-v1.0",
        "genesisHash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
        "note": new Uint8Array(0)
    }

    let result = getValidatedTxnWrap(preTransaction, "acfg");
    expect(result instanceof BaseValidatedTxnWrap).toBe(true);
});

test('Valitdate build of afrz transaction', () => {
    let preTransaction = {
        "type": "afrz",
        "freezeAccount": "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ",
        "freezeState": true,
        "fee": 1000,
        "assetIndex": 1,
        "firstRound": 1,
        "lastRound": 1001,
        "genesisID": "testnet-v1.0",
        "genesisHash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
        "note": new Uint8Array(0)
    }

    let result = getValidatedTxnWrap(preTransaction, "afrz");
    expect(result instanceof BaseValidatedTxnWrap).toBe(true);
});

test('Valitdate build of axfer transaction', () => {
    let preTransaction = {
        "type": "axfer",
        "from": "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ",
        "to": "NM2MBC673SL7TQIKUXD4JOBR3XQITDCHIMIEODQBUGFMAN54QV2VUYWZNQ",
        "fee": 1000,
        "assetIndex": 1,
        "amount": 12345,
        "firstRound": 1,
        "lastRound": 1001,
        "genesisID": "testnet-v1.0",
        "genesisHash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
        "note": new Uint8Array(0)
    }

    let result = getValidatedTxnWrap(preTransaction, "axfer");
    expect(result instanceof BaseValidatedTxnWrap).toBe(true);
});

test('Valitdate build of transaction', () => {
    let preTransaction = {
        "type": "faketype"
    }
    expect(() => getValidatedTxnWrap(preTransaction, "faketype")).toThrow();
});
