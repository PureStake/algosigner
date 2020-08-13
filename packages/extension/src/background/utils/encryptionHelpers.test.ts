import EncryptionHelpers from  "./encryptionHelpers";
import { Blob } from '@algosigner/crypto/src/secureStorageContext';

test('Validate blob object component conversion to hex', () => {
    let blob = new Blob(EncryptionHelpers.hexStringToUint8Array("e43f3d9951dcc01ff1dff199aac725bd4d"),
    EncryptionHelpers.hexStringToUint8Array("a835cd8689ccd191c3f0cbaf3cf66aab4af1c017c5a8e37a82b3b001c7d5c3e6"), 
    EncryptionHelpers.hexStringToUint8Array("d316599689403d40d78404a7255a0e2a16c4d5bdaf52bcf44d9aec7f4ba31b55"),
    5000000, 1);

    let reHexed = EncryptionHelpers.convertEncryptedResultToHex(blob);
    expect(reHexed["salt"]).toBe("a835cd8689ccd191c3f0cbaf3cf66aab4af1c017c5a8e37a82b3b001c7d5c3e6");
    expect(reHexed["nonce"]).toBe("d316599689403d40d78404a7255a0e2a16c4d5bdaf52bcf44d9aec7f4ba31b55");
    expect(reHexed["encryptedObject"]).toBe("e43f3d9951dcc01ff1dff199aac725bd4d");
});

test('Validate hex conversion to Uint8Array conversion', () => {
    let uint8 = EncryptionHelpers.hexStringToUint8Array("0102030405");
    expect(uint8).toStrictEqual(new Uint8Array([1, 2, 3, 4, 5]));
});

test('Validate Uint8Array to string conversion', () => {
    let stringFromUint8Array = EncryptionHelpers.arrayBufferToString(new Uint8Array([97, 98, 99, 100, 101]));
    expect(stringFromUint8Array).toBe("abcde");
});

test('Validate string to Uint8Array conversion', () => {
    let uint8ArrayBuffer = EncryptionHelpers.stringToUint8ArrayBuffer("abcde");
    let mapped = Array.prototype.map.call(new Uint8Array(uint8ArrayBuffer), x => x);
    expect(mapped).toStrictEqual([97, 98, 99, 100, 101]);
});

test('Validate Uint8Array to hex conversion', () => {
    let hexValue = EncryptionHelpers.bufferToHex(new Uint8Array([1, 2, 3, 4, 5]));
    expect(hexValue).toBe("0102030405");
});