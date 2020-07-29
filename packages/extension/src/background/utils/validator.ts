///
// Allowed field types.
///
export enum FieldType {
    Any,
    Address,
    Uint64,
    Uint32,
    String,
    ByteArray,
    Boolean
}

///
// Return field if valid based on type.
///
export function validate(field: any, value: any, type: FieldType): boolean {
    var isValid = true;
    switch(type) {
        // Check by field expected type 

        default:
            break;
    }

    switch(field) {
        // Check by individual field names

        // Question: Verify the address?
        // TODO: Warn/Error on fee amount? Threshold?
        case "fee":
            if(value && parseInt(value) > 10000) { return false; }
            break;
        // TODO: Warn/Error on rounds already past or out too far out for current genesisHash? 
        // TODO: Warn/Error on closeto? Threshold?
        case "closeRemainderTo":
            if(value) { return false; }
            break;
        default:
            break;
    }

    return isValid;
}