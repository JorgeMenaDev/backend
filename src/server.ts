import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { StatusCodes } from 'http-status-codes'
import productRoutes from './routes/products'
import categoryRoutes from './routes/categories'
import inventoryRoutes from './routes/inventory'
import seedRoutes from './routes/seed'
import './db/init'

// Load environment variables - Bun has built-in support for .env files
const port = Number(Bun.env.PORT) || 3000
const allowedOrigins = Bun.env.ALLOWED_ORIGINS?.split(',') || ['*']

// Initialize the app
const app = new Elysia()
	.use(
		cors({
			origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
		})
	)
	// Add request logger middleware
	.onRequest(({ request }) => {
		console.log(`${request.method} ${request.url}`)
	})
	// Add error handling middleware
	.onError(({ error, set }) => {
		console.error('Error:', error)
		set.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR
		return {
			error: error.message || 'Internal Server Error',
			status: set.status
		}
	})
	// Health check endpoint
	.get('/api/health', () => ({
		status: 'ok',
		timestamp: new Date().toISOString()
	}))
	// Mount routes
	.group('/api', app => app.use(productRoutes).use(categoryRoutes).use(inventoryRoutes).use(seedRoutes))

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://0.0.0.0:${port}`)
})
