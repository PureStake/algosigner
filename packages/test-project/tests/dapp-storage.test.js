/**
 * Exercises dApp
 *
 * @group dapp-storage
 */

// /// Needs to have the jest-extension-mock fix to work properly
// describe('Dapp Storage test', () => {
//     const sampleDapp = 'https://purestake.github.io/algosigner-dapp-example/legacy/index.html';
//     jest.setTimeout(10000);
//     beforeAll(async () => {
//         await page.goto(sampleDapp);
//     })

//     test('Verify restricted chrome.storage access', async () => {
//         await extensionBrowser.storage.local.get(null, function(result) {
//             expect(result).toStrictEqual({});
//         });

//         await extensionBrowser.storage.local.get(["defaultwalletname"], function(result) {
//             expect(result.defaultwalletname).toStrictEqual(undefined);
//         });
//     });
// })
