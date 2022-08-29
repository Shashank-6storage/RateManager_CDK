import * as cdk from 'aws-cdk-lib';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { CDKContext } from '../types';

export class rateManagerPipeLineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, context: CDKContext, props?: cdk.StackProps) {
        super(scope, id, props);
        
        new CodePipeline(this, 'pipeline', {
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
    }
}