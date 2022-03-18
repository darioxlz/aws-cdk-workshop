"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("aws-cdk-lib");
const codecommit = require("aws-cdk-lib/aws-codecommit");
const pipelines_1 = require("aws-cdk-lib/pipelines");
class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // This creates a new CodeCommit repository called 'WorkshopRepo'
        const repo = new codecommit.Repository(this, 'WorkshopRepo', {
            repositoryName: "WorkshopRepo"
        });
        // The basic pipeline declaration. This sets the initial structure
        // of our pipeline
        const pipeline = new pipelines_1.CodePipeline(this, 'Pipeline', {
            pipelineName: 'WorkshopPipeline',
            synth: new pipelines_1.CodeBuildStep('SynthStep', {
                input: pipelines_1.CodePipelineSource.codeCommit(repo, 'master'),
                installCommands: [
                    'npm install -g aws-cdk'
                ],
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            })
        });
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMseURBQXlEO0FBRXpELHFEQUFzRjtBQUV0RixNQUFhLHFCQUFzQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2hELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsaUVBQWlFO1FBQ2pFLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3pELGNBQWMsRUFBRSxjQUFjO1NBQ2pDLENBQUMsQ0FBQztRQUVILGtFQUFrRTtRQUNsRSxrQkFBa0I7UUFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSx3QkFBWSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDaEQsWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxLQUFLLEVBQUUsSUFBSSx5QkFBYSxDQUFDLFdBQVcsRUFBRTtnQkFDOUIsS0FBSyxFQUFFLDhCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO2dCQUNwRCxlQUFlLEVBQUU7b0JBQ2Isd0JBQXdCO2lCQUMzQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ04sUUFBUTtvQkFDUixlQUFlO29CQUNmLGVBQWU7aUJBQ2xCO2FBQ0osQ0FDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTNCRCxzREEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgKiBhcyBjb2RlY29tbWl0IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlY29tbWl0JztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCB7Q29kZUJ1aWxkU3RlcCwgQ29kZVBpcGVsaW5lLCBDb2RlUGlwZWxpbmVTb3VyY2V9IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc2hvcFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYSBuZXcgQ29kZUNvbW1pdCByZXBvc2l0b3J5IGNhbGxlZCAnV29ya3Nob3BSZXBvJ1xyXG4gICAgICAgIGNvbnN0IHJlcG8gPSBuZXcgY29kZWNvbW1pdC5SZXBvc2l0b3J5KHRoaXMsICdXb3Jrc2hvcFJlcG8nLCB7XHJcbiAgICAgICAgICAgIHJlcG9zaXRvcnlOYW1lOiBcIldvcmtzaG9wUmVwb1wiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBiYXNpYyBwaXBlbGluZSBkZWNsYXJhdGlvbi4gVGhpcyBzZXRzIHRoZSBpbml0aWFsIHN0cnVjdHVyZVxyXG4gICAgICAgIC8vIG9mIG91ciBwaXBlbGluZVxyXG4gICAgICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IENvZGVQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XHJcbiAgICAgICAgICAgIHBpcGVsaW5lTmFtZTogJ1dvcmtzaG9wUGlwZWxpbmUnLFxyXG4gICAgICAgICAgICBzeW50aDogbmV3IENvZGVCdWlsZFN0ZXAoJ1N5bnRoU3RlcCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dDogQ29kZVBpcGVsaW5lU291cmNlLmNvZGVDb21taXQocmVwbywgJ21hc3RlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbGxDb21tYW5kczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbnBtIGluc3RhbGwgLWcgYXdzLWNkaydcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICducG0gY2knLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbnBtIHJ1biBidWlsZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICducHggY2RrIHN5bnRoJ1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==