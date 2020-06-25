import { Algodv2, Indexer } from 'algosdk';

const testnetServer = "https://testnet-algorand.api.purestake.io/ps2"
const testnetIndexerServer = "https://testnet-algorand.api.purestake.io/idx2"
const mainnetServer = "https://mainnet-algorand.api.purestake.io/ps2"
const mainnetIndexerServer = "https://mainnet-algorand.api.purestake.io/idx2"
const headers = {
    'X-API-key' : 'ZgqaehGkvP6pSNSaoNoy31Nr61BZlhU29E9ERPRU',
}

export const algodClient = {
	TestNet: new Algodv2(headers, testnetServer, '', ),
	TestNetIndexer: new Indexer(headers, testnetIndexerServer, ''),
	MainNet: new Algodv2(headers, mainnetServer, ''),
	MainNetIndexer: new Indexer(headers, mainnetIndexerServer, ''),
}
