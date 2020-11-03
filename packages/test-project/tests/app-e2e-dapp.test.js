/**
 * Exercises dApp functions
 * 
 * @group app-dapp
 */

// TODO refactor test suites to have one create / setup 
// TODO These are very delicate and should be rewritten

const testNetAccount = "App - E2E-Tests"      // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const optInAccount = "App - Opt-In"         
const testAccountAddress = "VWUJHTMF3GS2VGLGUHXREVB3RCT7SUZASLQV3DDHLT4EGDAJBICCDYVEKE"
const optInAddress = "BIJNS6AUZEQJL5KOM74UQ3TBJXHBV5ANS4FQJYTYXFKEGG6QXCI7KSDEVE"
const unsafePassword = 'c5brJp5f'
const samplePage = 'https://google.com/' // Prefer about:blank, bug in puppeteer
const shortApiTimeout = 250 // API calls are capped
const applicationIndex = 13075667 // static for 1.1.0

 // Set in one test and re-used in later tests
 let getParams   // holds the parameters for all txn
 let appPage     // re-using one window to run exercise dApp
 let baseUrl     // holds the extension url for a local window

jest.setTimeout(20000);

async function verifyTransaction(txIdVerify, lastRoundVerify, browserPage) {
    console.log(`Using Verify Tx Function ${txIdVerify} ${lastRoundVerify}`)
    
    let pendingTx = await browserPage.evaluate(async (txIdVerify, lastRoundVerify) => {
        
        let validateCheck = true;
        let pendingCheck;

        while(validateCheck) {
            
            pendingCheck = await AlgoSigner.algod({
                ledger: 'TestNet',
                path: '/v2/transactions/pending/' + txIdVerify
            })
            .then((d) => {
                return d;
            })
            .catch((e) => {
                return(e)
            });
            
            if("confirmed-round" in pendingCheck) {
                validateCheck = false;
            }
            else {
                lastRoundVerify += 2;

                await AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/status/wait-for-block-after/' + lastRoundVerify
                })
                .catch((e) => {
                    return(e)
                });
            }
        }            

        return pendingCheck;
    }, txIdVerify, lastRoundVerify); 

    console.log(`Exiting Verify Tx Function ${JSON.stringify(pendingTx)}`)

    return pendingTx
}

async function signTransaction(txnParams, browserPage) {
    console.log(`Starting Sign Tx Function: ${txnParams.type}`)
    signedTx = await browserPage.evaluate(async (txnParams) => {
        
        // Get only the promise first
        var signPromise = AlgoSigner.sign(txnParams);

        // Initialize the sign process
        await window.autosign();
        
        // Return the final result of promise
        return await signPromise;

    }, txnParams)
    .catch((e) => {
        return e
    })
    
    if("message" in signedTx) { 
        console.log(`Error: ${JSON.stringify(signedTx)}`);
    }
    else {
        console.log(`Exiting Sign Tx Function: ${signedTx.txID}`) 
    }

    return signedTx
}

async function postTransaction(localSignedBlob, browserPage){
    console.log(`Entering Post Tx Function: ${localSignedBlob.txID}`)

    getTxId = await browserPage.evaluate( (localSignedBlob) => {
        return AlgoSigner.send({
                ledger: 'TestNet',
                tx: localSignedBlob.blob
            })
            .then((d) => {
                return d;
            })
            .catch((e) => {
                return(e)
            });
    }, localSignedBlob);
    
    console.log(`Exiting Post Tx Function`);

    return getTxId;
}

async function autosign () {
    await appPage.waitForTimeout(1000);  
    const pages = await browser.pages();
    var popup = pages[pages.length-1];
    await popup.waitForSelector("#approveTx");
    await popup.click('#approveTx', {waitUntil: 'networkidle2'});
    await popup.waitForSelector("#enterPassword");
    await popup.type('#enterPassword',unsafePassword);
    await popup.waitForSelector("#authButton");
    await popup.click('#authButton', {waitUntil: 'networkidle2'});          
}

