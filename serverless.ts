import type { AWS } from '@serverless/typescript'

import hello from '@functions/new-doc'
import getDoc from '@functions/get-doc'

const VARS = {
	S3_BUCKET: 'jhonpedro-private-bucket',
	S3_BUCKET_REGION: 'us-east-1',
} as const

const serverlessConfiguration: AWS = {
	service: 'sls-private-files',
	frameworkVersion: '2',
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
		},
	},
	plugins: ['serverless-esbuild', 'serverless-offline'],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		region: 'us-east-1',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			S3_BUCKET: VARS.S3_BUCKET,
			S3_BUCKET_REGION: VARS.S3_BUCKET_REGION,
		},
		lambdaHashingVersion: '20201221',
	},
	// import the function via paths
	functions: { hello, getDoc },
	resources: {
		Resources: {
			PrivateBucket: {
				Type: 'AWS::S3::Bucket',
				Properties: {
					BucketName: VARS.S3_BUCKET,
				},
			},
		},
	},
}

module.exports = serverlessConfiguration
