resource "aws_sns_topic" "server_to_client_sns" {
  name = "send_to_client_sns_topic"
}

resource "aws_sns_topic_subscription" "sns_to_lambda" {
  topic_arn = aws_sns_topic.sns_topic.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.lambda_to_client.arn
}

resource "aws_lambda_permission" "invoke_lambda" {
  statement_id  = "AllowSNSLambdaInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_to_client.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.server_to_client_sns.arn
}