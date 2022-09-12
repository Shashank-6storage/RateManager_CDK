import { Handler } from 'aws-lambda';

export const handler = async (event: any) => {
    try {
      // web hook lambda handler code goes here
      
      // console.log(`Event passed to lambda------------------------ : ${JSON.stringify(event)}`);

      // return {
      //   "statusCode": 200,
      //   "isBase64Encoded": false,
      //   "body": JSON.stringify({
      //     "status": "SUCCESS",
      //     "message": `Hello from ${event.body.name}`
      //   }),
      //   "headers":{
      //     "Content-Type" : "application/json"
      //   }
      // }

      return 'test';
    } catch (error) {
      return {
        "statusCode": 400,
        "headers":{
          "Content-Type" : "application/json"
        }
      }
    }
}
