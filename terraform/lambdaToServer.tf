resource "aws_lambda_function" "lambda_to_server" {
  filename      = "lambdaToServer.zip"
  function_name = "lambda_to_server_function"
  role          = aws_iam_role.lambda_to_server_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  environment {
    variables = {
      ENVIRONMENT                 = "production"
      LOG_LEVEL                   = "info"
      SERVICE_ENDPOINT_CONNECT    = "${var.service_endpoint_connect}"
      SERVICE_ENDPOINT_DISCONNECT = "${var.service_endpoint_disconnect}"
      SERVICE_ENDPOINT_MESSAGE    = "${var.service_endpoint_message}"
    }
  }

  tags = {
    Environment = "production"
    Application = "websocket-infrastructure"
  }
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_to_server_role" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}