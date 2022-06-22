import { MessageApi } from './api';
import { Task } from './task';
import encryptionWrap from '../encryptionWrap';
import { isFromExtension } from '@algosigner/common/utils';
import { RequestError } from '@algosigner/common/types';
import { JsonRpcMethod, MessageSource } from '@algosigner/common/messaging/types';
import logging from '@algosigner/common/logging';

const auth_methods = [
  JsonRpcMethod.Authorization,
  JsonRpcMethod.AuthorizationAllow,
  JsonRpcMethod.AuthorizationDeny,
];

class RequestValidation {
  public static isAuthorization(method: JsonRpcMethod) {
    if (auth_methods.indexOf(method) > -1) return true;
    return false;
  }
  public static isPublic(method: JsonRpcMethod) {
    if (method in Task.methods().public) return true;
    return false;
  }
}

export class OnMessageHandler extends RequestValidation {
  static events: { [key: string]: any } = {};

  static handle(request: any, sender: any, sendResponse: any) {
    logging.log(
      `Handler in background messaging: ${JSON.stringify(request)}, ${JSON.stringify(sender)}`,
      2
    );

    if ('tab' in sender) {
      request.originTabID = sender.tab.id;
      request.originTitle = sender.tab.title;
      if ('favIconUrl' in sender.tab) request.favIconUrl = sender.tab.favIconUrl;
    }

    try {
      request.origin = new URL(sender.url).origin;
    } catch (e) {
      request.error = RequestError.NotAuthorizedByUser;
      MessageApi.send(request);
      return;
    }

    return this.processMessage(request, sender, sendResponse);
  }

  static processMessage(request: any, sender: any, sendResponse: any) {
    const source: MessageSource = request.source;
    const body = request.body;
    const method = body.method;
    const id = body.id;

    // Check if the message comes from the extension
    if (isFromExtension(sender.origin)) {
      // Message from extension
      switch (source) {
        // Message from extension to dapp
        case MessageSource.Extension:
          if (OnMessageHandler.isAuthorization(method) && !OnMessageHandler.isPublic(method)) {
            // Is a protected authorization message, allowing or denying auth
            Task.methods().private[method](request);
          } else {
            OnMessageHandler.events[id] = sendResponse;
            MessageApi.send(request);
            // Tell Chrome that this response will be resolved asynchronously.
            return true;
          }
          break;
        case MessageSource.UI:
          return Task.methods().extension[method](request, sendResponse);
          break;
      }
    } else {
      new encryptionWrap('').checkStorage((exist: boolean) => {
        // Reject message if there's no wallet
        if (!exist) {
          request.error = RequestError.NotAuthorizedByUser;
          MessageApi.send(request);
        } else {
          if (OnMessageHandler.isAuthorization(method) && OnMessageHandler.isPublic(method)) {
            // Is a public authorization message, dapp is asking to connect
            Task.methods().public[method](request);
          } else {
            // Other requests from dapp fall here
            if (Task.isAuthorized(request.origin)) {
              // If the origin is authorized, build a promise
              Task.build(request)
                .then((d) => {
                  MessageApi.send(d);
                })
                .catch((d) => {
                  MessageApi.send(d);
                });
            } else {
              // Origin is not authorized
              request.error = RequestError.NotAuthorizedByUser;
              MessageApi.send(request);
            }
          }
        }
      });
      return true;
    }
  }
}
