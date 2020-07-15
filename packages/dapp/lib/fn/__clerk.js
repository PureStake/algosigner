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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbi9fX2NsZXJrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQge0lDbGVya30gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuXHJcbi8vIGltcG9ydCB7TWVzc2FnZUJ1aWxkZXJ9IGZyb20gJy4uL21lc3NhZ2luZy9idWlsZGVyJzsgXHJcblxyXG4vLyBpbXBvcnQge1RyYW5zYWN0aW9uLFJlcXVlc3RFcnJvcnN9IGZyb20gJ0BhbGdvc2lnbmVyL2NvbW1vbi90eXBlcyc7XHJcbi8vIGltcG9ydCB7SnNvblJwY01ldGhvZCxKc29uUnBjUmVzcG9uc2V9IGZyb20gJ0BhbGdvc2lnbmVyL2NvbW1vbi9tZXNzYWdpbmcvdHlwZXMnO1xyXG5cclxuLy8gaW1wb3J0IHtSdW50aW1lfSBmcm9tICdAYWxnb3NpZ25lci9jb21tb24vcnVudGltZS9ydW50aW1lJztcclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBDbGVyayBleHRlbmRzIFJ1bnRpbWUgaW1wbGVtZW50cyBJQ2xlcmsge1xyXG4vLyAgICAgc3RhdGljIGdldCBzZW5kUmVxQXJncygpOiBBcnJheTxzdHJpbmc+IHtcclxuLy8gICAgICAgICByZXR1cm4gWydhbW91bnQnLCdmcm9tJywndG8nXVxyXG4vLyAgICAgfVxyXG4vLyAgICAgc2VuZChwYXJhbXM6IFRyYW5zYWN0aW9uLCBlcnJvcjogUmVxdWVzdEVycm9ycyA9IFJlcXVlc3RFcnJvcnMuTm9uZSk6IFByb21pc2U8SnNvblJwY1Jlc3BvbnNlPiB7XHJcbi8vICAgICAgICAgaWYoIXN1cGVyLnJlcXVpcmVkQXJncyhDbGVyay5zZW5kUmVxQXJncyxPYmplY3Qua2V5cyhwYXJhbXMpKSl7XHJcbi8vICAgICAgICAgICAgIGVycm9yID0gUmVxdWVzdEVycm9ycy5JbnZhbGlkVHJhbnNhY3Rpb25QYXJhbXM7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBNZXNzYWdlQnVpbGRlci5wcm9taXNlKFxyXG4vLyAgICAgICAgICAgICBKc29uUnBjTWV0aG9kLlNpZ25UcmFuc2FjdGlvbiwgXHJcbi8vICAgICAgICAgICAgIHBhcmFtcyxcclxuLy8gICAgICAgICAgICAgZXJyb3JcclxuLy8gICAgICAgICApO1xyXG4vLyAgICAgfVxyXG4vLyB9Il19