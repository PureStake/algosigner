/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import EncryptionParameters from "./types/encryptionParameters";
import { EncryptionDefaults } from "./types/encryptionDefaults";

export class LocalEncryption {
    _saltSize: number;
    _ivSize: number;
    _iterations: number;
    _encoder: TextEncoder;
    _decoder: TextDecoder;

    constructor(params?: any){
        this._saltSize = (params && params["salt_bytesize"]) || EncryptionDefaults.Salt_ByteSize;
        this._ivSize = (params && params["iv_bytesize"]) || EncryptionDefaults.IV_ByteSize;
        this._iterations = (params && params["pbkdf2_iterations"]) || EncryptionDefaults.PBKDF2_Iterations.NORMAL;
        this._encoder = (params && params["encoder"]) || new TextEncoder();
        this._decoder = (params && params["decoder"]) || new TextDecoder();
    }

    protected generateSalt(): Uint8Array {
        return crypto.getRandomValues(new Uint8Array(this._saltSize));
    }
    
    protected generateIV(): Uint8Array {
        return crypto.getRandomValues(new Uint8Array(this._ivSize));
    }

    public getNewEncryptionParameters(): EncryptionParameters {
        return new EncryptionParameters(this.generateSalt(), this.generateIV(), this._iterations);
    }

    private async createPasskey(passphrase: string): Promise<CryptoKey> { 
        return await crypto.subtle.importKey(
          "raw",
          this._encoder.encode(passphrase),
          "PBKDF2",
          false,
          ["deriveBits", "deriveKey"]
        );
    }

    public stringToUint8ArrayBuffer(rawString: string): ArrayBuffer {
        var arrBuffer = new ArrayBuffer(rawString.length); 
        var uint8Array = new Uint8Array(arrBuffer);
        for (var i = 0; i < rawString.length; i++) {
            uint8Array[i] = rawString.charCodeAt(i);
        }
        return arrBuffer;
    }

    public uint8ArrayToString(uint8Array: Uint8Array): Uint8Array {
        return String.fromCharCode.apply(null, uint8Array);
    }

    public async encrypt(plainValue: object, passphrase: string, salt: ArrayBuffer, iv: ArrayBuffer, iterations: number): Promise<ArrayBuffer> {
        let keyMaterial = await this.createPasskey(passphrase);
        let key = await crypto.subtle.deriveKey(
          {
            "name": "PBKDF2",
            salt: salt,
            "iterations": iterations,
            "hash": "SHA-256"
          },
          keyMaterial,
          { "name": "AES-GCM", "length": 256},
          true,
          [ "encrypt", "decrypt" ]
        );

        return await Promise.resolve(crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: iv
          },
          key,
          this._encoder.encode(JSON.stringify(plainValue))
        ));
    }
    
    public async decrypt(encryptedValue: any, passphrase: string, salt: ArrayBuffer, iv: ArrayBuffer, iterations: number): Promise<ArrayBuffer> {
        let keyMaterial = await this.createPasskey(passphrase);
        let key = await crypto.subtle.deriveKey(
          {
            "name": "PBKDF2",
            salt: salt,
            "iterations": iterations,
            "hash": "SHA-256"
          },
          keyMaterial,
          { "name": "AES-GCM", "length": 256},
          true,
          [ "encrypt", "decrypt" ]
        );

        return await Promise.resolve(crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: iv
          },
          key,
          encryptedValue
        ));
    }
}
const localEncryption = new LocalEncryption();
export default localEncryption;