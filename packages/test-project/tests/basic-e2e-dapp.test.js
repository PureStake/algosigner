/**
 * Exercises dApp functions
 * 
 * @group basic-dapp
 */

// TODO Move pending function to window and re-use
// TODO Move post function to window and re-use

 // Globals 
const testNetAccount = "E2E-Tests"      // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const optInAccount = "Opt-In"           // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
const testAccountAddress = "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
const optInAddress = "RMY2R35P7PHRBONNKNGDMP75R5DFLRILGESHCNESM22EZ77TQL5GBF75GI"
const unsafePassword = 'c5brJp5f'
const samplePage = 'https://google.com/' // Prefer about:blank, bug in puppeteer

// Set in one test and re-used in later tests
let getParams   // holds the parameters for all txn
let appPage     // re-using one window to run exercise dApp
let baseUrl     // holds the extension url for a local window
let transferAmount // amount of asset transfered from test user to opt-in user

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

describe('Wallet Setup', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafeMenmonic = 'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy'
    const unsafeOptInMenmonic = 'space merge shoot airport soup stairs shuffle select absurd remain december neglect unfold portion forward december genuine tonight choice volume gospel save corn about few'
    const amount = Math.floor((Math.random() * 10)+.1); // txn size, modify multiplier for bulk
    const secondTestNetAccount = "Created-Account"

    let extensionPage // set in beforeAll


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
        console.log(`Starting Asset Create for ${testAccountAddress} using ${JSON.stringify(getParams)}`);

        let txn = {
            "from": testAccountAddress,
            "fee": getParams['fee'],
            "assetName": 'AutoTest',
            "assetUnitName": 'AT',
            "assetTotal": 1000 + Math.round(Math.floor(Math.random() * 30)),
            "assetDecimals": 1,
            "type": "acfg",
            "firstRound": getParams['last-round'],
            "lastRound": getParams['last-round'] + 1000,
            "genesisID": getParams['genesis-id'],
            "genesisHash": getParams['genesis-hash'],
            "assetManager": testAccountAddress,
            "assetReserve": testAccountAddress,
            "assetFreeze": testAccountAddress,
            "assetClawback": testAccountAddress,
            "note": "Asset create"
        }      

        localSignedBlob = await signTransaction(txn, appPage);
        
        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`)
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            assetTxId = localSignedBlob.txID
            getSignedBlob = localSignedBlob
            console.log(`Exiting Asset Create ${localSignedBlob.txID}`)
        }
        
    })

    test('Post Asset Create Blob', async () => {  
        console.log(`Posting Asset Create ${getSignedBlob.txID}`);

        getTxId = await postTransaction(getSignedBlob, appPage);
        if("message" in getTxId) { 
            console.log(`Error: ${JSON.stringify(getTxId)}`);
        }
        else {
            expect(getTxId.txId).toMatch(getSignedBlob.txID);
            console.log(`Exiting Asset Create ${getTxId.txId}`);
        }
    })

    test('Verify Asset Pending Tx', async () => {  
        console.log(`Verifying Asset Create`)

        let pendingTx = await verifyTransaction(assetTxId, getParams['last-round'] , appPage)
        
        assetIndex = pendingTx["asset-index"]
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(testAccountAddress)

        console.log(`Exiting Verify Asset Create ${pendingTx["asset-index"]}`)
    })

    test('Asset Opt-in Tx', async () => {   
        console.log(`Entering Asset Create/Sign Opt-in Tx: ${assetIndex}`)
    
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
            "note": "Asset Opt-In"
        };      

        localSignedBlob = await signTransaction(txn, appPage);
        
        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`)
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            assetTxId = localSignedBlob.txID    // Update the asset Tx that gets passed around
            getSignedBlob = localSignedBlob; // Update the blob that gets passed around
            console.log(`Exiting Asset Create/Sign Opt-in Tx: ${getSignedBlob.txID}`)
        }
    })

    test('Post Asset Opt-in Blob', async () => {  
        console.log(`Entering Post Asset Opt-in Tx`)

        getTxId = await postTransaction(getSignedBlob, appPage);
        
        if("message" in getTxId) { 
            console.log(`Error: ${JSON.stringify(getTxId)}`);
        }
        else {
            expect(getTxId.txId).toMatch(assetTxId)
            
            console.log(`Exiting Post Asset Opt-in ${JSON.stringify(getTxId)}`)     
        }
    })

    test('Verify Asset Opt-in Pending Tx', async () => {  
        console.log(`Verifying Asset Opt-in ${assetTxId}`)

        let pendingTx = await verifyTransaction(assetTxId, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(optInAddress)

        console.log(`Exiting Verify Asset Opt-in ${pendingTx["confirmed-round"]}`)
    })

    test('Asset Transfer Tx', async () => {   
        console.log(`Entering Asset Transfer Create/Sign Tx ${assetIndex}`)

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

        localSignedBlob = await signTransaction(txn, appPage);

        if("message" in getTxId) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            assetTxId = localSignedBlob.txID
            getSignedBlob = localSignedBlob // Subtle easy to miss
            transferAmount = txn.amount; 
            console.log(`Exiting Asset Transfer Create/Sign Tx ${localSignedBlob.txID} for ${assetIndex}`)
        }
        })

    test('Post Asset Transfer Blob', async () => {  
        console.log(`Entering Post Asset Transfer Tx for ${getSignedBlob.txID} for ${assetIndex}`)

        getTxId = await postTransaction(getSignedBlob, appPage);
        
        if("message" in getTxId) {
            console.log(`Error: ${JSON.stringify(getTxId)}`);
        }
        else {
            expect(getTxId.txId).toMatch(assetTxId) 
            console.log(`Exiting Post Asset Transfer ${JSON.stringify(getTxId)}`)
        }

    })

    test('Verify Asset Transfer Tx', async () => {  
        console.log(`Starting Verify Asset Tx: ${assetTxId} for ${assetIndex}`)

        let lastRound = getParams['last-round']
        let pendingTx = await verifyTransaction(assetTxId, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(testAccountAddress)
        expect(pendingTx["txn"]["txn"]["arcv"]).toMatch(optInAddress)
        expect( pendingTx["txn"]["txn"]["aamt"]).toEqual(transferAmount)

        console.log(`Finished verify asset tx: ${assetTxId} of Asset Index ${assetIndex} for ${pendingTx["txn"]["txn"]["aamt"]}`)
    })

    test('Asset Freeze Tx', async () => {   
        console.log(`Entering Asset Freeze Tx ${assetIndex}`)

        let txn = {
            "from": testAccountAddress,
            "freezeAccount": optInAddress,
            "freezeState": true,
            "fee": getParams['fee'],
            "assetIndex": assetIndex,
            "type": "afrz",
            "firstRound": getParams['last-round'],
            "lastRound": getParams['last-round'] + 1000,
            "genesisID": getParams['genesis-id'],
            "genesisHash": getParams['genesis-hash'],
            "note": "Asset Freeze Tx"
        };      

        localSignedBlob = await signTransaction(txn, appPage)

        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            assetTxId = localSignedBlob.txID
            getSignedBlob = localSignedBlob
            console.log(`Exiting Asset Freeze Create/Sign Tx ${getSignedBlob.txID} for ${assetIndex}`)
        }
    })

    test('Post Asset Freeze Blob', async () => {  
        console.log(`Entering Post Asset Freeze Tx for ${getSignedBlob.txID} for ${assetIndex}`)

        getTxId = await postTransaction(getSignedBlob, appPage)
        
        if("message" in getTxId) {
            console.log('Error - see message') 
        }
        else {
            expect(getTxId.txId).toMatch(assetTxId) 
        }

        console.log(`Exiting Post Asset Freeze ${JSON.stringify(getTxId)}`) 
    })

    test('Verify Asset Freeze Tx', async () => {  
        console.log(`Starting Verify Asset Freeze Tx: ${assetTxId} for ${assetIndex}`)

        let lastRound = getParams['last-round']
        let pendingTx = await verifyTransaction(assetTxId, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(testAccountAddress)

        console.log(`Finished verify asset freeze tx: ${assetTxId} of Asset Index ${assetIndex}`)
        console.log(`${pendingTx}`)
    })

    test('Asset Clawback Tx', async () => {   
        console.log(`Entering Asset Clawback Tx ${assetIndex} for ${transferAmount}`)

        let txn = {
            "from": testAccountAddress,
            "to": testAccountAddress,
            "assetRevocationTarget": optInAddress,
            "amount": transferAmount,
            "fee": getParams['fee'],
            "assetIndex": assetIndex,
            "type": "axfer",
            "firstRound": getParams['last-round'],
            "lastRound": getParams['last-round'] + 1000,
            "genesisID": getParams['genesis-id'],
            "genesisHash": getParams['genesis-hash'],
            "note": "Asset Clawback Tx"
        };      

        localSignedBlob = await signTransaction(txn, appPage)

        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            assetTxId = localSignedBlob.txID
            getSignedBlob = localSignedBlob
            console.log(`Exiting Asset Clawback Create/Sign Tx ${getSignedBlob.txID} for ${assetIndex} for ${transferAmount}`)
        }
    })

    test('Post Asset Clawback Blob', async () => {  
        console.log(`Entering Post Asset Clawback Tx for ${getSignedBlob.txID} for ${assetIndex}`)

        getTxId = await postTransaction(getSignedBlob, appPage)
        
        if("message" in getTxId) {
            console.log('Error - see message') 
        }
        else {
            expect(getTxId.txId).toMatch(assetTxId) 
        }

        console.log(`Exiting Post Asset Clawback ${JSON.stringify(getTxId)}`) 
    })

    test('Verify Asset Clawback Tx', async () => {  
        console.log(`Starting Verify Asset Clawback Tx: ${assetTxId} for ${assetIndex}`)

        let lastRound = getParams['last-round']
        let pendingTx = await verifyTransaction(assetTxId, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(testAccountAddress)
        transferAmount = pendingTx["txn"]["txn"]["aamt"] // set 

        console.log(`Finished verify asset clawback tx: ${assetTxId} of Asset Index ${assetIndex}`)
    })

    test('Asset Destroy Tx', async () => {   
        console.log(`Entering Asset Destroy Tx ${assetIndex} for ${transferAmount}`)

        let txn = {
            "from": testAccountAddress,
            "fee": getParams['fee'],
            "assetIndex": assetIndex,
            "type": "acfg",
            "firstRound": getParams['last-round'],
            "lastRound": getParams['last-round'] + 1000,
            "genesisID": getParams['genesis-id'],
            "genesisHash": getParams['genesis-hash'],
            "note": "Asset Destroy Tx"
        };      

        localSignedBlob = await signTransaction(txn, appPage)

        if("message" in localSignedBlob) { 
            console.log(`Error: ${JSON.stringify(localSignedBlob)}`);
        }
        else {
            expect(localSignedBlob).toHaveProperty("txID");
            expect(localSignedBlob).toHaveProperty("blob");
            assetTxId = localSignedBlob.txID
            getSignedBlob = localSignedBlob
            console.log(`Exiting Asset Destroy Create/Sign Tx ${getSignedBlob.txID} for ${assetIndex}`)
        }
    })

    test('Post Asset Destroy Blob', async () => {  
        console.log(`Entering Post Asset Destroy Tx for ${getSignedBlob.txID} for ${assetIndex}`)

        getTxId = await postTransaction(getSignedBlob, appPage)
        
        if("message" in getTxId) {
            console.log('Error - see message') 
        }
        else {
            expect(getTxId.txId).toMatch(assetTxId) 
        }

        console.log(`Exiting Post Asset Destroy ${JSON.stringify(getTxId)}`) 
    })

    test('Verify Asset Destroy Tx', async () => {  
        console.log(`Starting Verify Asset Destroy Tx: ${assetTxId} for ${assetIndex}`)

        let lastRound = getParams['last-round']
        let pendingTx = await verifyTransaction(assetTxId, getParams['last-round'] , appPage)
        
        expect(pendingTx["txn"]["txn"]["snd"]).toMatch(testAccountAddress)

        console.log(`Finished verify asset Destroy tx: ${assetTxId} of Asset Index ${assetIndex}`)
    })

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

})