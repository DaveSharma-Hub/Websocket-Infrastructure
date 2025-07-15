resource "aws_lambda_function" "lambda_to_client" {
  filename      = "lambdaToClient.zip"
  function_name = "lambda_to_client_function"
  role          = aws_iam_role.lambda_to_client_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  environment {
    variables = {
      ENVIRONMENT = "production"
      LOG_LEVEL   = "info"
      AWS_REGION  = "${var.aws_region}"
      ACCESS_KEY  = "${var.aws_access_key}"
      SECRET_KEY  = "${var.aws_secret_key}"
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

resource "aws_iam_role" "lambda_to_client_role" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}