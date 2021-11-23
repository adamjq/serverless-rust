install-runtime-target:
	brew install filosottile/musl-cross/musl-cross
	rustup target add x86_64-unknown-linux-musl
	mkdir -p .cargo
	echo '[target.x86_64-unknown-linux-musl]\nlinker = "x86_64-linux-musl-gcc"\n[net]\ngit-fetch-with-cli = true' > .cargo/config
	cat .cargo/config

build-dev:
	cargo build

build-release:
	cargo build --release --target x86_64-unknown-linux-musl

package-binary:
	mkdir -p dist
	zip -j dist/lambda.zip ./target/x86_64-unknown-linux-musl/release/bootstrap

########## AWS CDK ##########

install-cdk-deps:
	cd cdk && npm ci

lint-cdk:
	cd cdk && npm run lint && npm run prettier

test-cdk:
	cd cdk && npm test

format-cdk:
	cd cdk && npm run lint:fix && npm run prettier:fix

bootstrap-env:
	cd cdk && npm run cdk bootstrap

deploy:
	cd cdk && npm run cdk synth && npm run cdk deploy

teardown:
	cd cdk && npm run cdk destroy

########## LOCALSTACK ##########

bootstrap-localstack:
	cd cdk && cdklocal bootstrap

deploy-localstack: build-release package-binary
	cd cdk && cdklocal deploy --require-approval never

get_local_api_id = $(shell awslocal apigateway get-rest-apis | jq ".items[] | .id"| tr -d '"')

call-local-api:
	$(eval APIGW=https://$(get_local_api_id).execute-api.localhost.localstack.cloud:4566/prod/)
	@echo Calling Localstack API Gateway $(APIGW)
	curl $(APIGW)testpath
