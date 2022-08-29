#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RatemanagerLambdaStack } from '../lib/ratemanager-lambda-stack';
import gitBranch from 'git-branch';
import { CDKContext } from '../types';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { RatemanagerPipeLineStages } from '../lib/setup-stages';
import { pipeline } from 'stream';

// Get CDK Context based on git branch
export const getContext = async (app: cdk.App): Promise<CDKContext> => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentBranch = await gitBranch();
      console.log(currentBranch);

      const environment = app.node.tryGetContext('environments').find((e: any) => e.branchName === currentBranch);

      const globals = app.node.tryGetContext('globals');

      return resolve({ ...globals, ...environment });
    } catch (error) {
      console.error(error);
      return reject();
    }
  });
};

// Create Stacks
const createStacks = async () => {
  try {
    const app = new cdk.App();
    const context = await getContext(app);

    const tags: any = {
      Environment: context.environment,
    };

    const stackProps: cdk.StackProps = {
      env: {
        region: context.region,
        account: context.accountNumber,
      },
      stackName: `${context.appName}-stack-${context.environment}`,
      description: `Development environment stack for ratemanager`,
      tags,
    };

    //new RatemanagerLambdaStack(app, `${context.appName}-stack-${context.environment}`, stackProps, context);

    const pipeline = new CodePipeline(app, 'pipeline', {
      pipelineName: `ratemanager-${context.environment}-pipeline`,
      synth: new ShellStep('Synth', {
          input: CodePipelineSource.gitHub('Shashank-6storage/RateManager_CDK', 'develop'),
          commands: [
              'npm ci',
              'npm run build',
              'npm cdk synth'
          ]
      })
  })

  const devStage = pipeline.addStage(new RatemanagerPipeLineStages(app, "develop", context)); 

  } catch (error) {
    console.error(error);
  }
};

createStacks();
