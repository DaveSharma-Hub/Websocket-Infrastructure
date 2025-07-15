output "sns_topic_arn" {
    value = aws_sns_topic.server_to_client_sns.arn
}