// direct copy
describe('Wallet Setup', () => {
     
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafeMenmonic = 'minor special income smoke lobster oblige jump measure bubble spray soccer range devote rookie pull recall doctor limb resist inject absent rather physical abandon chimney'
    const unsafeOptInMenmonic = 'pilot turkey dumb casino lecture pact extend never obey alarm agree film brush above visual guilt joy truck unique scorpion core cram grab ability bamboo'

    let extensionPage // set in beforeAll

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
        await extensionPage.waitForTimeout(2000)
        await extensionPage.click('#selectLedger')
        await extensionPage.waitForTimeout(500)
        await extensionPage.click('#selectTestNet')
    })

    test('Import Base Account', async () => {
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

    test('Import OptIn Account', async () => {
        await extensionPage.click('a.mr-2')
        await extensionPage.waitForSelector('#addAccount')
        await extensionPage.click('#addAccount')
        await extensionPage.waitForSelector('#importAccount')
        await extensionPage.click('#importAccount')
        await extensionPage.waitForSelector('#accountName')
        await extensionPage.type('#accountName',optInAccount);
        await extensionPage.waitForTimeout(100)
        await extensionPage.type('#enterMnemonic', unsafeOptInMenmonic)
        await extensionPage.waitForTimeout(100)
        await extensionPage.click('#nextStep')
        await extensionPage.waitForSelector('#enterPassword')
        await extensionPage.type('#enterPassword',unsafePassword);
        await extensionPage.waitForTimeout(200)
        await extensionPage.click('#authButton')
        await extensionPage.waitForTimeout(1000)
    })
})

// edit to add expose and remove unneeded
describe('Basic dApp Setup and GET Tests', () => {

    let connected
    let getStatus

    beforeAll( async () => {
        appPage = await browser.newPage();
        await appPage.goto(samplePage);
        await appPage.waitForTimeout(1000);

        await appPage.exposeFunction("autosign", autosign);
    })

    afterAll(async () => {
       // appPage.close()
    })

    test('Connect Dapp through content.js', async () => {
        
        connected = await appPage.evaluate( () => {
            AlgoSigner.connect()
            });  
        
        await appPage.waitForTimeout(2000);
        const pages = await browser.pages();
        const popup = pages[pages.length-1];
        await popup.waitForSelector("#grantAccess");
        await popup.click("#grantAccess");

    })

    test('Get TestNet accounts', async () => {
        const getAccounts = await appPage.evaluate( () => {
        
            return Promise.resolve(
                AlgoSigner.accounts({ledger: 'TestNet'})
                    .then((d) => {
                        console.log(`AlgoSigner Testnet Account reached: ${d}`)
                        return d;
                    })
                    .catch((e) => {
                        console.error(`Error connecting  ${e}`);
                    }))
            
        })
        console.log(`AlgoSigner Testnet Account reached: ${getAccounts[0].address}`)
        expect(getAccounts[0].address).toMatch(testAccountAddress)
    })

    test('Get params', async () => {
        
        getParams = await appPage.evaluate( () => {

            return Promise.resolve(
                AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/transactions/params'
                })
                .then((d) => {
                    console.log(`TestNet transaction params: ${d}`)
                    return d;
                })
                .catch((e) => {
                    console.error(`Error fetching params ${e}`);
                }));
        })

        console.log(`TestNet transaction params: ${getParams["consensus-version"]}`)
        expect(getParams).toHaveProperty('consensus-version')
        expect(getParams).toHaveProperty('fee')
        expect(getParams.fee).toEqual(0)
        expect(getParams).toHaveProperty('min-fee')        
        expect(getParams).toHaveProperty('genesis-hash')
        expect(getParams).toHaveProperty('genesis-id')
        expect(getParams).toHaveProperty('last-round')

    })

})

