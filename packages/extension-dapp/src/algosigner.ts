import {Clerk} from './fn/clerk';
import {Router} from './fn/router';

export class AlgoSigner {
    clerk = new Clerk();
    router = new Router();
    send = this.clerk.send;
}