import type {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Handler,
} from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

type ApiGatewayHandlerEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
	body: FromSchema<S>
}
export type ValidAPIGatewayHandler<S = any> = Handler<
	ApiGatewayHandlerEvent<S>,
	APIGatewayProxyResult
>

export const formatJSONResponse = (
	statusCode = 200,
	response: Record<string, unknown>
) => {
	return {
		statusCode,
		body: JSON.stringify(response),
	}
}
