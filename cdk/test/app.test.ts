import * as cdk from 'aws-cdk-lib';
import { RustApiStack } from '../lib/api';

describe('RustApiStack', () => {
    test('synthesizes correctly', () => {
        const app = new cdk.App();

        new RustApiStack(app, 'RustApiStack', {
            lambdaCodeDistPath: 'test/testdata/lambda.zip',
        });
    });
});
