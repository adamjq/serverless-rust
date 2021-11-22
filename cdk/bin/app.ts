#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RustLambdaStack } from '../lib/lambda';

const app = new cdk.App();
new RustLambdaStack(app, 'RustLambdaStack', {});
