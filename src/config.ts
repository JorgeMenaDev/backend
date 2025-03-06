export default {
	defaultPort: 3000,
	dbPath: './data/inventory.db',
	logLevel: Deno.env.get('NODE_ENV') === 'production' ? 'INFO' : 'DEBUG',
	defaultMinQuantity: 5
}
