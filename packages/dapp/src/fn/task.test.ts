import { Task } from './task';
import { MessageBuilder } from '../messaging/builder';
import { RequestError } from '@algosigner/common/types';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

jest.mock('../messaging/builder');

describe('task tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  test('connect must call MessageBuilder once', () => {
    const task = new Task();
    task.connect();
    expect(MessageBuilder.promise).toHaveBeenCalledTimes(1);
  });

  test('sign must call MessageBuilder with expected params', () => {
    const transaction = {
      amount: 10,
      from: 'FROMACC',
      note: 'NOTE',
      to: 'TOACC',
    };
    const error = RequestError.None;
    const task = new Task();
    task.sign(transaction, error);
    expect(MessageBuilder.promise).toHaveBeenLastCalledWith(
      JsonRpcMethod.SignTransaction,
      transaction,
      error
    );
  });
});
