#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RustApiStack } from '../lib/api';

const app = new cdk.App();
new RustApiStack(app, 'RustApiStack', {
    lambdaCodeDistPath: '../dist/lambda.zip',
});
