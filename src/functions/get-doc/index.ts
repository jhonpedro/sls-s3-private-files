import { handlerPath } from '@libs/handlerResolver'
import { AWS } from '@serverless/typescript'

const handler: AWS['functions'][''] = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			httpApi: {
				path: '/get-doc/{key}',
				method: 'get',
			},
		},
	],
}

export default handler
