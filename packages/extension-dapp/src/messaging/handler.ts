import {OnMessageListener} from './types'; 

export class OnMessageHandler {
    static promise(resolve: Function,reject: Function): OnMessageListener {
        return (event) => {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        }
    }
}