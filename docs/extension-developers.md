# Working with the Extension

For developers who are interested in working with the AlgoSigner source code.

A contribution guide is on the roadmap.

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
