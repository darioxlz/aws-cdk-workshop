"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkWorkshopStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apiG = require("aws-cdk-lib/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class CdkWorkshopStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // se define el recurso lambda en este stack
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.AssetCode.fromAsset('lambda'),
            handler: 'hello.handler'
        });
        const helloWithCounter = new hitcounter_1.HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });
        const gateway = new apiG.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler
        });
        const tableViewer = new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: helloWithCounter.table
        });
        this.hcEndpoint = new aws_cdk_lib_1.CfnOutput(this, 'GatewayUrl', {
            value: gateway.url
        });
        this.hcViewerUrl = new aws_cdk_lib_1.CfnOutput(this, 'TableViewerUrl', {
            value: tableViewer.endpoint
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUEyRDtBQUUzRCxpREFBaUQ7QUFDakQsbURBQW1EO0FBQ25ELDZDQUEwQztBQUMxQyxxRUFBc0Q7QUFFdEQsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUl6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDRDQUE0QztRQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDMUMsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQy9ELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPO1NBQ2xDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLElBQUkscUNBQVcsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDMUQsS0FBSyxFQUFFLFlBQVk7WUFDbkIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUs7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNsRCxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3ZELEtBQUssRUFBRSxXQUFXLENBQUMsUUFBUTtTQUM1QixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuQ0QsNENBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpRyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBIaXRDb3VudGVyIH0gZnJvbSAnLi9oaXRjb3VudGVyJztcbmltcG9ydCB7IFRhYmxlVmlld2VyIH0gZnJvbSAnY2RrLWR5bmFtby10YWJsZS12aWV3ZXInO1xuXG5leHBvcnQgY2xhc3MgQ2RrV29ya3Nob3BTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgcHVibGljIHJlYWRvbmx5IGhjVmlld2VyVXJsOiBDZm5PdXRwdXQ7XG4gIHB1YmxpYyByZWFkb25seSBoY0VuZHBvaW50OiBDZm5PdXRwdXQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBzZSBkZWZpbmUgZWwgcmVjdXJzbyBsYW1iZGEgZW4gZXN0ZSBzdGFja1xuICAgIGNvbnN0IGhlbGxvID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnSGVsbG9IYW5kbGVyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQXNzZXRDb2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnaGVsbG8uaGFuZGxlcidcbiAgICB9KTtcblxuICAgIGNvbnN0IGhlbGxvV2l0aENvdW50ZXIgPSBuZXcgSGl0Q291bnRlcih0aGlzLCAnSGVsbG9IaXRDb3VudGVyJywge1xuICAgICAgZG93bnN0cmVhbTogaGVsbG9cbiAgICB9KTtcblxuICAgIGNvbnN0IGdhdGV3YXkgPSBuZXcgYXBpRy5MYW1iZGFSZXN0QXBpKHRoaXMsICdFbmRwb2ludCcsIHtcbiAgICAgIGhhbmRsZXI6IGhlbGxvV2l0aENvdW50ZXIuaGFuZGxlclxuICAgIH0pO1xuXG4gICAgY29uc3QgdGFibGVWaWV3ZXIgPSBuZXcgVGFibGVWaWV3ZXIodGhpcywgJ1ZpZXdIaXRDb3VudGVyJywge1xuICAgICAgdGl0bGU6ICdIZWxsbyBIaXRzJyxcbiAgICAgIHRhYmxlOiBoZWxsb1dpdGhDb3VudGVyLnRhYmxlXG4gICAgfSk7XG5cbiAgICB0aGlzLmhjRW5kcG9pbnQgPSBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdHYXRld2F5VXJsJywge1xuICAgICAgdmFsdWU6IGdhdGV3YXkudXJsXG4gICAgfSk7XG5cbiAgICB0aGlzLmhjVmlld2VyVXJsID0gbmV3IENmbk91dHB1dCh0aGlzLCAnVGFibGVWaWV3ZXJVcmwnLCB7XG4gICAgICB2YWx1ZTogdGFibGVWaWV3ZXIuZW5kcG9pbnRcbiAgICB9KTtcbiAgfVxufVxuIl19