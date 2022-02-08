/**
 * Exercises dApp functions
 *
 * @group basic-dapp
 */

// Globals
const testNetAccount = 'E2E-Tests'; // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const optInAccount = 'Opt-In'; // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const sendAlgoToAddress = 'AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA';
const testAccountAddress = 'VWUJHTMF3GS2VGLGUHXREVB3RCT7SUZASLQV3DDHLT4EGDAJBICCDYVEKE';
const optInAddress = 'BIJNS6AUZEQJL5KOM74UQ3TBJXHBV5ANS4FQJYTYXFKEGG6QXCI7KSDEVE';
const unsafePassword = 'c5brJp5f';
const samplePage = 'https://google.com/'; // Prefer about:blank, bug in puppeteer
const shortApiTimeout = 250; // API calls are capped

// Set in one test and re-used in later tests
let getParams; // holds the parameters for all txn
let appPage; // re-using one window to run exercise dApp
let baseUrl; // holds the extension url for a local window

async function verifyTransaction(txIdVerify, lastRoundVerify, browserPage) {
  console.log(`Using Verify Tx Function ${txIdVerify} ${lastRoundVerify}`);

  let pendingTx = await browserPage.evaluate(
    async (txIdVerify, lastRoundVerify) => {
      let validateCheck = true;
      let pendingCheck;

      while (validateCheck) {
        pendingCheck = await AlgoSigner.algod({
          ledger: 'TestNet',
          path: '/v2/transactions/pending/' + txIdVerify,
        })
          .then((d) => {
            return d;
          })
          .catch((e) => {
            return e;
          });

        if ('confirmed-round' in pendingCheck) {
          validateCheck = false;
        } else {
          lastRoundVerify += 2;

          await AlgoSigner.algod({
            ledger: 'TestNet',
            path: '/v2/status/wait-for-block-after/' + lastRoundVerify,
          }).catch((e) => {
            return e;
          });
        }
      }

      return pendingCheck;
    },
    txIdVerify,
    lastRoundVerify
  );

  console.log(`Exiting Verify Tx Function ${JSON.stringify(pendingTx)}`);

  return pendingTx;
}

async function signTransaction(txnParams, browserPage) {
  console.log(`Starting Sign Tx Function: ${txnParams.type}`);
  let signedTx = await browserPage
    .evaluate(async (txnParams) => {
      // Get only the promise first
      var signPromise = AlgoSigner.sign(txnParams);

      // Initialize the sign process
      await window.autosign();

      // Return the final result of promise
      return await signPromise;
    }, txnParams)
    .catch((e) => {
      return e;
    });

  if ('message' in signedTx) {
    console.log(`Error: ${JSON.stringify(signedTx)}`);
  } else {
    console.log(`Exiting Sign Tx Function: ${signedTx.txID}`);
  }

  return signedTx;
}

async function postTransaction(localSignedBlob, browserPage) {
  console.log(`Entering Post Tx Function: ${localSignedBlob.txID}`);

  let getTxId = await browserPage.evaluate((localSignedBlob) => {
    return AlgoSigner.send({
      ledger: 'TestNet',
      tx: localSignedBlob.blob,
    })
      .then((d) => {
        return d;
      })
      .catch((e) => {
        return e;
      });
  }, localSignedBlob);

  console.log(`Exiting Post Tx Function`);

  return getTxId;
}

