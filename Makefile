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

# build and package the binary from a local machine and deploy with CDK
deploy-local: build-release package-binary deploy

teardown:
	cd cdk && npm run cdk destroy
