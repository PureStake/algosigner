export const MULTISIG_TOOLTIP: string = `This is a Multisignature transaction.
Only signatures from the displayed
accounts will be added.`;

export const NETWORK_HEADERS_TOOLTIP: string = `Network Headers use API Token:
 x-algo-api-token

Or use individual keys to Algod
and Indexer in JSON format:
 {
	"Algod": {
		"x-api-key": "xxxxxxxxx"
	},
	"Indexer": {
		"x-api-key": "xxxxxxxxx"
	}
 }`;

export const REFERENCE_ACCOUNT_TOOLTIP: string = `Reference accounts allow account tracking in AlgoSigner, but
they do not contain signing keys. They can only sign transactions if
they are rekeyed to another normal account also on AlgoSigner.`;
