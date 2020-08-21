import { InvalidCipherText } from './types';

test('Invalid cipher text test', () => {
    function throwError () { 
        throw new InvalidCipherText("Test Message");
    }
    expect(() => throwError()).toThrow(InvalidCipherText);
});