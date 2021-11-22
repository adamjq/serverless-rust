import { Construct } from 'constructs';
import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_apigateway as apigw } from 'aws-cdk-lib';

const LAMBDA_RUNTIME = lambda.Runtime.PROVIDED_AL2;
const LAMBDA_DEFAULT_TIMEOUT = Duration.seconds(30);
const LAMBDA_DEFAULT_MEMORY = 256; // megabytes

interface RustApiStackProps extends StackProps {
    lambdaCodeDistPath: string;
}

export class RustApiStack extends Stack {
    constructor(scope: Construct, id: string, props: RustApiStackProps) {
        super(scope, id, props);

        const backend = new lambda.Function(this, 'RustLambda', {
            runtime: LAMBDA_RUNTIME,
            handler: 'not.required',
            code: lambda.Code.fromAsset(props.lambdaCodeDistPath),
            timeout: LAMBDA_DEFAULT_TIMEOUT,
            memorySize: LAMBDA_DEFAULT_MEMORY,
            environment: {
                RUST_BACKTRACE: '1',
            },
        });

        const api = new apigw.LambdaRestApi(this, 'RustApi', {
            handler: backend,
        });

        new CfnOutput(this, 'RustApiURL', {
            value: api.url,
        });
    }
}
