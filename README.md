# Serverless Rust

![CI](https://github.com/adamjq/serverless-rust/actions/workflows/ci.yml/badge.svg)

## Overview

This project explores building an AWS Lambda function with the Rust custom runtime.

## Requirements
- Rust development environment
- AWS Account
- Docker
- [direnv](https://direnv.net/)
- [Localstack](https://github.com/localstack/localstack)
- [awslocal Localstack CLI wrapper](https://github.com/localstack/awscli-local)

## Development

For Mac OS, make sure you download and link the target and linker for the AWS Lambda Rust runtime:

```bash
make install-runtime-target
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

Deploy CDK stacks to AWS form your local machine:
```
make build-release package-binary deploy
```

## Localstack

This project uses Localstack for local development. Localstack supports deploying and running AWS resources in a local
Docker environment. To use Localstack run:

```bash
docker-compose up

# one-time boostrap
make bootstrap-localstack

# deploy resources in Docker
make deploy-localstack

# check localstack services are running
curl -get http://localhost:4566/health

# call the deployed API in localstack
make call-local-api
```

## References

- [AWS Rust Runtime for Lambda](https://aws.amazon.com/blogs/opensource/rust-runtime-for-aws-lambda/)
