/**
 * Exercises dApp - originally required manual intervention 
 * 
 * @group manual-dapp
 */

const testNetAccount = "E2E-Tests"     // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
const testAccountAddress = "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
const unsafePassword = 'c5brJp5f'

describe('Wallet Setup', () => {
    
    const extensionName = 'AlgoSigner'; 
    const extensionPopupHtml = 'index.html';
    const unsafeMenmonic = 'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy';
    const amount = Math.floor((Math.random() * 10) + .1); // txn size, modify multiplier for bulk
    const secondTestNetAccount = "Created-Account";
    let baseUrl // set in beforeAll
    let txId // returned tx id from send txn 

    jest.setTimeout(10000);

    beforeAll(async () => {
        const targets = await browser.targets();       
        const extensionTarget = await targets.find(({ _targetInfo }) => {
            return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
        });
        
        const extensionUrl = extensionTarget._targetInfo.url || '';
        const extensionID = extensionUrl.split('/')[2];

        baseUrl = `chrome-extension://${extensionID}/${extensionPopupHtml}`;      
        await page.goto(baseUrl); 
    });

    test('Welcome Page Title', async () => {
        await expect(page.title()).resolves.toMatch(extensionName);
    })

    test('Create New Wallet', async () => {
        await page.waitForSelector('#setPassword');
        await page.click('#setPassword');        
    })

    test('Set new wallet password', async () => {  
        await expect(page.$eval('.mt-2', e => e.innerText)).resolves.toMatch('my_1st_game_was_GALAGA!');
        await page.waitForSelector('#createWallet');
        await page.type('#setPassword',unsafePassword);
        await page.type('#confirmPassword',unsafePassword);
        await page.waitForSelector('#createWallet');
        await page.click('#createWallet');
    })

    test('Switch Ledger', async () => {
        await page.screenshot({path: 'screenshots/test_waiting_for_page.png'});
        await page.waitForSelector('#selectLedger');
        await page.click('#selectLedger');
        await page.waitForSelector('#selectTestNet');
        await page.click('#selectTestNet');
    })

    test('Import Account', async () => {
        await page.waitForSelector('#addAccount');
        await page.click('#addAccount');
        await page.waitForSelector('#importAccount');
        await page.click('#importAccount');
        await page.waitForSelector('#accountName');
        await page.type('#accountName',testNetAccount);
        await page.waitForSelector('#enterMnemonic');
        await page.type('#enterMnemonic', unsafeMenmonic);
        await page.waitForSelector('#nextStep');
        await page.click('#nextStep');
        await page.waitForSelector('#enterPassword');
        await page.type('#enterPassword',unsafePassword);
        await page.waitForSelector('#authButton');
        await page.click('#authButton');
        await page.waitForSelector('#addAccount');
    })

})

describe('Basic dApp Tests', () => {

    const sampleDapp = 'https://purestake.github.io/algosigner-dapp-example/legacy/index.html'
    const samplePage = 'https://purestake.com'
    let getParams
    let connected
    let getStatus
    let getSignedBlob
    let getTxId
    var dappPage

    jest.setTimeout(30000);

    test('Connect Dapp through content.js', async () => {     
        dappPage = await browser.newPage();

        await dappPage.goto(sampleDapp);
        await dappPage.waitForSelector("#connect");

        connected = await dappPage.evaluate(() => {
            AlgoSigner.connect()        
        });  

        await dappPage.waitFor(1000);
        const pages = await browser.pages();
        var popup = pages[pages.length-1];

        await popup.waitForSelector("#grantAccess");
        await popup.click('#grantAccess', {waitUntil: 'networkidle2'});
    })

    test('Get TestNet accounts', async () => {
        console.log('Get TestNet accounts starting');
        var getAccounts = await dappPage.evaluate(() => {
            console.log('Get TestNet accounts appPage evaluate');      
            return AlgoSigner.accounts({ledger: 'TestNet'})
            .then((d) => {
                console.log('AlgoSigner Tesnet Account reached.')
                document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                return d;
            })
            .catch((e) => {
                console.log('AlgoSigner failed to get Tesnet Account.')
                console.error(e);
                return e;
            })       
        })

        expect(getAccounts[0].address).toMatch(testAccountAddress);
    })

    test('Get params', async () => {       
        getParams = await dappPage.evaluate(() => {
            return AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/transactions/params'
                })
                .then((d) => {
                    document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                    return d;
                })
                .catch((e) => {
                    console.error(e);
                    document.getElementById("log").value += JSON.stringify(e) + "\n\n";
                });
        })

        expect(getParams).toHaveProperty('consensus-version')
        expect(getParams).toHaveProperty('fee')
        expect(getParams.fee).toEqual(0)
        expect(getParams).toHaveProperty('min-fee')        
        expect(getParams).toHaveProperty('genesis-hash')
        expect(getParams).toHaveProperty('genesis-id')
        expect(getParams).toHaveProperty('last-round')

    })



    test('Send Tx', async () => {   
        // Create a function to map to the puppeteer object
        async function autosign () {
            await dappPage.waitFor(1000);  
            const pages = await browser.pages();
            var popup = pages[pages.length-1];
            await popup.waitForSelector("#approveTx");
            await popup.click('#approveTx', {waitUntil: 'networkidle2'});
            await popup.waitForSelector("#enterPassword");
            await popup.type('#enterPassword',unsafePassword);
            await popup.waitForSelector("#authButton");
            await popup.click('#authButton', {waitUntil: 'networkidle2'});          
        }

        // Attach the function to the dapp page for use after popup
        await dappPage.exposeFunction("autosign", autosign);

        getSignedBlob = await dappPage.evaluate(async (testAccountAddress, getParams, sendAlgoToAddress) => {
            const amount = Math.floor(Math.random() * 10); 
            let txn = {
                "from": testAccountAddress,
                "to": sendAlgoToAddress,
                "fee": getParams['fee'],
                "amount": amount,
                "type": "pay",
                "firstRound": getParams['last-round'],
                "lastRound": getParams['last-round'] + 1000,
                "genesisID": getParams['genesis-id'],
                "genesisHash": getParams['genesis-hash'],
                "note": "test string note"
            };      

            // Get only the promise first
            var signPromise = AlgoSigner.sign(txn);

            // Initialize the sign process
            await window.autosign();

            // Return the final result of promise
            return await signPromise;
        }, testAccountAddress, getParams, sendAlgoToAddress);
    })

    test('Post Signed Blob', async () => {  
        getTxId = await dappPage.evaluate( (getSignedBlob) => {
            return AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: getSignedBlob.blob
                })
                .then((d) => {
                    document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                    return d;
                })
                .catch((e) => {
                    console.error(e);
                    document.getElementById("log").value += JSON.stringify(e) + "\n\n";
                });
        }, getSignedBlob);

        console.log(`Confirmation: ${JSON.stringify(getTxId)}`)
    })
})


    

