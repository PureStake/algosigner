/**
 * Basic e2e tests for GitHub to pass
 * 
 * @group dapp
 */

describe('Basic Happy Path Tests', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafePassword = 'c5brJp5f'
    const unsafeMenmonic = 'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy'
    const testNetAccount = "E2E-Tests" // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
    const testAccountAddress = "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
    const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
    const amount = Math.floor(Math.random() * 10); // txn size, modify multiplier for bulk
    const secondTestNetAccount = "Created-Account"

    let baseUrl // set in beforeAll
    let extensionPage // set in beforeAll
    let txId // returned tx id from send txn 

    jest.setTimeout(10000);

    beforeAll( async () => {
        const dummyPage = await browser.newPage();
        await dummyPage.waitFor(2000); // arbitrary wait time.
        const targets = await browser.targets();

        const extensionTarget = targets.find(({ _targetInfo }) => {
            return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
        });
        
        const extensionUrl = extensionTarget._targetInfo.url || '';
        const [,, extensionID] = extensionUrl.split('/');

        baseUrl = `chrome-extension://${extensionID}/${extensionPopupHtml}`;

        extensionPage = await browser.newPage();
        await extensionPage.goto(baseUrl);
    })
    
    beforeEach(async () => {
    })

    test('Welcome Page Title', async () => {
        await expect(extensionPage.title()).resolves.toMatch(extensionName)
    })

    test('Create New Wallet', async () => {
        await extensionPage.waitForSelector('#setPassword')
        await extensionPage.click('#setPassword')        
    })

    test('Set new wallet password', async () => {
        await expect(extensionPage.$eval('.mt-2', e => e.innerText)).resolves.toMatch('my_1st_game_was_GALAGA!')
        await extensionPage.waitForSelector('#createWallet')
        await extensionPage.type('#setPassword',unsafePassword);
        await extensionPage.type('#confirmPassword',unsafePassword);
        await extensionPage.waitFor(2000)
        await extensionPage.waitForSelector('#createWallet')
        await extensionPage.click('#createWallet')
    })

    test('Switch Ledger', async () => {
        await extensionPage.waitFor(2000)
        await extensionPage.screenshot({path: 'screenshots/test_waiting_for_page.png'})
        await extensionPage.click('#selectLedger')
        await extensionPage.waitFor(500)
        await extensionPage.click('#selectTestNet')
    })

    test('Import Account', async () => {
        await extensionPage.waitForSelector('#addAccount')
        await extensionPage.click('#addAccount')
        await extensionPage.waitForSelector('#importAccount')
        await extensionPage.click('#importAccount')
        await extensionPage.waitForSelector('#accountName')
        await extensionPage.type('#accountName',testNetAccount);
        await extensionPage.waitFor(100)
        await extensionPage.type('#enterMnemonic', unsafeMenmonic)
        await extensionPage.waitFor(100)
        await extensionPage.click('#nextStep')
        await extensionPage.waitForSelector('#enterPassword')
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitFor(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitFor(1000)
    })

})

describe('Try out content.js', () => {

    const sampleDapp = 'https://fxgamundi.github.io/algosigner-dapp/'
    const samplePage = 'https://purestake.com'
    let resolved_info = ''
    let catched_info = ''
    let txParams
    let appPage
    let connected

    jest.setTimeout(10000);

    beforeAll( async () => {
        appPage = await browser.newPage();
        await appPage.goto(sampleDapp);
        await appPage.waitFor(9000)
    })

    test('Try out access to content.js', async () => {
        
        // const newPagePromise = new Promise(x => page.once('popup', x));

        connected = await appPage.evaluate( () => {
            AlgoSigner.connect()
            });
             
        await appPage.waitFor(2000)

        const pages = await browser.pages();
        const popup = pages[pages.length-1];
        await popup.waitForSelector("#grantAccess");
        await popup.click("#grantAccess");
    })

    test('Get params', async () => {
        
        getParams = await appPage.evaluate( () => {

            AlgoSigner.algod({
                ledger: 'TestNet',
                path: '/v2/transactions/params'
            })
            .then((d) => {
               // document.getElementById("log").value += resolved_info;
                document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                txParams = d;
            })
            .catch((e) => {
                console.error(e);
                //document.getElementById("log").value += catched_info;
                document.getElementById("log").value += JSON.stringify(e) + "\n\n";
            });
        })

        await appPage.waitFor(2000)
    })

    test('Get Status', async () => {
        getStatus = await appPage.evaluate( () => {

            AlgoSigner.algod({
                ledger: 'TestNet',
                path: '/v2/status'
            })
            .then((d) => {
                document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                txParams = d;
            })
            .catch((e) => {
                console.error(e);
                document.getElementById("log").value += JSON.stringify(e) + "\n\n";
            });
        })

        await appPage.waitFor(2000)
    })

    test('Get Ledger Supply', async () => {
        getStatus = await appPage.evaluate( () => {

            AlgoSigner.algod({
                ledger: 'TestNet',
                path: '/v2/ledger/supply'
            })
            .then((d) => {
                document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                txParams = d;
            })
            .catch((e) => {
                console.error(e);
                document.getElementById("log").value += JSON.stringify(e) + "\n\n";
            });
        })

        await appPage.waitFor(2000)
    })

    test('Get Asset', async () => {
        getStatus = await appPage.evaluate( () => {

            AlgoSigner.indexer({
                ledger: 'TestNet',
                path: '/v2/assets/3797'
            })
            .then((d) => {
                document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                txParams = d;
            })
            .catch((e) => {
                console.error(e);
                document.getElementById("log").value += JSON.stringify(e) + "\n\n";
            });
        })

        await appPage.waitFor(2000)
    })

    test('just sit there', async () => {
        await appPage.waitFor(9000)
    })
})


    

