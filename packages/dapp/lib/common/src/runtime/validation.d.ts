import { IValidation } from './interfaces';
export declare class Validation implements IValidation {
    requiredArgs(required: Array<string>, input: Array<string>): boolean;
}
