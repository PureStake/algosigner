// import {IClerk} from './interfaces';

// import {MessageBuilder} from '../messaging/builder';

// import {Transaction,RequestErrors} from '@algosigner/common/types';
// import {JsonRpcMethod,JsonRpcResponse} from '@algosigner/common/messaging/types';

// import {Runtime} from '@algosigner/common/runtime/runtime';

// export class Clerk extends Runtime implements IClerk {
//     static get sendReqArgs(): Array<string> {
//         return ['amount','from','to']
//     }
//     send(params: Transaction, error: RequestErrors = RequestErrors.None): Promise<JsonRpcResponse> {
//         if(!super.requiredArgs(Clerk.sendReqArgs,Object.keys(params))){
//             error = RequestErrors.InvalidTransactionParams;
//         }
//         return MessageBuilder.promise(
//             JsonRpcMethod.SignTransaction,
//             params,
//             error
//         );
//     }
// }
