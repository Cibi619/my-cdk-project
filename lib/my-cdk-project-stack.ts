import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myBucket = new s3.Bucket(this, 'Bucket9015927', {
      bucketName: `mycdkproject-9015927-bucket-${cdk.Aws.ACCOUNT_ID}`,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, 
      autoDeleteObjects: true,
    });

    const myTable = new dynamodb.Table(this, 'Table9015927', {
      tableName: 'Table9015927',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const myLambda = new lambda.Function(this, 'Lambda9015927', {
      functionName: 'Lambda9015927',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log("Lambda9015927 invoked!", event);
          return {
            statusCode: 200,
            body: "Hello from Lambda9015927!"
          };
        };
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,
        TABLE_NAME: myTable.tableName,
      },
    });

    myBucket.grantReadWrite(myLambda);
    myTable.grantReadWriteData(myLambda);
  }
}
