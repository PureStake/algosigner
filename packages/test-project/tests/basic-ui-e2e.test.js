/**
 * Basic e2e tests for the AlgoSigner UI
 *
 * @group basic-ui
 */

describe('Basic Happy Path Tests', () => {
  const extensionName = 'AlgoSigner';
  const extensionPopupHtml = 'index.html';
  const unsafePassword = 'c5brJp5f';
  const unsafeMenmonic =
    'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy';
  const testNetAccount = 'E2E-Tests';
  const testAccountAddress = 'MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE';
  const amount = Math.ceil(Math.random() * 9); // txn size, modify multiplier for bulk

  let baseUrl; // set in beforeAll
  let extensionPage; // set in beforeAll
  let txId; // returned tx id from send txn
  let txTitle; // for tx verification

  // TODO: switch tests to single page object
  beforeAll(async () => {
    const dummyPage = await browser.newPage();
    await dummyPage.waitForTimeout(2000); // arbitrary wait time.
    const targets = await browser.targets();

    const extensionTarget = targets.find(({ _targetInfo }) => {
      return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
    });

    const extensionUrl = extensionTarget._targetInfo.url || '';
    const [, , extensionID] = extensionUrl.split('/');

    baseUrl = `chrome-extension://${extensionID}/${extensionPopupHtml}`;

    extensionPage = await browser.newPage();
    extensionPage.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    dummyPage.close();
    await extensionPage.goto(baseUrl);
  });

  beforeEach(async () => {
    jest.setTimeout(15000);
  });

  afterAll(async () => {
    extensionPage.close();
  });

  const verifyTransaction = async () => {
    await extensionPage.waitForTimeout(10000);
    const txSelector = `[data-transaction-id=${txId}]`;
    await extensionPage.waitForSelector(txSelector);
    await extensionPage.click(txSelector);
    await expect(extensionPage.$eval('#txTitle', (e) => e.innerText)).resolves.toBe(txTitle);
    await expect(
      extensionPage.$eval(
        '.modal.is-active [data-transaction-id]',
        (e) => e.dataset['transactionId']
      )
    ).resolves.toBe(txId);
    await expect(
      extensionPage.$eval(
        '.modal.is-active [data-transaction-sender]',
        (e) => e.dataset['transactionSender']
      )
    ).resolves.toBe(testAccountAddress);
    await closeModal();
  };

  test('Welcome Page Title', async () => {
    await expect(extensionPage.title()).resolves.toMatch(extensionName);
  });

  test('Create New Wallet', async () => {
    await extensionPage.waitForSelector('#setPassword');
    await extensionPage.click('#setPassword');
  });

  test('Set new wallet password', async () => {
    await expect(extensionPage.$eval('.mt-2', (e) => e.innerText)).resolves.toMatch(
      'my_1st_game_was_GALAGA!'
    );
    await extensionPage.waitForSelector('#createWallet');
    await extensionPage.type('#setPassword', unsafePassword);
    await extensionPage.type('#confirmPassword', unsafePassword);
    await extensionPage.waitForTimeout(2000);
    await extensionPage.waitForSelector('#createWallet');
    await extensionPage.click('#createWallet');
  });

  test('Switch Ledger', async () => {
    await extensionPage.waitForTimeout(4000);
    await extensionPage.screenshot({
      path: 'screenshots/test_waiting_for_page.png',
    });
    await extensionPage.click('#selectLedger');
    await extensionPage.waitForTimeout(500);
    await extensionPage.click('#selectTestNet');
  });

  test('Import Account', async () => {
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.waitForSelector('#importAccount');
    await extensionPage.click('#importAccount');
    await extensionPage.waitForSelector('#accountName');
    await extensionPage.type('#accountName', testNetAccount);
    await extensionPage.waitForTimeout(100);
    await extensionPage.type('#enterMnemonic', unsafeMenmonic);
    await extensionPage.waitForTimeout(100);
    await extensionPage.click('#nextStep');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
    // Loading the account takes time
    await extensionPage.waitForTimeout(3000);
  });

  test('Load Account Info', async () => {
    await selectAccount();
    await expect(extensionPage.$eval('#accountName', (e) => e.innerText)).resolves.toBe(
      testNetAccount
    );
    await goBack();
  });

  test('Send Algos Transaction', async () => {
    await selectAccount();
    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForTimeout(100);
    await extensionPage.type('#transferAmount', amount.toString());
    await extensionPage.type('#toAddress', testAccountAddress);
    await extensionPage.type('#note', 'AutoTest Send Algo');
    await extensionPage.click('#submitTransfer');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForSelector('#authButton');
    await extensionPage.click('#authButton');
    await extensionPage.waitForSelector('#txId');
    // setup tx details for next test
    txId = await extensionPage.$eval('#txId', (e) => e.innerText);
    txTitle = 'Payment';
    await returnToAccount();
  });

  test('Verify transaction', verifyTransaction);

  test('Check Asset details', async () => {
    const assetSelector = '[data-asset-id]';
    await extensionPage.waitForSelector(assetSelector);
    const assetId = await extensionPage.$eval(assetSelector, (e) => e.dataset['assetId']);
    const assetBalance = await extensionPage.$eval(assetSelector, (e) => e.dataset['assetBalance']);
    await extensionPage.click(assetSelector);
    await expect(
      extensionPage.$eval(`.modal ${assetSelector}`, (e) => e.dataset['assetId'])
    ).resolves.toBe(assetId);
    await expect(
      extensionPage.$eval(`.modal ${assetSelector}`, (e) => e.dataset['assetBalance'])
    ).resolves.toBe(assetBalance);
    await closeModal();
    const thereIsFullAssetList = await extensionPage.$('#showAssets');
    if (thereIsFullAssetList) {
      await extensionPage.click('#showAssets');
      await extensionPage.waitForSelector(`.modal [data-asset-id="${assetId}"]`);
      await closeModal();
    }
    await goBack();
  });

  test('Send Asset Transaction', async () => {
    await selectAccount();
    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForTimeout(100);
    await extensionPage.click('#selectAsset');
    await extensionPage.waitForTimeout(100);
    await extensionPage.waitForSelector('#asset-13169404');
    await extensionPage.click('#asset-13169404');
    await extensionPage.waitForTimeout(500);
    // Test correct decimal handling
    await extensionPage.type('#transferAmount', `0.000000000${amount}`);
    const actualAmount = await extensionPage.$eval('#transferAmount', (e) => {
      const inputValue = e.value;
      e.value = '';
      return inputValue;
    });
    expect(actualAmount).toMatch('0.000000');
    // Test actual transfer
    await extensionPage.type('#transferAmount', `0.00000${amount}`);
    await extensionPage.type('#toAddress', testAccountAddress);
    await extensionPage.type('#note', 'AutoTest Send E2E Asset');
    await extensionPage.click('#submitTransfer');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForSelector('#authButton');
    await extensionPage.click('#authButton');
    await extensionPage.waitForSelector('#txId');
    txId = await extensionPage.$eval('#txId', (e) => e.innerText);
    txTitle = 'Asset transfer';
    await returnToAccount();
  });

  test('Verify transaction', verifyTransaction);

  // test('Transaction Errors: OverSpend', async () => {
  //   await selectAccount();
  //   await extensionPage.click('#sendTransfer');
  //   await extensionPage.waitForSelector('#transferAmount');
  //   await extensionPage.type('#transferAmount', '900000');
  //   await extensionPage.type('#toAddress', testAccountAddress);
  //   await extensionPage.type('#note', 'AutoTest Overspend Algo');
  //   await extensionPage.click('#submitTransfer');
  //   await extensionPage.waitForSelector('#enterPassword');
  //   await extensionPage.type('#enterPassword', unsafePassword);
  //   await extensionPage.waitForSelector('#authButton');
  //   await extensionPage.click('#authButton');
  //   await extensionPage.waitForSelector('#tx-error');

  //   let pageError = await extensionPage.$eval('#tx-error', (e) => e.innerText);
  //   await expect(pageError).toMatch(
  //     "Overspending. Your account doesn't have sufficient funds."
  //   );

  //   await closeModal();
  //   await extensionPage.waitForTimeout(200);
  //   await goBack();
  // });

  test('Transaction Errors: Invalid Field - Amount', async () => {
    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForSelector('#transferAmount');
    await extensionPage.type('#transferAmount', '9999999999.999999');
    await extensionPage.type('#toAddress', testAccountAddress);
    await extensionPage.type('#note', 'AutoTest Invalid Amount');
    await extensionPage.click('#submitTransfer');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForSelector('#authButton');
    await extensionPage.click('#authButton');
    await extensionPage.waitForSelector('#tx-error');

    let pageError = await extensionPage.$eval('#tx-error', (e) => e.innerText);
    expect(pageError).toMatch('One or more fields are not valid. Please check and try again.');

    await closeModal();
    await extensionPage.waitForTimeout(200);
    await goBack();
  });

  test('Load Account Details', async () => {
    await extensionPage.click('#showDetails');
    await extensionPage.waitForSelector('#accountAddress');
    await expect(extensionPage.$eval('#accountAddress', (e) => e.innerText)).resolves.toBe(
      testAccountAddress
    );
    await expect(extensionPage.$eval('#accountName', (e) => e.innerText)).resolves.toBe(
      testNetAccount
    );
  });

  test('Delete Account', async () => {
    await extensionPage.click('#deleteAccount');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
    await extensionPage.waitForTimeout(2000);
  });

  test('Verify Account Deleted', async () => {
    await extensionPage.waitForSelector('#addAccount');
    await expect(extensionPage.select('#accountAddress')).rejects.toThrow();
    await expect(extensionPage.select('#accountName')).rejects.toThrow();
  });

  const selectAccount = async () => {
    const accountSelector = '#account_' + testNetAccount;
    await extensionPage.waitForSelector(accountSelector);
    await extensionPage.click(accountSelector);
    await extensionPage.waitForTimeout(1000);
    return;
  };

  const returnToAccount = async () => {
    await extensionPage.waitForTimeout(2000);
    await extensionPage.click('#backToWallet');
    await extensionPage.waitForTimeout(2000);
    return;
  };

  const goBack = async () => {
    await extensionPage.click('#goBack');
    await extensionPage.waitForTimeout(500);
    return;
  };

  const closeModal = async () => {
    await extensionPage.click('.modal.is-active button.modal-close');
    await extensionPage.waitForTimeout(500);
    return;
  };
});

