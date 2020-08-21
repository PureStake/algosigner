 # ![AlgoSigner](media/algosigner-wallet-banner-3.png)

An open-source Algorand wallet browser extension that permits dApp communication for signing Algorand transactions - available for Chrome initially. 

## Chrome Extension Store
The extension is available on the Chrome Extension Store at: 

_This is the preferred solution for end-users, updates will be automatically installed after review by the extension store_

Developers working with dApps may also install directly from the release package, or by downloading the project and building it. 

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
There are multiple packages in the project that combine to build the overall extension. Each component package is designed so that it's functionality doesn't require the rebuild of other packages and will be combined to build the deployable extension. 

*https://github.com/PureStake*
* algosigner->							// Base project folder
    * dist->                            // Folder containing the combined distribution components, used to install the extension, created on build
	* packages->						// Folder for scripts compents that support the extension
	    * common->                      // Contains core elements used in other packages
        * crypto->                      // Wrapper for encrypting and decrypting account information
        * dapp->                        // AlgoSigner library that gets injected in dApps
        * extension->                   // Extension definition and core files
		* storage ->					// Handles saving and loading of account information 
		* test-project ->				// Test wrapper for the package files
        * ui->                          // Front end application for interaction within the extension interface	\	
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
- Run `npm run build` in the root folder - this creates the `dist` folder
- Open Chrome Browser - go to `chrome://extensions/`
- Enable developer mode
- Select `Load Unpacked` and choose the just created `dist` folder
- AlgoSigner is now installed and available 

## Install from zip
The latest built zip is available for download on the releases page - 

Note - this is not recommended for non-developers and never for production purposes, extreme caution should be taken with installing any wallet. 

## License
This project is under the MIT License

