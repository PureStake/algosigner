import { ITask } from './interfaces';
import { Transaction, RequestErrors } from '@algosigner/common/types';
import { JsonPayload, SupportedAlgod } from '@algosigner/common/messaging/types';
import { Runtime } from '@algosigner/common/runtime/runtime';
export declare class Task extends Runtime implements ITask {
    static subscriptions: {
        [key: string]: Function;
    };
    static get inPayloadSign(): Array<string>;
    connect(): Promise<JsonPayload>;
    accounts(): void;
    sign(params: Transaction, error?: RequestErrors): Promise<JsonPayload>;
    query(method: SupportedAlgod, params: JsonPayload, error?: RequestErrors): Promise<JsonPayload>;
    subscribe(eventName: string, callback: Function): void;
}
