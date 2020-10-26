/**
 * Exercises dApp functions
 * 
 * @group basic-dapp
 */

const testNetAccount = "E2E-Tests"     // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const optInAccount = "Opt-In"
const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
const testAccountAddress = "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
const optInAddress = "RMY2R35P7PHRBONNKNGDMP75R5DFLRILGESHCNESM22EZ77TQL5GBF75GI"
const unsafePassword = 'c5brJp5f'
const samplePage = 'https://google.com/' // Prefer about:blank, bug in puppeteer


let getParams   // holds the parameters for all txn
let appPage     // re-using one window

describe('Wallet Setup', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafeMenmonic = 'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy'
    const unsafeOptInMenmonic = 'space merge shoot airport soup stairs shuffle select absurd remain december neglect unfold portion forward december genuine tonight choice volume gospel save corn about few'
    const amount = Math.floor((Math.random() * 10)+.1); // txn size, modify multiplier for bulk
    const secondTestNetAccount = "Created-Account"

    let baseUrl // set in beforeAll
    let extensionPage // set in beforeAll
    let txId // returned tx id from send txn 

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
        await extensionPage.screenshot({path: 'screenshots/test_waiting_for_page.png'})
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

describe('Basic dApp Setup and GET Tests', () => {

    let connected
    let getStatus

    jest.setTimeout(30000);

    beforeAll( async () => {
        appPage = await browser.newPage();
        await appPage.goto(samplePage);
        await appPage.waitForTimeout(1000);
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

    test('Get Status', async () => {
        getStatus = await appPage.evaluate( () => {
            
            return Promise.resolve(
                AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/status'
                })
                .then((d) => {
                    console.log(`TestNet status: ${d}`)
                    return d;
                })
                .catch((e) => {
                    console.error(`Error fetching status ${e}`);
                }));
        })

        console.log(`TestNet status: ${getStatus["last-round"]}`)
        expect(getStatus).toHaveProperty('time-since-last-round')
        expect(getStatus).toHaveProperty('last-round')
        expect(getStatus).toHaveProperty('last-version') 
        expect(getStatus).toHaveProperty('next-version') 
        expect(getStatus).toHaveProperty('next-version-round') 
        expect(getStatus).toHaveProperty('next-version-supported') 
        expect(getStatus).toHaveProperty('stopped-at-unsupported-round') 
        expect(getStatus).toHaveProperty('catchup-time')        
    })

    test('Get Ledger Supply', async () => {
        const getLedgerSupply = await appPage.evaluate( () => {

            return Promise.resolve(
                AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/ledger/supply'
                })
                .then((d) => {
                    console.log(`TestNet supply ${d}`)
                    return d;
                })
                .catch((e) => {
                    console.error(`Error fetching supply ${e}`);
                }));
        })

        console.log(`TestNet supply: ${getLedgerSupply.current_round}`)
        expect(getLedgerSupply).toHaveProperty('current_round')
        expect(getLedgerSupply).toHaveProperty('online-money')
        expect(getLedgerSupply).toHaveProperty('total-money')

    })

    test('Get an Asset', async () => {
        const ownerAccount = 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ'
        const assetIndex = 150821

        const getAnAsset = await appPage.evaluate( () => {

            return Promise.resolve(
                AlgoSigner.indexer({
                    ledger: 'TestNet',
                    path: '/v2/assets/150821'
                })
                .then((d) => {
                    console.log(`TestNet asset info: ${d}`)                   
                    return d;
                })
                .catch((e) => {
                    console.error(`Error fetching asset: ${e}`);
                }));
        })
        
        await appPage.waitForTimeout(2000)
        console.log(`TestNet asset info: ${getAnAsset['asset']['params']['unit-name']}`)   
        expect(getAnAsset['asset']['params']['unit-name']).toMatch('dectest')
        expect(getAnAsset.asset.params.name).toMatch('decimal Test')
        expect(getAnAsset['asset']['params']['default-frozen']).toBe(false)
        expect(getAnAsset.asset.params.total).toEqual(1000)
        expect(getAnAsset.asset.params.decimals).toEqual(15)
        expect(getAnAsset.asset.params.clawback).toMatch(ownerAccount)
        expect(getAnAsset.asset.params.creator).toMatch(ownerAccount)
        expect(getAnAsset.asset.params.freeze).toMatch(ownerAccount)
        expect(getAnAsset.asset.params.manager).toMatch(ownerAccount)
        expect(getAnAsset.asset.params.reserve).toMatch(ownerAccount)
        expect(getAnAsset.asset.index).toEqual(assetIndex)
        
    })

    test('GET: Asset list limited', async () =>{
        const shortAssetList = await appPage.evaluate( () => {

            return Promise.resolve(
                AlgoSigner.indexer({
                    ledger: 'TestNet',
                    path: '/v2/assets?limit=2'
                })
                .then((d) => {
                    console.log(`TestNet asset list:  ${d}`)
                    return d;
                })
                .catch((e) => {
                    console.error(`Error fetching asset list: ${e}`);
                }));

        })
    
        await appPage.waitForTimeout(200)
        console.log(`TestNet asset list:  ${shortAssetList.assets[0].index}`)
        expect(shortAssetList.assets.length).toEqual(2)
        expect(shortAssetList.assets[0].index).toEqual(185)
    })

})

