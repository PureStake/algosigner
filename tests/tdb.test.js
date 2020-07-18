// Basic e2e tests for the AlgoSigner UI



describe('welcome tests', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafePassword = 'c5brJp5f'
    const unsafeMenmonic = 'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy'
    const testNetAccount = "E2E-Tests" // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
    const testAccountAddress = "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
    const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
    
    let amount = Math.floor(Math.random() * 10); // modify multiplier for bulk
    let baseUrl // return from the beforeAll
    let extensionPage // return from beforeEach
    let txId // returned tx id

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
        // turns out we should not re-open the page
        // extensionPage = await browser.newPage();
        // await extensionPage.goto(baseUrl);
    })

    test('Welcome Page Title', async () => {
        await expect(extensionPage.title()).resolves.toMatch(extensionName)
    })

    test('Create Wallet with Password', async () => {
        await extensionPage.click('.button')        
        await expect(extensionPage.$eval('.mt-2', e => e.innerText)).resolves.toMatch('my_1st_game_was_GALAGA!')
        await extensionPage.type('#setPassword',unsafePassword);
        await extensionPage.type('#confirmPassword',unsafePassword);
        await extensionPage.click('#createWallet')
    })

    test('Switch Ledger', async () => {
        await extensionPage.waitFor(2000)
        await extensionPage.click('#selectLedger')
        await extensionPage.waitFor(500)
        await extensionPage.click('#selectTestNet')
    })

    test('Import Account', async () => {
        await extensionPage.waitFor(500)
        await extensionPage.click('#addAccount')
        await extensionPage.waitFor(500)
        await extensionPage.click('#importAccount')
        await extensionPage.waitFor(500)
        await extensionPage.type('#accountName',testNetAccount);
        await extensionPage.waitFor(100)
        await extensionPage.type('#enterMnemonic', unsafeMenmonic)
        await extensionPage.waitFor(100)
        await extensionPage.click('#nextStep')
        await extensionPage.waitFor(100)
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitFor(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitFor(1000)
    })

    test('Load Home after Account Import', async () => {
        await extensionPage.waitFor(2000) // loading the account takes time
    })

    test('Load Account Info', async () => {       
        await extensionPage.waitForSelector('#account_'+testNetAccount)
        await extensionPage.click('#account_'+testNetAccount)
        await extensionPage.waitFor(1000)
        await expect(extensionPage.$eval('#accountName', e => e.innerText)).resolves.toMatch(/E2E-Tests/)

    })

    test('Send Transaction', async () => {
        await extensionPage.click('#sendAlgos')
        await extensionPage.waitFor(100)
        await extensionPage.type('#amountAlgos', amount.toString());
        await extensionPage.type('#to-address',sendAlgoToAddress);
        await extensionPage.type('#note', "AutoTest Send Algo");
        await extensionPage.click('#submitSendAlgos')
        await extensionPage.waitFor(100)
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitFor(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitFor(2000)
        await extensionPage.waitForSelector('#txId')
        txId = await extensionPage.$eval('#txId', e => e.innerText) // setup for another test
        await extensionPage.click('#backToWallet')
        await extensionPage.waitFor(3000)

    })

    test('Load Account Info Again', async () => {       
        await extensionPage.waitForSelector('#account_'+testNetAccount)
        await extensionPage.click('#account_'+testNetAccount)
        await extensionPage.waitFor(500)
        await expect(extensionPage.$eval('#accountName', e => e.innerText)).resolves.toMatch(/E2E-Tests/)
    })

    // test('Tx ID Present', async () => {
    //     await extensionPage.waitFor(5000)
    //     // its not there yet!
    //     await extensionPage.click('#div_'+txId)
    //     })

    // works - come back later to do delete after this step
    test('Load Account Details', async () => {
        await extensionPage.click('#showDetails')
        await extensionPage.waitForSelector('#accountAddress')
        await expect(extensionPage.$eval('#accountAddress', e => e.innerText)).resolves.toBe(testAccountAddress)
    })

    test('Delete Account', async () => {
        await extensionPage.click('#deleteAccount')
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitFor(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitFor(2000)
    })

})