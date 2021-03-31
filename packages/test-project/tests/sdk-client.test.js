/**
 * Tests HTTP client for AlgoSDK
 *
 * @group sdk-client
 */
const testAccountAddress = 'VWUJHTMF3GS2VGLGUHXREVB3RCT7SUZASLQV3DDHLT4EGDAJBICCDYVEKE';
const testAssetId = 13169404;
const unsafePassword = 'c5brJp5f';
// Set in one test and re-used in later tests
let consensusVersion;
let baseUrl; // holds the extension url for a local window

jest.setTimeout(60000);

describe('Wallet Setup', () => {
  const extensionName = 'AlgoSigner';
  const extensionPopupHtml = 'index.html';
  let extensionPage; // set in beforeAll

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

  afterAll(async () => {
    extensionPage.close();
  });

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
    await extensionPage.waitForSelector('#selectLedger');
    await extensionPage.click('#selectLedger');
    await extensionPage.waitForSelector('#selectTestNet');
    await extensionPage.click('#selectTestNet');
  });
});

describe('dApp Setup', () => {
  const samplePage = 'http://localhost:9000/tx-test/signTesting.html';
  beforeAll(async () => {
    await page.goto(samplePage);
  });

  test('Connect and Authorize dApp', async () => {
    await page.goto(samplePage);
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      AlgoSigner.connect();
    });

    await page.waitForTimeout(2000);
    const pages = await browser.pages();
    const popup = pages[pages.length - 1];
    await popup.waitForSelector('#grantAccess');
    await popup.click('#grantAccess');
    await page.waitForTimeout(2000);
  });

  test('Setup clients', async () => {
    await page.evaluate(() => {
      window.ac = AlgoSigner.getAlgodHTTPClient('TestNet');
      window.algod = new window.algosdk.Algodv2(null, null, null, null, window.ac);
      window.id = AlgoSigner.getIndexerHTTPClient('TestNet');
      window.indexer = new window.algosdk.Indexer(null, null, null, null, window.id);
    });
  });
});