describe('Wallet Setup', () => {
  const extensionName = 'AlgoSigner';
  const extensionPopupHtml = 'index.html';
  const unsafeMenmonic =
    'minor special income smoke lobster oblige jump measure bubble spray soccer range devote rookie pull recall doctor limb resist inject absent rather physical abandon chimney';
  const unsafeOptInMenmonic =
    'pilot turkey dumb casino lecture pact extend never obey alarm agree film brush above visual guilt joy truck unique scorpion core cram grab ability bamboo';

  let extensionPage; // set in beforeAll

  jest.setTimeout(10000);

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

  beforeEach(async () => {});

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
    await extensionPage.waitForSelector('#createWallet');
    await extensionPage.click('#createWallet');
  });

  test('Switch Ledger', async () => {
    await extensionPage.waitForSelector('#selectLedger');
    await extensionPage.screenshot({ path: 'screenshots/test_waiting_for_page.png' });
    await extensionPage.click('#selectLedger');
    await extensionPage.waitForSelector('#selectTestNet');
    await extensionPage.click('#selectTestNet');
  });

  test('Import Base Account', async () => {
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
    await extensionPage.waitForTimeout(1000);
  });

  test('Load Home after Account Import', async () => {
    await extensionPage.waitForTimeout(2000); // loading the account takes time
  });

  test('Import OptIn Account', async () => {
    await extensionPage.click('a.mr-2');
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.waitForSelector('#importAccount');
    await extensionPage.click('#importAccount');
    await extensionPage.waitForSelector('#accountName');
    await extensionPage.type('#accountName', optInAccount);
    await extensionPage.waitForTimeout(100);
    await extensionPage.type('#enterMnemonic', unsafeOptInMenmonic);
    await extensionPage.waitForTimeout(100);
    await extensionPage.click('#nextStep');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', unsafePassword);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
    await extensionPage.waitForTimeout(1000);
  });
});

