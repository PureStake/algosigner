import { SecureStorageContext, Blob } from './secureStorageContext';

///
// Helper to conver the hex value test code to buffer objects
///
function hexToBuf(hexStr: string): ArrayBuffer {
    let arrayBuffer = new Uint8Array(hexStr.length/2);
    for (var i = 0; i < hexStr.length; i+=2) {
        var byteValue = parseInt(hexStr.substr(i,2), 16);
        arrayBuffer[i/2] = byteValue;
    }
    return arrayBuffer;
}

///
// Helper to modify the test value buffers back to hex
///
function bufToHex(buffer: ArrayBuffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

test('Blob creation - verify specific details build', () => {
    let blob = new Blob(hexToBuf("e43f3d9951dcc01ff1dff199aac725bd4d"),
    new Uint8Array(hexToBuf("a835cd8689ccd191c3f0cbaf3cf66aab4af1c017c5a8e37a82b3b001c7d5c3e6")), 
    new Uint8Array(hexToBuf("d316599689403d40d78404a7255a0e2a16c4d5bdaf52bcf44d9aec7f4ba31b55")), 
    5000000, 1);

    expect(bufToHex(blob.encryptedObject)).toBe("e43f3d9951dcc01ff1dff199aac725bd4d");
    expect(bufToHex(blob.salt)).toBe("a835cd8689ccd191c3f0cbaf3cf66aab4af1c017c5a8e37a82b3b001c7d5c3e6");
    expect(bufToHex(blob.nonce)).toBe("d316599689403d40d78404a7255a0e2a16c4d5bdaf52bcf44d9aec7f4ba31b55");
    expect(blob.nIterations).toBe(5000000);
    expect(blob.version).toBe(1);
});

test('Context build - verify build and passphrase', () => {
    let context = new SecureStorageContext(hexToBuf("54686973206973206120746573742070617373706872617365"));
    expect(bufToHex(context.contextSecurity.passphrase)).toBe("54686973206973206120746573742070617373706872617365");
});
