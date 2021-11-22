import * as cdk from 'aws-cdk-lib';
import { RustLambdaStack } from '../lib/lambda';

describe('RustLambdaStack', () => {
    test('synthesizes correctly', () => {
        const app = new cdk.App();

        new RustLambdaStack(app, 'RustLambdaStack', {
            lambdaCodeDistPath: 'test/testdata/lambda.zip',
        });
    });
});
