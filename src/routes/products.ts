import { Router } from '../../deps.ts'
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct
} from '../controllers/product_controller.ts'

const router = new Router()

router
	.get('/api/products', getProducts)
	.get('/api/products/:id', getProductById)
	.post('/api/products', createProduct)
	.put('/api/products/:id', updateProduct)
	.delete('/api/products/:id', deleteProduct)

export default router
