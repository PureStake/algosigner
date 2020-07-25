'use strict';
const algosdk = require("algosdk");
import encryptionWrap from "./encryptionWrap";
import createNewAccount from "./account/createAccount.js";
import { signTransaction } from "./transaction/actions";
import { TransactionType } from "@algosigner/common/types/transaction";
import Background from './background';
Background.start();