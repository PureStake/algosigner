import { Ledger } from '@algosigner/common/messaging/types';
import { JsonPayload } from '@algosigner/common/messaging/types';

/**
 * Taken from algosdk HTTPClient definition
 * removeEmpty gets a dictionary and removes empty values
 * @param obj
 * @returns {*}
 */
function removeEmpty(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!obj[key] || obj[key].length === 0) delete obj[key];
    }
  }
  return obj;
}

/**
 * Taken from algosdk HTTPClient definition
 * getAccceptFormat returns the correct Accept header depending on the
 * requested format.
 * @param query
 * @returns {string}
 */
function getAccceptFormat(query: any) {
  if (query !== undefined && query.hasOwnProperty('format'))
    switch (query.format) {
      case 'msgpack':
        return 'application/msgpack';
      case 'json':
      default:
        return 'application/json';
    }
  else return 'application/json';
}
/**
 * Transform query object into an URI-like string
 * @param query
 * @returns {string}
 */
function createQueryString(query: any) {
  const cleanQuery = removeEmpty(query);
  let queryString = '?';
  for (const key in cleanQuery) {
    if (cleanQuery.hasOwnProperty(key)) {
      queryString += `${key}=${cleanQuery[key]}&`;
    }
  }
  // Slice to remove dangling '&'
  return queryString.slice(0, -1);
}

export class HTTPClient {
  private ledger: Ledger;
  private rpcMethod: Function;

  constructor(ledger: Ledger, rpcMethod: Function) {
    this.rpcMethod = rpcMethod;
    this.ledger = ledger;
  }

  // Signature from algosdk HTTPClient definition
  async get(path: any, query: any = {}, requestHeaders = {}): Promise<any> {
    const payload: JsonPayload = {
      path: path + createQueryString(query),
      ledger: this.ledger,
      contentType: getAccceptFormat(query),
      headers: requestHeaders,
      method: 'GET',
    };

    const response = await Promise.resolve(
      this.rpcMethod(payload)
        .then((response: any) => {
          return response;
        })
        .catch((error: any) => {
          return error;
        })
    );

    return { ok: true, body: response };
  }

  // Signature from algosdk HTTPClient definition
  async post(path: any, data: any, requestHeaders = {}) {
    const payload: JsonPayload = {
      path: path,
      ledger: this.ledger,
      body: data,
      headers: requestHeaders,
      method: 'POST',
    };

    const response = await Promise.resolve(
      this.rpcMethod(payload)
        .then((response: any) => {
          return response;
        })
        .catch((error: any) => {
          return error;
        })
    );

    return { ok: true, body: response };
  }
}
