import { Elysia } from 'elysia'
import db from '../db/database'

const seedQmPurpose = () => {
	try {
		// First, clear existing data
		db.run('DELETE FROM qm_purpose')

		// Insert seed data
		const seedData = [
			{
				id: 'QMP001',
				name: 'Quality Control',
				description: 'Regular quality control checks for manufacturing process',
				active: true
			},
			{
				id: 'QMP002',
				name: 'Safety Inspection',
				description: 'Mandatory safety inspections for equipment and machinery',
				active: true
			},
			{
				id: 'QMP003',
				name: 'Maintenance Review',
				description: 'Periodic maintenance review of production equipment',
				active: true
			}
		]

		const stmt = db.prepare('INSERT INTO qm_purpose (id, name, description, active) VALUES (?, ?, ?, ?)')

		for (const data of seedData) {
			stmt.run(data.id, data.name, data.description, data.active)
		}

		return {
			success: true,
			message: 'QM Purpose table seeded successfully',
			data: seedData
		}
	} catch (error) {
		console.error('Error seeding QM Purpose:', error)
		throw new Error('Failed to seed QM Purpose table')
	}
}

const app = new Elysia({ prefix: '/seed' }).get('/', () => {
	return seedQmPurpose()
})

export default app
