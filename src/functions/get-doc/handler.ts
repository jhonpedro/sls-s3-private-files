import { ValidAPIGatewayHandler } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { s3Client } from 'src/services/s3'
import { formatJSONResponse } from '../../libs/apiGateway'

const handler: ValidAPIGatewayHandler = async (event) => {
	const key = event.pathParameters.key

	const objURL = await s3Client.getSignedUrlPromise('getObject', {
		Bucket: process.env.S3_BUCKET,
		Key: key,
		Expires: 10,
	})

	return formatJSONResponse(200, { url: objURL })
}

export const main = middyfy(handler)
