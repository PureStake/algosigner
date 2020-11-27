import { MessageApi } from './api';
import { extensionBrowser } from '@algosigner/common/chrome';

test('message is sent to originTabID tab', () => {
  const message = {
    source: 'dApp',
    body: {
      jsonrpc: '2.0',
      method: 'get-session',
      params: {},
      id: '17402bbaa89',
    },
    origin: 'http://localhost:9000',
    originTabID: '41',
  };
  MessageApi.send(message);
  expect(extensionBrowser.tabs.sendMessage).toHaveBeenCalledWith(
    message.originTabID,
    message
  );
});
