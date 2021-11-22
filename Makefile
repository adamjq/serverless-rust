install-runtime-target:
	rustup target add x86_64-unknown-linux-musl
	brew install filosottile/musl-cross/musl-cross
	mkdir -p .cargo
	echo '[target.x86_64-unknown-linux-musl]\n\
	linker = "x86_64-linux-musl-gcc"' > .cargo/config

build-dev:
	cargo build

build-release:
	cargo build --release --target x86_64-unknown-linux-musl

package-binary:
	mkdir -p dist
	zip -j dist/lambda.zip ./target/x86_64-unknown-linux-musl/release/bootstrap

########## AWS CDK ##########

install-cdk-deps:
	cd cdk && npm install

lint-cdk:
	cd cdk && npm run lint && npm run prettier

format-cdk:
	cd cdk && npm run lint:fix && npm run prettier:fix

bootstrap-env:
	cd cdk && npm run cdk bootstrap

deploy: build-release package-binary
	cd cdk && npm run cdk synth && npm run cdk deploy

teardown:
	cd cdk && npm run cdk destroy
