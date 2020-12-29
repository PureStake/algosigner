/**
 * Basic e2e tests for the AlgoSigner UI
 * 
 * @group basic-ui
 */

describe('Basic Happy Path Tests', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafePassword = 'c5brJp5f'
    const unsafeMenmonic = 'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy'
    const testNetAccount = "E2E-Tests" // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
    const testAccountAddress = "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
    const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
    const amount = Math.floor((Math.random() * 10) + .1); // txn size, modify multiplier for bulk
    const secondTestNetAccount = "Created-Account"

    let baseUrl // set in beforeAll
    let extensionPage // set in beforeAll
    let txId // returned tx id from send txn 

    jest.setTimeout(10000);
    // todo - switch tests to single page object

    beforeAll( async () => {
        const dummyPage = await browser.newPage();
        await dummyPage.waitForTimeout(2000); // arbitrary wait time.
        const targets = await browser.targets();

        const extensionTarget = targets.find(({ _targetInfo }) => {
            return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
        });
        
        const extensionUrl = extensionTarget._targetInfo.url || '';
        const [,, extensionID] = extensionUrl.split('/');

        baseUrl = `chrome-extension://${extensionID}/${extensionPopupHtml}`;

        extensionPage = await browser.newPage();
        extensionPage.on('console', msg => console.log('PAGE LOG:', msg.text()));
        dummyPage.close();
        await extensionPage.goto(baseUrl);
    })
    
    beforeEach(async () => {
    })

    afterAll(async () => {
        extensionPage.close()
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
        await extensionPage.waitForTimeout(2000)
        await extensionPage.waitForSelector('#createWallet')
        await extensionPage.click('#createWallet')
    })

    test('Switch Ledger', async () => {
        await extensionPage.waitForTimeout(4000)
        await extensionPage.screenshot({path: 'screenshots/test_waiting_for_page.png'})
        await extensionPage.click('#selectLedger')
        await extensionPage.waitForTimeout(500)
        await extensionPage.click('#selectTestNet')
    })

    test('Import Account', async () => {
        await extensionPage.waitForSelector('#addAccount')
        await extensionPage.click('#addAccount')
        await extensionPage.waitForSelector('#importAccount')
        await extensionPage.click('#importAccount')
        await extensionPage.waitForSelector('#accountName')
        await extensionPage.type('#accountName',testNetAccount);
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#enterMnemonic', unsafeMenmonic)
        await extensionPage.waitForTimeout(100)
        await extensionPage.click('#nextStep')
        await extensionPage.waitForSelector('#enterPassword')
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitForTimeout(1000)
    })

    test('Load Home after Account Import', async () => {
        await extensionPage.waitForTimeout(2000) // loading the account takes time
    })

    test('Load Account Info', async () => {       
        await extensionPage.waitForSelector('#account_'+testNetAccount)
        await extensionPage.click('#account_'+testNetAccount)
        await extensionPage.waitForTimeout(1000)
        await expect(extensionPage.$eval('#accountName', e => e.innerText)).resolves.toMatch(/E2E-Tests/)

    })

    test('Send Transaction', async () => {
        await extensionPage.click('#sendAlgos')
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#amountAlgos', amount.toString());
        await extensionPage.type('#to-address',sendAlgoToAddress);
        await extensionPage.type('#note', "AutoTest Send Algo");
        await extensionPage.click('#submitSendAlgos')
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitForTimeout(2000)
        await extensionPage.waitForSelector('#txId')
        txId = await extensionPage.$eval('#txId', e => e.innerText) // setup for another test
        await extensionPage.click('#backToWallet')
        await extensionPage.waitForTimeout(3000)

    })

    test('Transaction Errors: OverSpend', async () => {
        await extensionPage.click('#sendAlgos')
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#amountAlgos', '900000');
        await extensionPage.type('#to-address',sendAlgoToAddress);
        await extensionPage.type('#note', "AutoTest Overspend Algo");
        await extensionPage.click('#submitSendAlgos')
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitForTimeout(2000)
        await extensionPage.waitForSelector('#tx-error')
        await extensionPage.waitForTimeout(2000)

        let pageError = await extensionPage.$eval('#tx-error', e => e.innerText)
        await expect(pageError).toMatch("Overspending. Your account doesn't have sufficient funds.")

        await extensionPage.click('button.modal-close')
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('svg.fa-chevron-left')
        await extensionPage.waitForTimeout(3000)
    })

    test('Transaction Errors: Invalid Field - Amount', async () => {
        await extensionPage.click('#sendAlgos')
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#amountAlgos', '9999999999.999999');
        await extensionPage.type('#to-address',sendAlgoToAddress);
        await extensionPage.type('#note', "AutoTest Invalid Amount");
        await extensionPage.click('#submitSendAlgos')
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitForTimeout(2000)
        await extensionPage.waitForSelector('#tx-error')
        await extensionPage.waitForTimeout(2000)

        let pageError = await extensionPage.$eval('#tx-error', e => e.innerText)
        expect(pageError).toMatch('One or more fields are not valid. Please check and try again.')

        await extensionPage.click('button.modal-close')
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('svg.fa-chevron-left')
        await extensionPage.waitForTimeout(3000)

    })

    test('Load Account Details', async () => {
        await extensionPage.click('#showDetails')
        await extensionPage.waitForSelector('#accountAddress')
        await expect(extensionPage.$eval('#accountAddress', e => e.innerText)).resolves.toBe(testAccountAddress)
        await expect(extensionPage).toMatchElement('#accountAddress')
    })

    test('Delete Account', async () => {
        await extensionPage.click('#deleteAccount')
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitForTimeout(2000)
    })

    test('Verify Account Deleted', async () => {
        await extensionPage.waitForSelector('#addAccount')
        await expect(extensionPage).not.toMatchElement('#accountAddress')
        
    })

})


