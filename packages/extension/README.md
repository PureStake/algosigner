# Proof of Concept Information
This code creates a simplistic extension with very limited functionality to demonstrate flow, encryption and decryption. This flow will show the unencrypted passwords, generated keys, salts and saved info to give a representation of how information is handled outside of the user interface.

## Project Location and Structure
*https://github.com/PureStake*
* algosigner->							// Base project folder
	* background->						// Folder for scripts combined into background.js
	   * account->
		  * createAccount.js			// Create account keys, mnemonic
	* data->
	  * extensionStorage.js 			// Handles requests regarding chrome storage
	  * localEncryption_AES.js			// Encryption using AES
	  * loclHash.js						// Derivation and Hash using PBKDF2 and SHA3
	* dist->							// Extension Installation Folder
	  * algosigner.html					// Display components for the extension
	  * background.js					// Compilation of scripts
	  * logo.png						// Placeholder logo as PureStake logo
	  * manifest.json					// Extension definition file
	* node_modues->						// Installed packages
		* ...			
	* algosigner.html					// Display components for the extension
	* algosigner.js						// Page integration script
	* background.js						// Compilation of scripts
	* logo.png							// Placeholder logo as PureStake logo
	* manifest.json						// Extension definition file
	* package-lock.json					// Algosigner package and installed packages
	* package.json						// Algosigner package and required packages
	* readme.md							// Project overview

## Installation
The dist folder is the only required folder. This can be rebuilt using 'npm run build' if desired from the project root. From chrome://extensions/ with developer mode active on the top right of the screen you can select 'Load Unpacked' and choose the dist folder. This will add an icon to the browser toolbar.

After clicking the browser icon a popup window will show. On it there are 2 interactable passphrase text boxes and 6 buttons with a large demo log area at the bottom. There is a public key area near the top to demonstrate that once the key is active the public key component is in memory. 

## Available Actions
The first step should be generating a mnemonic. If a passphrase is not entered the buttons will default to using 'Password1'. 

###### Simulate Login 
Attempts to simulate login using the current passphrase. The log area will show the entered passphrase and wallet name on disk, the encrypted wallet on disk, then display login failure or success based on a decryption check.

###### Generate Mnemonic
Shows the create or import flow of a mnemonic. In this case the previous account object is cleared and a create is performed. The new mnemonic is shown as plain text along with the passphrase, this then moves that value into the account object and shows that the information is the same as the mnemonic. A new unlock key is created, and the resulting salts are passed back. There are two salts, one during derivation and one for encryption. The final value is that of the encrypted account mnemonic value.

###### View Mnemonic Encryption
Shows retrieval of a mnemonic. Plain text account name and passphrase are shown. Using the account name, the encrypted version is pulled from local browser storage. Once located the passphrase and salt listed on the account object are used to create an encrypted unlock key. This key is used to unencrypt the account, then both the raw account and decrypted mnemonic are shown to indicate that the data moves back to an encrypted state except for the information being retrieved. 

###### Set New Passphrase
Utilizing the Passphrase and New Passphrase text boxes to change the passphrase. This shows the account name previous passphrase and new passphrase in plain text. A new salt value is generated and this creates a new hashed key for the passphrase. The encrypted account object is pulled from local browser storage using the account name. This salt information and the current passphrase are used to decrypt the account object. Then the new account salt is created and the account is re-encrypted with the new hashed passphrase key.

###### View Password Hash
Shows password hashing flow. The plain text account name and password are shown. If there is a current encrypted account object the attached salt is used, if not a new one will be generated. Then the passphrase will go through 1000 iterations of passphrase derivation and the resulting hashed passphrase key will be shown.

###### View Wallet Account
Shows the raw stored account object. Demonstrates that all that is required to retrieve an account is the account name. This account name is shown in plain text and retrieves the encrypted local raw account object.
