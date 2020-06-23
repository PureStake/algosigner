export class InvalidCipherText extends Error {
    constructor(message?: any) {
        message ? super(message) : super();
        this.name = 'InvalidCipherText';
        Error.captureStackTrace(this, InvalidCipherText);
    }
}