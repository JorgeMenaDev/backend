import { Application, Router, oakCors, logger, load } from '../deps.ts'
import config from './config.ts'
import productRoutes from './routes/products.ts'
import categoryRoutes from './routes/categories.ts'
import inventoryRoutes from './routes/inventory.ts'
import { errorMiddleware, requestLoggerMiddleware } from './middleware/index.ts'

// Load environment variables
await load({ export: true })

// Initialize the app
const app = new Application()
const router = new Router()

// Configure CORS - use a simpler configuration to avoid middleware issues
const allowedOrigins = Deno.env.get('ALLOWED_ORIGINS')?.split(',') || ['*']
app.use(
	oakCors({
		origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
	})
)

// Apply middleware
app.use(errorMiddleware)
app.use(requestLoggerMiddleware)

// Health check endpoint
router.get('/api/health', ctx => {
	ctx.response.body = { status: 'ok', timestamp: new Date().toISOString() }
})

// Apply routes
app.use(productRoutes.routes())
app.use(productRoutes.allowedMethods())
app.use(categoryRoutes.routes())
app.use(categoryRoutes.allowedMethods())
app.use(inventoryRoutes.routes())
app.use(inventoryRoutes.allowedMethods())
app.use(router.routes())
app.use(router.allowedMethods())

// Start the server
const portStr = Deno.env.get('PORT') || '3000'
const port = parseInt(portStr)
console.log(`Server running on http://0.0.0.0:${port}`)
await app.listen({ port, hostname: '0.0.0.0' })
