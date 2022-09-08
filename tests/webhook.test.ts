import * as webhooks from '../src/lambda-handlers/webhook-function';
import { Context } from 'aws-lambda';

describe('Unit test for webhook handler', function () {
    it('verifies successful response', async () => {
        let context: Context;
        const event = {
            "body": {
                "name": "shashank"
            }
        } as any


        const result = await webhooks.handler(event);
        const response = (result.body) ? JSON.parse(result.body): {};

        expect(result.statusCode).toEqual(200);
        expect(response.message).toEqual(`Hello from ${event.name}`);
        
    });
});