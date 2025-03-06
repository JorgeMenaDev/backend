import { Status } from '../../deps.ts'
import { getDB } from '../db/database.ts'

// Get all products
export async function getProducts(ctx) {
	const db = getDB()
	const query = `SELECT * FROM products ORDER BY name`
	const products = db.queryEntries(query)

	ctx.response.body = {
		success: true,
		data: products,
		count: products.length
	}
}

// Get product by ID
export async function getProductById(ctx) {
	const db = getDB()
	const id = ctx.params.id
	const query = `SELECT * FROM products WHERE id = ?`
	const product = db.queryEntries(query, [id])[0]

	if (!product) {
		ctx.response.status = Status.NotFound
		ctx.response.body = {
			success: false,
			message: `Product with ID ${id} not found`
		}
		return
	}

	ctx.response.body = {
		success: true,
		data: product
	}
}

// Create new product
export async function createProduct(ctx) {
	const db = getDB()
	const body = await ctx.request.body.json()

	// Validate required fields
	if (!body.name || !body.category || body.price === undefined || body.quantity === undefined) {
		ctx.response.status = Status.BadRequest
		ctx.response.body = {
			success: false,
			message: 'Missing required fields: name, category, price, and quantity are required'
		}
		return
	}

	const query = `
    INSERT INTO products (name, description, category, price, quantity, min_quantity)
    VALUES (?, ?, ?, ?, ?, ?)
  `

	db.query(query, [body.name, body.description || '', body.category, body.price, body.quantity, body.min_quantity || 5])

	// Get the inserted product
	const insertedId = db.lastInsertRowId
	const insertedProduct = db.queryEntries(`SELECT * FROM products WHERE id = ?`, [insertedId])[0]

	ctx.response.status = Status.Created
	ctx.response.body = {
		success: true,
		message: 'Product created successfully',
		data: insertedProduct
	}
}

// Update product
export async function updateProduct(ctx) {
	const db = getDB()
	const id = ctx.params.id
	const body = await ctx.request.body.json()

	// Check if product exists
	const product = db.queryEntries(`SELECT * FROM products WHERE id = ?`, [id])[0]

	if (!product) {
		ctx.response.status = Status.NotFound
		ctx.response.body = {
			success: false,
			message: `Product with ID ${id} not found`
		}
		return
	}

	// Update product
	const updateQuery = `
    UPDATE products SET
      name = ?,
      description = ?,
      category = ?,
      price = ?,
      quantity = ?,
      min_quantity = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `

	db.query(updateQuery, [
		body.name || product.name,
		body.description !== undefined ? body.description : product.description,
		body.category || product.category,
		body.price !== undefined ? body.price : product.price,
		body.quantity !== undefined ? body.quantity : product.quantity,
		body.min_quantity !== undefined ? body.min_quantity : product.min_quantity,
		id
	])

	// Get the updated product
	const updatedProduct = db.queryEntries(`SELECT * FROM products WHERE id = ?`, [id])[0]

	ctx.response.body = {
		success: true,
		message: 'Product updated successfully',
		data: updatedProduct
	}
}

// Delete product
export async function deleteProduct(ctx) {
	const db = getDB()
	const id = ctx.params.id

	// Check if product exists
	const product = db.queryEntries(`SELECT * FROM products WHERE id = ?`, [id])[0]

	if (!product) {
		ctx.response.status = Status.NotFound
		ctx.response.body = {
			success: false,
			message: `Product with ID ${id} not found`
		}
		return
	}

	// Delete product
	db.query(`DELETE FROM products WHERE id = ?`, [id])

	ctx.response.body = {
		success: true,
		message: 'Product deleted successfully'
	}
}
