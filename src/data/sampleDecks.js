// ─── Sample Quiz Decks ──────────────────────────────────────────────────────
// AWS Certified Developer Associate (DVA-C02) — 311 real exam-style questions, sourced verbatim
// from a community practice-question set, split into 16 decks of ~19-20 questions each.
// Each deck: { name, questions: [{ question, options: [A,B,C,D], answer: 0-3 }] }

// ═════════════════════════════════════════════════════════════════════════════
// Set 1 (20 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET1 = {
  name: 'AWS DVA-C02 — Set 1',
  questions: [
    {
      question: 'A developer wants to send multi-value headers to an AWS Lambda function that is registered as a target with an Application Load Balancer (ALB). What should the developer do to achieve this?',
      options: ['Place the Lambda function and target group in the same account.', 'Send the request body to the Lambda function with a size less than 1 MB 0.', 'Include the Base64 encoding status status code, status description, and headers in the Lambda function.', 'Enable the multi-value headers on the ALB.'],
      answer: 3,
    },
    {
      question: 'A company\'s ecommerce website is experiencing massive traffic spikes, which are causing performance problems in the company database. Users are reporting that accessing the website takes a long time. A developer wants to implement a caching layer using Amazon ElastiCache. The website is required to be responsive no matter which product a user views, and the updates to product information and prices must be strongly consistent. Which cache writing policy will satisfy these requirements?',
      options: ['Write to the cache directly and sync the backend at a later time.', 'Write to the backend first and wait for the cache to expire.', 'Write to the cache and the backend at the same time.', 'Write to the backend first and invalidate the cache.'],
      answer: 3,
    },
    {
      question: 'A Developer wants to encrypt new objects that are being uploaded to an Amazon S3 bucket by an application. There must be an audit trail of who has used the key during this process. There should be no change to the performance of the application. Which type of encryption meets these requirements?',
      options: ['Server-side encryption using S3-managed keys.', 'Server-side encryption with AWS KMS-managed keys.', 'Client-side encryption with a client-side symmetric master key.', 'Client-side encryption with AWS KMS-managed keys.'],
      answer: 1,
    },
    {
      question: 'An application is being developed to audit several AWS accounts. The application will run in Account A and must access AWS services in Accounts B and C. What is the MOST secure way to allow the application to call AWS services in each audited account?',
      options: ['Configure cross-account roles in each audited account. Write code in Account A that assumes those roles.', 'Use S3 cross-region replication to communicate among accounts, with Amazon S3 event notifications to trigger Lambda functions.', 'Deploy an application in each audited account with its own role. Have Account A authenticate with the application.', 'Create an IAM user with an access key in each audited account. Write code in Account A that uses those access keys.'],
      answer: 0,
    },
    {
      question: 'A company uses a third-party tool to build, bundle, and package rts applications on-premises and store them locally. The company uses Amazon EC2 instances to run its front-end applications. How can an application be deployed from the source control system onto the EC2 instances?',
      options: ['Use AWS CodeDeploy and point it to the local storage to directly deploy a bundle m a zip. tar. or tar.gz format.', 'Upload the bundle to an Amazon S3 bucket and specify the S3 location when doing a deployment using AWS CodeDeploy.', 'Create a repository using AWS CodeCommit to automatically trigger a deployment to the EC2 instances.', 'Use AWS CodeBuild to automatically deploy the latest build to the latest EC2 instances.'],
      answer: 1,
    },
    {
      question: 'A company is building a compute-intensive application that will run on a fleet of Amazon EC2 instances. The application uses attached Amazon EBS disks for storing data. The application will process sensitive information and all the data must be encrypted. What should a developer do to ensure the data is encrypted on disk without impacting performance?',
      options: ['Configure the Amazon EC2 instance fleet to use encrypted EBS volumes for storing data.', 'Add logic to write all data to an encrypted Amazon S3 bucket.', 'Add a custom encryption algorithm to the application that will encrypt and decrypt all data.', 'Create a new Amazon Machine Image (AMI) with an encrypted root volume and store the data to ephemeral disks.'],
      answer: 0,
    },
    {
      question: 'A global company has an application running on Amazon EC2 instances that serves image files from Amazon S3. User requests from the browser are causing high traffic, which results in degraded performance. Which optimization solution should a Developer implement to increase application performance?',
      options: ['Create multiple prefix in the S3 bucket to increase the request rate.', 'Create an Amazon ElastiCache cluster to cache and serve frequently accessed items.', 'Use Amazon CloudFront to serve the content of images stored in Amazon S3.', 'Submit a ticket to AWS support to request a rate limit increase for the S3 bucket.'],
      answer: 2,
    },
    {
      question: 'An AWS Lambda function generates a 3MB JSON file and then uploads it to an Amazon S3 bucket daily. The file contains sensitive information, so the Developer must ensure that it is encrypted before uploading to the bucket. Which of the following modifications should the Developer make to ensure that the data is encrypted before uploading it to the bucket?',
      options: ['Use the default AWS KMS customer master key for S3 in the Lambda function code.', 'Use the S3 managed key and call the GenerateDataKey API to encrypt the file.', 'Use the GenerateDataKey API, then use that data key to encrypt the file in the Lambda function code.', 'Use a custom KMS customer master key created for S3 in the Lambda function code.'],
      answer: 2,
    },
    {
      question: 'Company D is running their corporate website on Amazon S3 accessed from http://www.companyd.com. Their marketing team has published new web fonts to a separate S3 bucket accessed by the S3 endpoint https://s3-us-west-1.amazonaws.com/cdfonts. While testing the new web fonts, Company D recognized the web fonts are being blocked by the browser. What should Company D do to prevent the web fonts from being blocked by the browser?',
      options: ['Enable versioning on the cdfonts bucket for each web font.', 'Create a policy on the cdfonts bucket to enable access to everyone.', 'Add the Content-MD5 header to the request for webfonts in the cdfonts bucket from the website.', 'Configure the cdfonts bucket to allow cross-origin requests by creating a CORS configuration.'],
      answer: 3,
    },
    {
      question: 'An application deployed on AWS Elastic Beanstalk experiences increased error rates during deployments of new application versions, resulting in service degradation for users. The Development team believes that this is because of the reduction in capacity during the deployment steps. The team would like to change the deployment policy configuration of the environment to an option that maintains full capacity during deployment while using the existing instances. Which deployment policy will meet these requirements while using the existing instances?',
      options: ['All at once.', 'Rolling.', 'Rolling with additional batch.', 'Immutable.'],
      answer: 2,
    },
    {
      question: 'A Developer is creating an application that needs to locate the public IPv4 address of the Amazon EC2 instance on which it runs. How can the application locate this information?',
      options: ['Get the instance metadata by retrieving http://169.254.169.254/latest/metadata/.', 'Get the instance user data by retrieving http://169.254.169.254/latest/userdata/.', 'Get the application to run IFCONFIG to get the public IP address.', 'Get the application to run IPCONFIG to get the public IP address.'],
      answer: 0,
    },
    {
      question: 'The development team is working on an API that will be served from Amazon API gateway. The API will be served from three environments: development, test, and production. The API Gateway is configured to use 237 GB of cache in all three stages. Which is the MOST cost-efficient deployment strategy?',
      options: ['Create a single API Gateway with all three stages.', 'Create three API Gateways, one for each stage in a single AWS account.', 'Create an API Gateway in three separate AWS accounts.', 'Enable the cache for development and test environments only when needed.'],
      answer: 3,
    },
    {
      question: 'A company is migrating its on-premises database to Amazon RDS for MySQL. The company has read-heavy workloads, and wants to make sure it re-factors its code to achieve optimum read performance for its queries. How can this objective be met?',
      options: ['Add database retries to effectively use RDS with vertical scaling.', 'Use RDS with multi-AZ deployment.', 'Add a connection string to use an RDS read replica for read queries.', 'Add a connection string to use a read replica on an EC2 instance.'],
      answer: 2,
    },
    {
      question: 'A developer needs to modify an application architecture to meet new functional requirements. Application data is stored in Amazon DynamoDB and processed for analysis in a nightly batch. The system analysts do not want to wait unit the next day to view the processed data and have asked to have it available in near-real time. Which application architect pattern would enables the data to be processed as it is received?',
      options: ['Event driven.', 'Client served driven.', 'Fan-out driven.', 'Schedule driven.'],
      answer: 0,
    },
    {
      question: 'A software company needs to make sure user-uploaded documents are securely stored in Amazon S3. The documents must be encrypted at rest in Amazon S3. The company does not want to manage the security infrastructure in-house, but the company still needs extra protection to ensure it has control over its encryption keys due to industry regulations. Which encryption strategy should a developer use to meet these requirements?',
      options: ['Server-side encryption with Amazon S3 managed keys (SSE-S3).', 'Server-side encryption with customer-provided encryption keys (SSE-C).', 'Server-side encryption with AWS KMS managed keys (SSE-KMS).', 'Client-side encryption.'],
      answer: 2,
    },
    {
      question: 'An application uses Amazon Kinesis Data Streams to ingest and process large streams of data records in real time. Amazon EC2 instances consume and process the data from the shards of the Kinesis data stream by using Amazon Kinesis Client Library (KCL). The application handles the failure scenarios and does not require standby workers. The application reports that a specific shard is receiving more data than expected. To adapt to the changes in the rate of data flow, the hot shard is resharded. Assuming that the initial number of shards in the Kinesis data stream is 4, and after resharding the number of shards increased to 6, what is the maximum number of EC2 instances that can be deployed to process data from all the shards?',
      options: ['12.', '6.', '4.', '1.'],
      answer: 1,
    },
    {
      question: 'A gaming company is developing a mobile game application for iOS® and Android® platforms. This mobile game securely stores user data locally on the device. The company wants to allow users to use multiple device for the game, which requires user data synchronization across device.Which service should be used to synchronize user data across devices without the need to create a backend application?',
      options: ['AWS Lambda.', 'Amazon S3.', 'Amazon DynamoDB.', 'Amazon Cognito.'],
      answer: 3,
    },
    {
      question: 'A company is running an application built on AWS Lambda functions. One Lambda function has performance issues when it has to download a 50MB file from the Internet in every execution. This function is called multiple times a second. What solution would give the BEST performance increase?',
      options: ['Cache the file in the /tmp directory.', 'Increase the Lambda maximum execution time.', 'Put an Elastic Load Balancer in front of the Lambda function.', 'Cache the file in Amazon S3.'],
      answer: 0,
    },
    {
      question: 'Queries to an Amazon DynamoDB table are consuming a large amount of read capacity. The table has a significant number of large attributes. The application does not need all of the attribute data. How can DynamoDB costs be minimized while maximizing application performance?',
      options: ['Batch all the writes, and perform the write operations when no or few reads are being performed.', 'Create a global secondary index with a minimum set of projected attributes.', 'Implement exponential backoffs in the application.', 'Load balance the reads to the table using an Application Load Balancer.'],
      answer: 1,
    },
    {
      question: 'A Developer is writing a REST service that will add items to a shopping list. The service is built on Amazon API Gateway with AWS Lambda integrations. The shopping list items are send as query string parameters in the method request. How should the Developer convert the query string parameters to arguments for the Lambda function?',
      options: ['Enable request validation.', 'Include the Amazon Resource Name (ARN) of the Lambda function.', 'Change the integration type.', 'Create a mapping template.'],
      answer: 3,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 2 (20 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET2 = {
  name: 'AWS DVA-C02 — Set 2',
  questions: [
    {
      question: 'A development team is creating a new application designed to run on AWS. While the test and production environments will run on Amazon EC2 instances, developers will each run their own environment on their laptops. Which of the following is the simplest and MOST secure way to access AWS services from the local development machines?',
      options: ['Use an IAM role to assume a role and execute API calls using the role.', 'Create an IAM user to be shared with the entire development team, provide the development team with the access key.', 'Create an IAM user for each developer on the team: provide each developer with a unique access key.', 'Set up a federation through an Amazon Cognito user pool.'],
      answer: 2,
    },
    {
      question: 'How is provisioned throughput affected by the chosen consistency model when reading data from a DynamoDB table?',
      options: ['Strongly consistent reads use the same amount of throughput as eventually consistent reads.', 'Strongly consistent reads use more throughput than eventually consistent reads.', 'Strongly consistent reads use less throughput than eventually consistent reads.', 'Strongly consistent reads use variable throughput depending on read activity.'],
      answer: 1,
    },
    {
      question: 'A developer needs to deploy a new version to an AWS Elastic Beanstalk application. How can the developer accomplish this task?',
      options: ['Upload and deploy the new application version in the Elastic Beanstalk console.', 'Use the eb init CLI command to deploy a new version.', 'Terminate the current Elastic Beanstalk environment and create a new one.', 'Modify the ebextensions folder to add a source option to services.'],
      answer: 0,
    },
    {
      question: 'A developer wants the ability to roll back to a previous version of an AWS Lambda function in the event of errors caused by a new deployment. How can the developer achieve this with MINIMAL impact on users?',
      options: ['Change the application to use an alias that points to the current version. Deploy the new version of the code. Update the alias to use the newly deployed version. If too many errors are encountered, point the alias back to the previous version.', 'Change the application to use an alias that points to the current version. Deploy the new version of the code. Update the alias to direct 10% of users to the newly deployed version. If too many errors are encountered, send 100% of traffic to the previous version.', 'Do not make any changes to the application Deploy the new version of the code. If too many errors are encountered, point the application back to the previous version using the version number in the Amazon Resource Name (ARN).', 'Create three aliases: new, existing, and router. Point the existing alias to the current version. Have the router alias direct 100% of users to the existing alias. Update the application to use the router alias. Deploy the new version of the code. Point the new alias to this version. Update the router alias to direct 10% of users to the new alias. If too many errors are encountered, send 100% of traffic to the existing alias.'],
      answer: 1,
    },
    {
      question: 'An application contains two components: one component to handle HTTP requests, and another component to handle background processing tasks. Each component must scale independently. The developer wants to deploy this application using AWS Elastic Beanstalk. How should this application be deployed, based on these requirements?',
      options: ['Deploy the application in a single Elastic Beanstalk environment.', 'Deploy each component in a separate Elastic Beanstalk environment.', 'Use multiple Elastic Beanstalk environments for the HTTP component but one environment for the background task component.', 'Use multiple Elastic Beanstalk environments for the background task component but one environment for the HTTP component.'],
      answer: 1,
    },
    {
      question: 'A company is using AWS CloudFormation templates to deploy AWS resources. The company needs to update one of its AWS CloudFormation stacks. What can the company do to find out how the changes will impact the resources that are running?',
      options: ['Investigate the change sets.', 'Investigate the stack policies.', 'Investigate the Metadata section.', 'Investigate the Resources section.'],
      answer: 0,
    },
    {
      question: 'A developer is creating a serverless web application and maintains different branches of code. The developer wants to avoid updating the Amazon API Gateway target endpoint each time a new code push is performed. What solution would allow the developer to perform a code push efficiently, without the need to update the API Gateway?',
      options: ['Associate different AWS Lambda functions to an API Gateway target endpoint.', 'Create different stages in API Gateway, then associate API Gateway with AWS Lambda.', 'Create aliases and versions in AWS Lambda.', 'Tag the AWS Lambda functions with different names.'],
      answer: 2,
    },
    {
      question: 'An application running on EC2 instances is storing data in an S3 bucket. Security policy mandates that all data must be encrypted in transit. How can the Developer ensure that all traffic to the S3 bucket is encrypted?',
      options: ['Install certificates on the EC2 instances.', 'Create a bucket policy that allows traffic where SecureTransport is true.', 'Create an HTTPS redirect on the EC2 instances.', 'Create a bucket policy that denies traffic where SecureTransport is false.'],
      answer: 3,
    },
    {
      question: 'A developer Is designing an AWS Lambda function that create temporary files that are less than 10 MB during execution. The temporary files will be accessed and modified multiple times during execution. The developer has no need to save or retrieve these files in the future. Where should the temporary file be stored?',
      options: ['the /tmp directory.', 'Amazon EFS.', 'Amazon EBS.', 'Amazon S3.'],
      answer: 0,
    },
    {
      question: 'A website\'s page load times are gradually increasing as more users access the system at the same time. Analysis indicates that a user profile is being loaded from a database in all the web pages being visited by each user and this is increasing the database load and the page load latency. To address this issue the Developer decides to cache the user profile data. Which caching strategy will address this situation MOST efficiently?',
      options: ['Create a new Amazon EC2 Instance and run a NoSQL database on it. Cache the profile data within this database using the write-through caching strategy.', 'Create an Amazon ElastiCache cluster to cache the user profile data. Use a cache-aside caching strategy.', 'Use a dedicated Amazon RDS instance for caching profile data. Use a write-through caching strategy.', 'Create an ElastiCache cluster to cache the user profile data. Use a write-through caching strategy.'],
      answer: 1,
    },
    {
      question: 'An advertising company has a dynamic website with heavy traffic. The company wants to migrate the website infrastructure to AWS to handle everything except website development. Which solution BEST meets these requirements?',
      options: ['Use AWS VM Import to migrate a web server image to AWS Launch the image on a compute-optimized Amazon EC2 instance.', 'Launch multiple Amazon Lightsail instance behind a load balancer. Set up the website on those instances.', 'Deploy the website code in an AWS Elastic Beanstalk environment. Use Auto Scaling to scale the numbers of instance.', 'Use Amazon S3 to host the website. Use Amazon CloudFornt to deliver the content at scale.'],
      answer: 2,
    },
    {
      question: 'A developer is writing an AWS Lambda function. The developer wants to log key events that occur during the Lambda function and include a unique identifier to associate the events with a specific function invocation. Which of the following will help the developer accomplish this objective?',
      options: ['Obtain the request identifier from the Lambda context object. Architect the application to write logs to the console.', 'Obtain the request identifier from the Lambda event object. Architect the application to write logs to a file.', 'Obtain the request identifier from the Lambda event object. Architect the application to write logs to the console.', 'Obtain the request identifier from the Lambda context object. Architect the application to write logs to a file.'],
      answer: 0,
    },
    {
      question: 'An AWS Lambda function accesses two Amazon DynamoDB tables. A developer wants to improve the performance of the Lambda function by identifying bottlenecks in the function. How can the developer inspect the timing of the DynamoDB API calls?',
      options: ['Add DynamoDB as an event source to the Lambda function. View the performance with Amazon CloudWatch metrics.', 'Place an Application Load Balancer (ALB) in front of the two DynamoDB tables. Inspect the ALB logs.', 'Limit Lambda to no more than five concurrent invocations Monitor from the Lambda console.', 'Enable AWS X-Ray tracing for the function. View the traces from the X-Ray service.'],
      answer: 3,
    },
    {
      question: 'An Amazon RDS database instance is used by many applications to look up historical data. The query rate is relatively constant. When the historical data is updated each day, the resulting write traffic slows the read query performance and affects all application users. What can be done to eliminate the performance impact on application users?',
      options: ['Make sure Amazon RDS is Multi-AZ so it can better absorb increased traffic.', 'Create an RDS Read Replica and direct all read traffic to the replica.', 'Implement Amazon ElastiCache in front of Amazon RDS to buffer the write traffic.', 'Use Amazon DynamoDB instead of Amazon RDS to buffer the read traffic.'],
      answer: 1,
    },
    {
      question: 'A company is developing a serverless ecommerce web application. The application needs to make coordinated, all-or-nothing changes to multiple items in the company\'s inventory table in Amazon DynamoDB. Which solution will meet these requirements?',
      options: ['Enable transactions for the DynamoDB table. Use the BatchWriteItem operation to update the items.', 'Use the TransactWriteitems operation to group the changes. Update the items in the table.', 'Set up a FIFO queue using Amazon SQS. Group the changes in the queue. Update the table based on the grouped changes.', 'Create a transaction table in an Amazon Aurora DB cluster to manage the transactions. Write a backend process to sync the Aurora DB table and the DynamoDB table.'],
      answer: 1,
    },
    {
      question: 'An application is running on an EC2 instance. The Developer wants to store an application metric in Amazon CloudWatch. What is the best practice for implementing this requirement?',
      options: ['Use the PUT Object API call to send data to an S3 bucket. Use an event notification to invoke a Lambda function to publish data to CloudWatch.', 'Publish the metric data to an Amazon Kinesis Stream using a PutRecord API call. Subscribe a Lambda function that publishes data to CloudWatch.', 'Use the CloudWatch PutMetricData API call to submit a custom metric to CloudWatch. Provide the required credentials to enable the API call.', 'Use the CloudWatch PutMetricData API call to submit a custom metric to CloudWatch. Launch the EC2 instance with the required IAM role to enable the API call.'],
      answer: 3,
    },
    {
      question: 'A Developer needs to design an application running on AWS that will be used to consume Amazon SQS messages that range from 1 KB up to 1GB in size. How should the Amazon SQS messages be managed?',
      options: ['Use Amazon S3 and the Amazon SQS CLI.', 'Use Amazon S3 and the Amazon SQS Extended Client Library for Java.', 'Use Amazon EBS and the Amazon SQS CLI.', 'Use Amazon EFS and the Amazon SQS CLI.'],
      answer: 1,
    },
    {
      question: 'A developer has written a multi-threaded application that is running on a fleet of Amazon EC2 instances. The operations team has requested a graphical method to monitor the number of running threads over time. What is the MOST efficient way to fulfill this request?',
      options: ['Periodically send the thread count to AWS X-Ray segments, then generate a service graph on demand.', 'Create a custom Amazon CloudWatch metric and periodically perform a PutMetricData call with the current thread count.', 'Periodically log thread count data to Amazon S3. Use Amazon Kinesis to process the data into a graph.', 'Periodically write the current thread count to a table using Amazon DynarnoDB and use Amazon CloudFront to create a graph.'],
      answer: 1,
    },
    {
      question: 'An application on AWS is using third-party APIs. The Developer needs to monitor API errors in the code, and wants to receive notifications if failures go above a set threshold value. How can the Developer achieve these requirements?',
      options: ['Publish a custom metric on Amazon CloudWatch and use Amazon Simple Email Service (SES) for notification.', 'Use an Amazon CloudWatch API-error metric and use Amazon Simple Notification Service (SNS) for notification.', 'Use an Amazon CloudWatch API-error metric and use Amazon SES for notification.', 'Publish a custom metric on Amazon CloudWatch and use Amazon SNS for notification.'],
      answer: 3,
    },
    {
      question: 'The release process workflow of an application requires a manual approval before the code is deployed into the production environment. What is the BEST way to achieve this using AWS CodePipeline?',
      options: ['Use multiple pipelines to allow approval.', 'Use an approval action in a stage.', 'Disable the stage transition to allow manual approval.', 'Disable a stage just prior the deployment stage.'],
      answer: 1,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 3 (20 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET3 = {
  name: 'AWS DVA-C02 — Set 3',
  questions: [
    {
      question: 'A Developer is asked to implement a caching layer in front of Amazon RDS. Cached content is expensive to regenerate in case of service failure. Which implementation below would work while maintaining maximum uptime?',
      options: ['Implement Amazon ElastiCache Redis in Cluster Mode.', 'Install Redis on an Amazon EC2 instance.', 'Implement Amazon ElastiCache Memcached.', 'Migrate the database to Amazon Redshift.'],
      answer: 0,
    },
    {
      question: 'A company has written a Java AWS Lambda function to be triggered whenever a user uploads an image to an Amazon S3 bucket. The function converts the original image to several different formats and then copies the resulting images to another Amazon S3 bucket. The Developers find that no images are being copied to the second Amazon S3 bucket. They have tested the code on an Amazon EC2 instance with 1GB of RAM, and it takes an average of 500 seconds to complete. What is the MOST likely cause of the problem?',
      options: ['The Lambda function has insufficient memory and needs to be increased to 1 GB to match the Amazon EC2 instance.', 'Files need to be copied to the same Amazon S3 bucket for processing, so the second bucket needs to be deleted.', 'Lambda functions have a maximum execution limit of 15 minutes, therefore the function is not completing.', 'There is a problem with the Java runtime for Lambda, and the function needs to be converted to node.js.'],
      answer: 0,
    },
    {
      question: 'A web application is using Amazon Kinesis Streams for clickstream data that may not be consumed for up to 12 hours. How can the Developer implement encryption at rest for data within the Kinesis Streams?',
      options: ['Enable SSL connections to Kinesis.', 'Use Amazon Kinesis Consumer Library.', 'Encrypt the data once it is at rest with a Lambda function.', 'Enable server-side encryption in Kinesis Streams.'],
      answer: 3,
    },
    {
      question: 'A Developer is creating a mobile application with a limited budget. The solution requires a scalable service that will enable customers to sign up and authenticate into the mobile application while using the organization\'s current SAML 2.0 identity provider. Which AWS service should be used to meet these requirements?',
      options: ['AWS Lambda.', 'Amazon Cognito.', 'AWS IAM.', 'Amazon EC2.'],
      answer: 1,
    },
    {
      question: 'A company wants to migrate its web application to AWS and leverage Auto Scaling to handle peak workloads. The Solutions Architect determined that the best metric for an Auto Scaling event is the number of concurrent users. Based on this information, what should the Developer use to autoscale based on concurrent users?',
      options: ['An Amazon SNS topic to be triggered when a concurrent user threshold is met.', 'An Amazon Cloudwatch NetworkIn metric.', 'Amazon CloudFront to leverage AWS Edge Locations.', 'A Custom Amazon CloudWatch metric for concurrent users.'],
      answer: 3,
    },
    {
      question: 'A Developer has written a serverless application using multiple AWS services. The business logic is written as a Lambda function which has dependencies on third-party libraries. The Lambda function endpoints will be exposed using Amazon API Gateway. The Lambda function will write the information to Amazon DynamoDB. The Developer is ready to deploy the application but must have the ability to rollback. How can this deployment be automated, based on these requirements?',
      options: ['Deploy using Amazon Lambda API operations to create the Lambda function by providing a deployment package.', 'Use an AWS CloudFormation template and use CloudFormation syntax to define the Lambda function resource in the template.', 'Use syntax conforming to the Serverless Application Model in the AWS CloudFormation template to define the Lambda function resource.', 'Create a bash script which uses AWS CLI to package and deploy the application.'],
      answer: 2,
    },
    {
      question: 'A game stores user game data in an Amazon DynamoDB table. Individual users should not have access to other users\' game data. How can this be accomplished?',
      options: ['Encrypt the game data with individual user keys.', 'Restrict access to specific items based on certain primary key values.', 'Stage data in SQS queues to inject metadata before accessing DynamoDB.', 'Read records from DynamoDB and discard irrelevant data client-side.'],
      answer: 1,
    },
    {
      question: 'A Developer is creating a web application that requires authentication, but also needs to support guest access to provide users limited access without having to authenticate. What service can provide support for the application to allow guest access?',
      options: ['IAM temporary credentials using AWS STS.', 'Amazon Directory Service.', 'Amazon Cognito with unauthenticated access enabled.', 'IAM with SAML integration'],
      answer: 2,
    },
    {
      question: 'A Developer has created a large Lambda function, and deployment is failing with the following error: ClientError: An error occurred (InvalidParameterValueException) when calling the CreateFunction operation: Unzipped size must be smaller than XXXXXXXXX bytes., where XXXXXXXXX is the current Lambda limit. What can the Developer do to fix this problem?',
      options: ['Submit a limit increase request to AWS Support to increase the function to the size needed.', 'Use a compression algorithm that is more efficient than ZIP.', 'Break the function into multiple smaller Lambda functions.', 'ZIP the ZIP file twice to compress it further.'],
      answer: 2,
    },
    {
      question: 'A serverless application uses an API Gateway and AWS Lambda. Where should the Lambda function store its session information across function calls?',
      options: ['In an Amazon DynamoDB table.', 'In an Amazon SQS queue.', 'In the local filesystem.', 'In an SQLite session table using CDSQLITE_ENABLE_SESSION.'],
      answer: 0,
    },
    {
      question: 'An application reads data from an Amazon DynamoDB table. Several times a day, for a period of 15 seconds, the application receives multiple ProvisionedThroughputExceeded errors. How should this exception be handled?',
      options: ['Create a new global secondary index for the table to help with the additional requests.', 'Retry the failed read requests with exponential backoff.', 'Immediately retry the failed read requests.', 'Use the DynamoDB UpdateItem API to increase the provisioned throughput capacity of the table.'],
      answer: 1,
    },
    {
      question: 'A Developer is writing a Linux-based application to run on AWS Elastic Beanstalk. Application requirements state that the application must maintain full capacity during updates while minimizing cost. Which type of Elastic Beanstalk deployment policy should the Developer specify for the environment?',
      options: ['Immutable.', 'Rolling.', 'All at Once.', 'Rolling with additional batch.'],
      answer: 3,
    },
    {
      question: 'When writing a Lambda function, what is the benefit of instantiating AWS clients outside the scope of the handler?',
      options: ['Legibility and stylistic convention.', 'Taking advantage of connection re-use.', 'Better error handling.', 'Creating a new instance per invocation.'],
      answer: 1,
    },
    {
      question: 'A current architecture uses many Lambda functions invoking one another as large state machine. The coordination of this state machine is legacy custom code that breaks easily. Which AWS Service can help refactor and manage the state machine?',
      options: ['AWS Data Pipeline.', 'AWS SNS with AWS SQS.', 'Amazon Elastic MapReduce.', 'AWS Step Functions.'],
      answer: 3,
    },
    {
      question: 'A company is developing a new online game that will run on top of Amazon ECS. Four distinct Amazon ECS services will be part of the architecture, each requiring specific permissions to various AWS services. The company wants to optimize the use of the underlying Amazon EC2 instances by bin packing the containers based on memory reservation. Which configuration would allow the Development team to meet these requirements MOST securely?',
      options: ['Create a new Identity and Access Management (IAM) instance profile containing the required permissions for the various ECS services, then associate that instance role with the underlying EC2 instances.', 'Create four distinct IAM roles, each containing the required permissions for the associated ECS service, then configure each ECS service to reference the associated IAM role.', 'Create four distinct IAM roles, each containing the required permissions for the associated ECS service, then, create an IAM group and configure the ECS cluster to reference that group.', 'Create four distinct IAM roles, each containing the required permissions for the associated ECS service, then configure each ECS task definition to referenсe the associated IAM role.'],
      answer: 3,
    },
    {
      question: 'A Developer must re-implement the business logic for an order fulfilment system. The business logic has to make requests to multiple vendors to decide where to purchase an item. The whole process can take up to a week to complete. What is the MOST efficient and SIMPLEST way to implement a system that meets these requirements?',
      options: ['Use AWS Step Functions to execute parallel Lambda functions, and join the results.', 'Create an AWS SQS for each vendor, poll the queue from a worker instance, and joint the results.', 'Use AWS Lambda to asynchronously call a Lambda function for each vendor, and join the results.', 'Use Amazon CloudWatch Events to orchestrate the Lambda functions.'],
      answer: 0,
    },
    {
      question: 'A mobile app stores blog posts in an Amazon DynamoDB table. Millions of posts are added every day, and each post represents a single item in the table. The mobile app requires only recent posts. Any post that is older than 48 hours can be removed. What is the MOST cost-effective way to delete posts that are older than 48 hours?',
      options: ['For each item, add a new attribute of type String that has a timestamp that is set to the blog post creation time. Create a script to find old posts with a table scan and remove posts that are older than 48 hours by using the BatchWriteItem API operation. Schedule a cron job on an Amazon EC2 instance once an hour to start the script.', 'For each item, add a new attribute of type String that has a timestamp that is set to the blog post creation time. Create a script to find old posts with a table scan and remove posts that are older than 48 hours by using the BatchWriteItem API operation. Place the script in a container image. Schedule an Amazon Elastic Container Service (Amazon ECS) task on AWS Fargate that invokes the container every 5 minutes.', 'For each item, add a new attribute of type Date that has a timestamp that is set to 48 hours after the blog post creation time. Create a Global Secondary Index (GSI) that uses the new attribute as a sort key. Create an AWS Lambda function that references the GSI and removes expired items by using the BatchWriteItem API operation. Schedule the function with an Amazon CloudWatch event every minute.', 'For each item, add a new attribute of type Number that has a timestamp that is set to 48 hours after the blog post creation time. Configure the DynamoDB table with a TTL that references the new attribute.'],
      answer: 3,
    },
    {
      question: 'A Developer is receiving HTTP 400: ThrottlingException errors intermittently when calling the Amazon CloudWatch API. When a call fails, no data is retrieved. What best practice should first be applied to address this issue?',
      options: ['Contact AWS Support for a limit increase.', 'Use the AWS CLI to get the metrics.', 'Analyze the applications and remove the API call.', 'Retry the call with exponential backoff.'],
      answer: 3,
    },
    {
      question: 'An application is real-time processing millions of events that are received through an API. What service could be used to allow multiple consumers to process the data concurrently and MOST cost-effectively?',
      options: ['Amazon SNS with fanout to an SQS queue for each application.', 'Amazon SNS with fanout to an SQS FIFO (first-in, first-out) queue for each application.', 'Amazon Kinesis Firehose.', 'Amazon Kinesis Streams.'],
      answer: 3,
    },
    {
      question: 'Where should the appspec.yml file be placed in order for AWS CodeDeploy to work?',
      options: ['In the root of the application source code directory structure.', 'In the bin folder along with all the complied code.', 'In an S3 bucket.', 'In the same folder as the application configuration files.'],
      answer: 0,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 4 (20 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET4 = {
  name: 'AWS DVA-C02 — Set 4',
  questions: [
    {
      question: 'An application will ingest data at a very high throughput from many sources and must store the data in an Amazon S3 bucket. Which service would BEST accomplish this task?',
      options: ['Amazon Kinesis Firehose.', 'Amazon S3 Acceleration Transfer.', 'Amazon SQS.', 'Amazon SNS.'],
      answer: 0,
    },
    {
      question: 'A Developer is creating a Lambda function and will be using external libraries that are not included in the standard Lambda libraries. What action would minimize the Lambda compute time consumed?',
      options: ['Install the dependencies and external libraries at the beginning of the Lambda function.', 'Create a Lambda deployment package that includes the external libraries.', 'Copy the external libraries to Amazon S3, and reference the external libraries to the S3 location.', 'Install the external libraries in Lambda Layer to be available to all Lambda functions.'],
      answer: 3,
    },
    {
      question: 'During non-peak hours, a Developer wants to minimize the execution time of a full Amazon DynamoDB table scan without affecting normal workloads. The workloads average half of the strongly consistent read capacity units during non-peak hours. How would the Developer optimize this scan?',
      options: ['Use parallel scans while limiting the rate.', 'Use sequential scans.', 'Increase read capacity units during the scan operation.', 'Change consistency to eventually consistent during the scan operation.'],
      answer: 0,
    },
    {
      question: 'A legacy service has an XML-based SOAP interface. The Developer wants to expose the functionality of the service to external clients with the Amazon API Gateway. Which technique will accomplish this?',
      options: ['Create a RESTful API with the API Gateway; transform the incoming JSON into a valid XML message for the SOAP interface using mapping templates.', 'Create a RESTful API with the API Gateway; pass the incoming JSON to the SOAP interface through an Application Load Balancer.', 'Create a RESTful API with the API Gateway; pass the incoming XML to the SOAP interface through an Application Load Balancer.', 'Create a RESTful API with the API Gateway; transform the incoming XML into a valid message for the SOAP interface using mapping templates.'],
      answer: 0,
    },
    {
      question: 'A Developer has an application that can upload tens of thousands of objects per second to Amazon S3 in parallel within a single AWS account. As part of new requirements, data stored in S3 must use server side encryption with AWS KMS (SSE-KMS). After creating this change, performance of the application is slower. Which of the following is MOST likely the cause of the application latency?',
      options: ['Amazon S3 throttles the rate at which uploaded objects can be encrypted using Customer Master Keys.', 'The AWS KMS API calls limit is less than needed to achieve the desired performance.', 'The client encryption of the objects is using a poor algorithm.', 'KMS requires that an alias be used to create an independent display name that can be mapped to a CM.'],
      answer: 1,
    },
    {
      question: 'A customer wants to deploy its source code on an AWS Elastic Beanstalk environment. The customer needs to perform deployment with minimal outage and should only use existing instances to retain application access log. What deployment policy would satisfy these requirements?',
      options: ['Rolling.', 'All at once.', 'Rolling with an additional batch.', 'Immutable.'],
      answer: 0,
    },
    {
      question: 'A Developer has setup an Amazon Kinesis Stream with 4 shards to ingest a maximum of 2500 records per second. A Lambda function has been configured to process these records. In which order will these records be processed?',
      options: ['Lambda will receive each record in the reverse order it was placed into the stream following a LIFO (last-in, first-out) method.', 'Lambda will receive each record in the exact order it was placed into the stream following a FIFO (first­-in, first-out) method.', 'Lambda will receive each record in the exact order it was placed into the shard following a FIFO (first-in, first-out) method. There is no guarantee of order across shards.', 'The Developer can select FIFO, (first-in, first-out), LIFO (last-in, last-out), random, or request specific record using the getRecords API.'],
      answer: 2,
    },
    {
      question: 'An organization must store thousands of sensitive audio and video files in an Amazon S3 bucket. Organizational security policies require that all data written to this bucket be encrypted. How can compliance with this policy be ensured?',
      options: ['Use AWS Lambda to send notifications to the security team if unencrypted objects are put in the bucket.', 'Configure an Amazon S3 bucket policy to prevent the upload of objects that do not contain the x-amz­-server-side-encryption header.', 'Create an Amazon CloudWatch event rule to verify that all objects stored in the Amazon S3 bucket are encrypted.', 'Configure an Amazon S3 bucket policy to prevent the upload of objects that contain the x-amz-server­side-encryption header.'],
      answer: 1,
    },
    {
      question: 'An application is designed to use Amazon SQS to manage messages from many independent senders. Each sender\'s messages must be processed in the order they are received. Which SQS feature should be implemented by the Developer?',
      options: ['Configure each sender with a unique MessageGroupId.', 'Enable MessageDeduplicationIds on the SQS queue.', 'Configure each message with unique MessageGroupIds.', 'Enable ContentBasedDeduplication on the SQS queue.'],
      answer: 0,
    },
    {
      question: 'A Developer created a dashboard for an application using Amazon API Gateway, Amazon S3, AWS Lambda, and Amazon RDS. The Developer needs an authentication mechanism allowing a user to sign in and view the dashboard. It must be accessible from mobile applications, desktops, and tablets, and must remember user preferences across platforms. Which AWS service should the Developer use to support this authentication scenario?',
      options: ['AWS KMS.', 'Amazon Cognito.', 'AWS Directory Service.', 'Amazon IAM.'],
      answer: 1,
    },
    {
      question: 'A Lambda function is packaged for deployment to multiple environments, including development, test, production, etc. Each environment has unique set of resources such as databases, etc. How can the Lambda function use the resources for the current environment?',
      options: ['Apply tags to the Lambda functions.', 'Hardcore resources in the source code.', 'Use environment variables for the Lambda functions.', 'Use separate function for development and production.'],
      answer: 2,
    },
    {
      question: 'A Developer needs temporary access to resources in a second account. What is the MOST secure way to achieve this?',
      options: ['Use the Amazon Cognito user pools to get short-lived credentials for the second account.', 'Create a dedicated IAM access key for the second account, and send it by mail.', 'Create a cross-account access role, and use sts:AssumeRole API to get short-lived credentials.', 'Establish trust, and add an SSH key for the second account to the IAM user.'],
      answer: 2,
    },
    {
      question: 'A Developer needs to use AWS X-Ray to monitor an application that is deployed on EC2 instances. What steps have to be executed to perform the monitoring?',
      options: ['Deploy the X-Ray SDK with the application and use X-Ray annotation.', 'Install the X-Ray daemon and instrument the application code.', 'Install the X-Ray daemon and configure it to forward data to Amazon CloudWatch Events.', 'Deploy the X-Ray SDK with the application and instrument the application code.'],
      answer: 1,
    },
    {
      question: 'A Developer is creating an Auto Scaling group whose instances need to publish a custom metric to Amazon CloudWatch. Which method would be the MOST secure way to authenticate a CloudWatch PUT request?',
      options: ['Create an IAM user with PutMetricData permission and put the user credentials in a private repository; have applications pull the credentials as needed.', 'Create an IAM user with PutMetricData permission, and modify the Auto Scaling launch configuration to inject the user credentials into the instance user data.', 'Modify the CloudWatch metric policies to allow the PutMetricData permission to instances from the Auto Scaling group.', 'Create an IAM role with PutMetricData permission and modify the Auto Scaling launching configuration to launch instances using that role.'],
      answer: 3,
    },
    {
      question: 'A company needs to encrypt data at rest, but it wants to leverage an AWS managed service using its own master key. Which of the following AWS service can be used to meet these requirements?',
      options: ['SSE with Amazon S3.', 'SSE with AWS KMS.', 'Client-side encryption.', 'AWS IAM roles and policies.'],
      answer: 1,
    },
    {
      question: 'A company wants to implement a continuous integration for its workloads on AWS. The company wants to trigger unit test in its pipeline for commits-on its code repository, and wants to be notified of failure events in the pipeline. How can these requirements be met?',
      options: ['Store the source code in AWS CodeCommit. Create a CodePipeline to automate unit testing. Use Amazon SNS to trigger notifications of failure events.', 'Store the source code in GitHub. Create a CodePipeline to automate unit testing. Use Amazon SES to trigger notifications of failure events.', 'Store the source code on GitHub. Create a CodePipeline to automate unit testing. Use Amazon CloudWatch to trigger notifications of failure events.', 'Store the source code in AWS CodeCommit. Create a CodePipeline to automate unit testing. Use Amazon CloudWatch to trigger notification of failure events.'],
      answer: 0,
    },
    {
      question: 'An application takes 40 seconds to process instructions received in an Amazon SQS message. Assuming the SQS queue is configured with the default VisibilityTimeout value, what is the BEST way, upon receiving a message, to ensure that no other instances can retrieve a message that has already been processed or is currently being processed?',
      options: ['Use the ChangeMessageVisibility API to increase the VisibilityTimeout, then use the DeleteMessage API to delete the message.', 'Use the DeleteMessage API call to delete the message from the queue, then call DeleteQueue API to remove the queue.', 'Use the ChangeMessageVisibility API to decrease the timeout value, then use the DeleteMessage API to delete the message.', 'Use the DeleteMessageVisibility API to cancel the VisibilityTimeout, then use the DeleteMessage API to delete the message.'],
      answer: 0,
    },
    {
      question: 'A Developer is developing an application that manages financial transactions. To improve security, multi-factor authentication (MFA) will be required as part of the login protocol. What services can the Developer use to meet these requirements?',
      options: ['Amazon DynamoDB to store MFA session data, and Amazon SNS to send MFA codes.', 'Amazon Cognito with MFA.', 'AWS Directory Service.', 'AWS IAM with MFA enabled.'],
      answer: 1,
    },
    {
      question: 'A Developer is writing transactions into a DynamoDB table called SystemUpdates that has 5 write capacity units. Which option has the highest read throughput?',
      options: ['Eventually consistent reads of 5 read capacity units reading items that are 4 KB in size.', 'Strongly consistent reads of 5 read capacity units reading items that are 4 KB in size.', 'Eventually consistent reads of 15 read capacity units reading items that are 1 KB in size.', 'Strongly consistent reads of 15 read capacity units reading items that are 1 KB in size.'],
      answer: 0,
    },
    {
      question: 'A Developer has created an S3 bucket s3://mycoolapp and has enabled server across logging that points to the folder s3://mycoolapp/logs. The Developer moved 100 KB of Cascading Style Sheets (CSS) documents to the folder s3://mycoolapp/css, and then stopped work. When the developer came back a few days later, the bucket was 50 GB. What is the MOST likely cause of this situation?',
      options: ['The CSS files were not compressed and S3 versioning was enabled.', 'S3 replication was enabled on the bucket.', 'Logging into the same bucket caused exponential log growth.', 'An S3 lifecycle policy has moved the entire CSS file to S3 Infrequent Access.'],
      answer: 2,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 5 (20 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET5 = {
  name: 'AWS DVA-C02 — Set 5',
  questions: [
    {
      question: 'A Developer is testing a Docker-based application that uses the AWS SDK to interact with Amazon DynamoDB. In the local development environment, the application has used IAM access keys. The application is now ready for deployment onto an ECS cluster. How should the application authenticate with AWS services in production?',
      options: ['Configure an ECS task IAM role for the application to use.', 'Refactor the application to call AWS STS AssumeRole based on an instance role.', 'Configure AWS access key/secret access key environment variables with new credentials.', 'Configure the credentials file with a new access key/secret access key.'],
      answer: 0,
    },
    {
      question: 'A company is using AWS CodeBuild to compile a website from source code stored in AWS CodeCommit. A recent change to the source code has resulted in the CodeBuild project being unable to successfully compile the website. How should the Developer identify the cause of the failures?',
      options: ['Modify the buildspec.yml file to include steps to send the output of build commands to Amazon CloudWatch.', 'Use a custom Docker image that includes the AWS X-Ray agent in the AWS CodeBuild project configuration.', 'Check the build logs of the failed phase in the last build attempt in the AWS CodeBuild project build history.', 'Manually re-run the build process on a local machine so that the output can be visualized.'],
      answer: 2,
    },
    {
      question: 'For a deployment using AWS CodeDeploy, what is the run order of the hooks for in-place deployments?',
      options: ['Before Install -> Application Stop -> Application Start -> After Install.', 'Application Stop -> Before Install -> After Install -> Application Start.', 'Before Install -> Application Stop -> Validate Service -> Application Start.', 'Application Stop -> Before Install -> Validate Service -> Application Start.'],
      answer: 1,
    },
    {
      question: 'A Developer uses AWS CodeDeploy to automate application deployment that connects to an external MySQL database. The Developer wants to securely access the encrypted secrets, such as API keys and database passwords. Which of the following solutions would involve the LEAST administrative effort?',
      options: ['Save the secrets in Amazon S3 with AWS KMS server-side encryption, and use a signed URL to access them by using the IAM role from Amazon EC2 instances.', 'Use the instance metadata to store the secrets and to programmatically access the secrets from EC2 instances.', 'Use the Amazon DynamoDB client-side encryption library to save the secrets in DynamoDB and to programmatically access the secrets from EC2 instances.', 'Use AWS SSM Parameter Store to store the secrets and to programmatically access them by using the IAM role from EC2 instances.'],
      answer: 3,
    },
    {
      question: 'An application stops working with the following error: The specified bucket does not exist. Where is the BEST place to start the root cause analysis?',
      options: ['Check the Elastic Load Balancer logs for DeleteBucket requests.', 'Check the application logs in Amazon CloudWatch Logs for Amazon S3 DeleteBucket errors.', 'Check AWS X-Ray for Amazon S3 DeleteBucket alarms.', 'Check AWS CloudTrail for a DeleteBucket event.'],
      answer: 3,
    },
    {
      question: 'A Developer will be using the AWS CLI on a local development server to manage AWS services. What can be done to ensure that the CLI uses the Developer\'s IAM permissions when making commands?',
      options: ['Specify the Developer\'s IAM access key ID and secret access key as parameters for each CLI command.', 'Run the aws configure CLI command, and provide the Developer\'s IAM access key ID and secret access key.', 'Specify the Developer\'s IAM user name and password as parameters for each CLI command.', 'Use the Developer\'s IAM role when making the CLI command.'],
      answer: 1,
    },
    {
      question: 'An application stores images in an S3 bucket. Amazon S3 event notifications are used to trigger a Lambda function that resizes the images. Processing each image takes less than a second. How will AWS Lambda handle the additional traffic?',
      options: ['Lambda will scale out to execute the requests concurrently.', 'Lambda will handle the requests sequentially in the order received.', 'Lambda will process multiple images in a single execution.', 'Lambda will add more compute to each execution to reduce processing time.'],
      answer: 0,
    },
    {
      question: 'A company is building a stock trading application that requires sub-millisecond latency in processing trading requests. Amazon DynamoDB is used to store all the trading data that is used to process each request. After load testing the application, the development team found that due to data retrieval times, the latency requirement is not satisfied. Because of sudden high spikes in the number of requests, DynamoDB read capacity has to be significantly over-provisioned to avoid throttling. What steps should be taken to meet latency requirements and reduce the cost of running the application?',
      options: ['Add Global Secondary Indexes for trading data.', 'Store trading data in Amazon S3 and use Transfer Acceleration.', 'Add retries with exponential back-off for DynamoDB queries.', 'Use DynamoDB Accelerator to cache trading data.'],
      answer: 3,
    },
    {
      question: 'A Developer created a Lambda function for a web application backend. When testing the Lambda function from the AWS Lambda console, the Developer can see that the function is being executed, but there is no log data being generated in Amazon CloudWatch Logs, even after several minutes. What could cause this situation?',
      options: ['The Lambda function does not have any explicit log statements for the log data to send it to CloudWatch Logs.', 'The Lambda function is missing CloudWatch Logs as a source trigger to send log data.', 'The execution role for the Lambda function is missing permissions to write log data to the CloudWatch Logs.', 'The Lambda function is missing a target CloudWatch Log group.'],
      answer: 2,
    },
    {
      question: 'An application has hundreds of users. Each user may use multiple devices to access the application. The Developer wants to assign unique identifiers to these users regardless of the device they use. Which of the following methods should be used to obtain unique identifiers?',
      options: ['Create a user table in Amazon DynamoDB as key-value pairs of users and their devices. Use these keys as unique identifiers.', 'Use IAM-generated access key IDs for the users as the unique identifier, but do not store secret keys.', 'Implement developer-authenticated identities by using Amazon Cognito, and get credentials for these identities.', 'Assign IAM users and roles to the users. Use the unique IAM resource ID as the unique identifier.'],
      answer: 2,
    },
    {
      question: 'What are the steps to using the AWS CLI to launch a templatized serverless application?',
      options: ['Use AWS CloudFormation get-template then CloudFormation execute-change-set.', 'Use AWS CloudFormation validate-template then CloudFormation create-change-set.', 'Use AWS CloudFormation package then CloudFormation deploy.', 'Use AWS CloudFormation create-stack then CloudFormation update-stack.'],
      answer: 2,
    },
    {
      question: 'A deployment package uses the AWS CLI to copy files into any S3 bucket in the account, using access keys stored in environment variables. The package is running on EC2 instances, and the instances have been modified to run with an assumed IAM role and a more restrictive policy that allows access to only one bucket. After the change, the Developer logs into the host and still has the ability to write into all of the S3 buckets in that account. What is the MOST likely cause of this situation?',
      options: ['An IAM inline policy is being used on the IAM role.', 'An IAM managed policy is being used on the IAM role.', 'The AWS CLI is corrupt and needs to be reinstalled.', 'The AWS credential provider looks for instance profile credentials last.'],
      answer: 1,
    },
    {
      question: 'An application overwrites an object in Amazon S3, and then immediately reads the same object. Why would the application sometimes retrieve the old version of the object?',
      options: ['S3 overwrite PUTS are eventually consistent, so the application may read the old object.', 'The application needs to add extra metadata to label the latest version when uploading to Amazon S3.', 'All S3 PUTS are eventually consistent, so the application may read the old object.', 'The application needs to explicitly specify latest version when retrieving the object.'],
      answer: 0,
    },
    {
      question: 'An application under development is required to store hundreds of video files. The data must be encrypted within the application prior to storage, with a unique key for each video file. How should the Developer code the application?',
      options: ['Use the KMS Encrypt API to encrypt the data. Store the encrypted data key and data.', 'Use a cryptography library to generate an encryption key for the application. Use the encryption key to encrypt the data. Store the encrypted data.', 'Use the KMS GenerateDataKey API to get a data key. Encrypt the data with the data key. Store the encrypted data key and data.', 'Upload the data to an S3 bucket using server side-encryption with an AWS KMS key.'],
      answer: 2,
    },
    {
      question: 'A developer is testing an application that invokes an AWS Lambda function asynchronously. During the testing phase, the Lambda function fails to process after two retries. How can the developer troubleshoot the failure?',
      options: ['Configure AWS CloudTrail logging to investigate the invocation failures.', 'Configure Dead Letter Queues by sending events to Amazon SQS for investigatio.', 'Configure Amazon Simple Workflow Service to process any direct unprocessed events.', 'Configure AWS Config to process any direct unprocessed events.'],
      answer: 1,
    },
    {
      question: 'A developer is setting up Amazon API Gateway for their company\'s products. The API will be used by registered developers to query and update their environments. The company wants to limit the amount of requests end users can send for both cost and security reasons. Management wants to offer registered developers the option of buying larger packages that allow for more requests. How can the developer accomplish this with the LEAST amount of overhead management?',
      options: ['Enable throttling for the API Gateway stage. Set a value for both the rate and burst capacity. If a registered user chooses a larger package, create a stage for them, adjust the values, and share the new URL with them.', 'Set up Amazon CloudWatch API logging in API Gateway. Create a filter based on the user and requestTime fields and create an alarm on this filter. Write an AWS Lambda function to analyze the values and requester information, and respond accordingly. Set up the function as the target for the alarm. If a registered user chooses a larger package, update the Lambda code with the values.', 'Enable Amazon CloudWatch metrics for the API Gateway stage. Set up CloudWatch alarms based off the Count metric and the ApiName, Method, Resource, and Stage dimensions to alerts when request rates pass the threshold. Set the alarm action to Deny. If a registered user chooses a larger package, create a user-specific alarm and adjust the values.', 'Set up a default usage plan, specify values for the rate and burst capacity, and associate it with a stage. If a registered user chooses a larger package, create a custom plan with the appropriate values and associate the plan with the user.'],
      answer: 3,
    },
    {
      question: 'A developer is refactoring a monolithic application. The application takes a POST request and performs several operations. Some of the operations are in parallel while others run sequentially. These operations have been refactored into individual AWS Lambda functions. The POST request will be processed by Amazon API Gateway. How should the developer invoke the Lambda functions in the same sequence using API Gateway?',
      options: ['Use Amazon SQS to invoke the Lambda functions.', 'Use an AWS Step Functions activity to run the Lambda functions.', 'Use Amazon SNS to trigger the Lambda functions.', 'Use an AWS Step Functions state machine to orchestrate the Lambda functions.'],
      answer: 3,
    },
    {
      question: 'A developer is creating an AWS Lambda function that generates a new file each time it runs. Each new file must be checked into an AWS CodeCommit repository hosted in the same AWS account. How should the developer accomplish this?',
      options: ['When the Lambda function starts, use the Git CLI to clone the repository. Check the new file into the cloned repository and push the change.', 'After the new file is created in Lambda, use cURL to invoke the CodeCommit API. Send the file to the repository.', 'Use an AWS SDK to instantiate a CodeCommit client. Invoke the put_file method to add the file to the repository.', 'Upload the new to an Amazon S3 bucket. Create an AWS Step Function to accept S3 events. In the Step Function, add the new file to the repository.'],
      answer: 0,
    },
    {
      question: 'A developer must ensure that the IAM credentials used by an application in Amazon EC2 are not misused or compromised. What should the developer use to keep user credentials secure?',
      options: ['Environment variables.', 'AWS credentials file.', 'Instance profile credentials.', 'Command line options.'],
      answer: 2,
    },
    {
      question: 'A company has 25,000 employees and is growing. The company is creating an application that will be accessible to its employees only. A developer is using Amazon S3 to store images and Amazon RDS to store application data. The company requires that all employee information remain in the legacy Security Assertion Markup Language (SAML) employee directory only and is not interested in mirroring any employee information on AWS. How can the developer provide authorized access for the employees who will be using this application so each employee can access their own application data only?',
      options: ['Use Amazon VPC and keep all resources inside the VPC, and use a VPC link for the S3 bucket with the bucket policy.', 'Use Amazon Cognito user pools, federate with the SAML provider, and use user pool groups with an IAM policy.', 'Use an Amazon Cognito identity pool, federate with the SAML provider, and use an IAM condition key with a value for the cognito-identity.amazonaws.com:sub variable to grant access to the employees.', 'Create a unique IAM role for each employee and have each employee assume the role to access the application so they can access their personal data only.'],
      answer: 2,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 6 (20 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET6 = {
  name: 'AWS DVA-C02 — Set 6',
  questions: [
    {
      question: 'A company has developed a new serverless application using AWS Lambda functions that will be deployed using the AWS Serverless Application Model (AWS SAM) CLI. Which step should the developer complete prior to deploying the application?',
      options: ['Compress the application to a .zip file and upload it into AWS Lambda.', 'Test the new AWS Lambda function by first tracing it in AWS X-Ray.', 'Bundle the serverless application using a SAM package.', 'Create the application environment using the eb create my-env command.'],
      answer: 2,
    },
    {
      question: 'An application needs to encrypt data that is written to Amazon S3 where the keys are managed in an on-premises data center, and the encryption is handled by S3. Which type of encryption should be used?',
      options: ['Use server-side encryption with Amazon S3-managed keys.', 'Use server-side encryption with AWS KMS-managed keys.', 'Use client-side encryption with customer master keys.', 'Use server-side encryption with customer-provided keys.'],
      answer: 3,
    },
    {
      question: 'A development team is working on a mobile app that allows users to upload pictures to Amazon S3. The team expects the app will be used by hundreds of thousands of users during a single event simultaneously. Once the pictures are uploaded, the backend service will scan and parse the pictures for inappropriate content. Which approach is the MOST resilient way to achieve this goal, which also smooths out temporary volume spikes for the backend service?',
      options: ['Develop an AWS Lambda function to check the upload folder in the S3 bucket. If new uploaded pictures are detected, the Lambda function will scan and parse them.', 'Once a picture is uploaded to Amazon S3, publish the event to an Amazon SQS queue. Use the queue as an event source to trigger an AWS Lambda function. In the Lambda function, scan and parse the picture.', 'When the user uploads a picture, invoke an API hosted in Amazon API Gateway. The API will invoke an AWS Lambda function to scan and parse the picture.', 'Create a state machine in AWS Step Functions to check the upload folder in the S3 bucket. If a new picture is detected, invoke an AWS Lambda function to scan and parse it.'],
      answer: 1,
    },
    {
      question: 'A development team wants to run their container workloads on Amazon ECS. Each application container needs to share data with another container to collect logs and metrics. What should the developer team do to meet these requirements?',
      options: ['Create two pod specifications. Make one to include the application container and the other to include the other container. Link the two pods together.', 'Create two task definitions. Make one to include the application container and the other to include the other container. Mount a shared volume between the two tasks.', 'Create one task definition. Specify both containers in the definition. Mount a shared volume between those two containers.', 'Create a single pod specification. Include both containers in the specification. Mount a persistent volume to both containers.'],
      answer: 2,
    },
    {
      question: 'An ecommerce startup is preparing for an annual sales event. As the traffic to the company\'s application increases, the development team wants to be notified when the Amazon EC2 instance\'s CPU utilization exceeds 80%. Which solution will meet this requirement?',
      options: ['Create a custom Amazon CloudWatch alarm that sends a notification to an Amazon SNS topic when the CPU utilization exceeds 80%.', 'Create a custom AWS Cloud Trail alarm that sends a notification to an Amazon SNS topic when the CPU utilization exceeds 80%.', 'Create a cron job on the EC2 instance that executes the –describe-instance-information command on the host instance every 15 minutes and sends the results to an Amazon SNS topic.', 'Create an AWS Lambda function that queries the AWS CloudTrail logs for the CPUUtilization metric every 15 minutes and sends a notification to an Amazon SNS topic when the CPU utilization exceeds 80%.'],
      answer: 0,
    },
    {
      question: 'An application running on Amazon EC2 opens connections to an Amazon RDS SQL Server database. The developer does not want to store the user name and password for the database in the code. The developer would also like to automatically rotate the credentials. What is the MOST secure way to store and access the database credentials?',
      options: ['Create an IAM role that has permissions to access the database. Attach the role to the EC2 instance.', 'Use AWS Secrets Manager to store the credentials. Retrieve the credentials from Secrets Manager as needed.', 'Store the credentials in an encrypted text file in an Amazon S3 bucket. Configure the EC2 instance\'s user data to download the credentials from Amazon S3 as the instance boots.', 'Store the user name and password credentials directly in the source code. No further action is needed because the source code is stored in a private repository.'],
      answer: 1,
    },
    {
      question: 'A developer is updating an application deployed on AWS Elastic Beanstalk. The new version is incompatible with the old version. To successfully deploy the update, a full cutover to the new, updated version must be performed on all instances at one time, with the ability to roll back changes in case of a deployment failure in the new version. How can this be performed with the LEAST amount of downtime?',
      options: ['Use the Elastic Beanstalk All at once deployment policy to update all instances simultaneously.', 'Perform an Elastic Beanstalk Rolling with additional batch deployment.', 'Deploy the new version in a new Elastic Beanstalk environment and swap environment URLs.', 'Perform an Elastic Beanstalk Rolling deployment.'],
      answer: 2,
    },
    {
      question: 'A developer is writing a web application that must share secure documents with end users. The documents are stored in a private Amazon S3 bucket. The application must allow only authenticated users to download specific documents when requested, and only for a duration of 15 minutes. How can the developer meet these requirements?',
      options: ['Copy the documents to a separate S3 bucket that has a lifecycle policy for deletion after 15 minutes.', 'Create a presigned S3 URL using the AWS SDK with an expiration time of 15 minutes.', 'Use server-side encryption with AWS KMS managed keys (SSE-KMS) and download the documents using HTTPS.', 'Modify the S3 bucket policy to only allow specific users to download the documents. Revert the change after 15 minutes.'],
      answer: 1,
    },
    {
      question: 'A company is developing a report executed by AWS Step Functions, Amazon CloudWatch shows errors in the Step Functions task state machine. To troubleshoot each task, the state input needs to be included along with the error message in the state output. Which coding practice can preserve both the original input and the error for the state?',
      options: ['Use ResultPath in a Catch statement to include the error with the original input.', 'Use InputPath in a Catch statement and set the value to null.', 'Use Error Equals in a Retry statement to include the error with the original input.', 'Use OutputPath in a Retry statement and set the value to $.'],
      answer: 0,
    },
    {
      question: 'A developer is using AWS CodeDeploy to deploy an application running on Amazon EC2. The developer wants to change the file permissions for a specific deployment file. Which lifecycle event should a developer use to meet this requirement?',
      options: ['AfterInstall.', 'DownloadBundle.', 'BeforeInstall.', 'ValidateService.'],
      answer: 0,
    },
    {
      question: 'A developer is using Amazon DynamoDB to store application data. The developer wants to further improve application performance by reducing response times for read and write operations. Which DynamoDB feature should be used to meet these requirements?',
      options: ['Amazon DynamoDB Streams.', 'Amazon DynamoDB Accelerator.', 'Amazon DynamoDB global tables.', 'Amazon DynamoDB transactions.'],
      answer: 1,
    },
    {
      question: 'Two containerized microservices are hosted on Amazon EC2 ECS. The first microservice reads an Amazon RDS Aurora database instance, and the second microservice reads an Amazon DynamoDB table. How can each microservice be granted the minimum privileges?',
      options: ['Set ECS_ENABLE_TASK_IAM_ROLE to false on EC2 instance boot in ECS agent configuration file. Run the first microservice with an IAM role for ECS tasks with read-only access for the Aurora database. Run the second microservice with an IAM role for ECS tasks with read-only access to DynamoDB.', 'Set ECS_ENABLE_TASK_IAM_ROLE to false on EC2 instance boot in the ECS agent configuration file. Grant the instance profile role read-only access to the Aurora database and DynamoDB.', 'Set ECS_ENABLE_TASK_IAM_ROLE to true on EC2 instance boot in the ECS agent configuration file. Run the first microservice with an IAM role for ECS tasks with read-only access for the Aurora database. Run the secondmicroservice with an IAM role for ECS tasks with read-only access to DynamoDB.', 'Set ECS_ENABLE_TASK_IAM_ROLE to true on EC2 instance boot in the ECS agent configuration file. Grant the instance profile role read-only access to the Aurora database and DynamoDB.'],
      answer: 2,
    },
    {
      question: 'A developer has written an AWS Lambda function using Java as the runtime environment. The developer wants to isolate a performance bottleneck in the code. Which steps should be taken to reveal the bottleneck?',
      options: ['Use the Amazon CloudWatch API to write timestamps to a custom CloudWatch metric. Use the CloudWatch console to analyze the resulting data.', 'Use the AWS X-Ray API to write trace data into X-Ray from strategic places within the code. Use the Amazon CloudWatch console to analyze the resulting data.', 'Use the AWS X-Ray API to write trace data into X-Ray from strategic places within the code. Use the X-Ray console to analyze the resulting data.', 'Use the Amazon CloudWatch API to write timestamps to a custom CloudWatch metric. Use the AWS X-Ray console to analyze the resulting data.'],
      answer: 2,
    },
    {
      question: 'A developer added a new feature to an application running on an Amazon EC2 instance that uses Amazon SQS. After deployment, the developer noticed a significant increase in Amazon SQS costs. When monitoring the Amazon SQS metrics on Amazon CloudWatch, the developer found that on average one message per minute is posted on this queue. What can be done to reduce Amazon SQS costs for this application?',
      options: ['Increase the Amazon SQS queue polling timeout.', 'Scale down the Amazon SQS queue to the appropriate size for low traffic demand.', 'Configure push delivery via Amazon SNS instead of polling the Amazon SQS queue.', 'Use an Amazon SQS first-in, first-out (FIFO) queue instead of a standard queue.'],
      answer: 0,
    },
    {
      question: 'A developer is building an application using an Amazon API Gateway REST API backend by an AWS Lambda function that interacts with an Amazon DynamoDB table. During testing, the developer observes high latency when making requests to the API. How can the developer evaluate the end-to-end latency and identify performance bottlenecks?',
      options: ['Enable AWS CloudTrail logging and use the logs to map each latency and bottleneck.', 'Enable and configure AWS X-Ray tracing on API Gateway and the Lambda function. Use X-Ray to trace and analyze user requests.', 'Enable Amazon CloudWatch Logs for the Lambda function. Enable execution logs for API Gateway to view and analyze user request logs.', 'Enable VPC Flow Logs to capture and analyze network traffic within the VPC.'],
      answer: 1,
    },
    {
      question: 'An IAM role is attached to an Amazon EC2 instance that explicitly denies access to all Amazon S3 API actions. The EC2 instance credentials file specifies the IAM access key and secret access key, which allow full administrative access. Given that multiple modes of IAM access are present for this EC2 instance, which of the following is correct?',
      options: ['The EC2 instance will only be able to list the S3 buckets.', 'The EC2 instance will only be able to list the contents of one S3 bucket at a time.', 'The EC2 instance will be able to perform all actions on any S3 bucket.', 'The EC2 instance will not be able to perform any S3 action on any S3 bucket.'],
      answer: 3,
    },
    {
      question: 'A development team uses AWS Elastic Beanstalk for application deployment. The team has configured the application version lifecycle policy to limit the number of application versions to 25. However, even with the lifecycle policy, the source bundle is deleted from the Amazon S3 source bucket. What should a developer do in the Elastic Beanstalk application version lifecycle settings to retain the source code in the S3 bucket?',
      options: ['Change the Set the application versions limit by total count setting to zero.', 'Disable the Lifecycle policy setting.', 'Change the Set the application version limit by age setting to zero.', 'Set Retention to Retain source bundle in S3.'],
      answer: 3,
    },
    {
      question: 'A developer has built a market application that stores pricing data in Amazon DynamoDB with Amazon ElastiCache in front. The prices of items in the market change frequently. Sellers have begun complaining that, after they update the price of an item, the price does not actually change in the product listing. What could be causing this issue?',
      options: ['The cache is not being invalidated when the price of the item is changed.', 'The price of the item is being retrieved using a write-through ElastiCache cluster.', 'The DynamoDB table was provisioned with insufficient read capacity.', 'The DynamoDB table was provisioned with insufficient write capacity.'],
      answer: 0,
    },
    {
      question: 'A developer is provided with an HTTPS clone URL for an AWS CodeCommit repository. What needs to be configured before cloning this repository?',
      options: ['Use AWS KMS to set up public and private keys for use with AWS CodeCommit.', 'Set up the Git credential helper to use an AWS credential profile, and enable the helper to send the path to the repositories.', 'Use AWS Certificate Manager to provision public and private SSL/TLS certificates.', 'Generate encryption keys using AWS CloudHSM, then export the key for use with AWS CodeCommit.'],
      answer: 1,
    },
    {
      question: 'What is required to trace Lambda-based applications with AWS X-Ray?',
      options: ['Send logs from the Lambda application to an S3 bucket; trigger a Lambda function from the bucket to send data to AWS X-Ray.', 'Trigger a Lambda function from the application logs in Amazon CloudWatch to submit tracing data to AWS X-Ray.', 'Use an IAM execution role to give the Lambda function permissions and enable tracing.', 'Update and add AWS X-Ray daemon code to relevant parts of the Lambda function to set up the trace.'],
      answer: 2,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 7 (20 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET7 = {
  name: 'AWS DVA-C02 — Set 7',
  questions: [
    {
      question: 'A development team is building a new application that will run on Amazon EC2 and use Amazon DynamoDB as a storage layer. The developers all have assigned IAM user accounts in the same IAM group. The developers currently can launch EC2 instances, and they need to be able to launch EC2 instances with an instance role allowing access to Amazon DynamoDB. Which AWS IAM changes are needed when creating an instance role to provide this functionality?',
      options: ['Create an IAM permission policy attached to the role that allows access to DynamoDB. Add a trust policy to the role that allows DynamoDB to assume the role. Attach a permissions policy to the development group in AWS IAM that allows developers to use the iam:GetRole and iam:PassRole permissions for the role.', 'Create an IAM permissions policy attached to the role that allows access to DynamoDB. Add a trust policy to the role that allows Amazon EC2 to assume the role. Attach a permissions policy to the development group in AWS IAM that allows developers to use the iam:PassRole permission for the role.', 'Create an IAM permission policy attached to the role that allows access to Amazon EC2. Add a trust policy to the role that allows DynamoDB to assume the role. Attach a permissions policy to the development group in AWS IAM that allows developers to use the iam:PassRole permission for the role.', 'Create an IAM permissions policy attached to the role that allows access to DynamoDB. Add a trust policy to the role that allows Amazon EC2 to assume the role. Attach a permissions policy to the development group in AWS IAM that allows developers to use the iam:GetRole permission for the role.'],
      answer: 1,
    },
    {
      question: 'A developer converted an existing program to an AWS Lambda function in the console. The program runs properly on a local laptop, but shows an Unable to import module error when tested in the Lambda console. Which of the following can fix the error?',
      options: ['Install the missing module and specify the current directory as the target. Create a ZIP file to include all files under the current directory, and upload the ZIP file.', 'Install the missing module in a lib directory. Create a ZIP file to include all files under the lib directory, and upload the ZIP file as dependency file.', 'In the Lambda code, invoke a Linux command to install the missing modules under the /usr/lib directory.', 'In the Lambda console, create a LB_LIBRARY_PATH environment and specify the value for the system library plan.'],
      answer: 0,
    },
    {
      question: 'A front-end web application is using Amazon Cognito user pools to handle the user authentication flow. A developer is integrating Amazon DynamoDB into the application using the AWS SDK for JavaScript. How would the developer securely call the API without exposing the access or secret keys?',
      options: ['Configure Amazon Cognito identity pools and exchange the JSON Web Token (JWT) for temporary credentials.', 'Run the web application in an Amazon EC2 instance with the instance profile configured.', 'Hardcore the credentials, use Amazon S3 to host the web application, and enable server-side encryption.', 'Use Amazon Cognito user pool JSON Web Tokens (JWITs) to access the DynamoDB APIs.'],
      answer: 0,
    },
    {
      question: 'A developer needs to manage AWS infrastructure as code and must be able to deploy multiple identical copies of the infrastructure, stage changes, and revert to previous versions. Which approach addresses these requirements?',
      options: ['Use cost allocation reports and AWS OpsWorks to deploy and manage the infrastructure.', 'Use Amazon CloudWatch metrics and alerts along with resource tagging to deploy and manage the infrastructure.', 'Use AWS Elastic Beanstalk and AWS CodeCommit to deploy and manage the infrastructure.', 'Use AWS CloudFormation and AWS CodeCommit to deploy and manage the infrastructure.'],
      answer: 3,
    },
    {
      question: 'A Developer needs to deploy an application running on AWS Fargate using Amazon ECS. The application has environment variables that must be passed to a container for the application to initialize. How should the environment variables be passed to the container?',
      options: ['Define an array that includes the environment variables under the environment parameter within the service definition.', 'Define an array that includes the environment variables under the environment parameter within the task definition.', 'Define an array that includes the environment variables under the entryPoint parameter within the task definition.', 'Define an array that includes the environment variables under the entryPoint parameter within the service definition.'],
      answer: 1,
    },
    {
      question: 'A company\'s fleet of Amazon EC2 instances receives data from millions of users through an API. The servers batch the data, add an object for each user, and upload the objects to an S3 bucket to ensure high access rates. The object attributes are Customer ID, Server ID, TS-Server (TimeStamp and Server ID), the size of the object, and a timestamp. A Developer wants to find all the objects for a given user collected during a specified time range. After creating an S3 object created event, how can the Developer achieve this requirement?',
      options: ['Execute an AWS Lambda function in response to the S3 object creation events that creates an Amazon DynamoDB record for every object with the Customer ID as the partition key and the Server ID as the sort key. Retrieve all the records using the Customer ID and Server ID attributes.', 'Execute an AWS Lambda function in response to the S3 object creation events that creates an Amazon Redshift record for every object with the Customer ID as the partition key and TS-Server as the sort key. Retrieve all the records using the Customer ID and TS-Server attributes.', 'Execute an AWS Lambda function in response to the S3 object creation events that creates an Amazon DynamoDB record for every object with the Customer ID as the partition key and TS-Server as the sort key. Retrieve all the records using the Customer ID and TS-Server attributes.', 'Execute an AWS Lambda function in response to the S3 object creation events that creates an Amazon Redshift record for every object with the Customer ID as the partition key and the Server ID as the sort key. Retrieve all the records using the Customer ID and Server ID attributes.'],
      answer: 2,
    },
    {
      question: 'A company is managing a NoSQL database on-premises to host a critical component of an application, which is starting to have scaling issues. The company wants to migrate the application to Amazon DynamoDB with the following considerations: Optimize frequent queries. Reduce read latencies. Plan for frequent queries on certain key attributes of the table. Which solution would help achieve these objectives?',
      options: ['Create global secondary indexes on keys that are frequently queried. Add the necessary attributes into the indexes.', 'Create local secondary indexes on keys that are frequently queried. DynamoDB will fetch needed attributes from the table.', 'Create DynamoDB global tables to speed up query responses. Use a scan to fetch data from the table.', 'Create an AWS Auto Scaling policy for the DynamoDB table.'],
      answer: 0,
    },
    {
      question: 'A developer is writing an application that will process data delivered into an Amazon S3 bucket. The data is delivered approximately 10 times a day, and the developer expects the data will be processed in less than 1 minute, on average. How can the developer deploy and invoke the application with the lowest cost and lowest latency?',
      options: ['Deploy the application as an AWS Lambda function and invoke it with an Amazon CloudWatch alarm triggered by an S3 object upload.', 'Deploy the application as an AWS Lambda function and invoke it with an S3 event notification.', 'Deploy the application as an AWS Lambda function and invoke it with an Amazon CloudWatch scheduled event.', 'Deploy the application onto an Amazon EC2 instance and have it poll the S3 bucket for new objects.'],
      answer: 1,
    },
    {
      question: 'A company is using Amazon API Gateway to manage its public-facing API. The CISO requires that the APIs be used by test account users only. What is the MOST secure way to restrict API access to users of this particular AWS account?',
      options: ['Client-side SSL certificates for authentication.', 'API Gateway resource policies.', 'Cross-origin resource sharing (CORS).', 'Usage plans.'],
      answer: 1,
    },
    {
      question: 'A Developer is migrating existing applications to AWS. These applications use MongoDB as their primary data store, and they will be deployed to Amazon EC2 instances. Management requires that the Developer minimize changes to applications while using AWS services. Which solution should the Developer use to host MongoDB in AWS?',
      options: ['Install MongoDB on the same instance where the application is running.', 'Deploy Amazon DocumentDB in MongoDB compatibility mode.', 'Use Amazon API Gateway to translate API calls from MongoDB to Amazon DynamoDB.', 'Replicate the existing MongoDB workload to Amazon DynamoDB.'],
      answer: 1,
    },
    {
      question: 'A company requires that AWS Lambda functions written by Developers log errors so System Administrators can more effectively troubleshoot issues. What should the Developers implement to meet this need?',
      options: ['Publish errors to a dedicated Amazon SQS queue.', 'Create an Amazon CloudWatch Events event trigger based on certain Lambda events.', 'Report errors through logging statements in Lambda function code.', 'Set up an Amazon SNS topic that sends logging statements upon failure.'],
      answer: 2,
    },
    {
      question: 'A Developer is writing an application that runs on Amazon EC2 instances in an Auto Scaling group. The application data is stored in an Amazon DynamoDB table and records are constantly updated by all instances. An instance sometimes retrieves old data. The Developer wants to correct this by making sure the reads are strongly consistent. How can the Developer accomplish this?',
      options: ['Set ConsistentRead to true when calling GetItem.', 'Create a new DynamoDB Accelerator (DAX) table.', 'Set Consistency to strong when calling UpdateTable.', 'Use the GetShardIterator command.'],
      answer: 0,
    },
    {
      question: 'A Developer has an application that must accept a large amount of incoming data streams and process the data before sending it to many downstream users. Which serverless solution should the Developer use to meet these requirements?',
      options: ['Amazon RDS MySQL stored procedure with AWS Lambda.', 'AWS Direct Connect with AWS Lambda.', 'Amazon Kinesis Data Streams with AWS Lambda.', 'Amazon EC2 bash script with AWS Lambda.'],
      answer: 2,
    },
    {
      question: 'An application is experiencing performance issues based on increased demand. This increased demand is on read-only historical records pulled from an Amazon RDS-hosted database with custom views and queries. A Developer must improve performance without changing the database structure. Which approach will improve performance and MINIMIZE management overhead?',
      options: ['Deploy Amazon DynamoDB, move all the data, and point to DynamoDB.', 'Deploy Amazon ElastiCache for Redis and cache the data for the application.', 'Deploy Memcached on Amazon EC2 and cache the data for the application.', 'Deploy Amazon DynamoDB Accelerator (DAX) on Amazon RDS to improve cache performance.'],
      answer: 1,
    },
    {
      question: 'A Developer has an Amazon DynamoDB table that must be in provisioned mode to comply with user requirements. The application needs to support the following: Average item size: 10 KB. Item reads each second: 10 strongly consistent. Item writes each second: 2 transactional. Which read and write capacity cost-effectively meets these requirements?',
      options: ['Read 10; write 2.', 'Read 30; write 40.', 'Use on-demand scaling.', 'Read 300; write 400.'],
      answer: 1,
    },
    {
      question: 'A company wants to containerize an existing three-tier web application and deploy it to Amazon ECS Fargate. The application is using session data to keep track of user activities. Which approach would provide the BEST user experience?',
      options: ['Provision a Redis cluster in Amazon ElastiCache and save the session data in the cluster.', 'Create a session table in Amazon Redshift and save the session data in the database table.', 'Enable session stickiness in the existing Network Load Balancer and manage the session data in the container.', 'Use an Amazon S3 bucket as data store and save the session data in the bucket.'],
      answer: 0,
    },
    {
      question: 'An application is using a single-node Amazon ElastiCache for Redis instance to improve read performance. Over time, demand for the application has increased exponentially, which has increased the load on the ElastiCache instance. It is critical that this cache layer handles the load and is resilient in case of node failures. What can the Developer do to address the load and resiliency requirements?',
      options: ['Add a read replica instance.', 'Migrate to a Memcached cluster.', 'Migrate to an Amazon Elasticsearch Service cluster.', 'Vertically scale the ElastiCache instance.'],
      answer: 0,
    },
    {
      question: 'A Developer is investigating an application\'s performance issues. The application consists of hundreds of microservices, and a single API call can potentially have a deep call stack. The Developer must isolate the component that is causing the issue. Which AWS service or feature should the Developer use to gather information about what is happening and isolate the fault?',
      options: ['AWS X-Ray.', 'VPC Flow Logs.', 'Amazon GuardDuty.', 'Amazon Macie.'],
      answer: 0,
    },
    {
      question: 'A Company runs continuous integration/continuous delivery (CI/CD) pipelines for its application on AWS CodePipeline. A Developer must write unit tests and run them as part of the pipelines before staging the artifacts for testing. How should the Developer incorporate unit tests as part of CI/CD pipelines?',
      options: ['Create a separate CodePipeline pipeline to run unit tests.', 'Update the AWS CodeBuild specification to include a phase for running unit tests.', 'Install the AWS CodeDeploy agent on an Amazon EC2 instance to run unit tests.', 'Create a testing branch in AWS CodeCommit to run unit tests.'],
      answer: 1,
    },
    {
      question: 'An application has the following requirements: Performance efficiency of seconds with up to a minute of latency. The data storage size may grow up to thousands of terabytes. Per-message sizes may vary between 100 KB and 100 MB. Data can be stored as key/value stores supporting eventual consistency. What is the MOST cost-effective AWS service to meet these requirements?',
      options: ['Amazon DynamoDB.', 'Amazon S3.', 'Amazon RDS (with a MySQL engine).', 'Amazon ElastiCache.'],
      answer: 0,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 8 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET8 = {
  name: 'AWS DVA-C02 — Set 8',
  questions: [
    {
      question: 'A Developer must allow guest users without logins to access an Amazon Cognito-enabled site to view files stored within an Amazon S3 bucket. How should the Developer meet these requirements?',
      options: ['Create a blank user ID in a user pool, add to the user group, and grant access to AWS resources.', 'Create a new identity pool, enable access to unauthenticated identities, and grant access to AWS resources.', 'Create a new user pool, enable access to authenticated identifies, and grant access to AWS resources.', 'Create a new user pool, disable authentication access, and grant access to AWS resources.'],
      answer: 1,
    },
    {
      question: 'A Developer has written code for an application and wants to share it with other Developers on the team to receive feedback. The shared application code needs to be stored long-term with multiple versions and batch change tracking. Which AWS service should the Developer use?',
      options: ['AWS CodeBuild.', 'Amazon S3.', 'AWS CodeCommit.', 'AWS Cloud9.'],
      answer: 2,
    },
    {
      question: 'A Developer has discovered that an application responsible for processing messages in an Amazon SQS queue is routinely falling behind. The application is capable of processing multiple messages in one execution, but is only receiving one message at a time. What should the Developer do to increase the number of messages the application receives?',
      options: ['Call the ChangeMessageVisibility API for the queue and set MaxNumberOfMessages to a value greater than the default of 1.', 'Call the AddPermission API to set MaxNumberOfMessages for the ReceiveMessage action to a value greater than the default of 1.', 'Call the ReceiveMessage API to set MaxNumberOfMessages to a value greater than the default of 1.', 'Call the SetQueueAttributes API for the queue and set MaxNumberOfMessages to a value greater than the default of 1.'],
      answer: 2,
    },
    {
      question: 'A Developer registered an AWS Lambda function as a target for an Application Load Balancer (ALB) using a CLI command. However, the Lambda function is not being invoked when the client sends requests through the ALB. Why is the Lambda function not being invoked?',
      options: ['A Lambda function cannot be registered as a target for an ALB.', 'A Lambda function can be registered with an ALB using AWS Management Console only.', 'The permissions to invoke the Lambda function are missing.', 'Cross-zone is not enabled on the ALB.'],
      answer: 2,
    },
    {
      question: 'A company provides APIs as a service and commits to a service level agreement (SLA) with all its users. To comply with each SLA, what should the company do?',
      options: ['Enable throttling limits for each method in Amazon API Gateway.', 'Create a usage plan for each user and request API keys to access the APIs.', 'Enable API rate limiting in Amazon Cognito for each user.', 'Enable default throttling limits for each stage after deploying the APIs.'],
      answer: 1,
    },
    {
      question: 'A Developer is preparing a deployment package using AWS CloudFormation. The package consists of two separate templates: one for the infrastructure and one for the application. The application has to be inside the VPC that is created from the infrastructure template. How can the application stack refer to the VPC created from the infrastructure template?',
      options: ['Use the Ref function to import the VPC into the application stack from the infrastructure template.', 'Use the export flag in the infrastructure template, and then use the Fn::ImportValue function in the application template.', 'Use the DependsOn attribute to specify that the application instance depends on the VPC in the application template.', 'Use the Fn::GetAtt function to include the attribute of the VPC in the application template.'],
      answer: 1,
    },
    {
      question: 'A Developer needs to create an application that supports Security Assertion Markup Language (SAML) and Facebook authentication. It must also allow access to AWS services, such as Amazon DynamoDB. Which AWS service or feature will meet these requirements with the LEAST amount of additional coding?',
      options: ['AWS AppSync.', 'Amazon Cognito identity pools.', 'Amazon Cognito user pools.', 'Amazon Lambda@Edge.'],
      answer: 1,
    },
    {
      question: 'A Developer is trying to monitor an application\'s status by running a cron job that returns 1 if the service is up and 0 if the service is down. The Developer created code that uses an AWS CLI put-metric-alarm command to publish the custom metrics to Amazon CloudWatch and create an alarm. However, the Developer is unable to create an alarm as the custom metrics do not appear in the CloudWatch console. What is causing this issue?',
      options: ['Sending custom metrics using the CLI is not supported.', 'The Developer needs to use the put-metric-data command.', 'The Developer must use a unified CloudWatch agent to publish custom metrics.', 'The code is not running on an Amazon EC2 instance.'],
      answer: 1,
    },
    {
      question: 'A Developer has written an application that runs on Amazon EC2 instances and generates a value every minute. The Developer wants to monitor and graph the values generated over time without logging in to the instance each time. Which approach should the Developer use to achieve this goal?',
      options: ['Use the Amazon CloudWatch metrics reported by default for all EC2 instances. View each value from the CloudWatch console.', 'Develop the application to store each value in a file on Amazon S3 every minute with the timestamp as the name.', 'Publish each generated value as a custom metric to Amazon CloudWatch using available AWS SDKs.', 'Store each value as a variable and add the variable to the list of EC2 metrics that should be reported to the Amazon CloudWatch console.'],
      answer: 2,
    },
    {
      question: 'A Development team decides to adopt a continuous integration/continuous delivery (CI/CD) process using AWS CodePipeline and AWS CodeCommit for a new application. However, management wants a person to review and approve the code before it is deployed to production. How can the Development team add a manual approver to the CI/CD pipeline?',
      options: ['Use AWS SES to send an email to approvers when their action is required. Develop a simple application that allows approvers to accept or reject a build. Invoke an AWS Lambda function to advance the pipeline when a build is accepted.', 'If approved, add an approved tag when pushing changes to the CodeCommit repository. CodePipeline will proceed to build and deploy approved commits without interruption.', 'Add an approval step to CodeCommit. Commits will not be saved until approved.', 'Add an approval action to the pipeline. Configure the approval action to publish to an Amazon SNS topic when approval is required. The pipeline execution will stop and wait for an approval.'],
      answer: 3,
    },
    {
      question: 'A Developer is writing an application in AWS Lambda. To simplify testing and deployments, the Developer needs the database connection string to be easily changed without modifying the Lambda code. How can this requirement be met?',
      options: ['Store the connection string as a secret in AWS Secrets Manager.', 'Store the connection string in an IAM user account.', 'Store the connection string in AWS KMS.', 'Store the connection string as a Lambda layer.'],
      answer: 0,
    },
    {
      question: 'A company is launching an ecommerce website and will host the static data in Amazon S3. The company expects approximately 1,000 transactions per second (TPS) for GET and PUT requests in total. Logging must be enabled to track all requests and must be retained for auditing purposes. What is the MOST cost-effective solution?',
      options: ['Enable AWS CloudTrail logging for the S3 bucket-level action and create a lifecycle policy to move the data from the log bucket to Amazon S3 Glacier in 90 days.', 'Enable S3 server access logging and create a lifecycle policy to expire the data in 90 days.', 'Enable AWS CloudTrail logging for the S3 bucket-level action and create a lifecycle policy to expire the data in 90 days.', 'Enable S3 server access logging and create a lifecycle policy to move the data to Amazon S3 Glacier in 90 days.'],
      answer: 3,
    },
    {
      question: 'A Developer decides to store highly secure data in Amazon S3 and wants to implement server-side encryption (SSE) with granular control of who can access the master key. Company policy requires that the master key be created, rotated, and disabled easily when needed, all for security reasons. Which solution should be used to meet these requirements?',
      options: ['SSE with Amazon S3 managed keys (SSE-S3).', 'SSE with AWS KMS managed keys (SSE-KMS).', 'SSE with AWS Secrets Manager.', 'SSE with customer-provided encryption keys.'],
      answer: 1,
    },
    {
      question: 'A Developer is migrating an on-premises application to AWS. The application currently takes user uploads and saves them to a local directory on the server. All uploads must be saved and made immediately available to all instances in an Auto Scaling group. Which approach will meet these requirements?',
      options: ['Use Amazon EBS and configure the application AMI to use a snapshot of the same EBS instance on boot.', 'Use Amazon S3 and rearchitect the application so all uploads are placed in S3.', 'Use instance storage and share it between instances launched from the same Amazon Machine Image (AMI).', 'Use Amazon EBS and file synchronization software to achieve eventual consistency among the Auto Scaling group.'],
      answer: 1,
    },
    {
      question: 'A Developer implemented a static website hosted in Amazon S3 that makes web service requests hosted in Amazon API Gateway and AWS Lambda. The site is showing an error that reads: No Access-Control-Allow-Origin header is present on the requested resource. Origin null is therefore not allowed access.\' What should the Developer do to resolve this issue?',
      options: ['Enable cross-origin resource sharing (CORS) on the S3 bucket.', 'Enable cross-origin resource sharing (CORS) for the method in API Gateway.', 'Add the Access-Control-Request-Method header to the request.', 'Add the Access-Control-Request-Headers header to the request.'],
      answer: 1,
    },
    {
      question: 'A Developer is building an application that needs to store data in Amazon S3. Management requires that the data be encrypted before it is sent to Amazon S3 for storage. The encryption keys need to be managed by the Security team. Which approach should the Developer take to meet these requirements?',
      options: ['Implement server-side encryption using customer-provided encryption keys (SSE-C).', 'Implement server-side encryption by using a client-side master key.', 'Implement client-side encryption using an AWS KMS managed customer master key (CMK).', 'Implement client-side encryption using Amazon S3 managed keys.'],
      answer: 2,
    },
    {
      question: 'A Developer is publishing critical log data to a log group in Amazon CloudWatch Logs, which was created 2 months ago. The Developer must encrypt the log data using an AWS KMS customer master key (CMK) so future data can be encrypted to comply with the company\'s security policy. How can the Developer meet this requirement?',
      options: ['Use the CloudWatch Logs console and enable the encrypt feature on the log group.', 'Use the AWS CLI create-log-group command and specify the key Amazon Resource Name (ARN).', 'Use the KMS console and associate the CMK with the log group.', 'Use the AWS CLI associate-kms-key command and specify the key Amazon Resource Name (ARN)'],
      answer: 3,
    },
    {
      question: 'A Developer has code running on Amazon EC2 instances that needs read-only access to an Amazon DynamoDB table. What is the MOST secure approach the Developer should take to accomplish this task?',
      options: ['Create a user access key for each EC2 instance with read-only access to DynamoDB. Place the keys in the code. Redeploy the code as keys rotate.', 'Use an IAM role with an AmazonDynamoDBReadOnlyAccess policy applied to the EC2 instances.', 'Run all code with only AWS account root user access keys to ensure maximum access to services.', 'Use an IAM role with Administrator access applied to the EC2 instance.'],
      answer: 1,
    },
    {
      question: 'A Developer migrated a web application to AWS. As part of the migration, the Developer implemented an automated continuous integration/continuous improvement (CI/CD) process using a blue/green deployment. The deployment provisions new Amazon EC2 instances in an Auto Scaling group behind a new Application Load Balancer. After the migration was completed, the Developer began receiving complaints from users getting booted out of the system. The system also requires users to log in after every new deployment. How can these issues be resolved?',
      options: ['Use rolling updates instead of a blue/green deployment.', 'Externalize the user sessions to Amazon ElastiCache.', 'Turn on sticky sessions in the Application Load Balancer.', 'Use multicast to replicate session information.'],
      answer: 1,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 9 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET9 = {
  name: 'AWS DVA-C02 — Set 9',
  questions: [
    {
      question: 'A Developer wants to insert a record into an Amazon DynamoDB table as soon as a new file is added to an Amazon S3 bucket. Which set of steps would be necessary to achieve this?',
      options: ['Create an event with Amazon CloudWatch Events that will monitor the S3 bucket and then insert the records into DynamoDB.', 'Configure an S3 event to invoke a Lambda function that inserts records into DynamoDB.', 'Create a Lambda function that will poll the S3 bucket and then insert the records into DynamoDB.', 'Create a cron job that will run at a scheduled time and insert the records into DynamoDB.'],
      answer: 1,
    },
    {
      question: 'A company has implemented AWS CodeDeploy as part of its cloud native CI/CD stack. The company enables automatic rollbacks while deploying a new version of a popular web application from in-place to Amazon EC2. What occurs if the deployment of the new version fails due to code regression?',
      options: ['The last known good deployment is automatically restored using the snapshot stored in Amazon S3.', 'CodeDeploy switches the Amazon Route 53 alias records back to the known good green deployment and terminates the failed blue deployment.', 'A new deployment of the last known version of the application is deployed with a new deployment ID.', 'AWS CodePipeline promotes the most recent deployment with a SUCCEEDED status to production.'],
      answer: 2,
    },
    {
      question: 'A Developer uses Amazon S3 buckets for static website hosting. The Developer creates one S3 bucket for the code and another S3 bucket for the assets, such as image and video files. Access is denied when a user attempts to access the assets bucket from the code bucket, with the website application showing a 403 error. How should the Developer solve this issue?',
      options: ['Create an IAM role and apply it to the assets bucket for the code bucket to be granted access.', 'Edit the bucket policy of the assets bucket to allow access from the code bucket.', 'Edit the bucket policy of the assets bucket to open access to all principals.', 'Change the code bucket to use AWS Lambda functions instead of static website hosting.'],
      answer: 1,
    },
    {
      question: 'A company has implemented AWS CodePipeline to automate its release pipelines. The Development team is writing an AWS Lambda function what will send notifications for state changes of each of the actions in the stages. Which steps must be taken to associate the Lambda function with the event source?',
      options: ['Create a trigger that invokes the Lambda function from the Lambda console by selecting CodePipeline as the event source.', 'Create an event trigger and specify the Lambda function from the CodePipeline console.', 'Create an Amazon CloudWatch alarm that monitors status changes in Code Pipeline and triggers the Lambda function.', 'Create an Amazon CloudWatch Events rule that uses CodePipeline as an event source.'],
      answer: 1,
    },
    {
      question: 'A Developer has built an application running on AWS Lambda using AWS Serverless Application Model (AWS SAM). What is the correct order of execution to successfully deploy the application?',
      options: ['1. Build the SAM template in Amazon EC2. 2. Package the SAM template to Amazon EBS storage. 3. Deploy the SAM template from Amazon EBS.', '1. Build the SAM template locally. 2. Package the SAM template onto Amazon S3. 3. Deploy the SAM template from Amazon S3.', '1. Build the SAM template locally. 2. Deploy the SAM template from Amazon S3. 3. Package the SAM template for use.', '1. Build the SAM template locally. 2. Package the SAM template from AWS CodeCommit. 3. Deploy the SAM template to CodeCommit.'],
      answer: 1,
    },
    {
      question: 'A company wants to migrate an imaging service to Amazon EC2 while following security best practices. The images are sourced and read from a non-public Amazon S3 bucket. What should a Developer do to meet these requirements?',
      options: ['Create an IAM user with read-only permissions for the S3 bucket. Temporarily store the user credentials in the Amazon EBS volume of the EC2 instance.', 'Create an IAM user with read-only permissions for the S3 bucket. Temporarily store the user credentials in the user data of the EC2 instance.', 'Create an EC2 service role with read-only permissions for the S3 bucket. Attach the role to the EC2 instance.', 'Create an S3 service role with read-only permissions for the S3 bucket. Attach the role to the EC2 instance.'],
      answer: 2,
    },
    {
      question: 'An application ingests a large number of small messages and stores them in a database. The application uses AWS Lambda. A Development team is making changes to the application\'s processing logic. In testing, it is taking more than 15 minutes to process each message. The team is concerned the current backend may time out. Which changes should be made to the backend system to ensure each message is processed in the MOST scalable way?',
      options: ['Add the messages to an Amazon SQS queue. Set up and Amazon EC2 instance to poll the queue and process messages as they arrive.', 'Add the messages to an Amazon SQS queue. Set up Amazon EC2 instances in an Auto Scaling group to poll the queue and process the messages as they arrive.', 'Create a support ticket to increase the Lambda timeout to 60 minutes to allow for increased processing time.', 'Change the application to directly insert the body of the message into an Amazon RDS database.'],
      answer: 1,
    },
    {
      question: 'A Software Engineer developed an AWS Lambda function in Node.js to do some CPU-intensive data processing. With the default settings, the Lambda function takes about 5 minutes to complete. Which approach should a Developer take to increase the speed of completion?',
      options: ['Instead of using Node.js, rewrite the Lambda function using Python.', 'Instead of packaging the libraries in the ZIP file with the function, move them to a Lambda layer and use the layer with the function.', 'Allocate the maximum available CPU units to the function.', 'Increase the available memory to the function.'],
      answer: 3,
    },
    {
      question: 'An online retail company has deployed a serverless application with AWS Lambda, Amazon API Gateway, Amazon S3, and Amazon DynamoDB using AWS CloudFormation. The company rolled out a new release with major upgrades to the Lambda function and deployed the release to production. Subsequently, the application stopped working. Which solution should bring the application back up as quickly as possible?',
      options: ['Redeploy the application on Amazon EC2 so the Lambda function can resolve dependencies.', 'Migrate DynamoDB to Amazon RDS and redeploy the Lambda function.', 'Roll back the Lambda function to the previous version.', 'Deploy the latest Lambda function in a different Region.'],
      answer: 2,
    },
    {
      question: 'A Developer has a legacy application that is hosted on-premises. Other applications hosted on AWS depend on the on-premises application for proper functioning. In case of any application errors, the Developer wants to be able to use Amazon CloudWatch to monitor and troubleshoot all applications from one place. How can the Developer accomplish this?',
      options: ['Install an AWS SDK on the on-premises server to automatically send logs to CloudWatch.', 'Download the CloudWatch agent to the on-premises server. Configure the agent to use IAM user credentials with permissions for CloudWatch.', 'Upload log files from the on-premises server to Amazon S3 and have CloudWatch read the files.', 'Upload log files from the on-premises server to an Amazon EC2 instance and have the instance forward the logs to CloudWatch.'],
      answer: 1,
    },
    {
      question: 'A company is developing an application that will be accessed through the Amazon API Gateway REST API. Registered users should be the only ones who can access certain resources of this API. The token being used should expire automatically and needs to be refreshed periodically. How can a Developer meet these requirements?',
      options: ['Create an Amazon Cognito identity pool, configure the Amazon Cognito Authorizer in API Gateway, and use the temporary credentials generated by the identity pool.', 'Create and maintain a database record for each user with a corresponding token and use an AWS Lambda authorizer in API Gateway.', 'Create an Amazon Cognito user pool, configure the Cognito Authorizer in API Gateway, and use the identity or access token.', 'Create an IAM user for each API user, attach an invoke permissions policy to the API, and use an IAM authorizer in API Gateway.'],
      answer: 2,
    },
    {
      question: 'A Developer is leveraging a Border Gateway Protocol (BGP)-based AWS VPN connection to connect from on-premises to Amazon EC2 instances in the Developer\'s account. The Developer is able to access an EC2 instance in subnet A, but is unable to access an EC2 instance in subnet B in the same VPC. Which logs can the Developer use to verify whether the traffic is reaching subnet B?',
      options: ['VPN logs.', 'BGP logs', 'VPC Flow Logs.', 'AWS CloudTrail logs.'],
      answer: 2,
    },
    {
      question: 'A Developer has created a new AWS IAM user that has s3:putObject permission to write to a specific Amazon S3 bucket. This S3 bucket uses server-side encryption with AWS KMS managed keys (SSE-KMS) as the default encryption. Using the access key and secret key of the IAM user, the application received an access denied error when calling the PutObject API. How can this issue be resolved?',
      options: ['Update the policy of the IAM user to allow the s3:EncryptionConfiguration action.', 'Update the bucket policy of the S3 bucket to allow the IAM user to upload objects.', 'Update the policy of the IAM user to allow the kms:GenerateDataKey action.', 'Update the ACL of the S3 bucket to allow the IAM user to upload objects.'],
      answer: 2,
    },
    {
      question: 'A company has a web application that uses an Amazon Cognito user pool for authentication. The company wants to create a login page with the company logo. What should a Developer do to meet these requirements?',
      options: ['Create a hosted user interface in Amazon Cognito and customize it with the company logo.', 'Create a login page with the company logo and upload it to Amazon Cognito.', 'Create a login page in Amazon API Gateway with the logo and save the link in Amazon Cognito.', 'Upload the logo to the Amazon Cognito app settings and point to the logo on a custom login page.'],
      answer: 0,
    },
    {
      question: 'A Developer is working on an AWS Lambda function that accesses Amazon DynamoDB. The Lambda function must retrieve an item and update some of its attributes, or create the item if it does not exist. The Lambda function has access to the primary key. Which IAM permissions should the Developer request for the Lambda function to achieve this functionality?',
      options: ['dynamodb:DeleteItem dynamodb:GetItem dynamodb:PutItem.', 'dynamodb:UpdateItem dynamodb:GetItem dynamodb:DescribeTable.', 'dynamodb:GetRecords dynamodb:PutItem dynamodb:UpdateTable.', 'dynamodb:UpdateItem dynamodb:GetItem dynamodb:PutItem.'],
      answer: 3,
    },
    {
      question: 'A Developer is storing sensitive data generated by an application in Amazon S3. The Developer wants to encrypt the data at rest. A company policy requires an audit trail of when the master key was used and by whom. Which encryption option will meet these requirements?',
      options: ['Server-side encryption with Amazon S3 managed keys (SSE-S3).', 'Server-side encryption with AWS KMS managed keys (SSE-KMS).', 'Server-side encryption with customer-provided keys (SSE-C).', 'Server-side encryption with self-managed keys.'],
      answer: 1,
    },
    {
      question: 'A company is developing a web application that allows its employees to upload a profile picture to a private Amazon S3 bucket. There is no size limit for the profile pictures, which should be displayed every time an employee logs in. For security reasons, the pictures cannot be publicly accessible. What is a viable long-term solution for this scenario?',
      options: ['Generate a presigned URL when a picture is uploaded. Save the URL in an Amazon DynamoDB table. Return the URL to the browser when the employee logs in.', 'Save the picture\'s S3 key in an Amazon DynamoDB table. Create an Amazon S3 VPC endpoint to allow the employees to download pictures once they log in.', 'Encode a picture using base64. Save the base64 string in an Amazon DB table. Allow the browser to retrieve the string and convert it to a picture.', 'Save the picture\'s S3 key in an Amazon DynamoDB table. Use a function to generate a presigned URL every time an employee logs in. Return the URL to the browser.'],
      answer: 1,
    },
    {
      question: 'A Developer is going to deploy an AWS Lambda function that requires significant CPU utilization. Which approach will MINIMIZE the average runtime of the function?',
      options: ['Deploy the function into multiple AWS Regions.', 'Deploy the function into multiple Availability Zones.', 'Deploy the function using Lambda layers.', 'Deploy the function with its memory allocation set to the maximum amount.'],
      answer: 3,
    },
    {
      question: 'A company has a legacy application that was migrated to a fleet of Amazon EC2 instances. The application stores data in a MySQL database that is currently installed on a single EC2 instance. The company has decided to migrate the database from the EC2 instance to MySQL on Amazon RDS. What should the Developer do to update the application to support data storage in Amazon RDS?',
      options: ['Update the database connection parameters in the application to point to the new RDS instance.', 'Add a script to the EC2 instance that implements an AWS SDK for requesting database credentials.', 'Create a new EC2 instance with an IAM role that allows access to the new RDS database.', 'Create an AWS Lambda function that will route traffic, from the EC2 instance to the RDS database.'],
      answer: 0,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 10 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET10 = {
  name: 'AWS DVA-C02 — Set 10',
  questions: [
    {
      question: 'A Developer has an e-commerce API hosted on Amazon ECS. Variable and spiking demand on the application is causing order processing to take too long. The application processes Amazon SQS queues. The ApproximateNumberOfMessagesVisible metric spikes at very high values throughout the day, which cause Amazon CloudWatch alarm breaches. Other ECS metrics for the API containers are well within limits. What can the Developer implement to improve performance while keeping costs low?',
      options: ['Target tracking scaling policy.', 'Docker Swarm.', 'Service scheduler.', 'Step scaling policy.'],
      answer: 0,
    },
    {
      question: 'A Developer wants to build an application that will allow new users to register and create new user accounts. The application must also allow users with social media accounts to log in using their social media credentials. Which AWS service or feature can be used to meet these requirements?',
      options: ['AWS IAM.', 'Amazon Cognito identity pools.', 'Amazon Cognito user pools.', 'AWS Directory Service.'],
      answer: 2,
    },
    {
      question: 'A company wants to implement authentication for its new REST service using Amazon API Gateway. To authenticate the calls, each request must include HTTP headers with a client ID and user ID. These credentials must be compared to authentication data in an Amazon DynamoDB table. What MUST the company do to implement this authentication in API Gateway?',
      options: ['Implement an AWS Lambda authorizer that references the DynamoDB authentication table.', 'Create a model that requires the credentials, then grant API Gateway access to the authentication table.', 'Modify the integration requests to require the credentials, then grant API Gateway access to the authentication table.', 'Implement an Amazon Cognito authorizer that references the DynamoDB authentication table.'],
      answer: 0,
    },
    {
      question: 'A Developer is trying to make API calls using SDK. The IAM user credentials used by the application require multi-factor authentication for all API calls. Which method the Developer use to access the multi-factor authentication protected API?',
      options: ['GetFederationToken.', 'GetCallerIdentity.', 'GetSessionToken.', 'DecodeAutherizationMessage.'],
      answer: 2,
    },
    {
      question: 'When developing an AWS Lambda function that processes Amazon Kinesis Data Streams, Administrators within the company must receive a notice that includes the processed data. How should the Developer write the function to send processed data to the Administrators?',
      options: ['Separate the Lambda handler from the core logic.', 'Use Amazon CloudWatch Events to send the processed data.', 'Publish the processed data to an Amazon SNS topic.', 'Push the processed data to Amazon SQS.'],
      answer: 2,
    },
    {
      question: 'A Developer is storing sensitive documents in Amazon S3 that will require encryption at rest. The encryption keys must be rotated annually, at least. What is the easiest way to achieve this?',
      options: ['Encrypt the data before sending it to Amazon S3.', 'Import a custom key into AWS KMS with annual rotation enabled.', 'Use AWS KMS with automatic key rotation.', 'Export a key from AWS KMS to encrypt the data.'],
      answer: 2,
    },
    {
      question: 'A company is creating a REST service using an Amazon API Gateway with AWS Lambda integration. The service must run different versions for testing purposes. What would be the BEST way to accomplish this?',
      options: ['Use an x-Version header to denote which version is being called and pass that header to the Lambda function(s).', 'Create an API Gateway Lambda authorizer to route API clients to the correct API version.', 'Create an API Gateway resource policy to isolate versions and provide context to the Lambda function(s).', 'Deploy the API versions as unique stages with unique endpoints and use stage variables to provide further context.'],
      answer: 3,
    },
    {
      question: 'A Developer must encrypt a 100-GB object using AWS KMS. What is the BEST approach?',
      options: ['Make an Encrypt API call to encrypt the plaintext data as ciphertext using a customer master key (CMK).', 'Make an Encrypt API call to encrypt the plaintext data as ciphertext using a customer master key (CMK) with imported key material.', 'Make an GenerateDataKey API call that returns a plaintext key and an encrypted copy of a data key. Use a plaintext key to encrypt the data.', 'Make an GenerateDataKeyWithoutPlaintext API call that returns an encrypted copy of a data key. Use an encrypted key to encrypt the data.'],
      answer: 2,
    },
    {
      question: 'A Development team would like to migrate their existing application code from a GitHub repository to AWS CodeCommit. What needs to be created before they can migrate a cloned repository to CodeCommit over HTTPS?',
      options: ['A GitHub secure authentication token.', 'A public and private SSH key file.', 'A set of Git credentials generated from IAM.', 'An Amazon EC2 IAM role with CodeCommit permissions.'],
      answer: 2,
    },
    {
      question: 'What item operation allows the retrieval of multiple items from a DynamoDB table in a single API call?',
      options: ['GetItem.', 'BatchGetItem.', 'GetMultipleItems.', 'GetItemRange.'],
      answer: 1,
    },
    {
      question: 'After launching an instance that you intend to serve as a NAT (Network Address Translation) device in a public subnet you modify your route tables to have the NAT device be the target of internet bound traffic of your private subnet. When you try and make an outbound connection to the Internet from an instance in the private subnet, you are not successful. NAT device be the target of internet bound traffic of your private subnet. Which of the following steps could resolve the issue?',
      options: ['Attaching a second Elastic Network interface (ENI) to the NAT instance, and placing it in the private subnet.', 'Attaching a second Elastic Network Interface (ENI) to the instance in the private subnet, and placing it in the public subnet.', 'Disabling the Source/Destination Check attribute on the NAT instance.', 'Attaching an Elastic IP address to the instance in the private subnet.'],
      answer: 2,
    },
    {
      question: 'You attempt to store an object in the US-STANDARD region in Amazon S3, and receive a confirmation that it has been successfully stored. You then immediately make another API call and attempt to read this object. S3 tells you that the object does not exist. What could explain this behavior?',
      options: ['US-STANDARD uses eventual consistency and it can take time for an object to be readable in a bucket.', 'Objects in Amazon S3 do not become visible until they are replicated to a second region.', 'US-STANDARD imposes a 1 second delay before new objects are readable.', 'ou exceeded the bucket object limit, and once this limit is raised the object will be visible.'],
      answer: 0,
    },
    {
      question: 'You have an environment that consists of a public subnet using Amazon VPC and 3 instances that are running in this subnet. These three instances can successfully communicate with other hosts on the Internet. You launch a fourth instance in the same subnet, using the same AMI and security group configuration you used for the others, but find that this instance cannot be accessed from the Internet. What should you do to enable internet access?',
      options: ['Deploy a NAT instance into the public subnet.', 'Modify the routing table for the public subnet.', 'Configure a publically routable IP Address In the host OS of the fourth instance.', 'Assign an Elastic IP address to the fourth instance.'],
      answer: 3,
    },
    {
      question: 'What is the format of structured notification messages sent by Amazon SNS?',
      options: ['An XML object containing Messageld, UnsubscribeURL, Subject, Message and other values.', 'An JSON object containing Messageld, DuplicateFlag, Message and other values.', 'An XML object containing Messageld, DuplicateFlag, Message and other values.', 'An JSON object containing Messageld, unsubscribeURL, Subject, Message and other values.'],
      answer: 3,
    },
    {
      question: 'When uploading an object, what request header can be explicitly specified in a request to Amazon S3 to encrypt object data when saved on the server side?',
      options: ['x-amz-storage-class.', 'Content-MD5.', 'x-amz-security-token.', 'x-amz-server-side-encryption.'],
      answer: 3,
    },
    {
      question: 'Which code snippet below returns the URL of a load balanced web site created in CloudFormation with an AWS::ElasticLoadBalancing::LoadBalancer resource name ElasticLoad Balancer?',
      options: ['"Fn::Join":[ "".["http://", {Fn::GetAtt": [ "ElasticLoadBalancer","DNSName"]}]].', '"Fn::Join":[ "".["http://", {Fn::GetAtt": [ "ElasticLoadBalancer","Url"]}]].', '"Fn::Join":[ "".["http://", {"Ref : "ElasticLoadBalancerUrl"}]].', '"Fn::Join":[ "".["http://", {"Ref : "ElasticLoadBalancer","DNSName"}]].'],
      answer: 0,
    },
    {
      question: 'What happens, by default, when one of the resources in a CloudFormation stack cannot be created?',
      options: ['Previously-created resources are kept but the stack creation terminates.', 'Previously-created resources are deleted and the stack creation terminates.', 'The stack creation continues, and the final results indicate which steps failed.', 'CloudFormation templates are parsed in advance so stack creation is guaranteed to succeed.'],
      answer: 1,
    },
    {
      question: 'How can software determine the public and private IP addresses of the Amazon EC2 instance that it is running on?',
      options: ['Query the appropriate Amazon CloudWatch metric.', 'Use ipconfig or ifconfig command.', 'Query the local instance userdata.', 'Query the local instance metadata.'],
      answer: 3,
    },
    {
      question: 'EC2 instances are launched from Amazon Machine images (AMIs). A given public AMI can:',
      options: ['Be used to launch EC2 Instances in any AWS region.', 'Only be used to launch EC2 instances in the same country as the AMI is stored.', 'Only be used to launch EC2 instances in the same AWS region as the AMI is stored.', 'Only be used to launch EC2 instances in the same AWS availability zone as the AMI is stored.'],
      answer: 2,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 11 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET11 = {
  name: 'AWS DVA-C02 — Set 11',
  questions: [
    {
      question: 'When using a large Scan operation in DynamoDB, what technique can be used to minimize the impact of a scan on a table\'s provisioned throughput?',
      options: ['Set a smaller page size for the scan.', 'Use parallel scans.', 'Define a range index on the table.', 'Prewarm the table by updating all items.'],
      answer: 0,
    },
    {
      question: 'Company C has recently launched an online commerce site for bicycles on AWS. They have a Product DynamoDB table that stores details for each bicycle, such as, manufacturer, color, price, quantity and size to display in the online store. Due to customer demand, they want to include an image for each bicycle along with the existing details. Which approach below provides the least impact to provisioned throughput on the Product table?',
      options: ['Serialize the image and store it in multiple DynamoDB tables.', 'Create an Images DynamoDB table to store the Image with a foreign key constraint to the Product table.', 'Add an image data type to the Product table to store the images in binary format.', 'Store the images in Amazon S3 and add an S3 URL pointer to the Product table item for each image.'],
      answer: 3,
    },
    {
      question: 'When a Simple Queue Service message triggers a task that takes 5 minutes to complete, which process below will result in successful processing of the message and remove it from the queue while minimizing the chances of duplicate processing?',
      options: ['Retrieve the message with an increased visibility timeout, process the message, delete the message from the queue.', 'Retrieve the message with an increased visibility timeout, delete the message from the queue, process the message.', 'Retrieve the message with increased DelaySeconds, process the message, delete the message from the queue.', 'Retrieve the message with increased DelaySeconds, delete the message from the queue, process the message.'],
      answer: 0,
    },
    {
      question: 'Company A has an S3 bucket containing premier content that they intend to make available to only paid subscribers of their website. The S3 bucket currently has default permissions of all objects being private to prevent inadvertent exposure of the premier content to non-paying website visitors. How can Company A provide only paid subscribers the ability to download a premier content file in the S3 bucket?',
      options: ['Apply a bucket policy that grants anonymous users to download the content from the S3 bucket.', 'Generate a pre-signed object URL for the premier content file when a paid subscriber requests a download.', 'Add a bucket policy that requires Multi-Factor Authentication for requests to access the S3 bucket objects.', 'Enable server side encryption on the S3 bucket for data protection against the non-paying website visitors.'],
      answer: 1,
    },
    {
      question: 'Which of the following is an example of a good DynamoDB hash key schema for provisioned throughput efficiency?',
      options: ['User ID, where the application has many different users.', 'Status Code where most status codes are the same.', 'Device ID, where one is by far more popular than all the others.', 'Game Type, where there are three possible game types.'],
      answer: 0,
    },
    {
      question: 'An application stores payroll information nightly in DynamoDB for a large number of employees across hundreds of offices. Item attributes consist of individual name, office identifier, and cumulative daily hours. Managers run reports for ranges of names working in their office. One query is: Return all Items in this office for names starting with A through E. Which table configuration will result in the lowest impact on provisioned throughput for this query?',
      options: ['Configure the table to have a hash index on the name attribute, and a range index on the office identifier.', 'Configure the table to have a range index on the name attribute, and a hash index on the office identifier.', 'Configure a hash index on the name attribute and no range index.', 'Configure a hash index on the office identifier attribute and no range index.'],
      answer: 1,
    },
    {
      question: 'What is one key difference between an Amazon EBS-backed and an instance-store backed instance?',
      options: ['Virtual Private Cloud requires EBS backed instances.', 'Amazon EBS-backed instances can be stopped and restarted.', 'Auto scaling requires using Amazon EBS-backed instances.', 'Instance-store backed instances can be stopped and restarted.'],
      answer: 1,
    },
    {
      question: 'Games-R-Us is launching a new game app for mobile devices. Users will log into the game using their existing Facebook account and the game will record player data and scoring information directly to a DynamoDB table. What is the most secure approach for signing requests to the DynamoDB API?',
      options: ['Create an IAM user with access credentials that are distributed with the mobile app to sign the requests.', 'Distribute the AWS root account access credentials with the mobile app to sign the requests.', 'Request temporary security credentials using web identity federation to sign the requests.', 'Establish cross account access between the mobile app and the DynamoDB table to sign the requests'],
      answer: 2,
    },
    {
      question: 'In DynamoDB, what type of HTTP response codes indicate that a problem was found with the client request sent to the service?',
      options: ['5xx HTTP response code.', '200 HTTP response code.', '306 HTTP response code.', '4xx HTTP response code.'],
      answer: 3,
    },
    {
      question: 'Company B provides an online image recognition service and utilizes SQS to decouple system components for scalability The SQS consumers poll the imaging queue as often as possible to keep end-to-end throughput as high as possible. However, Company B is realizing that polling in tight loops is burning CPU cycles and increasing costs with empty responses. How can Company B reduce the number of empty responses?',
      options: ['Set the imaging queue visibility Timeout attribute to 20 seconds.', 'Set the Imaging queue ReceiveMessageWaitTimeSeconds attribute to 20 seconds.', 'Set the imaging queue MessageRetentionPeriod attribute to 20 seconds.', 'Set the DelaySeconds parameter of a message to 20 seconds.'],
      answer: 1,
    },
    {
      question: 'An Amazon S3 bucket, myawsbucket is configured with website hosting in Tokyo region, what is the region-specific website endpoint?',
      options: ['www.myawsbucket.ap-northeast-1.amazonaws.com.', 'myawsbucket.s3-website-ap-northeast-1.amazonaws.com.', 'myawsbucket.amazonaws.com.', 'myawsbucket.tokyo.amazonaws.com.'],
      answer: 1,
    },
    {
      question: 'You are inserting 1000 new items every second in a DynamoDB table. Once an hour these items are analyzed and then are no longer needed. You need to minimize provisioned throughput, storage, and API calls. Given these requirements, what is the most efficient way to manage these Items after the analysis?',
      options: ['Retain the items in a single table.', 'Delete items individually over a 24 hour period.', 'Delete the table and create a new table per hour.', 'Create a new table per hour.'],
      answer: 2,
    },
    {
      question: 'You run an ad-supported photo sharing website using S3 to serve photos to visitors of your site. At some point you find out that other sites have been linking to the photos on your site, causing loss to your business. What is an effective method to mitigate this?',
      options: ['Store photos on an EBS volume of the web server.', 'Remove public read access and use signed URLs with expiry dates.', 'Use CloudFront distributions for static content.', 'Block the IPs of the offending websites in Security Groups.'],
      answer: 1,
    },
    {
      question: 'You are providing AWS consulting services for a company developing a new mobile application that will be leveraging Amazon SNS Mobile Push for push notifications. In order to send direct notification messages to individual devices each device registration identifier or token needs to be registered with SNS; however the developers are not sure of the best way to do this. You advise them to:',
      options: ['Bulk upload the device tokens contained in a CSV file via the AWS Management Console.', 'Let the push notification service (e.g. Amazon Device Messaging) handle the registration.', 'Implement a token vending service to handle the registration.', 'Call the CreatePlatformEndPoint API function to register multiple device tokens.'],
      answer: 3,
    },
    {
      question: 'Which of the following statements about SQS is true?',
      options: ['Messages will be delivered exactly once and messages will be delivered in First in, First out order.', 'Messages will be delivered exactly once and message delivery order is indeterminate.', 'Messages will be delivered one or more times and messages will be delivered in First in, First out order.', 'Messages will be delivered one or more times and message delivery order is indeterminate.'],
      answer: 3,
    },
    {
      question: 'What type of block cipher does Amazon S3 offer for server side encryption?',
      options: ['Triple DES.', 'Advanced Encryption Standard.', 'Blowfish.', 'RC5.'],
      answer: 1,
    },
    {
      question: 'A Development team wants to instrument their code to provide more detailed information to AWS X-Ray than simple outgoing and incoming requests. This will generate large amounts of data, so the Development team wants to implement indexing so they can filter the data. What should the Development team do to achieve this?',
      options: ['Add annotations to the segment document and the code.', 'Add metadata to the segment document and the code.', 'Configure the necessary X-Ray environment variables.', 'Install required plugins for the appropriate AWS SDK.'],
      answer: 0,
    },
    {
      question: 'A team of Developers must migrate an application running inside an AWS Elastic Beanstalk environment from a Classic Load Balancer to an Application Load Balancer. Which steps should be taken to accomplish the task using the AWS Management Console?',
      options: ['1. Update the application code in the existing deployment. 2. Select a new load balancer type before running the deployment. 3. Deploy the new version of the application code to the environment.', '1. Create a new environment with the same configurations except for the load balancer type. 2. Deploy the same application version as used in the original environment. 3. Run the swap-environment-cnames action.', '1. Clone the existing environment, changing the associated load balancer type. 2. Deploy the same application version as used in the original environment. 3. Run the swap-environment-cnames action.', '1. Edit the environment definitions in the existing deployment. 2. Change the associated load balancer type according to the requirements. 3. Rebuild the environment with the new load balancer type.'],
      answer: 0,
    },
    {
      question: 'A company needs a version control system for collaborative software development. Features of the system must include the following: Support for batches of changes across multiple files. Parallel branching Version tracking. Which AWS service will meet these requirements?',
      options: ['AWS CodePipeline.', 'Amazon S3.', 'AWS Code Build.', 'AWS CodeCommit.'],
      answer: 3,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 12 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET12 = {
  name: 'AWS DVA-C02 — Set 12',
  questions: [
    {
      question: 'A company is using continuous integration and continuous delivery systems. A Developer now needs to automate a software package deployment to both Amazon EC2 instances and virtual servers running on-premises. Which AWS service should be used to accomplish this?',
      options: ['AWS CodePipeline.', 'AWS CodeBuild.', 'AWS Elastic Beanstalk.', 'AWS CodeDeploy.'],
      answer: 3,
    },
    {
      question: 'A Developer created a new AWS account and must create a scalable AWS Lambda function that meets the following requirements for concurrent execution: Average execution time of 100 seconds 50 requests per second. Which step must be taken prior to deployment to prevent errors?',
      options: ['Implement dead-letter queues to capture invocation errors.', 'Add an event source from Amazon API Gateway to the Lambda function.', 'Implement error handling within the application code.', 'Contact AWS Support to increase the concurrent execution limits.'],
      answer: 3,
    },
    {
      question: 'A Developer is building a three-tier web application that should be able to handle a minimum of 5000 requests per minute. Requirements state that the web tier should be completely stateless while the application maintains session state for the users. How can session data be externalized, keeping latency at the LOWEST possible value?',
      options: ['Create an Amazon RDS instance, then implement session handling at the application level to leverage a database inside the RDS database instance for session data storage.', 'Implement a shared file system solution across the underlying Amazon EC2 instances, then implement session handling at the application level to leverage the shared file system for session data storage.', 'Create an Amazon ElastiCache Memcached cluster, then implement session handling at the application level to leverage the cluster for session data storage.', 'Create an Amazon DynamoDB table, then implement session handling at the application level to leverage the table for session data storage.'],
      answer: 2,
    },
    {
      question: 'An Amazon DynamoDB table uses a Global Secondary Index (GSI) to support read queries. The primary table is write-heavy, whereas the GSI is used for read operations. Looking at Amazon CloudWatch metrics, the Developer notices that write operations to the primary table are throttled frequently under heavy write activity. However, write capacity units to the primary table are available and not fully consumed. Why is the table being throttled?',
      options: ['The GSI write capacity units are underprovisioned.', 'There are not enough read capacity units on the primary table.', 'Amazon DynamoDB Streams is not enabled on the table.', 'A large write operation is being performed against another table.'],
      answer: 0,
    },
    {
      question: 'A company runs an e-commerce website that uses Amazon DynamoDB where pricing for items is dynamically updated in real time. At any given time, multiple updates may occur simultaneously for pricing information on a particular product. This is causing the original editor\'s changes to be overwritten without a proper review process. Which DynamoDB write option should be selected to prevent this overwriting?',
      options: ['Concurrent writes.', 'Conditional writes.', 'Atomic writes.', 'Batch writes.'],
      answer: 1,
    },
    {
      question: 'A Developer has been asked to create an AWS Lambda function that is triggered any time updates are made to items in an Amazon DynamoDB table. The function has been created, and appropriate permissions have been added to the Lambda execution role. Amazon DynamoDB streams have been enabled for the table, but the function is still not being triggered. Which option would enable DynamoDB table updates to trigger the Lambda function?',
      options: ['Change the StreamViewType parameter value to NEW_AND_OLD_IMAGES for the DynamoDB table.', 'Configure event source mapping for the Lambda function.', 'Map an Amazon SNS topic to the DynamoDB streams.', 'Increase the maximum execution time (timeout) setting of the Lambda function.'],
      answer: 1,
    },
    {
      question: 'A company is running a Docker application on Amazon ECS. The application must scale based on user load in the last 15 seconds. How should a Developer instrument the code so that the requirement can be met?',
      options: ['Create a high-resolution custom Amazon CloudWatch metric for user activity data, then publish data every 30 seconds.', 'Create a high-resolution custom Amazon CloudWatch metric for user activity data, then publish data every 5 seconds.', 'Create a standard-resolution custom Amazon CloudWatch metric for user activity data, then publish data every 30 seconds.', 'Create a standard-resolution custom Amazon CloudWatch metric for user activity data, then publish data every 5 seconds.'],
      answer: 1,
    },
    {
      question: 'A company needs to ingest terabytes of data each hour from thousands of sources that are delivered almost continually throughout the day. The volume of messages generated varies over the course of the day. Messages must be delivered in real time for fraud detection and live operational dashboards. Which approach will meet these requirements?',
      options: ['Send the messages to an Amazon SQS queue, then process the messages by using a fleet of Amazon EC2 instances.', 'Use the Amazon S3 API to write messages to an S3 bucket, then process the messages by using Amazon Redshift.', 'Use AWS Data Pipeline to automate the movement and transformation of data.', 'Use Amazon Kinesis Data Streams with Kinesis Client Library to ingest and deliver messages.'],
      answer: 3,
    },
    {
      question: 'A Developer is trying to deploy a serverless application using AWS CodeDeploy. The application was updated and needs to be redeployed. What file does the Developer need to update to push that change through CodeDeploy?',
      options: ['dockerrun.aws.json.', 'buildspec.yml.', 'appspec.yml.', 'ebextensions.config.'],
      answer: 2,
    },
    {
      question: 'A Developer is working on an application that handles 10MB documents that contain highly-sensitive data. The application will use AWS KMS to perform clientside encryption. What steps must be followed?',
      options: ['Invoke the Encrypt API passing the plaintext data that must be encrypted, then reference the customer managed key ARN in the KeyId parameter.', 'Invoke the GenerateRandom API to get a data encryption key, then use the data encryption key to encrypt the data.', 'Invoke the GenerateDataKey API to retrieve the encrypted version of the data encryption key to encrypt the data.', 'Invoke the GenerateDataKey API to retrieve the plaintext version of the data encryption key to encrypt the data.'],
      answer: 3,
    },
    {
      question: 'A company needs to distribute firmware updates to its customers around the world. Which service will allow easy and secure control of the access to the downloads at the lowest cost?',
      options: ['Use Amazon CloudFront with signed URLs for Amazon S3.', 'Create a dedicated Amazon CloudFront Distribution for each customer.', 'Use Amazon CloudFront with AWS Lambda@Edge.', 'Use Amazon API Gateway and AWS Lambda to control access to an S3 bucket.'],
      answer: 0,
    },
    {
      question: 'An application writes items to an Amazon DynamoDB table. As the application scales to thousands of instances, calls to the DynamoDB API generate occasional ThrottlingException errors. The application is coded in a language incompatible with the AWS SDK. How should the error be handled?',
      options: ['Add exponential backoff to the application logic.', 'Use Amazon SQS as an API message bus.', 'Pass API calls through Amazon API Gateway.', 'Send the items to DynamoDB through Amazon Kinesis Data Firehose.'],
      answer: 0,
    },
    {
      question: 'An e-commerce web application that shares session state on-premises is being migrated to AWS. The application must be fault tolerant, natively highly scalable, and any service interruption should not affect the user experience. What is the best option to store the session state?',
      options: ['Store the session state in Amazon ElastiCache.', 'Store the session state in Amazon CloudFront.', 'Store the session state in Amazon S3.', 'Enable session stickiness using elastic load balancers.'],
      answer: 0,
    },
    {
      question: 'A Developer is creating a template that uses AWS CloudFormation to deploy an application. This application is serverless and uses Amazon API Gateway, Amazon DynamoDB, and AWS Lambda. Which tool should the Developer use to define simplified syntax for expressing serverless resources?',
      options: ['CloudFormation serverless intrinsic functions.', 'AWS serverless express.', 'An AWS serverless application model.', 'A CloudFormation serverless plugin.'],
      answer: 2,
    },
    {
      question: 'A Developer must analyze performance issues with production-distributed applications written as AWS Lambda functions. These distributed Lambda applications invoke other components that make up the applications. How should the Developer identify and troubleshoot the root cause of the performance issues in production?',
      options: ['Add logging statements to the Lambda functions, then use Amazon CloudWatch to view the logs.', 'Use AWS Cloud Trail and then examine the logs.', 'Use AWS X-Ray, then examine the segments and errors.', 'Run Amazon Inspector agents and then analyze performance.'],
      answer: 2,
    },
    {
      question: 'A Developer wants to debug an application by searching and filtering log data. The application logs are stored in Amazon CloudWatch Logs. The Developer creates a new metric filter to count exceptions in the application logs. However, no results are returned from the logs. What is the reason that no filtered results are being returned?',
      options: ['A setup of the Amazon CloudWatch interface VPC endpoint is required for filtering the CloudWatch Logs in the VPC.', 'CloudWatch Logs only publishes metric data for events that happen after the filter is created.', 'The log group for CloudWatch Logs should be first streamed to Amazon Elasticsearch Service before metric filtering returns the results.', 'Metric data points for logs groups can be filtered only after they are exported to an Amazon S3 bucket.'],
      answer: 1,
    },
    {
      question: 'To include objects defined by the AWS Serverless Application Model (SAM) in an AWS CloudFormation template, in addition to Resources, what section MUST be included in the document root?',
      options: ['Conditions.', 'Globals.', 'Transform.', 'Properties.'],
      answer: 2,
    },
    {
      question: 'A company is using Amazon RDS MySQL instances for its application database tier and Apache Tomcat servers for its web tier. Most of the database queries from web applications are repeated read requests. Use of which AWS service would increase in performance by adding in-memory store for repeated read queries?',
      options: ['Amazon RDS Multi-AZ.', 'Amazon SQS.', 'Amazon ElastiCache.', 'Amazon RDS read replica.'],
      answer: 2,
    },
    {
      question: 'A Developer is investigating an issue whereby certain requests are passing through an Amazon API Gateway endpoint /MyAPI, but the requests do not reach the AWS Lambda function backing /MyAPI. The Developer found that a second Lambda function sometimes runs at maximum concurrency allowed for the given AWS account. How can the Developer address this issue?',
      options: ['Manually reduce the concurrent execution limit at the account level.', 'Add another API Gateway stage for /MyAPI, and shard the requests.', 'Configure the second Lambda function\'s concurrency execution limit.', 'Reduce the throttling limits in the API Gateway /MyAPI endpoint'],
      answer: 2,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 13 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET13 = {
  name: 'AWS DVA-C02 — Set 13',
  questions: [
    {
      question: 'A company is migrating a single-server, on-premises web application to AWS. The company intends to use multiple servers behind an Elastic Load Balancer (ELB) to balance the load, and will also store session data in memory on the web server. The company does not want to lose that session data if a server fails or goes offline, and it wants to minimize user\'s downtime. Where should the company move session data to MOST effectively reduce downtime and make users\' session data more fault tolerant?',
      options: ['An Amazon ElastiCache for Redis cluster.', 'A second Amazon EBS volume.', 'The web server\'s primary disk.', 'An Amazon EC2 instance dedicated to session data.'],
      answer: 0,
    },
    {
      question: 'A Developer has created a Lambda function and is finding that the function is taking longer to complete than expected. After some debugging, the Developer has discovered that increasing compute capacity would improve performance. How can the Developer increase the Lambda compute resources?',
      options: ['Run on a larger instance size with more compute capacity.', 'Increase the maximum execution time.', 'Specify a larger compute capacity when calling the Lambda function.', 'Increase the allocated memory for the Lambda function.'],
      answer: 3,
    },
    {
      question: 'A Developer is building a mobile application and needs any update to user profile data to be pushed to all devices accessing the specific identity. The Developer does not want to manage a back end to maintain the user profile data. What is the MOST efficient way for the Developer to achieve these requirements using Amazon Cognito?',
      options: ['Use Cognito federated identities.', 'Use a Cognito user pool.', 'Use Cognito Sync.', 'Use Cognito events.'],
      answer: 2,
    },
    {
      question: 'A company maintains a REST service using Amazon API Gateway and the API Gateway native API key validation. The company recently launched a new registration page, which allows users to sign up for the service. The registration page creates a new API key using CreateApiKey and sends the new key to the user. When the user attempts to call the API using this key, the user receives a 403 Forbidden error. Existing users are unaffected and can still call the API. What code updates will grant these new users access to the API?',
      options: ['The createDeployment method must be called so the API can be redeployed to include the newly created API key.', 'The updateAuthorizer method must be called to update the API\'s authorizer to include the newly created API key.', 'The importApiKeys method must be called to import all newly created API keys into the current stage of the API.', 'The createUsagePlanKey method must be called to associate the newly created API key with the correct usage plan.'],
      answer: 3,
    },
    {
      question: 'A Developer is writing a mobile application that allows users to view images from an S3 bucket. The users must be able to log in with their Amazon login, as well as Facebook and/or Google accounts. How can the Developer provide this authentication functionality?',
      options: ['Use Amazon Cognito with web identity federation.', 'Use Amazon Cognito with SAML-based identity federation.', 'Use AWS IAM Access/Secret keys in the application code to allow Get* on the S3 bucket.', 'Use AWS STS AssumeRole in the application code and assume a role with Get* permissions on the S3 bucket.'],
      answer: 0,
    },
    {
      question: 'A Developer wants access to make the log data of an application running on an EC2 instance available to systems administrators. Which of the following enables monitoring of this metric in Amazon CloudWatch?',
      options: ['Retrieve the log data from CloudWatch using the GetMetricData API call.', 'Retrieve the log data from AWS CloudTrail using the LookupEvents API call.', 'Launch a new EC2 instance, configure Amazon CloudWatch Events, and then install the application.', 'Install the Amazon CloudWatch Logs agent on the EC2 instance that the application is running on.'],
      answer: 3,
    },
    {
      question: 'A nightly batch job loads 1 million new records into a DynamoDB table. The records are only needed for one hour, and the table needs to be empty by the next night\'s batch job. Which is the MOST efficient and cost-effective method to provide an empty table?',
      options: ['Use DeleteItem using a ConditionExpression.', 'Use BatchWriteItem to empty all of the rows.', 'Write a recursive function that scans and calls out DeleteItem.', 'Create and then delete the table after the task has completed.'],
      answer: 3,
    },
    {
      question: 'A company has an application that logs all information to Amazon S3. Whenever there is a new log file, an AWS Lambda function is invoked to process the log files. The code works, gathering all of the necessary information. However, when checking the Lambda function logs, duplicate entries with the same request ID are found. What is causing the duplicate entries?',
      options: ['The S3 bucket name was specified incorrectly.', 'The Lambda function failed, and the Lambda service retired the invocation with a delay.', 'There was an S3 outage, which caused duplicate entries of the sale log file.', 'The application stopped intermittently and then resumed.'],
      answer: 1,
    },
    {
      question: 'A company is providing services to many downstream consumers. Each consumer may connect to one or more services. This has resulted in a complex architecture that is difficult to manage and does not scale well. The company needs a single interface to manage these services to consumers. Which AWS service should be used to refactor this architecture?',
      options: ['AWS Lambda.', 'AWS X-Ray.', 'Amazon SQS.', 'Amazon API Gateway.'],
      answer: 3,
    },
    {
      question: 'A Developer is creating a serverless website with content that includes HTML files, images, videos, and JavaScript (client-side scripts). Which combination of services should the Developer use to create the website?',
      options: ['Amazon S3 and Amazon CloudFront.', 'Amazon EC2 and Amazon ElastiCache.', 'Amazon ECS and Redis.', 'AWS Lambda and Amazon API Gateway.'],
      answer: 0,
    },
    {
      question: 'A Development team has pushed out 10 applications running on several Amazon EC2 instances. The Operations team is asking for a graphical representation of one key performance metric for each application. These metrics should be available on one screen for easy monitoring. Which steps should the Developer take to accomplish this using Amazon CloudWatch?',
      options: ['Create a custom namespace with a unique metric name for each application.', 'Create a custom dimension with a unique metric name for each application.', 'Create a custom event with a unique metric name for each application.', 'Create a custom alarm with a unique metric name for each application.'],
      answer: 0,
    },
    {
      question: 'A company is creating an application that will require users to access AWS services and allow them to reset their own passwords. Which of the following would allow the company to manage users and authorization while allowing users to reset their own passwords?',
      options: ['Amazon Cognito identify pools and AWS STS.', 'Amazon Cognito identity pools and AWS IAM.', 'Amazon Cognito user pools and AWS KMS.', 'Amazon Cognito user pools and identity pools.'],
      answer: 3,
    },
    {
      question: 'A company has three different environments: Development, QA, and Production. The company wants to deploy its code first in the Development environment, then QA, and then Production. Which AWS service can be used to meet this requirement?',
      options: ['Use AWS CodeCommit to create multiple repositories to deploy the application.', 'Use AWS CodeBuild to create, configure, and deploy multiple build application projects.', 'Use AWS Data Pipeline to create multiple data pipeline provisions to deploy the application.', 'Use AWS CodeDeploy to create multiple deployment groups.'],
      answer: 3,
    },
    {
      question: 'A company uses Amazon DynamoDB for managing and tracking orders. The DynamoDB table is partitioned based on the order date. The company receives a huge increase in orders during a sales event, causing DynamoDB writes to throttle, and the consumed throughput is far below the provisioned throughput. According to AWS best practices, how can this issue be resolved with MINIMAL costs?',
      options: ['Create a new DynamoDB table for every order date.', 'Increase the read and write capacity units of the DynamoDB table.', 'Add a random number suffix to the partition key values.', 'Add a global secondary index to the DynamoDB table.'],
      answer: 2,
    },
    {
      question: 'A Development team currently supports an application that uses an in-memory store to save accumulated game results. Individual results are stored in a database. As part of migrating to AWS, the team needs to use automatic scaling. The team knows this will yield inconsistent results. Where should the team store these accumulated game results to BEST allow for consistent results without impacting performance?',
      options: ['Amazon S3.', 'Amazon RDS.', 'Amazon ElastiCache.', 'Amazon Kinesis.'],
      answer: 2,
    },
    {
      question: 'In a multi-container Docker environment in AWS Elastic Beanstalk, what is required to configure container instances in the environment?',
      options: ['An Amazon ECS task definition.', 'An Amazon ECS cluster.', 'A Dockerfile in an application package.', 'A CLI for Elastic Beanstalk.'],
      answer: 0,
    },
    {
      question: 'An application that runs on an Amazon EC2 instance needs to access and make API calls to multiple AWS services. What is the MOST secure way to provide access to the AWS services with MINIMAL management overhead?',
      options: ['Use AWS KMS to store and retrieve credentials.', 'Use EC2 instance profiles.', 'Use AWS root user to make requests to the application.', 'Store and retrieve credentials from AWS CodeCommit.'],
      answer: 1,
    },
    {
      question: 'A company maintains an application responsible for processing several thousand external callbacks each day. The company\'s System administrators want to know how many callbacks are being received on a rolling basis, and they want this data available for 10 days. The company also wants the ability to issue automated alerts if the number of callbacks exceeds the defined thresholds. What is the MOST cost-effective way to address the need to track and alert on these statistics?',
      options: ['Push callback data to an Amazon RDS database that can be queried to show historical data and to alert on exceeded thresholds.', 'Push callback data to AWS X-Ray and use AWS Lambda to query, display, and alert on exceeded thresholds.', 'Push callback data to Amazon Kinesis Data Streams and invoke an AWS Lambda function that stores data in Amazon DynamoDB and sends the required alerts.', 'Push callback data to Amazon CloudWatch as a custom metric and use the CloudWatch alerting mechanisms to alert System Administrators.'],
      answer: 3,
    },
    {
      question: 'A company has a website that is developed in PHP and WordPress and is launched using AWS Elastic Beanstalk. There is a new version of the website that needs to be deployed in the Elastic Beanstalk environment. The company cannot tolerate having the website offline if an update fails. Deployments must have minimal impact and rollback as soon as possible. What deployment method should be used?',
      options: ['All at once.', 'Rolling.', 'Snapshots.', 'Immutable.'],
      answer: 3,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 14 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET14 = {
  name: 'AWS DVA-C02 — Set 14',
  questions: [
    {
      question: 'A company has a multi-tiered web application on AWS. During a recent spike in traffic, one of the primary relational databases on Amazon RDS could not serve all the traffic. Some read queries for repeatedly accessed items failed, so users received error messages. What can be done to minimize the impact on database read queries MOST efficiently during future traffic spikes?',
      options: ['Use Amazon S3 to cache database query results.', 'Use Amazon RDS as a custom origin for Amazon CloudFront.', 'Use local storage and memory on Amazon EC2 instances to cache data.', 'Use Amazon ElastiCache in front of the primary database to cache data.'],
      answer: 3,
    },
    {
      question: 'A Developer must build an application that uses Amazon DynamoDB. The requirements state that the items being stored in the DynamoDB table will be 7KB in size and that reads must be strongly consistent. The maximum read rate is 3 items per second, and the maximum write rate is 10 items per second. How should the Developer size the DynamoDB table to meet these requirements?',
      options: ['Read: 3 read capacity. unitsWrite: 70 write capacity units.', 'Read: 6 read capacity. unitsWrite: 70 write capacity units.', 'Read: 6 read capacity. unitsWrite: 10 write capacity units.', 'Read: 3 read capacity. unitsWrite: 10 write capacity units.'],
      answer: 1,
    },
    {
      question: 'A Developer is creating an AWS Lambda function to process a stream of data from an Amazon Kinesis Data Stream. When the Lambda function parses the data and encounters a missing field, it exits the function with an error. The function is generating duplicate records from the Kinesis stream. When the Developer looks at the stream output without the Lambda function, there are no duplicate records. What is the reason for the duplicates?',
      options: ['The Lambda function did not advance the Kinesis stream pointer to the next record after the error.', 'The Lambda event source used asynchronous invocation, resulting in duplicate records.', 'The Lambda function did not handle the error, and the Lambda service attempted to reprocess the data.', 'The Lambda function is not keeping up with the amount of data coming from the stream.'],
      answer: 2,
    },
    {
      question: 'A company is developing an application that will run on several Amazon EC2 instances in an Auto Scaling group and can access a database running on Amazon EC2. The application needs to store secrets required to connect to the database. The application must allow for periodic secret rotation, and there should be no changes to the application when a secret changes. What is the SAFEST way to meet these requirements?',
      options: ['Associate an IAM role to the EC2 instance where the application is running with permission to access the database.', 'Use AWS Systems Manager Parameter Store with the SecureString data type to store secrets.', 'Configure the application to store secrets in Amazon S3 object metadata.', 'Hard code the database secrets in the application code itself.'],
      answer: 1,
    },
    {
      question: 'A Developer writes an AWS Lambda function and uploads the code in a .ZIP file to Amazon S3. The Developer makes changes to the code and uploads a new .ZIP file to Amazon S3. However, Lambda executes the earlier code. How can the Developer fix this in the LEAST disruptive way?',
      options: ['Create another Lambda function and specify the new .ZIP file.', 'Call the update-function-code API.', 'Remove the earlier .ZIP file first, then add the new .ZIP file.', 'Call the create-alias API.'],
      answer: 1,
    },
    {
      question: 'A Developer has been asked to make changes to the source code of an AWS Lambda function. The function is managed using an AWS CloudFormation template. The template is configured to load the source code from an Amazon S3 bucket. The Developer manually created a .ZIP file deployment package containing the changes and put the file into the correct location on Amazon S3. When the function is invoked, the code changes have not been applied. What step is required to update the function with the changes?',
      options: ['Delete the .ZIP file on S3, and re-upload by using a different object key name.', 'Update the CloudFormation stack with the correct values for the function code properties S3Bucket, S3Key, or S3ObjectVersion.', 'Ensure that the function source code is base64-encoded before uploading the deployment package to S3.', 'Modify the execution role of the Lambda function to allow S3 access permission to the deployment package .ZIP file.'],
      answer: 1,
    },
    {
      question: 'A Developer is designing a new application that uses Amazon S3. To satisfy compliance requirements, the Developer must encrypt the data at rest. How can the Developer accomplish this?',
      options: ['Use s3:x-amz-acl as a condition in the S3 bucket policy.', 'Use Amazon RDS with default encryption.', 'Use aws:SecureTransport as a condition in the S3 bucket policy.', 'Turn on S3 default encryption for the S3 bucket.'],
      answer: 3,
    },
    {
      question: 'An AWS Elastic Beanstalk application needs to be deployed in multiple regions and requires a different Amazon Machine Image (AMI) in each region. Which AWS CloudFormation template key can be used to specify the correct AMI for each region?',
      options: ['Parameters.', 'Outputs.', 'Mappings.', 'Resources.'],
      answer: 2,
    },
    {
      question: 'A Developer wants to find a list of items in a global secondary index from an Amazon DynamoDB table. Which DynamoDB API call can the Developer use in order to consume the LEAST number of read capacity units?',
      options: ['Scan operation using eventually-consistent reads.', 'Query operation using strongly-consistent reads.', 'Query operation using eventually-consistent reads.', 'Scan operation using strongly-consistent reads.'],
      answer: 2,
    },
    {
      question: 'A Developer has published an update to an application that is served to a global user base using Amazon CloudFront. After deploying the application, users are not able to see the updated changes. How can the Developer resolve this issue?',
      options: ['Remove the origin from the CloudFront configuration and add it again.', 'Disable forwarding of query strings and request headers from the CloudFront distribution configuration.', 'Invalidate all the application objects from the edge caches.', 'Disable the CloudFront distribution and enable it again to update all the edge locations.'],
      answer: 2,
    },
    {
      question: 'How should custom libraries be utilized in AWS Lambda?',
      options: ['Host the library on Amazon S3 and reference to it from the Lambda function.', 'Install the library locally and upload a ZIP file of the Lambda function.', 'Import the necessary Lambda blueprint when creating the function.', 'Modify the function runtime to include the necessary library.'],
      answer: 1,
    },
    {
      question: 'A Developer is writing an imaging micro service on AWS Lambda. The service is dependent on several libraries that are not available in the Lambda runtime environment. Which strategy should the Developer follow to create the Lambda deployment package?',
      options: ['Create a ZIP file with the source code and all dependent libraries.', 'Create a ZIP file with the source code and a script that installs the dependent libraries at runtime.', 'Create a ZIP file with the source code. Stage the dependent libraries on an Amazon S3 bucket indicated by the Lambda environment variable LD_LIBRARY_PATH.', 'Create a ZIP file with the source code and a buildspec.yaml file that installs the dependent libraries on AWS Lambda.'],
      answer: 0,
    },
    {
      question: 'A Developer is designing a fault-tolerant environment where client sessions will be saved. How can the Developer ensure that no sessions are lost if an Amazon EC2 instance fails?',
      options: ['Use sticky sessions with an Elastic Load Balancer target group.', 'Use Amazon SQS to save session data.', 'Use Amazon DynamoDB to perform scalable session handling.', 'Use Elastic Load Balancer connection draining to stop sending requests to failing instances.'],
      answer: 2,
    },
    {
      question: 'In a move toward using microservices, a company\'s Management team has asked all Development teams to build their services so that API requests depend only on that service\'s data store. One team is building a Payments service which has its own database; the service needs data that originates in the Accounts database. Both are using Amazon DynamoDB. What approach will result in the simplest, decoupled, and reliable method to get near-real time updates from the Accounts database?',
      options: ['Use Amazon Glue to perform frequent ETL updates from the Accounts database to the Payments database.', 'Use Amazon ElastiCache in Payments, with the cache updated by triggers in the Accounts database.', 'Use Amazon Kinesis Data Firehose to deliver all changes from the Accounts database to the Payments database.', 'Use Amazon DynamoDB Streams to deliver all changes from the Accounts database to the Payments database.'],
      answer: 3,
    },
    {
      question: 'A company needs a fully-managed source control service that will work in AWS. The service must ensure that revision control synchronizes multiple distributed repositories by exchanging sets of changes peer-to-peer. All users need to work productively even when not connected to a network. Which source control service should be used?',
      options: ['Subversion.', 'AWS CodeBuild.', 'AWS CodeCommit.', 'AWS CodeStar.'],
      answer: 2,
    },
    {
      question: 'A Developer is writing a serverless application that requires that an AWS Lambda function be invoked every 10 minutes. What is an automated and serverless way to trigger the function?',
      options: ['Deploy an Amazon EC2 instance based on Linux, and edit its /etc/crontab file by adding a command to periodically invoke the Lambda function.', 'Configure an environment variable named PERIOD for the Lambda function. Set the value to 600.', 'Create an Amazon CloudWatch Events rule that triggers on a regular schedule to invoke the Lambda function.', 'Create an Amazon SNS topic that has a subscription to the Lambda function with a 600-second timer.'],
      answer: 2,
    },
    {
      question: 'A Developer is creating a mobile application that will not require users to log in. What is the MOST efficient method to grant users access to AWS resources?',
      options: ['Use an identity provider to securely authenticate with the application.', 'Create an AWS Lambda function to create an IAM user when a user accesses the application.', 'Create credentials using AWS KMS and apply these credentials to users when using the application.', 'Use Amazon Cognito to associate unauthenticated users with an IAM role that has limited access to resources.'],
      answer: 3,
    },
    {
      question: 'What does an Amazon SQS delay queue accomplish?',
      options: ['Messages are hidden for a configurable amount of time when they are first added to the queue.', 'Messages are hidden for a configurable amount of time after they are consumed from the queue.', 'The consumer can poll the queue for a configurable amount of time before retrieving a message.', 'Message cannot be deleted for a configurable amount of time after they are consumed from the queue.'],
      answer: 0,
    },
    {
      question: 'A company has multiple Developers located across the globe who are updating code incrementally for a development project. When Developers upload code concurrently, internet connectivity is slow and it is taking a long time to upload code for deployment in AWS Elastic Beanstalk. Which step will result in minimized upload and deployment time with the LEAST amount of administrative effort?',
      options: ['Allow the Developers to upload the code to an Amazon S3 bucket, and deploy it directly to Elastic Beanstalk.', 'Allow the Developers to upload the code to a central FTP server to deploy the application to Elastic Beanstalk.', 'Create an AWS CodeCommit repository, allow the Developers to commit code to it, and then directly deploy the code to Elastic Beanstalk.', 'Create a code repository on an Amazon EC2 instance so that all Developers can update the code, and deploy the application from the instance to Elastic Beanstalk.'],
      answer: 2,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 15 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET15 = {
  name: 'AWS DVA-C02 — Set 15',
  questions: [
    {
      question: 'A company recently migrated its web, application and NoSQL database tiers to AWS. The company is using Auto Scaling to scale the web and application tiers. More than 95 percent of the Amazon DynamoDB requests are repeated read requests. How can the DynamoDB NoSQL tier be scaled up to cache these repeated requests?',
      options: ['Amazon EMR.', 'Amazon DynamoDB Accelerator.', 'Amazon SQS.', 'Amazon CloudFront.'],
      answer: 1,
    },
    {
      question: 'A Development team is working on a case management solution that allows medical claims to be processed and reviewed. Users log in to provide information related to their medical and financial situations. As part of the application, sensitive documents such as medical records, medical imaging, bank statements, and receipts are uploaded to Amazon S3. All documents must be securely transmitted and stored. All access to the documents must be recorded for auditing. What is the MOST secure approach?',
      options: ['Use S3 default encryption using Advanced Encryption Standard-256 (AES-256) on the destination bucket.', 'Use Amazon Cognito for authorization and authentication to ensure the security of the application and documents.', 'Use AWS Lambda to encrypt and decrypt objects as they are placed into the S3 bucket.', 'Use client-side encryption/decryption with Amazon S3 and AWS KMS.'],
      answer: 3,
    },
    {
      question: 'A Developer is using AWS CLI, but when running list commands on a large number of resources, it is timing out. What can be done to avoid this time-out?',
      options: ['Use pagination.', 'Use shorthand syntax.', 'Use parameter values.', 'Use quoting strings.'],
      answer: 0,
    },
    {
      question: 'Where can PortMapping be defined when launching containers in Amazon ECS?',
      options: ['Security groups.', 'Amazon Elastic Container Registry (Amzon ECR).', 'Container agent.', 'Task definition.'],
      answer: 3,
    },
    {
      question: 'An organization is storing large files in Amazon S3, and is writing a web application to display meta-data about the files to end-users. Based on the metadata a user selects an object to download. The organization needs a mechanism to index the files and provide single-digit millisecond latency retrieval for the metadata. What AWS service should be used to accomplish this?',
      options: ['Amazon DynamoDB.', 'Amazon EC2.', 'AWS Lambda.', 'Amazon RDS.'],
      answer: 0,
    },
    {
      question: 'While developing an application that runs on Amazon EC2 in an Amazon VPC, a Developer identifies the need for centralized storage of application-level logs. Which AWS service can be used to securely store these logs?',
      options: ['Amazon EC2 VPC Flow Logs.', 'Amazon CloudWatch Logs.', 'Amazon CloudSearch.', 'AWS CloudTrail'],
      answer: 1,
    },
    {
      question: 'A stock market monitoring application uses Amazon Kinesis for data ingestion. During simulated tests of peak data rates, the Kinesis stream cannot keep up with the incoming data. What step will allow Kinesis to accommodate the traffic during peak hours?',
      options: ['Install the Kinesis Producer Library (KPL) for ingesting data into the stream.', 'Reduce the data retention period to allow for more data ingestion using DecreaseStreamRetentionPeriod.', 'Increase the shard count of the stream using UpdateShardCount.', 'Ingest multiple records into the stream in a single call using PutRecords.'],
      answer: 2,
    },
    {
      question: 'A company has an AWS CloudFormation template that is stored as a single file. The template is able to launch and create a full infrastructure stack. Which best practice would increase the maintainability of the template?',
      options: ['Use nested stacks for common template patterns.', 'Embed credentials to prevent typos.', 'Remove mappings to decrease the number of variables.', 'Use AWS::Include to reference publicly-hosted template files.'],
      answer: 0,
    },
    {
      question: 'An on-premises application makes repeated calls to store files to Amazon S3. As usage of the application has increased, LimitExceeded errors are being logged. What should be changed to fix this error?',
      options: ['Implement exponential backoffs in the application.', 'Load balance the application to multiple servers.', 'Move the application to Amazon EC2.', 'Add a one second delay to each API call.'],
      answer: 0,
    },
    {
      question: 'A company caches session information for a web application in an Amazon DynamoDB table. The company wants an automated way to delete old items from the table. What is the simplest way to do this?',
      options: ['Write a script that deletes old records; schedule the scripts as a cron job on an Amazon EC2 instance.', 'Add an attribute with the expiration time; enable the Time To Live feature based on that attribute.', 'Each day, create a new table to hold session data; delete the previous day\'s table.', 'Add an attribute with the expiration time; name the attribute ItemExpiration.'],
      answer: 1,
    },
    {
      question: 'An application is expected to process many files. Each file takes four minutes to process each AWS Lambda invocation. The Lambda function does not return any important data. What is the fastest way to process all the files?',
      options: ['First split the files to make them smaller, then process with synchronous RequestResponse Lambda invocations.', 'Make synchronous RequestResponse Lambda invocations and process the files one by one.', 'Make asynchronous Event Lambda invocations and process the files in parallel.', 'First join all the files, then process it all at once with an asynchronous Event Lambda invocation.'],
      answer: 2,
    },
    {
      question: 'The upload of a 15 GB object to Amazon S3 fails. The error message reads: Your proposed upload exceeds the maximum allowed object size.. What technique will allow the Developer to upload this object?',
      options: ['Upload the object using the multi-part upload API.', 'Upload the object over an AWS Direct Connect connection.', 'Contact AWS Support to increase the object size limit.', 'Upload the object to another AWS region.'],
      answer: 0,
    },
    {
      question: 'AWS CodeBuild builds code for an application, creates the Docker image, pushes the image to Amazon Elastic Container Registry (Amazon ECR), and tags the image with a unique identifier. If the Developers already have AWS CLI configured on their workstations, how can the Docker images be pulled to the workstations?',
      options: ['Run the following: docker pull REPOSITORY URI : TAG.', 'Run the output of the following: aws ecr get-login and then run: docker pull REPOSITORY URI : TAG.', 'Run the following: aws ecr get-login and then run: docker pull REPOSITORY URI : TAG.', 'Run the output of the following: aws ecr get-download-url-for-layer and then run: docker pull REPOSITORY URI : TAG.'],
      answer: 1,
    },
    {
      question: 'A web application is designed to allow new users to create accounts using their email addresses. The application will store attributes for each user, and is expecting millions of user to sign up. What should the Developer implement to achieve the design goals?',
      options: ['Amazon Cognito user pools.', 'AWS Mobile Hub user data storage.', 'Amazon Cognito Sync.', 'AWS Mobile Hub cloud logic.'],
      answer: 0,
    },
    {
      question: 'A company needs a new REST API that can return information about the contents of an Amazon S3 bucket, such as a count of the objects stored in it. The company has decided that the new API should be written as a microservice using AWS Lambda and Amazon API Gateway. How should the Developer ensure that the microservice has the necessary access to the Amazon S3 bucket, while adhering to security best practices?',
      options: ['Create an IAM user that has permissions to access the Amazon S3 bucket, and store the IAM user credentials in the Lambda function source code.', 'Create an IAM role that has permissions to access the Amazon S3 bucket and assign it to the Lambda function as its execution role.', 'Create an Amazon S3 bucket policy that specifies the Lambda service as its principal and assign it to the Amazon S3 bucket.', 'Create an IAM role, attach the AmazonS3FullAccess managed policy to it, and assign the role to the Lambda function as its execution role.'],
      answer: 1,
    },
    {
      question: 'An application is using Amazon DynamoDB as its data store, and should be able to read 100 items per second as strongly consistent reads. Each item is 5 KB in size. To what value should the table\'s provisioned read throughput be set?',
      options: ['50 read capacity units.', '100 read capacity units.', '200 read capacity units.', '500 read capacity units.'],
      answer: 2,
    },
    {
      question: 'An application uses Lambda functions to extract metadata from files uploaded to an S3 bucket; the metadata is stored in Amazon DynamoDB. The application starts behaving unexpectedly, and the Developer wants to examine the logs of the Lambda function code for errors. Based on this system configuration, where would the Developer find the logs?',
      options: ['Amazon S3.', 'AWS CloudTrail.', 'Amazon CloudWatch.', 'Amazon DynamoDB'],
      answer: 2,
    },
    {
      question: 'A Developer is creating a Lambda function that will generate and export a file. The function requires 100 MB of temporary storage for temporary files while executing. These files will not be needed after the function is complete. How can the Developer MOST efficiently handle the temporary files?',
      options: ['Store the files in EBS and delete the files at the end of the Lambda function.', 'Copy the files to EFS and delete the files at the end of the Lambda function.', 'Store the files in the /tmp directory and delete the files at the end of the Lambda function.', 'Copy the files to an S3 bucket with a lifecycle policy to delete the files.'],
      answer: 2,
    },
    {
      question: 'A Developer has developed a web application and wants to deploy it quickly on a Tomcat server on AWS. The Developer wants to avoid having to manage the underlying infrastructure. What is the easiest way to deploy the application, based on these requirements?',
      options: ['AWS CloudFormation.', 'AWS Elastic Beanstalk.', 'Amazon S3.', 'AWS CodePipeline'],
      answer: 1,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Set 16 (19 questions)
// ═════════════════════════════════════════════════════════════════════════════
export const DVA_C02_SET16 = {
  name: 'AWS DVA-C02 — Set 16',
  questions: [
    {
      question: 'An application runs on multiple EC2 instances behind an ELB. Where is the session data best written so that it can be served reliably across multiple requests?',
      options: ['Write data to Amazon ElastiCache.', 'Write data to Amazon Elastic Block Store.', 'Write data to Amazon EC2 Instance Store.', 'Write data to the root filesystem.'],
      answer: 0,
    },
    {
      question: 'An application running on an Amazon Linux EC2 instance needs to manage the AWS infrastructure. How can the EC2 instance be configured to make AWS API calls securely?',
      options: ['Sign the AWS CLI command using the signature version 4 process.', 'Run the aws configure AWS CLI command and specify the access key id and secret access key.', 'Specify a role for the EC2 instance with the necessary privileges.', 'Pass the access key id and secret access key as parameters for each AWS CLI command.'],
      answer: 2,
    },
    {
      question: 'An application needs to use the IP address of the client in its processing. The application has been moved into AWS and has been placed behind an Application Load Balancer (ALB). However, all the client IP addresses now appear to be the same. The application must maintain the ability to scale horizontally. Based on this scenario, what is the MOST cost-effective solution to this problem?',
      options: ['Remove the application from the ALB. Delete the ALB and change Amazon Route 53 to direct traffic to the instance running the application.', 'Remove the application from the ALB. Create a Classic Load Balancer in its place. Direct traffic to the application using the HTTP protocol.', 'Alter the application code to inspect the X-Forwarded-For header. Ensure that the code can work properly if a list of IP addresses is passed in the header.', 'Alter the application code to inspect a custom header. Alter the client code to pass the IP address in the custom header.'],
      answer: 2,
    },
    {
      question: 'A development team is using AWS Elastic Beanstalk to deploy a two-tier application that consists of a load-balanced web tier and an Amazon RDS database tier in production. The team would like to separate the RDS instance from the Elastic Beanstalk. How can this be accomplished?',
      options: ['Use the Elastic Beanstalk CLI to disassociate the database.', 'Use the AWS CLI to disassociate the database.', 'Change the deployment policy to disassociate the database.', 'Recreate a new Elastic Beanstalk environment without Amazon RDS.'],
      answer: 3,
    },
    {
      question: 'A social media company is using Amazon Cognito in order to synchronize profiles across different mobile devices, to enable end users to have a seamless experience. Which of the following configurations can be used to silently notify users whenever an update is available on all other devices?',
      options: ['Modify the user pool to include all the devices which keep them in sync.', 'Use the SyncCallback interface to receive notifications on the application.', 'Use an Amazon Cognito stream to analyze the data and push the notifications.', 'Use the push synchronization feature with the appropriate IAM role.'],
      answer: 3,
    },
    {
      question: 'An application displays a status dashboard. The status is updated by 1 KB messages from an SQS queue. Although the status changes infrequently, the Developer must minimize the time between the message arrival in the queue and the dashboard update. What technique provides the shortest delay in updating the dashboard?',
      options: ['Retrieve the messages from the queue using long polling every 20 seconds.', 'Reduce the size of the messages by compressing them before sending.', 'Retrieve the messages from the queue using short polling every 10 seconds.', 'Reduce the size of each message payload by sending it in two parts.'],
      answer: 0,
    },
    {
      question: 'An on-premises legacy application is caching data files locally and writing shared images to local disks. What is necessary to allow for horizontal scaling when migrating the application to AWS?',
      options: ['Modify the application to have both shared images and caching data written to Amazon EBS.', 'Modify the application to read and write cache data on Amazon S3, and also store shared images on S3.', 'Modify the application to use Amazon S3 for serving shared images; cache data can then be written to local disks.', 'Modify the application to read and write cache data on Amazon S3, while continuing to write shared images to local disks.'],
      answer: 1,
    },
    {
      question: 'A Developer must trigger an AWS Lambda function based on the item lifecycle activity in an Amazon DynamoDB table. How can the Developer create the solution?',
      options: ['Enable a DynamoDB stream that publishes an Amazon SNS message. Trigger the Lambda function synchronously from the SNS message.', 'Enable a DynamoDB stream that publishes an SNS message. Trigger the Lambda function asynchronously from the SNS message.', 'Enable a DynamoDB stream, and trigger the Lambda function synchronously from the stream.', 'Enable a DynamoDB stream, and trigger the Lambda function asynchronously from the stream.'],
      answer: 3,
    },
    {
      question: 'After installing the AWS CLI, a Developer tries to run the command aws configure but receives the following error: Error: aws: command not found. What is the most likely cause of this error?',
      options: ['The aws executable is not in the PATH environment variable.', 'Access to the aws executable has been denied to the installer.', 'Incorrect AWS credentials were provided.', 'The aws script does not have an executable file mode.'],
      answer: 0,
    },
    {
      question: 'The Developer for a retail company must integrate a fraud detection solution into the order processing solution. The fraud detection solution takes between ten and thirty minutes to verify an order. At peak, the web site can receive one hundred orders per minute. What is the most scalable method to add the fraud detection solution to the order processing pipeline?',
      options: ['Add all new orders to an Amazon SQS queue. Configure a fleet of 10 EC2 instances spanning multiple AZs with the fraud detection solution installed on them to pull orders from this queue. Update the order with a pass or fails status.', 'Add all new orders to an SQS queue. Configure an Auto Scaling group that uses the queue depth metric as its unit of scale to launch a dynamically-sized fleet of EC2 instances spanning multiple AZs with the fraud detection solution installed on them to pull orders from this queue. Update the order with a pass or fails status.', 'Add all new orders to an Amazon Kinesis Stream. Subscribe a Lambda function to automatically read batches of records from the Kinesis Stream. The Lambda function includes the fraud detection software and will update the order with a pass or fail status.', 'Write all new orders to Amazon DynamoDB. Configure DynamoDB Streams to include all new orders. Subscribe a Lambda function to automatically read batches of records from the Kinesis Stream. The Lambda function includes the fraud detection software and will update the order with a pass or fail status.'],
      answer: 1,
    },
    {
      question: 'When a Developer tries to run an AWS CodeBuild project, it raises an error because the length of all environment variables exceeds the limit for the combined maximum of characters. What is the recommended solution?',
      options: ['Add the export LC_ALL="en_US.utf8" command to the pre_build section to ensure POSIX localization.', 'Use Amazon Cognito to store key-value pairs for large numbers of environment variables.', 'Update the settings for the build project to use an Amazon S3 bucket for large numbers of environment variables.', 'Use AWS Systems Manager Parameter Store to store large numbers of environment variables.'],
      answer: 3,
    },
    {
      question: 'A set of APIs are exposed to customers using the Amazon API Gateway. These APIs have caching enabled on the API Gateway. Customers have asked for an option to invalidate this cache for each of the APIs. What action can be taken to allow API customers to invalidate the API Cache?',
      options: ['Ask customers to use AWS credentials to call the InvalidateCache API.', 'Ask customers to invoke an AWS API endpoint which invalidates the cache.', 'Ask customers to pass an HTTP header called Cache-Control:max-age=0.', 'Ask customers to add a query string parameter called INVALIDATE_CACHE when making an API call.'],
      answer: 2,
    },
    {
      question: 'A Developer has been asked to build a real-time dashboard web application to visualize the key prefixes and storage size of objects in Amazon S3 buckets. Amazon DynamoDB will be used to store the Amazon S3 metadata. What is the optimal and MOST cost-effective design to ensure that the real-time dashboard is kept up to date with the state of the objects in the Amazon S3 buckets?',
      options: ['Use an Amazon CloudWatch event backed by an AWS Lambda function. Issue an Amazon S3 API call to get a list of all Amazon S3 objects and persist the metadata within DynamoDB. Have the web application poll the DynamoDB table to reflect this change.', 'Use Amazon S3 Event Notification backed by a Lambda function to persist the metadata into DynamoDB. Have the web application poll the DynamoDB table to reflect this change.', 'Run a cron job within an Amazon EC2 instance to list all objects within Amazon S3 and persist the metadata into DynamoDB. Have the web application poll the DynamoDB table to reflect this change.', 'Create a new Amazon EMR cluster to get all the metadata about Amazon S3 objects; persist the metadata into DynamoDB. Have the web application poll the DynamoDB table to reflect this change.'],
      answer: 1,
    },
    {
      question: 'An existing serverless application processes uploaded image files. The process currently uses a single Lambda function that takes an image file, performs the processing, and stores the file in Amazon S3. Users of the application now require thumbnail generation of the images. Users want to avoid any impact to the time it takes to perform the image uploads. How can thumbnail generation be added to the application, meeting user requirements while minimizing changes to existing code?',
      options: ['Change the existing Lambda function handling the uploads to create thumbnails at the time of upload. Have the function store both the image and thumbnail in Amazon S3.', 'Create a second Lambda function that handles thumbnail generation and storage. Change the existing Lambda function to invoke it asynchronously.', 'Create an S3 event notification with a Lambda function destination. Create a new Lambda function to generate and store thumbnails.', 'Create an S3 event notification to an SQS Queue. Create a scheduled Lambda function that processes the queue, and generates and stores thumbnails.'],
      answer: 2,
    },
    {
      question: 'A company is using Amazon API Gateway to manage access to a set of microservices implemented as AWS Lambda functions. Following a bug report, the company makes a minor breaking change to one of the APIs. In order to avoid impacting existing clients when the new API is deployed, the company wants to allow clients six months to migrate from v1 to v2. Which approach should the Developer use to handle this change?',
      options: ['Update the underlying Lambda function and provide clients with the new Lambda invocation URL.', 'Use API Gateway to automatically propagate the change to clients, specifying 180 days in the phased deployment parameter.', 'Use API Gateway to deploy a new stage named v2 to the API and provide users with its URL.', 'Update the underlying Lambda function, create an Amazon CloudFront distribution with the updated Lambda function as its origin.'],
      answer: 2,
    },
    {
      question: 'A company developed a set of APIs that are being served through the Amazon API Gateway. The API calls need to be authenticated based on OpenID identity providers such as Amazon or Facebook. The APIs should allow access based on a custom authorization model. Which is the simplest and MOST secure design to use to build an authentication and authorization model for the APIs?',
      options: ['Use Amazon Cognito user pools and a custom authorizer to authenticate and authorize users based on JSON Web Tokens.', 'Build a OpenID token broker with Amazon and Facebook. Users will authenticate with these identify providers and pass the JSON Web Token to the API to authenticate each API call.', 'Store user credentials in Amazon DynamoDB and have the application retrieve temporary credentials from AWS STS. Make API calls by passing user credentials to the APIs for authentication and authorization.', 'Use Amazon RDS to store user credentials and pass them to the APIs for authentications and authorization.'],
      answer: 0,
    },
    {
      question: 'Where should an Elastic Beanstalk configuration file named healthcheckur1.config be placed in the application source bundle?',
      options: ['In the root of the application.', 'In the bin folder.', 'In healthcheckur1.config.ebextension under root.', 'In the .ebextensions folder.'],
      answer: 3,
    },
    {
      question: 'A static website is hosted in an Amazon S3 bucket. Several HTML pages on the site use JavaScript to download images from another Amazon S3 bucket. These images are not displayed when users browse the site. What is the possible cause for the issue?',
      options: ['The referenced Amazon S3 bucket is in another region.', 'The images must be stored in the same Amazon S3 bucket.', 'Port 80 must be opened on the security group in which the Amazon S3 bucket is located.', 'Cross Origin Resource Sharing must be enabled on the Amazon S3 bucket.'],
      answer: 3,
    },
    {
      question: 'Amazon S3 has the following structure: S3://BUCKET/FOLDERNAME/FILENAME.zip. Which S3 best practice would optimize performance with thousands of PUT request each second to a single bucket?',
      options: ['Prefix folder names with user id; for example, s3://BUCKET/2013-FOLDERNAME/FILENAME.zip.', 'Prefix file names with timestamps; for example, s3://BUCKET/FOLDERNAME/2013-26-05-15-00-00-FILENAME.zip.', 'Prefix file names with random hex hashes; for example, s3://BUCKET/FOLDERNAME/23a6-FILENAME.zip.', 'Prefix folder names with random hex hashes; for example, s3://BUCKET/23a6-FOLDERNAME/FILENAME.zip.'],
      answer: 3,
    },
  ],
};

export const SAMPLE_DECKS = [DVA_C02_SET1, DVA_C02_SET2, DVA_C02_SET3, DVA_C02_SET4, DVA_C02_SET5, DVA_C02_SET6, DVA_C02_SET7, DVA_C02_SET8, DVA_C02_SET9, DVA_C02_SET10, DVA_C02_SET11, DVA_C02_SET12, DVA_C02_SET13, DVA_C02_SET14, DVA_C02_SET15, DVA_C02_SET16];

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
