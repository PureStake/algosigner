# Introduction
This project is designed to provide an Algorand Wallet and extension based access to sign Algorand transactions in common web browsers. 

AlgoSigner is in a pre-launch beta status.

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
	* dApp-integration.md				// Guide to integrating dApps with AlgoSigner
	* LICENSE.md						// License for this repository

## Installation
The ./dist/ folder is the only required folder to install the extension and must be built. 

- Clone the repository locally
- Run `npm install` in the root folder
- Run `npm run build` in the root folder - this creates the `dist` folder
- Open Chrome Browser - go to `chrome://extensions/`
- Enable developer mode
- Select `Load Unpacked` and choose the just created `dist` folder
- AlgoSigner is now installed and available 

## Developing a dApp 

- Read [dApp Integration Guide](docs/dApp-integration.md)
- Read [Sample dApp project](https://github.com/PureStake/algosigner-dapp-example)
- Try [Interactive dApp](https://purestake.github.io/algosigner-dapp-example/)


## License
Until initial development is complete and the product is launched, this repository is private and the contents confidential. 