// Create a new account in AlgoSigner
describe('Create Account', () => {
  const extensionName = 'AlgoSigner';
  const extensionPopupHtml = 'index.html';
  const unsafePassword = 'c5brJp5f';
  const testNetAccount = 'Created-Account';

  let baseUrl; // set in beforeAll
  let extensionPage; // set in beforeAll
  let createdAccountAddress; // returned tx id from send txn
  let mnemonicArray = [];

  beforeAll(async () => {
    const dummyPage = await browser.newPage();
    await dummyPage.waitForTimeout(2000); // arbitrary wait time.
    const targets = await browser.targets();

    const extensionTarget = targets.find(({ _targetInfo }) => {
      return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
    });

    const extensionUrl = extensionTarget._targetInfo.url || '';
    const [, , extensionID] = extensionUrl.split('/');

    baseUrl = `chrome-extension://${extensionID}/${extensionPopupHtml}`;

    extensionPage = await browser.newPage();
    await extensionPage.goto(baseUrl);
  });

  afterAll(async () => {
    extensionPage.close();
  });

  beforeEach(async () => {
    jest.setTimeout(10000);
  });

  test('Create An Account, Step 1 - Enter Account Name', async () => {
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.waitForSelector('#createAccount');
    await extensionPage.click('#createAccount');
    await extensionPage.type('#setAccountName', testNetAccount);
    await extensionPage.click('#nextStep');
  });

  test('Create An Account, Step 2 - Get Mnemonic', async () => {
    await extensionPage.click('#accountAddress');
    createdAccountAddress = await extensionPage.$eval('#accountAddress', (e) => e.innerText); // setup for another test

    for (let i = 1; i <= 25; i++) {
      mnemonicArray[i] = await extensionPage.$eval(
        `[data-key-index="${i}"]`,
        (e) => e.dataset['word']
      );
    }
    await extensionPage.waitForSelector('#recordCheckbox');
    await extensionPage.click('#recordCheckbox');
    await extensionPage.click('#nextStep');
  });

  test('Create An Account, Step 3 - Use Mnemonic', async () => {
    await extensionPage.waitForSelector('#enterMnemonic');

    for (let i = 1; i <= 25; i++) {
      await extensionPage.waitForSelector('#' + mnemonicArray[i]);
      await extensionPage.click(`#${mnemonicArray[i]}:not([disabled])`);
    }
    await extensionPage.click('#nextStep');
  });

  test('Create an Account, Step 4 - Write Account into Storage', async () => {
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
  });

  test('Verify Account is Created', async () => {
    await extensionPage.waitForSelector('#account_' + testNetAccount);
    await extensionPage.click('#account_' + testNetAccount);
    await extensionPage.waitForTimeout(500);
    await expect(extensionPage.$eval('#accountName', (e) => e.innerText)).resolves.toBe(
      testNetAccount
    );
  });

  test('Load Account Details', async () => {
    await extensionPage.click('#showDetails');
    await extensionPage.waitForSelector('#accountAddress');
    await expect(extensionPage.$eval('#accountAddress', (e) => e.innerText)).resolves.toBe(
      createdAccountAddress
    );
    await expect(extensionPage.$eval('#accountName', (e) => e.innerText)).resolves.toBe(
      testNetAccount
    );
  });

  test('Delete Account', async () => {
    await extensionPage.click('#deleteAccount');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
    await extensionPage.waitForTimeout(2000);
  });

  test('Verify Account Deleted', async () => {
    await extensionPage.waitForSelector('#addAccount');
    await expect(extensionPage.select('#accountAddress')).rejects.toThrow();
    await expect(extensionPage.select('#accountName')).rejects.toThrow();
  });
});
