// Basic e2e tests for the AlgoSigner UI

describe('welcome tests', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafePassword = 'c5brJp5f'

    let baseUrl // return from the beforeAll
    let extensionPage // return from beforeEach

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
    })
    
    beforeEach(async () => {
        extensionPage = await browser.newPage();
        await extensionPage.goto(baseUrl);
    })

    test('Welcome Page Title', async () => {
        await expect(extensionPage.title()).resolves.toMatch(extensionName)
    })

    test('Create Wallet with Password', async () => {
        await extensionPage.click('.button')
        await extensionPage.waitFor(2000)
        await expect(extensionPage.$eval('h1', e => e.innerText)).resolves.toMatch('Create a Memorable Password')
        await extensionPage.type('#setPassword',unsafePassword);
        await extensionPage.type('#confirmPassword',unsafePassword);
        await extensionPage.click('.button')
    })

    test('Import an Account', async () => {
        //
    })

})