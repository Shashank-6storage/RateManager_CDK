#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import gitBranch from 'git-branch';
import { CDKContext } from '../types';
import { RateManagerPipeLineStack } from '../lib/ratemanager-pipeline-stack';

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

const app = new cdk.App();

async() => {
  const context = await getContext(app);
  new RateManagerPipeLineStack(app, `ratemanager-cicd-pipeline`, context, {
    env: {
      region: context.region,
      account: context.accountNumber,
    }
  }
  );
}


app.synth();
