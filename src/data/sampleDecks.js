// ─── Sample Quiz Decks ──────────────────────────────────────────────────────
// AWS Certified Developer Associate (DVA-C02) — 60 questions across 3 parts
// Each deck: { name, questions: [{ question, options: [A,B,C,D], answer: 0-3 }] }

// ═══════════════════════════════════════════════════════════════════════════
// Part 1: Compute, Serverless & Deployment
// ═══════════════════════════════════════════════════════════════════════════
export const DVA_C02_PART1 = {
  name: 'DVA-C02 Part 1: Compute',
  questions: [
    {
      question: 'A Lambda function needs to access an RDS database in a private subnet. What must you configure?',
      options: [
        'Assign a public IP to the Lambda function',
        'Configure the Lambda function to run inside the VPC with proper subnet and security group',
        'Enable Lambda public access and whitelist the RDS IP',
        'Create an internet gateway for the Lambda function',
      ],
      answer: 1,
    },
    {
      question: 'What is the maximum execution timeout for an AWS Lambda function?',
      options: ['5 minutes', '10 minutes', '15 minutes', '60 minutes'],
      answer: 2,
    },
    {
      question: 'Which Lambda deployment method shifts traffic incrementally using a pre-defined percentage?',
      options: ['AllAtOnce', 'Canary', 'Linear', 'Blue/Green'],
      answer: 2,
    },
    {
      question: 'A developer wants to test a new Lambda version by sending 10% of traffic to it. Which feature should they use?',
      options: ['Lambda layers', 'Lambda aliases with weighted routing', 'Lambda environment variables', 'Lambda reserved concurrency'],
      answer: 1,
    },
    {
      question: 'What happens when a Lambda function exceeds its reserved concurrency limit?',
      options: [
        'The function auto-scales beyond the limit',
        'Excess invocations are throttled with a 429 error',
        'Excess invocations are queued indefinitely',
        'The function is terminated and redeployed',
      ],
      answer: 1,
    },
    {
      question: 'Which Elastic Beanstalk deployment policy deploys to a new set of instances before swapping?',
      options: ['All at once', 'Rolling', 'Rolling with additional batch', 'Immutable'],
      answer: 3,
    },
    {
      question: 'An application on Elastic Beanstalk needs to run initialization scripts on each EC2 instance. Where should these be placed?',
      options: [
        'In the Lambda console',
        'In .ebextensions/ config files in the source bundle',
        'In the EC2 User Data only',
        'In the RDS parameter group',
      ],
      answer: 1,
    },
    {
      question: 'A developer is using AWS SAM. Which command packages and uploads the application to S3?',
      options: ['sam init', 'sam build', 'sam package', 'sam deploy'],
      answer: 2,
    },
    {
      question: 'In a SAM template, what does the AWS::Serverless::Function resource create?',
      options: [
        'An EC2 instance',
        'A Lambda function with an optional API Gateway event source',
        'An ECS task definition',
        'A Step Functions state machine',
      ],
      answer: 1,
    },
    {
      question: 'What is the purpose of Lambda Layers?',
      options: [
        'To increase the function timeout',
        'To share libraries and dependencies across multiple functions',
        'To enable VPC access',
        'To configure dead-letter queues',
      ],
      answer: 1,
    },
    {
      question: 'A CodeDeploy deployment to Lambda failed. Which lifecycle hook runs validation tests after traffic shifting?',
      options: ['BeforeInstall', 'AfterAllowTraffic', 'ValidateService', 'BeforeAllowTraffic'],
      answer: 1,
    },
    {
      question: 'Which CodeBuild file specifies the build commands and phases?',
      options: ['appspec.yml', 'buildspec.yml', 'template.yaml', 'taskdef.json'],
      answer: 1,
    },
    {
      question: 'In AWS CodePipeline, which action type runs automated tests?',
      options: ['Source', 'Build', 'Test', 'Deploy'],
      answer: 2,
    },
    {
      question: 'What file does AWS CodeDeploy use to define lifecycle hooks for EC2 deployments?',
      options: ['buildspec.yml', 'appspec.yml', 'template.yaml', 'deploy.json'],
      answer: 1,
    },
    {
      question: 'A developer needs to store the Docker image built by CodeBuild. Which AWS service should they use?',
      options: ['Amazon S3', 'Amazon ECR', 'AWS CodeArtifact', 'Amazon EFS'],
      answer: 1,
    },
    {
      question: 'Which ECS launch type is serverless and does not require managing EC2 instances?',
      options: ['EC2', 'Fargate', 'Lambda', 'Lightsail'],
      answer: 1,
    },
    {
      question: 'A developer wants to run a container that needs 8 GB of memory. Which ECS launch type supports this without managing servers?',
      options: ['EC2 only', 'Fargate', 'Lambda', 'Elastic Beanstalk'],
      answer: 1,
    },
    {
      question: 'Which Lambda environment variable is automatically set by the runtime and contains the function name?',
      options: ['AWS_LAMBDA_LOG_GROUP_NAME', 'AWS_LAMBDA_FUNCTION_NAME', 'LAMBDA_TASK_ROOT', 'AWS_EXECUTION_ENV'],
      answer: 1,
    },
    {
      question: 'How can a developer keep a Lambda function warm to reduce cold starts?',
      options: [
        'Increase the timeout to 15 minutes',
        'Use provisioned concurrency',
        'Use reserved concurrency set to 0',
        'Deploy the function inside a VPC',
      ],
      answer: 1,
    },
    {
      question: 'A Lambda function processes S3 events but sometimes receives duplicate events. How should the developer handle this?',
      options: [
        'Enable S3 versioning',
        'Design the function to be idempotent',
        'Use S3 Transfer Acceleration',
        'Enable S3 Object Lock',
      ],
      answer: 1,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// Part 2: Storage, Databases & API
// ═══════════════════════════════════════════════════════════════════════════
export const DVA_C02_PART2 = {
  name: 'DVA-C02 Part 2: Data & API',
  questions: [
    {
      question: 'A DynamoDB table has a partition key of userId and sort key of timestamp. Which query is valid?',
      options: [
        'Query by timestamp only',
        'Query by userId and a range of timestamps',
        'Query by sort key without the partition key',
        'Scan using only the sort key',
      ],
      answer: 1,
    },
    {
      question: 'What is the maximum size of a single DynamoDB item?',
      options: ['64 KB', '256 KB', '400 KB', '1 MB'],
      answer: 2,
    },
    {
      question: 'A developer needs to read 80 items per second, each 4 KB, with strong consistency. How many RCUs are needed?',
      options: ['40 RCU', '80 RCU', '160 RCU', '20 RCU'],
      answer: 1,
    },
    {
      question: 'Which DynamoDB feature automatically deletes expired items?',
      options: ['DynamoDB Streams', 'DynamoDB TTL', 'DynamoDB DAX', 'DynamoDB Global Tables'],
      answer: 1,
    },
    {
      question: 'When should you use a DynamoDB Global Secondary Index (GSI)?',
      options: [
        'To add strong consistency to queries',
        'To query on attributes that are not part of the primary key',
        'To reduce the table storage cost',
        'To enable point-in-time recovery',
      ],
      answer: 1,
    },
    {
      question: 'Which DynamoDB feature provides an in-memory caching layer for microsecond read latency?',
      options: ['ElastiCache', 'DAX', 'CloudFront', 'Global Tables'],
      answer: 1,
    },
    {
      question: 'A developer receives a ProvisionedThroughputExceededException. What should they do?',
      options: [
        'Increase the item size',
        'Use exponential backoff and retry logic',
        'Switch to a relational database',
        'Delete the table and recreate it',
      ],
      answer: 1,
    },
    {
      question: 'Which DynamoDB write operation replaces an entire item if the primary key exists?',
      options: ['UpdateItem', 'PutItem', 'BatchWriteItem', 'TransactWriteItems'],
      answer: 1,
    },
    {
      question: 'What is the purpose of DynamoDB Streams?',
      options: [
        'To replicate data across regions',
        'To capture time-ordered changes to items in a table',
        'To cache frequently accessed data',
        'To compress table data',
      ],
      answer: 1,
    },
    {
      question: 'An API Gateway REST API needs to transform the request body before passing it to Lambda. Which feature should be used?',
      options: ['Stage variables', 'Mapping templates', 'Usage plans', 'Resource policies'],
      answer: 1,
    },
    {
      question: 'Which API Gateway endpoint type is optimized for clients in the same AWS region?',
      options: ['Edge-optimized', 'Regional', 'Private', 'Global'],
      answer: 1,
    },
    {
      question: 'A developer needs to limit API Gateway requests to 100 per second per API key. Which feature should they use?',
      options: ['Resource policies', 'Usage plans with throttling', 'Lambda authorizers', 'WAF rules'],
      answer: 1,
    },
    {
      question: 'What does API Gateway caching reduce?',
      options: [
        'The cost of Lambda invocations only',
        'The number of calls to the backend and response latency',
        'The size of the API response body',
        'The number of API stages',
      ],
      answer: 1,
    },
    {
      question: 'Which S3 storage class is best for data accessed once or twice per quarter with millisecond retrieval?',
      options: [
        'S3 Standard',
        'S3 Standard-IA',
        'S3 Glacier Instant Retrieval',
        'S3 Glacier Deep Archive',
      ],
      answer: 2,
    },
    {
      question: 'A developer needs to ensure only valid JSON is uploaded to S3. Which approach is most efficient?',
      options: [
        'Use S3 bucket policies',
        'Use a Lambda function triggered by S3 events to validate and delete invalid files',
        'Enable S3 Object Lock',
        'Use S3 Transfer Acceleration',
      ],
      answer: 1,
    },
    {
      question: 'Which S3 feature allows generating temporary download URLs without changing bucket policies?',
      options: ['Bucket ACLs', 'Pre-signed URLs', 'S3 Access Points', 'Cross-origin resource sharing'],
      answer: 1,
    },
    {
      question: 'How can a developer enable cross-origin requests to an S3 bucket serving static assets?',
      options: [
        'Enable S3 versioning',
        'Configure CORS rules on the bucket',
        'Create an IAM policy',
        'Use S3 Glacier',
      ],
      answer: 1,
    },
    {
      question: 'Which SQS feature ensures a message is processed only once and in order?',
      options: ['Standard Queue', 'FIFO Queue', 'Dead-Letter Queue', 'Long Polling'],
      answer: 1,
    },
    {
      question: 'What is the default visibility timeout for an SQS message?',
      options: ['10 seconds', '30 seconds', '60 seconds', '5 minutes'],
      answer: 1,
    },
    {
      question: 'A developer wants to fan out messages to multiple SQS queues simultaneously. Which architecture should they use?',
      options: [
        'SQS to SQS direct connection',
        'SNS topic with SQS subscriptions',
        'EventBridge to SQS',
        'Kinesis Data Streams to SQS',
      ],
      answer: 1,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// Part 3: Security, Monitoring & Troubleshooting
// ═══════════════════════════════════════════════════════════════════════════
export const DVA_C02_PART3 = {
  name: 'DVA-C02 Part 3: Security',
  questions: [
    {
      question: 'A developer needs to securely store database credentials and rotate them automatically. Which service should they use?',
      options: [
        'AWS Systems Manager Parameter Store',
        'AWS Secrets Manager',
        'AWS KMS',
        'AWS IAM',
      ],
      answer: 1,
    },
    {
      question: 'Which KMS key type is managed entirely by AWS with no customer control over the key policy?',
      options: ['Customer managed key', 'AWS managed key', 'AWS owned key', 'Imported key'],
      answer: 2,
    },
    {
      question: 'A Lambda function needs to decrypt data encrypted with a KMS customer managed key. What must be configured?',
      options: [
        'The Lambda execution role must have kms:Decrypt permission and the KMS key policy must allow it',
        'The Lambda function must run in a VPC',
        'The KMS key must be in the same region as the S3 bucket',
        'KMS decryption is automatic and requires no permissions',
      ],
      answer: 0,
    },
    {
      question: 'What is the maximum size of a value stored in SSM Parameter Store Standard tier?',
      options: ['1 KB', '4 KB', '8 KB', '64 KB'],
      answer: 1,
    },
    {
      question: 'Which Cognito feature provides temporary AWS credentials to authenticated and unauthenticated users?',
      options: ['User Pools', 'Identity Pools (Federated Identities)', 'Cognito Sync', 'Cognito Lambda Triggers'],
      answer: 1,
    },
    {
      question: 'A web app uses Cognito User Pools. After authentication, which token should be sent to API Gateway for authorization?',
      options: ['Access token', 'Refresh token', 'ID token', 'Session token'],
      answer: 0,
    },
    {
      question: 'Which IAM policy element explicitly overrides any Allow statement?',
      options: ['Condition', 'Effect: Deny', 'Principal', 'Resource'],
      answer: 1,
    },
    {
      question: 'An application running on EC2 needs to call S3 and DynamoDB. What is the most secure way to grant access?',
      options: [
        'Store IAM access keys in environment variables',
        'Attach an IAM role to the EC2 instance',
        'Embed credentials in the application code',
        'Use root account credentials',
      ],
      answer: 1,
    },
    {
      question: 'Which STS API allows a user to assume a role and receive temporary security credentials?',
      options: ['GetSessionToken', 'AssumeRole', 'GetFederationToken', 'DecodeAuthorizationMessage'],
      answer: 1,
    },
    {
      question: 'A developer needs to encrypt an S3 object at upload time using a customer-provided key. Which header must be included?',
      options: [
        'x-amz-server-side-encryption: aws:kms',
        'x-amz-server-side-encryption-customer-algorithm',
        'x-amz-server-side-encryption: AES256',
        'x-amz-acl: private',
      ],
      answer: 1,
    },
    {
      question: 'Which CloudWatch feature allows you to define alarms based on a metric math expression?',
      options: ['CloudWatch Logs Insights', 'Composite Alarms', 'Metric Math', 'Anomaly Detection'],
      answer: 2,
    },
    {
      question: 'A developer needs to trace requests across multiple AWS services including Lambda, API Gateway, and DynamoDB. Which service should they use?',
      options: ['CloudWatch Logs', 'CloudTrail', 'AWS X-Ray', 'AWS Config'],
      answer: 2,
    },
    {
      question: 'In X-Ray, what is a segment?',
      options: [
        'A log entry for an error',
        'A representation of the work done by a single service for a request',
        'A CloudWatch metric',
        'A deployment artifact',
      ],
      answer: 1,
    },
    {
      question: 'Which X-Ray concept groups related segments from different services into a single end-to-end view?',
      options: ['Subsegment', 'Annotation', 'Trace', 'Sampling rule'],
      answer: 2,
    },
    {
      question: 'A Lambda function logs are not appearing in CloudWatch. What is the most likely cause?',
      options: [
        'CloudWatch Logs is not available in the region',
        'The Lambda execution role is missing logs:CreateLogGroup, logs:CreateLogStream, or logs:PutLogEvents permissions',
        'The function timeout is too short',
        'The function memory is too low',
      ],
      answer: 1,
    },
    {
      question: 'Which CloudWatch Logs feature lets you run SQL-like queries to analyze log data?',
      options: ['Metric Filters', 'Log Subscriptions', 'Logs Insights', 'Log Streams'],
      answer: 2,
    },
    {
      question: 'A developer needs to be notified when an API Gateway 5xx error rate exceeds 5%. What should they set up?',
      options: [
        'A CloudWatch Alarm on the 5XXError metric with a threshold',
        'An S3 event notification',
        'A DynamoDB Stream',
        'An SNS topic with no alarm',
      ],
      answer: 0,
    },
    {
      question: 'Which service records all API calls made in an AWS account for compliance auditing?',
      options: ['CloudWatch', 'AWS CloudTrail', 'AWS Config', 'AWS X-Ray'],
      answer: 1,
    },
    {
      question: 'A developer deployed a Lambda function but it returns an AccessDeniedException when writing to DynamoDB. What should they check first?',
      options: [
        'The Lambda function timeout',
        'The IAM execution role policies attached to the Lambda function',
        'The DynamoDB table provisioned capacity',
        'The Lambda function memory setting',
      ],
      answer: 1,
    },
    {
      question: 'Which Elastic Beanstalk feature stores environment configuration for reuse across environments?',
      options: ['Environment manifest', 'Saved configurations', 'Platform hooks', 'Custom AMI'],
      answer: 1,
    },
  ],
};

export const SAMPLE_DECKS = [DVA_C02_PART1, DVA_C02_PART2, DVA_C02_PART3];

// ─── Format instructions shown in the import UI ─────────────────────────────
export const FORMAT_INSTRUCTIONS = `
Supported formats: JSON, CSV, or plain text.

━━━ JSON Format ━━━
{
  "name": "My Quiz Deck",
  "questions": [
    {
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0
    }
  ]
}
Note: "answer" is 0-based (0=A, 1=B, 2=C, 3=D).

━━━ CSV Format ━━━
question,optionA,optionB,optionC,optionD,answer
"What is 2+2?","1","2","3","4",D
"Capital of France?","Berlin","Paris","Madrid","Rome",B

First row must be the header. Answer column uses A/B/C/D.

━━━ Text Format ━━━
Q: What is 2+2?
A) 1
B) 2
C) 3
D) 4
Answer: D

Q: Capital of France?
A) Berlin
B) Paris
C) Madrid
D) Rome
Answer: B

Separate questions with a blank line.
`.trim();
