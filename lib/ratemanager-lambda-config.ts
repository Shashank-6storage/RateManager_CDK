import { Duration } from 'aws-cdk-lib';
import { LambdaDefinition, CDKContext } from '../types';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { HttpMethod } from "aws-cdk-lib/aws-stepfunctions-tasks";

// Constants
const DEFAULT_LAMBDA_MEMORY_MB = 1024;
const DEFAULT_LAMBDA_TIMEOUT_MINS = 15;

// Returns lambda definitions with custom env
export const getLambdaDefinitions = (context: CDKContext, stage: string): LambdaDefinition[] => {
  const lambdaDefinitions: LambdaDefinition[] = [
    {
      name: 'webhook-function',
      environment: {
        REGION: context.region,
        ENV: stage,
        GIT_BRANCH: context.branchName,
      },
      isPrivate: false,
      api: {
        path: `/${context.environment}/webhook`,
        methods: [HttpMethod.POST]
      }
    },
    {
      name: 'graphql-function',
      environment: {
        REGION: context.region,
        ENV: stage,
        GIT_BRANCH: context.branchName,
      },
      isPrivate: false,
      api: {
        path: `/${context.environment}/rm`,
        methods: [HttpMethod.POST]
      }
    }
  ];
  return lambdaDefinitions;
};

// Returns Lambda Function properties with defaults and overwrites
export const getFunctionProps = (
  lambdaDefinition: LambdaDefinition,
  lambdaRole: iam.Role,
  context: CDKContext,
  stage: string
): NodejsFunctionProps => {
  const functionProps: NodejsFunctionProps = {
    functionName: `${context.appName}-${lambdaDefinition.name}-${stage}`,
    entry: `lambda-handlers/${lambdaDefinition.name}.ts`,
    runtime: lambda.Runtime.NODEJS_14_X,
    memorySize: lambdaDefinition.memoryMB ? lambdaDefinition.memoryMB : DEFAULT_LAMBDA_MEMORY_MB,
    timeout: lambdaDefinition.timeoutMins ? Duration.minutes(lambdaDefinition.timeoutMins) : Duration.minutes(DEFAULT_LAMBDA_TIMEOUT_MINS),
    environment: lambdaDefinition.environment,
    role: lambdaRole,
  };
  return functionProps;
};

