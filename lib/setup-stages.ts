import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RatemanagerLambdaStack } from './ratemanager-lambda-stack';
import { ApiGateway } from './ratemanager-api-stack';
import { CDKContext } from '../types';

export class RatemanagerPipeLineStages extends cdk.Stage{
    constructor(scope: Construct, stageName: string, context: CDKContext, props?: cdk.StageProps) {
        super(scope, stageName ,props);

    const lambdaStack = new RatemanagerLambdaStack(this, stageName, context);
    // const apiStack = new APIStack(
    //     this,
    //     `${context.appName}-api-stack-${context.environment}`,
    //     context,
    //     { ...props, lambdaFunctions: lambdaStack.lambdaFunctions }
    //   );

    const apigateway = new ApiGateway(this, 'ratemanager-apigateway', context, { ...props, lambdaFunctions: lambdaStack.lambdaFunctions });
        
    }
}