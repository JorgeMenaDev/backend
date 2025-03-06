import db from './database'

export const initDatabase = () => {
	try {
		// Create qm_purpose table
		db.run(`
      CREATE TABLE IF NOT EXISTS qm_purpose (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        active BOOLEAN DEFAULT true,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

		console.log('Database initialized successfully')
	} catch (error) {
		console.error('Error initializing database:', error)
		throw new Error('Failed to initialize database')
	}
}

// Run initialization
initDatabase()
