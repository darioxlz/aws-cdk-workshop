"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("aws-cdk-lib");
const codecommit = require("aws-cdk-lib/aws-codecommit");
const pipeline_stage_1 = require("./pipeline-stage");
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
        const deploy = new pipeline_stage_1.WorkshopPipelineStage(this, 'Deploy');
        const deployStage = pipeline.addStage(deploy);
        deployStage.addPost(new pipelines_1.CodeBuildStep('TestViewerEndpoint', {
            projectName: 'TestViewerEndpoint',
            envFromCfnOutputs: {
                ENDPOINT_URL: deploy.hcViewerUrl
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL'
            ]
        }), new pipelines_1.CodeBuildStep('TestAPIGatewayEndpoint', {
            projectName: 'TestAPIGatewayEndpoint',
            envFromCfnOutputs: {
                ENDPOINT_URL: deploy.hcEndpoint
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL',
                'curl -Ssf $ENDPOINT_URL/hello',
                'curl -Ssf $ENDPOINT_URL/test'
            ]
        }));
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMseURBQXlEO0FBRXpELHFEQUF1RDtBQUN2RCxxREFBc0Y7QUFFdEYsTUFBYSxxQkFBc0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNoRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGlFQUFpRTtRQUNqRSxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN6RCxjQUFjLEVBQUUsY0FBYztTQUNqQyxDQUFDLENBQUM7UUFFSCxrRUFBa0U7UUFDbEUsa0JBQWtCO1FBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2hELFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsS0FBSyxFQUFFLElBQUkseUJBQWEsQ0FBQyxXQUFXLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSw4QkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztnQkFDcEQsZUFBZSxFQUFFO29CQUNiLHdCQUF3QjtpQkFDM0I7Z0JBQ0QsUUFBUSxFQUFFO29CQUNOLFFBQVE7b0JBQ1IsZUFBZTtvQkFDZixlQUFlO2lCQUNsQjthQUNKLENBQ0o7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxJQUFJLHNDQUFxQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLFdBQVcsQ0FBQyxPQUFPLENBQ2YsSUFBSSx5QkFBYSxDQUFDLG9CQUFvQixFQUFFO1lBQ3BDLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsaUJBQWlCLEVBQUU7Z0JBQ2YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxXQUFXO2FBQ25DO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLHlCQUF5QjthQUM1QjtTQUNKLENBQUMsRUFFRixJQUFJLHlCQUFhLENBQUMsd0JBQXdCLEVBQUU7WUFDeEMsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxpQkFBaUIsRUFBRTtnQkFDZixZQUFZLEVBQUUsTUFBTSxDQUFDLFVBQVU7YUFDbEM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04seUJBQXlCO2dCQUN6QiwrQkFBK0I7Z0JBQy9CLDhCQUE4QjthQUNqQztTQUNKLENBQUMsQ0FDTCxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBdERELHNEQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCAqIGFzIGNvZGVjb21taXQgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVjb21taXQnO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0IHtXb3Jrc2hvcFBpcGVsaW5lU3RhZ2V9IGZyb20gJy4vcGlwZWxpbmUtc3RhZ2UnO1xyXG5pbXBvcnQge0NvZGVCdWlsZFN0ZXAsIENvZGVQaXBlbGluZSwgQ29kZVBpcGVsaW5lU291cmNlfSBmcm9tIFwiYXdzLWNkay1saWIvcGlwZWxpbmVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV29ya3Nob3BQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBjcmVhdGVzIGEgbmV3IENvZGVDb21taXQgcmVwb3NpdG9yeSBjYWxsZWQgJ1dvcmtzaG9wUmVwbydcclxuICAgICAgICBjb25zdCByZXBvID0gbmV3IGNvZGVjb21taXQuUmVwb3NpdG9yeSh0aGlzLCAnV29ya3Nob3BSZXBvJywge1xyXG4gICAgICAgICAgICByZXBvc2l0b3J5TmFtZTogXCJXb3Jrc2hvcFJlcG9cIlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBUaGUgYmFzaWMgcGlwZWxpbmUgZGVjbGFyYXRpb24uIFRoaXMgc2V0cyB0aGUgaW5pdGlhbCBzdHJ1Y3R1cmVcclxuICAgICAgICAvLyBvZiBvdXIgcGlwZWxpbmVcclxuICAgICAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDb2RlUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xyXG4gICAgICAgICAgICBwaXBlbGluZU5hbWU6ICdXb3Jrc2hvcFBpcGVsaW5lJyxcclxuICAgICAgICAgICAgc3ludGg6IG5ldyBDb2RlQnVpbGRTdGVwKCdTeW50aFN0ZXAnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IENvZGVQaXBlbGluZVNvdXJjZS5jb2RlQ29tbWl0KHJlcG8sICdtYXN0ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YWxsQ29tbWFuZHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ25wbSBpbnN0YWxsIC1nIGF3cy1jZGsnXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbnBtIGNpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ25wbSBydW4gYnVpbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbnB4IGNkayBzeW50aCdcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVwbG95ID0gbmV3IFdvcmtzaG9wUGlwZWxpbmVTdGFnZSh0aGlzLCAnRGVwbG95Jyk7XHJcbiAgICAgICAgY29uc3QgZGVwbG95U3RhZ2UgPSBwaXBlbGluZS5hZGRTdGFnZShkZXBsb3kpO1xyXG5cclxuICAgICAgICBkZXBsb3lTdGFnZS5hZGRQb3N0KFxyXG4gICAgICAgICAgICBuZXcgQ29kZUJ1aWxkU3RlcCgnVGVzdFZpZXdlckVuZHBvaW50Jywge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdE5hbWU6ICdUZXN0Vmlld2VyRW5kcG9pbnQnLFxyXG4gICAgICAgICAgICAgICAgZW52RnJvbUNmbk91dHB1dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBFTkRQT0lOVF9VUkw6IGRlcGxveS5oY1ZpZXdlclVybFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2N1cmwgLVNzZiAkRU5EUE9JTlRfVVJMJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgIG5ldyBDb2RlQnVpbGRTdGVwKCdUZXN0QVBJR2F0ZXdheUVuZHBvaW50Jywge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdE5hbWU6ICdUZXN0QVBJR2F0ZXdheUVuZHBvaW50JyxcclxuICAgICAgICAgICAgICAgIGVudkZyb21DZm5PdXRwdXRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRU5EUE9JTlRfVVJMOiBkZXBsb3kuaGNFbmRwb2ludFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2N1cmwgLVNzZiAkRU5EUE9JTlRfVVJMJyxcclxuICAgICAgICAgICAgICAgICAgICAnY3VybCAtU3NmICRFTkRQT0lOVF9VUkwvaGVsbG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICdjdXJsIC1Tc2YgJEVORFBPSU5UX1VSTC90ZXN0J1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4iXX0=