describe('Basic dApp Setup and GET Tests', () => {
  let getStatus;

  jest.setTimeout(30000);

  beforeAll(async () => {
    appPage = await browser.newPage();
    await appPage.goto(samplePage);
    await appPage.waitForTimeout(1000);
  });

  afterAll(async () => {
    // appPage.close()
  });

  test('Connect Dapp through content.js', async () => {
    await appPage.evaluate(() => {
      AlgoSigner.connect();
    });

    await appPage.waitForTimeout(2000);
    const pages = await browser.pages();
    const popup = pages[pages.length - 1];
    await popup.waitForSelector('#grantAccess');
    await popup.click('#grantAccess');
  });

  test('Get TestNet accounts', async () => {
    const getAccounts = await appPage.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.accounts({ ledger: 'TestNet' })
          .then((d) => {
            console.log(`AlgoSigner Testnet Account reached: ${d}`);
            return d;
          })
          .catch((e) => {
            console.error(`Error connecting  ${e}`);
          })
      );
    });
    console.log(`AlgoSigner Testnet Account reached: ${getAccounts[0].address}`);
    expect(getAccounts[0].address).toMatch(testAccountAddress);
  });

  test('Get params', async () => {
    getParams = await appPage.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.algod({
          ledger: 'TestNet',
          path: '/v2/transactions/params',
        })
          .then((d) => {
            console.log(`TestNet transaction params: ${d}`);
            return d;
          })
          .catch((e) => {
            console.error(`Error fetching params ${e}`);
          })
      );
    });

    console.log(`TestNet transaction params: ${getParams['consensus-version']}`);
    expect(getParams).toHaveProperty('consensus-version');
    expect(getParams).toHaveProperty('fee');
    expect(getParams.fee).toEqual(0);
    expect(getParams).toHaveProperty('min-fee');
    expect(getParams).toHaveProperty('genesis-hash');
    expect(getParams).toHaveProperty('genesis-id');
    expect(getParams).toHaveProperty('last-round');
  });

  test('Get Status', async () => {
    getStatus = await appPage.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.algod({
          ledger: 'TestNet',
          path: '/v2/status',
        })
          .then((d) => {
            console.log(`TestNet status: ${d}`);
            return d;
          })
          .catch((e) => {
            console.error(`Error fetching status ${e}`);
          })
      );
    });

    console.log(`TestNet status: ${getStatus['last-round']}`);
    expect(getStatus).toHaveProperty('time-since-last-round');
    expect(getStatus).toHaveProperty('last-round');
    expect(getStatus).toHaveProperty('last-version');
    expect(getStatus).toHaveProperty('next-version');
    expect(getStatus).toHaveProperty('next-version-round');
    expect(getStatus).toHaveProperty('next-version-supported');
    expect(getStatus).toHaveProperty('stopped-at-unsupported-round');
    expect(getStatus).toHaveProperty('catchup-time');
  });

  test('Get Ledger Supply', async () => {
    const getLedgerSupply = await appPage.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.algod({
          ledger: 'TestNet',
          path: '/v2/ledger/supply',
        })
          .then((d) => {
            console.log(`TestNet supply ${d}`);
            return d;
          })
          .catch((e) => {
            console.error(`Error fetching supply ${e}`);
          })
      );
    });

    console.log(`TestNet supply: ${getLedgerSupply.current_round}`);
    expect(getLedgerSupply).toHaveProperty('current_round');
    expect(getLedgerSupply).toHaveProperty('online-money');
    expect(getLedgerSupply).toHaveProperty('total-money');
  });

  test('Get an Asset', async () => {
    const ownerAccount = 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ';
    const assetIndex = 150821;

    const getAnAsset = await appPage.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.indexer({
          ledger: 'TestNet',
          path: '/v2/assets/150821',
        })
          .then((d) => {
            console.log(`TestNet asset info: ${d}`);
            return d;
          })
          .catch((e) => {
            console.error(`Error fetching asset: ${e}`);
          })
      );
    });

    await appPage.waitForTimeout(2000);
    console.log(`TestNet asset info: ${getAnAsset['asset']['params']['unit-name']}`);
    expect(getAnAsset['asset']['params']['unit-name']).toMatch('dectest');
    expect(getAnAsset.asset.params.name).toMatch('decimal Test');
    expect(getAnAsset['asset']['params']['default-frozen']).toBe(false);
    expect(getAnAsset.asset.params.total).toEqual(1000);
    expect(getAnAsset.asset.params.decimals).toEqual(15);
    expect(getAnAsset.asset.params.clawback).toMatch(ownerAccount);
    expect(getAnAsset.asset.params.creator).toMatch(ownerAccount);
    expect(getAnAsset.asset.params.freeze).toMatch(ownerAccount);
    expect(getAnAsset.asset.params.manager).toMatch(ownerAccount);
    expect(getAnAsset.asset.params.reserve).toMatch(ownerAccount);
    expect(getAnAsset.asset.index).toEqual(assetIndex);
  });

  test('GET: Asset list limited', async () => {
    const shortAssetList = await appPage.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.indexer({
          ledger: 'TestNet',
          path: '/v2/assets?limit=2',
        })
          .then((d) => {
            console.log(`TestNet asset list:  ${d}`);
            return d;
          })
          .catch((e) => {
            console.error(`Error fetching asset list: ${e}`);
          })
      );
    });

    await appPage.waitForTimeout(200);
    console.log(`TestNet asset list:  ${shortAssetList.assets[0].index}`);
    expect(shortAssetList.assets.length).toEqual(2);
    expect(shortAssetList.assets[0].index).toEqual(185);
  });
});

