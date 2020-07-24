/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 75);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export JSONRPC_VERSION */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsonRpcMethod; });
/* unused harmony export SupportedAlgod */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MessageSource; });
const JSONRPC_VERSION = "2.0";
let JsonRpcMethod;

(function (JsonRpcMethod) {
  JsonRpcMethod["Heartbeat"] = "heartbeat";
  JsonRpcMethod["Authorization"] = "authorization";
  JsonRpcMethod["AuthorizationAllow"] = "authorization-allow";
  JsonRpcMethod["AuthorizationDeny"] = "authorization-deny";
  JsonRpcMethod["SignTransaction"] = "sign-transaction";
  JsonRpcMethod["Algod"] = "algod";
  JsonRpcMethod["Indexer"] = "indexer";
  JsonRpcMethod["Accounts"] = "accounts";
  JsonRpcMethod["CreateWallet"] = "create-wallet";
  JsonRpcMethod["CreateAccount"] = "create-account";
  JsonRpcMethod["SaveAccount"] = "save-account";
  JsonRpcMethod["ImportAccount"] = "import-account";
  JsonRpcMethod["DeleteAccount"] = "delete-account";
  JsonRpcMethod["GetSession"] = "get-session";
  JsonRpcMethod["Login"] = "login";
  JsonRpcMethod["AccountDetails"] = "account-details";
  JsonRpcMethod["Transactions"] = "transactions";
  JsonRpcMethod["AssetDetails"] = "asset-details";
  JsonRpcMethod["SignSendTransaction"] = "sign-send-transaction";
})(JsonRpcMethod || (JsonRpcMethod = {}));

let SupportedAlgod;

(function (SupportedAlgod) {
  SupportedAlgod["Status"] = "status";
})(SupportedAlgod || (SupportedAlgod = {}));

let MessageSource;

(function (MessageSource) {
  MessageSource["Extension"] = "extension";
  MessageSource["DApp"] = "dapp";
  MessageSource["Router"] = "router";
  MessageSource["UI"] = "ui";
})(MessageSource || (MessageSource = {}));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EncryptionWrap */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _algosigner_crypto_dist_secureStorageContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _algosigner_crypto_dist_secureStorageContext__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_algosigner_crypto_dist_secureStorageContext__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _algosigner_storage_dist_extensionStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _algosigner_storage_dist_extensionStorage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_algosigner_storage_dist_extensionStorage__WEBPACK_IMPORTED_MODULE_2__);


/**
 * @license
 * Copyright 2020 
 * =========================================
*/

 ///
// Wrapper for the crypto functionality used in AlgoSigner. 
// Allows for locking and unlocking the extention account wallet. 
///

class EncryptionWrap {
  // Name of wallet to be modified.
  // The wrap method of encryption.
  // The wrap method of storage.
  constructor(params) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_walletName", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_localEncryption", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_extensionStorage", void 0);

    this._walletName = params && params["walletname"] || "defaultwalletname";
    this._localEncryption = params && params["encryption"] || new _algosigner_crypto_dist_secureStorageContext__WEBPACK_IMPORTED_MODULE_1__["SecureStorageContext"]();
    this._extensionStorage = params && params["storage"] || new _algosigner_storage_dist_extensionStorage__WEBPACK_IMPORTED_MODULE_2__["ExtensionStorage"]();
  } ///
  // ** Helper Method **
  // Using the provided Uint8Array Buffer, create a string value. 
  ///


  arrayBufferToString(uint8Array) {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(uint8Array)));
  } ///
  // ** Helper Method **
  // From the provided string, create an Uint8Array Buffer object.
  // This can be used as a quick conversion of saved data string into a format for decryption.
  ///


  stringToUint8ArrayBuffer(rawString) {
    var arrBuffer = new ArrayBuffer(rawString.length);
    var uint8Array = new Uint8Array(arrBuffer);

    for (var i = 0; i < rawString.length; i++) {
      uint8Array[i] = rawString.charCodeAt(i);
    }

    return arrBuffer;
  } ///
  // ** Helper Method **
  // From the provided array of integers in string form, create an Uint8Array object.
  ///


  uint8ArrayReconstruct(stringArray) {
    return new Uint8Array(stringArray.split(',').map(x => parseInt(x)));
  }

  errorLog(error) {
    // TODO: BC - How should we handle errors?
    console.log(error);
  } ///
  // Lock an object using the lock parameters which contain the 
  //  unencrypted object to be locked and passphrase.
  // Callback or return via async/await for multiple ways of returning information.
  ///


  async lock(params, callback) {
    try {
      // Await the encryption step. This will take time based on the user's machine processing capability. 
      let encryptedAccount = await this._localEncryption.lock(params); // TODO: BC - Account object creation and deconstruction should be uniform and use a class/interface.
      // Prepare data for extension storage, creating a JSON saveObject.
      // The account data needs to be mapped to an array, then it and the salt and iv need to have encoding acceptible for saving.

      let saveObject = {
        account: this.arrayBufferToString(encryptedAccount),
        params: {
          salt: this._localEncryption.security.salt.toString(),
          iv: this._localEncryption.security.iv.toString(),
          iterations: this._localEncryption.security.iterations
        }
      }; // After resolution of the set storage operation callback with status of success. 

      this._extensionStorage.setStorage(this._walletName, saveObject, isSuccessful => {
        callback && callback(isSuccessful);
      });
    } catch (e) {
      this.errorLog(e);
    }
  } ///
  // Unlock an encrypted object using the lock parameters which contain the 
  //  encrypted object or encrypted local account object if not provided and the passphrase.
  // Callback returns decrypted or a failed login object.
  ///


  async unlock(params, callback) {
    // Remap lockParams style to not confuse with security parameters.
    let lockParams = params;

    try {
      // Retrieve the object from the storage location, then attempt to decrypt the value.
      this._extensionStorage.getStorage(this._walletName, async result => {
        if (!result) {
          // No accounts
          callback && callback({
            TestNet: [],
            MainNet: []
          });
          return;
        } // We retrieved a value and mapped to the expected saved object format.
        // Modify the account, salt, and iv values back to array buffer objects.
        // Create a security model and lock model with these and attempt the decryption.


        let decryptionContext = new _algosigner_crypto_dist_secureStorageContext__WEBPACK_IMPORTED_MODULE_1__["SecureStorageContext"]();
        let decryptSecurity = new _algosigner_crypto_dist_secureStorageContext__WEBPACK_IMPORTED_MODULE_1__["PBKDF2Security"](this.uint8ArrayReconstruct(result.params.salt), this.uint8ArrayReconstruct(result.params.iv), result.params.iterations);
        decryptionContext.security = decryptSecurity;
        lockParams.encryptObject = this.stringToUint8ArrayBuffer(result.account); // Await the unlock and callback with the string interpretation.

        await decryptionContext.unlock(lockParams).then(decryptedObject => {
          callback && callback(JSON.parse(this.arrayBufferToString(decryptedObject)));
        }).catch(e => {
          this.errorLog(e);
          callback && callback({
            error: 'Login Failed'
          });
        });
      });
    } catch (e) {
      this.errorLog(e);
    }
  }

  async checkStorage(callback) {
    try {
      // Retrieve the object from the storage location, then attempt to decrypt the value.
      this._extensionStorage.getStorage(this._walletName, async result => {
        if (!result) callback(false);else callback(true);
      });
    } catch (e) {
      this.errorLog(e);
    }
  }

}
const encryptionWrap = new EncryptionWrap();
/* harmony default export */ __webpack_exports__["a"] = (encryptionWrap);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Ledger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Backend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API; });
// Key and value must match in this enum so we
// can compare its existance with i.e. "Testnet" in SupportedLedger
let Ledger;

(function (Ledger) {
  Ledger["TestNet"] = "TestNet";
  Ledger["MainNet"] = "MainNet";
})(Ledger || (Ledger = {}));

let Backend;

(function (Backend) {
  Backend["PureStake"] = "PureStake";
  Backend["Algod"] = "Algod";
})(Backend || (Backend = {}));

let API;

(function (API) {
  API["Algod"] = "Algod";
  API["Indexer"] = "Indexer";
})(API || (API = {}));

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternalMethods; });
/* harmony import */ var _algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);






const algosdk = __webpack_require__(16);

const helper = new _utils_helper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]();
class InternalMethods {
  static getAlgod(ledger) {
    const params = _config__WEBPACK_IMPORTED_MODULE_1__[/* Settings */ "a"].getBackendParams(ledger, _types__WEBPACK_IMPORTED_MODULE_2__[/* API */ "a"].Algod);
    return new algosdk.Algodv2(params.apiKey, params.url, params.port);
  }

  static getIndexer(ledger) {
    const params = _config__WEBPACK_IMPORTED_MODULE_1__[/* Settings */ "a"].getBackendParams(ledger, _types__WEBPACK_IMPORTED_MODULE_2__[/* API */ "a"].Indexer);
    return new algosdk.Indexer(params.apiKey, params.url, params.port);
  }

  static safeWallet(wallet) {
    let safeWallet = {
      TestNet: [],
      MainNet: []
    };

    for (var i = 0; i < wallet.TestNet.length; i++) {
      const {
        address,
        name
      } = wallet['TestNet'][i];
      safeWallet.TestNet.push({
        address: address,
        name: wallet.TestNet[i].name
      });
    }

    for (var i = 0; i < wallet.MainNet.length; i++) {
      const {
        address,
        name
      } = wallet['MainNet'][i];
      safeWallet.MainNet.push({
        address: address,
        name: wallet.MainNet[i].name
      });
    }

    return safeWallet;
  }

  static getHelperSession() {
    return helper.session;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].GetSession](request, sendResponse) {
    _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].checkStorage(exist => {
      if (!exist) {
        sendResponse({
          exist: false
        });
      } else {
        if (helper.session) sendResponse({
          exist: true,
          session: helper.session
        });else sendResponse({
          exist: true
        });
      }
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].CreateWallet](request, sendResponse) {
    const newWallet = {
      TestNet: [],
      MainNet: []
    };
    _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].lock({
      passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(request.body.params.passphrase),
      encryptObject: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(JSON.stringify(newWallet))
    }, isSuccessful => {
      if (isSuccessful) {
        helper.session = this.safeWallet(newWallet);
        sendResponse(helper.session);
      } else {
        sendResponse({
          error: 'Lock failed'
        });
      }
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].Login](request, sendResponse) {
    const unlockParam = {
      passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(request.body.params.passphrase)
    };
    _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].unlock(unlockParam, response => {
      if ('error' in response) {
        sendResponse(response);
      } else {
        helper.session = this.safeWallet(response);
        sendResponse(helper.session);
      }
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].CreateAccount](request, sendResponse) {
    var keys = algosdk.generateAccount();
    var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    sendResponse([mnemonic, keys.addr]);
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].SaveAccount](request, sendResponse) {
    const {
      mnemonic,
      name,
      ledger,
      address,
      passphrase
    } = request.body.params;
    const unlockParam = {
      passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(passphrase)
    };
    _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].unlock(unlockParam, unlockedValue => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        let newAccount = {
          address: address,
          mnemonic: mnemonic,
          name: name
        };
        unlockedValue[ledger].push(newAccount);
        _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].lock({
          passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(request.body.params.passphrase),
          encryptObject: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(JSON.stringify(unlockedValue))
        }, isSuccessful => {
          if (isSuccessful) {
            helper.session = this.safeWallet(unlockedValue);
            sendResponse(helper.session);
          } else {
            sendResponse({
              error: 'Lock failed'
            });
          }
        });
      }
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].DeleteAccount](request, sendResponse) {
    const {
      ledger,
      address,
      passphrase
    } = request.body.params;
    const unlockParam = {
      passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(passphrase)
    };
    _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].unlock(unlockParam, unlockedValue => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        // Find address to delete
        for (var i = unlockedValue[ledger].length - 1; i >= 0; i--) {
          if (unlockedValue[ledger][i].address === address) {
            unlockedValue[ledger].splice(i, 1);
            break;
          }
        }

        _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].lock({
          passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(request.body.params.passphrase),
          encryptObject: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(JSON.stringify(unlockedValue))
        }, isSuccessful => {
          if (isSuccessful) {
            helper.session = this.safeWallet(unlockedValue);
            sendResponse(helper.session);
          } else {
            sendResponse({
              error: 'Lock failed'
            });
          }
        });
      }
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].ImportAccount](request, sendResponse) {
    const {
      mnemonic,
      name,
      ledger
    } = request.body.params;
    const unlockParam = {
      passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(request.body.params.passphrase)
    };

    try {
      var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
      var newAccount = {
        address: recoveredAccount.addr,
        mnemonic: mnemonic,
        name: name
      };
    } catch (error) {
      sendResponse({
        error: error.message
      });
      return false;
    }

    _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].unlock(unlockParam, unlockedValue => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        unlockedValue[ledger].push(newAccount);
        _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].lock({
          passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(request.body.params.passphrase),
          encryptObject: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(JSON.stringify(unlockedValue))
        }, isSuccessful => {
          if (isSuccessful) {
            helper.session = this.safeWallet(unlockedValue);
            sendResponse(helper.session);
          } else {
            sendResponse({
              error: 'Lock failed'
            });
          }
        });
      }
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].AccountDetails](request, sendResponse) {
    const {
      ledger,
      address
    } = request.body.params;
    const algod = this.getAlgod(ledger);
    algod.accountInformation(address).do().then(res => {
      sendResponse(res);
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].Transactions](request, sendResponse) {
    let indexer = this.getIndexer(request.body.params.ledger);
    let txs = indexer.lookupAccountTransactions(request.body.params.address);
    if (request.body.params.limit) txs.limit(request.body.params.limit);
    if (request.body.params['next-token']) txs.nextToken(request.body.params['next-token']);
    txs.do().then(res => {
      sendResponse(res);
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].AssetDetails](request, sendResponse) {
    let indexer = this.getIndexer(request.body.params.ledger);
    indexer.lookupAssetByID(request.body.params['asset-id']).do().then(res => {
      sendResponse(res);
    });
    return true;
  }

  static [_algosigner_common_messaging_types__WEBPACK_IMPORTED_MODULE_0__[/* JsonRpcMethod */ "a"].SignSendTransaction](request, sendResponse) {
    const {
      ledger,
      address,
      to,
      amount,
      note,
      passphrase
    } = request.body.params;
    var algod = this.getAlgod(ledger);
    const unlockParam = {
      passphrase: _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stringToUint8ArrayBuffer(passphrase)
    };
    _encryptionWrap__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].unlock(unlockParam, async unlockedValue => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
        return false;
      }

      let account; // Find address to send algos from

      for (var i = unlockedValue[ledger].length - 1; i >= 0; i--) {
        if (unlockedValue[ledger][i].address === address) {
          account = unlockedValue[ledger][i];
          break;
        }
      }

      var recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);
      let params = await algod.getTransactionParams().do();
      let txn = {
        "from": address,
        "to": to,
        "fee": params.fee,
        "amount": +amount,
        "firstRound": params.firstRound,
        "lastRound": params.lastRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesisHash,
        "note": new Uint8Array(Buffer.from(note, "base64"))
      };
      const txHeaders = {
        'Content-Type': 'application/x-binary'
      };
      let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
      algod.sendRawTransaction(signedTxn.blob, txHeaders).do().then(resp => {
        sendResponse({
          txId: resp.txId
        });
      }).catch(e => {
        console.log('error', e.message);
        sendResponse({
          error: e.message
        });
      });
    });
    return true;
  }

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(24)
var ieee754 = __webpack_require__(25)
var isArray = __webpack_require__(26)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This file is a wrapper of msgpack.js.
 * The wrapper was written in order to ensure correct encoding of Algorand Transaction and other formats.
 * In particular, it matches go-algorand blockchain client, written in go (https://www.github.com/algorand/go-algorand.
 * Algorand's msgpack encoding follows to following rules -
 *  1. Every integer must be encoded to the smallest type possible (0-255->8bit, 256-65535->16bit, etx)
 *  2. All fields names must be sorted
 *  3. All empty and 0 fields should be omitted
 *  4. Every positive number must be encoded as uint
 *  5. Binary blob should be used for binary data and string for strings
 *  */

const msgpack = __webpack_require__(32);

// Errors
const ERROR_CONTAINS_EMPTY = new Error("The object contains empty or 0 values");

/**
 * containsEmpty returns true if any of the object's values are empty, false otherwise.
 * Empty arrays considered empty
 * @param obj
 * @returns {boolean} true if contains empty, false otherwise
 */
function containsEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key] || obj[key].length === 0) return true;
        }
    }
    return false;
}

/**
 * encode encodes objects using msgpack
 * @param obj a dictionary to be encoded. Must not contain empty or 0 values.
 * @returns {Uint8Array} msgpack representation of the object
 * @throws ERROR_CONTAINS_EMPTY if the object contains empty or zero values
 */
function encode(obj) {
    // Check for empty values
    if (containsEmpty(obj)) {throw ERROR_CONTAINS_EMPTY;}

    // enable the canonical option
    let options = {sortKeys: true};
    return msgpack.encode(obj, options);
}

function decode(obj) {
    return msgpack.decode(obj);
}

module.exports = {encode, decode, ERROR_CONTAINS_EMPTY};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const nacl = __webpack_require__(27);
const sha512 = __webpack_require__(29);

function genericHash(arr) {
    return sha512.sha512_256.array(arr);
}

function randomBytes(length) {
    return nacl.randomBytes(length);
}

function keyPair() {
    let seed = randomBytes(nacl.box.secretKeyLength);
    return keyPairFromSeed(seed);
}

function keyPairFromSeed(seed) {
    return nacl.sign.keyPair.fromSeed(seed);
}

function keyPairFromSecretKey(sk) {
    return nacl.sign.keyPair.fromSecretKey(sk);
}

function sign(msg, secretKey) {
    return nacl.sign.detached(msg, secretKey);
}

function bytesEqual(a, b) {
    return nacl.verify(a, b);
}

function verify(message, signature, verifyKey) {
    return nacl.sign.detached.verify(message, signature, verifyKey);
}

module.exports = {genericHash, randomBytes, keyPair, sign, keyPairFromSeed, keyPairFromSecretKey, bytesEqual, verify};

// constants
module.exports.PUBLIC_KEY_LENGTH = nacl.sign.publicKeyLength;
module.exports.SECRET_KEY_LENGTH = nacl.sign.secretKeyLength;
module.exports.HASH_BYTES_LENGTH = 32;
module.exports.SEED_BTYES_LENGTH = 32;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _messaging_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


class Settings {
  static getBackendParams(ledger, api) {
    return {
      url: this.backend_settings[this.backend][ledger][api].url,
      port: this.backend_settings[this.backend][ledger][api].port,
      apiKey: this.backend_settings[this.backend].apiKey
    };
  }

}

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(Settings, "backend", _messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* Backend */ "b"].PureStake);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(Settings, "backend_settings", {
  [_messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* Backend */ "b"].PureStake]: {
    [_messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* Ledger */ "c"].TestNet]: {
      [_messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* API */ "a"].Algod]: {
        url: "https://algosigner.api.purestake.run/testnet/algod",
        port: ""
      },
      [_messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* API */ "a"].Indexer]: {
        url: "https://algosigner.api.purestake.run/testnet/indexer",
        port: ""
      }
    },
    [_messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* Ledger */ "c"].MainNet]: {
      [_messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* API */ "a"].Algod]: {
        url: "https://algosigner.api.purestake.run/mainnet/algod",
        port: ""
      },
      [_messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* API */ "a"].Indexer]: {
        url: "https://algosigner.api.purestake.run/mainnet/indexer",
        port: ""
      }
    },
    apiKey: {
      'X-API-key': 'ZgqaehGkvP6pSNSaoNoy31Nr61BZlhU29E9ERPRU'
    }
  }
});

;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * ArrayEqual takes two arrays and return true if equal, false otherwise
 * @return {boolean}
 */
function arrayEqual(a, b) {
    if (a.length !== b.length) {return false;}
    return a.every((val, i) => val === b[i]);
}

/**
 * ConcatArrays takes two array and returns a joint array of both
 * @param a
 * @param b
 * @returns {Uint8Array} [a,b]
 */
function concatArrays(a, b) {
    let c = new Uint8Array(a.length + b.length);
    c.set(a);
    c.set(b, a.length);
    return c;
}

module.exports = {arrayEqual, concatArrays};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory();else {}
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = "./src/extensionStorage.ts");
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      "./src/extensionStorage.ts":
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict"; // ESM COMPAT FLAG

        __webpack_require__.r(__webpack_exports__); // EXPORTS


        __webpack_require__.d(__webpack_exports__, "ExtensionStorage", function () {
          return (
            /* binding */
            extensionStorage_ExtensionStorage
          );
        }); // CONCATENATED MODULE: ../common/src/chrome.js
        //@ts-ignore


        const extension = chrome || undefined; //|| browser 
        // TODO: This file needs to handle the chrome browser context or other browers as well. 
        // CONCATENATED MODULE: ./src/extensionStorage.ts

        /**
         * @license
         * Copyright 2020
         * =========================================
        */
        ///
        // Handles the setting and retrieval of data into the browser storage.local location. 
        ///

        class extensionStorage_ExtensionStorage {
          constructor() {} ///
          // Takes an objectName and saveObject and sets or overrides a storage.local instance of this combo.
          // Callback: Callback will return a boolean of true if storage sets without error or false otherwise. 
          ///


          setStorage(objectName, saveObject, callback) {
            console.log(`Setting storage with an object that is a type of ${typeof saveObject} and value: \n{${objectName}:${saveObject}}`);
            extension.storage.local.set({
              [objectName]: saveObject
            }, () => {
              let isSuccessful = !extension.runtime.lastError;

              if (!isSuccessful) {
                //TODO: How to handle save failures?
                console.log(extension.runtime.lastError && `Chrome error: ${extension.runtime.lastError.message}`);
              }

              callback && callback(isSuccessful);
            });
          } ///
          // Uses the provided objectName and returns any associated storage.local item.
          // Callback: Callback will return a boolean of true if an account exists or false if no account is present. 
          ///


          getStorage(objectName, callback) {
            extension.storage.local.get([objectName], result => {
              callback && callback(result[objectName]);
            });
          } ///
          // Check for the existance of a wallet account.
          // Callback: Callback will return a boolean of true if an account exists or false if no account is present. 
          ///


          noAccountExistsCheck(objectName, callback) {
            extension.storage.local.get([objectName], function (result) {
              if (result[objectName]) {
                callback && callback(true);
              } else {
                callback && callback(false);
              }
            });
          } ///
          // **Testing Method** 
          // View raw storage.local extension data.
          // Callback: Callback will return all data stored for the extension. 
          ///


          getStorageLocal(callback) {
            extension.storage.local.get(null, result => {
              if (!extension.runtime.lastError) {
                callback(JSON.stringify(result));
              }
            });
          } ///
          // **Testing Method** 
          // Clear storage.local extension data.
          // Callback: Callback will return true if successful, false if there is an error. 
          ///


          clearStorageLocal(callback) {
            extension.storage.local.clear(() => {
              if (!extension.runtime.lastError) {
                console.log('Clearing of local data successful.');
                callback && callback(true);
              } else {
                console.log('Clearing of local data faiiled.');
                callback && callback(false);
              }
            });
          }

        }

        const extensionStorage = new extensionStorage_ExtensionStorage();
        /* harmony default export */

        var src_extensionStorage = __webpack_exports__["default"] = extensionStorage;
        /***/
      }
      /******/

    })
  );
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const base32 = __webpack_require__(19);
const nacl = __webpack_require__(7);
const utils = __webpack_require__(9);

const ALGORAND_ADDRESS_BYTE_LENGTH = 36;
const ALGORAND_CHECKSUM_BYTE_LENGTH = 4;
const ALGORAND_ADDRESS_LENGTH = 58;
const ALGORAND_ZERO_ADDRESS_STRING = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ";

// Convert "MultisigAddr" UTF-8 to byte array
const MULTISIG_PREIMG2ADDR_PREFIX = new Uint8Array([77, 117, 108, 116, 105, 115, 105, 103, 65, 100, 100, 114]);

const MALFORMED_ADDRESS_ERROR = new Error("address seems to be malformed");
const INVALID_MSIG_VERSION = new Error("invalid multisig version");
const INVALID_MSIG_THRESHOLD = new Error("bad multisig threshold");
const INVALID_MSIG_PK = new Error("bad multisig public key - wrong length");
const UNEXPECTED_PK_LEN = new Error("nacl public key length is not 32 bytes");

/**
 * isValidAddress takes an Algorand address and checks if valid.
 * @param address Algorand address
 * @returns {boolean}n true if valid, false otherwise
 */
function isValidAddress(address) {
    if (typeof address !== "string") return false;

    if (address.length !== ALGORAND_ADDRESS_LENGTH) return false;

    // Try to decode
    let decoded;
    try {
        decoded = decode(address);
    } catch (e) {
        return false;
    }

    // Compute checksum
    let checksum = nacl.genericHash(decoded.publicKey).slice(nacl.HASH_BYTES_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH,nacl.HASH_BYTES_LENGTH);

    // Check if the checksum and the address are equal
    return utils.arrayEqual(checksum, decoded.checksum);
}

function decode(address) {
    if (!(typeof address === "string" || address instanceof String)) throw MALFORMED_ADDRESS_ERROR;

    //try to decode
    let decoded = base32.decode.asBytes(address);

    // Sanity check
    if (decoded.length !== ALGORAND_ADDRESS_BYTE_LENGTH) throw MALFORMED_ADDRESS_ERROR;

    let pk = new Uint8Array(decoded.slice(0, ALGORAND_ADDRESS_BYTE_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH));
    let cs = new Uint8Array(decoded.slice(nacl.PUBLIC_KEY_LENGTH, ALGORAND_ADDRESS_BYTE_LENGTH));

    return {"publicKey": pk, "checksum": cs}
}

function encode(address) {
    //compute checksum
    let checksum = nacl.genericHash(address).slice(nacl.PUBLIC_KEY_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH, nacl.PUBLIC_KEY_LENGTH);
    let addr = base32.encode(utils.concatArrays(address, checksum));

    return addr.toString().slice(0, ALGORAND_ADDRESS_LENGTH); // removing the extra '===='
}

/**
 * fromMultisigPreImg takes multisig parameters and returns a 32 byte typed array public key,
 * representing an address that identifies the "exact group, version, and public keys" that are required for signing.
 * Hash("MultisigAddr" || version uint8 || threshold uint8 || PK1 || PK2 || ...)
 * Encoding this output yields a human readable address.
 * @param version multisig version
 * @param threshold multisig threshold
 * @param pks array of typed array public keys
 */
function fromMultisigPreImg({version, threshold, pks}) {
    if (version !== 1 || version > 255 || version < 0) {
        // ^ a tad redundant, but in case in the future version != 1, still check for uint8
        throw INVALID_MSIG_VERSION;
    }
    if (threshold === 0 || pks.length === 0 || threshold > pks.length || threshold > 255) {
        throw INVALID_MSIG_THRESHOLD;
    }
    let pkLen = ALGORAND_ADDRESS_BYTE_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH;
    if (pkLen !== nacl.PUBLIC_KEY_LENGTH) {
        throw UNEXPECTED_PK_LEN;
    }
    let merged = new Uint8Array(MULTISIG_PREIMG2ADDR_PREFIX.length + 2 + pkLen*pks.length);
    merged.set(MULTISIG_PREIMG2ADDR_PREFIX, 0);
    merged.set([version], MULTISIG_PREIMG2ADDR_PREFIX.length);
    merged.set([threshold], MULTISIG_PREIMG2ADDR_PREFIX.length + 1);
    for (var i = 0; i < pks.length; i++) {
        if (pks[i].length !== pkLen) {
            throw INVALID_MSIG_PK;
        }
        merged.set(pks[i], MULTISIG_PREIMG2ADDR_PREFIX.length + 2 + i*pkLen);
    }
    return nacl.genericHash(merged);
}

/**
 * fromMultisigPreImgAddrs takes multisig parameters and returns a human readable Algorand address.
 * This is equivalent to fromMultisigPreImg, but interfaces with encoded addresses.
 * @param version multisig version
 * @param threshold multisig threshold
 * @param addrs array of encoded addresses
 */
function fromMultisigPreImgAddrs({version, threshold, addrs}) {
    const pks = addrs.map(addr => {
        return decode(addr).publicKey;
    });
    return encode(fromMultisigPreImg({version, threshold, pks}));
}

module.exports = {isValidAddress, decode, encode, fromMultisigPreImg, fromMultisigPreImgAddrs, MALFORMED_ADDRESS_ERROR,
    INVALID_MSIG_VERSION, INVALID_MSIG_THRESHOLD, INVALID_MSIG_PK, UNEXPECTED_PK_LEN, ALGORAND_ZERO_ADDRESS_STRING};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var request = __webpack_require__(35);

/**
 * removeEmpty gets a dictionary and removes empty values
 * @param obj
 * @returns {*}
 */
function removeEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key] || obj[key].length === 0) delete obj[key];
        }
    }
    return obj;
}

function HTTPClient(token, baseServer, port, headers={}) {
    // Do not need colon if port is empty
    if (port !== '') {
        baseServer += ":" + port.toString();
    }
    this.address = baseServer;
    this.token = token;
    this.defaultHeaders = headers;

    this.get = async function (path, query, requestHeaders={}) {
        try {
            return await request
                .get(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .set('Accept', 'application/json')
                .query(removeEmpty(query));
        } catch (e) {
            throw e;
        }
    };

    this.post = async function (path, data, requestHeaders={}) {
        try {
            return await request
                .post(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .send(data);
        } catch (e) {
            throw e.response;
        }
    };

    this.delete = async function (path, data, requestHeaders={}) {
        try {
            return await request
                .delete(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .send(data);
        } catch (e) {
            throw e.response;
        }
    };
}

module.exports = { HTTPClient };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory();else {}
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = "./src/secureStorageContext.ts");
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      "./src/secureStorageContext.ts":
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict"; // ESM COMPAT FLAG

        __webpack_require__.r(__webpack_exports__); // EXPORTS


        __webpack_require__.d(__webpack_exports__, "SecureStorageContext", function () {
          return (
            /* binding */
            secureStorageContext_SecureStorageContext
          );
        });

        __webpack_require__.d(__webpack_exports__, "LockParameters", function () {
          return (
            /* reexport */
            LockParameters
          );
        });

        __webpack_require__.d(__webpack_exports__, "PBKDF2Security", function () {
          return (
            /* reexport */
            pbkdf2Security_PBKDF2Security
          );
        });

        __webpack_require__.d(__webpack_exports__, "PBKDF2Parameters", function () {
          return (
            /* reexport */
            PBKDF2Parameters
          );
        }); // CONCATENATED MODULE: ./src/lockParameters.ts

        /**
         * @license
         * Copyright 2020
         * =========================================
        */
        ///
        // Class used as parameters for locking and unlocking wallet information.
        ///


        class LockParameters {
          // Used initiate information around an encrypt object. Can be compatible with existing blobs, using the same version and salt.
          constructor(passphrase, encryptObject, compatibleWithBlob) {
            this.passphrase = passphrase;
            this.encryptObject = encryptObject;

            if (compatibleWithBlob) {
              this.cVersion = compatibleWithBlob.security.version;
              this.cSalt = compatibleWithBlob.security.salt;
            }
          }

        } // CONCATENATED MODULE: ./src/pbkdf2Parameters.ts

        /**
         * @license
         * Copyright 2020
         * =========================================
        */
        ///
        // Number of iterations, quantized to amounts based on strength. 
        // Weak should only be used in low-end devices where increased speed of derivation is required. 
        ///


        var Iterations;

        (function (Iterations) {
          Iterations[Iterations["WEAK"] = 200000] = "WEAK";
          Iterations[Iterations["MEDIUM"] = 1000000] = "MEDIUM";
          Iterations[Iterations["STRONG"] = 5000000] = "STRONG";
        })(Iterations || (Iterations = {}));

        ; ///
        // The PBKDF2 parameters. We use a salt and IV size of 32 with one of the set options for iterations.
        ///

        const PBKDF2Parameters = {
          Iterations: Iterations,
          SaltSize: 32,
          IVSize: 32
        }; // CONCATENATED MODULE: ./src/pbkdf2Security.ts

        /**
         * @license
         * Copyright 2020
         * =========================================
        */
        ///
        // Encryption values for password derivation and encryption.
        ///

        class pbkdf2Security_PBKDF2Security {
          // Creation requires a salt, iv, and an iterations amount that matches a PBKDF2Parameters.Iterations value.
          constructor(salt, iv, iterations) {
            if (salt.byteLength != PBKDF2Parameters.SaltSize || iv.byteLength != PBKDF2Parameters.IVSize) {
              throw new RangeError(`The Salt and IV byteLengths must be ${PBKDF2Parameters.SaltSize} and ${PBKDF2Parameters.IVSize}.`);
            }

            this.salt = salt;
            this.iv = iv;
            this.version = 1; // Currently the only version, will need to parameterize when a new version is created
            // Restrict iteration values to a default option.

            if (!Object.values(PBKDF2Parameters.Iterations).includes(iterations)) {
              throw new RangeError("The iterations value must match a PBKDF2Parameters.Iterations value.");
            }

            this.iterations = iterations;
          }

        } // CONCATENATED MODULE: ./src/errors/types.ts


        class InvalidCipherText extends Error {
          constructor(message) {
            message ? super(message) : super();
            this.name = 'InvalidCipherText';
            Error.captureStackTrace(this, InvalidCipherText);
          }

        } // CONCATENATED MODULE: ./src/secureStorageContext.ts

        /**
         * @license
         * Copyright 2020
         * =========================================
        */


        var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function (resolve) {
              resolve(value);
            });
          }

          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }

            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }

            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        }; ///
        // Encryption default functionality for AlgoSigner. 
        // Uses pbkdf2 and SHA-256 for passphrase derivation and hash.
        // Uses a 256 bit AES-GCM cipher for encryption.
        ///


        class secureStorageContext_SecureStorageContext {
          constructor(params) {
            const iterations = params && params["iterations"] || PBKDF2Parameters.Iterations.STRONG;
            const saltSize = PBKDF2Parameters.SaltSize;
            const ivSize = PBKDF2Parameters.IVSize;
            this.security = new pbkdf2Security_PBKDF2Security(this.generateRandomValues(saltSize), this.generateRandomValues(ivSize), iterations);
          } ///
          // Create a 96 bit array buffer using version for iv.
          ///


          getVersionBuffer() {
            let version = this.security.version.toString().padStart(12, '0');
            var versionBuffer = new ArrayBuffer(version.length);
            var versionUint8Array = new Uint8Array(versionBuffer);

            for (var i = 0; i < version.length; i++) {
              versionUint8Array[i] = version.charCodeAt(i);
            }

            return versionBuffer;
          } ///
          // Generate random values using crypto getRandomValues based on provided byte length value.
          ///


          generateRandomValues(byteLength) {
            return window.crypto.getRandomValues(new Uint8Array(byteLength));
          } ///
          // Using the passphrase, create a CryptoKey for use in key derivation. 
          ///


          createPasskey(passphrase) {
            return __awaiter(this, void 0, void 0, function* () {
              return yield window.crypto.subtle.importKey("raw", passphrase, {
                name: "PBKDF2"
              }, false, ["deriveBits", "deriveKey"]);
            });
          } ///
          // **NOT FUNCTIONAL** Master/secret key functionality is not working currently
          // Using the key material create a new master key. 
          ///


          deriveMasterKey(keyMaterial) {
            return __awaiter(this, void 0, void 0, function* () {
              return yield window.crypto.subtle.deriveKey({
                name: "PBKDF2",
                salt: this.security.salt,
                iterations: this.security.iterations,
                hash: "SHA-256"
              }, keyMaterial, {
                name: "HKDF",
                length: 256
              }, //{ name: "AES-GCM", length: 256 },
              false, ["deriveBits", "deriveKey"] //["encrypt", "decrypt"]
              );
            });
          } ///
          // Using the masterkey and nonce create a new secret key for use in key derivation. 
          ///


          deriveLockKey(keyMaterial, csalt) {
            return __awaiter(this, void 0, void 0, function* () {
              return yield window.crypto.subtle.deriveKey({
                name: "PBKDF2",
                salt: csalt || this.security.salt,
                iterations: this.security.iterations,
                hash: "SHA-256"
              }, keyMaterial, {
                name: "AES-GCM",
                length: 256
              }, false, ["encrypt", "decrypt"]);
            });
          } ///
          // Using the context passphrase, salt, iv, and iterations, derive a password hash and encrypt with lockParameters.
          // Return the ArrayBuffer result from the encrypt step. 
          ///


          lock(lockParameters) {
            return __awaiter(this, void 0, void 0, function* () {
              let keyMaterial = yield this.createPasskey(lockParameters.passphrase);
              let secretKey;

              if (lockParameters.cVersion) {// FUTURE: Override settings with version information if it exists.
              }

              if (lockParameters.cSalt && lockParameters.cSalt.byteLength != PBKDF2Parameters.SaltSize) {
                throw new RangeError(`The compatible Salt must be ${PBKDF2Parameters.SaltSize} for version 1.`);
              } // TODO: BC - Swap for multiple, introduce nonce update
              // let nonce = this.generateRandomValues(32);


              secretKey = yield this.deriveLockKey(keyMaterial, lockParameters.cSalt); // Use crypto subtle with the iv and a AES-GCM cipher for encryption. 

              return yield window.crypto.subtle.encrypt({
                name: "AES-GCM",
                iv: this.getVersionBuffer()
              }, secretKey, lockParameters.encryptObject);
            });
          } ///
          // Using the context passphrase, salt, iv, and iterations, derive a password hash and decrypt with lockParameters.
          // Return the ArrayBuffer result from the decrypt step. 
          ///


          unlock(lockParameters) {
            return __awaiter(this, void 0, void 0, function* () {
              let keyMaterial = yield this.createPasskey(lockParameters.passphrase);
              let secretKey;

              if (lockParameters.cVersion) {// FUTURE: Override settings with version information if it exists.
              }

              if (lockParameters.cSalt) {
                // FUTURE: BC - Raise an exception if salt matches but version or iterations do not.
                throw new RangeError(`The compatible Salt must be ${PBKDF2Parameters.SaltSize} for version 1.`);
              } // TODO: BC - change this to handle multiple decrypts


              secretKey = yield this.deriveLockKey(keyMaterial, lockParameters.cSalt); // Use crypto subtle with the iv and a AES-GCM cipher for decryption. 

              try {
                return yield window.crypto.subtle.decrypt({
                  name: "AES-GCM",
                  iv: this.getVersionBuffer()
                }, secretKey, lockParameters.encryptObject);
              } catch (_a) {
                throw new InvalidCipherText();
              }
            });
          }

        }
        /***/

      }
      /******/

    })
  );
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const address = __webpack_require__(11);
const encoding = __webpack_require__(6);
const nacl = __webpack_require__(7);
const utils = __webpack_require__(9);
const base32 = __webpack_require__(19);

const ALGORAND_TRANSACTION_LENGTH = 52;
const ALGORAND_MIN_TX_FEE = 1000; // version v5
const ALGORAND_TRANSACTION_LEASE_LENGTH = 32;
const ALGORAND_MAX_TX_GROUP_SIZE = 16;
const ALGORAND_MAX_ASSET_DECIMALS = 19;

/**
 * Transaction enables construction of Algorand transactions
 * */
class Transaction {
    constructor({from, to, fee, amount, firstRound, lastRound, note, genesisID, genesisHash, lease,
                 closeRemainderTo, voteKey, selectionKey, voteFirst, voteLast, voteKeyDilution, 
                 assetIndex, assetTotal, assetDecimals, assetDefaultFrozen, assetManager, assetReserve,
                 assetFreeze, assetClawback, assetUnitName, assetName, assetURL, assetMetadataHash,
                 freezeAccount, freezeState, assetRevocationTarget, type="pay", flatFee=false, suggestedParams=undefined}) {
        this.name = "Transaction";
        this.tag = Buffer.from("TX");

        if (suggestedParams !== undefined) {
            genesisHash = suggestedParams.genesisHash;
            fee = suggestedParams.fee;
            if (suggestedParams.flatFee !== undefined) flatFee = suggestedParams.flatFee;
            firstRound = suggestedParams.firstRound;
            lastRound = suggestedParams.lastRound;
            genesisID = suggestedParams.genesisID;
        }

        from = address.decode(from);
        if (to !== undefined) to = address.decode(to);
        if (closeRemainderTo !== undefined) closeRemainderTo = address.decode(closeRemainderTo);
        if (assetManager !== undefined) assetManager = address.decode(assetManager);
        if (assetReserve !== undefined) assetReserve = address.decode(assetReserve);
        if (assetFreeze !== undefined) assetFreeze = address.decode(assetFreeze);
        if (assetClawback !== undefined) assetClawback = address.decode(assetClawback);
        if (assetRevocationTarget !== undefined) assetRevocationTarget = address.decode(assetRevocationTarget);
        if (freezeAccount !== undefined) freezeAccount = address.decode(freezeAccount);
        if (genesisHash === undefined) throw Error("genesis hash must be specified and in a base64 string.");

        genesisHash = Buffer.from(genesisHash, 'base64');

        if (amount !== undefined && (!Number.isSafeInteger(amount) || amount < 0)) throw Error("Amount must be a positive number and smaller than 2^53-1");
        if (!Number.isSafeInteger(fee) || fee < 0) throw Error("fee must be a positive number and smaller than 2^53-1");
        if (!Number.isSafeInteger(firstRound) || firstRound < 0) throw Error("firstRound must be a positive number");
        if (!Number.isSafeInteger(lastRound) || lastRound < 0) throw Error("lastRound must be a positive number");
        if (assetTotal !== undefined && (!Number.isSafeInteger(assetTotal) || assetTotal < 0)) throw Error("Total asset issuance must be a positive number and smaller than 2^53-1");
        if (assetDecimals !== undefined && (!Number.isSafeInteger(assetDecimals) || assetDecimals < 0 || assetDecimals > ALGORAND_MAX_ASSET_DECIMALS)) throw Error("assetDecimals must be a positive number and smaller than " + ALGORAND_MAX_ASSET_DECIMALS.toString());
        if (assetIndex !== undefined && (!Number.isSafeInteger(assetIndex) || assetIndex < 0)) throw Error("Asset index must be a positive number and smaller than 2^53-1");

        if (note !== undefined) {
            if (note.constructor !== Uint8Array) throw Error("note must be a Uint8Array.");
        }
        else {
          note = new Uint8Array(0);
        }
        if (lease !== undefined) {
            if (lease.constructor !== Uint8Array) throw Error("lease must be a Uint8Array.");
            if (lease.length !== ALGORAND_TRANSACTION_LEASE_LENGTH) throw Error("lease must be of length " + ALGORAND_TRANSACTION_LEASE_LENGTH.toString() + ".");
        }
        else {
            lease = new Uint8Array(0);
        }
        if (voteKey !== undefined) {
            voteKey = Buffer.from(voteKey, "base64");
        }
        if (selectionKey !== undefined) {
            selectionKey = Buffer.from(selectionKey, "base64");
        }

        Object.assign(this, {
            from, to, fee, amount, firstRound, lastRound, note, genesisID, genesisHash, lease,
            closeRemainderTo, voteKey, selectionKey, voteFirst, voteLast, voteKeyDilution,
            assetIndex, assetTotal, assetDecimals, assetDefaultFrozen, assetManager, assetReserve,
            assetFreeze, assetClawback, assetUnitName, assetName, assetURL, assetMetadataHash,
            freezeAccount, freezeState, assetRevocationTarget, type
        });

        // Modify Fee
        if (!flatFee){
            this.fee *= this.estimateSize();
        }
        // If suggested fee too small and will be rejected, set to min tx fee
        if (this.fee < ALGORAND_MIN_TX_FEE) {
            this.fee = ALGORAND_MIN_TX_FEE;
        }

        // say we are aware of groups
        this.group = undefined;
    }

    get_obj_for_encoding() {
        if (this.type == "pay") {
            let txn = {
                "amt": this.amount,
                "fee": this.fee,
                "fv": this.firstRound,
                "lv": this.lastRound,
                "note": Buffer.from(this.note),
                "snd": Buffer.from(this.from.publicKey),
                "type": "pay",
                "gen": this.genesisID,
                "gh": this.genesisHash,
                "lx": Buffer.from(this.lease),
                "grp": this.group,
            };

            // parse close address
            if ((this.closeRemainderTo !== undefined) && (address.encode(this.closeRemainderTo.publicKey) !== address.ALGORAND_ZERO_ADDRESS_STRING)) {
                txn.close = Buffer.from(this.closeRemainderTo.publicKey);
            }
            // allowed zero values
            if (this.to !== undefined) txn.rcv = Buffer.from(this.to.publicKey);
            if (!txn.note.length) delete txn.note;
            if (!txn.amt) delete txn.amt;
            if (!txn.fee) delete txn.fee;
            if (!txn.gen) delete txn.gen;
            if (txn.grp === undefined) delete txn.grp;
            if (!txn.lx.length) delete txn.lx;

            return txn;
        }
        else if (this.type == "keyreg") {
            let txn = {
                "fee": this.fee,
                "fv": this.firstRound,
                "lv": this.lastRound,
                "note": Buffer.from(this.note),
                "snd": Buffer.from(this.from.publicKey),
                "type": this.type,
                "gen": this.genesisID,
                "gh": this.genesisHash,
                "lx": Buffer.from(this.lease),
                "grp": this.group,
                "votekey": this.voteKey,
                "selkey": this.selectionKey,
                "votefst": this.voteFirst,
                "votelst": this.voteLast,
                "votekd": this.voteKeyDilution
            };
            // allowed zero values
            if (!txn.note.length) delete txn.note;
            if (!txn.lx.length) delete txn.lx;
            if (!txn.fee) delete txn.fee;
            if (!txn.gen) delete txn.gen;

            if (txn.grp === undefined) delete txn.grp;

            return txn;
        }
        else if (this.type == "acfg") {
            // asset creation, or asset reconfigure, or asset destruction
            let txn = {
                "fee": this.fee,
                "fv": this.firstRound,
                "lv": this.lastRound,
                "note": Buffer.from(this.note),
                "snd": Buffer.from(this.from.publicKey),
                "type": this.type,
                "gen": this.genesisID,
                "gh": this.genesisHash,
                "lx": Buffer.from(this.lease),
                "grp": this.group,
                "caid": this.assetIndex,
                "apar": {
                    "t": this.assetTotal,
                    "df": this.assetDefaultFrozen,
                    "dc": this.assetDecimals,
                }
            };
            if (this.assetManager !== undefined) txn.apar.m = Buffer.from(this.assetManager.publicKey);
            if (this.assetReserve !== undefined) txn.apar.r = Buffer.from(this.assetReserve.publicKey);
            if (this.assetFreeze !== undefined) txn.apar.f = Buffer.from(this.assetFreeze.publicKey);
            if (this.assetClawback !== undefined) txn.apar.c = Buffer.from(this.assetClawback.publicKey);
            if (this.assetName !== undefined) txn.apar.an =this.assetName;
            if (this.assetUnitName !== undefined) txn.apar.un = this.assetUnitName;
            if (this.assetURL !== undefined) txn.apar.au = this.assetURL;
            if (this.assetMetadataHash !== undefined) txn.apar.am = Buffer.from(this.assetMetadataHash);

            // allowed zero values
            if (!txn.note.length) delete txn.note;
            if (!txn.lx.length) delete txn.lx;
            if (!txn.amt) delete txn.amt;
            if (!txn.fee) delete txn.fee;
            if (!txn.gen) delete txn.gen;


            if (!txn.caid) delete txn.caid;
            if ((!txn.apar.t) &&
                (!txn.apar.un) &&
                (!txn.apar.an) &&
                (!txn.apar.df) &&
                (!txn.apar.m) &&
                (!txn.apar.r) &&
                (!txn.apar.f) &&
                (!txn.apar.c) &&
                (!txn.apar.au) &&
                (!txn.apar.am) &&
                (!txn.apar.dc)){
                    delete txn.apar
            }
            else {
                if (!txn.apar.t) delete txn.apar.t;
                if (!txn.apar.dc) delete txn.apar.dc;
                if (!txn.apar.un) delete txn.apar.un;
                if (!txn.apar.an) delete txn.apar.an;
                if (!txn.apar.df) delete txn.apar.df;
                if (!txn.apar.m) delete txn.apar.m;
                if (!txn.apar.r) delete txn.apar.r;
                if (!txn.apar.f) delete txn.apar.f;
                if (!txn.apar.c) delete txn.apar.c;
                if (!txn.apar.au) delete txn.apar.au;
                if (!txn.apar.am) delete txn.apar.am;
            }
            if (txn.grp === undefined) delete txn.grp;

            return txn;
        }
        else if (this.type == "axfer") {
            // asset transfer, acceptance, revocation, mint, or burn
            let txn = {
                "aamt": this.amount,
                "fee": this.fee,
                "fv": this.firstRound,
                "lv": this.lastRound,
                "note": Buffer.from(this.note),
                "snd": Buffer.from(this.from.publicKey),
                "arcv": Buffer.from(this.to.publicKey),
                "type": this.type,
                "gen": this.genesisID,
                "gh": this.genesisHash,
                "lx": Buffer.from(this.lease),
                "grp": this.group,
                "xaid": this.assetIndex
            };
            if (this.closeRemainderTo !== undefined) txn.aclose = Buffer.from(this.closeRemainderTo.publicKey);
            if (this.assetRevocationTarget !== undefined) txn.asnd = Buffer.from(this.assetRevocationTarget.publicKey);
            // allowed zero values
            if (!txn.note.length) delete txn.note;
            if (!txn.lx.length) delete txn.lx;
            if (!txn.aamt) delete txn.aamt;
            if (!txn.amt) delete txn.amt;
            if (!txn.fee) delete txn.fee;
            if (!txn.gen) delete txn.gen;
            if (txn.grp === undefined) delete txn.grp;
            if (!txn.aclose) delete txn.aclose;
            if (!txn.asnd) delete txn.asnd;
            return txn;
        }
        else if (this.type == "afrz") {
            // asset freeze or unfreeze
            let txn = {
                "fee": this.fee,
                "fv": this.firstRound,
                "lv": this.lastRound,
                "note": Buffer.from(this.note),
                "snd": Buffer.from(this.from.publicKey),
                "type": this.type,
                "gen": this.genesisID,
                "gh": this.genesisHash,
                "lx": Buffer.from(this.lease),
                "grp": this.group,
                "faid": this.assetIndex,
                "afrz": this.freezeState
            };
            if (this.freezeAccount !== undefined) txn.fadd = Buffer.from(this.freezeAccount.publicKey);
            // allowed zero values
            if (!txn.note.length) delete txn.note;
            if (!txn.lx.length) delete txn.lx;
            if (!txn.amt) delete txn.amt;
            if (!txn.fee) delete txn.fee;
            if (!txn.gen) delete txn.gen;
            if (!txn.afrz) delete txn.afrz;
            if (txn.grp === undefined) delete txn.grp;

            return txn;
        }
    }

    static from_obj_for_encoding(txnForEnc) {
        let txn = Object.create(this.prototype);
        txn.name = "Transaction";
        txn.tag = Buffer.from("TX");

        txn.genesisID = txnForEnc.gen;
        txn.genesisHash = Buffer.from(txnForEnc.gh);
        txn.type = txnForEnc.type;
        txn.fee = txnForEnc.fee;
        txn.firstRound = txnForEnc.fv;
        txn.lastRound = txnForEnc.lv;
        txn.note = new Uint8Array(txnForEnc.note);
        txn.lease = new Uint8Array(txnForEnc.lx);
        txn.from = address.decode(address.encode(new Uint8Array(txnForEnc.snd)));
        if (txnForEnc.grp !== undefined) txn.group = Buffer.from(txnForEnc.grp);

        if (txnForEnc.type === "pay") {
            txn.amount = txnForEnc.amt;
            txn.to = address.decode(address.encode(new Uint8Array(txnForEnc.rcv)));
            if (txnForEnc.close !== undefined) txn.closeRemainderTo = address.decode(address.encode(txnForEnc.close));
        }
        else if (txnForEnc.type === "keyreg") {
            txn.voteKey = Buffer.from(txnForEnc.votekey);
            txn.selectionKey = Buffer.from(txnForEnc.selkey);
            txn.voteKeyDilution = txnForEnc.votekd;
            txn.voteFirst = txnForEnc.votefst;
            txn.voteLast = txnForEnc.votelst;
        }
        else if (txnForEnc.type === "acfg") {
            // asset creation, or asset reconfigure, or asset destruction
            if (txnForEnc.caid !== undefined){
                txn.assetIndex = txnForEnc.caid;
            }
            if (txnForEnc.apar !== undefined){
                txn.assetTotal = txnForEnc.apar.t;
                txn.assetDefaultFrozen = txnForEnc.apar.df;
                if (txnForEnc.apar.dc !== undefined) txn.assetDecimals = txnForEnc.apar.dc;
                if (txnForEnc.apar.m !== undefined) txn.assetManager = address.decode(address.encode(new Uint8Array(txnForEnc.apar.m)));
                if (txnForEnc.apar.r !== undefined) txn.assetReserve = address.decode(address.encode(new Uint8Array(txnForEnc.apar.r)));
                if (txnForEnc.apar.f !== undefined) txn.assetFreeze = address.decode(address.encode(new Uint8Array(txnForEnc.apar.f)));
                if (txnForEnc.apar.c !== undefined) txn.assetClawback = address.decode(address.encode(new Uint8Array(txnForEnc.apar.c)));
                if (txnForEnc.apar.un !== undefined) txn.assetUnitName = txnForEnc.apar.un;
                if (txnForEnc.apar.an !== undefined) txn.assetName = txnForEnc.apar.an;
                if (txnForEnc.apar.au !== undefined) txn.assetURL = txnForEnc.apar.au;
                if (txnForEnc.apar.am !== undefined) txn.assetMetadataHash = txnForEnc.apar.am;
            }
        }
        else if (txnForEnc.type === "axfer") {
            // asset transfer, acceptance, revocation, mint, or burn
            if (txnForEnc.xaid !== undefined) {
                txn.assetIndex = txnForEnc.xaid;
            }
            if (txnForEnc.aamt !== undefined) txn.amount = txnForEnc.aamt;
            if (txnForEnc.aclose !== undefined) {
                txn.closeRemainderTo = address.decode(address.encode(new Uint8Array(txnForEnc.aclose)));
            }
            if (txnForEnc.asnd !== undefined) {
                txn.assetRevocationTarget = address.decode(address.encode(new Uint8Array(txnForEnc.asnd)));
            }
            txn.to = address.decode(address.encode(new Uint8Array(txnForEnc.arcv)));
        }
        else if (txnForEnc.type === "afrz") {
            if (txnForEnc.afrz !== undefined) {
                txn.freezeState = txnForEnc.afrz;
            }
            if (txnForEnc.faid !== undefined) {
                txn.assetIndex = txnForEnc.faid;
            }
            txn.freezeAccount = address.decode(address.encode(new Uint8Array(txnForEnc.fadd)));
        }
        return txn;
    }

    estimateSize() {
        // Generate random key
        let key = nacl.keyPair();
        return this.signTxn(key.secretKey).length;

    }

    bytesToSign() {
        let encodedMsg = this.toByte();
        return Buffer.from(utils.concatArrays(this.tag, encodedMsg));
    }

    toByte() {
        return encoding.encode(this.get_obj_for_encoding());
    }

    // returns the raw signature
    rawSignTxn(sk) {
        const toBeSigned = this.bytesToSign();
        const sig = nacl.sign(toBeSigned, sk);
        return Buffer.from(sig);
    }

    signTxn(sk) {
        // construct signed message
        let sTxn = {
            "sig": this.rawSignTxn(sk),
            "txn": this.get_obj_for_encoding(),
        };
        return new Uint8Array(encoding.encode(sTxn));
    }

    rawTxID() {
        const en_msg = this.toByte();
        const gh = Buffer.from(utils.concatArrays(this.tag, en_msg));
        return Buffer.from(nacl.genericHash(gh));
    }

    txID() {
        const hash = this.rawTxID();
        return base32.encode(hash).slice(0, ALGORAND_TRANSACTION_LENGTH);
    }

    // add a lease to a transaction not yet having
    // supply feePerByte to increment fee accordingly
    addLease(lease, feePerByte=0) {
        if (lease !== undefined) {
            if (lease.constructor !== Uint8Array) throw Error("lease must be a Uint8Array.");
            if (lease.length !== ALGORAND_TRANSACTION_LEASE_LENGTH) throw Error("lease must be of length " + ALGORAND_TRANSACTION_LEASE_LENGTH.toString() + ".");
        }
        else {
            lease = new Uint8Array(0);
        }
        this.lease = lease;
        if (feePerByte !== 0) {
            this.fee += 37 * feePerByte; // 32 bytes + 5 byte label
        }
    }
}

/**
 * Aux class for group id calculation of a group of transactions
 */
class TxGroup {
    constructor(hashes) {
        if (hashes.length > ALGORAND_MAX_TX_GROUP_SIZE) {
            let errorMsg = hashes.length.toString() + " transactions grouped together but max group size is " + ALGORAND_MAX_TX_GROUP_SIZE.toString();
            throw Error(errorMsg);
        }

        this.name = "Transaction group";
        this.tag = Buffer.from("TG");

        this.txGroupHashes = hashes;
    }

    get_obj_for_encoding() {
        const txgroup = {
            "txlist": this.txGroupHashes
        };
        return txgroup;
    }

    static from_obj_for_encoding(txgroupForEnc) {
        const txn = Object.create(this.prototype);
        txn.name = "Transaction group";
        txn.tag = Buffer.from("TG");
        txn.txGroupHashes = [];
        for (let hash of txgroupForEnc.txlist) {
            txn.txGroupHashes.push(new Buffer.from(hash));
        }
        return txn;
    }

    toByte() {
        return encoding.encode(this.get_obj_for_encoding());
    }

}

module.exports = {Transaction, TxGroup, ALGORAND_MIN_TX_FEE};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * [hi-base32]{@link https://github.com/emn178/hi-base32}
 *
 * @version 0.5.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var root = typeof window === 'object' ? window : {};
  var NODE_JS = !root.HI_BASE32_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  }
  var COMMON_JS = !root.HI_BASE32_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(18);
  var BASE32_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
  var BASE32_DECODE_CHAR = {
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8,
    'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16,
    'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24,
    'Z': 25, '2': 26, '3': 27, '4': 28, '5': 29, '6': 30, '7': 31
  };

  var blocks = [0, 0, 0, 0, 0, 0, 0, 0];

  var throwInvalidUtf8 = function (position, partial) {
    if (partial.length > 10) {
      partial = '...' + partial.substr(-10);
    }
    var err = new Error('Decoded data is not valid UTF-8.'
      + ' Maybe try base32.decode.asBytes()?'
      + ' Partial data after reading ' + position + ' bytes: ' + partial + ' <-');
    err.position = position;
    throw err;
  };

  var toUtf8String = function (bytes) {
    var str = '', length = bytes.length, i = 0, followingChars = 0, b, c;
    while (i < length) {
      b = bytes[i++];
      if (b <= 0x7F) {
        str += String.fromCharCode(b);
        continue;
      } else if (b > 0xBF && b <= 0xDF) {
        c = b & 0x1F;
        followingChars = 1;
      } else if (b <= 0xEF) {
        c = b & 0x0F;
        followingChars = 2;
      } else if (b <= 0xF7) {
        c = b & 0x07;
        followingChars = 3;
      } else {
        throwInvalidUtf8(i, str);
      }

      for (var j = 0; j < followingChars; ++j) {
        b = bytes[i++];
        if (b < 0x80 || b > 0xBF) {
          throwInvalidUtf8(i, str);
        }
        c <<= 6;
        c += b & 0x3F;
      }
      if (c >= 0xD800 && c <= 0xDFFF) {
        throwInvalidUtf8(i, str);
      }
      if (c > 0x10FFFF) {
        throwInvalidUtf8(i, str);
      }

      if (c <= 0xFFFF) {
        str += String.fromCharCode(c);
      } else {
        c -= 0x10000;
        str += String.fromCharCode((c >> 10) + 0xD800);
        str += String.fromCharCode((c & 0x3FF) + 0xDC00);
      }
    }
    return str;
  };

  var decodeAsBytes = function (base32Str) {
    if (!/^[A-Z2-7=]+$/.test(base32Str)) {
      throw new Error('Invalid base32 characters');
    }
    base32Str = base32Str.replace(/=/g, '');
    var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length;

    // 4 char to 3 bytes
    for (var i = 0, count = length >> 3 << 3; i < count;) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
      bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
      bytes[index++] = (v7 << 5 | v8) & 255;
    }

    // remain bytes
    var remain = length - count;
    if (remain === 2) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
    } else if (remain === 4) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
    } else if (remain === 5) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
    } else if (remain === 7) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
      bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
    }
    return bytes;
  };

  var encodeAscii = function (str) {
    var v1, v2, v3, v4, v5, base32Str = '', length = str.length;
    for (var i = 0, count = parseInt(length / 5) * 5; i < count;) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i++);
      v3 = str.charCodeAt(i++);
      v4 = str.charCodeAt(i++);
      v5 = str.charCodeAt(i++);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
        BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
        BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
        BASE32_ENCODE_CHAR[v5 & 31];
    }

    // remain char
    var remain = length - count;
    if (remain === 1) {
      v1 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
        '======';
    } else if (remain === 2) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
        '====';
    } else if (remain === 3) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i++);
      v3 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
        '===';
    } else if (remain === 4) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i++);
      v3 = str.charCodeAt(i++);
      v4 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
        BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
        BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
        '=';
    }
    return base32Str;
  };

  var encodeUtf8 = function (str) {
    var v1, v2, v3, v4, v5, code, end = false, base32Str = '',
      index = 0, i, start = 0, bytes = 0, length = str.length;
    do {
      blocks[0] = blocks[5];
      blocks[1] = blocks[6];
      blocks[2] = blocks[7];
      for (i = start; index < length && i < 5; ++index) {
        code = str.charCodeAt(index);
        if (code < 0x80) {
          blocks[i++] = code;
        } else if (code < 0x800) {
          blocks[i++] = 0xc0 | (code >> 6);
          blocks[i++] = 0x80 | (code & 0x3f);
        } else if (code < 0xd800 || code >= 0xe000) {
          blocks[i++] = 0xe0 | (code >> 12);
          blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
          blocks[i++] = 0x80 | (code & 0x3f);
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++index) & 0x3ff));
          blocks[i++] = 0xf0 | (code >> 18);
          blocks[i++] = 0x80 | ((code >> 12) & 0x3f);
          blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
          blocks[i++] = 0x80 | (code & 0x3f);
        }
      }
      bytes += i - start;
      start = i - 5;
      if (index === length) {
        ++index;
      }
      if (index > length && i < 6) {
        end = true;
      }
      v1 = blocks[0];
      if (i > 4) {
        v2 = blocks[1];
        v3 = blocks[2];
        v4 = blocks[3];
        v5 = blocks[4];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
          BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
          BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
          BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
          BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
          BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
          BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
          BASE32_ENCODE_CHAR[v5 & 31];
      } else if (i === 1) {
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
          BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
          '======';
      } else if (i === 2) {
        v2 = blocks[1];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
          BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
          BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
          BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
          '====';
      } else if (i === 3) {
        v2 = blocks[1];
        v3 = blocks[2];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
          BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
          BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
          BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
          BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
          '===';
      } else {
        v2 = blocks[1];
        v3 = blocks[2];
        v4 = blocks[3];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
          BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
          BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
          BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
          BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
          BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
          BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
          '=';
      }
    } while (!end);
    return base32Str;
  };

  var encodeBytes = function (bytes) {
    var v1, v2, v3, v4, v5, base32Str = '', length = bytes.length;
    for (var i = 0, count = parseInt(length / 5) * 5; i < count;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      v4 = bytes[i++];
      v5 = bytes[i++];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
        BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
        BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
        BASE32_ENCODE_CHAR[v5 & 31];
    }

    // remain char
    var remain = length - count;
    if (remain === 1) {
      v1 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
        '======';
    } else if (remain === 2) {
      v1 = bytes[i++];
      v2 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
        '====';
    } else if (remain === 3) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
        '===';
    } else if (remain === 4) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      v4 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
        BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
        BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
        '=';
    }
    return base32Str;
  };

  var encode = function (input, asciiOnly) {
    var notString = typeof(input) !== 'string';
    if (notString && input.constructor === ArrayBuffer) {
      input = new Uint8Array(input);
    }
    if (notString) {
      return encodeBytes(input);
    } else if (asciiOnly) {
      return encodeAscii(input);
    } else {
      return encodeUtf8(input);
    }
  };

  var decode = function (base32Str, asciiOnly) {
    if (!asciiOnly) {
      return toUtf8String(decodeAsBytes(base32Str));
    }
    if (!/^[A-Z2-7=]+$/.test(base32Str)) {
      throw new Error('Invalid base32 characters');
    }
    var v1, v2, v3, v4, v5, v6, v7, v8, str = '', length = base32Str.indexOf('=');
    if (length === -1) {
      length = base32Str.length;
    }

    // 8 char to 5 bytes
    for (var i = 0, count = length >> 3 << 3; i < count;) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
        String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) +
        String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) +
        String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255) +
        String.fromCharCode((v7 << 5 | v8) & 255);
    }

    // remain bytes
    var remain = length - count;
    if (remain === 2) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255);
    } else if (remain === 4) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
        String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255);
    } else if (remain === 5) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
        String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) +
        String.fromCharCode((v4 << 4 | v5 >>> 1) & 255);
    } else if (remain === 7) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
        String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) +
        String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) +
        String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255);
    }
    return str;
  };

  var exports = {
    encode: encode,
    decode: decode
  };
  decode.asBytes = decodeAsBytes;

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.base32 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13), __webpack_require__(12)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const nacl = __webpack_require__(7);
const address = __webpack_require__(11);
const encoding = __webpack_require__(6);
const txnBuilder = __webpack_require__(17);
const utils = __webpack_require__(9);

/**
 Utilities for manipulating multisig transaction blobs.
 */

const ERROR_MULTISIG_MERGE_LESSTHANTWO = new Error("Not enough multisig transactions to merge. Need at least two");
const ERROR_MULTISIG_MERGE_MISMATCH = new Error("Cannot merge txs. txIDs differ");
const ERROR_MULTISIG_MERGE_WRONG_PREIMAGE = new Error("Cannot merge txs. Multisig preimages differ");
const ERROR_MULTISIG_MERGE_SIG_MISMATCH = new Error("Cannot merge txs. subsigs are mismatched.");
const ERROR_MULTISIG_BAD_FROM_FIELD = new Error("The transaction from field and multisig preimage do not match.");
const ERROR_MULTISIG_KEY_NOT_EXIST = new Error("Key does not exist");

/**
 * MultisigTransaction is a Transaction that also supports creating partially-signed multisig transactions.
 */
class MultisigTransaction extends txnBuilder.Transaction {
    get_obj_for_encoding() {
        if (this.hasOwnProperty("objForEncoding")) {
            // if set, use the value for encoding. This allows us to sign existing non-payment type transactions.
            return this.objForEncoding;
        }
        return super.get_obj_for_encoding();
    }

    static from_obj_for_encoding(txnForEnc) {
        if (txnForEnc.type !== "pay") {
            // we don't support decoding this txn yet - but we can keep signing it since we have the
            // encoded format. We trust that the caller knows what they are trying to sign.
            let txn = Object.create(this.prototype);
            txn.name = "Transaction";
            txn.tag = Buffer.from([84, 88]); // "TX"

            txn.objForEncoding = txnForEnc;
            return txn;
        }
        return super.from_obj_for_encoding(txnForEnc);
    }

    /**
     * partialSignTxn partially signs this transaction and returns a partially-signed multisig transaction,
     * encoded with msgpack as a typed array.
     * @param version multisig version
     * @param threshold multisig threshold
     * @param pks multisig public key list, order is important.
     * @param sk an Algorand secret key to sign with.
     * @returns an encoded, partially signed multisig transaction.
     */
    partialSignTxn({version, threshold, pks}, sk) {
        // verify one more time that the from field is correct
        if (!this.hasOwnProperty("objForEncoding")) {
            let expectedFromRaw = address.fromMultisigPreImg({version, threshold, pks});
            if (address.encode(this.from.publicKey) !== address.encode(expectedFromRaw)) {
                throw ERROR_MULTISIG_BAD_FROM_FIELD;
            }
        }
        // get signature verifier
        let myPk = nacl.keyPairFromSecretKey(sk).publicKey;
        return createMultisigTransaction(
            this.get_obj_for_encoding(),
            {"rawSig": this.rawSignTxn(sk), myPk},
            {version, threshold, pks},
        );
    }
}

/**
 * createMultisigTransaction creates a multisig transaction blob.
 * @param txnForEncoding the actual transaction to sign.
 * @param rawSig a Buffer raw signature of that transaction
 * @param myPk a public key that corresponds with rawSig
 * @param version multisig version
 * @param threshold mutlisig threshold
 * @param pks ordered list of public keys in this multisig
 * @returns encoded multisig blob
 */
function createMultisigTransaction(txnForEncoding, {rawSig, myPk}, {version, threshold, pks}) {
    let keyExist = false;
    // construct the appendable multisigned transaction format
    let subsigs = pks.map(pk => {
        if (nacl.bytesEqual(pk, myPk)) {
            keyExist = true;
            return {
                "pk": Buffer.from(pk),
                "s" : rawSig,
            };
        }
        return {"pk": Buffer.from(pk)};
    });
    if (keyExist === false) {
        throw ERROR_MULTISIG_KEY_NOT_EXIST;
    }
    let msig = {
        "v": version,
        "thr": threshold,
        "subsig": subsigs,
    };
    let sTxn = {
        "msig": msig,
        "txn": txnForEncoding,
    };
    return new Uint8Array(encoding.encode(sTxn));
}

/**
 * mergeMultisigTransactions takes a list of multisig transaction blobs, and merges them.
 * @param multisigTxnBlobs a list of blobs representing encoded multisig txns
 * @returns typed array msg-pack encoded multisig txn
 */
function mergeMultisigTransactions(multisigTxnBlobs) {
    if (multisigTxnBlobs.length < 2) {
        throw ERROR_MULTISIG_MERGE_LESSTHANTWO;
    }
    const refSigTx = encoding.decode(multisigTxnBlobs[0]);
    const refSigAlgoTx = MultisigTransaction.from_obj_for_encoding(refSigTx.txn);
    const refTxIDStr = refSigAlgoTx.txID().toString();
    const from = address.encode(refSigTx.txn.snd);

    let newSubsigs = refSigTx.msig.subsig;
    for (let i = 0; i < multisigTxnBlobs.length; i++) {
        let unisig = encoding.decode(multisigTxnBlobs[i]);
        let unisigAlgoTxn = MultisigTransaction.from_obj_for_encoding(unisig.txn);
        if (unisigAlgoTxn.txID().toString() !== refTxIDStr) {
            throw ERROR_MULTISIG_MERGE_MISMATCH;
        }
        // check multisig has same preimage as reference
        if (unisig.msig.subsig.length !== refSigTx.msig.subsig.length) {
            throw ERROR_MULTISIG_MERGE_WRONG_PREIMAGE;
        }
        let preimg = {
            "version": unisig.msig.v,
            "threshold": unisig.msig.thr,
            "pks": unisig.msig.subsig.map(subsig => {
                return subsig.pk;
            }),
        };
        if (from !== address.encode(address.fromMultisigPreImg(preimg))) {
            throw ERROR_MULTISIG_MERGE_WRONG_PREIMAGE;
        }
        // now, we can merge
        newSubsigs = unisig.msig.subsig.map((uniSubsig, index) => {
            let current = newSubsigs[index];
            if (current.s) {
                if (uniSubsig.s && Buffer.compare(uniSubsig.s, current.s) !== 0) {
                    // mismatch
                    throw ERROR_MULTISIG_MERGE_SIG_MISMATCH;
                }
                return {
                    "pk": current.pk,
                    "s": current.s,
                }
            } else if (uniSubsig.s) {
                return {
                    "pk": current.pk,
                    "s": uniSubsig.s,
                }
            }
            return current;
        });
    }
    let msig = {
        "v": refSigTx.msig.v,
        "thr": refSigTx.msig.thr,
        "subsig": newSubsigs,
    };
    let sTxn = {
        "msig": msig,
        "txn": refSigTx.txn,
    };
    return new Uint8Array(encoding.encode(sTxn));
}

function verifyMultisig(toBeVerified, msig, publicKey) {
    const version = msig.v;
    const threshold = msig.thr;
    const subsigs = msig.subsig;

    let pks = subsigs.map(
        (subsig) => subsig.pk
    );
    if (msig.subsig.length < threshold) {
        return false;
    }

    let pk;
    try {
        pk = address.fromMultisigPreImg({version, threshold, pks});
    } catch (e) {
        return false;
    }

    if (!utils.arrayEqual(pk, publicKey)) {
        return false;
    }

    let counter = 0;
    for (let subsig of subsigs) {
        if (subsig.s !== undefined) {
            counter += 1;
        }
    }
    if (counter < threshold) {
        return false;
    }

    let verifiedCounter = 0;
    for (let subsig of subsigs) {
        if (subsig.s !== undefined) {
            if (nacl.verify(toBeVerified, subsig.s, subsig.pk)) {
                verifiedCounter += 1;
            }
        }
    }

    if (verifiedCounter < threshold) {
        return false;
    }

    return true;
}

module.exports = {
    MultisigTransaction,
    mergeMultisigTransactions,
    createMultisigTransaction,
    verifyMultisig,
    ERROR_MULTISIG_MERGE_LESSTHANTWO,
    ERROR_MULTISIG_MERGE_MISMATCH,
    ERROR_MULTISIG_MERGE_WRONG_PREIMAGE,
    ERROR_MULTISIG_MERGE_SIG_MISMATCH,
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _messaging_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


class Helper {
  constructor() {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "_session", void 0);
  }

  // Ledger helpers
  static ledger() {
    return {
      supported: params => {
        if (!('ledger' in params) || !(Helper.str().capitalize(params.ledger) in _messaging_types__WEBPACK_IMPORTED_MODULE_1__[/* Ledger */ "c"])) return false;
        return true;
      }
    };
  } // String helpers


  static str() {
    return {
      // Capitalize the first char
      capitalize: s => {
        s = s.toLowerCase();
        return s[0].toUpperCase() + s.substr(1);
      }
    };
  }

  set session(v) {
    this._session = v;
  }

  get session() {
    return this._session;
  }

}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const nacl = __webpack_require__(7);
const address = __webpack_require__(11);
const mnemonic = __webpack_require__(30);
const encoding = __webpack_require__(6);
const txnBuilder = __webpack_require__(17);
const multisig = __webpack_require__(20);
const bidBuilder = __webpack_require__(33);
const algod = __webpack_require__(34);
const kmd = __webpack_require__(41);
const utils = __webpack_require__(9);
const logicsig = __webpack_require__(42);
const algodv2 = __webpack_require__(50)
const indexer = __webpack_require__(63)

let Algod = algod.Algod;
let Kmd = kmd.Kmd;
let Algodv2 = algodv2.AlgodClient
let Indexer = indexer.IndexerClient

const SIGN_BYTES_PREFIX = Buffer.from([77, 88]); // "MX"
const MICROALGOS_TO_ALGOS_RATIO = 1e6;
// Errors
const ERROR_MULTISIG_BAD_SENDER = new Error("The transaction sender address and multisig preimage do not match.");
const ERROR_INVALID_MICROALGOS = new Error("Microalgos should be positive and less than 2^53 - 1.")
/**
 * generateAccount returns a new Algorand address and its corresponding secret key
 * @returns {{sk: Uint8Array, addr: string}}
 */
function generateAccount() {
    let keys = nacl.keyPair();
    let encodedPk = address.encode(keys.publicKey);
    return {addr: encodedPk, sk: keys.secretKey};
}

/**
 * isValidAddress takes an Algorand address and checks if valid.
 * @param addr Algorand address
 * @returns {boolean} true if valid, false otherwise
 */
function isValidAddress(addr) {
    return address.isValidAddress(addr);
}

/**
 * mnemonicToSecretKey takes a mnemonic string and returns the corresponding Algorand address and its secret key.
 * @param mn 25 words Algorand mnemonic
 * @returns {{sk: Uint8Array, addr: string}}
 * @throws error if fails to decode the mnemonic
 */
function mnemonicToSecretKey(mn) {
    let seed = mnemonic.seedFromMnemonic(mn);
    let keys = nacl.keyPairFromSeed(seed);
    let encodedPk = address.encode(keys.publicKey);
    return {addr: encodedPk, sk: keys.secretKey};
}

/**
 * secretKeyToMnemonic takes an Algorand secret key and returns the corresponding mnemonic.
 * @param sk Uint8Array
 * @returns string mnemonic
 */
function secretKeyToMnemonic(sk) {
    // get the seed from the sk
    let seed = sk.slice(0, nacl.SEED_BTYES_LENGTH);
    return mnemonic.mnemonicFromSeed(seed);
}

/**
 * mnemonicToMasterDerivationKey takes a mnemonic string and returns the corresponding master derivation key.
 * @param mn 25 words Algorand mnemonic
 * @returns Uint8Array
 * @throws error if fails to decode the mnemonic
 */
function mnemonicToMasterDerivationKey(mn) {
    return mnemonic.seedFromMnemonic(mn);
}

/**
 * masterDerivationKeyToMnemonic takes a master derivation key and returns the corresponding mnemonic.
 * @param mdk Uint8Array
 * @returns string mnemonic
 */
function masterDerivationKeyToMnemonic(mdk) {
    return mnemonic.mnemonicFromSeed(mdk);
}

/**
 * signTransaction takes an object with either payment or key registration fields and 
 * a secret key and returns a signed blob.
 * 
 * Payment transaction fields: to, amount, fee, firstRound, lastRound, genesisHash,
 * note(optional), GenesisID(optional), closeRemainderTo(optional)
 * 
 * Key registration fields: fee, firstRound, lastRound, voteKey, selectionKey, voteFirst,
 * voteLast, voteKeyDilution, genesisHash, note(optional), GenesisID(optional)
 * @param txn object with either payment or key registration fields
 * @param sk Algorand Secret Key
 * @returns object contains the binary signed transaction and its txID
 */
function signTransaction(txn, sk) {
    // Get pk from sk
    let key = nacl.keyPairFromSecretKey(sk);
    txn.from = address.encode(key.publicKey);
    let algoTxn = new txnBuilder.Transaction(txn);

    return {"txID": algoTxn.txID().toString(), "blob": algoTxn.signTxn(sk)};
}

/**
 * signBid takes an object with the following fields: bidder key, bid amount, max price, bid ID, auctionKey, auction ID,
 * and a secret key and returns a signed blob to be inserted into a transaction Algorand note field.
 * @param bid Algorand Bid
 * @param sk Algorand secret key
 * @returns Uint8Array binary signed bid
 */
function signBid(bid, sk) {
    let signedBid = new bidBuilder.Bid(bid);
    return signedBid.signBid(sk);
}

/**
 * signBytes takes arbitrary bytes and a secret key, prepends the bytes with "MX" for domain separation, signs the bytes 
 * with the private key, and returns the signature.
 * @param bytes Uint8array
 * @param sk Algorand secret key
 * @returns binary signature
 */
function signBytes(bytes, sk) {
    let toBeSigned = Buffer.from(utils.concatArrays(SIGN_BYTES_PREFIX, bytes));
    let sig = nacl.sign(toBeSigned, sk);
    return sig;
}

/**
 * verifyBytes takes array of bytes, an address, and a signature and verifies if the signature is correct for the public
 * key and the bytes (the bytes should have been signed with "MX" prepended for domain separation).
 * @param bytes Uint8Array
 * @param signature binary signature
 * @param addr string address
 * @returns bool
 */
function verifyBytes(bytes, signature, addr) {
    toBeVerified = Buffer.from(utils.concatArrays(SIGN_BYTES_PREFIX, bytes));
    let pk = address.decode(addr).publicKey;
    return nacl.verify(toBeVerified, signature, pk);
}

/**
 * signMultisigTransaction takes a raw transaction (see signTransaction), a multisig preimage, a secret key, and returns
 * a multisig transaction, which is a blob representing a transaction and multisignature account preimage. The returned
 * multisig txn can accumulate additional signatures through mergeMultisigTransactions or appendMultisigTransaction.
 * @param txn object with either payment or key registration fields
 * @param version multisig version
 * @param threshold multisig threshold
 * @param addrs a list of Algorand addresses representing possible signers for this multisig. Order is important.
 * @param sk Algorand secret key. The corresponding pk should be in the pre image.
 * @returns object containing txID, and blob of partially signed multisig transaction (with multisig preimage information)
 */
function signMultisigTransaction(txn, {version, threshold, addrs}, sk) {
    // check that the from field matches the mSigPreImage. If from field is not populated, fill it in.
    let expectedFromRaw = address.fromMultisigPreImgAddrs({version, threshold, addrs});
    if (txn.hasOwnProperty('from')) {
        if (txn.from !== expectedFromRaw) {
            throw ERROR_MULTISIG_BAD_SENDER;
        }
    } else {
        txn.from = expectedFromRaw;
    }
    let algoTxn = new multisig.MultisigTransaction(txn);
    const pks = addrs.map(addr => {
        return address.decode(addr).publicKey;
    });
    return {
        "txID": algoTxn.txID().toString(),
        "blob": algoTxn.partialSignTxn({version, threshold, pks}, sk),
    };
}

/**
 * appendSignMultisigTransaction takes a multisig transaction blob, and appends our signature to it.
 * While we could derive public key preimagery from the partially-signed multisig transaction,
 * we ask the caller to pass it back in, to ensure they know what they are signing.
 * @param multisigTxnBlob an encoded multisig txn. Supports non-payment txn types.
 * @param version multisig version
 * @param threshold multisig threshold
 * @param addrs a list of Algorand addresses representing possible signers for this multisig. Order is important.
 * @param sk Algorand secret key
 * @returns object containing txID, and blob representing encoded multisig txn
 */
function appendSignMultisigTransaction(multisigTxnBlob, {version, threshold, addrs}, sk) {
    const pks = addrs.map(addr => {
        return address.decode(addr).publicKey;
    });
    // obtain underlying txn, sign it, and merge it
    let multisigTxObj = encoding.decode(multisigTxnBlob);
    let msigTxn = multisig.MultisigTransaction.from_obj_for_encoding(multisigTxObj.txn);
    let partialSignedBlob = msigTxn.partialSignTxn({version, threshold, pks}, sk);
    return {
        "txID": msigTxn.txID().toString(),
        "blob": mergeMultisigTransactions([multisigTxnBlob, partialSignedBlob]),
    };
}

/**
 * mergeMultisigTransactions takes a list of multisig transaction blobs, and merges them.
 * @param multisigTxnBlobs a list of blobs representing encoded multisig txns
 * @returns blob representing encoded multisig txn
 */
function mergeMultisigTransactions(multisigTxnBlobs) {
    return multisig.mergeMultisigTransactions(multisigTxnBlobs);
}

/**
 * multisigAddress takes multisig metadata (preimage) and returns the corresponding human readable Algorand address.
 * @param version mutlisig version
 * @param threshold multisig threshold
 * @param addrs list of Algorand addresses
 */
function multisigAddress({version, threshold, addrs}) {
    return address.fromMultisigPreImgAddrs({version, threshold, addrs});
}

/**
 * encodeObj takes a javascript object and returns its msgpack encoding
 * Note that the encoding sorts the fields alphabetically
 * @param o js obj
 * @returns Uint8Array binary representation
 */
function encodeObj(o) {
    return new Uint8Array(encoding.encode(o));
}

/**
 * decodeObj takes a Uint8Array and returns its javascript obj
 * @param o Uint8Array to decode
 * @returns object
 */
function decodeObj(o) {
    return encoding.decode(o);
}

/**
 * microalgosToAlgos converts microalgos to algos
 * @param microalgos number
 * @returns number
 */
function microalgosToAlgos(microalgos) {
    if (microalgos < 0 || !Number.isSafeInteger(microalgos)){
        throw ERROR_INVALID_MICROALGOS;
    }
    return microalgos/MICROALGOS_TO_ALGOS_RATIO
}

/**
 * algosToMicroalgos converts algos to microalgos
 * @param algos number
 * @returns number
 */
function algosToMicroalgos(algos) {
    let microalgos = algos*MICROALGOS_TO_ALGOS_RATIO;
    return Math.round(microalgos)
}

/**
 * computeGroupID returns group ID for a group of transactions
 * @param txns array of transactions (every element is a dict or Transaction)
 * @return Buffer
 */
function computeGroupID(txns) {
    const hashes = [];
    for (let txn of txns)  {
        let tx = txn;
        if (!(txn instanceof txnBuilder.Transaction)) {
            tx = new txnBuilder.Transaction(txn);
        }
        hashes.push(tx.rawTxID());
    }

    const txgroup = new txnBuilder.TxGroup(hashes);

    const bytes = txgroup.toByte();
    const toBeHashed = Buffer.from(utils.concatArrays(txgroup.tag, bytes));
    const gid = nacl.genericHash(toBeHashed)
    return Buffer.from(gid);
}

/**
 * assignGroupID assigns group id to a given list of unsigned transactions
 * @param txns array of transactions (every element is a dict or Transaction)
 * @param from optional sender address specifying which transaction return
 * @return possible list of matching transactions
 */
function assignGroupID(txns, from = undefined) {
    const gid = computeGroupID(txns);
    let result = [];
    for (tx of txns) {
        if (!from || address.encode(tx.from.publicKey) == from) {
            tx.group = gid;
            result.push(tx);
        }
    }
    return result;
}

/**
 * makeLogicSig creates LogicSig object from program and arguments
 *
 * @param {Uint8Array} program Program to make LogicSig from
 * @param {[Uint8Array]} args Arguments as array of Uint8Array
 * @returns {LogicSig} LogicSig object
 */
function makeLogicSig(program, args) {
    return new logicsig.LogicSig(program, args);
}

/**
 * signLogicSigTransaction takes  a raw transaction and a LogicSig object and returns a logicsig
 * transaction which is a blob representing a transaction and logicsig object.
 * @param {Object} dictionary containing constructor arguments for a transaction
 * @param {LogicSig} lsig logicsig object
 * @returns {Object} Object containing txID and blob representing signed transaction.
 * @throws error on failure
 */
function signLogicSigTransaction(txn, lsig) {
    if (!lsig.verify(address.decode(txn.from).publicKey)) {
        throw new Error("invalid signature");
    }
    let algoTxn = new txnBuilder.Transaction(txn);
    return signLogicSigTransactionObject(algoTxn, lsig);
}

/**
 * signLogicSigTransactionObject takes transaction.Transaction and a LogicSig object and returns a logicsig
 * transaction which is a blob representing a transaction and logicsig object.
 * @param {Object} txn transaction.Transaction
 * @param {LogicSig} lsig logicsig object
 * @returns {Object} Object containing txID and blob representing signed transaction.
 */
function signLogicSigTransactionObject(txn, lsig) {
    let lstx = {
        lsig: lsig.get_obj_for_encoding(),
        txn: txn.get_obj_for_encoding()
    };

    return {
        "txID": txn.txID().toString(),
        "blob": encoding.encode(lstx)
    };
}

/**
 * logicSigFromByte accepts encoded logic sig bytes and attempts to call logicsig.fromByte on it,
 * returning the result
 */
function logicSigFromByte(encoded) {
    return logicsig.LogicSig.fromByte(encoded);
}


/**
 * makePaymentTxn takes payment arguments and returns a Transaction object
 * @param from - string representation of Algorand address of sender
 * @param to - string representation of Algorand address of recipient
 * @param fee - integer fee per byte, in microAlgos. for a flat fee, overwrite the fee property on the returned object
 * @param amount - integer amount to send, in microAlgos
 * @param closeRemainderTo - optionally close out remaining account balance to this account, represented as string rep of Algorand address
 * @param firstRound - integer first protocol round on which this txn is valid
 * @param lastRound - integer last protocol round on which this txn is valid
 * @param note - uint8array of arbitrary data for sender to store
 * @param genesisHash - string specifies hash genesis block of network in use
 * @param genesisID - string specifies genesis ID of network in use
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makePaymentTxn(from, to, fee, amount, closeRemainderTo, firstRound, lastRound, note, genesisHash, genesisID) {
    let suggestedParams = {
        "genesisHash": genesisHash,
        "genesisID": genesisID,
        "firstRound": firstRound,
        "lastRound": lastRound,
        "fee": fee
    };
    return makePaymentTxnWithSuggestedParams(from, to, amount, closeRemainderTo, note, suggestedParams);
}

/**
 * makePaymentTxnWithSuggestedParams takes payment arguments and returns a Transaction object
 * @param from - string representation of Algorand address of sender
 * @param to - string representation of Algorand address of recipient
 * @param amount - integer amount to send, in microAlgos
 * @param closeRemainderTo - optionally close out remaining account balance to this account, represented as string rep of Algorand address
 * @param note - uint8array of arbitrary data for sender to store
 * @param suggestedParams - a dict holding common-to-all-txns args:
 * fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
 * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
 * firstRound - integer first protocol round on which this txn is valid
 * lastRound - integer last protocol round on which this txn is valid
 * genesisHash - string specifies hash genesis block of network in use
 * genesisID - string specifies genesis ID of network in use
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makePaymentTxnWithSuggestedParams(from, to, amount, closeRemainderTo, note, suggestedParams) {
    let o = {
        "from": from,
        "to": to,
        "amount": amount,
        "closeRemainderTo": closeRemainderTo,
        "note": note,
        "suggestedParams": suggestedParams,
        "type": "pay"
    };
    return new txnBuilder.Transaction(o);
}

/**
 * makeKeyRegistrationTxn takes key registration arguments and returns a Transaction object for
 * that key registration operation
 *
 * @param from - string representation of Algorand address of sender
 * @param fee - integer fee per byte, in microAlgos. for a flat fee, overwrite the fee property on the returned object
 * @param firstRound - integer first protocol round on which this txn is valid
 * @param lastRound - integer last protocol round on which this txn is valid
 * @param note - uint8array of arbitrary data for sender to store
 * @param genesisHash - string specifies hash genesis block of network in use
 * @param genesisID - string specifies genesis ID of network in use
 * @param voteKey - string representation of voting key. for key deregistration, leave undefined
 * @param selectionKey - string representation of selection key. for key deregistration, leave undefined
 * @param voteFirst - first round on which voteKey is valid
 * @param voteLast - last round on which voteKey is valid
 * @param voteKeyDilution - integer
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makeKeyRegistrationTxn(from, fee, firstRound, lastRound, note, genesisHash, genesisID,
                                voteKey, selectionKey, voteFirst, voteLast, voteKeyDilution) {
    let suggestedParams = {
        "genesisHash": genesisHash,
        "genesisID": genesisID,
        "firstRound": firstRound,
        "lastRound": lastRound,
        "fee": fee
    };
    return makeKeyRegistrationTxnWithSuggestedParams(from, note, voteKey, selectionKey, voteFirst, voteLast, voteKeyDilution, suggestedParams);
}

/**
 * makeKeyRegistrationTxnWithSuggestedParams takes key registration arguments and returns a Transaction object for
 * that key registration operation
 *
 * @param from - string representation of Algorand address of sender
 * @param note - uint8array of arbitrary data for sender to store
 * @param voteKey - string representation of voting key. for key deregistration, leave undefined
 * @param selectionKey - string representation of selection key. for key deregistration, leave undefined
 * @param voteFirst - first round on which voteKey is valid
 * @param voteLast - last round on which voteKey is valid
 * @param voteKeyDilution - integer
 * @param suggestedParams - a dict holding common-to-all-txns args:
 * fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
 * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
 * firstRound - integer first protocol round on which this txn is valid
 * lastRound - integer last protocol round on which this txn is valid
 * genesisHash - string specifies hash genesis block of network in use
 * genesisID - string specifies genesis ID of network in use
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makeKeyRegistrationTxnWithSuggestedParams(from, note, voteKey, selectionKey, voteFirst, voteLast, voteKeyDilution, suggestedParams) {
    let o = {
        "from": from,
        "note": note,
        "voteKey": voteKey,
        "selectionKey": selectionKey,
        "voteFirst": voteFirst,
        "voteLast": voteLast,
        "voteKeyDilution": voteKeyDilution,
        "suggestedParams": suggestedParams,
        "type": "keyreg"
    };
    return new txnBuilder.Transaction(o);
}

/** makeAssetCreateTxn takes asset creation arguments and returns a Transaction object
 * for creating that asset
 *
 * @param from - string representation of Algorand address of sender
 * @param fee - integer fee per byte, in microAlgos. for a flat fee, overwrite the fee property on the returned object
 * @param firstRound - integer first protocol round on which this txn is valid
 * @param lastRound - integer last protocol round on which this txn is valid
 * @param note - uint8array of arbitrary data for sender to store
 * @param genesisHash - string specifies hash genesis block of network in use
 * @param genesisID - string specifies genesis ID of network in use
 * @param total - integer total supply of the asset
 * @param decimals - integer number of decimals for asset unit calculation
 * @param defaultFrozen - boolean whether asset accounts should default to being frozen
 * @param manager - string representation of Algorand address in charge of reserve, freeze, clawback, destruction, etc
 * @param reserve - string representation of Algorand address representing asset reserve
 * @param freeze - string representation of Algorand address with power to freeze/unfreeze asset holdings
 * @param clawback - string representation of Algorand address with power to revoke asset holdings
 * @param unitName - string units name for this asset
 * @param assetName - string name for this asset
 * @param assetURL - string URL relating to this asset
 * @param assetMetadataHash - string representation of some sort of hash commitment with respect to the asset
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makeAssetCreateTxn(from, fee, firstRound, lastRound, note, genesisHash, genesisID,
                            total, decimals, defaultFrozen, manager, reserve, freeze,
                            clawback, unitName, assetName, assetURL, assetMetadataHash) {
    let suggestedParams = {
        "genesisHash": genesisHash,
        "genesisID": genesisID,
        "firstRound": firstRound,
        "lastRound": lastRound,
        "fee": fee
    };
    return makeAssetCreateTxnWithSuggestedParams(from, note, total, decimals, defaultFrozen, manager, reserve, freeze, clawback,
        unitName, assetName, assetURL, assetMetadataHash, suggestedParams);
}

/** makeAssetCreateTxnWithSuggestedParams takes asset creation arguments and returns a Transaction object
 * for creating that asset
 *
 * @param from - string representation of Algorand address of sender
 * @param note - uint8array of arbitrary data for sender to store
 * @param total - integer total supply of the asset
 * @param decimals - integer number of decimals for asset unit calculation
 * @param defaultFrozen - boolean whether asset accounts should default to being frozen
 * @param manager - string representation of Algorand address in charge of reserve, freeze, clawback, destruction, etc
 * @param reserve - string representation of Algorand address representing asset reserve
 * @param freeze - string representation of Algorand address with power to freeze/unfreeze asset holdings
 * @param clawback - string representation of Algorand address with power to revoke asset holdings
 * @param unitName - string units name for this asset
 * @param assetName - string name for this asset
 * @param assetURL - string URL relating to this asset
 * @param assetMetadataHash - string representation of some sort of hash commitment with respect to the asset
 * @param suggestedParams - a dict holding common-to-all-txns args:
 * fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
 * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
 * firstRound - integer first protocol round on which this txn is valid
 * lastRound - integer last protocol round on which this txn is valid
 * genesisHash - string specifies hash genesis block of network in use
 * genesisID - string specifies genesis ID of network in use
 * @returns {Transaction}
 */
function makeAssetCreateTxnWithSuggestedParams(from, note, total, decimals, defaultFrozen, manager, reserve, freeze,
                            clawback, unitName, assetName, assetURL, assetMetadataHash, suggestedParams) {
    let o = {
        "from": from,
        "note": note,
        "suggestedParams": suggestedParams,
        "assetTotal": total,
        "assetDecimals": decimals,
        "assetDefaultFrozen": defaultFrozen,
        "assetUnitName": unitName,
        "assetName": assetName,
        "assetURL": assetURL,
        "assetMetadataHash": assetMetadataHash,
        "assetManager": manager,
        "assetReserve": reserve,
        "assetFreeze": freeze,
        "assetClawback": clawback,
        "type": "acfg"
    };
    return new txnBuilder.Transaction(o);
}

/** makeAssetConfigTxn can be issued by the asset manager to change the manager, reserve, freeze, or clawback
 * you must respecify existing addresses to keep them the same; leaving a field blank is the same as turning
 * that feature off for this asset
 *
 * @param from - string representation of Algorand address of sender
 * @param fee - integer fee per byte, in microAlgos. for a flat fee, overwrite the fee property on the returned object
 * @param firstRound - integer first protocol round on which this txn is valid
 * @param lastRound - integer last protocol round on which this txn is valid
 * @param note - uint8array of arbitrary data for sender to store
 * @param genesisHash - string specifies hash genesis block of network in use
 * @param genesisID - string specifies genesis ID of network in use
 * @param assetIndex - int asset index uniquely specifying the asset
 * @param manager - string representation of new asset manager Algorand address
 * @param reserve - string representation of new reserve Algorand address
 * @param freeze - string representation of new freeze manager Algorand address
 * @param clawback - string representation of new revocation manager Algorand address
 * @param strictEmptyAddressChecking - boolean - throw an error if any of manager, reserve, freeze, or clawback are undefined. optional, defaults to true.
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makeAssetConfigTxn(from, fee, firstRound, lastRound, note, genesisHash, genesisID,
                            assetIndex, manager, reserve, freeze, clawback, strictEmptyAddressChecking=true) {
    let suggestedParams = {
        "genesisHash": genesisHash,
        "genesisID": genesisID,
        "firstRound": firstRound,
        "lastRound": lastRound,
        "fee": fee
    };
    return makeAssetConfigTxnWithSuggestedParams(from, note, assetIndex, manager, reserve, freeze, clawback, suggestedParams, strictEmptyAddressChecking);
}

/** makeAssetConfigTxnWithSuggestedParams can be issued by the asset manager to change the manager, reserve, freeze, or clawback
 * you must respecify existing addresses to keep them the same; leaving a field blank is the same as turning
 * that feature off for this asset
 *
 * @param from - string representation of Algorand address of sender
 * @param note - uint8array of arbitrary data for sender to store
 * @param assetIndex - int asset index uniquely specifying the asset
 * @param manager - string representation of new asset manager Algorand address
 * @param reserve - string representation of new reserve Algorand address
 * @param freeze - string representation of new freeze manager Algorand address
 * @param clawback - string representation of new revocation manager Algorand address
 * @param strictEmptyAddressChecking - boolean - throw an error if any of manager, reserve, freeze, or clawback are undefined. optional, defaults to true.
 * @param suggestedParams - a dict holding common-to-all-txns args:
 * fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
 * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
 * firstRound - integer first protocol round on which this txn is valid
 * lastRound - integer last protocol round on which this txn is valid
 * genesisHash - string specifies hash genesis block of network in use
 * genesisID - string specifies genesis ID of network in use
 * @returns {Transaction}
 */
function makeAssetConfigTxnWithSuggestedParams(from, note, assetIndex,
                                      manager, reserve, freeze, clawback, suggestedParams, strictEmptyAddressChecking=true) {
    if (strictEmptyAddressChecking && ((manager === undefined) || (reserve === undefined) || (freeze === undefined) || (clawback === undefined))) {
        throw Error("strict empty address checking was turned on, but at least one empty address was provided");
    }
    let o = {
        "from": from,
        "suggestedParams": suggestedParams,
        "assetIndex": assetIndex,
        "assetManager": manager,
        "assetReserve": reserve,
        "assetFreeze": freeze,
        "assetClawback": clawback,
        "type": "acfg",
        "note": note
    };
    return new txnBuilder.Transaction(o);
}

/** makeAssetDestroyTxn will allow the asset's manager to remove this asset from the ledger, so long
 * as all outstanding assets are held by the creator.
 *
 * @param from - string representation of Algorand address of sender
 * @param fee - integer fee per byte, in microAlgos. for a flat fee, overwrite the fee property on the returned object
 * @param firstRound - integer first protocol round on which this txn is valid
 * @param lastRound - integer last protocol round on which this txn is valid
 * @param note - uint8array of arbitrary data for sender to store
 * @param genesisHash - string specifies hash genesis block of network in use
 * @param genesisID - string specifies genesis ID of network in use
 * @param assetIndex - int asset index uniquely specifying the asset
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makeAssetDestroyTxn(from, fee, firstRound, lastRound, note, genesisHash, genesisID, assetIndex) {
    let suggestedParams = {
        "genesisHash": genesisHash,
        "genesisID": genesisID,
        "firstRound": firstRound,
        "lastRound": lastRound,
        "fee": fee
    };
    return makeAssetDestroyTxnWithSuggestedParams(from, note, assetIndex, suggestedParams);
}

/** makeAssetDestroyTxnWithSuggestedParams will allow the asset's manager to remove this asset from the ledger, so long
 * as all outstanding assets are held by the creator.
 *
 * @param from - string representation of Algorand address of sender
 * @param note - uint8array of arbitrary data for sender to store
 * @param assetIndex - int asset index uniquely specifying the asset
 * @param suggestedParams - a dict holding common-to-all-txns args:
 * fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
 * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
 * firstRound - integer first protocol round on which this txn is valid
 * lastRound - integer last protocol round on which this txn is valid
 * genesisHash - string specifies hash genesis block of network in use
 * genesisID - string specifies genesis ID of network in use
 * @returns {Transaction}
 */
function makeAssetDestroyTxnWithSuggestedParams(from, note, assetIndex, suggestedParams) {
    let o = {
        "from": from,
        "suggestedParams": suggestedParams,
        "assetIndex": assetIndex,
        "type": "acfg",
        "note": note
    };
    return new txnBuilder.Transaction(o);
}

/** makeAssetFreezeTxn will allow the asset's freeze manager to freeze or un-freeze an account,
 * blocking or allowing asset transfers to and from the targeted account.
 *
 * @param from - string representation of Algorand address of sender
 * @param fee - integer fee per byte, in microAlgos. for a flat fee, overwrite the fee property on the returned object
 * @param firstRound - integer first protocol round on which this txn is valid
 * @param lastRound - integer last protocol round on which this txn is valid
 * @param note - uint8array of arbitrary data for sender to store
 * @param genesisHash - string specifies hash genesis block of network in use
 * @param genesisID - string specifies genesis ID of network in use
 * @param assetIndex - int asset index uniquely specifying the asset
 * @param freezeTarget - string representation of Algorand address being frozen or unfrozen
 * @param freezeState - true if freezeTarget should be frozen, false if freezeTarget should be allowed to transact
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makeAssetFreezeTxn(from, fee, firstRound, lastRound, note, genesisHash, genesisID,
                            assetIndex, freezeTarget, freezeState) {
    let suggestedParams = {
        "genesisHash": genesisHash,
        "genesisID": genesisID,
        "firstRound": firstRound,
        "lastRound": lastRound,
        "fee": fee
    };
    return makeAssetFreezeTxnWithSuggestedParams(from, note, assetIndex, freezeTarget, freezeState, suggestedParams);
}

/** makeAssetFreezeTxnWithSuggestedParams will allow the asset's freeze manager to freeze or un-freeze an account,
 * blocking or allowing asset transfers to and from the targeted account.
 *
 * @param from - string representation of Algorand address of sender
 * @param note - uint8array of arbitrary data for sender to store
 * @param assetIndex - int asset index uniquely specifying the asset
 * @param freezeTarget - string representation of Algorand address being frozen or unfrozen
 * @param freezeState - true if freezeTarget should be frozen, false if freezeTarget should be allowed to transact
 * @param suggestedParams - a dict holding common-to-all-txns args:
 * fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
 * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
 * firstRound - integer first protocol round on which this txn is valid
 * lastRound - integer last protocol round on which this txn is valid
 * genesisHash - string specifies hash genesis block of network in use
 * genesisID - string specifies genesis ID of network in use
 * @returns {Transaction}
 */
function makeAssetFreezeTxnWithSuggestedParams(from, note, assetIndex, freezeTarget, freezeState, suggestedParams) {
    let o = {
        "from": from,
        "type": "afrz",
        "freezeAccount": freezeTarget,
        "assetIndex": assetIndex,
        "freezeState" : freezeState,
        "note": note,
        "suggestedParams": suggestedParams
    };
    return new txnBuilder.Transaction(o);
}


/** makeAssetTransferTxn allows for the creation of an asset transfer transaction.
 * Special case: to begin accepting assets, set amount=0 and from=to.
 *
 * @param from - string representation of Algorand address of sender
 * @param to - string representation of Algorand address of asset recipient
 * @param closeRemainderTo - optional - string representation of Algorand address - if provided,
 * send all remaining assets after transfer to the "closeRemainderTo" address and close "from"'s asset holdings
 * @param revocationTarget - optional - string representation of Algorand address - if provided,
 * and if "from" is the asset's revocation manager, then deduct from "revocationTarget" rather than "from"
 * @param fee - integer fee per byte, in microAlgos. for a flat fee, overwrite the fee property on the returned object
 * @param amount - integer amount of assets to send
 * @param firstRound - integer first protocol round on which this txn is valid
 * @param lastRound - integer last protocol round on which this txn is valid
 * @param note - uint8array of arbitrary data for sender to store
 * @param genesisHash - string specifies hash genesis block of network in use
 * @param genesisID - string specifies genesis ID of network in use
 * @param assetIndex - int asset index uniquely specifying the asset
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @returns {Transaction}
 */
function makeAssetTransferTxn(from, to, closeRemainderTo, revocationTarget,
                              fee, amount, firstRound, lastRound, note, genesisHash, genesisID, assetIndex) {
    let suggestedParams = {
        "genesisHash": genesisHash,
        "genesisID": genesisID,
        "firstRound": firstRound,
        "lastRound": lastRound,
        "fee": fee
    };
    return makeAssetTransferTxnWithSuggestedParams(from, to, closeRemainderTo, revocationTarget, amount, note, assetIndex, suggestedParams);
}

/** makeAssetTransferTxnWithSuggestedParams allows for the creation of an asset transfer transaction.
 * Special case: to begin accepting assets, set amount=0 and from=to.
 *
 * @param from - string representation of Algorand address of sender
 * @param to - string representation of Algorand address of asset recipient
 * @param closeRemainderTo - optional - string representation of Algorand address - if provided,
 * send all remaining assets after transfer to the "closeRemainderTo" address and close "from"'s asset holdings
 * @param revocationTarget - optional - string representation of Algorand address - if provided,
 * and if "from" is the asset's revocation manager, then deduct from "revocationTarget" rather than "from"
 * @param amount - integer amount of assets to send
 * @param note - uint8array of arbitrary data for sender to store
 * @param assetIndex - int asset index uniquely specifying the asset
 * @Deprecated in version 2.0 this will change to use the "WithSuggestedParams" signature.
 * @param suggestedParams - a dict holding common-to-all-txns args:
 * fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
 * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
 * firstRound - integer first protocol round on which this txn is valid
 * lastRound - integer last protocol round on which this txn is valid
 * genesisHash - string specifies hash genesis block of network in use
 * genesisID - string specifies genesis ID of network in use
 * @returns {Transaction}
 */
function makeAssetTransferTxnWithSuggestedParams(from, to, closeRemainderTo, revocationTarget,
                              amount, note, assetIndex, suggestedParams) {
    let o = {
        "type": "axfer",
        "from": from,
        "to": to,
        "amount": amount,
        "suggestedParams": suggestedParams,
        "assetIndex": assetIndex,
        "note": note,
        "assetRevocationTarget": revocationTarget,
        "closeRemainderTo": closeRemainderTo
    };
    return new txnBuilder.Transaction(o);
}


module.exports = {
    isValidAddress,
    generateAccount,
    secretKeyToMnemonic,
    mnemonicToSecretKey,
    signTransaction,
    signBid,
    signBytes,
    verifyBytes,
    encodeObj,
    decodeObj,
    Algod,
    Kmd,
    Algodv2,
    Indexer,
    mnemonicToMasterDerivationKey,
    masterDerivationKeyToMnemonic,
    appendSignMultisigTransaction,
    mergeMultisigTransactions,
    signMultisigTransaction,
    multisigAddress,
    ERROR_MULTISIG_BAD_SENDER,
    ERROR_INVALID_MICROALGOS,
    microalgosToAlgos,
    algosToMicroalgos,
    computeGroupID,
    assignGroupID,
    makeLogicSig,
    signLogicSigTransaction,
    signLogicSigTransactionObject,
    logicSigFromByte,
    makePaymentTxn,
    makeKeyRegistrationTxn,
    makeAssetCreateTxn,
    makeAssetConfigTxn,
    makeAssetDestroyTxn,
    makeAssetFreezeTxn,
    makeAssetTransferTxn,
    makePaymentTxnWithSuggestedParams,
    makeKeyRegistrationTxnWithSuggestedParams,
    makeAssetCreateTxnWithSuggestedParams,
    makeAssetConfigTxnWithSuggestedParams,
    makeAssetDestroyTxnWithSuggestedParams,
    makeAssetFreezeTxnWithSuggestedParams,
    makeAssetTransferTxnWithSuggestedParams
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

(function(nacl) {
'use strict';

// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

var gf = function(init) {
  var i, r = new Float64Array(16);
  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
  return r;
};

//  Pluggable, initialized in high-level API below.
var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

var _0 = new Uint8Array(16);
var _9 = new Uint8Array(32); _9[0] = 9;

var gf0 = gf(),
    gf1 = gf([1]),
    _121665 = gf([0xdb41, 1]),
    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function ts64(x, i, h, l) {
  x[i]   = (h >> 24) & 0xff;
  x[i+1] = (h >> 16) & 0xff;
  x[i+2] = (h >>  8) & 0xff;
  x[i+3] = h & 0xff;
  x[i+4] = (l >> 24)  & 0xff;
  x[i+5] = (l >> 16)  & 0xff;
  x[i+6] = (l >>  8)  & 0xff;
  x[i+7] = l & 0xff;
}

function vn(x, xi, y, yi, n) {
  var i,d = 0;
  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
  return (1 & ((d - 1) >>> 8)) - 1;
}

function crypto_verify_16(x, xi, y, yi) {
  return vn(x,xi,y,yi,16);
}

function crypto_verify_32(x, xi, y, yi) {
  return vn(x,xi,y,yi,32);
}

function core_salsa20(o, p, k, c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }
   x0 =  x0 +  j0 | 0;
   x1 =  x1 +  j1 | 0;
   x2 =  x2 +  j2 | 0;
   x3 =  x3 +  j3 | 0;
   x4 =  x4 +  j4 | 0;
   x5 =  x5 +  j5 | 0;
   x6 =  x6 +  j6 | 0;
   x7 =  x7 +  j7 | 0;
   x8 =  x8 +  j8 | 0;
   x9 =  x9 +  j9 | 0;
  x10 = x10 + j10 | 0;
  x11 = x11 + j11 | 0;
  x12 = x12 + j12 | 0;
  x13 = x13 + j13 | 0;
  x14 = x14 + j14 | 0;
  x15 = x15 + j15 | 0;

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x1 >>>  0 & 0xff;
  o[ 5] = x1 >>>  8 & 0xff;
  o[ 6] = x1 >>> 16 & 0xff;
  o[ 7] = x1 >>> 24 & 0xff;

  o[ 8] = x2 >>>  0 & 0xff;
  o[ 9] = x2 >>>  8 & 0xff;
  o[10] = x2 >>> 16 & 0xff;
  o[11] = x2 >>> 24 & 0xff;

  o[12] = x3 >>>  0 & 0xff;
  o[13] = x3 >>>  8 & 0xff;
  o[14] = x3 >>> 16 & 0xff;
  o[15] = x3 >>> 24 & 0xff;

  o[16] = x4 >>>  0 & 0xff;
  o[17] = x4 >>>  8 & 0xff;
  o[18] = x4 >>> 16 & 0xff;
  o[19] = x4 >>> 24 & 0xff;

  o[20] = x5 >>>  0 & 0xff;
  o[21] = x5 >>>  8 & 0xff;
  o[22] = x5 >>> 16 & 0xff;
  o[23] = x5 >>> 24 & 0xff;

  o[24] = x6 >>>  0 & 0xff;
  o[25] = x6 >>>  8 & 0xff;
  o[26] = x6 >>> 16 & 0xff;
  o[27] = x6 >>> 24 & 0xff;

  o[28] = x7 >>>  0 & 0xff;
  o[29] = x7 >>>  8 & 0xff;
  o[30] = x7 >>> 16 & 0xff;
  o[31] = x7 >>> 24 & 0xff;

  o[32] = x8 >>>  0 & 0xff;
  o[33] = x8 >>>  8 & 0xff;
  o[34] = x8 >>> 16 & 0xff;
  o[35] = x8 >>> 24 & 0xff;

  o[36] = x9 >>>  0 & 0xff;
  o[37] = x9 >>>  8 & 0xff;
  o[38] = x9 >>> 16 & 0xff;
  o[39] = x9 >>> 24 & 0xff;

  o[40] = x10 >>>  0 & 0xff;
  o[41] = x10 >>>  8 & 0xff;
  o[42] = x10 >>> 16 & 0xff;
  o[43] = x10 >>> 24 & 0xff;

  o[44] = x11 >>>  0 & 0xff;
  o[45] = x11 >>>  8 & 0xff;
  o[46] = x11 >>> 16 & 0xff;
  o[47] = x11 >>> 24 & 0xff;

  o[48] = x12 >>>  0 & 0xff;
  o[49] = x12 >>>  8 & 0xff;
  o[50] = x12 >>> 16 & 0xff;
  o[51] = x12 >>> 24 & 0xff;

  o[52] = x13 >>>  0 & 0xff;
  o[53] = x13 >>>  8 & 0xff;
  o[54] = x13 >>> 16 & 0xff;
  o[55] = x13 >>> 24 & 0xff;

  o[56] = x14 >>>  0 & 0xff;
  o[57] = x14 >>>  8 & 0xff;
  o[58] = x14 >>> 16 & 0xff;
  o[59] = x14 >>> 24 & 0xff;

  o[60] = x15 >>>  0 & 0xff;
  o[61] = x15 >>>  8 & 0xff;
  o[62] = x15 >>> 16 & 0xff;
  o[63] = x15 >>> 24 & 0xff;
}

function core_hsalsa20(o,p,k,c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x5 >>>  0 & 0xff;
  o[ 5] = x5 >>>  8 & 0xff;
  o[ 6] = x5 >>> 16 & 0xff;
  o[ 7] = x5 >>> 24 & 0xff;

  o[ 8] = x10 >>>  0 & 0xff;
  o[ 9] = x10 >>>  8 & 0xff;
  o[10] = x10 >>> 16 & 0xff;
  o[11] = x10 >>> 24 & 0xff;

  o[12] = x15 >>>  0 & 0xff;
  o[13] = x15 >>>  8 & 0xff;
  o[14] = x15 >>> 16 & 0xff;
  o[15] = x15 >>> 24 & 0xff;

  o[16] = x6 >>>  0 & 0xff;
  o[17] = x6 >>>  8 & 0xff;
  o[18] = x6 >>> 16 & 0xff;
  o[19] = x6 >>> 24 & 0xff;

  o[20] = x7 >>>  0 & 0xff;
  o[21] = x7 >>>  8 & 0xff;
  o[22] = x7 >>> 16 & 0xff;
  o[23] = x7 >>> 24 & 0xff;

  o[24] = x8 >>>  0 & 0xff;
  o[25] = x8 >>>  8 & 0xff;
  o[26] = x8 >>> 16 & 0xff;
  o[27] = x8 >>> 24 & 0xff;

  o[28] = x9 >>>  0 & 0xff;
  o[29] = x9 >>>  8 & 0xff;
  o[30] = x9 >>> 16 & 0xff;
  o[31] = x9 >>> 24 & 0xff;
}

function crypto_core_salsa20(out,inp,k,c) {
  core_salsa20(out,inp,k,c);
}

function crypto_core_hsalsa20(out,inp,k,c) {
  core_hsalsa20(out,inp,k,c);
}

var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
            // "expand 32-byte k"

function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
    mpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
  }
  return 0;
}

function crypto_stream_salsa20(c,cpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = x[i];
  }
  return 0;
}

function crypto_stream(c,cpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20(c,cpos,d,sn,s);
}

function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
}

/*
* Port of Andrew Moon's Poly1305-donna-16. Public domain.
* https://github.com/floodyberry/poly1305-donna
*/

var poly1305 = function(key) {
  this.buffer = new Uint8Array(16);
  this.r = new Uint16Array(10);
  this.h = new Uint16Array(10);
  this.pad = new Uint16Array(8);
  this.leftover = 0;
  this.fin = 0;

  var t0, t1, t2, t3, t4, t5, t6, t7;

  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
  this.r[9] = ((t7 >>>  5)) & 0x007f;

  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
};

poly1305.prototype.blocks = function(m, mpos, bytes) {
  var hibit = this.fin ? 0 : (1 << 11);
  var t0, t1, t2, t3, t4, t5, t6, t7, c;
  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

  var h0 = this.h[0],
      h1 = this.h[1],
      h2 = this.h[2],
      h3 = this.h[3],
      h4 = this.h[4],
      h5 = this.h[5],
      h6 = this.h[6],
      h7 = this.h[7],
      h8 = this.h[8],
      h9 = this.h[9];

  var r0 = this.r[0],
      r1 = this.r[1],
      r2 = this.r[2],
      r3 = this.r[3],
      r4 = this.r[4],
      r5 = this.r[5],
      r6 = this.r[6],
      r7 = this.r[7],
      r8 = this.r[8],
      r9 = this.r[9];

  while (bytes >= 16) {
    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
    h5 += ((t4 >>>  1)) & 0x1fff;
    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
    h9 += ((t7 >>> 5)) | hibit;

    c = 0;

    d0 = c;
    d0 += h0 * r0;
    d0 += h1 * (5 * r9);
    d0 += h2 * (5 * r8);
    d0 += h3 * (5 * r7);
    d0 += h4 * (5 * r6);
    c = (d0 >>> 13); d0 &= 0x1fff;
    d0 += h5 * (5 * r5);
    d0 += h6 * (5 * r4);
    d0 += h7 * (5 * r3);
    d0 += h8 * (5 * r2);
    d0 += h9 * (5 * r1);
    c += (d0 >>> 13); d0 &= 0x1fff;

    d1 = c;
    d1 += h0 * r1;
    d1 += h1 * r0;
    d1 += h2 * (5 * r9);
    d1 += h3 * (5 * r8);
    d1 += h4 * (5 * r7);
    c = (d1 >>> 13); d1 &= 0x1fff;
    d1 += h5 * (5 * r6);
    d1 += h6 * (5 * r5);
    d1 += h7 * (5 * r4);
    d1 += h8 * (5 * r3);
    d1 += h9 * (5 * r2);
    c += (d1 >>> 13); d1 &= 0x1fff;

    d2 = c;
    d2 += h0 * r2;
    d2 += h1 * r1;
    d2 += h2 * r0;
    d2 += h3 * (5 * r9);
    d2 += h4 * (5 * r8);
    c = (d2 >>> 13); d2 &= 0x1fff;
    d2 += h5 * (5 * r7);
    d2 += h6 * (5 * r6);
    d2 += h7 * (5 * r5);
    d2 += h8 * (5 * r4);
    d2 += h9 * (5 * r3);
    c += (d2 >>> 13); d2 &= 0x1fff;

    d3 = c;
    d3 += h0 * r3;
    d3 += h1 * r2;
    d3 += h2 * r1;
    d3 += h3 * r0;
    d3 += h4 * (5 * r9);
    c = (d3 >>> 13); d3 &= 0x1fff;
    d3 += h5 * (5 * r8);
    d3 += h6 * (5 * r7);
    d3 += h7 * (5 * r6);
    d3 += h8 * (5 * r5);
    d3 += h9 * (5 * r4);
    c += (d3 >>> 13); d3 &= 0x1fff;

    d4 = c;
    d4 += h0 * r4;
    d4 += h1 * r3;
    d4 += h2 * r2;
    d4 += h3 * r1;
    d4 += h4 * r0;
    c = (d4 >>> 13); d4 &= 0x1fff;
    d4 += h5 * (5 * r9);
    d4 += h6 * (5 * r8);
    d4 += h7 * (5 * r7);
    d4 += h8 * (5 * r6);
    d4 += h9 * (5 * r5);
    c += (d4 >>> 13); d4 &= 0x1fff;

    d5 = c;
    d5 += h0 * r5;
    d5 += h1 * r4;
    d5 += h2 * r3;
    d5 += h3 * r2;
    d5 += h4 * r1;
    c = (d5 >>> 13); d5 &= 0x1fff;
    d5 += h5 * r0;
    d5 += h6 * (5 * r9);
    d5 += h7 * (5 * r8);
    d5 += h8 * (5 * r7);
    d5 += h9 * (5 * r6);
    c += (d5 >>> 13); d5 &= 0x1fff;

    d6 = c;
    d6 += h0 * r6;
    d6 += h1 * r5;
    d6 += h2 * r4;
    d6 += h3 * r3;
    d6 += h4 * r2;
    c = (d6 >>> 13); d6 &= 0x1fff;
    d6 += h5 * r1;
    d6 += h6 * r0;
    d6 += h7 * (5 * r9);
    d6 += h8 * (5 * r8);
    d6 += h9 * (5 * r7);
    c += (d6 >>> 13); d6 &= 0x1fff;

    d7 = c;
    d7 += h0 * r7;
    d7 += h1 * r6;
    d7 += h2 * r5;
    d7 += h3 * r4;
    d7 += h4 * r3;
    c = (d7 >>> 13); d7 &= 0x1fff;
    d7 += h5 * r2;
    d7 += h6 * r1;
    d7 += h7 * r0;
    d7 += h8 * (5 * r9);
    d7 += h9 * (5 * r8);
    c += (d7 >>> 13); d7 &= 0x1fff;

    d8 = c;
    d8 += h0 * r8;
    d8 += h1 * r7;
    d8 += h2 * r6;
    d8 += h3 * r5;
    d8 += h4 * r4;
    c = (d8 >>> 13); d8 &= 0x1fff;
    d8 += h5 * r3;
    d8 += h6 * r2;
    d8 += h7 * r1;
    d8 += h8 * r0;
    d8 += h9 * (5 * r9);
    c += (d8 >>> 13); d8 &= 0x1fff;

    d9 = c;
    d9 += h0 * r9;
    d9 += h1 * r8;
    d9 += h2 * r7;
    d9 += h3 * r6;
    d9 += h4 * r5;
    c = (d9 >>> 13); d9 &= 0x1fff;
    d9 += h5 * r4;
    d9 += h6 * r3;
    d9 += h7 * r2;
    d9 += h8 * r1;
    d9 += h9 * r0;
    c += (d9 >>> 13); d9 &= 0x1fff;

    c = (((c << 2) + c)) | 0;
    c = (c + d0) | 0;
    d0 = c & 0x1fff;
    c = (c >>> 13);
    d1 += c;

    h0 = d0;
    h1 = d1;
    h2 = d2;
    h3 = d3;
    h4 = d4;
    h5 = d5;
    h6 = d6;
    h7 = d7;
    h8 = d8;
    h9 = d9;

    mpos += 16;
    bytes -= 16;
  }
  this.h[0] = h0;
  this.h[1] = h1;
  this.h[2] = h2;
  this.h[3] = h3;
  this.h[4] = h4;
  this.h[5] = h5;
  this.h[6] = h6;
  this.h[7] = h7;
  this.h[8] = h8;
  this.h[9] = h9;
};

poly1305.prototype.finish = function(mac, macpos) {
  var g = new Uint16Array(10);
  var c, mask, f, i;

  if (this.leftover) {
    i = this.leftover;
    this.buffer[i++] = 1;
    for (; i < 16; i++) this.buffer[i] = 0;
    this.fin = 1;
    this.blocks(this.buffer, 0, 16);
  }

  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  for (i = 2; i < 10; i++) {
    this.h[i] += c;
    c = this.h[i] >>> 13;
    this.h[i] &= 0x1fff;
  }
  this.h[0] += (c * 5);
  c = this.h[0] >>> 13;
  this.h[0] &= 0x1fff;
  this.h[1] += c;
  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  this.h[2] += c;

  g[0] = this.h[0] + 5;
  c = g[0] >>> 13;
  g[0] &= 0x1fff;
  for (i = 1; i < 10; i++) {
    g[i] = this.h[i] + c;
    c = g[i] >>> 13;
    g[i] &= 0x1fff;
  }
  g[9] -= (1 << 13);

  mask = (c ^ 1) - 1;
  for (i = 0; i < 10; i++) g[i] &= mask;
  mask = ~mask;
  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

  f = this.h[0] + this.pad[0];
  this.h[0] = f & 0xffff;
  for (i = 1; i < 8; i++) {
    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
    this.h[i] = f & 0xffff;
  }

  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
};

poly1305.prototype.update = function(m, mpos, bytes) {
  var i, want;

  if (this.leftover) {
    want = (16 - this.leftover);
    if (want > bytes)
      want = bytes;
    for (i = 0; i < want; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    bytes -= want;
    mpos += want;
    this.leftover += want;
    if (this.leftover < 16)
      return;
    this.blocks(this.buffer, 0, 16);
    this.leftover = 0;
  }

  if (bytes >= 16) {
    want = bytes - (bytes % 16);
    this.blocks(m, mpos, want);
    mpos += want;
    bytes -= want;
  }

  if (bytes) {
    for (i = 0; i < bytes; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    this.leftover += bytes;
  }
};

function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  var s = new poly1305(k);
  s.update(m, mpos, n);
  s.finish(out, outpos);
  return 0;
}

function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  var x = new Uint8Array(16);
  crypto_onetimeauth(x,0,m,mpos,n,k);
  return crypto_verify_16(h,hpos,x,0);
}

function crypto_secretbox(c,m,d,n,k) {
  var i;
  if (d < 32) return -1;
  crypto_stream_xor(c,0,m,0,d,n,k);
  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  for (i = 0; i < 16; i++) c[i] = 0;
  return 0;
}

function crypto_secretbox_open(m,c,d,n,k) {
  var i;
  var x = new Uint8Array(32);
  if (d < 32) return -1;
  crypto_stream(x,0,32,n,k);
  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
  crypto_stream_xor(m,0,c,0,d,n,k);
  for (i = 0; i < 32; i++) m[i] = 0;
  return 0;
}

function set25519(r, a) {
  var i;
  for (i = 0; i < 16; i++) r[i] = a[i]|0;
}

function car25519(o) {
  var i, v, c = 1;
  for (i = 0; i < 16; i++) {
    v = o[i] + c + 65535;
    c = Math.floor(v / 65536);
    o[i] = v - c * 65536;
  }
  o[0] += c-1 + 37 * (c-1);
}

function sel25519(p, q, b) {
  var t, c = ~(b-1);
  for (var i = 0; i < 16; i++) {
    t = c & (p[i] ^ q[i]);
    p[i] ^= t;
    q[i] ^= t;
  }
}

function pack25519(o, n) {
  var i, j, b;
  var m = gf(), t = gf();
  for (i = 0; i < 16; i++) t[i] = n[i];
  car25519(t);
  car25519(t);
  car25519(t);
  for (j = 0; j < 2; j++) {
    m[0] = t[0] - 0xffed;
    for (i = 1; i < 15; i++) {
      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
      m[i-1] &= 0xffff;
    }
    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
    b = (m[15]>>16) & 1;
    m[14] &= 0xffff;
    sel25519(t, m, 1-b);
  }
  for (i = 0; i < 16; i++) {
    o[2*i] = t[i] & 0xff;
    o[2*i+1] = t[i]>>8;
  }
}

function neq25519(a, b) {
  var c = new Uint8Array(32), d = new Uint8Array(32);
  pack25519(c, a);
  pack25519(d, b);
  return crypto_verify_32(c, 0, d, 0);
}

function par25519(a) {
  var d = new Uint8Array(32);
  pack25519(d, a);
  return d[0] & 1;
}

function unpack25519(o, n) {
  var i;
  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
  o[15] &= 0x7fff;
}

function A(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
}

function Z(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
}

function M(o, a, b) {
  var v, c,
     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11],
    b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];

  v = a[0];
  t0 += v * b0;
  t1 += v * b1;
  t2 += v * b2;
  t3 += v * b3;
  t4 += v * b4;
  t5 += v * b5;
  t6 += v * b6;
  t7 += v * b7;
  t8 += v * b8;
  t9 += v * b9;
  t10 += v * b10;
  t11 += v * b11;
  t12 += v * b12;
  t13 += v * b13;
  t14 += v * b14;
  t15 += v * b15;
  v = a[1];
  t1 += v * b0;
  t2 += v * b1;
  t3 += v * b2;
  t4 += v * b3;
  t5 += v * b4;
  t6 += v * b5;
  t7 += v * b6;
  t8 += v * b7;
  t9 += v * b8;
  t10 += v * b9;
  t11 += v * b10;
  t12 += v * b11;
  t13 += v * b12;
  t14 += v * b13;
  t15 += v * b14;
  t16 += v * b15;
  v = a[2];
  t2 += v * b0;
  t3 += v * b1;
  t4 += v * b2;
  t5 += v * b3;
  t6 += v * b4;
  t7 += v * b5;
  t8 += v * b6;
  t9 += v * b7;
  t10 += v * b8;
  t11 += v * b9;
  t12 += v * b10;
  t13 += v * b11;
  t14 += v * b12;
  t15 += v * b13;
  t16 += v * b14;
  t17 += v * b15;
  v = a[3];
  t3 += v * b0;
  t4 += v * b1;
  t5 += v * b2;
  t6 += v * b3;
  t7 += v * b4;
  t8 += v * b5;
  t9 += v * b6;
  t10 += v * b7;
  t11 += v * b8;
  t12 += v * b9;
  t13 += v * b10;
  t14 += v * b11;
  t15 += v * b12;
  t16 += v * b13;
  t17 += v * b14;
  t18 += v * b15;
  v = a[4];
  t4 += v * b0;
  t5 += v * b1;
  t6 += v * b2;
  t7 += v * b3;
  t8 += v * b4;
  t9 += v * b5;
  t10 += v * b6;
  t11 += v * b7;
  t12 += v * b8;
  t13 += v * b9;
  t14 += v * b10;
  t15 += v * b11;
  t16 += v * b12;
  t17 += v * b13;
  t18 += v * b14;
  t19 += v * b15;
  v = a[5];
  t5 += v * b0;
  t6 += v * b1;
  t7 += v * b2;
  t8 += v * b3;
  t9 += v * b4;
  t10 += v * b5;
  t11 += v * b6;
  t12 += v * b7;
  t13 += v * b8;
  t14 += v * b9;
  t15 += v * b10;
  t16 += v * b11;
  t17 += v * b12;
  t18 += v * b13;
  t19 += v * b14;
  t20 += v * b15;
  v = a[6];
  t6 += v * b0;
  t7 += v * b1;
  t8 += v * b2;
  t9 += v * b3;
  t10 += v * b4;
  t11 += v * b5;
  t12 += v * b6;
  t13 += v * b7;
  t14 += v * b8;
  t15 += v * b9;
  t16 += v * b10;
  t17 += v * b11;
  t18 += v * b12;
  t19 += v * b13;
  t20 += v * b14;
  t21 += v * b15;
  v = a[7];
  t7 += v * b0;
  t8 += v * b1;
  t9 += v * b2;
  t10 += v * b3;
  t11 += v * b4;
  t12 += v * b5;
  t13 += v * b6;
  t14 += v * b7;
  t15 += v * b8;
  t16 += v * b9;
  t17 += v * b10;
  t18 += v * b11;
  t19 += v * b12;
  t20 += v * b13;
  t21 += v * b14;
  t22 += v * b15;
  v = a[8];
  t8 += v * b0;
  t9 += v * b1;
  t10 += v * b2;
  t11 += v * b3;
  t12 += v * b4;
  t13 += v * b5;
  t14 += v * b6;
  t15 += v * b7;
  t16 += v * b8;
  t17 += v * b9;
  t18 += v * b10;
  t19 += v * b11;
  t20 += v * b12;
  t21 += v * b13;
  t22 += v * b14;
  t23 += v * b15;
  v = a[9];
  t9 += v * b0;
  t10 += v * b1;
  t11 += v * b2;
  t12 += v * b3;
  t13 += v * b4;
  t14 += v * b5;
  t15 += v * b6;
  t16 += v * b7;
  t17 += v * b8;
  t18 += v * b9;
  t19 += v * b10;
  t20 += v * b11;
  t21 += v * b12;
  t22 += v * b13;
  t23 += v * b14;
  t24 += v * b15;
  v = a[10];
  t10 += v * b0;
  t11 += v * b1;
  t12 += v * b2;
  t13 += v * b3;
  t14 += v * b4;
  t15 += v * b5;
  t16 += v * b6;
  t17 += v * b7;
  t18 += v * b8;
  t19 += v * b9;
  t20 += v * b10;
  t21 += v * b11;
  t22 += v * b12;
  t23 += v * b13;
  t24 += v * b14;
  t25 += v * b15;
  v = a[11];
  t11 += v * b0;
  t12 += v * b1;
  t13 += v * b2;
  t14 += v * b3;
  t15 += v * b4;
  t16 += v * b5;
  t17 += v * b6;
  t18 += v * b7;
  t19 += v * b8;
  t20 += v * b9;
  t21 += v * b10;
  t22 += v * b11;
  t23 += v * b12;
  t24 += v * b13;
  t25 += v * b14;
  t26 += v * b15;
  v = a[12];
  t12 += v * b0;
  t13 += v * b1;
  t14 += v * b2;
  t15 += v * b3;
  t16 += v * b4;
  t17 += v * b5;
  t18 += v * b6;
  t19 += v * b7;
  t20 += v * b8;
  t21 += v * b9;
  t22 += v * b10;
  t23 += v * b11;
  t24 += v * b12;
  t25 += v * b13;
  t26 += v * b14;
  t27 += v * b15;
  v = a[13];
  t13 += v * b0;
  t14 += v * b1;
  t15 += v * b2;
  t16 += v * b3;
  t17 += v * b4;
  t18 += v * b5;
  t19 += v * b6;
  t20 += v * b7;
  t21 += v * b8;
  t22 += v * b9;
  t23 += v * b10;
  t24 += v * b11;
  t25 += v * b12;
  t26 += v * b13;
  t27 += v * b14;
  t28 += v * b15;
  v = a[14];
  t14 += v * b0;
  t15 += v * b1;
  t16 += v * b2;
  t17 += v * b3;
  t18 += v * b4;
  t19 += v * b5;
  t20 += v * b6;
  t21 += v * b7;
  t22 += v * b8;
  t23 += v * b9;
  t24 += v * b10;
  t25 += v * b11;
  t26 += v * b12;
  t27 += v * b13;
  t28 += v * b14;
  t29 += v * b15;
  v = a[15];
  t15 += v * b0;
  t16 += v * b1;
  t17 += v * b2;
  t18 += v * b3;
  t19 += v * b4;
  t20 += v * b5;
  t21 += v * b6;
  t22 += v * b7;
  t23 += v * b8;
  t24 += v * b9;
  t25 += v * b10;
  t26 += v * b11;
  t27 += v * b12;
  t28 += v * b13;
  t29 += v * b14;
  t30 += v * b15;

  t0  += 38 * t16;
  t1  += 38 * t17;
  t2  += 38 * t18;
  t3  += 38 * t19;
  t4  += 38 * t20;
  t5  += 38 * t21;
  t6  += 38 * t22;
  t7  += 38 * t23;
  t8  += 38 * t24;
  t9  += 38 * t25;
  t10 += 38 * t26;
  t11 += 38 * t27;
  t12 += 38 * t28;
  t13 += 38 * t29;
  t14 += 38 * t30;
  // t15 left as is

  // first car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  // second car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  o[ 0] = t0;
  o[ 1] = t1;
  o[ 2] = t2;
  o[ 3] = t3;
  o[ 4] = t4;
  o[ 5] = t5;
  o[ 6] = t6;
  o[ 7] = t7;
  o[ 8] = t8;
  o[ 9] = t9;
  o[10] = t10;
  o[11] = t11;
  o[12] = t12;
  o[13] = t13;
  o[14] = t14;
  o[15] = t15;
}

function S(o, a) {
  M(o, a, a);
}

function inv25519(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 253; a >= 0; a--) {
    S(c, c);
    if(a !== 2 && a !== 4) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function pow2523(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 250; a >= 0; a--) {
      S(c, c);
      if(a !== 1) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function crypto_scalarmult(q, n, p) {
  var z = new Uint8Array(32);
  var x = new Float64Array(80), r, i;
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf();
  for (i = 0; i < 31; i++) z[i] = n[i];
  z[31]=(n[31]&127)|64;
  z[0]&=248;
  unpack25519(x,p);
  for (i = 0; i < 16; i++) {
    b[i]=x[i];
    d[i]=a[i]=c[i]=0;
  }
  a[0]=d[0]=1;
  for (i=254; i>=0; --i) {
    r=(z[i>>>3]>>>(i&7))&1;
    sel25519(a,b,r);
    sel25519(c,d,r);
    A(e,a,c);
    Z(a,a,c);
    A(c,b,d);
    Z(b,b,d);
    S(d,e);
    S(f,a);
    M(a,c,a);
    M(c,b,e);
    A(e,a,c);
    Z(a,a,c);
    S(b,a);
    Z(c,d,f);
    M(a,c,_121665);
    A(a,a,d);
    M(c,c,a);
    M(a,d,f);
    M(d,b,x);
    S(b,e);
    sel25519(a,b,r);
    sel25519(c,d,r);
  }
  for (i = 0; i < 16; i++) {
    x[i+16]=a[i];
    x[i+32]=c[i];
    x[i+48]=b[i];
    x[i+64]=d[i];
  }
  var x32 = x.subarray(32);
  var x16 = x.subarray(16);
  inv25519(x32,x32);
  M(x16,x16,x32);
  pack25519(q,x16);
  return 0;
}

function crypto_scalarmult_base(q, n) {
  return crypto_scalarmult(q, n, _9);
}

function crypto_box_keypair(y, x) {
  randombytes(x, 32);
  return crypto_scalarmult_base(y, x);
}

function crypto_box_beforenm(k, y, x) {
  var s = new Uint8Array(32);
  crypto_scalarmult(s, x, y);
  return crypto_core_hsalsa20(k, _0, s, sigma);
}

var crypto_box_afternm = crypto_secretbox;
var crypto_box_open_afternm = crypto_secretbox_open;

function crypto_box(c, m, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_afternm(c, m, d, n, k);
}

function crypto_box_open(m, c, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_open_afternm(m, c, d, n, k);
}

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function crypto_hashblocks_hl(hh, hl, m, n) {
  var wh = new Int32Array(16), wl = new Int32Array(16),
      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
      th, tl, i, j, h, l, a, b, c, d;

  var ah0 = hh[0],
      ah1 = hh[1],
      ah2 = hh[2],
      ah3 = hh[3],
      ah4 = hh[4],
      ah5 = hh[5],
      ah6 = hh[6],
      ah7 = hh[7],

      al0 = hl[0],
      al1 = hl[1],
      al2 = hl[2],
      al3 = hl[3],
      al4 = hl[4],
      al5 = hl[5],
      al6 = hl[6],
      al7 = hl[7];

  var pos = 0;
  while (n >= 128) {
    for (i = 0; i < 16; i++) {
      j = 8 * i + pos;
      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
    }
    for (i = 0; i < 80; i++) {
      bh0 = ah0;
      bh1 = ah1;
      bh2 = ah2;
      bh3 = ah3;
      bh4 = ah4;
      bh5 = ah5;
      bh6 = ah6;
      bh7 = ah7;

      bl0 = al0;
      bl1 = al1;
      bl2 = al2;
      bl3 = al3;
      bl4 = al4;
      bl5 = al5;
      bl6 = al6;
      bl7 = al7;

      // add
      h = ah7;
      l = al7;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma1
      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Ch
      h = (ah4 & ah5) ^ (~ah4 & ah6);
      l = (al4 & al5) ^ (~al4 & al6);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // K
      h = K[i*2];
      l = K[i*2+1];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // w
      h = wh[i%16];
      l = wl[i%16];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      th = c & 0xffff | d << 16;
      tl = a & 0xffff | b << 16;

      // add
      h = th;
      l = tl;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma0
      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Maj
      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh7 = (c & 0xffff) | (d << 16);
      bl7 = (a & 0xffff) | (b << 16);

      // add
      h = bh3;
      l = bl3;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = th;
      l = tl;

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh3 = (c & 0xffff) | (d << 16);
      bl3 = (a & 0xffff) | (b << 16);

      ah1 = bh0;
      ah2 = bh1;
      ah3 = bh2;
      ah4 = bh3;
      ah5 = bh4;
      ah6 = bh5;
      ah7 = bh6;
      ah0 = bh7;

      al1 = bl0;
      al2 = bl1;
      al3 = bl2;
      al4 = bl3;
      al5 = bl4;
      al6 = bl5;
      al7 = bl6;
      al0 = bl7;

      if (i%16 === 15) {
        for (j = 0; j < 16; j++) {
          // add
          h = wh[j];
          l = wl[j];

          a = l & 0xffff; b = l >>> 16;
          c = h & 0xffff; d = h >>> 16;

          h = wh[(j+9)%16];
          l = wl[(j+9)%16];

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma0
          th = wh[(j+1)%16];
          tl = wl[(j+1)%16];
          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma1
          th = wh[(j+14)%16];
          tl = wl[(j+14)%16];
          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;

          wh[j] = (c & 0xffff) | (d << 16);
          wl[j] = (a & 0xffff) | (b << 16);
        }
      }
    }

    // add
    h = ah0;
    l = al0;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[0];
    l = hl[0];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[0] = ah0 = (c & 0xffff) | (d << 16);
    hl[0] = al0 = (a & 0xffff) | (b << 16);

    h = ah1;
    l = al1;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[1];
    l = hl[1];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[1] = ah1 = (c & 0xffff) | (d << 16);
    hl[1] = al1 = (a & 0xffff) | (b << 16);

    h = ah2;
    l = al2;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[2];
    l = hl[2];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[2] = ah2 = (c & 0xffff) | (d << 16);
    hl[2] = al2 = (a & 0xffff) | (b << 16);

    h = ah3;
    l = al3;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[3];
    l = hl[3];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[3] = ah3 = (c & 0xffff) | (d << 16);
    hl[3] = al3 = (a & 0xffff) | (b << 16);

    h = ah4;
    l = al4;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[4];
    l = hl[4];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[4] = ah4 = (c & 0xffff) | (d << 16);
    hl[4] = al4 = (a & 0xffff) | (b << 16);

    h = ah5;
    l = al5;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[5];
    l = hl[5];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[5] = ah5 = (c & 0xffff) | (d << 16);
    hl[5] = al5 = (a & 0xffff) | (b << 16);

    h = ah6;
    l = al6;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[6];
    l = hl[6];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[6] = ah6 = (c & 0xffff) | (d << 16);
    hl[6] = al6 = (a & 0xffff) | (b << 16);

    h = ah7;
    l = al7;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[7];
    l = hl[7];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[7] = ah7 = (c & 0xffff) | (d << 16);
    hl[7] = al7 = (a & 0xffff) | (b << 16);

    pos += 128;
    n -= 128;
  }

  return n;
}

function crypto_hash(out, m, n) {
  var hh = new Int32Array(8),
      hl = new Int32Array(8),
      x = new Uint8Array(256),
      i, b = n;

  hh[0] = 0x6a09e667;
  hh[1] = 0xbb67ae85;
  hh[2] = 0x3c6ef372;
  hh[3] = 0xa54ff53a;
  hh[4] = 0x510e527f;
  hh[5] = 0x9b05688c;
  hh[6] = 0x1f83d9ab;
  hh[7] = 0x5be0cd19;

  hl[0] = 0xf3bcc908;
  hl[1] = 0x84caa73b;
  hl[2] = 0xfe94f82b;
  hl[3] = 0x5f1d36f1;
  hl[4] = 0xade682d1;
  hl[5] = 0x2b3e6c1f;
  hl[6] = 0xfb41bd6b;
  hl[7] = 0x137e2179;

  crypto_hashblocks_hl(hh, hl, m, n);
  n %= 128;

  for (i = 0; i < n; i++) x[i] = m[b-n+i];
  x[n] = 128;

  n = 256-128*(n<112?1:0);
  x[n-9] = 0;
  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
  crypto_hashblocks_hl(hh, hl, x, n);

  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

  return 0;
}

function add(p, q) {
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf(),
      g = gf(), h = gf(), t = gf();

  Z(a, p[1], p[0]);
  Z(t, q[1], q[0]);
  M(a, a, t);
  A(b, p[0], p[1]);
  A(t, q[0], q[1]);
  M(b, b, t);
  M(c, p[3], q[3]);
  M(c, c, D2);
  M(d, p[2], q[2]);
  A(d, d, d);
  Z(e, b, a);
  Z(f, d, c);
  A(g, d, c);
  A(h, b, a);

  M(p[0], e, f);
  M(p[1], h, g);
  M(p[2], g, f);
  M(p[3], e, h);
}

function cswap(p, q, b) {
  var i;
  for (i = 0; i < 4; i++) {
    sel25519(p[i], q[i], b);
  }
}

function pack(r, p) {
  var tx = gf(), ty = gf(), zi = gf();
  inv25519(zi, p[2]);
  M(tx, p[0], zi);
  M(ty, p[1], zi);
  pack25519(r, ty);
  r[31] ^= par25519(tx) << 7;
}

function scalarmult(p, q, s) {
  var b, i;
  set25519(p[0], gf0);
  set25519(p[1], gf1);
  set25519(p[2], gf1);
  set25519(p[3], gf0);
  for (i = 255; i >= 0; --i) {
    b = (s[(i/8)|0] >> (i&7)) & 1;
    cswap(p, q, b);
    add(q, p);
    add(p, p);
    cswap(p, q, b);
  }
}

function scalarbase(p, s) {
  var q = [gf(), gf(), gf(), gf()];
  set25519(q[0], X);
  set25519(q[1], Y);
  set25519(q[2], gf1);
  M(q[3], X, Y);
  scalarmult(p, q, s);
}

function crypto_sign_keypair(pk, sk, seeded) {
  var d = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()];
  var i;

  if (!seeded) randombytes(sk, 32);
  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);

  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
  return 0;
}

var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

function modL(r, x) {
  var carry, i, j, k;
  for (i = 63; i >= 32; --i) {
    carry = 0;
    for (j = i - 32, k = i - 12; j < k; ++j) {
      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
      carry = Math.floor((x[j] + 128) / 256);
      x[j] -= carry * 256;
    }
    x[j] += carry;
    x[i] = 0;
  }
  carry = 0;
  for (j = 0; j < 32; j++) {
    x[j] += carry - (x[31] >> 4) * L[j];
    carry = x[j] >> 8;
    x[j] &= 255;
  }
  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
  for (i = 0; i < 32; i++) {
    x[i+1] += x[i] >> 8;
    r[i] = x[i] & 255;
  }
}

function reduce(r) {
  var x = new Float64Array(64), i;
  for (i = 0; i < 64; i++) x[i] = r[i];
  for (i = 0; i < 64; i++) r[i] = 0;
  modL(r, x);
}

// Note: difference from C - smlen returned, not passed as argument.
function crypto_sign(sm, m, n, sk) {
  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
  var i, j, x = new Float64Array(64);
  var p = [gf(), gf(), gf(), gf()];

  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  var smlen = n + 64;
  for (i = 0; i < n; i++) sm[64 + i] = m[i];
  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

  crypto_hash(r, sm.subarray(32), n+32);
  reduce(r);
  scalarbase(p, r);
  pack(sm, p);

  for (i = 32; i < 64; i++) sm[i] = sk[i];
  crypto_hash(h, sm, n + 64);
  reduce(h);

  for (i = 0; i < 64; i++) x[i] = 0;
  for (i = 0; i < 32; i++) x[i] = r[i];
  for (i = 0; i < 32; i++) {
    for (j = 0; j < 32; j++) {
      x[i+j] += h[i] * d[j];
    }
  }

  modL(sm.subarray(32), x);
  return smlen;
}

function unpackneg(r, p) {
  var t = gf(), chk = gf(), num = gf(),
      den = gf(), den2 = gf(), den4 = gf(),
      den6 = gf();

  set25519(r[2], gf1);
  unpack25519(r[1], p);
  S(num, r[1]);
  M(den, num, D);
  Z(num, num, r[2]);
  A(den, r[2], den);

  S(den2, den);
  S(den4, den2);
  M(den6, den4, den2);
  M(t, den6, num);
  M(t, t, den);

  pow2523(t, t);
  M(t, t, num);
  M(t, t, den);
  M(t, t, den);
  M(r[0], t, den);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) M(r[0], r[0], I);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) return -1;

  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

  M(r[3], r[0], r[1]);
  return 0;
}

function crypto_sign_open(m, sm, n, pk) {
  var i;
  var t = new Uint8Array(32), h = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()],
      q = [gf(), gf(), gf(), gf()];

  if (n < 64) return -1;

  if (unpackneg(q, pk)) return -1;

  for (i = 0; i < n; i++) m[i] = sm[i];
  for (i = 0; i < 32; i++) m[i+32] = pk[i];
  crypto_hash(h, m, n);
  reduce(h);
  scalarmult(p, q, h);

  scalarbase(q, sm.subarray(32));
  add(p, q);
  pack(t, p);

  n -= 64;
  if (crypto_verify_32(sm, 0, t, 0)) {
    for (i = 0; i < n; i++) m[i] = 0;
    return -1;
  }

  for (i = 0; i < n; i++) m[i] = sm[i + 64];
  return n;
}

var crypto_secretbox_KEYBYTES = 32,
    crypto_secretbox_NONCEBYTES = 24,
    crypto_secretbox_ZEROBYTES = 32,
    crypto_secretbox_BOXZEROBYTES = 16,
    crypto_scalarmult_BYTES = 32,
    crypto_scalarmult_SCALARBYTES = 32,
    crypto_box_PUBLICKEYBYTES = 32,
    crypto_box_SECRETKEYBYTES = 32,
    crypto_box_BEFORENMBYTES = 32,
    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
    crypto_sign_BYTES = 64,
    crypto_sign_PUBLICKEYBYTES = 32,
    crypto_sign_SECRETKEYBYTES = 64,
    crypto_sign_SEEDBYTES = 32,
    crypto_hash_BYTES = 64;

nacl.lowlevel = {
  crypto_core_hsalsa20: crypto_core_hsalsa20,
  crypto_stream_xor: crypto_stream_xor,
  crypto_stream: crypto_stream,
  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
  crypto_stream_salsa20: crypto_stream_salsa20,
  crypto_onetimeauth: crypto_onetimeauth,
  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
  crypto_verify_16: crypto_verify_16,
  crypto_verify_32: crypto_verify_32,
  crypto_secretbox: crypto_secretbox,
  crypto_secretbox_open: crypto_secretbox_open,
  crypto_scalarmult: crypto_scalarmult,
  crypto_scalarmult_base: crypto_scalarmult_base,
  crypto_box_beforenm: crypto_box_beforenm,
  crypto_box_afternm: crypto_box_afternm,
  crypto_box: crypto_box,
  crypto_box_open: crypto_box_open,
  crypto_box_keypair: crypto_box_keypair,
  crypto_hash: crypto_hash,
  crypto_sign: crypto_sign,
  crypto_sign_keypair: crypto_sign_keypair,
  crypto_sign_open: crypto_sign_open,

  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
  crypto_sign_BYTES: crypto_sign_BYTES,
  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
  crypto_hash_BYTES: crypto_hash_BYTES,

  gf: gf,
  D: D,
  L: L,
  pack25519: pack25519,
  unpack25519: unpack25519,
  M: M,
  A: A,
  S: S,
  Z: Z,
  pow2523: pow2523,
  add: add,
  set25519: set25519,
  modL: modL,
  scalarmult: scalarmult,
  scalarbase: scalarbase,
};

/* High-level API */

function checkLengths(k, n) {
  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
}

function checkBoxLengths(pk, sk) {
  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
}

function checkArrayTypes() {
  for (var i = 0; i < arguments.length; i++) {
    if (!(arguments[i] instanceof Uint8Array))
      throw new TypeError('unexpected type, use Uint8Array');
  }
}

function cleanup(arr) {
  for (var i = 0; i < arr.length; i++) arr[i] = 0;
}

nacl.randomBytes = function(n) {
  var b = new Uint8Array(n);
  randombytes(b, n);
  return b;
};

nacl.secretbox = function(msg, nonce, key) {
  checkArrayTypes(msg, nonce, key);
  checkLengths(key, nonce);
  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
  var c = new Uint8Array(m.length);
  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
  crypto_secretbox(c, m, m.length, nonce, key);
  return c.subarray(crypto_secretbox_BOXZEROBYTES);
};

nacl.secretbox.open = function(box, nonce, key) {
  checkArrayTypes(box, nonce, key);
  checkLengths(key, nonce);
  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
  var m = new Uint8Array(c.length);
  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
  if (c.length < 32) return null;
  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
  return m.subarray(crypto_secretbox_ZEROBYTES);
};

nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

nacl.scalarMult = function(n, p) {
  checkArrayTypes(n, p);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult(q, n, p);
  return q;
};

nacl.scalarMult.base = function(n) {
  checkArrayTypes(n);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult_base(q, n);
  return q;
};

nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

nacl.box = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox(msg, nonce, k);
};

nacl.box.before = function(publicKey, secretKey) {
  checkArrayTypes(publicKey, secretKey);
  checkBoxLengths(publicKey, secretKey);
  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
  crypto_box_beforenm(k, publicKey, secretKey);
  return k;
};

nacl.box.after = nacl.secretbox;

nacl.box.open = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox.open(msg, nonce, k);
};

nacl.box.open.after = nacl.secretbox.open;

nacl.box.keyPair = function() {
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  crypto_box_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.box.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  crypto_scalarmult_base(pk, secretKey);
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
nacl.box.nonceLength = crypto_box_NONCEBYTES;
nacl.box.overheadLength = nacl.secretbox.overheadLength;

nacl.sign = function(msg, secretKey) {
  checkArrayTypes(msg, secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
  crypto_sign(signedMsg, msg, msg.length, secretKey);
  return signedMsg;
};

nacl.sign.open = function(signedMsg, publicKey) {
  checkArrayTypes(signedMsg, publicKey);
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var tmp = new Uint8Array(signedMsg.length);
  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
  if (mlen < 0) return null;
  var m = new Uint8Array(mlen);
  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
  return m;
};

nacl.sign.detached = function(msg, secretKey) {
  var signedMsg = nacl.sign(msg, secretKey);
  var sig = new Uint8Array(crypto_sign_BYTES);
  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  return sig;
};

nacl.sign.detached.verify = function(msg, sig, publicKey) {
  checkArrayTypes(msg, sig, publicKey);
  if (sig.length !== crypto_sign_BYTES)
    throw new Error('bad signature size');
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
  var i;
  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
};

nacl.sign.keyPair = function() {
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  crypto_sign_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.sign.keyPair.fromSeed = function(seed) {
  checkArrayTypes(seed);
  if (seed.length !== crypto_sign_SEEDBYTES)
    throw new Error('bad seed size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  for (var i = 0; i < 32; i++) sk[i] = seed[i];
  crypto_sign_keypair(pk, sk, true);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
nacl.sign.seedLength = crypto_sign_SEEDBYTES;
nacl.sign.signatureLength = crypto_sign_BYTES;

nacl.hash = function(msg) {
  checkArrayTypes(msg);
  var h = new Uint8Array(crypto_hash_BYTES);
  crypto_hash(h, msg, msg.length);
  return h;
};

nacl.hash.hashLength = crypto_hash_BYTES;

nacl.verify = function(x, y) {
  checkArrayTypes(x, y);
  // Zero length arguments are considered not equal.
  if (x.length === 0 || y.length === 0) return false;
  if (x.length !== y.length) return false;
  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
};

nacl.setPRNG = function(fn) {
  randombytes = fn;
};

(function() {
  // Initialize PRNG if environment provides CSPRNG.
  // If not, methods calling randombytes will throw.
  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
  if (crypto && crypto.getRandomValues) {
    // Browsers.
    var QUOTA = 65536;
    nacl.setPRNG(function(x, n) {
      var i, v = new Uint8Array(n);
      for (i = 0; i < n; i += QUOTA) {
        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
      }
      for (i = 0; i < n; i++) x[i] = v[i];
      cleanup(v);
    });
  } else if (true) {
    // Node.js.
    crypto = __webpack_require__(28);
    if (crypto && crypto.randomBytes) {
      nacl.setPRNG(function(x, n) {
        var i, v = crypto.randomBytes(n);
        for (i = 0; i < n; i++) x[i] = v[i];
        cleanup(v);
      });
    }
  }
})();

})( true && module.exports ? module.exports : (self.nacl = self.nacl || {}));


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * [js-sha512]{@link https://github.com/emn178/js-sha512}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2018
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var INPUT_ERROR = 'input is invalid type';
  var FINALIZE_ERROR = 'finalize already called';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA512_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA512_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA512_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(18);
  var ARRAY_BUFFER = !root.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [
    0x428A2F98, 0xD728AE22, 0x71374491, 0x23EF65CD,
    0xB5C0FBCF, 0xEC4D3B2F, 0xE9B5DBA5, 0x8189DBBC,
    0x3956C25B, 0xF348B538, 0x59F111F1, 0xB605D019,
    0x923F82A4, 0xAF194F9B, 0xAB1C5ED5, 0xDA6D8118,
    0xD807AA98, 0xA3030242, 0x12835B01, 0x45706FBE,
    0x243185BE, 0x4EE4B28C, 0x550C7DC3, 0xD5FFB4E2,
    0x72BE5D74, 0xF27B896F, 0x80DEB1FE, 0x3B1696B1,
    0x9BDC06A7, 0x25C71235, 0xC19BF174, 0xCF692694,
    0xE49B69C1, 0x9EF14AD2, 0xEFBE4786, 0x384F25E3,
    0x0FC19DC6, 0x8B8CD5B5, 0x240CA1CC, 0x77AC9C65,
    0x2DE92C6F, 0x592B0275, 0x4A7484AA, 0x6EA6E483,
    0x5CB0A9DC, 0xBD41FBD4, 0x76F988DA, 0x831153B5,
    0x983E5152, 0xEE66DFAB, 0xA831C66D, 0x2DB43210,
    0xB00327C8, 0x98FB213F, 0xBF597FC7, 0xBEEF0EE4,
    0xC6E00BF3, 0x3DA88FC2, 0xD5A79147, 0x930AA725,
    0x06CA6351, 0xE003826F, 0x14292967, 0x0A0E6E70,
    0x27B70A85, 0x46D22FFC, 0x2E1B2138, 0x5C26C926,
    0x4D2C6DFC, 0x5AC42AED, 0x53380D13, 0x9D95B3DF,
    0x650A7354, 0x8BAF63DE, 0x766A0ABB, 0x3C77B2A8,
    0x81C2C92E, 0x47EDAEE6, 0x92722C85, 0x1482353B,
    0xA2BFE8A1, 0x4CF10364, 0xA81A664B, 0xBC423001,
    0xC24B8B70, 0xD0F89791, 0xC76C51A3, 0x0654BE30,
    0xD192E819, 0xD6EF5218, 0xD6990624, 0x5565A910,
    0xF40E3585, 0x5771202A, 0x106AA070, 0x32BBD1B8,
    0x19A4C116, 0xB8D2D0C8, 0x1E376C08, 0x5141AB53,
    0x2748774C, 0xDF8EEB99, 0x34B0BCB5, 0xE19B48A8,
    0x391C0CB3, 0xC5C95A63, 0x4ED8AA4A, 0xE3418ACB,
    0x5B9CCA4F, 0x7763E373, 0x682E6FF3, 0xD6B2B8A3,
    0x748F82EE, 0x5DEFB2FC, 0x78A5636F, 0x43172F60,
    0x84C87814, 0xA1F0AB72, 0x8CC70208, 0x1A6439EC,
    0x90BEFFFA, 0x23631E28, 0xA4506CEB, 0xDE82BDE9,
    0xBEF9A3F7, 0xB2C67915, 0xC67178F2, 0xE372532B,
    0xCA273ECE, 0xEA26619C, 0xD186B8C7, 0x21C0C207,
    0xEADA7DD6, 0xCDE0EB1E, 0xF57D4F7F, 0xEE6ED178,
    0x06F067AA, 0x72176FBA, 0x0A637DC5, 0xA2C898A6,
    0x113F9804, 0xBEF90DAE, 0x1B710B35, 0x131C471B,
    0x28DB77F5, 0x23047D84, 0x32CAAB7B, 0x40C72493,
    0x3C9EBE0A, 0x15C9BEBC, 0x431D67C4, 0x9C100D4C,
    0x4CC5D4BE, 0xCB3E42B6, 0x597F299C, 0xFC657E2A,
    0x5FCB6FAB, 0x3AD6FAEC, 0x6C44198C, 0x4A475817
  ];

  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  if (root.JS_SHA512_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (outputType, bits) {
    return function (message) {
      return new Sha512(bits, true).update(message)[outputType]();
    };
  };

  var createMethod = function (bits) {
    var method = createOutputMethod('hex', bits);
    method.create = function () {
      return new Sha512(bits);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, bits);
    }
    return method;
  };

  var createHmacOutputMethod = function (outputType, bits) {
    return function (key, message) {
      return new HmacSha512(key, bits, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function (bits) {
    var method = createHmacOutputMethod('hex', bits);
    method.create = function (key) {
      return new HmacSha512(key, bits);
    };
    method.update = function (key, message) {
      return method.create(key).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, bits);
    }
    return method;
  };

  function Sha512(bits, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[1] = blocks[2] = blocks[3] = blocks[4] =
      blocks[5] = blocks[6] = blocks[7] = blocks[8] =
      blocks[9] = blocks[10] = blocks[11] = blocks[12] =
      blocks[13] = blocks[14] = blocks[15] = blocks[16] =
      blocks[17] = blocks[18] = blocks[19] = blocks[20] =
      blocks[21] = blocks[22] = blocks[23] = blocks[24] =
      blocks[25] = blocks[26] = blocks[27] = blocks[28] =
      blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (bits == 384) {
      this.h0h = 0xCBBB9D5D;
      this.h0l = 0xC1059ED8;
      this.h1h = 0x629A292A;
      this.h1l = 0x367CD507;
      this.h2h = 0x9159015A;
      this.h2l = 0x3070DD17;
      this.h3h = 0x152FECD8;
      this.h3l = 0xF70E5939;
      this.h4h = 0x67332667;
      this.h4l = 0xFFC00B31;
      this.h5h = 0x8EB44A87;
      this.h5l = 0x68581511;
      this.h6h = 0xDB0C2E0D;
      this.h6l = 0x64F98FA7;
      this.h7h = 0x47B5481D;
      this.h7l = 0xBEFA4FA4;
    } else if (bits == 256) {
      this.h0h = 0x22312194;
      this.h0l = 0xFC2BF72C;
      this.h1h = 0x9F555FA3;
      this.h1l = 0xC84C64C2;
      this.h2h = 0x2393B86B;
      this.h2l = 0x6F53B151;
      this.h3h = 0x96387719;
      this.h3l = 0x5940EABD;
      this.h4h = 0x96283EE2;
      this.h4l = 0xA88EFFE3;
      this.h5h = 0xBE5E1E25;
      this.h5l = 0x53863992;
      this.h6h = 0x2B0199FC;
      this.h6l = 0x2C85B8AA;
      this.h7h = 0x0EB72DDC;
      this.h7l = 0x81C52CA2;
    } else if (bits == 224) {
      this.h0h = 0x8C3D37C8;
      this.h0l = 0x19544DA2;
      this.h1h = 0x73E19966;
      this.h1l = 0x89DCD4D6;
      this.h2h = 0x1DFAB7AE;
      this.h2l = 0x32FF9C82;
      this.h3h = 0x679DD514;
      this.h3l = 0x582F9FCF;
      this.h4h = 0x0F6D2B69;
      this.h4l = 0x7BD44DA8;
      this.h5h = 0x77E36F73;
      this.h5l = 0x04C48942;
      this.h6h = 0x3F9D85A8;
      this.h6l = 0x6A1D36C8;
      this.h7h = 0x1112E6AD;
      this.h7l = 0x91D692A1;
    } else { // 512
      this.h0h = 0x6A09E667;
      this.h0l = 0xF3BCC908;
      this.h1h = 0xBB67AE85;
      this.h1l = 0x84CAA73B;
      this.h2h = 0x3C6EF372;
      this.h2l = 0xFE94F82B;
      this.h3h = 0xA54FF53A;
      this.h3l = 0x5F1D36F1;
      this.h4h = 0x510E527F;
      this.h4l = 0xADE682D1;
      this.h5h = 0x9B05688C;
      this.h5l = 0x2B3E6C1F;
      this.h6h = 0x1F83D9AB;
      this.h6l = 0xFB41BD6B;
      this.h7h = 0x5BE0CD19;
      this.h7l = 0x137E2179;
    }
    this.bits = bits;

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
  }

  Sha512.prototype.update = function (message) {
    if (this.finalized) {
      throw new Error(FINALIZE_ERROR);
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[1] = blocks[2] = blocks[3] = blocks[4] =
        blocks[5] = blocks[6] = blocks[7] = blocks[8] =
        blocks[9] = blocks[10] = blocks[11] = blocks[12] =
        blocks[13] = blocks[14] = blocks[15] = blocks[16] =
        blocks[17] = blocks[18] = blocks[19] = blocks[20] =
        blocks[21] = blocks[22] = blocks[23] = blocks[24] =
        blocks[25] = blocks[26] = blocks[27] = blocks[28] =
        blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
      }

      if(notString) {
        for (i = this.start; index < length && i < 128; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 128; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 128) {
        this.block = blocks[32];
        this.start = i - 128;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha512.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[32] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[32];
    if (i >= 112) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[1] = blocks[2] = blocks[3] = blocks[4] =
      blocks[5] = blocks[6] = blocks[7] = blocks[8] =
      blocks[9] = blocks[10] = blocks[11] = blocks[12] =
      blocks[13] = blocks[14] = blocks[15] = blocks[16] =
      blocks[17] = blocks[18] = blocks[19] = blocks[20] =
      blocks[21] = blocks[22] = blocks[23] = blocks[24] =
      blocks[25] = blocks[26] = blocks[27] = blocks[28] =
      blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
    }
    blocks[30] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[31] = this.bytes << 3;
    this.hash();
  };

  Sha512.prototype.hash = function () {
    var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l,
      h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l,
      h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l,
      h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l,
      blocks = this.blocks, j, s0h, s0l, s1h, s1l, c1, c2, c3, c4,
      abh, abl, dah, dal, cdh, cdl, bch, bcl,
      majh, majl, t1h, t1l, t2h, t2l, chh, chl;

    for (j = 32; j < 160; j += 2) {
      t1h = blocks[j - 30];
      t1l = blocks[j - 29];
      s0h = ((t1h >>> 1) | (t1l << 31)) ^ ((t1h >>> 8) | (t1l << 24)) ^ (t1h >>> 7);
      s0l = ((t1l >>> 1) | (t1h << 31)) ^ ((t1l >>> 8) | (t1h << 24)) ^ ((t1l >>> 7) | t1h << 25);

      t1h = blocks[j - 4];
      t1l = blocks[j - 3];
      s1h = ((t1h >>> 19) | (t1l << 13)) ^ ((t1l >>> 29) | (t1h << 3)) ^ (t1h >>> 6);
      s1l = ((t1l >>> 19) | (t1h << 13)) ^ ((t1h >>> 29) | (t1l << 3)) ^ ((t1l >>> 6) | t1h << 26);

      t1h = blocks[j - 32];
      t1l = blocks[j - 31];
      t2h = blocks[j - 14];
      t2l = blocks[j - 13];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (s0l & 0xFFFF) + (s1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (s0h & 0xFFFF) + (s1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);

      blocks[j] = (c4 << 16) | (c3 & 0xFFFF);
      blocks[j + 1] = (c2 << 16) | (c1 & 0xFFFF);
    }

    var ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
    bch = bh & ch;
    bcl = bl & cl;
    for (j = 0; j < 160; j += 8) {
      s0h = ((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25));
      s0l = ((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25));

      s1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23));
      s1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23));

      abh = ah & bh;
      abl = al & bl;
      majh = abh ^ (ah & ch) ^ bch;
      majl = abl ^ (al & cl) ^ bcl;

      chh = (eh & fh) ^ (~eh & gh);
      chl = (el & fl) ^ (~el & gl);

      t1h = blocks[j];
      t1l = blocks[j + 1];
      t2h = K[j];
      t2l = K[j + 1];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (hl & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (dl & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (dh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      hh = (c4 << 16) | (c3 & 0xFFFF);
      hl = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      dh = (c4 << 16) | (c3 & 0xFFFF);
      dl = (c2 << 16) | (c1 & 0xFFFF);

      s0h = ((dh >>> 28) | (dl << 4)) ^ ((dl >>> 2) | (dh << 30)) ^ ((dl >>> 7) | (dh << 25));
      s0l = ((dl >>> 28) | (dh << 4)) ^ ((dh >>> 2) | (dl << 30)) ^ ((dh >>> 7) | (dl << 25));

      s1h = ((hh >>> 14) | (hl << 18)) ^ ((hh >>> 18) | (hl << 14)) ^ ((hl >>> 9) | (hh << 23));
      s1l = ((hl >>> 14) | (hh << 18)) ^ ((hl >>> 18) | (hh << 14)) ^ ((hh >>> 9) | (hl << 23));

      dah = dh & ah;
      dal = dl & al;
      majh = dah ^ (dh & bh) ^ abh;
      majl = dal ^ (dl & bl) ^ abl;

      chh = (hh & eh) ^ (~hh & fh);
      chl = (hl & el) ^ (~hl & fl);

      t1h = blocks[j + 2];
      t1l = blocks[j + 3];
      t2h = K[j + 2];
      t2l = K[j + 3];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (gl & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (cl & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (ch & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      gh = (c4 << 16) | (c3 & 0xFFFF);
      gl = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      ch = (c4 << 16) | (c3 & 0xFFFF);
      cl = (c2 << 16) | (c1 & 0xFFFF);

      s0h = ((ch >>> 28) | (cl << 4)) ^ ((cl >>> 2) | (ch << 30)) ^ ((cl >>> 7) | (ch << 25));
      s0l = ((cl >>> 28) | (ch << 4)) ^ ((ch >>> 2) | (cl << 30)) ^ ((ch >>> 7) | (cl << 25));

      s1h = ((gh >>> 14) | (gl << 18)) ^ ((gh >>> 18) | (gl << 14)) ^ ((gl >>> 9) | (gh << 23));
      s1l = ((gl >>> 14) | (gh << 18)) ^ ((gl >>> 18) | (gh << 14)) ^ ((gh >>> 9) | (gl << 23));

      cdh = ch & dh;
      cdl = cl & dl;
      majh = cdh ^ (ch & ah) ^ dah;
      majl = cdl ^ (cl & al) ^ dal;

      chh = (gh & hh) ^ (~gh & eh);
      chl = (gl & hl) ^ (~gl & el);

      t1h = blocks[j + 4];
      t1l = blocks[j + 5];
      t2h = K[j + 4];
      t2l = K[j + 5];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (fl & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (bl & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (bh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      fh = (c4 << 16) | (c3 & 0xFFFF);
      fl = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      bh = (c4 << 16) | (c3 & 0xFFFF);
      bl = (c2 << 16) | (c1 & 0xFFFF);

      s0h = ((bh >>> 28) | (bl << 4)) ^ ((bl >>> 2) | (bh << 30)) ^ ((bl >>> 7) | (bh << 25));
      s0l = ((bl >>> 28) | (bh << 4)) ^ ((bh >>> 2) | (bl << 30)) ^ ((bh >>> 7) | (bl << 25));

      s1h = ((fh >>> 14) | (fl << 18)) ^ ((fh >>> 18) | (fl << 14)) ^ ((fl >>> 9) | (fh << 23));
      s1l = ((fl >>> 14) | (fh << 18)) ^ ((fl >>> 18) | (fh << 14)) ^ ((fh >>> 9) | (fl << 23));

      bch = bh & ch;
      bcl = bl & cl;
      majh = bch ^ (bh & dh) ^ cdh;
      majl = bcl ^ (bl & dl) ^ cdl;

      chh = (fh & gh) ^ (~fh & hh);
      chl = (fl & gl) ^ (~fl & hl);

      t1h = blocks[j + 6];
      t1l = blocks[j + 7];
      t2h = K[j + 6];
      t2l = K[j + 7];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (el & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (al & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (ah & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      eh = (c4 << 16) | (c3 & 0xFFFF);
      el = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      ah = (c4 << 16) | (c3 & 0xFFFF);
      al = (c2 << 16) | (c1 & 0xFFFF);
    }

    c1 = (h0l & 0xFFFF) + (al & 0xFFFF);
    c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
    c3 = (h0h & 0xFFFF) + (ah & 0xFFFF) + (c2 >>> 16);
    c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);

    this.h0h = (c4 << 16) | (c3 & 0xFFFF);
    this.h0l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h1l & 0xFFFF) + (bl & 0xFFFF);
    c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
    c3 = (h1h & 0xFFFF) + (bh & 0xFFFF) + (c2 >>> 16);
    c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);

    this.h1h = (c4 << 16) | (c3 & 0xFFFF);
    this.h1l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h2l & 0xFFFF) + (cl & 0xFFFF);
    c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
    c3 = (h2h & 0xFFFF) + (ch & 0xFFFF) + (c2 >>> 16);
    c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);

    this.h2h = (c4 << 16) | (c3 & 0xFFFF);
    this.h2l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h3l & 0xFFFF) + (dl & 0xFFFF);
    c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
    c3 = (h3h & 0xFFFF) + (dh & 0xFFFF) + (c2 >>> 16);
    c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);

    this.h3h = (c4 << 16) | (c3 & 0xFFFF);
    this.h3l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h4l & 0xFFFF) + (el & 0xFFFF);
    c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
    c3 = (h4h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
    c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);

    this.h4h = (c4 << 16) | (c3 & 0xFFFF);
    this.h4l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h5l & 0xFFFF) + (fl & 0xFFFF);
    c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
    c3 = (h5h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
    c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);

    this.h5h = (c4 << 16) | (c3 & 0xFFFF);
    this.h5l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h6l & 0xFFFF) + (gl & 0xFFFF);
    c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
    c3 = (h6h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
    c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);

    this.h6h = (c4 << 16) | (c3 & 0xFFFF);
    this.h6l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h7l & 0xFFFF) + (hl & 0xFFFF);
    c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
    c3 = (h7h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
    c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);

    this.h7h = (c4 << 16) | (c3 & 0xFFFF);
    this.h7l = (c2 << 16) | (c1 & 0xFFFF);
  };

  Sha512.prototype.hex = function () {
    this.finalize();

    var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l,
      h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l,
      h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l,
      h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l,
      bits = this.bits;

    var hex = HEX_CHARS[(h0h >> 28) & 0x0F] + HEX_CHARS[(h0h >> 24) & 0x0F] +
      HEX_CHARS[(h0h >> 20) & 0x0F] + HEX_CHARS[(h0h >> 16) & 0x0F] +
      HEX_CHARS[(h0h >> 12) & 0x0F] + HEX_CHARS[(h0h >> 8) & 0x0F] +
      HEX_CHARS[(h0h >> 4) & 0x0F] + HEX_CHARS[h0h & 0x0F] +
      HEX_CHARS[(h0l >> 28) & 0x0F] + HEX_CHARS[(h0l >> 24) & 0x0F] +
      HEX_CHARS[(h0l >> 20) & 0x0F] + HEX_CHARS[(h0l >> 16) & 0x0F] +
      HEX_CHARS[(h0l >> 12) & 0x0F] + HEX_CHARS[(h0l >> 8) & 0x0F] +
      HEX_CHARS[(h0l >> 4) & 0x0F] + HEX_CHARS[h0l & 0x0F] +
      HEX_CHARS[(h1h >> 28) & 0x0F] + HEX_CHARS[(h1h >> 24) & 0x0F] +
      HEX_CHARS[(h1h >> 20) & 0x0F] + HEX_CHARS[(h1h >> 16) & 0x0F] +
      HEX_CHARS[(h1h >> 12) & 0x0F] + HEX_CHARS[(h1h >> 8) & 0x0F] +
      HEX_CHARS[(h1h >> 4) & 0x0F] + HEX_CHARS[h1h & 0x0F] +
      HEX_CHARS[(h1l >> 28) & 0x0F] + HEX_CHARS[(h1l >> 24) & 0x0F] +
      HEX_CHARS[(h1l >> 20) & 0x0F] + HEX_CHARS[(h1l >> 16) & 0x0F] +
      HEX_CHARS[(h1l >> 12) & 0x0F] + HEX_CHARS[(h1l >> 8) & 0x0F] +
      HEX_CHARS[(h1l >> 4) & 0x0F] + HEX_CHARS[h1l & 0x0F] +
      HEX_CHARS[(h2h >> 28) & 0x0F] + HEX_CHARS[(h2h >> 24) & 0x0F] +
      HEX_CHARS[(h2h >> 20) & 0x0F] + HEX_CHARS[(h2h >> 16) & 0x0F] +
      HEX_CHARS[(h2h >> 12) & 0x0F] + HEX_CHARS[(h2h >> 8) & 0x0F] +
      HEX_CHARS[(h2h >> 4) & 0x0F] + HEX_CHARS[h2h & 0x0F] +
      HEX_CHARS[(h2l >> 28) & 0x0F] + HEX_CHARS[(h2l >> 24) & 0x0F] +
      HEX_CHARS[(h2l >> 20) & 0x0F] + HEX_CHARS[(h2l >> 16) & 0x0F] +
      HEX_CHARS[(h2l >> 12) & 0x0F] + HEX_CHARS[(h2l >> 8) & 0x0F] +
      HEX_CHARS[(h2l >> 4) & 0x0F] + HEX_CHARS[h2l & 0x0F] +
      HEX_CHARS[(h3h >> 28) & 0x0F] + HEX_CHARS[(h3h >> 24) & 0x0F] +
      HEX_CHARS[(h3h >> 20) & 0x0F] + HEX_CHARS[(h3h >> 16) & 0x0F] +
      HEX_CHARS[(h3h >> 12) & 0x0F] + HEX_CHARS[(h3h >> 8) & 0x0F] +
      HEX_CHARS[(h3h >> 4) & 0x0F] + HEX_CHARS[h3h & 0x0F];
    if (bits >= 256) {
      hex += HEX_CHARS[(h3l >> 28) & 0x0F] + HEX_CHARS[(h3l >> 24) & 0x0F] +
        HEX_CHARS[(h3l >> 20) & 0x0F] + HEX_CHARS[(h3l >> 16) & 0x0F] +
        HEX_CHARS[(h3l >> 12) & 0x0F] + HEX_CHARS[(h3l >> 8) & 0x0F] +
        HEX_CHARS[(h3l >> 4) & 0x0F] + HEX_CHARS[h3l & 0x0F];
    }
    if (bits >= 384) {
      hex += HEX_CHARS[(h4h >> 28) & 0x0F] + HEX_CHARS[(h4h >> 24) & 0x0F] +
        HEX_CHARS[(h4h >> 20) & 0x0F] + HEX_CHARS[(h4h >> 16) & 0x0F] +
        HEX_CHARS[(h4h >> 12) & 0x0F] + HEX_CHARS[(h4h >> 8) & 0x0F] +
        HEX_CHARS[(h4h >> 4) & 0x0F] + HEX_CHARS[h4h & 0x0F] +
        HEX_CHARS[(h4l >> 28) & 0x0F] + HEX_CHARS[(h4l >> 24) & 0x0F] +
        HEX_CHARS[(h4l >> 20) & 0x0F] + HEX_CHARS[(h4l >> 16) & 0x0F] +
        HEX_CHARS[(h4l >> 12) & 0x0F] + HEX_CHARS[(h4l >> 8) & 0x0F] +
        HEX_CHARS[(h4l >> 4) & 0x0F] + HEX_CHARS[h4l & 0x0F] +
        HEX_CHARS[(h5h >> 28) & 0x0F] + HEX_CHARS[(h5h >> 24) & 0x0F] +
        HEX_CHARS[(h5h >> 20) & 0x0F] + HEX_CHARS[(h5h >> 16) & 0x0F] +
        HEX_CHARS[(h5h >> 12) & 0x0F] + HEX_CHARS[(h5h >> 8) & 0x0F] +
        HEX_CHARS[(h5h >> 4) & 0x0F] + HEX_CHARS[h5h & 0x0F] +
        HEX_CHARS[(h5l >> 28) & 0x0F] + HEX_CHARS[(h5l >> 24) & 0x0F] +
        HEX_CHARS[(h5l >> 20) & 0x0F] + HEX_CHARS[(h5l >> 16) & 0x0F] +
        HEX_CHARS[(h5l >> 12) & 0x0F] + HEX_CHARS[(h5l >> 8) & 0x0F] +
        HEX_CHARS[(h5l >> 4) & 0x0F] + HEX_CHARS[h5l & 0x0F];
    }
    if (bits == 512) {
      hex += HEX_CHARS[(h6h >> 28) & 0x0F] + HEX_CHARS[(h6h >> 24) & 0x0F] +
        HEX_CHARS[(h6h >> 20) & 0x0F] + HEX_CHARS[(h6h >> 16) & 0x0F] +
        HEX_CHARS[(h6h >> 12) & 0x0F] + HEX_CHARS[(h6h >> 8) & 0x0F] +
        HEX_CHARS[(h6h >> 4) & 0x0F] + HEX_CHARS[h6h & 0x0F] +
        HEX_CHARS[(h6l >> 28) & 0x0F] + HEX_CHARS[(h6l >> 24) & 0x0F] +
        HEX_CHARS[(h6l >> 20) & 0x0F] + HEX_CHARS[(h6l >> 16) & 0x0F] +
        HEX_CHARS[(h6l >> 12) & 0x0F] + HEX_CHARS[(h6l >> 8) & 0x0F] +
        HEX_CHARS[(h6l >> 4) & 0x0F] + HEX_CHARS[h6l & 0x0F] +
        HEX_CHARS[(h7h >> 28) & 0x0F] + HEX_CHARS[(h7h >> 24) & 0x0F] +
        HEX_CHARS[(h7h >> 20) & 0x0F] + HEX_CHARS[(h7h >> 16) & 0x0F] +
        HEX_CHARS[(h7h >> 12) & 0x0F] + HEX_CHARS[(h7h >> 8) & 0x0F] +
        HEX_CHARS[(h7h >> 4) & 0x0F] + HEX_CHARS[h7h & 0x0F] +
        HEX_CHARS[(h7l >> 28) & 0x0F] + HEX_CHARS[(h7l >> 24) & 0x0F] +
        HEX_CHARS[(h7l >> 20) & 0x0F] + HEX_CHARS[(h7l >> 16) & 0x0F] +
        HEX_CHARS[(h7l >> 12) & 0x0F] + HEX_CHARS[(h7l >> 8) & 0x0F] +
        HEX_CHARS[(h7l >> 4) & 0x0F] + HEX_CHARS[h7l & 0x0F];
    }
    return hex;
  };

  Sha512.prototype.toString = Sha512.prototype.hex;

  Sha512.prototype.digest = function () {
    this.finalize();

    var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l,
      h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l,
      h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l,
      h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l,
      bits = this.bits;

    var arr = [
      (h0h >> 24) & 0xFF, (h0h >> 16) & 0xFF, (h0h >> 8) & 0xFF, h0h & 0xFF,
      (h0l >> 24) & 0xFF, (h0l >> 16) & 0xFF, (h0l >> 8) & 0xFF, h0l & 0xFF,
      (h1h >> 24) & 0xFF, (h1h >> 16) & 0xFF, (h1h >> 8) & 0xFF, h1h & 0xFF,
      (h1l >> 24) & 0xFF, (h1l >> 16) & 0xFF, (h1l >> 8) & 0xFF, h1l & 0xFF,
      (h2h >> 24) & 0xFF, (h2h >> 16) & 0xFF, (h2h >> 8) & 0xFF, h2h & 0xFF,
      (h2l >> 24) & 0xFF, (h2l >> 16) & 0xFF, (h2l >> 8) & 0xFF, h2l & 0xFF,
      (h3h >> 24) & 0xFF, (h3h >> 16) & 0xFF, (h3h >> 8) & 0xFF, h3h & 0xFF
    ];

    if (bits >= 256) {
      arr.push((h3l >> 24) & 0xFF, (h3l >> 16) & 0xFF, (h3l >> 8) & 0xFF, h3l & 0xFF);
    }
    if (bits >= 384) {
      arr.push(
        (h4h >> 24) & 0xFF, (h4h >> 16) & 0xFF, (h4h >> 8) & 0xFF, h4h & 0xFF,
        (h4l >> 24) & 0xFF, (h4l >> 16) & 0xFF, (h4l >> 8) & 0xFF, h4l & 0xFF,
        (h5h >> 24) & 0xFF, (h5h >> 16) & 0xFF, (h5h >> 8) & 0xFF, h5h & 0xFF,
        (h5l >> 24) & 0xFF, (h5l >> 16) & 0xFF, (h5l >> 8) & 0xFF, h5l & 0xFF
      );
    }
    if (bits == 512) {
      arr.push(
        (h6h >> 24) & 0xFF, (h6h >> 16) & 0xFF, (h6h >> 8) & 0xFF, h6h & 0xFF,
        (h6l >> 24) & 0xFF, (h6l >> 16) & 0xFF, (h6l >> 8) & 0xFF, h6l & 0xFF,
        (h7h >> 24) & 0xFF, (h7h >> 16) & 0xFF, (h7h >> 8) & 0xFF, h7h & 0xFF,
        (h7l >> 24) & 0xFF, (h7l >> 16) & 0xFF, (h7l >> 8) & 0xFF, h7l & 0xFF
      );
    }
    return arr;
  };

  Sha512.prototype.array = Sha512.prototype.digest;

  Sha512.prototype.arrayBuffer = function () {
    this.finalize();

    var bits = this.bits;
    var buffer = new ArrayBuffer(bits / 8);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0h);
    dataView.setUint32(4, this.h0l);
    dataView.setUint32(8, this.h1h);
    dataView.setUint32(12, this.h1l);
    dataView.setUint32(16, this.h2h);
    dataView.setUint32(20, this.h2l);
    dataView.setUint32(24, this.h3h);

    if (bits >= 256) {
      dataView.setUint32(28, this.h3l);
    }
    if (bits >= 384) {
      dataView.setUint32(32, this.h4h);
      dataView.setUint32(36, this.h4l);
      dataView.setUint32(40, this.h5h);
      dataView.setUint32(44, this.h5l);
    }
    if (bits == 512) {
      dataView.setUint32(48, this.h6h);
      dataView.setUint32(52, this.h6l);
      dataView.setUint32(56, this.h7h);
      dataView.setUint32(60, this.h7l);
    }
    return buffer;
  };

  Sha512.prototype.clone = function () {
    var hash = new Sha512(this.bits, false);
    this.copyTo(hash);
    return hash;
  };

  Sha512.prototype.copyTo = function (hash) {
    var i = 0, attrs = [
      'h0h', 'h0l', 'h1h', 'h1l', 'h2h', 'h2l', 'h3h', 'h3l', 'h4h', 'h4l', 'h5h', 'h5l', 'h6h', 'h6l', 'h7h', 'h7l',
      'start', 'bytes', 'hBytes', 'finalized', 'hashed', 'lastByteIndex'
    ];
    for (i = 0; i < attrs.length; ++i) {
      hash[attrs[i]] = this[attrs[i]];
    }
    for (i = 0; i < this.blocks.length; ++i) {
      hash.blocks[i] = this.blocks[i];
    }
  };

  function HmacSha512(key, bits, sharedMemory) {
    var notString, type = typeof key;
    if (type !== 'string') {
      if (type === 'object') {
        if (key === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }
      notString = true;
    }
    var length = key.length;
    if (!notString) {
      var bytes = [], length = key.length, index = 0, code;
      for (var i = 0; i < length; ++i) {
        code = key.charCodeAt(i);
        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = (0xc0 | (code >> 6));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = (0xe0 | (code >> 12));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
          bytes[index++] = (0xf0 | (code >> 18));
          bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        }
      }
      key = bytes;
    }

    if (key.length > 128) {
      key = (new Sha512(bits, true)).update(key).array();
    }

    var oKeyPad = [], iKeyPad = [];
    for (var i = 0; i < 128; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha512.call(this, bits, sharedMemory);

    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }
  HmacSha512.prototype = new Sha512();

  HmacSha512.prototype.finalize = function () {
    Sha512.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha512.call(this, this.bits, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha512.prototype.finalize.call(this);
    }
  };

  HmacSha512.prototype.clone = function () {
    var hash = new HmacSha512([], this.bits, false);
    this.copyTo(hash);
    hash.inner = this.inner;
    for (var i = 0; i < this.oKeyPad.length; ++i) {
      hash.oKeyPad[i] = this.oKeyPad[i];
    }
    return hash;
  };

  var exports = createMethod(512);
  exports.sha512 = exports;
  exports.sha384 = createMethod(384);
  exports.sha512_256 = createMethod(256);
  exports.sha512_224 = createMethod(224);
  exports.sha512.hmac = createHmacMethod(512);
  exports.sha384.hmac = createHmacMethod(384);
  exports.sha512_256.hmac = createHmacMethod(256);
  exports.sha512_224.hmac = createHmacMethod(224);

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha512 = exports.sha512;
    root.sha384 = exports.sha384;
    root.sha512_256 = exports.sha512_256;
    root.sha512_224 = exports.sha512_224;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13), __webpack_require__(12)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const english = __webpack_require__(31);
const nacl = __webpack_require__(7);

const ERROR_FAIL_TO_DECODE_MNEMONIC = Error('failed to decode mnemonic');
const ERROR_NOT_IN_WORDS_LIST = Error('the mnemonic contains a word that is not in the wordlist');

/**
 * mnemonicFromSeed converts a 32-byte key into a 25 word mnemonic. The generated mnemonic includes a checksum.
 * Each word in the mnemonic represents 11 bits of data, and the last 11 bits are reserved for the checksum.
 * @param seed 32 bytes long seed
 * @returns {string} 25 words mnemonic
 */
function mnemonicFromSeed(seed) {
    // Sanity length check
    if (seed.length !== nacl.SEED_BTYES_LENGTH) {throw new RangeError("Seed length must be " +
        nacl.SEED_BTYES_LENGTH);}

    const uint11Array = toUint11Array(seed);
    const words = applyWords(uint11Array);
    const checksumWord = computeChecksum(seed);

    return words.join(' ') + ' ' + checksumWord;
}

/**
 * seedFromMnemonic converts a mnemonic generated using this library into the source key used to create it.
 * It returns an error if the passed mnemonic has an incorrect checksum, if the number of words is unexpected, or if one
 * of the passed words is not found in the words list.
 * @param mnemonic 25 words mnemonic
 * @returns {Uint8Array} 32 bytes long seed
 */
function seedFromMnemonic(mnemonic) {
    const words = mnemonic.split(' ');
    const key = words.slice(0, 24);

    //Check that all words are in list
    for (let w of key) {
        if (english.indexOf(w) === -1) throw ERROR_NOT_IN_WORDS_LIST;
    }

    const checksum = words[words.length - 1];
    const uint11Array = key.map(word => english.indexOf(word));

    // Convert the key to uint8Array
    let uint8Array = toUint8Array(uint11Array);

    // We need to chop the last byte -
    // the short explanation - Since 256 is not divisible by 11, we have an extra 0x0 byte.
    // The longer explanation - When splitting the 256 bits to chunks of 11, we get 23 words and a left over of 3 bits.
    // This left gets padded with another 8 bits to the create the 24th word.
    // While converting back to byte array, our new 264 bits array is divisible by 8 but the last byte is just the padding.

    // check that we have 33 bytes long array as expected
    if (uint8Array.length !== 33) throw ERROR_FAIL_TO_DECODE_MNEMONIC;

    // check that the last byte is actually 0x0
    if (uint8Array[uint8Array.length - 1] !== 0x0) throw ERROR_FAIL_TO_DECODE_MNEMONIC;

    // chop it !
    uint8Array = uint8Array.slice(0, uint8Array.length - 1);


    // compute checksum
    const cs = computeChecksum(uint8Array);

    // success!
    if (cs === checksum) return uint8Array;

    throw ERROR_FAIL_TO_DECODE_MNEMONIC;
}

function computeChecksum(seed) {
    const hashBuffer = nacl.genericHash(seed);
    const uint11Hash = toUint11Array(hashBuffer);
    const words = applyWords(uint11Hash);

    return words[0];
}

function applyWords(nums) {
    return nums.map(n => english[n]);
}


// https://stackoverflow.com/a/51452614
function toUint11Array(buffer8) {
    let buffer11 = [];
    let acc = 0;
    let accBits = 0;
    function add(octet) {
        acc = (octet << accBits) | acc;
        accBits += 8;
        if (accBits >=11) {
            buffer11.push( acc & 0x7ff);
            acc >>= 11;
            accBits -= 11;
        }
    }
    function flush() {
        if (accBits) {
            buffer11.push( acc);
        }
    }

    buffer8.forEach( add);
    flush();
    return buffer11;
}

// from Uint11Array
// https://stackoverflow.com/a/51452614
function toUint8Array(buffer11) {
    let buffer8 = [];
    let acc = 0;
    let accBits = 0;
    function add(ui11) {
        acc = (ui11 << accBits) | acc;
        accBits += 11;
        while (accBits >= 8) {
            buffer8.push( acc & 0xff);
            acc >>= 8;
            accBits -= 8;
        }
    }
    function flush() {
        if (accBits) {
            buffer8.push( acc);
        }
    }

    buffer11.forEach( add);
    flush();
    return new Uint8Array(buffer8);
}

module.exports = {mnemonicFromSeed, seedFromMnemonic, ERROR_FAIL_TO_DECODE_MNEMONIC, ERROR_NOT_IN_WORDS_LIST};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

const english = [
    "abandon",
    "ability",
    "able",
    "about",
    "above",
    "absent",
    "absorb",
    "abstract",
    "absurd",
    "abuse",
    "access",
    "accident",
    "account",
    "accuse",
    "achieve",
    "acid",
    "acoustic",
    "acquire",
    "across",
    "act",
    "action",
    "actor",
    "actress",
    "actual",
    "adapt",
    "add",
    "addict",
    "address",
    "adjust",
    "admit",
    "adult",
    "advance",
    "advice",
    "aerobic",
    "affair",
    "afford",
    "afraid",
    "again",
    "age",
    "agent",
    "agree",
    "ahead",
    "aim",
    "air",
    "airport",
    "aisle",
    "alarm",
    "album",
    "alcohol",
    "alert",
    "alien",
    "all",
    "alley",
    "allow",
    "almost",
    "alone",
    "alpha",
    "already",
    "also",
    "alter",
    "always",
    "amateur",
    "amazing",
    "among",
    "amount",
    "amused",
    "analyst",
    "anchor",
    "ancient",
    "anger",
    "angle",
    "angry",
    "animal",
    "ankle",
    "announce",
    "annual",
    "another",
    "answer",
    "antenna",
    "antique",
    "anxiety",
    "any",
    "apart",
    "apology",
    "appear",
    "apple",
    "approve",
    "april",
    "arch",
    "arctic",
    "area",
    "arena",
    "argue",
    "arm",
    "armed",
    "armor",
    "army",
    "around",
    "arrange",
    "arrest",
    "arrive",
    "arrow",
    "art",
    "artefact",
    "artist",
    "artwork",
    "ask",
    "aspect",
    "assault",
    "asset",
    "assist",
    "assume",
    "asthma",
    "athlete",
    "atom",
    "attack",
    "attend",
    "attitude",
    "attract",
    "auction",
    "audit",
    "august",
    "aunt",
    "author",
    "auto",
    "autumn",
    "average",
    "avocado",
    "avoid",
    "awake",
    "aware",
    "away",
    "awesome",
    "awful",
    "awkward",
    "axis",
    "baby",
    "bachelor",
    "bacon",
    "badge",
    "bag",
    "balance",
    "balcony",
    "ball",
    "bamboo",
    "banana",
    "banner",
    "bar",
    "barely",
    "bargain",
    "barrel",
    "base",
    "basic",
    "basket",
    "battle",
    "beach",
    "bean",
    "beauty",
    "because",
    "become",
    "beef",
    "before",
    "begin",
    "behave",
    "behind",
    "believe",
    "below",
    "belt",
    "bench",
    "benefit",
    "best",
    "betray",
    "better",
    "between",
    "beyond",
    "bicycle",
    "bid",
    "bike",
    "bind",
    "biology",
    "bird",
    "birth",
    "bitter",
    "black",
    "blade",
    "blame",
    "blanket",
    "blast",
    "bleak",
    "bless",
    "blind",
    "blood",
    "blossom",
    "blouse",
    "blue",
    "blur",
    "blush",
    "board",
    "boat",
    "body",
    "boil",
    "bomb",
    "bone",
    "bonus",
    "book",
    "boost",
    "border",
    "boring",
    "borrow",
    "boss",
    "bottom",
    "bounce",
    "box",
    "boy",
    "bracket",
    "brain",
    "brand",
    "brass",
    "brave",
    "bread",
    "breeze",
    "brick",
    "bridge",
    "brief",
    "bright",
    "bring",
    "brisk",
    "broccoli",
    "broken",
    "bronze",
    "broom",
    "brother",
    "brown",
    "brush",
    "bubble",
    "buddy",
    "budget",
    "buffalo",
    "build",
    "bulb",
    "bulk",
    "bullet",
    "bundle",
    "bunker",
    "burden",
    "burger",
    "burst",
    "bus",
    "business",
    "busy",
    "butter",
    "buyer",
    "buzz",
    "cabbage",
    "cabin",
    "cable",
    "cactus",
    "cage",
    "cake",
    "call",
    "calm",
    "camera",
    "camp",
    "can",
    "canal",
    "cancel",
    "candy",
    "cannon",
    "canoe",
    "canvas",
    "canyon",
    "capable",
    "capital",
    "captain",
    "car",
    "carbon",
    "card",
    "cargo",
    "carpet",
    "carry",
    "cart",
    "case",
    "cash",
    "casino",
    "castle",
    "casual",
    "cat",
    "catalog",
    "catch",
    "category",
    "cattle",
    "caught",
    "cause",
    "caution",
    "cave",
    "ceiling",
    "celery",
    "cement",
    "census",
    "century",
    "cereal",
    "certain",
    "chair",
    "chalk",
    "champion",
    "change",
    "chaos",
    "chapter",
    "charge",
    "chase",
    "chat",
    "cheap",
    "check",
    "cheese",
    "chef",
    "cherry",
    "chest",
    "chicken",
    "chief",
    "child",
    "chimney",
    "choice",
    "choose",
    "chronic",
    "chuckle",
    "chunk",
    "churn",
    "cigar",
    "cinnamon",
    "circle",
    "citizen",
    "city",
    "civil",
    "claim",
    "clap",
    "clarify",
    "claw",
    "clay",
    "clean",
    "clerk",
    "clever",
    "click",
    "client",
    "cliff",
    "climb",
    "clinic",
    "clip",
    "clock",
    "clog",
    "close",
    "cloth",
    "cloud",
    "clown",
    "club",
    "clump",
    "cluster",
    "clutch",
    "coach",
    "coast",
    "coconut",
    "code",
    "coffee",
    "coil",
    "coin",
    "collect",
    "color",
    "column",
    "combine",
    "come",
    "comfort",
    "comic",
    "common",
    "company",
    "concert",
    "conduct",
    "confirm",
    "congress",
    "connect",
    "consider",
    "control",
    "convince",
    "cook",
    "cool",
    "copper",
    "copy",
    "coral",
    "core",
    "corn",
    "correct",
    "cost",
    "cotton",
    "couch",
    "country",
    "couple",
    "course",
    "cousin",
    "cover",
    "coyote",
    "crack",
    "cradle",
    "craft",
    "cram",
    "crane",
    "crash",
    "crater",
    "crawl",
    "crazy",
    "cream",
    "credit",
    "creek",
    "crew",
    "cricket",
    "crime",
    "crisp",
    "critic",
    "crop",
    "cross",
    "crouch",
    "crowd",
    "crucial",
    "cruel",
    "cruise",
    "crumble",
    "crunch",
    "crush",
    "cry",
    "crystal",
    "cube",
    "culture",
    "cup",
    "cupboard",
    "curious",
    "current",
    "curtain",
    "curve",
    "cushion",
    "custom",
    "cute",
    "cycle",
    "dad",
    "damage",
    "damp",
    "dance",
    "danger",
    "daring",
    "dash",
    "daughter",
    "dawn",
    "day",
    "deal",
    "debate",
    "debris",
    "decade",
    "december",
    "decide",
    "decline",
    "decorate",
    "decrease",
    "deer",
    "defense",
    "define",
    "defy",
    "degree",
    "delay",
    "deliver",
    "demand",
    "demise",
    "denial",
    "dentist",
    "deny",
    "depart",
    "depend",
    "deposit",
    "depth",
    "deputy",
    "derive",
    "describe",
    "desert",
    "design",
    "desk",
    "despair",
    "destroy",
    "detail",
    "detect",
    "develop",
    "device",
    "devote",
    "diagram",
    "dial",
    "diamond",
    "diary",
    "dice",
    "diesel",
    "diet",
    "differ",
    "digital",
    "dignity",
    "dilemma",
    "dinner",
    "dinosaur",
    "direct",
    "dirt",
    "disagree",
    "discover",
    "disease",
    "dish",
    "dismiss",
    "disorder",
    "display",
    "distance",
    "divert",
    "divide",
    "divorce",
    "dizzy",
    "doctor",
    "document",
    "dog",
    "doll",
    "dolphin",
    "domain",
    "donate",
    "donkey",
    "donor",
    "door",
    "dose",
    "double",
    "dove",
    "draft",
    "dragon",
    "drama",
    "drastic",
    "draw",
    "dream",
    "dress",
    "drift",
    "drill",
    "drink",
    "drip",
    "drive",
    "drop",
    "drum",
    "dry",
    "duck",
    "dumb",
    "dune",
    "during",
    "dust",
    "dutch",
    "duty",
    "dwarf",
    "dynamic",
    "eager",
    "eagle",
    "early",
    "earn",
    "earth",
    "easily",
    "east",
    "easy",
    "echo",
    "ecology",
    "economy",
    "edge",
    "edit",
    "educate",
    "effort",
    "egg",
    "eight",
    "either",
    "elbow",
    "elder",
    "electric",
    "elegant",
    "element",
    "elephant",
    "elevator",
    "elite",
    "else",
    "embark",
    "embody",
    "embrace",
    "emerge",
    "emotion",
    "employ",
    "empower",
    "empty",
    "enable",
    "enact",
    "end",
    "endless",
    "endorse",
    "enemy",
    "energy",
    "enforce",
    "engage",
    "engine",
    "enhance",
    "enjoy",
    "enlist",
    "enough",
    "enrich",
    "enroll",
    "ensure",
    "enter",
    "entire",
    "entry",
    "envelope",
    "episode",
    "equal",
    "equip",
    "era",
    "erase",
    "erode",
    "erosion",
    "error",
    "erupt",
    "escape",
    "essay",
    "essence",
    "estate",
    "eternal",
    "ethics",
    "evidence",
    "evil",
    "evoke",
    "evolve",
    "exact",
    "example",
    "excess",
    "exchange",
    "excite",
    "exclude",
    "excuse",
    "execute",
    "exercise",
    "exhaust",
    "exhibit",
    "exile",
    "exist",
    "exit",
    "exotic",
    "expand",
    "expect",
    "expire",
    "explain",
    "expose",
    "express",
    "extend",
    "extra",
    "eye",
    "eyebrow",
    "fabric",
    "face",
    "faculty",
    "fade",
    "faint",
    "faith",
    "fall",
    "false",
    "fame",
    "family",
    "famous",
    "fan",
    "fancy",
    "fantasy",
    "farm",
    "fashion",
    "fat",
    "fatal",
    "father",
    "fatigue",
    "fault",
    "favorite",
    "feature",
    "february",
    "federal",
    "fee",
    "feed",
    "feel",
    "female",
    "fence",
    "festival",
    "fetch",
    "fever",
    "few",
    "fiber",
    "fiction",
    "field",
    "figure",
    "file",
    "film",
    "filter",
    "final",
    "find",
    "fine",
    "finger",
    "finish",
    "fire",
    "firm",
    "first",
    "fiscal",
    "fish",
    "fit",
    "fitness",
    "fix",
    "flag",
    "flame",
    "flash",
    "flat",
    "flavor",
    "flee",
    "flight",
    "flip",
    "float",
    "flock",
    "floor",
    "flower",
    "fluid",
    "flush",
    "fly",
    "foam",
    "focus",
    "fog",
    "foil",
    "fold",
    "follow",
    "food",
    "foot",
    "force",
    "forest",
    "forget",
    "fork",
    "fortune",
    "forum",
    "forward",
    "fossil",
    "foster",
    "found",
    "fox",
    "fragile",
    "frame",
    "frequent",
    "fresh",
    "friend",
    "fringe",
    "frog",
    "front",
    "frost",
    "frown",
    "frozen",
    "fruit",
    "fuel",
    "fun",
    "funny",
    "furnace",
    "fury",
    "future",
    "gadget",
    "gain",
    "galaxy",
    "gallery",
    "game",
    "gap",
    "garage",
    "garbage",
    "garden",
    "garlic",
    "garment",
    "gas",
    "gasp",
    "gate",
    "gather",
    "gauge",
    "gaze",
    "general",
    "genius",
    "genre",
    "gentle",
    "genuine",
    "gesture",
    "ghost",
    "giant",
    "gift",
    "giggle",
    "ginger",
    "giraffe",
    "girl",
    "give",
    "glad",
    "glance",
    "glare",
    "glass",
    "glide",
    "glimpse",
    "globe",
    "gloom",
    "glory",
    "glove",
    "glow",
    "glue",
    "goat",
    "goddess",
    "gold",
    "good",
    "goose",
    "gorilla",
    "gospel",
    "gossip",
    "govern",
    "gown",
    "grab",
    "grace",
    "grain",
    "grant",
    "grape",
    "grass",
    "gravity",
    "great",
    "green",
    "grid",
    "grief",
    "grit",
    "grocery",
    "group",
    "grow",
    "grunt",
    "guard",
    "guess",
    "guide",
    "guilt",
    "guitar",
    "gun",
    "gym",
    "habit",
    "hair",
    "half",
    "hammer",
    "hamster",
    "hand",
    "happy",
    "harbor",
    "hard",
    "harsh",
    "harvest",
    "hat",
    "have",
    "hawk",
    "hazard",
    "head",
    "health",
    "heart",
    "heavy",
    "hedgehog",
    "height",
    "hello",
    "helmet",
    "help",
    "hen",
    "hero",
    "hidden",
    "high",
    "hill",
    "hint",
    "hip",
    "hire",
    "history",
    "hobby",
    "hockey",
    "hold",
    "hole",
    "holiday",
    "hollow",
    "home",
    "honey",
    "hood",
    "hope",
    "horn",
    "horror",
    "horse",
    "hospital",
    "host",
    "hotel",
    "hour",
    "hover",
    "hub",
    "huge",
    "human",
    "humble",
    "humor",
    "hundred",
    "hungry",
    "hunt",
    "hurdle",
    "hurry",
    "hurt",
    "husband",
    "hybrid",
    "ice",
    "icon",
    "idea",
    "identify",
    "idle",
    "ignore",
    "ill",
    "illegal",
    "illness",
    "image",
    "imitate",
    "immense",
    "immune",
    "impact",
    "impose",
    "improve",
    "impulse",
    "inch",
    "include",
    "income",
    "increase",
    "index",
    "indicate",
    "indoor",
    "industry",
    "infant",
    "inflict",
    "inform",
    "inhale",
    "inherit",
    "initial",
    "inject",
    "injury",
    "inmate",
    "inner",
    "innocent",
    "input",
    "inquiry",
    "insane",
    "insect",
    "inside",
    "inspire",
    "install",
    "intact",
    "interest",
    "into",
    "invest",
    "invite",
    "involve",
    "iron",
    "island",
    "isolate",
    "issue",
    "item",
    "ivory",
    "jacket",
    "jaguar",
    "jar",
    "jazz",
    "jealous",
    "jeans",
    "jelly",
    "jewel",
    "job",
    "join",
    "joke",
    "journey",
    "joy",
    "judge",
    "juice",
    "jump",
    "jungle",
    "junior",
    "junk",
    "just",
    "kangaroo",
    "keen",
    "keep",
    "ketchup",
    "key",
    "kick",
    "kid",
    "kidney",
    "kind",
    "kingdom",
    "kiss",
    "kit",
    "kitchen",
    "kite",
    "kitten",
    "kiwi",
    "knee",
    "knife",
    "knock",
    "know",
    "lab",
    "label",
    "labor",
    "ladder",
    "lady",
    "lake",
    "lamp",
    "language",
    "laptop",
    "large",
    "later",
    "latin",
    "laugh",
    "laundry",
    "lava",
    "law",
    "lawn",
    "lawsuit",
    "layer",
    "lazy",
    "leader",
    "leaf",
    "learn",
    "leave",
    "lecture",
    "left",
    "leg",
    "legal",
    "legend",
    "leisure",
    "lemon",
    "lend",
    "length",
    "lens",
    "leopard",
    "lesson",
    "letter",
    "level",
    "liar",
    "liberty",
    "library",
    "license",
    "life",
    "lift",
    "light",
    "like",
    "limb",
    "limit",
    "link",
    "lion",
    "liquid",
    "list",
    "little",
    "live",
    "lizard",
    "load",
    "loan",
    "lobster",
    "local",
    "lock",
    "logic",
    "lonely",
    "long",
    "loop",
    "lottery",
    "loud",
    "lounge",
    "love",
    "loyal",
    "lucky",
    "luggage",
    "lumber",
    "lunar",
    "lunch",
    "luxury",
    "lyrics",
    "machine",
    "mad",
    "magic",
    "magnet",
    "maid",
    "mail",
    "main",
    "major",
    "make",
    "mammal",
    "man",
    "manage",
    "mandate",
    "mango",
    "mansion",
    "manual",
    "maple",
    "marble",
    "march",
    "margin",
    "marine",
    "market",
    "marriage",
    "mask",
    "mass",
    "master",
    "match",
    "material",
    "math",
    "matrix",
    "matter",
    "maximum",
    "maze",
    "meadow",
    "mean",
    "measure",
    "meat",
    "mechanic",
    "medal",
    "media",
    "melody",
    "melt",
    "member",
    "memory",
    "mention",
    "menu",
    "mercy",
    "merge",
    "merit",
    "merry",
    "mesh",
    "message",
    "metal",
    "method",
    "middle",
    "midnight",
    "milk",
    "million",
    "mimic",
    "mind",
    "minimum",
    "minor",
    "minute",
    "miracle",
    "mirror",
    "misery",
    "miss",
    "mistake",
    "mix",
    "mixed",
    "mixture",
    "mobile",
    "model",
    "modify",
    "mom",
    "moment",
    "monitor",
    "monkey",
    "monster",
    "month",
    "moon",
    "moral",
    "more",
    "morning",
    "mosquito",
    "mother",
    "motion",
    "motor",
    "mountain",
    "mouse",
    "move",
    "movie",
    "much",
    "muffin",
    "mule",
    "multiply",
    "muscle",
    "museum",
    "mushroom",
    "music",
    "must",
    "mutual",
    "myself",
    "mystery",
    "myth",
    "naive",
    "name",
    "napkin",
    "narrow",
    "nasty",
    "nation",
    "nature",
    "near",
    "neck",
    "need",
    "negative",
    "neglect",
    "neither",
    "nephew",
    "nerve",
    "nest",
    "net",
    "network",
    "neutral",
    "never",
    "news",
    "next",
    "nice",
    "night",
    "noble",
    "noise",
    "nominee",
    "noodle",
    "normal",
    "north",
    "nose",
    "notable",
    "note",
    "nothing",
    "notice",
    "novel",
    "now",
    "nuclear",
    "number",
    "nurse",
    "nut",
    "oak",
    "obey",
    "object",
    "oblige",
    "obscure",
    "observe",
    "obtain",
    "obvious",
    "occur",
    "ocean",
    "october",
    "odor",
    "off",
    "offer",
    "office",
    "often",
    "oil",
    "okay",
    "old",
    "olive",
    "olympic",
    "omit",
    "once",
    "one",
    "onion",
    "online",
    "only",
    "open",
    "opera",
    "opinion",
    "oppose",
    "option",
    "orange",
    "orbit",
    "orchard",
    "order",
    "ordinary",
    "organ",
    "orient",
    "original",
    "orphan",
    "ostrich",
    "other",
    "outdoor",
    "outer",
    "output",
    "outside",
    "oval",
    "oven",
    "over",
    "own",
    "owner",
    "oxygen",
    "oyster",
    "ozone",
    "pact",
    "paddle",
    "page",
    "pair",
    "palace",
    "palm",
    "panda",
    "panel",
    "panic",
    "panther",
    "paper",
    "parade",
    "parent",
    "park",
    "parrot",
    "party",
    "pass",
    "patch",
    "path",
    "patient",
    "patrol",
    "pattern",
    "pause",
    "pave",
    "payment",
    "peace",
    "peanut",
    "pear",
    "peasant",
    "pelican",
    "pen",
    "penalty",
    "pencil",
    "people",
    "pepper",
    "perfect",
    "permit",
    "person",
    "pet",
    "phone",
    "photo",
    "phrase",
    "physical",
    "piano",
    "picnic",
    "picture",
    "piece",
    "pig",
    "pigeon",
    "pill",
    "pilot",
    "pink",
    "pioneer",
    "pipe",
    "pistol",
    "pitch",
    "pizza",
    "place",
    "planet",
    "plastic",
    "plate",
    "play",
    "please",
    "pledge",
    "pluck",
    "plug",
    "plunge",
    "poem",
    "poet",
    "point",
    "polar",
    "pole",
    "police",
    "pond",
    "pony",
    "pool",
    "popular",
    "portion",
    "position",
    "possible",
    "post",
    "potato",
    "pottery",
    "poverty",
    "powder",
    "power",
    "practice",
    "praise",
    "predict",
    "prefer",
    "prepare",
    "present",
    "pretty",
    "prevent",
    "price",
    "pride",
    "primary",
    "print",
    "priority",
    "prison",
    "private",
    "prize",
    "problem",
    "process",
    "produce",
    "profit",
    "program",
    "project",
    "promote",
    "proof",
    "property",
    "prosper",
    "protect",
    "proud",
    "provide",
    "public",
    "pudding",
    "pull",
    "pulp",
    "pulse",
    "pumpkin",
    "punch",
    "pupil",
    "puppy",
    "purchase",
    "purity",
    "purpose",
    "purse",
    "push",
    "put",
    "puzzle",
    "pyramid",
    "quality",
    "quantum",
    "quarter",
    "question",
    "quick",
    "quit",
    "quiz",
    "quote",
    "rabbit",
    "raccoon",
    "race",
    "rack",
    "radar",
    "radio",
    "rail",
    "rain",
    "raise",
    "rally",
    "ramp",
    "ranch",
    "random",
    "range",
    "rapid",
    "rare",
    "rate",
    "rather",
    "raven",
    "raw",
    "razor",
    "ready",
    "real",
    "reason",
    "rebel",
    "rebuild",
    "recall",
    "receive",
    "recipe",
    "record",
    "recycle",
    "reduce",
    "reflect",
    "reform",
    "refuse",
    "region",
    "regret",
    "regular",
    "reject",
    "relax",
    "release",
    "relief",
    "rely",
    "remain",
    "remember",
    "remind",
    "remove",
    "render",
    "renew",
    "rent",
    "reopen",
    "repair",
    "repeat",
    "replace",
    "report",
    "require",
    "rescue",
    "resemble",
    "resist",
    "resource",
    "response",
    "result",
    "retire",
    "retreat",
    "return",
    "reunion",
    "reveal",
    "review",
    "reward",
    "rhythm",
    "rib",
    "ribbon",
    "rice",
    "rich",
    "ride",
    "ridge",
    "rifle",
    "right",
    "rigid",
    "ring",
    "riot",
    "ripple",
    "risk",
    "ritual",
    "rival",
    "river",
    "road",
    "roast",
    "robot",
    "robust",
    "rocket",
    "romance",
    "roof",
    "rookie",
    "room",
    "rose",
    "rotate",
    "rough",
    "round",
    "route",
    "royal",
    "rubber",
    "rude",
    "rug",
    "rule",
    "run",
    "runway",
    "rural",
    "sad",
    "saddle",
    "sadness",
    "safe",
    "sail",
    "salad",
    "salmon",
    "salon",
    "salt",
    "salute",
    "same",
    "sample",
    "sand",
    "satisfy",
    "satoshi",
    "sauce",
    "sausage",
    "save",
    "say",
    "scale",
    "scan",
    "scare",
    "scatter",
    "scene",
    "scheme",
    "school",
    "science",
    "scissors",
    "scorpion",
    "scout",
    "scrap",
    "screen",
    "script",
    "scrub",
    "sea",
    "search",
    "season",
    "seat",
    "second",
    "secret",
    "section",
    "security",
    "seed",
    "seek",
    "segment",
    "select",
    "sell",
    "seminar",
    "senior",
    "sense",
    "sentence",
    "series",
    "service",
    "session",
    "settle",
    "setup",
    "seven",
    "shadow",
    "shaft",
    "shallow",
    "share",
    "shed",
    "shell",
    "sheriff",
    "shield",
    "shift",
    "shine",
    "ship",
    "shiver",
    "shock",
    "shoe",
    "shoot",
    "shop",
    "short",
    "shoulder",
    "shove",
    "shrimp",
    "shrug",
    "shuffle",
    "shy",
    "sibling",
    "sick",
    "side",
    "siege",
    "sight",
    "sign",
    "silent",
    "silk",
    "silly",
    "silver",
    "similar",
    "simple",
    "since",
    "sing",
    "siren",
    "sister",
    "situate",
    "six",
    "size",
    "skate",
    "sketch",
    "ski",
    "skill",
    "skin",
    "skirt",
    "skull",
    "slab",
    "slam",
    "sleep",
    "slender",
    "slice",
    "slide",
    "slight",
    "slim",
    "slogan",
    "slot",
    "slow",
    "slush",
    "small",
    "smart",
    "smile",
    "smoke",
    "smooth",
    "snack",
    "snake",
    "snap",
    "sniff",
    "snow",
    "soap",
    "soccer",
    "social",
    "sock",
    "soda",
    "soft",
    "solar",
    "soldier",
    "solid",
    "solution",
    "solve",
    "someone",
    "song",
    "soon",
    "sorry",
    "sort",
    "soul",
    "sound",
    "soup",
    "source",
    "south",
    "space",
    "spare",
    "spatial",
    "spawn",
    "speak",
    "special",
    "speed",
    "spell",
    "spend",
    "sphere",
    "spice",
    "spider",
    "spike",
    "spin",
    "spirit",
    "split",
    "spoil",
    "sponsor",
    "spoon",
    "sport",
    "spot",
    "spray",
    "spread",
    "spring",
    "spy",
    "square",
    "squeeze",
    "squirrel",
    "stable",
    "stadium",
    "staff",
    "stage",
    "stairs",
    "stamp",
    "stand",
    "start",
    "state",
    "stay",
    "steak",
    "steel",
    "stem",
    "step",
    "stereo",
    "stick",
    "still",
    "sting",
    "stock",
    "stomach",
    "stone",
    "stool",
    "story",
    "stove",
    "strategy",
    "street",
    "strike",
    "strong",
    "struggle",
    "student",
    "stuff",
    "stumble",
    "style",
    "subject",
    "submit",
    "subway",
    "success",
    "such",
    "sudden",
    "suffer",
    "sugar",
    "suggest",
    "suit",
    "summer",
    "sun",
    "sunny",
    "sunset",
    "super",
    "supply",
    "supreme",
    "sure",
    "surface",
    "surge",
    "surprise",
    "surround",
    "survey",
    "suspect",
    "sustain",
    "swallow",
    "swamp",
    "swap",
    "swarm",
    "swear",
    "sweet",
    "swift",
    "swim",
    "swing",
    "switch",
    "sword",
    "symbol",
    "symptom",
    "syrup",
    "system",
    "table",
    "tackle",
    "tag",
    "tail",
    "talent",
    "talk",
    "tank",
    "tape",
    "target",
    "task",
    "taste",
    "tattoo",
    "taxi",
    "teach",
    "team",
    "tell",
    "ten",
    "tenant",
    "tennis",
    "tent",
    "term",
    "test",
    "text",
    "thank",
    "that",
    "theme",
    "then",
    "theory",
    "there",
    "they",
    "thing",
    "this",
    "thought",
    "three",
    "thrive",
    "throw",
    "thumb",
    "thunder",
    "ticket",
    "tide",
    "tiger",
    "tilt",
    "timber",
    "time",
    "tiny",
    "tip",
    "tired",
    "tissue",
    "title",
    "toast",
    "tobacco",
    "today",
    "toddler",
    "toe",
    "together",
    "toilet",
    "token",
    "tomato",
    "tomorrow",
    "tone",
    "tongue",
    "tonight",
    "tool",
    "tooth",
    "top",
    "topic",
    "topple",
    "torch",
    "tornado",
    "tortoise",
    "toss",
    "total",
    "tourist",
    "toward",
    "tower",
    "town",
    "toy",
    "track",
    "trade",
    "traffic",
    "tragic",
    "train",
    "transfer",
    "trap",
    "trash",
    "travel",
    "tray",
    "treat",
    "tree",
    "trend",
    "trial",
    "tribe",
    "trick",
    "trigger",
    "trim",
    "trip",
    "trophy",
    "trouble",
    "truck",
    "true",
    "truly",
    "trumpet",
    "trust",
    "truth",
    "try",
    "tube",
    "tuition",
    "tumble",
    "tuna",
    "tunnel",
    "turkey",
    "turn",
    "turtle",
    "twelve",
    "twenty",
    "twice",
    "twin",
    "twist",
    "two",
    "type",
    "typical",
    "ugly",
    "umbrella",
    "unable",
    "unaware",
    "uncle",
    "uncover",
    "under",
    "undo",
    "unfair",
    "unfold",
    "unhappy",
    "uniform",
    "unique",
    "unit",
    "universe",
    "unknown",
    "unlock",
    "until",
    "unusual",
    "unveil",
    "update",
    "upgrade",
    "uphold",
    "upon",
    "upper",
    "upset",
    "urban",
    "urge",
    "usage",
    "use",
    "used",
    "useful",
    "useless",
    "usual",
    "utility",
    "vacant",
    "vacuum",
    "vague",
    "valid",
    "valley",
    "valve",
    "van",
    "vanish",
    "vapor",
    "various",
    "vast",
    "vault",
    "vehicle",
    "velvet",
    "vendor",
    "venture",
    "venue",
    "verb",
    "verify",
    "version",
    "very",
    "vessel",
    "veteran",
    "viable",
    "vibrant",
    "vicious",
    "victory",
    "video",
    "view",
    "village",
    "vintage",
    "violin",
    "virtual",
    "virus",
    "visa",
    "visit",
    "visual",
    "vital",
    "vivid",
    "vocal",
    "voice",
    "void",
    "volcano",
    "volume",
    "vote",
    "voyage",
    "wage",
    "wagon",
    "wait",
    "walk",
    "wall",
    "walnut",
    "want",
    "warfare",
    "warm",
    "warrior",
    "wash",
    "wasp",
    "waste",
    "water",
    "wave",
    "way",
    "wealth",
    "weapon",
    "wear",
    "weasel",
    "weather",
    "web",
    "wedding",
    "weekend",
    "weird",
    "welcome",
    "west",
    "wet",
    "whale",
    "what",
    "wheat",
    "wheel",
    "when",
    "where",
    "whip",
    "whisper",
    "wide",
    "width",
    "wife",
    "wild",
    "will",
    "win",
    "window",
    "wine",
    "wing",
    "wink",
    "winner",
    "winter",
    "wire",
    "wisdom",
    "wise",
    "wish",
    "witness",
    "wolf",
    "woman",
    "wonder",
    "wood",
    "wool",
    "word",
    "work",
    "world",
    "worry",
    "worth",
    "wrap",
    "wreck",
    "wrestle",
    "wrist",
    "write",
    "wrong",
    "yard",
    "year",
    "yellow",
    "you",
    "young",
    "youth",
    "zebra",
    "zero",
    "zone",
    "zoo"
];

module.exports = english;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {!function(e,t){ true?module.exports=t():undefined}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t),r.d(t,"encode",(function(){return I})),r.d(t,"decode",(function(){return N})),r.d(t,"decodeAsync",(function(){return Y})),r.d(t,"decodeArrayStream",(function(){return Z})),r.d(t,"decodeStream",(function(){return $})),r.d(t,"Decoder",(function(){return V})),r.d(t,"Encoder",(function(){return L})),r.d(t,"ExtensionCodec",(function(){return S})),r.d(t,"ExtData",(function(){return p})),r.d(t,"EXT_TIMESTAMP",(function(){return w})),r.d(t,"encodeDateToTimeSpec",(function(){return g})),r.d(t,"encodeTimeSpecToTimestamp",(function(){return v})),r.d(t,"decodeTimestampToTimeSpec",(function(){return x})),r.d(t,"encodeTimestampExtension",(function(){return b})),r.d(t,"decodeTimestampExtension",(function(){return U}));var n=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,i,o=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)s.push(n.value)}catch(e){i={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(i)throw i.error}}return s},i=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(n(arguments[t]));return e},o="undefined"!=typeof process&&"undefined"!=typeof TextEncoder&&"undefined"!=typeof TextDecoder;function s(e){for(var t=e.length,r=0,n=0;n<t;){var i=e.charCodeAt(n++);if(0!=(4294967168&i))if(0==(4294965248&i))r+=2;else{if(i>=55296&&i<=56319&&n<t){var o=e.charCodeAt(n);56320==(64512&o)&&(++n,i=((1023&i)<<10)+(1023&o)+65536)}r+=0==(4294901760&i)?3:4}else r++}return r}var a=o?new TextEncoder:void 0,h="undefined"!=typeof process?200:0;var u=(null==a?void 0:a.encodeInto)?function(e,t,r){a.encodeInto(e,t.subarray(r))}:function(e,t,r){t.set(a.encode(e),r)};function c(e,t,r){for(var n=t,o=n+r,s=[],a="";n<o;){var h=e[n++];if(0==(128&h))s.push(h);else if(192==(224&h)){var u=63&e[n++];s.push((31&h)<<6|u)}else if(224==(240&h)){u=63&e[n++];var c=63&e[n++];s.push((31&h)<<12|u<<6|c)}else if(240==(248&h)){var f=(7&h)<<18|(u=63&e[n++])<<12|(c=63&e[n++])<<6|63&e[n++];f>65535&&(f-=65536,s.push(f>>>10&1023|55296),f=56320|1023&f),s.push(f)}else s.push(h);s.length>=4096&&(a+=String.fromCharCode.apply(String,i(s)),s.length=0)}return s.length>0&&(a+=String.fromCharCode.apply(String,i(s))),a}var f=o?new TextDecoder:null,l="undefined"!=typeof process?200:0;var p=function(e,t){this.type=e,this.data=t};function d(e,t,r){var n=Math.floor(r/4294967296),i=r;e.setUint32(t,n),e.setUint32(t+4,i)}function y(e,t){return 4294967296*e.getInt32(t)+e.getUint32(t+4)}var w=-1;function v(e){var t=e.sec,r=e.nsec;if(t>=0&&r>=0&&t<=17179869183){if(0===r&&t<=4294967295){var n=new Uint8Array(4);return(s=new DataView(n.buffer)).setUint32(0,t),n}var i=t/4294967296,o=4294967295&t;n=new Uint8Array(8);return(s=new DataView(n.buffer)).setUint32(0,r<<2|3&i),s.setUint32(4,o),n}var s;n=new Uint8Array(12);return(s=new DataView(n.buffer)).setUint32(0,r),d(s,4,t),n}function g(e){var t=e.getTime(),r=Math.floor(t/1e3),n=1e6*(t-1e3*r),i=Math.floor(n/1e9);return{sec:r+i,nsec:n-1e9*i}}function b(e){return e instanceof Date?v(g(e)):null}function x(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength);switch(e.byteLength){case 4:return{sec:t.getUint32(0),nsec:0};case 8:var r=t.getUint32(0);return{sec:4294967296*(3&r)+t.getUint32(4),nsec:r>>>2};case 12:return{sec:y(t,4),nsec:t.getUint32(0)};default:throw new Error("Unrecognized data size for timestamp: "+e.length)}}function U(e){var t=x(e);return new Date(1e3*t.sec+t.nsec/1e6)}var m={type:w,encode:b,decode:U},S=function(){function e(){this.builtInEncoders=[],this.builtInDecoders=[],this.encoders=[],this.decoders=[],this.register(m)}return e.prototype.register=function(e){var t=e.type,r=e.encode,n=e.decode;if(t>=0)this.encoders[t]=r,this.decoders[t]=n;else{var i=1+t;this.builtInEncoders[i]=r,this.builtInDecoders[i]=n}},e.prototype.tryToEncode=function(e,t){for(var r=0;r<this.builtInEncoders.length;r++){if(null!=(n=this.builtInEncoders[r]))if(null!=(i=n(e,t)))return new p(-1-r,i)}for(r=0;r<this.encoders.length;r++){var n,i;if(null!=(n=this.encoders[r]))if(null!=(i=n(e,t)))return new p(r,i)}return e instanceof p?e:null},e.prototype.decode=function(e,t,r){var n=t<0?this.builtInDecoders[-1-t]:this.decoders[t];return n?n(e,t,r):new p(t,e)},e.defaultCodec=new e,e}();function E(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer?new Uint8Array(e):Uint8Array.from(e)}var B=function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},L=function(){function e(e,t,r,n,i,o,s){void 0===e&&(e=S.defaultCodec),void 0===r&&(r=100),void 0===n&&(n=2048),void 0===i&&(i=!1),void 0===o&&(o=!1),void 0===s&&(s=!1),this.extensionCodec=e,this.context=t,this.maxDepth=r,this.initialBufferSize=n,this.sortKeys=i,this.forceFloat32=o,this.ignoreUndefined=s,this.pos=0,this.view=new DataView(new ArrayBuffer(this.initialBufferSize)),this.bytes=new Uint8Array(this.view.buffer)}return e.prototype.encode=function(e,t){if(t>this.maxDepth)throw new Error("Too deep objects in depth "+t);null==e?this.encodeNil():"boolean"==typeof e?this.encodeBoolean(e):"number"==typeof e?this.encodeNumber(e):"string"==typeof e?this.encodeString(e):this.encodeObject(e,t)},e.prototype.getUint8Array=function(){return this.bytes.subarray(0,this.pos)},e.prototype.ensureBufferSizeToWrite=function(e){var t=this.pos+e;this.view.byteLength<t&&this.resizeBuffer(2*t)},e.prototype.resizeBuffer=function(e){var t=new ArrayBuffer(e),r=new Uint8Array(t),n=new DataView(t);r.set(this.bytes),this.view=n,this.bytes=r},e.prototype.encodeNil=function(){this.writeU8(192)},e.prototype.encodeBoolean=function(e){!1===e?this.writeU8(194):this.writeU8(195)},e.prototype.encodeNumber=function(e){Number.isSafeInteger(e)?e>=0?e<128?this.writeU8(e):e<256?(this.writeU8(204),this.writeU8(e)):e<65536?(this.writeU8(205),this.writeU16(e)):e<4294967296?(this.writeU8(206),this.writeU32(e)):(this.writeU8(207),this.writeU64(e)):e>=-32?this.writeU8(224|e+32):e>=-128?(this.writeU8(208),this.writeI8(e)):e>=-32768?(this.writeU8(209),this.writeI16(e)):e>=-2147483648?(this.writeU8(210),this.writeI32(e)):(this.writeU8(211),this.writeI64(e)):this.forceFloat32?(this.writeU8(202),this.writeF32(e)):(this.writeU8(203),this.writeF64(e))},e.prototype.writeStringHeader=function(e){if(e<32)this.writeU8(160+e);else if(e<256)this.writeU8(217),this.writeU8(e);else if(e<65536)this.writeU8(218),this.writeU16(e);else{if(!(e<4294967296))throw new Error("Too long string: "+e+" bytes in UTF-8");this.writeU8(219),this.writeU32(e)}},e.prototype.encodeString=function(e){var t=e.length;if(o&&t>h){var r=s(e);this.ensureBufferSizeToWrite(5+r),this.writeStringHeader(r),u(e,this.bytes,this.pos),this.pos+=r}else{r=s(e);this.ensureBufferSizeToWrite(5+r),this.writeStringHeader(r),function(e,t,r){for(var n=e.length,i=r,o=0;o<n;){var s=e.charCodeAt(o++);if(0!=(4294967168&s)){if(0==(4294965248&s))t[i++]=s>>6&31|192;else{if(s>=55296&&s<=56319&&o<n){var a=e.charCodeAt(o);56320==(64512&a)&&(++o,s=((1023&s)<<10)+(1023&a)+65536)}0==(4294901760&s)?(t[i++]=s>>12&15|224,t[i++]=s>>6&63|128):(t[i++]=s>>18&7|240,t[i++]=s>>12&63|128,t[i++]=s>>6&63|128)}t[i++]=63&s|128}else t[i++]=s}}(e,this.bytes,this.pos),this.pos+=r}},e.prototype.encodeObject=function(e,t){var r=this.extensionCodec.tryToEncode(e,this.context);if(null!=r)this.encodeExtension(r);else if(Array.isArray(e))this.encodeArray(e,t);else if(ArrayBuffer.isView(e))this.encodeBinary(e);else{if("object"!=typeof e)throw new Error("Unrecognized object: "+Object.prototype.toString.apply(e));this.encodeMap(e,t)}},e.prototype.encodeBinary=function(e){var t=e.byteLength;if(t<256)this.writeU8(196),this.writeU8(t);else if(t<65536)this.writeU8(197),this.writeU16(t);else{if(!(t<4294967296))throw new Error("Too large binary: "+t);this.writeU8(198),this.writeU32(t)}var r=E(e);this.writeU8a(r)},e.prototype.encodeArray=function(e,t){var r,n,i=e.length;if(i<16)this.writeU8(144+i);else if(i<65536)this.writeU8(220),this.writeU16(i);else{if(!(i<4294967296))throw new Error("Too large array: "+i);this.writeU8(221),this.writeU32(i)}try{for(var o=B(e),s=o.next();!s.done;s=o.next()){var a=s.value;this.encode(a,t+1)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}},e.prototype.countWithoutUndefined=function(e,t){var r,n,i=0;try{for(var o=B(t),s=o.next();!s.done;s=o.next()){void 0!==e[s.value]&&i++}}catch(e){r={error:e}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return i},e.prototype.encodeMap=function(e,t){var r,n,i=Object.keys(e);this.sortKeys&&i.sort();var o=this.ignoreUndefined?this.countWithoutUndefined(e,i):i.length;if(o<16)this.writeU8(128+o);else if(o<65536)this.writeU8(222),this.writeU16(o);else{if(!(o<4294967296))throw new Error("Too large map object: "+o);this.writeU8(223),this.writeU32(o)}try{for(var s=B(i),a=s.next();!a.done;a=s.next()){var h=a.value,u=e[h];this.ignoreUndefined&&void 0===u||(this.encodeString(h),this.encode(u,t+1))}}catch(e){r={error:e}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}},e.prototype.encodeExtension=function(e){var t=e.data.length;if(1===t)this.writeU8(212);else if(2===t)this.writeU8(213);else if(4===t)this.writeU8(214);else if(8===t)this.writeU8(215);else if(16===t)this.writeU8(216);else if(t<256)this.writeU8(199),this.writeU8(t);else if(t<65536)this.writeU8(200),this.writeU16(t);else{if(!(t<4294967296))throw new Error("Too large extension object: "+t);this.writeU8(201),this.writeU32(t)}this.writeI8(e.type),this.writeU8a(e.data)},e.prototype.writeU8=function(e){this.ensureBufferSizeToWrite(1),this.view.setUint8(this.pos,e),this.pos++},e.prototype.writeU8a=function(e){var t=e.length;this.ensureBufferSizeToWrite(t),this.bytes.set(e,this.pos),this.pos+=t},e.prototype.writeI8=function(e){this.ensureBufferSizeToWrite(1),this.view.setInt8(this.pos,e),this.pos++},e.prototype.writeU16=function(e){this.ensureBufferSizeToWrite(2),this.view.setUint16(this.pos,e),this.pos+=2},e.prototype.writeI16=function(e){this.ensureBufferSizeToWrite(2),this.view.setInt16(this.pos,e),this.pos+=2},e.prototype.writeU32=function(e){this.ensureBufferSizeToWrite(4),this.view.setUint32(this.pos,e),this.pos+=4},e.prototype.writeI32=function(e){this.ensureBufferSizeToWrite(4),this.view.setInt32(this.pos,e),this.pos+=4},e.prototype.writeF32=function(e){this.ensureBufferSizeToWrite(4),this.view.setFloat32(this.pos,e),this.pos+=4},e.prototype.writeF64=function(e){this.ensureBufferSizeToWrite(8),this.view.setFloat64(this.pos,e),this.pos+=8},e.prototype.writeU64=function(e){this.ensureBufferSizeToWrite(8),function(e,t,r){var n=r/4294967296,i=r;e.setUint32(t,n),e.setUint32(t+4,i)}(this.view,this.pos,e),this.pos+=8},e.prototype.writeI64=function(e){this.ensureBufferSizeToWrite(8),d(this.view,this.pos,e),this.pos+=8},e}(),A={};function I(e,t){void 0===t&&(t=A);var r=new L(t.extensionCodec,t.context,t.maxDepth,t.initialBufferSize,t.sortKeys,t.forceFloat32,t.ignoreUndefined);return r.encode(e,1),r.getUint8Array()}function T(e){return(e<0?"-":"")+"0x"+Math.abs(e).toString(16).padStart(2,"0")}var k=function(){function e(e,t){void 0===e&&(e=16),void 0===t&&(t=16),this.maxKeyLength=e,this.maxLengthPerKey=t,this.caches=[];for(var r=0;r<this.maxKeyLength;r++)this.caches.push([])}return e.prototype.canBeCached=function(e){return e>0&&e<=this.maxKeyLength},e.prototype.get=function(e,t,r){var n=this.caches[r-1],i=n.length;e:for(var o=0;o<i;o++){for(var s=n[o],a=s.bytes,h=0;h<r;h++)if(a[h]!==e[t+h])continue e;return s.value}return null},e.prototype.store=function(e,t){var r=this.caches[e.length-1],n={bytes:e,value:t};r.length>=this.maxLengthPerKey?r[Math.random()*r.length|0]=n:r.push(n)},e.prototype.decode=function(e,t,r){var n=this.get(e,t,r);if(null!=n)return n;var i=c(e,t,r),o=Uint8Array.prototype.slice.call(e,t,t+r);return this.store(o,i),i},e}(),M=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{h(n.next(e))}catch(e){o(e)}}function a(e){try{h(n.throw(e))}catch(e){o(e)}}function h(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}h((n=n.apply(e,t||[])).next())}))},z=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},C=function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise((function(n,i){(function(e,t,r,n){Promise.resolve(n).then((function(t){e({value:t,done:r})}),t)})(n,i,(t=e[r](t)).done,t.value)}))}}},D=function(e){return this instanceof D?(this.v=e,this):new D(e)},P=function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=r.apply(e,t||[]),o=[];return n={},s("next"),s("throw"),s("return"),n[Symbol.asyncIterator]=function(){return this},n;function s(e){i[e]&&(n[e]=function(t){return new Promise((function(r,n){o.push([e,t,r,n])>1||a(e,t)}))})}function a(e,t){try{(r=i[e](t)).value instanceof D?Promise.resolve(r.value.v).then(h,u):c(o[0][2],r)}catch(e){c(o[0][3],e)}var r}function h(e){a("next",e)}function u(e){a("throw",e)}function c(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}},j=new DataView(new ArrayBuffer(0)),F=new Uint8Array(j.buffer),W=function(){try{j.getInt8(0)}catch(e){return e.constructor}throw new Error("never reached")}(),O=new W("Insufficient data"),K=new k,V=function(){function e(e,t,r,n,i,o,s,a){void 0===e&&(e=S.defaultCodec),void 0===r&&(r=4294967295),void 0===n&&(n=4294967295),void 0===i&&(i=4294967295),void 0===o&&(o=4294967295),void 0===s&&(s=4294967295),void 0===a&&(a=K),this.extensionCodec=e,this.context=t,this.maxStrLength=r,this.maxBinLength=n,this.maxArrayLength=i,this.maxMapLength=o,this.maxExtLength=s,this.cachedKeyDecoder=a,this.totalPos=0,this.pos=0,this.view=j,this.bytes=F,this.headByte=-1,this.stack=[]}return e.prototype.setBuffer=function(e){this.bytes=E(e),this.view=function(e){if(e instanceof ArrayBuffer)return new DataView(e);var t=E(e);return new DataView(t.buffer,t.byteOffset,t.byteLength)}(this.bytes),this.pos=0},e.prototype.appendBuffer=function(e){if(-1!==this.headByte||this.hasRemaining()){var t=this.bytes.subarray(this.pos),r=E(e),n=new Uint8Array(t.length+r.length);n.set(t),n.set(r,t.length),this.setBuffer(n)}else this.setBuffer(e)},e.prototype.hasRemaining=function(e){return void 0===e&&(e=1),this.view.byteLength-this.pos>=e},e.prototype.createNoExtraBytesError=function(e){var t=this.view,r=this.pos;return new RangeError("Extra "+(t.byteLength-r)+" byte(s) found at buffer["+e+"]")},e.prototype.decodeSingleSync=function(){var e=this.decodeSync();if(this.hasRemaining())throw this.createNoExtraBytesError(this.pos);return e},e.prototype.decodeSingleAsync=function(e){var t,r,n,i;return M(this,void 0,void 0,(function(){var o,s,a,h,u,c,f,l;return z(this,(function(p){switch(p.label){case 0:o=!1,p.label=1;case 1:p.trys.push([1,6,7,12]),t=C(e),p.label=2;case 2:return[4,t.next()];case 3:if((r=p.sent()).done)return[3,5];if(a=r.value,o)throw this.createNoExtraBytesError(this.totalPos);this.appendBuffer(a);try{s=this.decodeSync(),o=!0}catch(e){if(!(e instanceof W))throw e}this.totalPos+=this.pos,p.label=4;case 4:return[3,2];case 5:return[3,12];case 6:return h=p.sent(),n={error:h},[3,12];case 7:return p.trys.push([7,,10,11]),r&&!r.done&&(i=t.return)?[4,i.call(t)]:[3,9];case 8:p.sent(),p.label=9;case 9:return[3,11];case 10:if(n)throw n.error;return[7];case 11:return[7];case 12:if(o){if(this.hasRemaining())throw this.createNoExtraBytesError(this.totalPos);return[2,s]}throw c=(u=this).headByte,f=u.pos,l=u.totalPos,new RangeError("Insufficient data in parcing "+T(c)+" at "+l+" ("+f+" in the current buffer)")}}))}))},e.prototype.decodeArrayStream=function(e){return this.decodeMultiAsync(e,!0)},e.prototype.decodeStream=function(e){return this.decodeMultiAsync(e,!1)},e.prototype.decodeMultiAsync=function(e,t){return P(this,arguments,(function(){var r,n,i,o,s,a,h,u,c;return z(this,(function(f){switch(f.label){case 0:r=t,n=-1,f.label=1;case 1:f.trys.push([1,13,14,19]),i=C(e),f.label=2;case 2:return[4,D(i.next())];case 3:if((o=f.sent()).done)return[3,12];if(s=o.value,t&&0===n)throw this.createNoExtraBytesError(this.totalPos);this.appendBuffer(s),r&&(n=this.readArraySize(),r=!1,this.complete()),f.label=4;case 4:f.trys.push([4,9,,10]),f.label=5;case 5:return[4,D(this.decodeSync())];case 6:return[4,f.sent()];case 7:return f.sent(),0==--n?[3,8]:[3,5];case 8:return[3,10];case 9:if(!((a=f.sent())instanceof W))throw a;return[3,10];case 10:this.totalPos+=this.pos,f.label=11;case 11:return[3,2];case 12:return[3,19];case 13:return h=f.sent(),u={error:h},[3,19];case 14:return f.trys.push([14,,17,18]),o&&!o.done&&(c=i.return)?[4,D(c.call(i))]:[3,16];case 15:f.sent(),f.label=16;case 16:return[3,18];case 17:if(u)throw u.error;return[7];case 18:return[7];case 19:return[2]}}))}))},e.prototype.decodeSync=function(){e:for(;;){var e=this.readHeadByte(),t=void 0;if(e>=224)t=e-256;else if(e<192)if(e<128)t=e;else if(e<144){if(0!==(n=e-128)){this.pushMapState(n),this.complete();continue e}t={}}else if(e<160){if(0!==(n=e-144)){this.pushArrayState(n),this.complete();continue e}t=[]}else{var r=e-160;t=this.decodeUtf8String(r,0)}else if(192===e)t=null;else if(194===e)t=!1;else if(195===e)t=!0;else if(202===e)t=this.readF32();else if(203===e)t=this.readF64();else if(204===e)t=this.readU8();else if(205===e)t=this.readU16();else if(206===e)t=this.readU32();else if(207===e)t=this.readU64();else if(208===e)t=this.readI8();else if(209===e)t=this.readI16();else if(210===e)t=this.readI32();else if(211===e)t=this.readI64();else if(217===e){r=this.lookU8();t=this.decodeUtf8String(r,1)}else if(218===e){r=this.lookU16();t=this.decodeUtf8String(r,2)}else if(219===e){r=this.lookU32();t=this.decodeUtf8String(r,4)}else if(220===e){if(0!==(n=this.readU16())){this.pushArrayState(n),this.complete();continue e}t=[]}else if(221===e){if(0!==(n=this.readU32())){this.pushArrayState(n),this.complete();continue e}t=[]}else if(222===e){if(0!==(n=this.readU16())){this.pushMapState(n),this.complete();continue e}t={}}else if(223===e){if(0!==(n=this.readU32())){this.pushMapState(n),this.complete();continue e}t={}}else if(196===e){var n=this.lookU8();t=this.decodeBinary(n,1)}else if(197===e){n=this.lookU16();t=this.decodeBinary(n,2)}else if(198===e){n=this.lookU32();t=this.decodeBinary(n,4)}else if(212===e)t=this.decodeExtension(1,0);else if(213===e)t=this.decodeExtension(2,0);else if(214===e)t=this.decodeExtension(4,0);else if(215===e)t=this.decodeExtension(8,0);else if(216===e)t=this.decodeExtension(16,0);else if(199===e){n=this.lookU8();t=this.decodeExtension(n,1)}else if(200===e){n=this.lookU16();t=this.decodeExtension(n,2)}else{if(201!==e)throw new Error("Unrecognized type byte: "+T(e));n=this.lookU32();t=this.decodeExtension(n,4)}this.complete();for(var i=this.stack;i.length>0;){var o=i[i.length-1];if(0===o.type){if(o.array[o.position]=t,o.position++,o.position!==o.size)continue e;i.pop(),t=o.array}else{if(1===o.type){if(s=void 0,"string"!==(s=typeof t)&&"number"!==s)throw new Error("The type of key must be string or number but "+typeof t);o.key=t,o.type=2;continue e}if(o.map[o.key]=t,o.readCount++,o.readCount!==o.size){o.key=null,o.type=1;continue e}i.pop(),t=o.map}}return t}var s},e.prototype.readHeadByte=function(){return-1===this.headByte&&(this.headByte=this.readU8()),this.headByte},e.prototype.complete=function(){this.headByte=-1},e.prototype.readArraySize=function(){var e=this.readHeadByte();switch(e){case 220:return this.readU16();case 221:return this.readU32();default:if(e<160)return e-144;throw new Error("Unrecognized array type byte: "+T(e))}},e.prototype.pushMapState=function(e){if(e>this.maxMapLength)throw new Error("Max length exceeded: map length ("+e+") > maxMapLengthLength ("+this.maxMapLength+")");this.stack.push({type:1,size:e,key:null,readCount:0,map:{}})},e.prototype.pushArrayState=function(e){if(e>this.maxArrayLength)throw new Error("Max length exceeded: array length ("+e+") > maxArrayLength ("+this.maxArrayLength+")");this.stack.push({type:0,size:e,array:new Array(e),position:0})},e.prototype.decodeUtf8String=function(e,t){var r;if(e>this.maxStrLength)throw new Error("Max length exceeded: UTF-8 byte length ("+e+") > maxStrLength ("+this.maxStrLength+")");if(this.bytes.byteLength<this.pos+t+e)throw O;var n,i=this.pos+t;return n=this.stateIsMapKey()&&(null===(r=this.cachedKeyDecoder)||void 0===r?void 0:r.canBeCached(e))?this.cachedKeyDecoder.decode(this.bytes,i,e):o&&e>l?function(e,t,r){var n=e.subarray(t,t+r);return f.decode(n)}(this.bytes,i,e):c(this.bytes,i,e),this.pos+=t+e,n},e.prototype.stateIsMapKey=function(){return this.stack.length>0&&1===this.stack[this.stack.length-1].type},e.prototype.decodeBinary=function(e,t){if(e>this.maxBinLength)throw new Error("Max length exceeded: bin length ("+e+") > maxBinLength ("+this.maxBinLength+")");if(!this.hasRemaining(e+t))throw O;var r=this.pos+t,n=this.bytes.subarray(r,r+e);return this.pos+=t+e,n},e.prototype.decodeExtension=function(e,t){if(e>this.maxExtLength)throw new Error("Max length exceeded: ext length ("+e+") > maxExtLength ("+this.maxExtLength+")");var r=this.view.getInt8(this.pos+t),n=this.decodeBinary(e,t+1);return this.extensionCodec.decode(n,r,this.context)},e.prototype.lookU8=function(){return this.view.getUint8(this.pos)},e.prototype.lookU16=function(){return this.view.getUint16(this.pos)},e.prototype.lookU32=function(){return this.view.getUint32(this.pos)},e.prototype.readU8=function(){var e=this.view.getUint8(this.pos);return this.pos++,e},e.prototype.readI8=function(){var e=this.view.getInt8(this.pos);return this.pos++,e},e.prototype.readU16=function(){var e=this.view.getUint16(this.pos);return this.pos+=2,e},e.prototype.readI16=function(){var e=this.view.getInt16(this.pos);return this.pos+=2,e},e.prototype.readU32=function(){var e=this.view.getUint32(this.pos);return this.pos+=4,e},e.prototype.readI32=function(){var e=this.view.getInt32(this.pos);return this.pos+=4,e},e.prototype.readU64=function(){var e,t,r=(e=this.view,t=this.pos,4294967296*e.getUint32(t)+e.getUint32(t+4));return this.pos+=8,r},e.prototype.readI64=function(){var e=y(this.view,this.pos);return this.pos+=8,e},e.prototype.readF32=function(){var e=this.view.getFloat32(this.pos);return this.pos+=4,e},e.prototype.readF64=function(){var e=this.view.getFloat64(this.pos);return this.pos+=8,e},e}(),_={};function N(e,t){void 0===t&&(t=_);var r=new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength);return r.setBuffer(e),r.decodeSingleSync()}var R=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},H=function(e){return this instanceof H?(this.v=e,this):new H(e)},G=function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=r.apply(e,t||[]),o=[];return n={},s("next"),s("throw"),s("return"),n[Symbol.asyncIterator]=function(){return this},n;function s(e){i[e]&&(n[e]=function(t){return new Promise((function(r,n){o.push([e,t,r,n])>1||a(e,t)}))})}function a(e,t){try{(r=i[e](t)).value instanceof H?Promise.resolve(r.value.v).then(h,u):c(o[0][2],r)}catch(e){c(o[0][3],e)}var r}function h(e){a("next",e)}function u(e){a("throw",e)}function c(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}};function X(e){if(null==e)throw new Error("Assertion Failure: value must not be null nor undefined")}function q(e){return null!=e[Symbol.asyncIterator]?e:function(e){return G(this,arguments,(function(){var t,r,n,i;return R(this,(function(o){switch(o.label){case 0:t=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,H(t.read())];case 3:return r=o.sent(),n=r.done,i=r.value,n?[4,H(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return X(i),[4,H(i)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}}))}))}(e)}var J=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{h(n.next(e))}catch(e){o(e)}}function a(e){try{h(n.throw(e))}catch(e){o(e)}}function h(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}h((n=n.apply(e,t||[])).next())}))},Q=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};function Y(e,t){return void 0===t&&(t=_),J(this,void 0,void 0,(function(){var r;return Q(this,(function(n){return r=q(e),[2,new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeSingleAsync(r)]}))}))}function Z(e,t){void 0===t&&(t=_);var r=q(e);return new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeArrayStream(r)}function $(e,t){void 0===t&&(t=_);var r=q(e);return new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeStream(r)}}])}));
//# sourceMappingURL=msgpack.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const address = __webpack_require__(11);
const encoding = __webpack_require__(6);
const nacl = __webpack_require__(7);
const utils = __webpack_require__(9);

/**
 * Bid enables construction of Algorand Auctions Bids
 * */
class Bid {
    constructor({bidderKey, bidAmount, maxPrice, bidID, auctionKey, auctionID}) {
        this.name = "Bid";
        this.tag = Buffer.from([97, 66]); // "aB"

        bidderKey = address.decode(bidderKey);
        auctionKey = address.decode(auctionKey);

        if (!Number.isSafeInteger(bidAmount) || bidAmount < 0) throw Error("Bid amount must be positive and 2^53-1");
        if (!Number.isSafeInteger(bidID) || bidID < 0) throw Error("BidID must be positive and 2^53-1");
        if (!Number.isSafeInteger(auctionID) || auctionID < 0) throw Error("auctionID must be positive");

        Object.assign(this, {
            bidderKey, auctionKey, bidAmount, maxPrice, bidID, auctionID,
        });
    }

    get_obj_for_encoding() {
        return {
            "bidder": Buffer.from(this.bidderKey.publicKey),
            "cur": this.bidAmount,
            "price": this.maxPrice,
            "id": this.bidID,
            "auc": Buffer.from(this.auctionKey.publicKey),
            "aid": this.auctionID,
        };
    }

    signBid(sk) {
        const encodedMsg = encoding.encode(this.get_obj_for_encoding());
        const toBeSigned = Buffer.from(utils.concatArrays(this.tag, encodedMsg));
        const sig = nacl.sign(toBeSigned, sk);

        // construct signed message
        let sBid = {
            "sig": Buffer.from(sig),
            "bid": this.get_obj_for_encoding(),

        };

        let note = {
            "t": "b",
            "b": sBid
        };
        return new Uint8Array(encoding.encode(note));
    }


}

module.exports = {Bid};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const client = __webpack_require__(14);

function Algod(token = '', baseServer = "http://r2.algorand.network", port = 4180, headers = {}) {
    // workaround to allow backwards compatibility for multiple headers
    let tokenHeader = token;
    if (typeof (tokenHeader) == 'string') {
        tokenHeader = {"X-Algo-API-Token": tokenHeader};
    }

    // Get client
    let c = new client.HTTPClient(tokenHeader, baseServer, port, headers);

    /**
     * Takes an object and convert its note field to Buffer, if exist.
     * @param o
     * @returns {*}
     */
    function noteb64ToNote(o) {
        if (!(o.noteb64 === undefined || o.noteb64 === null)) {
            o.note = Buffer.from(o.noteb64, "base64")
        }
        return o
    }

    /**
     * Sets the default header (if not previously set) for sending a raw
     * transaction.
     * @param headers
     * @returns {*}
     */
    function setSendTransactionHeaders(headers) {
        let hdrs = headers;
        if (Object.keys(hdrs).every(key=> key.toLowerCase() !== 'content-type')) {
            hdrs = {...headers};
            hdrs['Content-Type'] = 'application/x-binary';
        }
        return hdrs;
    }

    /**
     * status retrieves the StatusResponse from the running node
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.status = async function (headers={}) {
        let res = await c.get("/v1/status", {}, headers);
        return res.body;
    };

    /**
     * healthCheck returns an empty object iff the node is running
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.healthCheck = async function (headers={}) {
        let res = await c.get("/health", {}, headers);
        return res.body;
    };

    /**
     * statusAfterBlock waits for round roundNumber to occur then returns the StatusResponse for this round.
     * This call blocks
     * @param roundNumber
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.statusAfterBlock = async function (roundNumber, headers={}) {
        if (!Number.isInteger(roundNumber)) throw Error("roundNumber should be an integer");
        let res = await c.get("/v1/status/wait-for-block-after/" + roundNumber, {}, headers);
        return res.body;
    };

    /**
     * pendingTransactions asks algod for a snapshot of current pending txns on the node, bounded by maxTxns.
     * If maxTxns = 0, fetches as many transactions as possible.
     * @param maxTxns number
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.pendingTransactions = async function (maxTxns, headers={}) {
        if (!Number.isInteger(maxTxns)) throw Error("maxTxns should be an integer");
        let res = await c.get("/v1/transactions/pending", { 'max': maxTxns }, headers);
        if (res.statusCode === 200 && res.body.truncatedTxns.transactions !== undefined) {
            for (let i = 0; i < res.body.truncatedTxns.transactions.length; i++) {
                res.body.truncatedTxns.transactions[i] = noteb64ToNote(res.body.truncatedTxns.transactions[i]);
            }
        }
        return res.body;
    };

    /**
     * versions retrieves the VersionResponse from the running node
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.versions = async function (headers={}) {
        let res = await c.get("/versions", {}, headers);
        return res.body;
    };

    /**
     * LedgerSupply gets the supply details for the specified node's Ledger
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.ledgerSupply = async function (headers={}) {
        let res = await c.get("/v1/ledger/supply", {}, headers);
        return res.body;
    };

    /**
     * transactionsByAddress returns all transactions for a PK [addr] in the [first, last] rounds range.
     * @param addr string
     * @param first number, optional
     * @param last number, optional
     * @param maxTxns number, optional
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.transactionByAddress = async function (addr, first=null, last=null, maxTxns=null, headers={}) {

        if (( first !== null ) && (!Number.isInteger(first) )){
            throw Error("first round should be an integer")
        }
        if (( last !== null ) && (!Number.isInteger(last) )){
            throw Error("last round should be an integer")
        }
        let res = await c.get("/v1/account/" + addr + "/transactions", { 'firstRound': first, 'lastRound': last, 'max': maxTxns }, headers);
        if (res.statusCode === 200 && res.body.transactions !== undefined) {
            for (let i = 0; i < res.body.transactions.length; i++) {
                res.body.transactions[i] = noteb64ToNote(res.body.transactions[i]);
            }
        }
        return res.body;
    };

    /**
     * transactionsByAddressAndDate returns all transactions for a PK [addr] in the [fromDate, toDate] date range. 
     * The date is a string in the YYYY-MM-DD format.
     * @param addr string
     * @param fromDate string
     * @param toDate string
     * @param maxTxns number, optional
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.transactionByAddressAndDate = async function (addr, fromDate, toDate, maxTxns=null, headers={}) {
        let res = await c.get("/v1/account/" + addr + "/transactions", { 'fromDate': fromDate, 'toDate': toDate, 'max': maxTxns }, headers);
        if (res.statusCode === 200 && res.body.transactions !== undefined) {
            for (let i = 0; i < res.body.transactions.length; i++) {
                res.body.transactions[i] = noteb64ToNote(res.body.transactions[i]);
            }
        }
        return res.body;
    };

    /**
     * transactionById returns the a transaction information of a specific txid [txId]
     * Note - This method is allowed only when Indexer is enabled.
     * @param txid
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.transactionById = async function (txid, headers={}) {
        let res = await c.get("/v1/transaction/" + txid, {}, headers);
        if (res.statusCode === 200) {
            res.body = noteb64ToNote(res.body);
        }
        return res.body;
    };

    /**
     * transactionInformation returns the transaction information of a specific txid and an address
     * @param addr
     * @param txid
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.transactionInformation = async function (addr, txid, headers={}) {
        let res = await c.get("/v1/account/" + addr + "/transaction/" + txid, {}, headers);
        if (res.statusCode === 200) {
            res.body = noteb64ToNote(res.body);
        }
        return res.body;
    };

    /**
     * pendingTransactionInformation returns the transaction information for a specific txid of a pending transaction
     * @param txid
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.pendingTransactionInformation = async function (txid, headers={}) {
        let res = await c.get("/v1/transactions/pending/" + txid, {}, headers);
        if (res.statusCode === 200) {
            res.body = noteb64ToNote(res.body);
        }
        return res.body;
    };

    /**
     * accountInformation returns the passed account's information
     * @param addr string
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.accountInformation = async function (addr, headers={}) {
        let res = await c.get("/v1/account/" + addr, {}, headers);
        return res.body;
    };

    /**
     * assetInformation returns the information for the asset with the passed creator and index
     * @param index number
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.assetInformation = async function (index, headers={}) {
        let res = await c.get("/v1/asset/" + index, {}, headers);
        return res.body;
    };

    /**
     * suggestedFee gets the recommended transaction fee from the node
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.suggestedFee = async function (headers={}) {
        let res = await c.get("/v1/transactions/fee", {}, headers);
        return res.body;
    };

    /**
     * sendRawTransaction gets an encoded SignedTxn and broadcasts it to the network
     * @param txn Uin8Array
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.sendRawTransaction = async function (txn, headers={}) {
        let txHeaders = setSendTransactionHeaders(headers);
        let res = await c.post("/v1/transactions", Buffer.from(txn), txHeaders);
        return res.body;
    };

    /**
     * sendRawTransactions gets a list of encoded SignedTxns and broadcasts it to the network
     * @param txn Array of Uin8Array
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.sendRawTransactions = async function (txns, headers={}) {
        let txHeaders = setSendTransactionHeaders(headers);
        const merged = Array.prototype.concat(...txns.map(arr => Array.from(arr)));
        let res = await c.post("/v1/transactions", Buffer.from(merged), txHeaders);
        return res.body;
    };

    /**
     * getTransactionParams returns to common needed parameters for a new transaction
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.getTransactionParams = async function (headers={}) {
        let res = await c.get("/v1/transactions/params", {}, headers);
        return res.body;
    };

    /**
     * suggestParams returns to common needed parameters for a new transaction, in a format the transaction builder expects
     * @param headers, optional
     * @returns {Object}
     */
    this.suggestParams = async function (headers={}) {
        let result = await this.getTransactionParams(headers);
        return {
            "flatFee": false,
            "fee": result.fee,
            "firstRound": result.lastRound,
            "lastRound": result.lastRound + 1000,
            "genesisID": result.genesisID,
            "genesisHash": result.genesishashb64,
        };
    };

    /**
     * block gets the block info for the given round This call blocks
     * @param roundNumber
     * @param headers, optional
     * @returns {Promise<*>}
     */
    this.block = async function (roundNumber, headers={}) {
        if (!Number.isInteger(roundNumber)) throw Error("roundNumber should be an integer");
        let res = await c.get("/v1/block/" + roundNumber, {}, headers);
        if (res.statusCode === 200 && res.body.txns.transactions !== undefined) {
            for (let i = 0; i < res.body.txns.transactions.length; i++) {
                res.body.txns.transactions[i] = noteb64ToNote(res.body.txns.transactions[i]);
            }
        }
        return res.body;
    };

}


module.exports = { Algod };

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

let root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

const Emitter = __webpack_require__(36);
const RequestBase = __webpack_require__(37);
const isObject = __webpack_require__(21);
const ResponseBase = __webpack_require__(38);
const Agent = __webpack_require__(40);

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

const request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = () => {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

const trim = ''.trim
  ? s => s.trim()
  : s => s.replace(/(^\s*|\s*$)/g, '');

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  const pairs = [];
  for (const key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(v => {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(const subkey in val) {
        pushEncodedKeyValuePair(pairs, `${key}[${subkey}]`, val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

request.serializeObject = serialize;

/**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  const obj = {};
  const pairs = str.split('&');
  let pair;
  let pos;

  for (let i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': JSON.stringify
};

/**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  const lines = str.split(/\r?\n/);
  const fields = {};
  let index;
  let line;
  let field;
  let val;

  for (let i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    if (index === -1) { // could be empty line, just skip it
      continue;
    }
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[\/+]json($|[^-\w])/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  let status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str) {
  let parse = request.parse[this.type];
  if (this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  const req = this.req;
  const method = req.method;
  const url = req.url;

  const msg = `cannot ${method} ${url} (${this.status})`;
  const err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  const self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', () => {
    let err = null;
    let res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    let new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      }
    } catch(custom_err) {
      new_err = custom_err; // ok() callback can throw
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (1 === arguments.length) pass = '';
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    };
  }

  const encoder = string => {
    if ('function' === typeof btoa) {
      return btoa(string);
    }
    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  const fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  const err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = () => {
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  this._end();
};

Request.prototype._end = function() {
  if (this._aborted) return this.callback(Error("The request has been aborted even before .end() was called"));

  const self = this;
  const xhr = (this.xhr = request.getXHR());
  let data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = () => {
    const readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    let status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  const handleProgress = (direction, e) => {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    const contentType = this._header['content-type'];
    let serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (const field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
};

request.agent = () => new Agent();

["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(method => {
  Agent.prototype[method.toLowerCase()] = function(url, fn) {
    const req = new request.Request(method, url);
    this._setDefaults(req);
    if (fn) {
      req.end(fn);
    }
    return req;
  };
});

Agent.prototype.del = Agent.prototype['delete'];

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = (url, data, fn) => {
  const req = request('GET', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = (url, data, fn) => {
  const req = request('HEAD', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = (url, data, fn) => {
  const req = request('OPTIONS', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn) {
  const req = request('DELETE', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = (url, data, fn) => {
  const req = request('PATCH', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = (url, data, fn) => {
  const req = request('POST', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = (url, data, fn) => {
  const req = request('PUT', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module of mixed-in functions shared between node and client code
 */
const isObject = __webpack_require__(21);

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (const key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(const option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count, fn){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

const ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
RequestBase.prototype._shouldRetry = function(err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }
  if (this._retryCallback) {
    try {
      const override = this._retryCallback(err, res);
      if (override === true) return true;
      if (override === false) return false;
      // undefined falls back to defaults
    } catch(e) {
      console.error(e);
    }
  }
  if (res && res.status && res.status >= 500 && res.status != 501) return true;
  if (err) {
    if (err.code && ~ERROR_CODES.indexOf(err.code)) return true;
    // Superagent timeout
    if (err.timeout && err.code == 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }
  return false;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {

  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    const self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise((innerResolve, innerReject) => {
      self.on('error', innerReject);
      self.on('abort', () => {
        const err = new Error('Aborted');
        err.code = "ABORTED";
        err.status = this.status;
        err.method = this.method;
        err.url = this.url;
        innerReject(err);
      });
      self.end((err, res) => {
        if (err) innerReject(err);
        else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype['catch'] = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};

/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (const key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {
  // name should be either a string or an object.
  if (null === name || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (const key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (const i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function(user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', `Basic ${base64Encoder(`${user}:${pass}`)}`);
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', `Bearer ${user}`);
      break;
  }
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on) {
  // This is browser-only functionality. Node side is no-op.
  if (on == undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n
 * @return {Request} for chaining
 */
RequestBase.prototype.maxResponseSize = function(n){
  if ('number' !== typeof n) {
    throw TypeError("Invalid argument");
  }
  this._maxResponseSize = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function() {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header,
  };
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  const isObj = isObject(data);
  let type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (const key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? `${this._data}&${data}`
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};

/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  const query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    const index = this.url.indexOf('?');
    if (index >= 0) {
      const queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = () => {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  const err = new Error(`${reason + timeout}ms exceeded`);
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  const self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(() => {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(() => {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

const utils = __webpack_require__(39);

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (const key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field) {
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    const ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    const params = utils.params(ct);
    for (const key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    const type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.created = 201 == status;
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
    this.unprocessableEntity = 422 == status;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = str => str.split(/ *; */).shift();

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = str => str.split(/ *; */).reduce((obj, str) => {
  const parts = str.split(/ *= */);
  const key = parts.shift();
  const val = parts.shift();

  if (key && val) obj[key] = val;
  return obj;
}, {});

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = str => str.split(/ *, */).reduce((obj, str) => {
  const parts = str.split(/ *; */);
  const url = parts[0].slice(1, -1);
  const rel = parts[1].split(/ *= */)[1].slice(1, -1);
  obj[rel] = url;
  return obj;
}, {});

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = (header, changesOrigin) => {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  // secuirty
  if (changesOrigin) {
    delete header['authorization'];
    delete header['cookie'];
  }
  return header;
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

function Agent() {
  this._defaults = [];
}

["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects",
 "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(fn => {
  /** Default setting for all requests from this agent */
  Agent.prototype[fn] = function(...args) {
    this._defaults.push({fn, args});
    return this;
  }
});

Agent.prototype._setDefaults = function(req) {
    this._defaults.forEach(def => {
      req[def.fn].apply(req, def.args);
    });
};

module.exports = Agent;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const client = __webpack_require__(14);
const txn = __webpack_require__(17);

function Kmd(token, baseServer = "http://127.0.0.1", port = 7833) {
    // Get client
    let c = new client.HTTPClient({'X-KMD-API-Token':token}, baseServer, port);

    /**
     * version returns a VersionResponse containing a list of kmd API versions supported by this running kmd instance.
     * @returns {Promise<*>}
     */
    this.versions = async function () {
        let res = await c.get("/versions");
        return res.body;
    };

    /**
     * listWallets returns a ListWalletsResponse containing the list of wallets known to kmd. Using a wallet ID
     * returned from this endpoint, you can initialize a wallet handle with client.InitWalletHandle
     * @returns {Promise<*>}
     */
    this.listWallets = async function () {
        let res = await c.get("/v1/wallets");
        return res.body;
    };

    /**
     * createWallet creates a wallet with the specified name, password, driver,
     * and master derivation key. If the master derivation key is blank, one is
     * generated internally to kmd. CreateWallet returns a CreateWalletResponse
     * containing information about the new wallet.
     * @param walletName
     * @param walletPassword
     * @param walletDriverName
     * @param walletMDK
     * @returns {Promise<*>}
     */
    this.createWallet = async function (walletName, walletPassword, walletMDK = "", walletDriverName = "sqlite") {
        let req = {
            "wallet_name": walletName,
            "wallet_driver_name": walletDriverName,
            "wallet_password": walletPassword,
            "master_derivation_key": Buffer.from(walletMDK).toString('base64'),
        };
        let res = await c.post("/v1/wallet", req);
        return res.body;
    };

    /**
     * initWalletHandle accepts a wallet ID and a wallet password, and returns an
     * initWalletHandleResponse containing a wallet handle token. This wallet
     * handle token can be used for subsequent operations on this wallet, like key
     * generation, transaction signing, etc.. WalletHandleTokens expire after a
     * configurable number of seconds, and must be renewed periodically with
     * RenewWalletHandle. It is good practice to call ReleaseWalletHandle when
     * you're done interacting with this wallet.
     * @param walletID
     * @param walletPassword
     * @returns {Promise<*>}
     */
    this.initWalletHandle = async function (walletID, walletPassword) {
        let req = {
            "wallet_id": walletID,
            "wallet_password": walletPassword,

        };
        let res = await c.post("/v1/wallet/init", req);
        return res.body;
    };

    /**
     * releaseWalletHandle invalidates the passed wallet handle token, making
     * it unusuable for subsequent wallet operations.
     * @param walletHandle
     * @returns {Promise<*>}
     */
    this.releaseWalletHandle = async function (walletHandle) {
        let req = {
            "wallet_handle_token": walletHandle,
        };
        let res = await c.post("/v1/wallet/release", req);
        return res.body;
    };

    /**
     * renewWalletHandle accepts a wallet handle and attempts to renew it, moving
     * the expiration time to some number of seconds in the future. It returns a
     * RenewWalletHandleResponse containing the walletHandle and the number of
     * seconds until expiration
     * @param walletHandle
     * @returns {Promise<*>}
     */
    this.renewWalletHandle = async function (walletHandle) {
        let req = {
            "wallet_handle_token": walletHandle,
        };
        let res = await c.post("/v1/wallet/renew", req);
        return res.body;
    };

    /**
     * renameWallet accepts a wallet ID, wallet password, and a new wallet name,
     * and renames the underlying wallet.
     * @param walletID
     * @param walletPassword
     * @param newWalletName
     * @returns {Promise<*>}
     */
    this.renameWallet = async function (walletID, walletPassword, newWalletName) {
        let req = {
            "wallet_id": walletID,
            "wallet_password": walletPassword,
            "wallet_name": newWalletName

        };
        let res = await c.post("/v1/wallet/rename", req);
        return res.body;
    };

    /**
     * getWallet accepts a wallet handle and returns high level information about
     * this wallet in a GetWalletResponse.
     * @param walletHandle
     * @returns {Promise<*>}
     */
    this.getWallet = async function (walletHandle) {
        let req = {
            "wallet_handle_token": walletHandle,
        };
        let res = await c.post("/v1/wallet/info", req);
        return res.body;
    };

    /**
     * exportMasterDerivationKey accepts a wallet handle and a wallet password, and
     * returns an ExportMasterDerivationKeyResponse containing the master
     * derivation key. This key can be used as an argument to CreateWallet in
     * order to recover the keys generated by this wallet. The master derivation
     * key can be encoded as a sequence of words using the mnemonic library, and
     * @param walletHandle
     * @param walletPassword
     * @returns {Promise<*>}
     */
    this.exportMasterDerivationKey = async function (walletHandle, walletPassword) {
        let req = {
            "wallet_handle_token": walletHandle,
            "wallet_password": walletPassword,
        };
        let res = await c.post("/v1/master-key/export", req);
        return {"master_derivation_key": Buffer.from(res.body.master_derivation_key, 'base64')};
    };


    /**
     * importKey accepts a wallet handle and an ed25519 private key, and imports
     * the key into the wallet. It returns an ImportKeyResponse containing the
     * address corresponding to this private key.
     * @param walletHandle
     * @param secretKey
     * @returns {Promise<*>}
     */
    this.importKey = async function (walletHandle, secretKey) {
        let req = {
            "wallet_handle_token": walletHandle,
            "private_key": Buffer.from(secretKey).toString('base64'),
        };
        let res = await c.post("/v1/key/import", req);
        return res.body;
    };

    /**
     * exportKey accepts a wallet handle, wallet password, and address, and returns
     * an ExportKeyResponse containing the ed25519 private key corresponding to the
     * address stored in the wallet.
     * @param walletHandle
     * @param walletPassword
     * @param addr
     * @returns {Promise<*>}
     */
    this.exportKey = async function (walletHandle, walletPassword, addr) {
        let req = {
            "wallet_handle_token": walletHandle,
            "address": addr,
            "wallet_password": walletPassword
        };
        let res = await c.post("/v1/key/export", req);
        return {"private_key": Buffer.from(res.body.private_key, 'base64')};
    };

    /**
     * generateKey accepts a wallet handle, and then generates the next key in the
     * wallet using its internal master derivation key. Two wallets with the same
     * master derivation key will generate the same sequence of keys.
     * @param walletHandle
     * @returns {Promise<*>}
     */
    this.generateKey = async function (walletHandle) {
        let req = {
            "wallet_handle_token": walletHandle,
            "display_mnemonic": false
        };
        let res = await c.post("/v1/key", req);
        return res.body;
    };

    /**
     * deleteKey accepts a wallet handle, wallet password, and address, and deletes
     * the information about this address from the wallet (including address and
     * secret key). If DeleteKey is called on a key generated using GenerateKey,
     * the same key will not be generated again. However, if a wallet is recovered
     * using the master derivation key, a key generated in this way can be
     * recovered.
     * @param walletHandle
     * @param walletPassword
     * @param addr
     * @returns {Promise<*>}
     */
    this.deleteKey = async function (walletHandle, walletPassword, addr) {
        let req = {
            "wallet_handle_token": walletHandle,
            "address": addr,
            "wallet_password": walletPassword
        };
        let res = await c.delete("/v1/key", req);
        return res.body;
    };

    /**
     * ListKeys accepts a wallet handle and returns a ListKeysResponse containing
     * all of the addresses for which this wallet contains secret keys.
     * @param walletHandle
     * @returns {Promise<*>}
     */
    this.listKeys = async function (walletHandle) {
        let req = {
            "wallet_handle_token": walletHandle,
        };
        let res = await c.post("/v1/key/list", req);
        return res.body;
    };

    /**
     * signTransaction accepts a wallet handle, wallet password, and a transaction,
     * and returns and SignTransactionResponse containing an encoded, signed
     * transaction. The transaction is signed using the key corresponding to the
     * Sender field.
     * @param walletHandle
     * @param walletPassword
     * @param transaction
     * @returns {Promise<*>}
     */
    this.signTransaction = async function (walletHandle, walletPassword, transaction) {

        let tx = new txn.Transaction(transaction);

        let req = {
            "wallet_handle_token": walletHandle,
            "wallet_password": walletPassword,
            "transaction": Buffer.from(tx.toByte()).toString('base64')
        };
        let res = await c.post("/v1/transaction/sign", req);

        if (res.statusCode === 200) {
            return Buffer.from(res.body.signed_transaction, 'base64')
        }
        return res.body;
    };

    /**
     * listMultisig accepts a wallet handle and returns a ListMultisigResponse
     * containing the multisig addresses whose preimages are stored in this wallet.
     * A preimage is the information needed to reconstruct this multisig address,
     * including multisig version information, threshold information, and a list
     * of public keys.
     * @param walletHandle
     * @returns {Promise<*>}
     */
    this.listMultisig = async function (walletHandle) {
        let req = {
            "wallet_handle_token": walletHandle,
        };
        let res = await c.post("/v1/multisig/list", req);
        return res.body;
    };

    /**
     * importMultisig accepts a wallet handle and the information required to
     * generate a multisig address. It derives this address, and stores all of the
     * information within the wallet. It returns a ImportMultisigResponse with the
     * derived address.
     * @param walletHandle
     * @param version
     * @param threshold
     * @param pks
     * @returns {Promise<*>}
     */
    this.importMultisig = async function (walletHandle, version, threshold, pks) {
        let req = {
            "wallet_handle_token": walletHandle,
            "multisig_version": version,
            "threshold": threshold,
            "pks": pks
        };
        let res = await c.post("/v1/multisig/import", req);
        return res.body;
    };

    /**
     * exportMultisig accepts a wallet handle, wallet password, and multisig
     * address, and returns an ExportMultisigResponse containing the stored
     * multisig preimage. The preimage contains all of the information necessary
     * to derive the multisig address, including version, threshold, and a list of
     * public keys.
     * @param walletHandle
     * @param walletPassword
     * @param addr
     * @returns {Promise<*>}
     */
    this.exportMultisig = async function (walletHandle, addr) {
        let req = {
            "wallet_handle_token": walletHandle,
            "address": addr,
        };
        let res = await c.post("/v1/multisig/export", req);
        return res.body;
    };

    /**
     * signMultisigTransaction accepts a wallet handle, wallet password,
     * transaction, public key (*not* an address), and an optional partial
     * MultisigSig. It looks up the secret key corresponding to the public key, and
     * returns a SignMultisigTransactionResponse containing a MultisigSig with a
     * signature by the secret key included.
     * @param walletHandle
     * @param pw
     * @param tx
     * @param pk
     * @param partial
     * @returns {Promise<*>}
     */
    this.signMultisigTransaction = async function (walletHandle, pw, transaction, pk, partial) {
        let tx = new txn.Transaction(transaction);
        let req = {
            "wallet_handle_token": walletHandle,
            "transaction": Buffer.from(tx.toByte()).toString('base64'),
            "public_key": Buffer.from(pk).toString('base64'),
            "partial_multisig": partial,
            "wallet_password": pw
        };
        let res = await c.post("/v1/multisig/sign", req);
        return res.body;
    };

    /**
     * deleteMultisig accepts a wallet handle, wallet password, and multisig
     * address, and deletes the information about this multisig address from the 
     * wallet (including address and secret key).
     * @param walletHandle
     * @param walletPassword
     * @param addr
     * @returns {Promise<*>}
     */
    this.deleteMultisig = async function (walletHandle, walletPassword, addr) {
        let req = {
            "wallet_handle_token": walletHandle,
            "address": addr,
            "wallet_password": walletPassword
        };
        let res = await c.delete("/v1/multisig", req);
        return res.body;
    };
}
module.exports = {Kmd};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const assert = __webpack_require__(43);
const nacl = __webpack_require__(7);
const address = __webpack_require__(11);
const encoding = __webpack_require__(6);
const logic = __webpack_require__(48);
const multisig = __webpack_require__(20);
const utils = __webpack_require__(9);

/**
 LogicSig implementation
 */

class LogicSig {
    constructor(program, args) {
        this.tag = Buffer.from("Program");

        assert(logic.checkProgram(program, args));

        this.logic = program;
        this.args = args;
        this.sig = undefined;
        this.msig = undefined;
    }

    get_obj_for_encoding() {
        let obj = {
            l: this.logic,
        }
        if (this.args) {
            obj["arg"] = this.args;
        }
        if (this.sig) {
            obj["sig"] = this.sig;
        } else if (this.msig) {
            obj["msig"] = this.msig;
        }
        return obj;
    }

    static from_obj_for_encoding(encoded) {
        let lsig = new LogicSig(encoded.l, encoded.arg);
        lsig.sig = encoded.sig;
        lsig.msig = encoded.msig;
        return lsig;
    }

    /**
     * Performs signature verification
     * @param {Uint8Array} publicKey Verification key (derived from sender address or escrow address)
     * @returns {boolean}
     */
    verify(publicKey) {
        if (this.sig && this.msig) {
            return false;
        }

        try {
            logic.checkProgram(this.logic, this.args);
        } catch (e) {
            return false;
        }

        let toBeSigned = utils.concatArrays(this.tag, this.logic);

        if (!this.sig && !this.msig) {
            let hash = nacl.genericHash(toBeSigned);
            return utils.arrayEqual(hash, publicKey)
        }

        if (this.sig) {
            return nacl.verify(toBeSigned, this.sig, publicKey);
        }

        return multisig.verifyMultisig(toBeSigned, this.msig, publicKey);
    }

    /**
     * Compute hash of the logic sig program (that is the same as escrow account address) as string address
     * @returns {string} String representation of the address
     */
    address() {
        let toBeSigned = utils.concatArrays(this.tag, this.logic);
        let hash = nacl.genericHash(toBeSigned);
        return address.encode(hash);
    }

    /**
     * Creates signature (if no msig provided) or multi signature otherwise
     * @param {Uint8Array} secretKey Secret key to sign with
     * @param {Object} msig Multisig account as {version, threshold, addrs}
     */
    sign(secretKey, msig) {
        if (msig === undefined) {
            this.sig = this.signProgram(secretKey);
        } else {
            let subsigs = msig.addrs.map(addr => {
                return {"pk": address.decode(addr).publicKey};
            });

            this.msig = {
                "v": msig.version,
                "thr": msig.threshold,
                "subsig": subsigs
            };

            let [sig, index] = this.singleSignMultisig(secretKey, this.msig);
            this.msig.subsig[index].s = sig;
        }
    }

    /**
     * Appends a signature to multi signature
     * @param {Uint8Array} secretKey Secret key to sign with
     */
    appendToMultisig(secretKey) {
        if (this.msig === undefined) {
            throw new Error("no multisig present");
        }
        let [sig, index] = this.singleSignMultisig(secretKey, this.msig);
        this.msig.subsig[index].s = sig;
    }

    signProgram(secretKey) {
        let toBeSigned = utils.concatArrays(this.tag, this.logic);
        const sig = nacl.sign(toBeSigned, secretKey);
        return sig;
    }

    singleSignMultisig(secretKey, msig) {
        let index = -1;
        let myPk = nacl.keyPairFromSecretKey(secretKey).publicKey;
        for (let i = 0; i < msig.subsig.length; i++) {
            let pk = msig.subsig[i].pk;
            if (utils.arrayEqual(pk, myPk)) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            throw new Error("invalid secret key");
        }
        let sig = this.signProgram(secretKey);
        return [sig, index];
    }

    toByte() {
        return encoding.encode(this.get_obj_for_encoding());
    }

    static fromByte(encoded) {
        let decoded_obj = encoding.decode(encoded);
        return LogicSig.from_obj_for_encoding(decoded_obj);
    }
}

module.exports = {
    LogicSig
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var objectAssign = __webpack_require__(44);

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(45);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(46);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(47);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/**
 Utilities for working with program bytes.
 */

const langspec = __webpack_require__(49)

let opcodes;

const maxCost = 20000;
const maxLength = 1000;

/**
 * checkProgram validates program for length and running cost
 * @param {Uint8Array} program Program to check
 * @param {[Uint8Array]} args Program arguments as array of Uint8Array arrays
 * @throws {Error}
 * @returns {boolean} true if success
 */
function checkProgram(program, args) {
    [_, _, success] = readProgram(program, args);
    return success
}

/** readProgram validates program for length and running cost,
 * and additionally provides the found int variables and byte blocks
 * @param {Uint8Array} program Program to check
 * @param {[Uint8Array]} args Program arguments as array of Uint8Array arrays
 * @throws {Error}
 * @returns {[Uint8Array, [Uint8Array], boolean]}
 */
function readProgram(program, args) {
    const intcblockOpcode = 32;
    const bytecblockOpcode = 38;
    if (!program) {
        throw new Error("empty program");
    }

    if (args == undefined) {
        args = []
    }
    if (!Array.isArray(args)) {
        throw new Error("invalid arguments");
    }

    let [version, vlen] = parseUvarint(program);
    if (vlen <= 0) {
        throw new Error("version parsing error");
    }
    if (version > langspec.EvalMaxVersion) {
        throw new Error("unsupported version");
    }

    let cost = 0;
    let length =program.length;
    for (let arg of args) {
        length += arg.length;
    }
    if (length > maxLength) {
        throw new Error("program too long");
    }

    if (!opcodes) {
        opcodes = {}
        for (let op of langspec.Ops) {
            opcodes[op.Opcode] = op;
        }
    }

    let pc = vlen;
    let ints = [];
    let byteArrays = [];
    while (pc < program.length) {
        let op = opcodes[program[pc]];
        if (op === undefined) {
            throw new Error("invalid instruction");
        }

        cost += op.Cost;
        let size = op.Size;
        if (size == 0) {
            switch (op.Opcode) {
                case intcblockOpcode: {
                    [size, foundInts] = readIntConstBlock(program, pc);
                    ints = ints.concat(foundInts);
                    break;
                }
                case bytecblockOpcode: {
                    [size, foundByteArrays] = readByteConstBlock(program, pc);
                    byteArrays = byteArrays.concat(foundByteArrays);
                    break;
                }
                default: {
                    throw new Error("invalid instruction");
                }
            }
        }
        pc += size;
    }

    if (cost > maxCost) {
        throw new Error("program too costly to run");
    }

    return [ints, byteArrays, true];
}

function checkIntConstBlock(program, pc) {
    let [size, unused] = readIntConstBlock(program, pc);
    return size;
}

function readIntConstBlock(program, pc) {
    let size = 1;
    let [numInts, bytesUsed] = parseUvarint(program.slice(pc + size));
    if (bytesUsed <= 0) {
        throw new Error(`could not decode int const block size at pc=${pc + size}`);
    }
    let ints = [];
    size += bytesUsed;
    for (let i = 0; i < numInts; i++) {
        if (pc + size >= program.length) {
            throw new Error("intcblock ran past end of program");
        }
        let [numberFound, bytesUsed] = parseUvarint(program.slice(pc + size));
        if (bytesUsed <= 0) {
            throw new Error(`could not decode int const[${i}] block size at pc=${pc + size}`);
        }
        ints.push(numberFound);
        size += bytesUsed;
    }
    return [size, ints];
}

function checkByteConstBlock(program, pc) {
    let [size, unused] = readByteConstBlock(program, pc);
    return size;
}

function readByteConstBlock(program, pc) {
    let size = 1;
    let [numInts, bytesUsed] = parseUvarint(program.slice(pc + size));
    if (bytesUsed <= 0) {
        throw new Error(`could not decode []byte const block size at pc=${pc + size}`);
    }
    let byteArrays = [];
    size += bytesUsed;
    for (let i = 0; i < numInts; i++) {
        if (pc + size >= program.length) {
            throw new Error("bytecblock ran past end of program");
        }
        let [itemLen, bytesUsed] = parseUvarint(program.slice(pc + size));
        if (bytesUsed <= 0) {
            throw new Error(`could not decode []byte] const[${i}] block size at pc=${pc + size}`);
        }
        size += bytesUsed;
        if (pc + size >= program.length) {
            throw new Error("bytecblock ran past end of program");
        }
        let byteArray = program.slice(pc+size, pc+size+itemLen);
        byteArrays.push(byteArray);
        size += itemLen;
    }
    return [size, byteArrays];
}

function parseUvarint(array) {
    let x = 0;
    let s = 0;
    for (let i = 0; i < array.length; i++) {
        b = array[i];
        if (b < 0x80) {
            if (i > 9 || i == 9 && b > 1) {
                return [0, -(i + 1)];
            }
            return [x | b << s, i + 1];
        }
        x += (b & 0x7f) << s;
        s += 7;
    }
    return [0, 0];
}

module.exports = {
    checkProgram,
    readProgram,
    parseUvarint,
    checkIntConstBlock,
    checkByteConstBlock
};


/***/ }),
/* 49 */
/***/ (function(module) {

module.exports = JSON.parse("{\"EvalMaxVersion\":1,\"LogicSigVersion\":1,\"Ops\":[{\"Opcode\":0,\"Name\":\"err\",\"Cost\":1,\"Size\":1,\"Doc\":\"Error. Panic immediately. This is primarily a fencepost against accidental zero bytes getting compiled into programs.\",\"Groups\":[\"Flow Control\"]},{\"Opcode\":1,\"Name\":\"sha256\",\"Args\":\"B\",\"Returns\":\"B\",\"Cost\":7,\"Size\":1,\"Doc\":\"SHA256 hash of value X, yields [32]byte\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":2,\"Name\":\"keccak256\",\"Args\":\"B\",\"Returns\":\"B\",\"Cost\":26,\"Size\":1,\"Doc\":\"Keccak256 hash of value X, yields [32]byte\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":3,\"Name\":\"sha512_256\",\"Args\":\"B\",\"Returns\":\"B\",\"Cost\":9,\"Size\":1,\"Doc\":\"SHA512_256 hash of value X, yields [32]byte\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":4,\"Name\":\"ed25519verify\",\"Args\":\"BBB\",\"Returns\":\"U\",\"Cost\":1900,\"Size\":1,\"Doc\":\"for (data A, signature B, pubkey C) verify the signature of (\\\"ProgData\\\" || program_hash || data) against the pubkey => {0 or 1}\",\"DocExtra\":\"The 32 byte public key is the last element on the stack, preceeded by the 64 byte signature at the second-to-last element on the stack, preceeded by the data which was signed at the third-to-last element on the stack.\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":8,\"Name\":\"+\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A plus B. Panic on overflow.\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":9,\"Name\":\"-\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A minus B. Panic if B > A.\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":10,\"Name\":\"/\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A divided by B. Panic if B == 0.\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":11,\"Name\":\"*\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A times B. Panic on overflow.\",\"DocExtra\":\"Overflow is an error condition which halts execution and fails the transaction. Full precision is available from `mulw`.\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":12,\"Name\":\"<\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A less than B => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":13,\"Name\":\">\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A greater than B => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":14,\"Name\":\"<=\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A less than or equal to B => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":15,\"Name\":\">=\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A greater than or equal to B => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":16,\"Name\":\"&&\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A is not zero and B is not zero => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":17,\"Name\":\"||\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A is not zero or B is not zero => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":18,\"Name\":\"==\",\"Args\":\"..\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A is equal to B => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":19,\"Name\":\"!=\",\"Args\":\"..\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A is not equal to B => {0 or 1}\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":20,\"Name\":\"!\",\"Args\":\"U\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"X == 0 yields 1; else 0\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":21,\"Name\":\"len\",\"Args\":\"B\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"yields length of byte value X\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":22,\"Name\":\"itob\",\"Args\":\"U\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"converts uint64 X to big endian bytes\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":23,\"Name\":\"btoi\",\"Args\":\"B\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"converts bytes X as big endian to uint64\",\"DocExtra\":\"`btoi` panics if the input is longer than 8 bytes\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":24,\"Name\":\"%\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A modulo B. Panic if B == 0.\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":25,\"Name\":\"|\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A bitwise-or B\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":26,\"Name\":\"&\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A bitwise-and B\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":27,\"Name\":\"^\",\"Args\":\"UU\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"A bitwise-xor B\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":28,\"Name\":\"~\",\"Args\":\"U\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"bitwise invert value X\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":29,\"Name\":\"mulw\",\"Args\":\"UU\",\"Returns\":\"UU\",\"Cost\":1,\"Size\":1,\"Doc\":\"A times B out to 128-bit long result as low (top) and high uint64 values on the stack\",\"Groups\":[\"Arithmetic\"]},{\"Opcode\":32,\"Name\":\"intcblock\",\"Cost\":1,\"Size\":0,\"Doc\":\"load block of uint64 constants\",\"DocExtra\":\"`intcblock` loads following program bytes into an array of integer constants in the evaluator. These integer constants can be referred to by `intc` and `intc_*` which will push the value onto the stack. Subsequent calls to `intcblock` reset and replace the integer constants available to the script.\",\"ImmediateNote\":\"{varuint length} [{varuint value}, ...]\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":33,\"Name\":\"intc\",\"Returns\":\"U\",\"Cost\":1,\"Size\":2,\"Doc\":\"push value from uint64 constants to stack by index into constants\",\"ImmediateNote\":\"{uint8 int constant index}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":34,\"Name\":\"intc_0\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 0 from intcblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":35,\"Name\":\"intc_1\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 1 from intcblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":36,\"Name\":\"intc_2\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 2 from intcblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":37,\"Name\":\"intc_3\",\"Returns\":\"U\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 3 from intcblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":38,\"Name\":\"bytecblock\",\"Cost\":1,\"Size\":0,\"Doc\":\"load block of byte-array constants\",\"DocExtra\":\"`bytecblock` loads the following program bytes into an array of byte string constants in the evaluator. These constants can be referred to by `bytec` and `bytec_*` which will push the value onto the stack. Subsequent calls to `bytecblock` reset and replace the bytes constants available to the script.\",\"ImmediateNote\":\"{varuint length} [({varuint value length} bytes), ...]\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":39,\"Name\":\"bytec\",\"Returns\":\"B\",\"Cost\":1,\"Size\":2,\"Doc\":\"push bytes constant to stack by index into constants\",\"ImmediateNote\":\"{uint8 byte constant index}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":40,\"Name\":\"bytec_0\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 0 from bytecblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":41,\"Name\":\"bytec_1\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 1 from bytecblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":42,\"Name\":\"bytec_2\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 2 from bytecblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":43,\"Name\":\"bytec_3\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push constant 3 from bytecblock to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":44,\"Name\":\"arg\",\"Returns\":\"B\",\"Cost\":1,\"Size\":2,\"Doc\":\"push Args[N] value to stack by index\",\"ImmediateNote\":\"{uint8 arg index N}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":45,\"Name\":\"arg_0\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push Args[0] to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":46,\"Name\":\"arg_1\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push Args[1] to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":47,\"Name\":\"arg_2\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push Args[2] to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":48,\"Name\":\"arg_3\",\"Returns\":\"B\",\"Cost\":1,\"Size\":1,\"Doc\":\"push Args[3] to stack\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":49,\"Name\":\"txn\",\"Returns\":\".\",\"Cost\":1,\"Size\":2,\"ArgEnum\":[\"Sender\",\"Fee\",\"FirstValid\",\"FirstValidTime\",\"LastValid\",\"Note\",\"Lease\",\"Receiver\",\"Amount\",\"CloseRemainderTo\",\"VotePK\",\"SelectionPK\",\"VoteFirst\",\"VoteLast\",\"VoteKeyDilution\",\"Type\",\"TypeEnum\",\"XferAsset\",\"AssetAmount\",\"AssetSender\",\"AssetReceiver\",\"AssetCloseTo\",\"GroupIndex\",\"TxID\"],\"ArgEnumTypes\":\"BUUUUBBBUBBBUUUBUUUBBBUB\",\"Doc\":\"push field from current transaction to stack\",\"DocExtra\":\"FirstValidTime causes the program to fail. The field is reserved for future use.\",\"ImmediateNote\":\"{uint8 transaction field index}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":50,\"Name\":\"global\",\"Returns\":\".\",\"Cost\":1,\"Size\":2,\"ArgEnum\":[\"MinTxnFee\",\"MinBalance\",\"MaxTxnLife\",\"ZeroAddress\",\"GroupSize\"],\"ArgEnumTypes\":\"UUUBU\",\"Doc\":\"push value from globals to stack\",\"ImmediateNote\":\"{uint8 global field index}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":51,\"Name\":\"gtxn\",\"Returns\":\".\",\"Cost\":1,\"Size\":3,\"ArgEnum\":[\"Sender\",\"Fee\",\"FirstValid\",\"FirstValidTime\",\"LastValid\",\"Note\",\"Lease\",\"Receiver\",\"Amount\",\"CloseRemainderTo\",\"VotePK\",\"SelectionPK\",\"VoteFirst\",\"VoteLast\",\"VoteKeyDilution\",\"Type\",\"TypeEnum\",\"XferAsset\",\"AssetAmount\",\"AssetSender\",\"AssetReceiver\",\"AssetCloseTo\",\"GroupIndex\",\"TxID\"],\"ArgEnumTypes\":\"BUUUUBBBUBBBUUUBUUUBBBUB\",\"Doc\":\"push field to the stack from a transaction in the current transaction group\",\"DocExtra\":\"for notes on transaction fields available, see `txn`. If this transaction is _i_ in the group, `gtxn i field` is equivalent to `txn field`\",\"ImmediateNote\":\"{uint8 transaction group index}{uint8 transaction field index}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":52,\"Name\":\"load\",\"Returns\":\".\",\"Cost\":1,\"Size\":2,\"Doc\":\"copy a value from scratch space to the stack\",\"ImmediateNote\":\"{uint8 position in scratch space to load from}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":53,\"Name\":\"store\",\"Args\":\".\",\"Cost\":1,\"Size\":2,\"Doc\":\"pop a value from the stack and store to scratch space\",\"ImmediateNote\":\"{uint8 position in scratch space to store to}\",\"Groups\":[\"Loading Values\"]},{\"Opcode\":64,\"Name\":\"bnz\",\"Args\":\"U\",\"Cost\":1,\"Size\":3,\"Doc\":\"branch if value X is not zero\",\"DocExtra\":\"The `bnz` instruction opcode 0x40 is followed by two immediate data bytes which are a high byte first and low byte second which together form a 16 bit offset which the instruction may branch to. For a bnz instruction at `pc`, if the last element of the stack is not zero then branch to instruction at `pc + 3 + N`, else proceed to next instruction at `pc + 3`. Branch targets must be well aligned instructions. (e.g. Branching to the second byte of a 2 byte op will be rejected.) Branch offsets are currently limited to forward branches only, 0-0x7fff. A future expansion might make this a signed 16 bit integer allowing for backward branches and looping.\",\"ImmediateNote\":\"{0..0x7fff forward branch offset, big endian}\",\"Groups\":[\"Flow Control\"]},{\"Opcode\":72,\"Name\":\"pop\",\"Args\":\".\",\"Cost\":1,\"Size\":1,\"Doc\":\"discard value X from stack\",\"Groups\":[\"Flow Control\"]},{\"Opcode\":73,\"Name\":\"dup\",\"Args\":\".\",\"Returns\":\"..\",\"Cost\":1,\"Size\":1,\"Doc\":\"duplicate last value on stack\",\"Groups\":[\"Flow Control\"]}]}");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

const client = __webpack_require__(14);
const ai = __webpack_require__(51);
const hc = __webpack_require__(52);
const blk = __webpack_require__(53);
const pti = __webpack_require__(54);
const pt = __webpack_require__(55);
const ptba = __webpack_require__(56);
const srt = __webpack_require__(57);
const status = __webpack_require__(58);
const sab = __webpack_require__(59);
const sp = __webpack_require__(60);
const supply = __webpack_require__(61);
const versions = __webpack_require__(62);

class AlgodClient {
    constructor(token = '', baseServer = "http://r2.algorand.network", port = 4180, headers = {}) {
        // workaround to allow backwards compatibility for multiple headers
        let tokenHeader = token;
        if (typeof (tokenHeader) == 'string') {
            tokenHeader = {"X-Algo-API-Token": tokenHeader};
        }

        // Get client
        let c = new client.HTTPClient(tokenHeader, baseServer, port, headers);

        this.healthCheck = function () {
            return new hc.HealthCheck(c);
        };

        this.versionsCheck = function () {
            return new versions.Versions(c)
        };

        this.sendRawTransaction = function(stx_or_stxs) {
            return new srt.SendRawTransaction(c, stx_or_stxs)
        };

        this.accountInformation = function(account) {
            return new ai.AccountInformation(c, account);
        };

        this.block = function(roundNumber) {
            return new blk.Block(c, roundNumber)
        };

        this.pendingTransactionInformation = function(txid) {
            return new pti.PendingTransactionInformation(c, txid)
        };

        this.pendingTransactionsInformation = function() {
            return new pt.PendingTransactions(c)
        };

        this.pendingTransactionByAddress = function(address) {
            return new ptba.PendingTransactionsByAddress(c, address)
        };

        this.status = function() {
            return new status.Status(c)
        };

        this.statusAfterBlock = function (round) {
            return new sab.StatusAfterBlock(c, round)
        };

        this.getTransactionParams = function () {
            return new sp.SuggestedParams(c)
        };

        this.supply = function () {
            return new supply.Supply(c)
        };
    }
}


module.exports = { AlgodClient };


/***/ }),
/* 51 */
/***/ (function(module, exports) {

class AccountInformation {
	constructor(c, account) {
	    this.c = c;
        this.account = account;
    }

    /**
     * accountInformation returns the passed account's information
     * @param headers, optional
     * @returns {Promise<*>}
     */
    async do(headers={}) {
        let res = await this.c.get("/v2/accounts/" + this.account, {}, headers);
        return res.body;
    }
}

module.exports = { AccountInformation };


/***/ }),
/* 52 */
/***/ (function(module, exports) {


class HealthCheck {
	constructor(c) {
		this.c = c
	}

	/**
	 * healthCheck returns an empty object iff the node is running
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let res = await this.c.get("/health", {}, headers);
		return res.body;
	}
}

module.exports = { HealthCheck };


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

const encoding = __webpack_require__(6)

class Block {
	constructor(c, roundNumber){
		if (!Number.isInteger(roundNumber)) throw Error("roundNumber should be an integer");
		this.c = c;
		this.round = roundNumber;
		this.query = {"format": "msgpack"}
	}

	/**
	 * block gets the block info for the given round. this call may block
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let res = await this.c.get("/v2/blocks/" + this.round, this.query, headers);
		if (res.body) {
			return encoding.decode(res.body);
		}
		return undefined;
	}
}

module.exports = { Block };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

const encoding = __webpack_require__(6)

class PendingTransactionInformation {
	constructor(c, txid) {
		this.c = c;
		this.txid = txid;
		this.query = {};
		this.query["format"] = "msgpack";
	}

	/**
	 * returns the transaction information for a specific txid of a pending transaction
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}){
		let res = await this.c.get("/v2/transactions/pending/" + this.txid, this.query, headers);
		if (res.body) {
			return encoding.decode(res.body);
		}
		return undefined;
	};

	// max sets the maximum number of txs to return
	max(max){
		this.query["max"] = max;
		return this;
	}
}

module.exports = { PendingTransactionInformation };


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

const encoding = __webpack_require__(6)

class PendingTransactions {
	constructor(c) {
		this.c = c;
		this.query = {};
		this.query["format"] = "msgpack";
	}

	/**
	 * pendingTransactionsInformation returns transactions that are pending in the pool
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let res = await this.c.get("/v2/transactions/pending", this.query, headers);
		if (res.body) {
			return encoding.decode(res.body);
		}
		return undefined;
	}

	// max sets the maximum number of txs to return
	max(max){
		this.query["max"] = max;
		return this;
	}
}

module.exports = { PendingTransactions };


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

const encoding = __webpack_require__(6)

class PendingTransactionsByAddress {
	constructor(c, address) {
		this.c = c;
		this.address = address;
		this.query = {"format": "msgpack"};
	}

	/**
	 * returns all transactions for a PK [addr] in the [first, last] rounds range.
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let res = await this.c.get("/v2/accounts/" + this.address + "/transactions/pending", this.query, headers);
		if (res.body) {
			return encoding.decode(res.body);
		}
		return undefined;
	}

	// max sets the maximum number of txs to return
	max(max){
		this.query["max"] = max;
		return this;
	}
}

module.exports = { PendingTransactionsByAddress };


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {class SendRawTransaction {
	constructor(c, stx_or_stxs) {
		let forPosting = stx_or_stxs;
		if (Array.isArray(stx_or_stxs)) {
			forPosting = Array.prototype.concat(...stx_or_stxs.map(arr => Array.from(arr)));
		}
		this.txnBytesToPost = forPosting;
		this.c = c;
	}

	/**
	 * Sets the default header (if not previously set) for sending a raw
	 * transaction.
	 * @param headers
	 * @returns {*}
	 */
	 setSendTransactionHeaders(headers) {
		let hdrs = headers;
		if (Object.keys(hdrs).every(key=> key.toLowerCase() !== 'content-type')) {
			hdrs = {...headers};
			hdrs['Content-Type'] = 'application/x-binary';
		}
		return hdrs;
	}

	/**
	 * broadcasts the passed signed txns to the network
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let txHeaders = this.setSendTransactionHeaders(headers);
		let res = await this.c.post("/v2/transactions", Buffer.from(this.txnBytesToPost), txHeaders);
		return res.body;
	}
}

module.exports = { SendRawTransaction };

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5).Buffer))

/***/ }),
/* 58 */
/***/ (function(module, exports) {

class Status {
	constructor(c) {
		this.c = c
	}

	/**
	 * retrieves the StatusResponse from the running node
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let res = await this.c.get("/v2/status", {}, headers);
		return res.body;
	};
}

module.exports = { Status };


/***/ }),
/* 59 */
/***/ (function(module, exports) {

class StatusAfterBlock {
	constructor(c, round) {
		this.c = c;
		if (!Number.isInteger(round)) throw Error("round should be an integer");
		this.round = round;
	}

	/**
	 * waits for round roundNumber to occur then returns the StatusResponse for this round.
	 * This call blocks
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}){
		let res = await this.c.get("/v2/status/wait-for-block-after/" + this.round, {}, headers);
		return res.body;
	};
}

module.exports = { StatusAfterBlock };


/***/ }),
/* 60 */
/***/ (function(module, exports) {

class SuggestedParams {
	constructor(c) {
		this.c = c;
	}

	/**
	 * returns the common needed parameters for a new transaction, in a format the transaction builder expects
	 * @param headers, optional
	 * @returns {Object}
	 */
	async do(headers={}) {
		let res = await this.c.get("/v2/transactions/params", {}, headers);
		return {
			"flatFee": false,
			"fee": res.body['fee'],
			"firstRound": res.body['last-round'],
			"lastRound": res.body['last-round'] + 1000,
			"genesisID": res.body['genesis-id'],
			"genesisHash": res.body['genesis-hash'],
		};
	};
}

module.exports = { SuggestedParams };


/***/ }),
/* 61 */
/***/ (function(module, exports) {

class Supply {
	constructor(c) {
		this.c = c;
	}

	/**
	 * gets the supply details for the specified node's ledger
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let res = await this.c.get("/v2/ledger/supply", {}, headers);
		return res.body;
	};
}

module.exports = { Supply };


/***/ }),
/* 62 */
/***/ (function(module, exports) {

class Versions {
	constructor(c) {
		this.c = c
	}

	/**
	 * retrieves the VersionResponse from the running node
	 * @param headers, optional
	 * @returns {Promise<*>}
	 */
	async do(headers={}) {
		let res = await c.get("/versions", {}, headers);
		return res.body;
	};
}

module.exports = { Versions };


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

const client = __webpack_require__(14);
const mhc = __webpack_require__(64);
const lacbid = __webpack_require__(65);
const lact = __webpack_require__(66);
const lasb = __webpack_require__(67);
const lasbid = __webpack_require__(68);
const last = __webpack_require__(69);
const lb = __webpack_require__(70);
const sfas = __webpack_require__(71);
const sft = __webpack_require__(72);
const sac = __webpack_require__(73);


class IndexerClient {
    constructor(token, baseServer = "http://127.0.0.1", port = 8080, headers={}) {
        // workaround to allow backwards compatibility for multiple headers
        let tokenHeader = token;
        if (typeof (tokenHeader) == 'string') {
            tokenHeader = {"X-Indexer-API-Token": tokenHeader};
        }

        let c = new client.HTTPClient(tokenHeader, baseServer, port, headers);

        this.makeHealthCheck = function() {
            return new mhc.MakeHealthCheck(c);
        };

        this.lookupAssetBalances = function(index) {
            return new lasb.LookupAssetBalances(c, index);
        };

        this.lookupAssetTransactions = function (index) {
            return new last.LookupAssetTransactions(c, index);
        };

        this.lookupAccountTransactions = function(account) {
            return new lact.LookupAccountTransactions(c, account);
        };

        this.lookupBlock = function(round) {
            return new lb.LookupBlock(c, round);
        };

        this.lookupAccountByID = function(account){
            return new lacbid.LookupAccountByID(c, account);
        };

        this.lookupAssetByID = function(index) {
            return new lasbid.LookupAssetByID(c, index);
        };

        this.searchAccounts = function() {
            return new sac.SearchAccounts(c);
        };

        this.searchForTransactions = function() {
            return new sft.SearchForTransactions(c);
        };

        this.searchForAssets = function() {
            return new sfas.SearchForAssets(c);
        };
    }
}
module.exports = {IndexerClient};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

class MakeHealthCheck{
	constructor(c) {
		this.c = c;
	}

	/**
	 * returns the health object for the service
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do (headers = {}) {
		let res = await this.c.get("/health", {}, headers);
		return res.body;
	};
}

module.exports = {MakeHealthCheck};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

class LookupAccountByID {
	constructor(c, account) {
		this.c = c;
		this.account = account;
		this.query = {}
	}

	/**
	 * returns information about the identified account
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do (headers = {}) {
		let res = await this.c.get("/v2/accounts/" + this.account, this.query, headers);
		return res.body;
	};

	round(round) {
		this.query["round"] = round;
		return this;
	}
}

module.exports = {LookupAccountByID};


/***/ }),
/* 66 */
/***/ (function(module, exports) {


class LookupAccountTransactions {
	constructor(c, account) {
		this.c = c;
		this.account = account;
		this.query = {}
	}

	/**
	 * returns transactions relating to the given account
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do(headers = {}) {
		let res = await this.c.get("/v2/accounts/" + this.account + "/transactions", this.query, headers);
		return res.body;
	};

	// notePrefix to filter with, as uint8array
	notePrefix(prefix) {
		this.query["note-prefix"] = prefix;
		return this;
	}

	// txtype to filter with, as string
	txType(type) {
		this.query["tx-type"] = type;
		return this;
	}

	// sigtype to filter with, as string
	sigType(type) {
		this.query["sig-type"] = type;
		return this;
	}

	// txid to filter with, as string
	txid(txid) {
		this.query["txid"] = txid;
		return this;
	}

	// round to filter with, as int
	round(round) {
		this.query["round"] = round;
		return this;
	}

	// min round to filter with, as int
	minRound(round) {
		this.query["min-round"] = round;
		return this;
	}

	// max round to filter with, as int
	maxRound(round) {
		this.query["max-round"] = round;
		return this;
	}

	// asset ID to filter with, as int
	assetID(id) {
		this.query["asset-id"] = id;
		return this;
	}

	// limit for filter, as int
	limit(limit) {
		this.query["limit"] = limit;
		return this;
	}

	// before-time to filter with, as rfc3339 string
	beforeTime(before) {
		this.query["before-time"] = before;
		return this;
	}

	// after-time to filter with, as rfc3339 string
	afterTime(after) {
		this.query["after-time"] = after;
		return this;
	}

	// filtered results should have an amount greater than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units
	currencyGreaterThan(greater) {
		this.query["currency-greater-than"] = greater;
		return this;
	}

	// filtered results should have an amount less than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units
	currencyLessThan(lesser) {
		this.query["currency-less-than"] = lesser;
		return this;
	}

	// used for pagination
	nextToken(nextToken) {
		this.query['next'] = nextToken;
		return this;
	}
}

module.exports = {LookupAccountTransactions};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

class LookupAssetBalances {
	constructor(c, index) {
		this.c = c;
		this.index = index;
		this.query = {}
	}

	/**
	 * returns holder balances for the given asset
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do(headers = {}) {
		let res = await this.c.get("/v2/assets/" + this.index + "/balances", this.query, headers);
		return res.body;
	};

	// limit for filter, as int
	limit(limit) {
		this.query["limit"] = limit;
		return this;
	}

	// round to filter with, as int
	round(round) {
		this.query["round"] = round;
		return this;
	}

	// filtered results should have an amount greater than this value, as int, with units representing the asset
	currencyGreaterThan(greater) {
		this.query["currency-greater-than"] = greater;
		return this;
	}

	// filtered results should have an amount less than this value, as int, with units representing the asset units
	currencyLessThan(lesser) {
		this.query["currency-less-than"] = lesser;
		return this;
	}

	// used for pagination
	nextToken(nextToken) {
		this.query['next'] = nextToken;
		return this;
	}
}

module.exports = {LookupAssetBalances};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

class LookupAssetByID {
	constructor(c, index){
		this.c = c;
		this.index = index;
	}

	/**
	 * returns information about the passed asset
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do(headers = {}) {
		let res = await this.c.get("/v2/assets/" + this.index, {}, headers);
		return res.body;
	};
}

module.exports = {LookupAssetByID};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

class LookupAssetTransactions {
	constructor (c, index) {
		this.c = c;
		this.index = index;
		this.query = {};
	}

	/**
	 * returns information about the passed asset
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do(headers = {}) {
		let res = await this.c.get("/v2/assets/" + this.index + "/transactions", this.query, headers);
		return res.body;
	};

	// notePrefix to filter with, as uint8array
	notePrefix(prefix) {
		this.query["note-prefix"] = prefix;
		return this;
	}

	// txtype to filter with, as string
	txType(type) {
		this.query["tx-type"] = type;
		return this;
	}

	// sigtype to filter with, as string
	sigType(type) {
		this.query["sig-type"] = type;
		return this;
	}

	// txid to filter with, as string
	txid(txid) {
		this.query["txid"] = txid;
		return this;
	}

	// round to filter with, as int
	round(round) {
		this.query["round"] = round;
		return this;
	}

	// min round to filter with, as int
	minRound(round) {
		this.query["min-round"] = round;
		return this;
	}

	// max round to filter with, as int
	maxRound(round) {
		this.query["max-round"] = round;
		return this;
	}

	// asset ID to filter with, as int
	assetID(id) {
		this.query["asset-id"] = id;
		return this;
	}

	// limit for filter, as int
	limit(limit) {
		this.query["limit"] = limit;
		return this;
	}

	// before-time to filter with, as rfc3339 string
	beforeTime(before) {
		this.query["before-time"] = before;
		return this;
	}

	// after-time to filter with, as rfc3339 string
	afterTime(after) {
		this.query["after-time"] = after;
		return this;
	}

	// filtered results should have an amount greater than this value, as int, representing asset units
	currencyGreaterThan(greater) {
		this.query["currency-greater-than"] = greater;
		return this;
	}

	// filtered results should have an amount less than this value, as int, representing asset units
	currencyLessThan(lesser) {
		this.query["currency-less-than"] = lesser;
		return this;
	}

	// combined with address, defines what address to filter on, as string
	addressRole(role) {
		this.query["address-role"] = role;
		return this;
	}

	// address to filter on as string
	address(address) {
		this.query["address"] = address;
		return this;
	}

	// whether or not to consider the close-to field as a receiver when filtering transactions, as bool. set to true to ignore close-to
	excludeCloseTo(exclude) {
		this.query["exclude-close-to"] = exclude;
		return this;
	}

	// used for pagination
	nextToken(nextToken) {
		this.query['next'] = nextToken;
		return this;
	}
}

module.exports = {LookupAssetTransactions};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

class LookupBlock {
	constructor(c, round) {
		this.c = c;
		this.round = round;
	}

	/**
	 * returns the block for the passed round
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do (headers = {}) {
		let res = await this.c.get("/v2/blocks/" + this.round, {}, headers);
		return res.body;
	};
}

module.exports = {LookupBlock};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

class SearchForAssets{
	constructor(c) {
		this.c = c;
		this.query = {}
	}

	/**
	 * returns information about indexed assets
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do(headers = {}) {
		let res = await this.c.get("/v2/assets", this.query, headers);
		return res.body;
	};

	// limit for filter, as int
	limit(limit) {
		this.query["limit"] = limit;
		return this;
	}

	// asset creator address for filter, as string
	creator(creator) {
		this.query["creator"] = creator;
		return this;
	}

	// asset name for filter, as string
	name(name) {
		this.query["name"] = name;
		return this;
	}

	// asset unit name for filter, as string
	unit(unit) {
		this.query["unit"] = unit;
		return this;
	}

	// asset ID for filter, as int
	index(index) {
		this.query["asset-id"] = index;
		return this;
	}

	// used for pagination
	nextToken(nextToken) {
		this.query['next'] = nextToken;
		return this;
	}
}

module.exports = {SearchForAssets};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

class SearchForTransactions {
	constructor(c) {
		this.c = c;
		this.query = {};
	}

	/**
	 * returns information about indexed transactions
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do(headers = {}) {
		let res = await this.c.get("/v2/transactions", this.query, headers);
		return res.body;
	};

	// notePrefix to filter with, as uint8array
	notePrefix(prefix) {
		this.query["note-prefix"] = prefix;
		return this;
	}

	// txtype to filter with, as string
	txType(type) {
		this.query["tx-type"] = type;
		return this;
	}

	// sigtype to filter with, as string
	sigType(type) {
		this.query["sig-type"] = type;
		return this;
	}

	// txid to filter with, as string
	txid(txid) {
		this.query["txid"] = txid;
		return this;
	}

	// round to filter with, as int
	round(round) {
		this.query["round"] = round;
		return this;
	}

	// min round to filter with, as int
	minRound(round) {
		this.query["min-round"] = round;
		return this;
	}

	// max round to filter with, as int
	maxRound(round) {
		this.query["max-round"] = round;
		return this;
	}

	// asset ID to filter with, as int
	assetID(id) {
		this.query["asset-id"] = id;
		return this;
	}

	// limit for filter, as int
	limit(limit) {
		this.query["limit"] = limit;
		return this;
	}

	// before-time to filter with, as rfc3339 string
	beforeTime(before) {
		this.query["before-time"] = before;
		return this;
	}

	// after-time to filter with, as rfc3339 string
	afterTime(after) {
		this.query["after-time"] = after;
		return this;
	}

	// filtered results should have an amount greater than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units
	currencyGreaterThan(greater) {
		this.query["currency-greater-than"] = greater;
		return this;
	}

	// filtered results should have an amount less than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units
	currencyLessThan(lesser) {
		this.query["currency-less-than"] = lesser;
		return this;
	}

	// combined with address, defines what address to filter on, as string
	addressRole(role) {
		this.query["address-role"] = role;
		return this;
	}

	// address to filter with, as string
	address(address) {
		this.query["address"] = address;
		return this;
	}

	// whether or not to consider the close-to field as a receiver when filtering transactions, as bool. set to true to ignore close-to
	excludeCloseTo(exclude) {
		this.query["exclude-close-to"] = exclude;
		return this;
	}

	// used for pagination
	nextToken(nextToken) {
		this.query['next'] = nextToken;
		return this;
	}
}

module.exports = {SearchForTransactions};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

class SearchAccounts {
	constructor(c) {
		this.c = c;
		this.query = {};
	}

	/**
	 * returns information about indexed accounts
	 * @param headers, optional
	 * @returns Promise<*>
	 */
	async do(headers = {}) {
		let res = await this.c.get("/v2/accounts", this.query, headers);
		return res.body;
	};

	// filtered results should have an amount greater than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units
	currencyGreaterThan(greater) {
		this.query["currency-greater-than"] = greater;
		return this;
	}

	// filtered results should have an amount less than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units
	currencyLessThan(lesser) {
		this.query["currency-less-than"] = lesser;
		return this;
	}

	// limit for filter, as int
	limit(limit) {
		this.query["limit"] = limit;
		return this;
	}

	// asset ID to filter with, as int
	assetID(id) {
		this.query["asset-id"] = id;
		return this;
	}

	// used for pagination
	nextToken(nextToken) {
		this.query['next'] = nextToken;
		return this;
	}

	// specific round to search
	round(round) {
		this.query['round'] = round;
		return this;
	}
}

module.exports = {SearchAccounts};


/***/ }),
/* 74 */,
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../storage/dist/extensionStorage.js
var extensionStorage = __webpack_require__(10);
var extensionStorage_default = /*#__PURE__*/__webpack_require__.n(extensionStorage);

// EXTERNAL MODULE: ./src/background/encryptionWrap.ts
var encryptionWrap = __webpack_require__(1);

// CONCATENATED MODULE: ./src/background/account/createAccount.js
const algosdk = __webpack_require__(16);

function createNewAccount(passphrase) {
  var keys = algosdk.generateAccount();
  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  return [mnemonic, keys.addr];
}
// CONCATENATED MODULE: ./src/background/algosigner.js





document.addEventListener('DOMContentLoaded', () => {
  const _defaultPassphrase = "Password1";
  const _accountKey = "defaultwalletname";
  let dev_area = document.getElementById('dev_area');
  let public_key = document.getElementById('public_key');
  let keywrap = document.getElementById('keywrap');
  let input_password = document.getElementById('input_password');
  let login_button = document.getElementById('login_button');
  let create_wallet = document.getElementById('create_wallet'); // Get input passphrase

  function getInputPassphrase() {
    return input_password && input_password.value !== "" ? input_password.value : _defaultPassphrase;
  }

  ;

  if (login_button) // Button exists on extension, so load the others. Testing only.
    {
      // Testing Method: Get storage.local information for extension
      get_local.onclick = function (element) {
        extensionStorage_default.a.getStorageLocal(result => {
          dev_area.value = result;
        });
      }; // Testing Method: Delete all storage.local for extension


      clear_local.onclick = function (element) {
        extensionStorage_default.a.clearStorageLocal(result => {
          console.log("Clear result: " + result);
          dev_area.value = result ? 'Success' : 'Failed';
        });
      }; // Unlock the storage.local object


      login_button.onclick = function (element) {
        dev_area.value = 'Attempting unlock...';
        encryptionWrap["a" /* default */].unlock({
          passphrase: encryptionWrap["a" /* default */].stringToUint8ArrayBuffer(getInputPassphrase())
        }, unlockedValue => {
          if (unlockedValue && unlockedValue['STATUS']) {
            dev_area.value = unlockedValue['STATUS'];
          } else if (unlockedValue) {
            dev_area.value = unlockedValue;
          } else dev_area.value = `Login failed.`;
        });
      }; // Testing Method: Deleted current storage.local, create a new mnemonic, and save


      create_wallet.onclick = function (element) {
        dev_area.value = "";
        let accountArray = createNewAccount(getInputPassphrase());
        dev_area.value += `Mnemonic:\n${accountArray[0]}`;
        public_key.textContent = accountArray[1];
        keywrap.classList.remove("hidden-row");
        encryptionWrap["a" /* default */].lock({
          passphrase: encryptionWrap["a" /* default */].stringToUint8ArrayBuffer(getInputPassphrase()),
          encryptObject: encryptionWrap["a" /* default */].stringToUint8ArrayBuffer(JSON.stringify(accountArray))
        }, isSuccessful => {
          console.log(`Lock was successful? ${isSuccessful}`);

          if (isSuccessful) {
            dev_area.value += `\n\nLocked value set.`;
            login_button.classList.remove("hidden-row");
          } else {
            dev_area.value += `\n\nLocked value failed to save.`;
          }
        });
      }; // Check default account key in local storage


      extensionStorage_default.a.noAccountExistsCheck(_accountKey, isAccount => {
        if (!isAccount) {
          dev_area.value = 'No previous account found, use Create New Wallet.';
          login_button.classList.add("hidden-row");
        }
      });
    }
}, false);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(2);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// CONCATENATED MODULE: ./src/background/utils/environment.ts
// TODO, this should contain a set of environment variables
// loaded from config files, command arguments or browser contexts
const PLATFORM = 'chrome';
// CONCATENATED MODULE: ../common/src/types.ts
let RequestErrors;

(function (RequestErrors) {
  RequestErrors[RequestErrors["None"] = 0] = "None";
  RequestErrors["NotAuthorized"] = "[RequestErrors.NotAuthorized] The extension user does not authorize the request.";
  RequestErrors["InvalidTransactionParams"] = "[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.";
  RequestErrors["UnsupportedAlgod"] = "[RequestErrors.UnsupportedAlgod] The provided method is not supported.";
  RequestErrors["UnsupportedLedger"] = "[RequestErrors.UnsupportedLedger] The provided ledger is not supported.";
  RequestErrors["Undefined"] = "[RequestErrors.Undefined] An undefined error occurred.";
})(RequestErrors || (RequestErrors = {}));
// EXTERNAL MODULE: ../common/src/messaging/types.ts
var types = __webpack_require__(0);

// EXTERNAL MODULE: ./src/background/messaging/types.ts
var messaging_types = __webpack_require__(3);

// EXTERNAL MODULE: ./src/background/messaging/internalMethods.ts
var internalMethods = __webpack_require__(4);

// EXTERNAL MODULE: ./src/background/config.ts
var config = __webpack_require__(8);

// CONCATENATED MODULE: ./src/background/messaging/task.ts


const task_algosdk = __webpack_require__(16);








class task_Task {
  static isAuthorized(origin) {
    if (task_Task.authorized_pool.indexOf(origin) > -1) {
      return true;
    }

    return false;
  }

  static build(request) {
    let body = request.body;
    let method = body.method;
    return new Promise((resolve, reject) => {
      task_Task.methods().public[method](request, resolve, reject);
    });
  }

  static methods() {
    return {
      'public': {
        // authorization
        [types["a" /* JsonRpcMethod */].Authorization]: d => {
          // If access was already granted, authorize connection.
          if (task_Task.isAuthorized(d.origin)) {
            d.response = {};
            api_MessageApi.send(d);
          } else {
            chrome.windows.create({
              url: chrome.runtime.getURL("index.html#/authorize"),
              type: "popup",
              focused: true,
              width: 400 + 12,
              height: 550 + 34
            }, function (w) {
              if (w) {
                task_Task.request = {
                  window_id: w.id,
                  message: d
                };
                setTimeout(function () {
                  console.log('SENDING MESSAGE AFTER WINDOW CREATION', d);
                  chrome.runtime.sendMessage(d);
                }, 100);
              }
            });
          }
        },
        // sign-transaction
        [types["a" /* JsonRpcMethod */].SignTransaction]: (d, resolve, reject) => {
          const {
            from,
            to,
            fee,
            passphrase,
            ledger,
            amount,
            firstRound,
            lastRound,
            genesisID,
            genesisHash,
            note
          } = d.body.params;
          const params = config["a" /* Settings */].getBackendParams(messaging_types["c" /* Ledger */].TestNet, messaging_types["a" /* API */].Algod);
          const algod = new task_algosdk.Algodv2(params.apiKey, params.url, params.port);
          const unlockParam = {
            passphrase: encryptionWrap["a" /* default */].stringToUint8ArrayBuffer(passphrase)
          };
          encryptionWrap["a" /* default */].unlock(unlockParam, async unlockedValue => {
            if ('error' in unlockedValue) {
              reject(unlockedValue);
            }

            let account; // Find address to send algos from

            for (var i = unlockedValue[ledger].length - 1; i >= 0; i--) {
              if (unlockedValue[ledger][i].address === from) {
                account = unlockedValue[ledger][i];
                break;
              }
            }

            var recoveredAccount = task_algosdk.mnemonicToSecretKey(account.mnemonic);
            let params = await algod.getTransactionParams().do();
            let txn = {
              "from": from,
              "to": to,
              "fee": params.fee,
              "amount": +amount,
              "firstRound": params.firstRound,
              "lastRound": params.lastRound,
              "genesisID": params.genesisID,
              "genesisHash": params.genesisHash,
              "note": new Uint8Array(0)
            };
            let signedTxn = task_algosdk.signTransaction(txn, recoveredAccount.sk);
            console.log(signedTxn);
            d.response = signedTxn;
            console.log('RESOLVING', d);
            resolve(d);
          });
        },
        // algod
        [types["a" /* JsonRpcMethod */].Algod]: (d, resolve, reject) => {
          const {
            params
          } = d.body;
          const conn = config["a" /* Settings */].getBackendParams(params.ledger, messaging_types["a" /* API */].Algod);
          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;
          fetch(`${url}${params.path}`, {
            headers: conn.apiKey
          }).then(async response => {
            d.response = await response.json();
            resolve(d);
          }).catch(error => {
            reject(error);
          });
        },
        // Indexer
        [types["a" /* JsonRpcMethod */].Indexer]: (d, resolve, reject) => {
          const {
            params
          } = d.body;
          const conn = config["a" /* Settings */].getBackendParams(params.ledger, messaging_types["a" /* API */].Indexer);
          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;
          fetch(`${url}${params.path}`, {
            headers: conn.apiKey
          }).then(async response => {
            d.response = await response.json();
            resolve(d);
          }).catch(error => {
            reject(error);
          });
        },
        // Accounts
        [types["a" /* JsonRpcMethod */].Accounts]: (d, resolve, reject) => {
          d.response = internalMethods["a" /* InternalMethods */].getHelperSession()[d.body.params.ledger];
          resolve(d);
        }
      },
      'private': {
        // authorization-allow
        [types["a" /* JsonRpcMethod */].AuthorizationAllow]: () => {
          let auth = task_Task.request;
          let message = auth.message;
          chrome.windows.remove(auth.window_id);
          task_Task.authorized_pool.push(message.origin);
          task_Task.request = {};
          setTimeout(() => {
            // Response needed
            message.response = {};
            api_MessageApi.send(message);
          }, 1000);
        },
        // authorization-deny
        [types["a" /* JsonRpcMethod */].AuthorizationDeny]: () => {
          let auth = task_Task.request;
          let message = auth.message;
          auth.message.error = RequestErrors.NotAuthorized;
          chrome.windows.remove(auth.window_id);
          task_Task.request = {};
          setTimeout(() => {
            api_MessageApi.send(message);
          }, 100);
        }
      },
      'extension': {
        [types["a" /* JsonRpcMethod */].CreateWallet]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].CreateWallet](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].CreateAccount]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].CreateAccount](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].Login]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].Login](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].GetSession]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].GetSession](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].SaveAccount]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].SaveAccount](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].ImportAccount]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].ImportAccount](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].DeleteAccount]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].DeleteAccount](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].Transactions]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].Transactions](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].AccountDetails]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].AccountDetails](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].AssetDetails]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].AssetDetails](request, sendResponse);
        },
        [types["a" /* JsonRpcMethod */].SignSendTransaction]: (request, sendResponse) => {
          return internalMethods["a" /* InternalMethods */][types["a" /* JsonRpcMethod */].SignSendTransaction](request, sendResponse);
        }
      }
    };
  }

} // import {Settings,Backend} from '../config';
// import {MessageApi} from './api';
// import Helper from '../utils/helper';
// import {RequestErrors} from '@algosigner/common/types';
// import {JsonRpcMethod} from '@algosigner/common/messaging/types';
// // !Everything below is just theoretical
// let algosdk: any;
// let algod_client: any;
// async function load_sdk() {
//     algosdk = await import(/* webpackChunkName: "algosdk" */'@algosdk');
//     switch(Settings.backend) {
//         case Backend.Purestake:
//                 algod_client = new algosdk.Algod(
//                 Settings.backend_settings[Settings.backend][Settings.ledger],
//                 Settings.backend_settings[Settings.backend].api_key
//             );
//             break;
//         case Backend.Algod:
//                 algod_client = new algosdk.Algod(
//                 Settings.backend_settings[Settings.backend][Settings.ledger].token,
//                 Settings.backend_settings[Settings.backend][Settings.ledger].server,
//                 Settings.backend_settings[Settings.backend][Settings.ledger].port
//             );
//             break;
//     }
// }
// load_sdk();
// export class Task {
//     private static request: {[key: string]: any} = {};
//     private static authorized_pool: Array<string> = [];
//     public static isAuthorized(origin: string): boolean {
//         if(Task.authorized_pool.indexOf(origin) > -1 ){
//             return true;
//         }
//         return false;
//     }
//     public static build(request: any) {
//         let body = request.body;
//         let method = body.method;
//         return new Promise((resolve,reject) => {
//             Task.methods().public[method](request)
//             .then((r: any) => {
//                 request.response = r;
//                 resolve(request);
//             })
//             .catch((e: RequestErrors) => {
//                 request.error = e;
//                 reject(request);
//             });
//         });
//     }
//     public static methods(): {
//         [key: string]: {
//             [JsonRpcMethod: string]: Function
//         }
//     } {
//         return {
//             'public': {
//                 // authorization
//                 [JsonRpcMethod.Authorization]: (d: any) => {
//                     if(Task.isAuthorized(d.origin)){
//                         d.response = {};
//                         MessageApi.send(d);
//                     } else {
//                         chrome.windows.create({
//                             url: chrome.runtime.getURL("authorization.html"),
//                             type: "popup",
//                             focused: true,
//                             width:480,
//                             height:640
//                         }, function (w) {
//                             if(w) {
//                                 Task.request = {
//                                     window_id: w.id,
//                                     message:d
//                                 };
//                                 setTimeout(function(){
//                                     chrome.runtime.sendMessage(d);
//                                 },100);
//                             }
//                         });
//                     }
//                 },
//                 // sign-transaction
//                 // !this impl is just theoretical.
//                 [JsonRpcMethod.SignTransaction]: async (
//                     request: any
//                 ) => {
//                     let params = request.body.params;
//                     // TODO should check length of params' keys and add a limit to
//                     // avoid huge iterations through (maliciously passed) parameters.
//                     // Get Gensesis information, TODO find a way to check this once and persist
//                     let txnParams = await algod_client.getTransactionParams();
//                     let suggestedFee = txnParams.fee;
//                     let genesisID = txnParams.genesisID;
//                     let genesisHash = txnParams.genesishashb64;
//                     let currentRound = txnParams.lastRound;
//                     let minFee = txnParams.minFee;
//                     // Build the transaction object
//                     let txn: {[key: string]: any} = {};
//                     try {
//                         let k;
//                         for(k in params) {
//                             switch(k) {
//                                 case 'note':
//                                     txn[k] = algosdk.encodeObj(params[k]);
//                                     break;
//                                 default:
//                                     txn[k] = params[k];
//                                     break;
//                             }
//                         }
//                         txn.genesisID = genesisID;
//                         txn.genesisHash = genesisHash;
//                         txn.firstRound = currentRound + 1;
//                         txn.lastRound = currentRound + 10;
//                         txn.fee = suggestedFee;
//                     } catch(e) {
//                         throw new Error(RequestErrors.InvalidTransactionParams);
//                     }
//                     // !here we should retrieve from secure storage
//                     let account = algosdk.generateAccount();
//                     let sk = account.sk;
//                     let signedTxn = algosdk.signTransaction(txn,sk);
//                     return signedTxn;
//                 },
//                 // algod query
//                 [JsonRpcMethod.Algod]: async (
//                     request: any
//                 ) => {
//                     let algod_method = request.body.params.method;
//                     let error = false;
//                     let r;
//                     switch(algod_method) 
//                     {
//                         case 'status':
//                             r = await algod_client.status();
//                             break;
//                         default:
//                             error = true;
//                             r = RequestErrors.UnsupportedAlgod;
//                             break;
//                     }
//                     if(error)
//                         throw new Error(r);
//                     return r;
//                 }
//             },
//             'private': {
//                 // authorization-allow
//                 [JsonRpcMethod.AuthorizationAllow]: () => {
//                     let auth = Task.request;
//                     let message = auth.message;
//                     chrome.windows.remove(auth.window_id);
//                     Task.authorized_pool.push(message.origin);
//                     Task.request = {};
//                     setTimeout(() => {
//                         message.response = {};
//                         MessageApi.send(message);
//                     },100);
//                 },
//                 // authorization-deny
//                 [JsonRpcMethod.AuthorizationDeny]: () => {
//                     let auth = Task.request;
//                     let message = auth.message;
//                     auth.message.error = RequestErrors.NotAuthorized;
//                     chrome.windows.remove(auth.window_id);
//                     Task.request = {};
//                     setTimeout(() => {
//                         message.response = {};
//                         MessageApi.send(message);
//                     },100);
//                 }
//             }
//         }
//     }
// }

defineProperty_default()(task_Task, "request", {});

defineProperty_default()(task_Task, "authorized_pool", []);
// CONCATENATED MODULE: ./src/background/messaging/handler.ts





const auth_methods = [types["a" /* JsonRpcMethod */].Authorization, types["a" /* JsonRpcMethod */].AuthorizationAllow, types["a" /* JsonRpcMethod */].AuthorizationDeny];

class handler_RequestValidation {
  static isAuthorization(method) {
    if (auth_methods.indexOf(method) > -1) return true;
    return false;
  }

  static isPublic(method) {
    if (method in task_Task.methods().public) return true;
    return false;
  }

}

class handler_OnMessageHandler extends handler_RequestValidation {
  static handle(request, sender, sendResponse) {
    console.log('HANDLIG MESSAGE', request, sender, sendResponse);

    try {
      request.origin = new URL(sender.url).origin;
    } catch (e) {
      request.error = RequestErrors.NotAuthorized;
      api_MessageApi.send(request);
      return;
    }

    const source = request.source;
    const body = request.body;
    const method = body.method;
    const id = body.id; // Check if the message comes from the extension
    // TODO: Change to a more secure way

    if (sender.origin.includes(chrome.runtime.id)) {
      // Message from extension
      switch (source) {
        // Message from extension to dapp
        case types["b" /* MessageSource */].Extension:
          if (handler_OnMessageHandler.isAuthorization(method) && !handler_OnMessageHandler.isPublic(method)) {
            // Is a protected authorization message, allowing or denying auth
            task_Task.methods().private[method](request);
          } else {
            handler_OnMessageHandler.events[id] = sendResponse;
            api_MessageApi.send(request); // Tell Chrome that this response will be resolved asynchronously.

            return true;
          }

          break;

        case types["b" /* MessageSource */].UI:
          return task_Task.methods().extension[method](request, sendResponse);
          break;
      }
    } else {
      switch (source) {
        // Message from dapp to extension
        case types["b" /* MessageSource */].DApp:
          if (handler_OnMessageHandler.isAuthorization(method) && handler_OnMessageHandler.isPublic(method)) {
            // Is a public authorization message, dapp is asking to connect
            task_Task.methods().public[method](request);
          } else {
            // Other requests from dapp fall here
            if (task_Task.isAuthorized(request.origin)) {
              // If the origin is authorized, build a promise
              task_Task.build(request).then(function (d) {
                api_MessageApi.send(d);
              }).catch(function (d) {
                api_MessageApi.send(d);
              });
            } else {
              // Origin is not authorized
              request.error = RequestErrors.NotAuthorized;
              api_MessageApi.send(request);
            }
          }

          break;
        // A response message for a extension to dapp request

        case types["b" /* MessageSource */].Router:
          if (task_Task.isAuthorized(request.origin) && id in handler_OnMessageHandler.events) {
            handler_OnMessageHandler.events[id]();
            setTimeout(function () {
              delete handler_OnMessageHandler.events[id];
            }, 1000);
          }

          break;
      }
    }
  }

}

defineProperty_default()(handler_OnMessageHandler, "events", {});
// CONCATENATED MODULE: ./src/background/messaging/api.ts


class api_MessageApi {
  static listen() {
    switch (PLATFORM) {
      case 'chrome':
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
          return handler_OnMessageHandler.handle(request, sender, sendResponse);
        });
        break;
    }
  }

  static send(d, active_tab = true) {
    switch (PLATFORM) {
      case 'chrome':
        if (active_tab) {
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, function (tabs) {
            var tab_id = tabs[0].id || 0;
            chrome.tabs.sendMessage(tab_id, d);
          });
        } else {// TODO all tabs?
        }

        break;
    }
  }

}
// CONCATENATED MODULE: ./src/background/background.ts



class background_Wrapper {
  start() {
    api_MessageApi.listen();
  }

  static getInstance() {
    if (!background_Wrapper.instance) {
      background_Wrapper.instance = new background_Wrapper();
    }

    return background_Wrapper.instance;
  }

}

defineProperty_default()(background_Wrapper, "instance", void 0);

const Background = background_Wrapper.getInstance();
/* harmony default export */ var background = (Background);
// CONCATENATED MODULE: ./src/background/index.ts


background.start();

/***/ })
/******/ ]);