/**
 * Basic e2e tests for GitHub to pass
 * 
 * @group dapp
 */

const testNetAccount = "E2E-Tests"     // for now, also hardcoding in the regex match for account info, cannot interpolate variables in toMatch
const sendAlgoToAddress = "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA"
const testAccountAddress = "MTHFSNXBMBD4U46Z2HAYAOLGD2EV6GQBPXVTL727RR3G44AJ3WVFMZGSBE"
const unsafePassword = 'c5brJp5f'


describe('Wallet Setup', () => {
    
    const extensionName = 'AlgoSigner' 
    const extensionPopupHtml = 'index.html'
    const unsafeMenmonic = 'grape topple reform pistol excite salute loud spike during draw drink planet naive high treat captain dutch cloth more bachelor attend attract magnet ability heavy'
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

describe('Basic dApp Tests', () => {

    const sampleDapp = 'https://fxgamundi.github.io/algosigner-dapp/'
    const samplePage = 'https://purestake.com'
    let getParams
    let appPage
    let connected
    let getStatus
    let getSignedBlob
    let getTxId

    jest.setTimeout(10000);

    beforeAll( async () => {
        appPage = await browser.newPage();
        await appPage.goto(sampleDapp);
        await appPage.waitFor(1000)
    })

    test('Connect Dapp through content.js', async () => {
        
        connected = await appPage.evaluate( () => {
            AlgoSigner.connect()
            });  

        await appPage.waitFor(2000)
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
                        document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                        return d;
                    })
                    .catch((e) => {
                        console.error(e);
                        document.getElementById("log").value += JSON.stringify(e) + "\n\n";
                    }))
            
        })
        expect(getAccounts[0].name).toMatch(testNetAccount)
    })

    test('Get params', async () => {
        
        getParams = await appPage.evaluate( () => {

            return Promise.resolve(
                AlgoSigner.algod({
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
                }));
        })

        expect(getParams).toHaveProperty('consensus-version')
        expect(getParams).toHaveProperty('fee')
        expect(getParams.fee).toEqual(1)
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
                    document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                    return d;
                })
                .catch((e) => {
                    console.error(e);
                    document.getElementById("log").value += JSON.stringify(e) + "\n\n";
                }));
        })

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
                    document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                    return d;
                })
                .catch((e) => {
                    console.error(e);
                    document.getElementById("log").value += JSON.stringify(e) + "\n\n";
                }));
        })

        expect(getLedgerSupply).toHaveProperty('current_round')
        expect(getLedgerSupply).toHaveProperty('online-money')
        expect(getLedgerSupply).toHaveProperty('total-money')

    })

    test('Get Asset', async () => {
        const ownerAccount = 'Q2SLSQTBMVJYVT2AANUAXY4A5G7A3Y6L2M6L3WIXKNYBTMMQFGUOQGKSRQ'
        const assetIndex = 150821

        const getAnAsset = await appPage.evaluate( () => {

            return Promise.resolve(
                AlgoSigner.indexer({
                    ledger: 'TestNet',
                    path: '/v2/assets/150821'
                })
                .then((d) => {
                    document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                    return d;
                })
                .catch((e) => {
                    console.error(e);
                    document.getElementById("log").value += JSON.stringify(e) + "\n\n";
                }));
        })
        
        await appPage.waitFor(2000)
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

    test('Send Tx', async () => {

       // have to manually intervene for now
        getSignedBlob = await appPage.evaluate( (testAccountAddress, getParams, sendAlgoToAddress) => {
            const amount = Math.floor(Math.random() * 10); 

            let txn = {
                "from": testAccountAddress,
                "to": sendAlgoToAddress,
                "fee": getParams['fee'],
                "amount": amount,
                "firstRound": getParams['last-round'],
                "lastRound": getParams['last-round'] + 1000,
                "genesisID": getParams['genesis-id'],
                "genesisHash": getParams['genesis-hash'],
                "note": new Uint8Array(0)
            };
            
        return Promise.resolve(
            AlgoSigner.sign(txn)
            .then((d) => {
                document.getElementById("log").value += JSON.stringify(d) + "\n\n";
                return d;
            })
            .catch((e) => {
                console.error(e);
                document.getElementById("log").value += JSON.stringify(e) + "\n\n";
            }));
        }, testAccountAddress, getParams, sendAlgoToAddress)

    })

    test('Post Signed Blob', async () => {
        
        getTxId = await appPage.evaluate( (getSignedBlob) => {

            return Promise.resolve(
                AlgoSigner.send({
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
                }));
    }, getSignedBlob)

    console.log(getTxId)
})

    // test('just sit there', async () => {
    //     await appPage.waitFor(9000)
    // })
})


    

