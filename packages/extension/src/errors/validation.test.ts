import { InvalidTransactionStructure } from './validation';

test('Invalid transaction', () => {
    function throwError () { 
        throw new InvalidTransactionStructure("Test Message");
    }
    expect(() => throwError()).toThrow(InvalidTransactionStructure);
});