'use strict';
/* eslint-disable */
const algosdk = require('algosdk');
import encryptionWrap from './encryptionWrap';
import createNewAccount from './account/createAccount.js';
import { TransactionType } from '@algosigner/common/types/transaction';
import Background from './background';
Background.start();
