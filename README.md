# Introduction
This project is designed to provide an Algorand Wallet and extension based access to sign Algorand transactions in common web browsers.

## Project Structure
There are multiple packages in the project that combine to build the overall extension. Each component package is designed so that it's functionality doesn't require the rebuild of other packages and will be combined to build the deployable extension. 

*https://github.com/PureStake*
* algosigner->							// Base project folder
    * dist->                            // Folder containing the combined distribution components, used to install the extension
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
The ./dist/ folder is the only required folder to install the extension. This can be rebuilt using 'npm run build' from the project root after 'npm install'. This will rebuild the packages and move their output to the ./dist/ folder. To install in Chrome, from chrome://extensions/, with developer mode active, on the top right of the screen you can select 'Load Unpacked' and choose the dist folder. This will add an icon to the browser toolbar.


## License
Until initial development is complete and the product is launched, this repository is private and the contents confidential. 

