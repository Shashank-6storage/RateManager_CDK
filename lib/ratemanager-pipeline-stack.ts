import * as cdk from 'aws-cdk-lib';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { RatemanagerPipeLineStages } from '../lib/setup-stages';
import { Construct } from 'constructs';
import { CDKContext } from '../types';

export class RateManagerPipeLineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, context: CDKContext, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: `ratemanager-${context.environment}-pipeline`,
            synth: new ShellStep('Synth', {
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
            })
        });

        const devstage = pipeline.addStage(new RatemanagerPipeLineStages(this, 'develop', context));
        devstage.addPost(new ManualApprovalStep(`Manual approval before test`));

        const teststage = pipeline.addStage(new RatemanagerPipeLineStages(this, 'test', context));
        teststage.addPost(new ManualApprovalStep(`Manual approval before uat`));

        const uatstage = pipeline.addStage(new RatemanagerPipeLineStages(this, 'uat', context));


    }
}