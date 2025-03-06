import { StatusCodes } from 'http-status-codes'
import db from '../db/database'

// Get all products
export const getProducts = () => {
	const products = db.query('SELECT * FROM products').all()
	return { products }
}

// Get product by ID
export const getProductById = ({ params: { id } }) => {
	const product = db.query('SELECT * FROM products WHERE id = ?').get(id)
	if (!product) {
		throw new Error('Product not found')
	}
	return { product }
}

// Create new product
export const createProduct = ({ body }) => {
	const { name, description, price } = body
	const result = db
		.query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)')
		.run(name, description, price)

	return {
		id: result.lastInsertRowid,
		message: 'Product created successfully'
	}
}

// Update product
export const updateProduct = ({ params: { id }, body }) => {
	const { name, description, price } = body
	const result = db
		.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?')
		.run(name, description, price, id)

	if (result.changes === 0) {
		throw new Error('Product not found')
	}

	return { message: 'Product updated successfully' }
}

// Delete product
export const deleteProduct = ({ params: { id } }) => {
	const result = db.query('DELETE FROM products WHERE id = ?').run(id)

	if (result.changes === 0) {
		throw new Error('Product not found')
	}

	return { message: 'Product deleted successfully' }
}
