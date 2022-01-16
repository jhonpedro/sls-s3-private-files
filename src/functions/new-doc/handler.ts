import type { ValidAPIGatewayHandler } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { randomUUID } from 'crypto'
import { s3Client } from 'src/services/s3'

const newDoc: ValidAPIGatewayHandler = async (event) => {
	const { body } = event

	if (!(body && body.doc && body.doc.content)) {
		return formatJSONResponse(400, {
			message: 'Invalid document',
		})
	}

	const fileKey = randomUUID()

	await s3Client
		.upload({
			Bucket: process.env.S3_BUCKET,
			Key: fileKey,
			Body: body.doc.content,
			ContentType: body.doc.mimetype,
		})
		.promise()

	return formatJSONResponse(200, {
		success: true,
		documentKey: fileKey,
	})
}

export const main = middyfy(newDoc)
