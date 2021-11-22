import { Construct } from 'constructs';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';

const LAMBDA_RUNTIME = lambda.Runtime.PROVIDED_AL2;
const LAMBDA_DEFAULT_TIMEOUT = Duration.seconds(30);
const LAMBDA_DEFAULT_MEMORY = 256; // megabytes

interface RustLambdaStackProps extends StackProps {
    lambdaCodeDistPath: string;
}

export class RustLambdaStack extends Stack {
    constructor(scope: Construct, id: string, props: RustLambdaStackProps) {
        super(scope, id, props);

        new lambda.Function(this, 'RustLambda', {
            runtime: LAMBDA_RUNTIME,
            handler: 'not.required',
            code: lambda.Code.fromAsset(props.lambdaCodeDistPath),
            timeout: LAMBDA_DEFAULT_TIMEOUT,
            memorySize: LAMBDA_DEFAULT_MEMORY,
            environment: {
                RUST_BACKTRACE: '1',
            },
        });
    }
}
