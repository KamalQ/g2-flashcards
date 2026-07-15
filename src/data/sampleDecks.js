// ─── Sample Quiz Decks ──────────────────────────────────────────────────────
// Each deck: { name, questions: [{ question, options: [A,B,C,D], answer: 0-3 }] }

export const AWS_CLOUD_PRACTITIONER = {
  name: 'AWS Cloud Practitioner',
  questions: [
    {
      question: 'Which AWS service provides serverless compute for running code without provisioning servers?',
      options: ['Amazon EC2', 'AWS Lambda', 'Amazon ECS', 'AWS Elastic Beanstalk'],
      answer: 1,
    },
    {
      question: 'What does Amazon S3 stand for?',
      options: ['Simple Server Service', 'Simple Storage Service', 'Secure Storage System', 'Server Storage Service'],
      answer: 1,
    },
    {
      question: 'Which AWS service is a managed relational database?',
      options: ['Amazon DynamoDB', 'Amazon ElastiCache', 'Amazon RDS', 'Amazon Redshift'],
      answer: 2,
    },
    {
      question: 'What is the AWS shared responsibility model?',
      options: [
        'AWS manages everything',
        'Customer manages everything',
        'AWS manages infrastructure; customer manages data and config',
        'Responsibilities are shared equally 50/50',
      ],
      answer: 2,
    },
    {
      question: 'Which service provides a Content Delivery Network (CDN)?',
      options: ['Amazon Route 53', 'Amazon CloudFront', 'AWS Direct Connect', 'Amazon VPC'],
      answer: 1,
    },
    {
      question: 'Which AWS service is used for DNS management?',
      options: ['Amazon CloudFront', 'Amazon Route 53', 'AWS WAF', 'Amazon API Gateway'],
      answer: 1,
    },
    {
      question: 'What is an Availability Zone in AWS?',
      options: [
        'A pricing tier for services',
        'A group of AWS Regions',
        'One or more data centers with redundant power and networking',
        'A virtual private network',
      ],
      answer: 2,
    },
    {
      question: 'Which service monitors AWS resources and applications in real time?',
      options: ['AWS CloudTrail', 'Amazon CloudWatch', 'AWS Config', 'AWS Inspector'],
      answer: 1,
    },
    {
      question: 'What does IAM stand for in AWS?',
      options: [
        'Internet Access Management',
        'Identity and Access Management',
        'Integrated Application Manager',
        'Infrastructure as Management',
      ],
      answer: 1,
    },
    {
      question: 'Which AWS pricing model lets you pay only for what you use with no upfront cost?',
      options: ['Reserved Instances', 'On-Demand', 'Spot Instances', 'Dedicated Hosts'],
      answer: 1,
    },
    {
      question: 'Which service provides a fully managed NoSQL database?',
      options: ['Amazon RDS', 'Amazon Aurora', 'Amazon DynamoDB', 'Amazon Neptune'],
      answer: 2,
    },
    {
      question: 'What AWS service helps estimate the cost of running workloads?',
      options: ['AWS Budgets', 'AWS Cost Explorer', 'AWS Pricing Calculator', 'AWS Trusted Advisor'],
      answer: 2,
    },
    {
      question: 'Which pillar is NOT part of the AWS Well-Architected Framework?',
      options: ['Security', 'Performance Efficiency', 'Cost Optimization', 'Market Expansion'],
      answer: 3,
    },
    {
      question: 'What is the maximum duration for an AWS Lambda function execution?',
      options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'],
      answer: 2,
    },
    {
      question: 'Which AWS service provides managed Kubernetes?',
      options: ['Amazon ECS', 'Amazon EKS', 'AWS Fargate', 'AWS App Runner'],
      answer: 1,
    },
    {
      question: 'Which storage class is the cheapest for infrequently accessed data in S3?',
      options: ['S3 Standard', 'S3 Intelligent-Tiering', 'S3 Glacier Deep Archive', 'S3 One Zone-IA'],
      answer: 2,
    },
    {
      question: 'Which AWS service records API calls for auditing?',
      options: ['Amazon CloudWatch', 'AWS CloudTrail', 'AWS Config', 'Amazon GuardDuty'],
      answer: 1,
    },
    {
      question: 'What is Amazon VPC used for?',
      options: [
        'Virtual payment processing',
        'Virtual private cloud networking',
        'Video processing and compression',
        'Version and package control',
      ],
      answer: 1,
    },
    {
      question: 'Which service provides DDoS protection for AWS resources?',
      options: ['AWS WAF', 'AWS Shield', 'Amazon GuardDuty', 'AWS Firewall Manager'],
      answer: 1,
    },
    {
      question: 'What is the AWS Free Tier?',
      options: [
        'A paid support plan',
        'A limited set of services available at no charge',
        'A discount program for students',
        'An enterprise licensing agreement',
      ],
      answer: 1,
    },
  ],
};

export const SAMPLE_DECKS = [AWS_CLOUD_PRACTITIONER];

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
