import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class CdkWorkshopStack extends Stack {
    readonly hcViewerUrl: CfnOutput;
    readonly hcEndpoint: CfnOutput;
    constructor(scope: Construct, id: string, props?: StackProps);
}
