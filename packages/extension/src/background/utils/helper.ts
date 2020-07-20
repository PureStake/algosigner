import {Ledger} from '../messaging/types';

export default class Helper {
    private _session: any;

    // Ledger helpers
    public static ledger(): {[key: string]: any} {
        return {
            supported: (params: {[key: string]: any}): boolean => {
                if(
                    !('ledger' in params) || 
                    !(Helper.str().capitalize(params.ledger) in Ledger)
                )
                    return false;
                return true;
            }
        }
    }
    // String helpers
    public static str(): {[key: string]: any} {
        return {
            // Capitalize the first char
            capitalize: (s: String): String => {
                s = s.toLowerCase();
                return s[0].toUpperCase() + s.substr(1);
            }
        }
    }

    public set session(v : any) {
        this._session = v;
    }

    public get session() : any {
        return this._session;
    }
}