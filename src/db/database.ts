import { Database } from 'bun:sqlite'
import config from '../config'

// Initialize the database
const db = new Database(config.dbPath)

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON')

export default db

// Get database connection
export function getDB(): Database {
	return db
}

// Initialize database schema
function initDatabase() {
	const db = getDB()

	// Create products table
	db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      min_quantity INTEGER DEFAULT ${config.defaultMinQuantity},
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

	// Create qm_purpose table
	db.run(`
    CREATE TABLE IF NOT EXISTS qm_purpose (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

	console.log('Database initialized')
}

// Seed the database with initial data
function seedDatabase() {
	const db = getDB()

	// Check if qm_purpose table is empty
	const qmPurposeCount = db.query('SELECT COUNT(*) as count FROM qm_purpose')[0][0]

	if (qmPurposeCount === 0) {
		// Add seed data for qm_purpose
		const now = new Date().toISOString()
		const seedData = [
			{
				id: generateUUID(),
				text: 'Risk Management',
				created_at: now,
				updated_at: now
			},
			{
				id: generateUUID(),
				text: 'Portfolio Optimization',
				created_at: now,
				updated_at: now
			},
			{
				id: generateUUID(),
				text: 'Compliance',
				created_at: now,
				updated_at: now
			},
			{
				id: generateUUID(),
				text: 'Market Analysis',
				created_at: now,
				updated_at: now
			}
		]

		for (const item of seedData) {
			db.query('INSERT INTO qm_purpose (id, text, created_at, updated_at) VALUES (?, ?, ?, ?)', [
				item.id,
				item.text,
				item.created_at,
				item.updated_at
			])
		}

		console.log('Seed data added for qm_purpose table')
	}
}

// Close database connection (useful for tests and clean shutdown)
export function closeDB() {
	if (db) {
		db.close()
	}
}

// Generate a UUID
export function generateUUID(): string {
	return crypto.randomUUID()
}
