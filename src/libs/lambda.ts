import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import httpMultipartBodyParser from '@middy/http-multipart-body-parser'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import { ValidAPIGatewayHandler } from './apiGateway'

export const middyfy = (handler: ValidAPIGatewayHandler) => {
	return middy(handler)
		.use(middyJsonBodyParser())
		.use(httpMultipartBodyParser())
		.use(httpHeaderNormalizer())
}
