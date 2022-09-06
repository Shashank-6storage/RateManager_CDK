import { ContextProvider, Stack, StackProps } from "aws-cdk-lib"
import { DomainName, HttpApi, CorsHttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { Construct } from "constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { APIStackProps, CDKContext } from "types";
import { ARecord, RecordTarget, HostedZone } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayv2DomainProperties } from 'aws-cdk-lib/aws-route53-targets';
import { getLambdaDefinitions } from './ratemanager-lambda-config';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

export class APIStack extends Stack{
    constructor(scope: Construct, id: string, context: CDKContext, props: APIStackProps){
        super(scope, id, props);

    // // Define Custom Domain
    // const apiDomain = new DomainName(this, 'apiDomain', {
    //     domainName: context.apiDomain,
    //     certificate: Certificate.fromCertificateArn(this, 'apiDomainCert', context.regionalCertArn)
    // });

    // // Add Route 53 entry for Api
    // new ARecord(this, 'apiDNSRecord', {
    //     zone: HostedZone.fromHostedZoneAttributes(this, 'apiHostedZone', {
    //       hostedZoneId: context.hostedZondId,
    //       zoneName: context.baseDomain,
    //     }),
    //     recordName: context.apiDomain,
    //     target: RecordTarget.fromAlias(new ApiGatewayv2DomainProperties(apiDomain.regionalDomainName, apiDomain.regionalHostedZoneId)),
    //   });

    // Define HTTP API
    const httpApi = new HttpApi(this, 'httpApi', {
        apiName: `${context.appName}-api-${context.environment}`,
        description: `RATEMANAGER HTTP API  - ${context.environment}`,
        corsPreflight: {
          allowHeaders: ['Content-Type'],
          allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST, CorsHttpMethod.OPTIONS, CorsHttpMethod.DELETE, CorsHttpMethod.PATCH],
          allowOrigins: ['*'],
        }
      });

    // Get Lambda definitions
    const lambdaDefinitions = getLambdaDefinitions(context, context.environment);

    // Loop through lambda definitions and create api routes if any
    for (const lambdaDefinition of lambdaDefinitions) {
        if (lambdaDefinition.api) {
          httpApi.addRoutes({
            path: lambdaDefinition.api.path,
            methods: lambdaDefinition.api.methods,
            integration: new HttpLambdaIntegration(`${lambdaDefinition.name}-integration`, props.lambdaFunctions[lambdaDefinition.name]),
          });
        }
      }

    }
}