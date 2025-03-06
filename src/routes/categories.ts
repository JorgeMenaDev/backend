import { Elysia } from 'elysia'
import { getCategories } from '../controllers/category_controller'

const app = new Elysia({ prefix: '/categories' }).get('/', getCategories)

export default app
