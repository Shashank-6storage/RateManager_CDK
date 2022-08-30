#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import gitBranch from 'git-branch';
import { CDKContext } from '../types';
import { RateManagerPipeLineStack } from '../lib/ratemanager-pipeline-stack';

// Get CDK Context based on git branch
export const getContext = async (app: cdk.App) => {
    try {
      const currentBranch = await gitBranch();
      console.log(currentBranch);

      const environment = app.node.tryGetContext('environments').find((e: any) => e.branchName === currentBranch);

      const globals = app.node.tryGetContext('globals');

      return { ...globals, ...environment };
    } catch (error) {
      console.error(error);
    }
};

const app = new cdk.App();
let context: any;

async () => {
  context = await getContext(app);
}

new RateManagerPipeLineStack(app, 'ratemanager-pipeline-stack', context, {
  env: {
    account: '760389274302',
    region: 'ap-south-1',
  }
});

app.synth();