// // Create a new account in AlgoSigner
describe('Create Account', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafePassword = 'c5brJp5f'
    const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
    const amount = Math.floor(Math.random() * 10); // txn size, modify multiplier for bulk
    const testNetAccount = "Created-Account"

    let baseUrl // set in beforeAll
    let extensionPage // set in beforeAll
    let createdAccountAddress // returned tx id from send txn
    let mnemonicArray = [] 

    jest.setTimeout(10000);

    beforeAll( async () => {
        const dummyPage = await browser.newPage();
        await dummyPage.waitForTimeout(2000); // arbitrary wait time.
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
    
    afterAll(async () => {
        extensionPage.close()
    })

    beforeEach(async () => {

    })

    test('Create An Account, Step 1 - Enter Account Name', async () => {
        await extensionPage.waitForSelector('#addAccount')
        await extensionPage.click('#addAccount')
        await extensionPage.waitForSelector('#createAccount')
        await extensionPage.click('#createAccount')
        await extensionPage.type('#setAccountName',testNetAccount);
        await extensionPage.click('#nextStep')
    })

    test('Create An Account, Step 2 - Get Mnemonic', async () => {
        await extensionPage.click('#accountAddress')
        createdAccountAddress = await extensionPage.$eval('#accountAddress', e => e.innerText) // setup for another test
        
        for(let i=1; i<=25; i++) {
            mnemonicArray[i] = await extensionPage.$eval('#div_'+i, e => e.innerText) 
        }
        await extensionPage.waitForSelector('#recordCheckbox')
        await extensionPage.click('#recordCheckbox')
        await extensionPage.click('#nextStep')
    })

    test('Create An Account, Step 3 - Use Mnemonic', async () => {
        await extensionPage.waitForSelector('#enterMnemonic')

        for(let i=1; i<=25; i++) {
    
            // ugly but works
            if(mnemonicArray[i].search('\n') != -1) {
                let actualWord = mnemonicArray[i].split('\n');
                mnemonicArray[i] = actualWord[1];
            }
                await extensionPage.waitForSelector('#'+mnemonicArray[i])
                await extensionPage.click('#'+mnemonicArray[i]) 
        }
        await extensionPage.click('#nextStep')

    })

    test('Create an Account, Step 4 - Write Account into Storage', async () =>{
        await extensionPage.waitForSelector('#enterPassword')
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
    })

    test('Verify Account is Created', async () => {       
        await extensionPage.waitForSelector('#account_'+testNetAccount)
        await extensionPage.click('#account_'+testNetAccount)
        await extensionPage.waitForTimeout(500)
        await expect(extensionPage.$eval('#accountName', e => e.innerText)).resolves.toMatch(/Created-Account/)
    })

    test('Load Account Details', async () => {
        await extensionPage.click('#showDetails')
        await extensionPage.waitForSelector('#accountAddress')
        await expect(extensionPage.$eval('#accountAddress', e => e.innerText)).resolves.toBe(createdAccountAddress)
        await expect(extensionPage).toMatchElement('#accountAddress')
    })

    test('Delete Account', async () => {
        await extensionPage.click('#deleteAccount')
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitForTimeout(2000)
    })

    test('Verify Account Deleted', async () => {
        await extensionPage.waitForSelector('#addAccount')
        await expect(extensionPage).not.toMatchElement('#accountAddress')
        
    })

});