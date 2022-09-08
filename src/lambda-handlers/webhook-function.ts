import { Handler } from 'aws-lambda';

export const handler = async (event: any) => {
    try {
      // web hook lambda handler code goes here

      return {
        "statusCode": 200,
        "isBase64Encoded": false,
        "body": JSON.stringify({
          "status": "SUCCESS",
          "message": `Hello from ${event.name}`
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
