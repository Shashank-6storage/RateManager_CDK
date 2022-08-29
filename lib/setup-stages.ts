import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RatemanagerLambdaStack } from './ratemanager-lambda-stack';
import { CDKContext } from '../types';

export class RatemanagerPipeLineStages extends cdk.Stage{
    constructor(scope: Construct, stageName: string, context: CDKContext) {
        super(scope, stageName);

    const lamdaStack = new RatemanagerLambdaStack(this, `develop`, context);
        
    }
}