import * as cdk from 'aws-cdk-lib';
import { RustApiStack } from '../lib/api';

describe('RustApiStack', () => {
    test('synthesizes correctly', () => {
        const app = new cdk.App({
            outdir: './cdk.out',
        });

        new RustApiStack(app, 'RustApiStack', {
            lambdaCodeDistPath: 'test/testdata/lambda.zip',
        });

        app.synth();
    });
});
