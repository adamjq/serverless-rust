# serverless-rust

## Requirements
- Rust development environment
- AWS Account
- [direnv](https://direnv.net/)

## Overview

This project explores building an AWS Lambda function with the Rust custom runtime.

## Development

For Mac OS, make sure you download and link the target and linker for the AWS Lambda Rust runtime:

```bash
make install-runtime-target-macos-deps install-runtime-target
```

## Deployment

First, set an `AWS_PROFILE` environment variable in a `.envrc` file following the example in [.envrc.example](./.envrc.example).

```bash
direnv allow .
```

Install NPM dependencies for CDK infrastructure:
```bash
make install-cdk-deps
```

Make sure your AWS account is bootstrapped for CDK applications
```bash
make bootstrap-env
```

Deploy CDK stacks to AWS:
```
make deploy
```

## References

- [AWS Rust Runtime for Lambda](https://aws.amazon.com/blogs/opensource/rust-runtime-for-aws-lambda/)
