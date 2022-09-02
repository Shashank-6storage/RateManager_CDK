import * as cdk from 'aws-cdk-lib';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { RatemanagerPipeLineStages } from '../lib/setup-stages';
import { Construct } from 'constructs';
import { CDKContext } from '../types';

export class RateManagerPipeLineStack extends cdk.Stack {
        constructor(scope: any, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const synthstep = new ShellStep('Synth', {
            input: CodePipelineSource.connection('Shashank-6storage/RateManager_CDK', 
            'develop',
            {
                connectionArn: 
                    "arn:aws:codestar-connections:ap-south-1:760389274302:connection/2c3f1bd5-3ff4-4546-a42d-4f85f0a408cd"
            }),
            commands: [
                'npm ci',
                'npm run build',
                'npx cdk synth'
            ]
        });

        //console.log(`env is : ${JSON.stringify(context)}`);
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: `ratemanager-cicd-pipeline`,
            synth: synthstep
        });

        const devcontext: CDKContext = {
            ...scope.node.tryGetContext('environments').find((e: any) => e.branchName === 'develop'),
            ...scope.node.tryGetContext('globals')
          }

        console.log(`printing the dev context: ${JSON.stringify(devcontext)}`);

        const devstage = pipeline.addStage(new RatemanagerPipeLineStages(this, 'ratemanager-develop', devcontext, {
            env: {
                account: devcontext.accountNumber,
                region: devcontext.region
            }
        }));

        devstage.addPost(new ShellStep('validate tests', {
            input: synthstep,
            commands: ['node tests/webhook.test.js']
          }));

        devstage.addPost(new ManualApprovalStep(`Manual approval before test`));
        
        const testcontext: CDKContext = {
            ...scope.node.tryGetContext('environments').find((e: any) => e.branchName === 'test'),
            ...scope.node.tryGetContext('globals')
          }

        const teststage = pipeline.addStage(new RatemanagerPipeLineStages(this, 'ratemanager-test', testcontext, {
            env: {
                account: testcontext.accountNumber,
                region: testcontext.region
            }
        }));
        teststage.addPost(new ManualApprovalStep(`Manual approval before uat`));

        const uatcontext: CDKContext = {
            ...scope.node.tryGetContext('environments').find((e: any) => e.branchName === 'uat'),
            ...scope.node.tryGetContext('globals')
          }

        const uatstage = pipeline.addStage(new RatemanagerPipeLineStages(this, 'ratemanager-uat', uatcontext, {
            env: {
                account: uatcontext.accountNumber,
                region: uatcontext.region
            }
        }));


    }
}