describe('SDK Client Testing', () => {
  test('Compare Param calls', async () => {
    const getSdkParams = await page.evaluate(() => {
      return Promise.resolve(window.algod.getTransactionParams().do());
    });
    await page.waitForTimeout(3000);

    expect(getSdkParams).toHaveProperty('fee');
    expect(getSdkParams.fee).toEqual(0);
    expect(getSdkParams).toHaveProperty('flatFee');
    expect(getSdkParams).toHaveProperty('genesisHash');
    expect(getSdkParams).toHaveProperty('genesisID');
    expect(getSdkParams).toHaveProperty('lastRound');

    const getClientParams = (
      await page.evaluate(() => {
        return Promise.resolve(window.ac.get('/v2/transactions/params'));
      })
    ).body;

    await page.waitForTimeout(2000);
    const getAlgoSignerParams = await page.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.algod({
          ledger: 'TestNet',
          path: '/v2/transactions/params',
        })
      );
    });

    expect(getClientParams).toHaveProperty('consensus-version');
    expect(getClientParams).toHaveProperty('fee');
    expect(getClientParams.fee).toEqual(0);
    expect(getClientParams).toHaveProperty('min-fee');
    expect(getClientParams).toHaveProperty('genesis-hash');
    expect(getClientParams).toHaveProperty('genesis-id');
    expect(getClientParams).toHaveProperty('last-round');
    consensusVersion = getClientParams['consensus-version'];

    // Compare client call to AlgoSigner call
    expect(consensusVersion).toEqual(getAlgoSignerParams['consensus-version']);
    expect(getClientParams['fee']).toEqual(getAlgoSignerParams['fee']);
    expect(getClientParams['min-fee']).toEqual(getAlgoSignerParams['min-fee']);
    expect(getClientParams['genesis-hash']).toEqual(getAlgoSignerParams['genesis-hash']);
    expect(getClientParams['genesis-id']).toEqual(getAlgoSignerParams['genesis-id']);

    // Compare client call to sdk call
    expect(getClientParams['genesis-hash']).toEqual(getSdkParams['genesisHash']);
    expect(getClientParams['genesis-id']).toEqual(getSdkParams['genesisID']);
    expect(getClientParams['fee']).toEqual(getSdkParams['fee']);
  });

  test('Dryrun call', async () => {
    const debug = await page.evaluate(() => {
      const schema = new window.algosdk.modelsv2.ApplicationStateSchema(5, 5);
      const acc = new window.algosdk.modelsv2.Account({
        address: 'UAPJE355K7BG7RQVMTZOW7QW4ICZJEIC3RZGYG5LSHZ65K6LCNFPJDSR7M',
        amount: 5002280000000000,
        amountWithoutPendingRewards: 5000000000000000,
        pendingRewards: 2280000000000,
        rewardBase: 456,
        rewards: 2280000000000,
        round: 18241,
        status: 'Online',
      });
      const params = new window.algosdk.modelsv2.ApplicationParams({
        creator: 'UAPJE355K7BG7RQVMTZOW7QW4ICZJEIC3RZGYG5LSHZ65K6LCNFPJDSR7M',
        approvalProgram: 'AiABASI=',
        clearStateProgram: 'AiABASI=',
        localStateSchema: schema,
        globalStateSchema: schema,
      });
      const app = new window.algosdk.modelsv2.Application(1380011588, params);
      // make a raw txn
      const txn = {
        apsu: 'AiABASI=',
        fee: 1000,
        fv: 18242,
        gh: 'ZIkPs8pTDxbRJsFB1yJ7gvnpDu0Q85FRkl2NCkEAQLU=',
        lv: 19242,
        note: 'tjpNge78JD8=',
        snd: 'UAPJE355K7BG7RQVMTZOW7QW4ICZJEIC3RZGYG5LSHZ65K6LCNFPJDSR7M',
        type: 'appl',
      };
      const req = new window.algosdk.modelsv2.DryrunRequest({
        accounts: [acc],
        apps: [app],
        round: 18241,
        protocolVersion: 'future',
        latestTimestamp: 1592537757,
        txns: [{ txn: txn }],
      });
      return Promise.resolve(window.algod.dryrun(req).do());
    });

    console.log(debug);
  });

  test('Algod GET calls', async () => {
    const healthCheck = await page.evaluate(() => {
      return Promise.resolve(window.algod.healthCheck().do());
    });
    expect(healthCheck).not.toBeNull();

    const versionsCheck = await page.evaluate(() => {
      return Promise.resolve(window.algod.versionsCheck().do());
    });
    expect(versionsCheck).not.toBeNull();
    expect(versionsCheck['genesis_id']).toBe('testnet-v1.0');

    const accountInformation = await page.evaluate((account) => {
      return Promise.resolve(window.algod.accountInformation(account).do());
    }, testAccountAddress);
    expect(accountInformation).not.toBeNull();
    expect(accountInformation['address']).toBe(testAccountAddress);

    const block = await page.evaluate((block) => {
      return Promise.resolve(window.algod.block(block).do());
    }, 12104489);
    console.log(block);

    const status = await page.evaluate(() => {
      return Promise.resolve(window.algod.status().do());
    });
    expect(status).not.toBeNull();
    expect(status['last-version']).toBe(consensusVersion);

    const statusAfterBlock = await page.evaluate((block) => {
      return Promise.resolve(window.algod.statusAfterBlock(block).do());
    }, 12104489);
    expect(statusAfterBlock).not.toBeNull();
    expect(statusAfterBlock['last-version']).toBe(consensusVersion);

    const supply = await page.evaluate(() => {
      return Promise.resolve(window.algod.supply().do());
    });
    expect(supply).not.toBeNull();
  });

  test('Indexer GET calls', async () => {
    const makeHealthCheck = await page.evaluate(() => {
      return Promise.resolve(window.indexer.makeHealthCheck().do());
    });
    expect(makeHealthCheck).not.toBeNull();
    expect(makeHealthCheck).toHaveProperty('message');

    const lookupAssetBalances = await page.evaluate((id) => {
      return Promise.resolve(window.indexer.lookupAssetBalances(id).do());
    }, testAssetId);
    expect(lookupAssetBalances).not.toBeNull();
    expect(lookupAssetBalances).toHaveProperty('balances');

    const lookupAssetTransactions = await page.evaluate((id) => {
      return Promise.resolve(window.indexer.lookupAssetTransactions(id).do());
    }, testAssetId);
    expect(lookupAssetTransactions).not.toBeNull();
    expect(lookupAssetTransactions).toHaveProperty('transactions');

    const lookupAccountTransactions = await page.evaluate((account) => {
      return Promise.resolve(window.indexer.lookupAccountTransactions(account).do());
    }, testAccountAddress);
    expect(lookupAccountTransactions).not.toBeNull();
    expect(lookupAccountTransactions).toHaveProperty('transactions');

    const lookupBlock = await page.evaluate((block) => {
      return Promise.resolve(window.indexer.lookupBlock(block).do());
    }, 12104489);
    expect(lookupBlock['genesis-id']).toBe('testnet-v1.0');
    expect(lookupBlock).toHaveProperty('rewards');
    expect(lookupBlock).toHaveProperty('transactions');

    const lookupAccountByID = await page.evaluate((account) => {
      return Promise.resolve(window.indexer.lookupAccountByID(account).do());
    }, testAccountAddress);
    expect(lookupAccountByID).not.toBeNull();
    expect(lookupAccountByID).toHaveProperty('account');
    expect(lookupAccountByID['account']['address']).toBe(testAccountAddress);
    expect(lookupAccountByID).toHaveProperty('current-round');

    const lookupAssetByID = await page.evaluate((id) => {
      return Promise.resolve(window.indexer.lookupAssetByID(id).do());
    }, testAssetId);
    expect(lookupAssetByID).not.toBeNull();
    expect(lookupAssetByID).toHaveProperty('asset');
    expect(lookupAssetByID['asset']['index']).toBe(testAssetId);
    expect(lookupAssetByID).toHaveProperty('current-round');

    // const lookupApplications = await page.evaluate((id) => {
    //   return Promise.resolve(window.indexer.lookupApplications(id).do());
    // }, 00000);
    // expect(lookupApplications).not.toBeNull();
  });

  test('Indexer Complex GET calls', async () => {
    const limit = 5;
    const accountAmount = 2000000;
    const transactionAmount = 2000000;

    const searchAccounts = await page.evaluate(
      (amount, limit) => {
        let query = window.indexer.searchAccounts();
        query.currencyGreaterThan(amount);
        query.limit(limit);
        return Promise.resolve(query.do());
      },
      accountAmount,
      limit
    );
    expect(searchAccounts).not.toBeNull();
    expect(searchAccounts).toHaveProperty('accounts');
    expect(searchAccounts['accounts'].length).toBeLessThanOrEqual(limit);
    expect(searchAccounts['accounts'][0]).not.toBeNull();
    expect(searchAccounts['accounts'][0]).toHaveProperty('amount');
    expect(searchAccounts['accounts'][0]['amount']).toBeGreaterThanOrEqual(accountAmount);
    expect(searchAccounts).toHaveProperty('current-round');

    const searchForTransactions = await page.evaluate(
      (amount, limit) => {
        let query = window.indexer.searchForTransactions();
        query.currencyGreaterThan(amount);
        query.limit(limit);
        query.txType('pay');
        return Promise.resolve(query.do());
      },
      transactionAmount,
      limit
    );
    expect(searchForTransactions).not.toBeNull();
    expect(searchForTransactions).toHaveProperty('transactions');
    expect(searchForTransactions['transactions'].length).toBeLessThanOrEqual(limit);
    expect(searchForTransactions['transactions'][0]).not.toBeNull();
    expect(searchForTransactions['transactions'][0]).toHaveProperty('payment-transaction');
    expect(searchForTransactions['transactions'][0]['payment-transaction']).not.toBeNull();
    expect(searchForTransactions['transactions'][0]['payment-transaction']).toHaveProperty(
      'amount'
    );
    expect(
      searchForTransactions['transactions'][0]['payment-transaction']['amount']
    ).toBeGreaterThanOrEqual(accountAmount);
    expect(searchForTransactions).toHaveProperty('current-round');
  });
});
