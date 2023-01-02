provider "aws" {
  region = "us-east-1"
}

resource "aws_lambda_function" "my_function" {
  function_name = "my-lambda-function"
  role = "${aws_iam_role.lambda_role.arn}"
  handler = "com.example.demo.DemoApplication::handleRequest"
  runtime = "java8"
  source_code_hash = "${base64sha256(file("my-lambda-function.zip"))}"
  memory_size = 512
  timeout = 60
}

resource "aws_iam_role" "lambda_role" {
  name = "my-lambda-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "my-lambda-policy"
  role = "${aws_iam_role.lambda_role.id}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
EOF
}
