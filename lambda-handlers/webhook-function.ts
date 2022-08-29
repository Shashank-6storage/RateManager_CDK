import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      // web hook lambda handler code goes here
      return resolve('This is a webhook Function');
    } catch (error) {
      reject();
    }
  });
};
