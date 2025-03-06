import { Elysia } from 'elysia'
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct
} from '../controllers/product_controller'

const app = new Elysia({ prefix: '/products' })
	.get('/', getProducts)
	.get('/:id', getProductById)
	.post('/', createProduct)
	.put('/:id', updateProduct)
	.delete('/:id', deleteProduct)

export default app
