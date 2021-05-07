# ![AlgoSigner](media/algosigner-wallet-banner-3.png)

An open-source, security audited, Algorand wallet browser extension that permits dApp communication for signing Algorand transactions — available for Chrome.

## Chrome Extension Store

The extension is available on the [Chrome Extension Store](https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm)

_This is the preferred solution for end-users, updates will be automatically installed after review by the extension store_

Developers working with dApps may also install directly from the release package, or by downloading the project and building it.

## 1.4.1 Update

Minor release to address some bugs and usability issues:

- Custom network headers creation simplified to allow use of either the Algorand standard header key or custom headers
- Simultaneous AlgoSigner RPC calls through `algod` and `indexer` fix to prevent response mismatches
- Logout bug fix: prevents error message on each logout

## 1.4.0 Update

- Beta support for adding custom networks within AlgoSigner (development networks, BetaNet, etc.). [More information on adding a new Network](docs/add-network.md)
- Navigation menu improvements
- Logout!

### Custom Networks

- Network information can now be accessed by selecting "Network Configuration" in the options menu.
  - This list shows the information needed by the dApp for connections.
- New networks can be added via the "New Network" button. Here is a brief overview of the fields:
  - Display Name: Name that will be displayed which will also be used for dApps interacting with the network.
  - Network ID: Genesis ID for the network. Transactions will be validated against the value here and must contain a matching value. Defaults to "mainnet-v1.0".
  - Network Algod URL: The address which will be used for any Algod related calls. Defaults to the PureStake MainNet URL.
  - Network Indexer URL: The address which will be used for any Indexer lookup calls. Defaults to the PureStake MainNet Indexer URL.
  - Network Headers: Object stucture that will be used as replacement headers for calls. The object structure has an "Algod" and "Indexer" sub structure which will contain the headers the target api needs in order to function.

## Roadmap

Upcoming feature releases will focus on adding Ledger device support and a more streamlined approach to creating and interacting with transactions in AlgoSigner.

## Previously delivered

### Multisig Transactions

- Multisig transactions can be signed individually through AlgoSigner.
  - Using the associated msig for the transaction an available matching unsigned address will be selected if possible to sign the txn component.
  - The resulting sign will return the a msig with only this signature in the blob and will need to be merged with other signatures before sending to the network.
- An example of this can be seen in the [existing sample dApp multisig test](https://purestake.github.io/algosigner-dapp-example/tx-test/signTesting.html).

### Atomic Transactions

- Grouped transactions intended for atomic transaction functionality need to be grouped outside of AlgoSigner, but can be signed individually.
- The grouped transactions need to have their binary components concatenated to be accepted in the AlgoSigner send method.
- An example of this can be seen in the [existing sample dApp group test](https://purestake.github.io/algosigner-dapp-example/tx-test/signTesting.html).

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
- Try [Sample Signing Scenarios](https://purestake.github.io/algosigner-dapp-example/tx-test/signTesting.html)
- Try [Interactive dApp](https://purestake.github.io/algosigner-dapp-example/)

## Project Structure

There are multiple packages in the project that combine to build the overall extension. Each component package is designed so that its functionality doesn't require the rebuild of other packages and will be combined to build the deployable extension.

*https://github.com/PureStake*

- algosigner-> // Base project folder
  - dist-> // Folder containing the combined distribution components, used to install the extension, created on build
  - packages-> // Folder for scripts components that support the extension
    - common-> // Contains core elements used in other packages
      - crypto-> // Wrapper for encrypting and decrypting account information
      - dapp-> // AlgoSigner library that gets injected in dApps
      - extension-> // Extension definition and core files
    - storage -> // Handles saving and loading of account information
    - test-project -> // Test wrapper for the package files
      - ui-> // Front end application for interaction within the extension interface
  - manifest.json // Extension definition file
  - package.json // Algosigner package, required packages, and scripts to build the project
  - readme.md // Project overview
  - docs -> // Guides and how-to's
    - dApp-integration.md // Guide to integrating dApps with AlgoSigner
  - media -> // Supporting images for this repository
  - LICENSE.txt // License for this repository

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
