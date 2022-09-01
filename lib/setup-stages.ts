import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RatemanagerLambdaStack } from './ratemanager-lambda-stack';
import { CDKContext } from '../types';

export class RatemanagerPipeLineStages extends cdk.Stage{
    constructor(scope: Construct, stageName: string, context: CDKContext, props?: cdk.StageProps) {
        super(scope, stageName, context ,props);

    const lambdaStack = new RatemanagerLambdaStack(this, stageName, context);
        
    }
}