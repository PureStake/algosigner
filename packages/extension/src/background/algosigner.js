'use strict';
import encryptionWrap from "../../../crypto/encryptionWrap";
import createNewAccount from "./account/createAccount.js";

document.addEventListener('DOMContentLoaded', () => {
    const _defaultPassphrase = "Password1";
    const _accountKey = "defaultwalletname";

    let dev_area = document.getElementById('dev_area');
    let public_key = document.getElementById('public_key');
    let keywrap = document.getElementById('keywrap');

    let input_password = document.getElementById('input_password');
    let login_button = document.getElementById('login_button');
    let new_password = document.getElementById('new_password');
    let new_password_button = document.getElementById('new_password_button');

    let create_wallet = document.getElementById('create_wallet');

    // Get input passphrase
    function getInputPassphrase() {
        return input_password && input_password.value !== "" ? input_password.value : _defaultPassphrase;
    };

    // Get new passphrase
    function getnewPassphrase() {
        return new_password && new_password.value !== "" ? new_password.value : _defaultPassphrase;
    };

    // Log information about the process back to the extension UI
    function logToDevUI(value, shouldClear=false) {
        if(shouldClear)
            dev_area.value = "";
        if(dev_area.value.toString().length > 0)
            dev_area.value += '\n\n';
        dev_area.value += value;
    };

    if(login_button) // Button exists on extension
    {
        // Testing Method: Get storage.local information for extension
        get_local.onclick = function(element){
            encryptionWrap.extensionStorage.getStorageLocal((result) => {
                dev_area.value = result;
            })
        }

        // Testing Method: Delete all storage.local for extension
        clear_local.onclick = function(element){
            encryptionWrap.extensionStorage.clearStorageLocal((result) => {
                dev_area.value = result ? 'Success' : 'Failed';
            })
        }

        // Unlock the storage.local object
        login_button.onclick = function(element) {
            dev_area.value = '';
            encryptionWrap.unlock({ passphrase: getInputPassphrase() }, (loginObject) => {
                if(typeof(loginObject))
                    dev_area.value = loginObject.toString();
                else
                    dev_area.value = `Login failed.`;
            }); 
        };

        // Overwrite previous encryption object with new password showing previous encryption and new encryption
        new_password_button.onclick = function(element) {
            dev_area.value = 'Not Implemented';
        };

        // Testing Method: Deleted current storage.local, create a new mnemonic, and save
        create_wallet.onclick = function(element) {
            dev_area.value = "";
            let accountArray = createNewAccount(getInputPassphrase());
            dev_area.value += `Mnemonic:\n${accountArray[0]}`;
            public_key.textContent = accountArray[1];
            keywrap.classList.remove("hidden-row");
            encryptionWrap.lock({ passphrase: getInputPassphrase(), encryptObject: accountArray[0] }, (isSuccessful)=>{
                dev_area.value += isSuccessful ? '\n\nSuccess' : '\n\nFailure';
                login_button.classList.remove("hidden-row");
                new_password_button.classList.remove("hidden-row");  
            }); 
        };

        // Check default account key in local storage
        encryptionWrap.extensionStorage.noAccountExistsCheck(_accountKey, (isAccount) => {
            if(!isAccount){
                dev_area.value = 'No previous account found, use Create New Wallet.';
                login_button.classList.add("hidden-row");
                new_password_button.classList.add("hidden-row");
            }
        }); 
    }
}, false);
