/**
 * dapp e2e tests for the AlgoSigner V2 Signing functionality
 *
 * @group dapp/arcs/misc
 */

const algosdk = require('algosdk');
const { accounts } = require('./common/constants');
const {
  openExtension,
  getSDKSuggestedParams,
  buildSdkTx,
  prepareWalletTx,
  base64ToByteArray,
  byteArrayToBase64,
} = require('./common/helpers');
const { CreateWallet, ConnectWithAlgorandObject, ImportAccount } = require('./common/tests');

const uiAccount = accounts.ui;

let sdkParams;

const getBasicSdkTxn = () => buildSdkTx({
  type: 'pay',
  from: uiAccount.address,
  to: uiAccount.address,
  amount: Math.ceil(Math.random() * 100),
  ...sdkParams,
  fee: 1000,
});

const getSdkTxnArray = () => [getBasicSdkTxn(), getBasicSdkTxn()];

const signWithSDK = (tx) => byteArrayToBase64(tx.signTxn(algosdk.mnemonicToSecretKey(uiAccount.mnemonic).sk));

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();

  test('Get TestNet params', async () => {
    sdkParams = await getSDKSuggestedParams();
  });

  ImportAccount(uiAccount);
  ConnectWithAlgorandObject([uiAccount]);
});

describe('PostTxns Validations', () => {
  test('Error on missing group(s)', async () => {
    const sdkTxns = getSdkTxnArray();
    const signedTxns = sdkTxns.map(signWithSDK);
    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.postTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, signedTxns)
    ).resolves.toMatchObject({
      message: expect.stringContaining('reasons are provided'),
      code: 4300,
      data: expect.stringContaining('same group')
    });
  });


  test('Error on unordered group(s)', async () => {
    const sdkTxns = algosdk.assignGroupID(getSdkTxnArray());
    const unsignedTxns = sdkTxns.map(signWithSDK);
    const unorderedTxns = [unsignedTxns[1], unsignedTxns[0]];
    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.postTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unorderedTxns)
    ).resolves.toMatchObject({
      message: expect.stringContaining('reasons are provided'),
      code: 4300,
      data: expect.stringContaining('different order')
    });
  });


  test('Error on incomplete group(s)', async () => {
    const sdkTxns = algosdk.assignGroupID(getSdkTxnArray());
    const unsignedTxns = sdkTxns.map(signWithSDK);
    const incompleteTxns = [unsignedTxns.shift()];
    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.postTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, incompleteTxns)
    ).resolves.toMatchObject({
      message: expect.stringContaining('reasons are provided'),
      code: 4300,
      data: expect.stringContaining('group is incomplete')
    });
  });
  
  jest.setTimeout(20000);

  test('Partially succeded post', async () => {
    async function signTxnGroups(transactionsToSign) {
      return await dappPage.evaluate(
        async (transactionsToSign) => {
          const signPromise = algorand.signTxns(transactionsToSign)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              return error;
            });
    
          const amountOfGroups = Array.isArray(transactionsToSign[0]) ? transactionsToSign.length : 1;
          await window['authorizeSignTxnGroups'](amountOfGroups);
    
          return await Promise.resolve(signPromise);
        },
        transactionsToSign,
      );
    }

    const noFeeTx = buildSdkTx({
      type: 'pay',
      from: uiAccount.address,
      to: uiAccount.address,
      amount: Math.ceil(Math.random() * 100),
      ...sdkParams,
      fee: 0,
      flatFee: true,
    });

    const sdkTxns = [noFeeTx, getBasicSdkTxn()];
    const unsignedTxns = sdkTxns.map(prepareWalletTx);
    const nestedTxns = unsignedTxns.map((tx) => [tx]);
    await extensionPage.waitForTimeout(2000);
    const signedTxns = await signTxnGroups(nestedTxns);
    const postResponse = await dappPage.evaluate((transactions) => {
      return Promise.resolve(algorand.postTxns(transactions))
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });
    }, signedTxns);

    const txID = algosdk.decodeSignedTransaction(base64ToByteArray(signedTxns[1][0])).txn.txID();
    await expect(postResponse).toMatchObject({
      message: expect.stringContaining('unsuccessful group'),
      code: 4400,
      data: expect.anything(),
      successTxnIDs: expect.anything(),
    });
    await expect(postResponse.successTxnIDs).toHaveLength(2);
    await expect(postResponse.successTxnIDs[1]).toHaveLength(1);
    await expect(postResponse.successTxnIDs[1]).toContain(txID);
    await expect(postResponse.data).toHaveLength(2);
  });

  test('Sign and Send commits txs to the network', async () => {
    async function signAndPostTxns(transactionsToSign) {
      return await dappPage.evaluate(
        async (transactionsToSign) => {
          console.log('before sign');
          const signPostPromise = algorand.signAndPostTxns(transactionsToSign)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              return error;
            });
    
          await window['authorizeSignTxn']();
          return await Promise.resolve(signPostPromise);
        },
        transactionsToSign,
      );
    }

    const sdkTxn = getBasicSdkTxn();
    const unsignedTxns = [sdkTxn].map(prepareWalletTx);
    const txID = sdkTxn.txID();
    await extensionPage.waitForTimeout(2000);
    const signPostResponse = await signAndPostTxns(unsignedTxns);
    await expect(signPostResponse).toMatchObject({
      txnIDs: expect.arrayContaining([txID]),
    });
    
  });
});