import { Router } from '../../deps.ts'
import {
	getLowInventory,
	getTables,
	getQmPurposeRecords,
	createQmPurposeRecord,
	updateQmPurposeRecord,
	deleteQmPurposeRecord
} from '../controllers/inventory_controller.ts'

const router = new Router()

// Inventory endpoints
router.get('/api/v1/inventory/low', getLowInventory)

// Tables endpoints
router.get('/api/v1/inventory/tables', getTables)
router.get('/api/v1/inventory/tables/qm_purpose', getQmPurposeRecords)
router.post('/api/v1/inventory/tables/qm_purpose', createQmPurposeRecord)
router.put('/api/v1/inventory/tables/qm_purpose/:id', updateQmPurposeRecord)
router.delete('/api/v1/inventory/tables/qm_purpose/:id', deleteQmPurposeRecord)

export default router
