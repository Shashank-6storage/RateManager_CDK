import { Stack, StackProps, RemovalPolicy, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDKContext } from '../types';

import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cwLogs from 'aws-cdk-lib/aws-logs';

import { getLambdaDefinitions, getFunctionProps } from './ratemanager-lambda-config';

export class RatemanagerLambdaStack extends Stack {
  constructor(scope: Construct, stage: string, context: CDKContext) {
    super(scope, stage);

    console.log(`---------------------------------------------------- in ${context.region} region ---------------------------------------`);
    // Lambda Role
    const lambdaRole = new iam.Role(this, 'lambdaRole', {
      roleName: `${context.appName}-lambda-role-${stage}`,
      description: `Lambda role for ${context.appName}`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Attach inline policies to Lambda role
    lambdaRole.attachInlinePolicy(
      new iam.Policy(this, 'lambdaExecutionAccess', {
        policyName: 'lambdaExecutionAccess',
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            resources: ['*'],
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:DescribeLogGroups',
              'logs:DescribeLogStreams',
              'logs:PutLogEvents',
            ],
          }),
        ],
      })
    );

    // VPC



    // Get Lambda definitions
    const lambdaDefinitions = getLambdaDefinitions(context, stage);

    // Loop through the definitions and create lambda functions
    for (const lambdaDefinition of lambdaDefinitions) {
      // Get function props based on lambda definition
      let functionProps = getFunctionProps(lambdaDefinition, lambdaRole, context, stage);

      // Check if function is private and add VPC, SG and Subnets
      if (lambdaDefinition.isPrivate) {
        functionProps = {
          ...functionProps
        };
      }

      // Lambda Function
      new NodejsFunction(this, `${lambdaDefinition.name}-function`, functionProps);

      // Create corresponding Log Group with one month retention
      new cwLogs.LogGroup(this, `fn-${lambdaDefinition.name}-log-group`, {
        logGroupName: `/aws/lambda/${context.appName}-${lambdaDefinition.name}-${stage}`,
        retention: cwLogs.RetentionDays.ONE_MONTH,
        removalPolicy: RemovalPolicy.DESTROY,
      });
    }
  }
}
