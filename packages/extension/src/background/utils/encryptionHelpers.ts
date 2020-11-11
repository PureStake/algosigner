import { Blob } from '@algosigner/crypto/src/secureStorageContext';

///
// Methods for helping modify data into and out of encrypted states.
///
export default class EncryptionHelpers {
  ///
  // For hex based saving of array buffers.
  ///
  static bufferToHex(buffer: ArrayBuffer) {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  }

  ///
  // From the provided string, create an Uint8Array Buffer object.
  // Used for data going into the crypto lock components.
  ///
  static stringToUint8ArrayBuffer(rawString: string): ArrayBuffer {
    var arrBuffer = new ArrayBuffer(rawString.length);
    var uint8Array = new Uint8Array(arrBuffer);
    for (var i = 0; i < rawString.length; i++) {
      uint8Array[i] = rawString.charCodeAt(i);
    }
    return arrBuffer;
  }

  ///
  // From the provided Uint8Array Buffer create a string value.
  // Used for data retrieved during the unlock crypto step.
  ///
  static arrayBufferToString(uint8Array: ArrayBuffer): string {
    return String.fromCharCode.apply(
      null,
      Array.from(new Uint8Array(uint8Array))
    );
  }

  ///
  // For hex based loading of Uint8Arrays.
  ///
  static hexStringToUint8Array(hexStr: string): Uint8Array {
    let regexp = /^[0-9a-fA-F]+$/;

    // Validate the object is hex by checking that length is even and the entire string is within the Hexidecimal range.
    if (!(hexStr.length % 2 === 0 && regexp.test(hexStr))) {
      throw new Error(`The provided value is not hexidecimal:${hexStr}`);
    }

    let arrayBuffer = new Uint8Array(hexStr.length / 2);
    for (var i = 0; i < hexStr.length; i += 2) {
      var byteValue = parseInt(hexStr.substr(i, 2), 16);
      arrayBuffer[i / 2] = byteValue;
    }
    return arrayBuffer;
  }

  ///
  // Wapper for hex saving, since only certain fields need modified.
  ///
  static convertEncryptedResultToHex(encryptedValue: Blob) {
    let returnObject: any = {};
    Object.entries(encryptedValue).forEach(([key, value]) => {
      if (key === 'salt' || key === 'nonce' || key === 'encryptedObject') {
        returnObject[key] = this.bufferToHex(value);
      } else {
        returnObject[key] = value;
      }
    });
    return returnObject;
  }
}
