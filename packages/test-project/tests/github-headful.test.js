/**
 * Basic e2e tests for GitHub to pass
 * 
 * @group github
 */

describe('Basic Happy Path Tests', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafePassword = 'c5brJp5f'

    let baseUrl // set in beforeAll
    let extensionPage // set in beforeAll

    jest.setTimeout(5000);

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
        await extensionPage.screenshot({path: 'built.png'})     
    })

});