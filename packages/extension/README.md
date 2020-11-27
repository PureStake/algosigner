# AlgoSigner Extension

Extension definition and core files for use in AlgoSigner. Handles messaging, data manipulation, and manages other packages for encryption, and storage.

## Extension Package Overview

*https://github.com/PureStake*

- extension-> // Base project folder
  - src->
    - background-> // Folder for scripts combined into background.js
      - account-> // Create and handle account keys, mnemonic
      - messaging-> // Files for handling communication between DAPP's, the UI and the background processes of the extension
      - transaction-> // Transaction actions and validation of transaction structure
      - utils-> // Basic functionality needed for the extension including data translation, validation and ledger information
      - encryptionWrap // Wrapper of both crypto and storage for organizing information for saving and loading
    - content-> // Handles data messages coming in from the content script
    - public-> // Contains additional files for inclusion in the outgoing folder like extension images
  - manifest.json // Extension definition file
  - package.json // Extension package and required packages
  - readme.md // Extension package overview

## Installation

Install NodeJS, run 'npm install', then 'npm run build'.
