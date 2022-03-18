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
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMseURBQXlEO0FBRXpELHFEQUF1RDtBQUN2RCxxREFBc0Y7QUFFdEYsTUFBYSxxQkFBc0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNoRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGlFQUFpRTtRQUNqRSxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN6RCxjQUFjLEVBQUUsY0FBYztTQUNqQyxDQUFDLENBQUM7UUFFSCxrRUFBa0U7UUFDbEUsa0JBQWtCO1FBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2hELFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsS0FBSyxFQUFFLElBQUkseUJBQWEsQ0FBQyxXQUFXLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSw4QkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztnQkFDcEQsZUFBZSxFQUFFO29CQUNiLHdCQUF3QjtpQkFDM0I7Z0JBQ0QsUUFBUSxFQUFFO29CQUNOLFFBQVE7b0JBQ1IsZUFBZTtvQkFDZixlQUFlO2lCQUNsQjthQUNKLENBQ0o7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxJQUFJLHNDQUFxQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDSjtBQTlCRCxzREE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgKiBhcyBjb2RlY29tbWl0IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlY29tbWl0JztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCB7V29ya3Nob3BQaXBlbGluZVN0YWdlfSBmcm9tICcuL3BpcGVsaW5lLXN0YWdlJztcclxuaW1wb3J0IHtDb2RlQnVpbGRTdGVwLCBDb2RlUGlwZWxpbmUsIENvZGVQaXBlbGluZVNvdXJjZX0gZnJvbSBcImF3cy1jZGstbGliL3BpcGVsaW5lc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtzaG9wUGlwZWxpbmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIC8vIFRoaXMgY3JlYXRlcyBhIG5ldyBDb2RlQ29tbWl0IHJlcG9zaXRvcnkgY2FsbGVkICdXb3Jrc2hvcFJlcG8nXHJcbiAgICAgICAgY29uc3QgcmVwbyA9IG5ldyBjb2RlY29tbWl0LlJlcG9zaXRvcnkodGhpcywgJ1dvcmtzaG9wUmVwbycsIHtcclxuICAgICAgICAgICAgcmVwb3NpdG9yeU5hbWU6IFwiV29ya3Nob3BSZXBvXCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVGhlIGJhc2ljIHBpcGVsaW5lIGRlY2xhcmF0aW9uLiBUaGlzIHNldHMgdGhlIGluaXRpYWwgc3RydWN0dXJlXHJcbiAgICAgICAgLy8gb2Ygb3VyIHBpcGVsaW5lXHJcbiAgICAgICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ29kZVBpcGVsaW5lKHRoaXMsICdQaXBlbGluZScsIHtcclxuICAgICAgICAgICAgcGlwZWxpbmVOYW1lOiAnV29ya3Nob3BQaXBlbGluZScsXHJcbiAgICAgICAgICAgIHN5bnRoOiBuZXcgQ29kZUJ1aWxkU3RlcCgnU3ludGhTdGVwJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiBDb2RlUGlwZWxpbmVTb3VyY2UuY29kZUNvbW1pdChyZXBvLCAnbWFzdGVyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFsbENvbW1hbmRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICducG0gaW5zdGFsbCAtZyBhd3MtY2RrJ1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ25wbSBjaScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICducG0gcnVuIGJ1aWxkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ25weCBjZGsgc3ludGgnXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlcGxveSA9IG5ldyBXb3Jrc2hvcFBpcGVsaW5lU3RhZ2UodGhpcywgJ0RlcGxveScpO1xyXG4gICAgICAgIGNvbnN0IGRlcGxveVN0YWdlID0gcGlwZWxpbmUuYWRkU3RhZ2UoZGVwbG95KTtcclxuICAgIH1cclxufVxyXG4iXX0=