 # ![AlgoSigner](media/algosigner-wallet-banner-3.png)

An open-source Algorand wallet browser extension that permits dApp communication for signing Algorand transactions — available for Chrome initially. 

## Chrome Extension Store
The extension is available on the [Chrome Extension Store](https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm)

_This is the preferred solution for end-users, updates will be automatically installed after review by the extension store_

Developers working with dApps may also install directly from the release package, or by downloading the project and building it. 

## 1.1.0 Update 
The latest release introduces several key new features for users and dApp developers.

### Asset Support in the UI
Assets you own have always been displayed in the AlgoSigner UI, but we have added additional capabilities. Now you may search for new assets, opt-in to receive them, and transfer them right in the AlgoSigner UI. 

### Asset Support for dApps
dApps were previously able to send in basic asset transactions to be signed by AlgoSigner. Support has now been added for all asset transaction types with accompanying UI notices. 

* Clawback added
* Destroy capability allowed for `acfg`
* Close-to supported in `axfer`

### Application Transaction Support for dApps 
dApp developers may now send in application transactions to be signed. This support is new and subject to change in subsequent releases. Please read the updated [dApp Integration Guide](docs/dApp-integration.md) for instructions on working with these transaction types. 

### Additional dApp support

* Support has been enabled for `close-to` transactions. 
* Transaction validation errors will now provide more detailed messages on causes

### UI Transactions
With the addition of support for `close-to` transactions, new warning messages will display in the UI when dApps send in pay transactions that are potentially dangerous. 

The signing window will also now better reflect the ledger for which the dApp is asking the user to sign a transaction. A new label is present in dark blue for TestNet and orange for MainNet.

### Sample dApp and dApp Tests

* Signing app — New sample dApp for [demonstrating transaction signing](https://purestake.github.io/algosigner-dapp-example/tx-test/signTesting.html)
* Updates to the [existing sample dApp](https://purestake.github.io/algosigner-dapp-example/) demonstrating pending lookup and asset search

## Decentralized Applications
As a browser extension, AlgoSigner opens the door for developers to build DeFi applications on Algorand by providing a secure way to add transaction capabilities. This enables developers to initiate transactions and accept ALGOs seamlessly, without jeopardizing the security of their users’ secrets.

For end users, AlgoSigner also makes it easy to use Algorand-based applications on the web. Simply create or import your Algorand account, visit a compatible dApp, and approve or deny transactions — all from within your browser.

DApp users can trust AlgoSigner to:
- Securely store and encrypt account secrets
- Authorize transactions without giving dApps direct access to their keys
- Sign and approve transactions when using dApps

### Developing a dApp 

- Read [dApp Integration Guide](docs/dApp-integration.md)
- Read [Sample dApp project](https://github.com/PureStake/algosigner-dapp-example)
- Try [Interactive dApp](https://purestake.github.io/algosigner-dapp-example/)

## Project Structure
There are multiple packages in the project that combine to build the overall extension. Each component package is designed so that its functionality doesn't require the rebuild of other packages and will be combined to build the deployable extension. 

*https://github.com/PureStake*
* algosigner->							// Base project folder
    * dist->                            // Folder containing the combined distribution components, used to install the extension, created on build
	* packages->						// Folder for scripts components that support the extension
	    * common->                      // Contains core elements used in other packages
        * crypto->                      // Wrapper for encrypting and decrypting account information
        * dapp->                        // AlgoSigner library that gets injected in dApps
        * extension->                   // Extension definition and core files
		* storage ->					// Handles saving and loading of account information 
		* test-project ->				// Test wrapper for the package files
        * ui->                          // Front end application for interaction within the extension interface
	* manifest.json						// Extension definition file
	* package.json						// Algosigner package, required packages, and scripts to build the project
	* readme.md							// Project overview
	* docs ->							// Guides and how-to's
		* dApp-integration.md			// Guide to integrating dApps with AlgoSigner
	* media ->							// Supporting images for this repository
	* LICENSE.txt						// License for this repository

## Build and Install
The ./dist/ folder is the only required folder to install the extension yourself from code and must be built. 

- Clone the repository locally
- Run `npm install` in the root folder
- Run `npm run build` in the root folder — this creates the `dist` folder
- Open Chrome browser — go to `chrome://extensions/`
- Enable developer mode
- Select `Load Unpacked` and choose the just created `dist` folder
- AlgoSigner is now installed and available 

## Install from zip
The latest built zip is available for download on the releases page — 

NoteL this is not recommended for non-developers and should never be used for production purposes. Extreme caution should be taken when installing any wallet. 

### Prerequisites
- Installation of the Chrome browser
- File unzip program
- Local file system write permissions
- Access to set developer mode in Chrome and install unpacked extensions

### Process
- Unzip `AlgoSigner.zip` file to local file system
- Open Chrome browser and go to `chrome://extensions/`
- Enable developer mode
- Select `Load Unpacked` and choose the unzipped `dist` folder
- AlgoSigner is now installed and available 

## License
This project is under the MIT License

