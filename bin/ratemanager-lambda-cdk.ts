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
const context: CDKContext = {
  ...app.node.tryGetContext('environments').find((e: any) => e.branchName === 'develop'),
  ...app.node.tryGetContext('globals')
}

new RateManagerPipeLineStack(app, 'ratemanager-pipeline-stack');

app.synth();