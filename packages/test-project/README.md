# AlgoSigner Test-Project

## jest-puppeteer tests

Use jest and puppeteer to launch a headful (visible) Chromium instance in order to exercise the extension with end to end tests (e2e).

Leverages `jest-runner-groups` to split test suite invocation.

Test suites, when run standalone, each load the extension from scratch and create a new Wallet on each run.

### Prerequisites

Run `npm install` and `npm run build` successfully in the AlgoSigner root project.

### Test Suites

The test suites do not yet play well with each other and are best run standalone.

- github-headful-e2e : basic suite to verify the landing page comes up. Called from GitHub Action on every push to origin. Run with `npm run github-test`.

- basic-ui-e2e : Larger suite of basic tests of the UI, in two blocks. Creates Wallets, Imports and Creates Accounts, sends transactions and deletes the account. Run with `npm run basic-ui`.

- basic-e2e-dapp : Exercises exposed AlgoSigner functions in page context (dApp). Run with `npm run basic-dapp`.

- app-e2e-dapp: Short set of tests to exercise application calls through the dApp connection. Run with `npm run app-dapp`
