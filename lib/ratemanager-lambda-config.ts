import { Duration } from 'aws-cdk-lib';
import { LambdaDefinition, CDKContext } from '../types';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

// Constants
const DEFAULT_LAMBDA_MEMORY_MB = 256;
const DEFAULT_LAMBDA_TIMEOUT_MINS = 3;

// Returns lambda definitions with custom env
export const getLambdaDefinitions = (context: CDKContext, stage: string): LambdaDefinition[] => {
  const lambdaDefinitions: LambdaDefinition[] = [
    {
      name: 'webhook-function',
      environment: {
        REGION: context.region,
        ENV: stage,
        GIT_BRANCH: context.branchName,
        DB_TYPE: context.db_type,
        DB_NAME: context.db_name,
        DB_HOST: context.db_host,
        DB_PORT: context.db_port,
        DB_USERNAME: context.db_username,
        DB_PASSWORD: context.db_password 
      },
      isPrivate: false,
      api: {
        path: `/webhook`,
        methods: "POST"
      }
    },
    {
      name: 'graphql-function',
      environment: {
        REGION: context.region,
        ENV: stage,
        GIT_BRANCH: context.branchName,
        DB_TYPE: context.db_type,
        DB_NAME: context.db_name,
        DB_HOST: context.db_host,
        DB_PORT: context.db_port,
        DB_USERNAME: context.db_username,
        DB_PASSWORD: context.db_password 
      },
      isPrivate: false,
      api: {
        path: `/rm`,
        methods: "POST"
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
    entry: `./src/lambda-handlers/${lambdaDefinition.name}.ts`,
    runtime: lambda.Runtime.NODEJS_14_X,
    memorySize: lambdaDefinition.memoryMB ? lambdaDefinition.memoryMB : DEFAULT_LAMBDA_MEMORY_MB,
    timeout: lambdaDefinition.timeoutMins ? Duration.minutes(lambdaDefinition.timeoutMins) : Duration.minutes(DEFAULT_LAMBDA_TIMEOUT_MINS),
    environment: lambdaDefinition.environment,
    role: lambdaRole,
  };
  return functionProps;
};

