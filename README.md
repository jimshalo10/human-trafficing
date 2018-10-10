Human Trafficking Index
==============================================

This AWS Serverless Application views of the people at risk of Human Trafficking  listed here and stores it in an Amazon DynamoDB Table.

This application was created as part of a demo for the "Build on Serverless | Alexa and Serverless Apps - How to Hack for Good" 

NOTE: Per the license this code is meant as an example and carries no warranty. Please learn from it!

The subject of this code is based nodejs and python files have been converted but remain unused and untested and there for dependency purposes. This was built on a used account and AWS IAM Policies will need to added to the current non-root user account.

Do not be tempted to publish AWS Serverless using your root credentials make a new user in AWS IAM and add only those policys needed my attaching policy if you make a json inline policy begin the policy with AWS_IAM_*, like * is CreateRole


NOTE: Per the license this code is meant as an example and carries no warranty.
No responsibilty for security breach of doing an AWS configure using root credentials is accepted!!!

Please learn from it!



How does it work?
-----------
This code makes use of the claudiia https://github.com/claudiajs/claudia package to digest the HTML content of a website and make it available as an object that can be parsed in JSON. The code then looks for all records from the index table processed and creates a JSON structure that can be inserted into DynamoDB.

The code is executed as part of an AWS Lambda function (https://aws.amazon.com/lambda) which can be triggered manually probably via and Alexa SDK Endpoint if so desired. The Lambda function can be deployed via AWS Serverless Application Model (AWS SAM) templates JSON package.json (see template.yml for python) have been created.



External dependencies
-----------
This application makes use of a few 3rd party external dependencies:
* boto3 - https://github.com/boto/boto3
* requests - https://github.com/requests/requests
* claudiia - https://code.launchpad.net/claudiia

To install the dependencies, run the following command in the root directory of the code for python:
```bash
pip install -r requirements.txt -t ./
```
Creating the Human Trafficking Index table
==========================================

Open AWS-cli 
''' $ aws dynamodb create-table --table-name humantraffic   --attribute-definitions AttributeName=humantrafficid,AttributeType=S   --key-schema AttributeName=humantrafficid,KeyType=HASH   --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1   --region us-east-1   --query TableDescription.TableArn --output text'''

resulting dynamodb arn
----------------------
arn:aws:dynamodb:us-east-1:1234nnnnnn:table/humantraffic



Deploying the Application
-------------------------
There are three primary ways to deploy this application:


1. Use claudia to Deploy Node.js projects to AWS Lambda and API Gateway easily using claudia.js which will make AWS IAM policy and AWS Lambda Function. Create claudia.js
in AWS-cli.

$ claudia create --region us-east-1 --api-module index --policies policy


2. Use the AWS SAM CLI - https://github.com/awslabs/aws-sam-cli via python pip


   $ aws cloudformation package --template template.yml --s3-bucket humantraffic --output-template template-export.yml


3. Deploy via the AWS Serverless Application repository:
   https://aws.amazon.com/serverless/serverlessrepo/


Creating and deploying
======================

$ claudia create --region us-east-1 --api-module index --policies policy

The resulting output is the api is below remember to add all AWS IAM Api policy to your user account or this will fail 

apigateway.createDeployment     restApiId=3qt51ctp55   
{
  "lambda": {
    "role": "human-Trafficking-executor",
    "name": "human-Trafficking",
    "region": "us-east-1"
  },
  "api": {
    "id": "3qt51ctp55",
    "module": "index",
    "url": "https://3qt51ctp55.execute-api.us-east-1.amazonaws.com/latest/humantraffic"
  }
}


Cloud Formation State
=====================
{
   "StackId": "arn:aws:cloudformation:us-east-1:549511673151:stack/aws-serverless-repository-alexa-skills-kit-nodejs-factskillhumantrafic/1f6c5910-cc04-11e8-8258-500c2893c036",
   "StackName": "aws-serverless-repository-alexa-skills-kit-nodejs-factskillhumantrafic",
   "TemplateDescription": "Demonstrate a basic fact skill built with the ASK NodeJS SDK",
   "CreationTime": "2018-10-09T20:44:31.505Z",
   "LastUpdatedTime": "2018-10-09T20:44:39.011Z",
   "StackStatus": "CREATE_COMPLETE"
 }

In this case we use the curl package so we can log the output

List all people
===============
output all items in the tracking data in human-Trafficking table


curl "https://3qt51ctp55.execute-api.us-east-1.amazonaws.com/latest/humantraffic"

Add a person
=============
 curl -H "Content-Type: application/json" -X POST -d '{"humantrafficId":"123", "name":"Rene Gujan"}' https://3qt51ctp55.execute-api.us-east-1.amazonaws.com/latest/humantraffic


Testing deployment in a browser
===============================

This is really very simmple open the browser and list all the people
output all items in the tracking data in human-Trafficking table

curl  "https://3qt51ctp55.execute-api.us-east-1.amazonaws.com/latest/humantraffic"

Open a new tab in the browser paste the url, inside quotes. 


https://3qt51ctp55.execute-api.us-east-1.amazonaws.com/latest/humantraffic

The initial output with one entry is 
[{"name":"Fernando","humantrafficid":"258"}]


When taking advantage of dynamoDB add an extra record to list any extra infomation we get, this is becomes humantraffic index table has been fully populated an item being shown below is the largest entry


[{"name":"Fernando","humantrafficid":"258"},{"humantrafficid":"128","name":"Rene","Street":"Spilsby Road","lastName":"Gujaran","town":"Boston","Country birth":"Mexico","building":"The Mill Apartments","zip code":"MA1 234","state":"MA"}]


Now anyone through out the world can read this in a browser, but only you can update this table with curl command above from the AWS-cli. The generated code is protected by using a non-root credentials.

Add a person
=============
 curl -H "Content-Type: application/json" -X POST -d '{"humantrafficId":"123", "name":"Rene Gujan"}' https://3qt51ctp55.execute-api.us-east-1.amazonaws.com/latest/humantraffic


Alexa connection
================
The files to deploy the alexa Lambda have been added, but the linking to the Alexa Lambda is incomplete due to the lack of time 

==============================================

Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0