describe('Opt-in', () => {
    
    let applicationOptInBlob
    let applicationClearBlob
    let applicationCallBlob

    test('Opt-in to Application', async () => { 

        console.log(`Starting Appl Create/Sign Opt-in tx`)

        let txn = {
            "type" : "appl",
            "from": optInAddress,
            "appIndex": applicationIndex,
            "appOnComplete": 1,
            "note": 'App opt-in',
            "fee": getParams['fee'],
            "firstRound": getParams['last-round'],
            "lastRound": getParams['last-round'] + 1000,
            "genesisID": getParams['genesis-id'],
            "genesisHash": getParams['genesis-hash'],
        }
        try {
            localSignedBlob = await signTransaction(txn, appPage);
        }
        catch(e) { console.log(e)}

        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`)
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            
            applicationOptInBlob = localSignedBlob // test section scope
            
            console.log(`Exiting Appl Opt-in ${localSignedBlob.txID}`)
        }
    })

    test('Post Appl Opt-In Blob', async () => {  
        console.log(`Posting Appl Opt-in ${applicationOptInBlob.txID}`);
        await appPage.waitForTimeout(shortApiTimeout);

        getTxId = await postTransaction(applicationOptInBlob, appPage);
        
        if("message" in getTxId) { 
            console.log(`Error: ${JSON.stringify(getTxId)}`);
        }
        else {
            expect(getTxId.txId).toMatch(applicationOptInBlob.txID);
            console.log(`Exiting Appl Post Opt-in ${getTxId.txId}`);
        }
    })

    test('Verify Appl Opt-in Pending Tx', async () => {  
        console.log(`Verifying Appl Opt-in ${applicationOptInBlob.txID}`)
        await appPage.waitForTimeout(shortApiTimeout);

        let pendingTx = await verifyTransaction(applicationOptInBlob.txID, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(optInAddress)

        console.log(`Exiting Verify Appl Opt-in ${applicationOptInBlob.txID}`)
    })

    test('Call Application', async () => { 

        console.log(`Starting Call tx`)


        let txn = {
            "type" : "appl",
            "from": optInAddress,
            "appIndex": applicationIndex,
            "appOnComplete": 0,
            "appArgs": ["MA=="],
            "note": 'App Call',
            "fee": getParams['fee'],
            "firstRound": getParams['last-round'],
            "lastRound": getParams['last-round'] + 1000,
            "genesisID": getParams['genesis-id'],
            "genesisHash": getParams['genesis-hash'],
        }
        try {
            localSignedBlob = await signTransaction(txn, appPage);
        }
        catch(e) { console.log(e)}

        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`)
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            
            applicationCallBlob = localSignedBlob // test section scope
            
            console.log(`Exiting Appl Call ${localSignedBlob.txID}`)
        }
    })

    test('Post Appl Call Blob', async () => {  
        console.log(`Posting Appl Call ${applicationCallBlob.txID}`);
        await appPage.waitForTimeout(shortApiTimeout);

        getTxId = await postTransaction(applicationCallBlob, appPage);
        
        if("message" in getTxId) { 
            console.log(`Error: ${JSON.stringify(getTxId)}`);
        }
        else {
            expect(getTxId.txId).toMatch(applicationCallBlob.txID);
            console.log(`Exiting Appl Post Call ${getTxId.txId}`);
        }
    })

    test('Verify Appl Call Pending Tx', async () => {  
        console.log(`Verifying Appl Call ${applicationCallBlob.txID}`)
        await appPage.waitForTimeout(shortApiTimeout);

        let pendingTx = await verifyTransaction(applicationCallBlob.txID, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(optInAddress)

        console.log(`Exiting Verify Appl Call ${applicationCallBlob.txID}`)
    })

    test('Read App Local State', async () => {
        console.log(`Verifying Appl Local State`)
        
        await appPage.waitForTimeout(shortApiTimeout);

        const getAccountInfo = await appPage.evaluate( (optInAddress) => {
            return AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/accounts/' + optInAddress
                })
                .then((d) => {
                    return d;
                })
                .catch((e) => {
                    return(e)
                });
        }, optInAddress);

        console.log('Local State')
        console.log(JSON.stringify(getAccountInfo))

    })

    test('Clear Application from Opt-Id', async () => { 

        console.log(`Starting Appl Clear tx`)

        let txn = {
            "type" : "appl",
            "from": optInAddress,
            "appIndex": applicationIndex,
            "appOnComplete": 2,
            "note": 'App Clear',
            "fee": getParams['fee'],
            "firstRound": getParams['last-round'],
            "lastRound": getParams['last-round'] + 1000,
            "genesisID": getParams['genesis-id'],
            "genesisHash": getParams['genesis-hash'],
        }

        localSignedBlob = await signTransaction(txn, appPage);

        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`)
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            
            applicationClearBlob = localSignedBlob // test section scope
            
            console.log(`Exiting Appl Clear ${localSignedBlob.txID}`)
        }
    })

    test('Post Appl Clear Blob', async () => {  
        console.log(`Posting Appl Clear ${applicationClearBlob.txID}`);
        await appPage.waitForTimeout(shortApiTimeout);

        getTxId = await postTransaction(applicationClearBlob, appPage);
        
        if("message" in getTxId) { 
            console.log(`Error: ${JSON.stringify(getTxId)}`);
        }
        else {
            expect(getTxId.txId).toMatch(applicationClearBlob.txID);
            console.log(`Exiting App Clear ${getTxId.txId}`);
        }
    })

    test('Verify Appl Opt-in Pending Tx', async () => {  
        console.log(`Verifying Appl Clear ${applicationClearBlob.txID}`)
        await appPage.waitForTimeout(shortApiTimeout);

        let pendingTx = await verifyTransaction(applicationClearBlob.txID, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(optInAddress)

        console.log(`Exiting Verify App Clear ${applicationClearBlob.txID}`)
    })


})
