import { Router } from '../../deps.ts'
import { getCategories } from '../controllers/category_controller.ts'

const router = new Router()

router.get('/api/categories', getCategories)

export default router
