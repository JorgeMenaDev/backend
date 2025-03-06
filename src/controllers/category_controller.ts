import { getDB } from '../db/database.ts'

// Get all categories
export async function getCategories(ctx) {
	const db = getDB()
	const query = `SELECT DISTINCT category FROM products ORDER BY category`
	const categories = db.queryEntries(query).map(row => row.category)

	ctx.response.body = {
		success: true,
		data: categories
	}
}
