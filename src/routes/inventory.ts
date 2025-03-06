import { Elysia } from 'elysia'
import {
	getLowInventory,
	getTables,
	getQmPurposeRecords,
	createQmPurposeRecord,
	updateQmPurposeRecord,
	deleteQmPurposeRecord
} from '../controllers/inventory_controller'

const app = new Elysia({ prefix: '/inventory' })

// Inventory endpoints
app.get('/low', getLowInventory)

// Tables endpoints
app.group('/tables', app =>
	app
		.get('/', getTables)
		.group('/qm_purpose', app =>
			app
				.get('/', getQmPurposeRecords)
				.post('/', createQmPurposeRecord)
				.put('/:id', updateQmPurposeRecord)
				.delete('/:id', deleteQmPurposeRecord)
		)
)

export default app
