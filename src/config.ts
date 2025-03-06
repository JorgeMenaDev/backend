// Bun automatically loads .env files
const config = {
	port: Number(Bun.env.PORT) || 3000,
	dbPath: Bun.env.DB_PATH || 'data/database.sqlite',
	allowedOrigins: Bun.env.ALLOWED_ORIGINS?.split(',') || ['*'],
	environment: Bun.env.NODE_ENV || 'development',
	logLevel: Bun.env.NODE_ENV === 'production' ? 'INFO' : 'DEBUG',
	defaultMinQuantity: 5
}

export default config
