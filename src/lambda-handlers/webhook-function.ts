import { Handler } from 'aws-lambda';

export const handler = async (event: any) => {
    try {
      // web hook lambda handler code goes here
      const request = JSON.parse(event.body);
      console.log(`Event passed to lambda------------------------ : ${JSON.stringify(event)}`);

      return {
        "statusCode": 200,
        "isBase64Encoded": false,
        "body": JSON.stringify({
          "status": "SUCCESS",
          "message": `Hello from ${request.name}`
        }),
        "headers":{
          "Content-Type" : "application/json"
        }
      }
    } catch (error) {
      return {
        "statusCode": 400,
        "headers":{
          "Content-Type" : "application/json"
        }
      }
    }
}