describe('dApp POST Txn Tests (plus Teal compile)', () => {    
    let getSignedBlob
    let getTxId
    let matchTxId
    let assetTxId
    let assetIndex
    
    test('POST: Compile Teal', async () => {

        const tealCompiled = await appPage.evaluate( () => {

            return Promise.resolve(
                AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/teal/compile',
                    body: 'int 0',
                    method: 'POST',
                    contentType: 'text/plain'
                })
                .then((d) => {
                    console.log(`TestNet Teal compile: ${d}`)
                    return d;
                })
                .catch((e) => {
                    console.error(`Error compiling Teal: ${e}`);
                }));

        })

        await appPage.waitForTimeout(200)
        console.log(`TestNet Teal compile: ${tealCompiled.result}`)
        expect(tealCompiled.result).toMatch("ASABACI=")
    })

    test('Send Tx', async () => {   
        // Create a function to map to the puppeteer object
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

        // Attach the function to the dapp page for use after popup
        await appPage.exposeFunction("autosign", autosign);

        getSignedBlob = await appPage.evaluate(async (testAccountAddress, getParams, sendAlgoToAddress) => {
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
        console.log(typeof(getSignedBlob))
        console.log(`Confirmation: ${JSON.stringify(getSignedBlob)}`)
        expect(getSignedBlob).toHaveProperty("txID");
        expect(getSignedBlob).toHaveProperty("blob");
        matchTxId = getSignedBlob.txID;
    })

    test('Post Signed Blob', async () => {  
        getTxId = await appPage.evaluate( (getSignedBlob) => {
            return AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: getSignedBlob.blob
                })
                .then((d) => {
                    return d;
                })
                .catch((e) => {
                    return(e)
                });
        }, getSignedBlob);

        console.log(`Confirmation: ${JSON.stringify(getTxId)}`)
        expect(getTxId.txId).toEqual(matchTxId)
    })

    test('Overspend Tx', async () => {   
        await appPage.waitForTimeout(1000);
        getSignedBlob = await appPage.evaluate(async (testAccountAddress, getParams, sendAlgoToAddress) => {
            const amount = 900000000 + Math.floor(Math.random() * 10); 
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
                "note": "Very large tx"
            };      

            // Get only the promise first
            var signPromise = AlgoSigner.sign(txn);

            // Initialize the sign process
            await window.autosign();
            
            // Return the final result of promise
            return await signPromise;
            
        }, testAccountAddress, getParams, sendAlgoToAddress);

        console.log(`Blob 2: ${getSignedBlob.blob}`);
        expect(getSignedBlob).toHaveProperty("txID");
        expect(getSignedBlob).toHaveProperty("blob");
    })

    test('Post Overspend Blob', async () => {  
        getTxId = await appPage.evaluate( (getSignedBlob) => {
            return AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: getSignedBlob.blob
                })
                .then((d) => {
                    return d;
                })
                .catch((e) => {
                    return(e)
                });
        }, getSignedBlob);
        
        expect(getTxId.message).toMatch("overspend")
    })
})

