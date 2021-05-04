import { IBaseTx } from './baseTx';

///
// Mapping interface of allowable fields for keyreg transactions.
///

// prettier-ignore
export interface IKeyRegistrationTx extends IBaseTx {
  type: string,               //"keyreg"
  voteKey: string,	          //ed25519PublicKey	  "votekey"	The root participation public key. See Generate a Participation Key to learn more.
  selectionKey: string,	      //VrfPubkey	          "selkey"	The VRF public key.
  voteFirst: number,	        //uint64	            "votefst"	The first round that the participation key is valid. Not to be confused with the FirstValid round of the keyreg transaction.
  voteLast: number,	          //uint64	            "votelst"	The last round that the participation key is valid. Not to be confused with the LastValid round of the keyreg transaction.
  voteKeyDilution?: number,	  //uint64	            "votekd"	This is the dilution for the 2-level participation key.
  //nonparticipation	        //bool	              "nonpart"	All new Algorand accounts are participating by default. 
}