describe('dApp POST Txn Tests (plus Teal compile)', () => {
  let getSignedBlob;
  let getTxId;
  let matchTxId;

  test('POST: Compile Teal', async () => {
    const tealCompiled = await appPage.evaluate(() => {
      return Promise.resolve(
        AlgoSigner.algod({
          ledger: 'TestNet',
          path: '/v2/teal/compile',
          body: 'int 0',
          method: 'POST',
          contentType: 'text/plain',
        })
          .then((d) => {
            console.log(`TestNet Teal compile: ${d}`);
            return d;
          })
          .catch((e) => {
            console.error(`Error compiling Teal: ${e}`);
          })
      );
    });

    await appPage.waitForTimeout(200);
    console.log(`TestNet Teal compile: ${tealCompiled.result}`);
    expect(tealCompiled.result).toMatch('ASABACI=');
  });

  test('Send Tx', async () => {
    // Create a function to map to the puppeteer object
    async function autosign() {
      await appPage.waitForTimeout(1500);
      const pages = await browser.pages();
      var popup = pages[pages.length - 1];
      await appPage.waitForTimeout(500);
      await popup.waitForSelector('#txAlerts');
      await expect(popup.$eval('#danger-tx-list', (e) => e.innerText)).resolves.toContain(
        'Deprecated'
      );
      await popup.waitForSelector('#approveTx');
      await popup.click('#approveTx', { waitUntil: 'networkidle' });
      await popup.waitForSelector('#enterPassword');
      await popup.type('#enterPassword', unsafePassword);
      await popup.waitForSelector('#authButton');
      await popup.click('#authButton', { waitUntil: 'networkidle' });
    }

    // Attach the function to the dapp page for use after popup
    await appPage.exposeFunction('autosign', autosign);

    getSignedBlob = await appPage.evaluate(
      async (testAccountAddress, getParams, sendAlgoToAddress) => {
        const amount = Math.floor(Math.random() * 10);
        let txn = {
          from: testAccountAddress,
          to: sendAlgoToAddress,
          fee: getParams['fee'],
          amount: amount,
          type: 'pay',
          firstRound: getParams['last-round'],
          lastRound: getParams['last-round'] + 1000,
          genesisID: getParams['genesis-id'],
          genesisHash: getParams['genesis-hash'],
          note: 'test string note',
        };

        // Get only the promise first
        var signPromise = AlgoSigner.sign(txn);

        // Initialize the sign process
        await window.autosign();

        // Return the final result of promise
        return await signPromise;
      },
      testAccountAddress,
      getParams,
      sendAlgoToAddress
    );
    console.log(typeof getSignedBlob);
    console.log(`Confirmation: ${JSON.stringify(getSignedBlob)}`);
    expect(getSignedBlob).toHaveProperty('txID');
    expect(getSignedBlob).toHaveProperty('blob');
    matchTxId = getSignedBlob.txID;
  });

  test('Post Signed Blob', async () => {
    getTxId = await appPage.evaluate((getSignedBlob) => {
      return AlgoSigner.send({
        ledger: 'TestNet',
        tx: getSignedBlob.blob,
      })
        .then((d) => {
          return d;
        })
        .catch((e) => {
          return e;
        });
    }, getSignedBlob);

    console.log(`Confirmation: ${JSON.stringify(getTxId)}`);
    expect(getTxId.txId).toEqual(matchTxId);
  });

  test('Overspend Tx', async () => {
    await appPage.waitForTimeout(1000);
    getSignedBlob = await appPage.evaluate(
      async (testAccountAddress, getParams, sendAlgoToAddress) => {
        const amount = 90000000000 + Math.floor(Math.random() * 10);
        let txn = {
          from: testAccountAddress,
          to: sendAlgoToAddress,
          fee: getParams['fee'],
          amount: amount,
          type: 'pay',
          firstRound: getParams['last-round'],
          lastRound: getParams['last-round'] + 1000,
          genesisID: getParams['genesis-id'],
          genesisHash: getParams['genesis-hash'],
          note: 'Very large tx',
        };

        // Get only the promise first
        var signPromise = AlgoSigner.sign(txn);

        // Initialize the sign process
        await window.autosign();

        // Return the final result of promise
        return await signPromise;
      },
      testAccountAddress,
      getParams,
      sendAlgoToAddress
    );

    console.log(`Blob 2: ${getSignedBlob.blob}`);
    expect(getSignedBlob).toHaveProperty('txID');
    expect(getSignedBlob).toHaveProperty('blob');
  });

  test('Post Overspend Blob', async () => {
    getTxId = await appPage.evaluate((getSignedBlob) => {
      return AlgoSigner.send({
        ledger: 'TestNet',
        tx: getSignedBlob.blob,
      })
        .then((d) => {
          return d;
        })
        .catch((e) => {
          return e;
        });
    }, getSignedBlob);

    expect(getTxId.message).toMatch('overspend');
  });
});

