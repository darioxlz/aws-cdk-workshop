import { Stage, CfnOutput, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class WorkshopPipelineStage extends Stage {
    readonly hcViewerUrl: CfnOutput;
    readonly hcEndpoint: CfnOutput;
    constructor(scope: Construct, id: string, props?: StageProps);
}
