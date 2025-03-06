import { logger, Status } from '../../deps.ts'

// Error handling middleware
export async function errorMiddleware(ctx, next) {
	try {
		await next()
	} catch (err) {
		const status = err.status || Status.InternalServerError
		const message = err.message || 'Internal Server Error'

		logger.error(`Error: ${message}`)

		ctx.response.status = status
		ctx.response.body = {
			success: false,
			message,
			timestamp: new Date().toISOString()
		}
	}
}

// Request logger middleware
export async function requestLoggerMiddleware(ctx, next) {
	const start = Date.now()
	await next()
	const ms = Date.now() - start
	const { method, url } = ctx.request
	const { status } = ctx.response

	logger.info(`${method} ${url.pathname} - ${status} - ${ms}ms`)
}