describe('dApp Asset Txn Tests', () => {
  // Removed single blob, scope mistakes
  let assetCreateBlob;
  let assetOptInBlob;
  let assetTransferBlob;
  let assetClawBlob;
  let assetCloseBlob;
  let assetFrzBlob;
  let assetUnFrzBlob;
  let assetDestroyBlob;

  let assetIndex;
  let transferAmount;

  let getTxId;

  test('Asset Create Tx', async () => {
    console.log(
      `Starting Asset Create for ${testAccountAddress} using ${JSON.stringify(getParams)}`
    );

    let txn = {
      from: testAccountAddress,
      fee: getParams['fee'],
      assetName: 'AutoTest',
      assetUnitName: 'AT',
      assetTotal: 1000 + Math.round(Math.floor(Math.random() * 30)),
      assetDecimals: 1,
      type: 'acfg',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      assetManager: testAccountAddress,
      assetReserve: testAccountAddress,
      assetFreeze: testAccountAddress,
      assetClawback: testAccountAddress,
      note: 'Asset create',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in localSignedBlob) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetCreateBlob = localSignedBlob; // test section scope

      console.log(`Exiting Asset Create ${localSignedBlob.txID}`);
    }
  });

  test('Post Asset Create Blob', async () => {
    console.log(`Posting Asset Create ${assetCreateBlob.txID}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let getTxId = await postTransaction(assetCreateBlob, appPage);
    if ('message' in getTxId) {
      console.log(`Error: ${JSON.stringify(getTxId)}`);
    } else {
      expect(getTxId.txId).toMatch(assetCreateBlob.txID);
      console.log(`Exiting Asset Create ${getTxId.txId}`);
    }
  });

  test('Verify Asset Pending Tx', async () => {
    console.log(`Verifying Asset Create ${assetCreateBlob.txID}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(assetCreateBlob.txID, getParams['last-round'], appPage);

    assetIndex = pendingTx['asset-index']; // test section scope

    expect(pendingTx['txn']['txn']['snd']).toMatch(testAccountAddress);

    console.log(`Exiting Verify Asset Create ${pendingTx['asset-index']}`);
  });

  test('Asset Opt-in Tx', async () => {
    console.log(`Entering Asset Create/Sign Opt-in Tx: ${assetIndex} `);
    await appPage.waitForTimeout(shortApiTimeout);

    let txn = {
      from: optInAddress,
      to: optInAddress,
      amount: 0,
      fee: getParams['fee'],
      assetIndex: assetIndex,
      type: 'axfer',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      note: 'Asset Opt-In',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in localSignedBlob) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetOptInBlob = localSignedBlob; // test section scope

      console.log(`Exiting Asset Create/Sign Opt-in Tx: ${assetOptInBlob.txID} for ${assetIndex}`);
    }
  });

  test('Post Asset Opt-in Blob', async () => {
    console.log(`Entering Post Asset Opt-in Tx`);
    await appPage.waitForTimeout(shortApiTimeout);

    getTxId = await postTransaction(assetOptInBlob, appPage);

    if ('message' in getTxId) {
      console.log(`Error: ${JSON.stringify(getTxId)}`);
    } else {
      expect(getTxId.txId).toMatch(assetOptInBlob.txID);

      console.log(`Exiting Post Asset Opt-in ${JSON.stringify(getTxId)}`);
    }
  });

  test('Verify Asset Opt-in Pending Tx', async () => {
    console.log(`Verifying Asset Opt-in ${assetOptInBlob.txID}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(assetOptInBlob.txID, getParams['last-round'], appPage);

    expect(pendingTx['txn']['txn']['snd']).toMatch(optInAddress);

    console.log(
      `Exiting Verify Asset Opt-in ${pendingTx['confirmed-round']} for ${assetOptInBlob.txID}`
    );
  });

  test('Asset Transfer Tx', async () => {
    console.log(`Entering Asset Transfer Create/Sign Tx ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let txn = {
      from: testAccountAddress,
      to: optInAddress,
      amount: 2 + Math.round(Math.floor(Math.random() * 10)), // 2 because 1 is not always divisible
      fee: getParams['fee'],
      assetIndex: assetIndex,
      type: 'axfer',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      note: 'Asset Tx',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in getTxId) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetTransferBlob = localSignedBlob; // test section scope
      transferAmount = txn.amount - 2; // test section scope

      console.log(
        `Exiting Asset Transfer Create/Sign Tx ${localSignedBlob.txID} for ${assetIndex}`
      );
    }
  });

  test('Post Asset Transfer Blob', async () => {
    console.log(`Entering Post Asset Transfer Tx for ${assetTransferBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    getTxId = await postTransaction(assetTransferBlob, appPage);

    if ('message' in getTxId) {
      console.log(`Error: ${JSON.stringify(getTxId)}`);
    } else {
      expect(getTxId.txId).toMatch(assetTransferBlob.txID);
      console.log(`Exiting Post Asset Transfer ${JSON.stringify(getTxId)}`);
    }
  });

  test('Verify Asset Transfer Tx', async () => {
    console.log(`Starting Verify Asset Tx: ${assetTransferBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(
      assetTransferBlob.txID,
      getParams['last-round'],
      appPage
    );

    expect(pendingTx['txn']['txn']['snd']).toMatch(testAccountAddress);
    expect(pendingTx['txn']['txn']['arcv']).toMatch(optInAddress);
    expect(pendingTx['txn']['txn']['aamt']).toEqual(transferAmount + 2);

    console.log(
      `Finished verify asset tx: ${assetTransferBlob.txID} of Asset Index ${assetIndex} for ${pendingTx['txn']['txn']['aamt']}`
    );
  });

  test('Asset Clawback Tx', async () => {
    console.log(`Entering Asset Clawback Tx ${assetIndex} for ${transferAmount}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let txn = {
      from: testAccountAddress,
      to: testAccountAddress,
      assetRevocationTarget: optInAddress,
      amount: transferAmount,
      fee: getParams['fee'],
      assetIndex: assetIndex,
      type: 'axfer',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      note: 'Asset Clawback Tx',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in localSignedBlob) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetClawBlob = localSignedBlob; // test section scope

      console.log(
        `Exiting Asset Clawback Create/Sign Tx ${localSignedBlob.txID} for ${assetIndex} for ${transferAmount}`
      );
    }
  });

  test('Post Asset Clawback Blob', async () => {
    console.log(`Entering Post Asset Clawback Tx for ${assetClawBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    getTxId = await postTransaction(assetClawBlob, appPage);

    if ('message' in getTxId) {
      console.log('Error - see message');
    } else {
      expect(getTxId.txId).toMatch(assetClawBlob.txID);
    }

    console.log(`Exiting Post Asset Clawback ${JSON.stringify(getTxId)}`);
  });

  test('Verify Asset Clawback Tx', async () => {
    console.log(`Starting Verify Asset Clawback Tx: ${assetClawBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(assetClawBlob.txID, getParams['last-round'], appPage);

    expect(pendingTx['txn']['txn']['snd']).toMatch(testAccountAddress);
    transferAmount = pendingTx['txn']['txn']['aamt']; // set

    console.log(
      `Finished verify asset clawback tx: ${assetClawBlob.txID} of Asset Index ${assetIndex}`
    );
  });

  test('Asset Freeze Tx', async () => {
    console.log(`Entering Asset Freeze Tx ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let txn = {
      from: testAccountAddress,
      freezeAccount: optInAddress,
      freezeState: true,
      fee: getParams['fee'],
      assetIndex: assetIndex,
      type: 'afrz',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      note: 'Asset Freeze Tx',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in localSignedBlob) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetFrzBlob = localSignedBlob; // test section scope

      console.log(`Exiting Asset Freeze Create/Sign Tx ${localSignedBlob.txID} for ${assetIndex}`);
    }
  });

  test('Post Asset Freeze Blob', async () => {
    console.log(`Entering Post Asset Freeze Tx for ${assetFrzBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    getTxId = await postTransaction(assetFrzBlob, appPage);

    if ('message' in getTxId) {
      console.log('Error - see message');
    } else {
      expect(getTxId.txId).toMatch(assetFrzBlob.txID);
    }

    console.log(`Exiting Post Asset Freeze ${JSON.stringify(getTxId)}`);
  });

  test('Verify Asset Freeze Tx', async () => {
    console.log(`Starting Verify Asset Freeze Tx: ${assetFrzBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(assetFrzBlob.txID, getParams['last-round'], appPage);

    expect(pendingTx['txn']['txn']['snd']).toMatch(testAccountAddress);

    console.log(
      `Finished verify asset freeze tx: ${assetFrzBlob.txID} of Asset Index ${assetIndex}`
    );
  });

  test('Asset Un-Freeze Tx', async () => {
    console.log(`Entering Asset Un-Freeze Tx ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let txn = {
      from: testAccountAddress,
      freezeAccount: optInAddress,
      freezeState: false,
      fee: getParams['fee'],
      assetIndex: assetIndex,
      type: 'afrz',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      note: 'Asset Un-Freeze Tx',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in localSignedBlob) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetUnFrzBlob = localSignedBlob; // test section scope

      console.log(
        `Exiting Asset Un-Freeze Create/Sign Tx ${localSignedBlob.txID} for ${assetIndex}`
      );
    }
  });

  test('Post Asset Un-Freeze Blob', async () => {
    console.log(`Entering Post Asset Un-Freeze Tx for ${assetUnFrzBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    getTxId = await postTransaction(assetUnFrzBlob, appPage);

    if ('message' in getTxId) {
      console.log('Error - see message');
    } else {
      expect(getTxId.txId).toMatch(assetUnFrzBlob.txID);
    }

    console.log(`Exiting Post Un-Asset Freeze ${JSON.stringify(getTxId)}`);
  });

  test('Verify Asset Un-Freeze Tx', async () => {
    console.log(`Starting Verify Un-Asset Un-Freeze Tx: ${assetUnFrzBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(assetUnFrzBlob.txID, getParams['last-round'], appPage);

    expect(pendingTx['txn']['txn']['snd']).toMatch(testAccountAddress);

    console.log(
      `Finished verify asset Un-freeze tx: ${assetUnFrzBlob.txID} of Asset Index ${assetIndex}`
    );
  });

  test('Asset Close-to Tx', async () => {
    console.log(`Entering Asset Close-to Create/Sign Tx ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let txn = {
      from: optInAddress,
      to: testAccountAddress,
      closeRemainderTo: testAccountAddress, // per JS SDK, not txn reference
      amount: 1,
      fee: getParams['fee'],
      assetIndex: assetIndex,
      type: 'axfer',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      note: 'Asset Tx',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in getTxId) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetCloseBlob = localSignedBlob; // test section scope

      console.log(`Exiting Asset Transfer Close-to Tx ${localSignedBlob.txID} for ${assetIndex}`);
    }
  });

  test('Post Asset Close-to Blob', async () => {
    console.log(`Entering Post Asset Close-to Tx for ${assetCloseBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    getTxId = await postTransaction(assetCloseBlob, appPage);

    if ('message' in getTxId) {
      console.log(`Error: ${JSON.stringify(getTxId)}`);
    } else {
      expect(getTxId.txId).toMatch(assetCloseBlob.txID);
      console.log(`Exiting Post Asset Close-to ${JSON.stringify(getTxId)}`);
    }
  });

  test('Verify Asset Close-to Tx', async () => {
    console.log(`Starting Verify Asset Close-to Tx: ${assetCloseBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(assetCloseBlob.txID, getParams['last-round'], appPage);

    expect(pendingTx['txn']['txn']['snd']).toMatch(optInAddress);
    expect(pendingTx['txn']['txn']['arcv']).toMatch(testAccountAddress);
    expect(pendingTx['txn']['txn']['aamt']).toEqual(1);
    expect(pendingTx['txn']['txn']['aclose']).toMatch(testAccountAddress);

    console.log(
      `Finished verify asset Close-to tx: ${assetCloseBlob.txID} of Asset Index ${assetIndex} for ${pendingTx['txn']['txn']['aamt']}`
    );
  });

  test('Asset Destroy Tx', async () => {
    console.log(`Entering Asset Destroy Tx ${assetIndex} for ${transferAmount}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let txn = {
      from: testAccountAddress,
      fee: getParams['fee'],
      assetIndex: assetIndex,
      type: 'acfg',
      firstRound: getParams['last-round'],
      lastRound: getParams['last-round'] + 1000,
      genesisID: getParams['genesis-id'],
      genesisHash: getParams['genesis-hash'],
      note: 'Asset Destroy Tx',
    };

    let localSignedBlob = await signTransaction(txn, appPage);

    if ('message' in localSignedBlob) {
      console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
    } else {
      expect(localSignedBlob).toHaveProperty('txID');
      expect(localSignedBlob).toHaveProperty('blob');

      assetDestroyBlob = localSignedBlob; // test section scope

      console.log(`Exiting Asset Destroy Create/Sign Tx ${localSignedBlob.txID} for ${assetIndex}`);
    }
  });

  test('Post Asset Destroy Blob', async () => {
    console.log(`Entering Post Asset Destroy Tx for ${assetDestroyBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    getTxId = await postTransaction(assetDestroyBlob, appPage);

    if ('message' in getTxId) {
      console.log('Error - see message');
    } else {
      expect(getTxId.txId).toMatch(assetDestroyBlob.txID);
    }

    console.log(`Exiting Post Asset Destroy ${JSON.stringify(getTxId)}`);
  });

  test('Verify Asset Destroy Tx', async () => {
    console.log(`Starting Verify Asset Destroy Tx: ${assetDestroyBlob.txID} for ${assetIndex}`);
    await appPage.waitForTimeout(shortApiTimeout);

    let pendingTx = await verifyTransaction(
      assetDestroyBlob.txID,
      getParams['last-round'],
      appPage
    );

    expect(pendingTx['txn']['txn']['snd']).toMatch(testAccountAddress);

    console.log(
      `Finished verify asset Destroy tx: ${assetDestroyBlob.txID} of Asset Index ${assetIndex}`
    );
  });

  // // The asset just doesn't appear fast enough for this yet
  // // test('Wallet Verify Asset Transfer', async () => {
  // //     console.log(`Back in the browser to verify Asset transfer for ${assetIndex}`)
  // //     await appPage.goto(baseUrl);
  // //     await appPage.waitForTimeout(5000) // wait on tx to process
  // //     await appPage.click('#selectLedger')
  // //     await appPage.waitFor(5000)
  // //     await appPage.click('#selectTestNet')
  // //     await appPage.waitFor(5000)
  // //     await appPage.waitForSelector(`#account_${optInAccount}`)
  // //     await appPage.click(`#account_${optInAccount}`)
  // //     await appPage.waitForTimeout(30000)
  // //     await expect(appPage.$eval('#accountName', e => e.innerText)).resolves.toMatch(/Opt-In/)
  // //     await expect(appPage.$eval(`#asset_${assetIndex}`, e => e.innerText)).resolves.toMatch(assetIndex)
  // //     console.log(`Exiting Wallet Verify`)
  // // })
});
