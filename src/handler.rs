#![allow(unused_imports)]

use aws_lambda_events::encodings::Body;
use aws_lambda_events::event::apigw::{ApiGatewayProxyRequest, ApiGatewayProxyResponse};
use http::header::HeaderMap;
use lambda_runtime::{Context, Error as LambdaError};
use std::io::Error as IOError;

pub async fn handler(
    event: ApiGatewayProxyRequest,
    _ctx: Context,
) -> Result<ApiGatewayProxyResponse, LambdaError> {
    let path = event.path.unwrap();

    let resp = ApiGatewayProxyResponse {
        status_code: 200,
        headers: HeaderMap::new(),
        multi_value_headers: HeaderMap::new(),
        body: Some(Body::Text(format!("Hello from '{}'", path))),
        is_base64_encoded: Some(false),
    };

    Ok(resp)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;

    // helper function for loading JSON test fixtures
    fn load_json_from_file(file_path: String) -> Result<ApiGatewayProxyRequest, IOError> {
        let data = fs::read_to_string(file_path).expect("Unable to read file");
        let apigw_event: ApiGatewayProxyRequest = serde_json::from_str(&data)?;
        Ok(apigw_event)
    }

    fn lambda_mock_context() -> Result<Context, IOError> {
        let data = fs::read_to_string("tests/fixtures/ExampleLambdaContext.json")
            .expect("Unable to read file");
        let lambda_mock_context: Context = serde_json::from_str(&data)?;
        Ok(lambda_mock_context)
    }

    #[tokio::test]
    async fn lambda_succeeds() {
        let apigw_event: ApiGatewayProxyRequest =
            load_json_from_file("tests/fixtures/ExampleLambdaProxyRequest.json".to_string())
                .unwrap();
        let lambda_mock_context: Context = lambda_mock_context().unwrap();

        let resp = handler(apigw_event, lambda_mock_context).await.unwrap();

        assert_eq!(resp.status_code, 200);
        assert_eq!(resp.body, Some(Body::Text("Hello from '/'".to_string())));
    }
}
