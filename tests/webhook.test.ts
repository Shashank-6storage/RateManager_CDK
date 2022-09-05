import * as webhooks from 'lambda-handlers/webhook-function';
import { Context } from 'aws-lambda';

describe('Unit test for webhook handler', function () {
    it('verifies successful response', async () => {
        let context: Context;
        const event = {
            "name": "shashank"
        } as any
        const result = await webhooks.handler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body?.message).toEqual(`Hello from ${event.name}`);
    });
});