describe('dApp Asset Txn Tests', () => {   
    let getSignedBlob
    let getTxId
    let assetTxId
    let assetIndex

    test('Asset Create Tx', async () => {   
        await appPage.waitForTimeout(1000);
        getSignedBlob = await appPage.evaluate(async (testAccountAddress, getParams, sendAlgoToAddress) => {
            let txn = {
                "from": testAccountAddress,
                "fee": getParams['fee'],
                "assetName": 'AutoTest',
                "assetUnitName": 'AT',
                "assetTotal": 1000 + Math.round(Math.floor(Math.random() * 10)),
                "assetDecimals": 2,
                "type": "acfg",
                "firstRound": getParams['last-round'],
                "lastRound": getParams['last-round'] + 1000,
                "genesisID": getParams['genesis-id'],
                "genesisHash": getParams['genesis-hash'],
                "note": "Asset create"
            };      

            // Get only the promise first
            var signPromise = AlgoSigner.sign(txn);

            // Initialize the sign process
            await window.autosign();
            
            // Return the final result of promise
            return await signPromise;
            
        }, testAccountAddress, getParams, sendAlgoToAddress);

        console.log(`Blob: ${getSignedBlob.blob}`);
        expect(getSignedBlob).toHaveProperty("txID");
        expect(getSignedBlob).toHaveProperty("blob");
        assetTxId = getSignedBlob.txID
    })

    test('Post Asset Create Blob', async () => {  
        getTxId = await appPage.evaluate( (getSignedBlob) => {
            return AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: getSignedBlob.blob
                })
                .then((d) => {
                    return d;
                })
                .catch((e) => {
                    return(e)
                });
        }, getSignedBlob);
        
        expect(getTxId.txId).toMatch(assetTxId)
    })
    test('Verify Asset Pending Tx', async () => {  
        
        let lastRound = getParams['last-round']
        let pendingTx = await appPage.evaluate(async (assetTxId, lastRound) => {
            
            let validateCheck = true;
            let pendingCheck;

            while(validateCheck) {
                
                pendingCheck = await AlgoSigner.algod({
                    ledger: 'TestNet',
                    path: '/v2/transactions/pending/' + assetTxId
                })
                .then((d) => {
                    return d;
                })
                .catch((e) => {
                    return(e)
                });
                
                if("asset-index" in pendingCheck) {
                    validateCheck = false;
                }
                else {
                    lastRound++;
                    
                    await AlgoSigner.algod({
                        ledger: 'TestNet',
                        path: '/v2/status/wait-for-block-after/' + lastRound
                    })
                    .catch((e) => {
                        return(e)
                    });
                }
            }            

            return pendingCheck;
        }, assetTxId, lastRound);        
        
        assetIndex = pendingTx["asset-index"]
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(testAccountAddress)
    })

    test('Asset OptIn Tx', async () => {   
        await appPage.waitForTimeout(1000);
        getSignedBlob = await appPage.evaluate(async (optInAddress, getParams, assetIndex) => {
            let txn = {
                "from": optInAddress,
                "to": optInAddress,
                "amount": 0,
                "fee": getParams['fee'],
                "assetIndex": assetIndex,
                "type": "axfer",
                "firstRound": getParams['last-round'],
                "lastRound": getParams['last-round'] + 1000,
                "genesisID": getParams['genesis-id'],
                "genesisHash": getParams['genesis-hash'],
                "note": "Asset Optin"
            };      

            // Get only the promise first
            var signPromise = AlgoSigner.sign(txn);

            // Initialize the sign process
            await window.autosign();
            
            // Return the final result of promise
            return await signPromise;
            
        }, optInAddress, getParams, assetIndex);

        expect(getSignedBlob).toHaveProperty("txID");
        expect(getSignedBlob).toHaveProperty("blob");
        console.log(JSON.stringify(getSignedBlob))
        assetTxId = getSignedBlob.txID
    })

    test('Post Asset Opt-in Blob', async () => {  
        getTxId = await appPage.evaluate( (getSignedBlob) => {
            return AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: getSignedBlob.blob
                })
                .then((d) => {
                    return d;
                })
                .catch((e) => {
                    return(e)
                });
        }, getSignedBlob);
        
        if("message" in getTxId) {
            console.log('Likely OVERSPEND - ADD FUNDS TO optInAddress') 
            console.log(JSON.stringify(getTxId))
        }
        else {
            expect(getTxId.txId).toMatch(assetTxId) }
    })

    test('Asset Transfer Tx', async () => {   
        await appPage.waitForTimeout(1000);
        getSignedBlob = await appPage.evaluate(async (optInAddress, getParams, assetIndex, testAccountAddress) => {
            let txn = {
                "from": testAccountAddress,
                "to": optInAddress,
                "amount": Math.round(Math.floor(Math.random() * 10)),
                "fee": getParams['fee'],
                "assetIndex": assetIndex,
                "type": "axfer",
                "firstRound": getParams['last-round'],
                "lastRound": getParams['last-round'] + 1000,
                "genesisID": getParams['genesis-id'],
                "genesisHash": getParams['genesis-hash'],
                "note": "Asset Tx"
            };      

            // Get only the promise first
            var signPromise = AlgoSigner.sign(txn);

            // Initialize the sign process
            await window.autosign();
            
            // Return the final result of promise
            return await signPromise;
            
        }, optInAddress, getParams, assetIndex, testAccountAddress);

        expect(getSignedBlob).toHaveProperty("txID");
        expect(getSignedBlob).toHaveProperty("blob");
        console.log(JSON.stringify(getSignedBlob))
        assetTxId = getSignedBlob.txID
    })

    test('Post Asset Opt-in Blob', async () => {  
        getTxId = await appPage.evaluate( (getSignedBlob) => {
            return AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: getSignedBlob.blob
                })
                .then((d) => {
                    return d;
                })
                .catch((e) => {
                    return(e)
                });
        }, getSignedBlob);
        
        if("message" in getTxId) {
            console.log(JSON.stringify(getTxId))
        }
        else {
            expect(getTxId.txId).toMatch(assetTxId) }
    })

    // tbd Asset Destroy! 

})