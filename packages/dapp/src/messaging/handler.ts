import { OnMessageListener } from './types';
import { RequestError } from '@algosigner/common/types';

export class OnMessageHandler {
  static promise(resolve: Function, reject: Function): OnMessageListener {
    return (event) => {
      if (event.data.error) {
        reject(event.data.error);
      } else if (event.data.response) {
        resolve(event.data.response);
      } else {
        reject(RequestError.Undefined);
      }
    };
  }
}
