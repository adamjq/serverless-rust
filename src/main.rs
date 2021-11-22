use lambda_runtime::{handler_fn, Context, Error};
use log::LevelFilter;
use serde_json::{json, Value};
use simple_logger::SimpleLogger;

#[tokio::main]
async fn main() -> Result<(), Error> {
    SimpleLogger::new()
        .with_level(LevelFilter::Info)
        .init()
        .unwrap();

    let func = handler_fn(handler);
    lambda_runtime::run(func).await?;
    Ok(())
}

async fn handler(event: Value, _: Context) -> Result<Value, Error> {
    let message = event["message"].as_str().unwrap_or("world");

    let response = format!("Hello, {}!", message,);
    log::info!("{}", response);

    Ok(json!({ "response": response }))
}
