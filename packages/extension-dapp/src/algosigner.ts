import {Clerk} from './fn/clerk';

export class AlgoSigner {
    clerk = new Clerk();
    send = this.clerk.send;
}