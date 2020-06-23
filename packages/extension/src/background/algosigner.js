'use strict';
import  extensionStorage from "@algosigner/storage/dist/extensionStorage";
import encryptionWrap from "./encryptionWrap";
import createNewAccount from "./account/createAccount.js";


document.addEventListener('DOMContentLoaded', () => {
    const _defaultPassphrase = "Password1";
    const _accountKey = "defaultwalletname";

    let dev_area = document.getElementById('dev_area');
    let public_key = document.getElementById('public_key');
    let keywrap = document.getElementById('keywrap');

    let input_password = document.getElementById('input_password');
    let login_button = document.getElementById('login_button');

    let create_wallet = document.getElementById('create_wallet');

    // Get input passphrase
    function getInputPassphrase() {
        return input_password && input_password.value !== "" ? input_password.value : _defaultPassphrase;
    };

    if(login_button) // Button exists on extension, so load the others. Testing only.
    {
        // Testing Method: Get storage.local information for extension
        get_local.onclick = function(element){
            extensionStorage.getStorageLocal((result) => {
                dev_area.value = result;
            })
        }

        // Testing Method: Delete all storage.local for extension
        clear_local.onclick = function(element){
            extensionStorage.clearStorageLocal((result) => {
                console.log("Clear result: " + result);
                dev_area.value = result ? 'Success' : 'Failed';
            })
        }

        // Unlock the storage.local object
        login_button.onclick = function(element) {
            dev_area.value = 'Attempting unlock...';
            encryptionWrap.unlock({ passphrase: encryptionWrap.stringToUint8ArrayBuffer(getInputPassphrase()) },
            (unlockedValue) => {
                if(unlockedValue && unlockedValue['STATUS']){
                    dev_area.value = unlockedValue['STATUS'];
                }
                else if(unlockedValue){
                    dev_area.value = unlockedValue;
                }
                else
                    dev_area.value = `Login failed.`;
            });
        };

        // Testing Method: Deleted current storage.local, create a new mnemonic, and save
        create_wallet.onclick = function(element) {
            dev_area.value = "";
            let accountArray = createNewAccount(getInputPassphrase());
            dev_area.value += `Mnemonic:\n${accountArray[0]}`;
            public_key.textContent = accountArray[1];
            keywrap.classList.remove("hidden-row");
            encryptionWrap.lock({ passphrase: encryptionWrap.stringToUint8ArrayBuffer(getInputPassphrase()), encryptObject: encryptionWrap.stringToUint8ArrayBuffer(JSON.stringify(accountArray)) },
            (isSuccessful) => {
                console.log(`Lock was successful? ${isSuccessful}`);
                if(isSuccessful){
                    dev_area.value += `\n\nLocked value set.`;
                    login_button.classList.remove("hidden-row");
                }
                else{
                    dev_area.value += `\n\nLocked value failed to save.`;
                }
            });
        };

        // Check default account key in local storage
        extensionStorage.noAccountExistsCheck(_accountKey, (isAccount) => {
            if(!isAccount){
                dev_area.value = 'No previous account found, use Create New Wallet.';
                login_button.classList.add("hidden-row");
            }
        }); 
    }
}, false);
