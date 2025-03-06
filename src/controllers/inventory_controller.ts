import { getDB, generateUUID } from '../db/database.ts'
import { QmPurpose } from '../db/models/qm_purpose.ts'

// Get low inventory products
export async function getLowInventory(ctx) {
	const db = getDB()
	const query = `
    SELECT * FROM products
    WHERE quantity <= min_quantity
    ORDER BY quantity ASC
  `
	const lowInventory = db.queryEntries(query)

	ctx.response.body = {
		success: true,
		data: lowInventory
	}
}

// Get all tables
export async function getTables(ctx) {
	const db = getDB()

	// Get all table names from the SQLite master table
	const query = `
    SELECT name FROM sqlite_master
    WHERE type='table'
    AND name NOT LIKE 'sqlite_%'
  `
	const tables = db.queryEntries(query)

	// Format the response
	ctx.response.body = {
		tables: tables.map(table => ({
			name: table.name,
			schema: 'public'
		}))
	}
}

// Get records from the qm_purpose table
export async function getQmPurposeRecords(ctx) {
	const db = getDB()
	const page = parseInt(ctx.request.url.searchParams.get('page') || '1')
	const limit = parseInt(ctx.request.url.searchParams.get('limit') || '100')
	const offset = (page - 1) * limit

	// Get total count
	const countQuery = `SELECT COUNT(*) as count FROM qm_purpose`
	const countResult = db.queryEntries(countQuery)
	const total = countResult[0].count

	// Get paginated records
	const query = `
    SELECT * FROM qm_purpose
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `
	const records = db.queryEntries(query, [limit, offset])

	ctx.response.body = {
		data: records,
		total
	}
}

// Create a new record in the qm_purpose table
export async function createQmPurposeRecord(ctx) {
	const db = getDB()
	const body = await ctx.request.body().value

	if (!body.text) {
		ctx.response.status = 400
		ctx.response.body = {
			success: false,
			message: 'Text is required'
		}
		return
	}

	const id = generateUUID()
	const now = new Date().toISOString()

	const query = `
    INSERT INTO qm_purpose (id, text, created_at, updated_at)
    VALUES (?, ?, ?, ?)
  `
	db.query(query, [id, body.text, now, now])

	const newRecord: QmPurpose = {
		id,
		text: body.text,
		created_at: now,
		updated_at: now
	}

	ctx.response.status = 201
	ctx.response.body = newRecord
}

// Update an existing record in the qm_purpose table
export async function updateQmPurposeRecord(ctx) {
	const db = getDB()
	const id = ctx.params.id
	const body = await ctx.request.body().value

	if (!body.text) {
		ctx.response.status = 400
		ctx.response.body = {
			success: false,
			message: 'Text is required'
		}
		return
	}

	// Check if record exists
	const checkQuery = `SELECT * FROM qm_purpose WHERE id = ?`
	const existingRecord = db.queryEntries(checkQuery, [id])

	if (existingRecord.length === 0) {
		ctx.response.status = 404
		ctx.response.body = {
			success: false,
			message: 'Record not found'
		}
		return
	}

	const now = new Date().toISOString()

	const query = `
    UPDATE qm_purpose
    SET text = ?, updated_at = ?
    WHERE id = ?
  `
	db.query(query, [body.text, now, id])

	const updatedRecord: QmPurpose = {
		id,
		text: body.text,
		created_at: existingRecord[0].created_at,
		updated_at: now
	}

	ctx.response.body = updatedRecord
}

// Delete a record from the qm_purpose table
export async function deleteQmPurposeRecord(ctx) {
	const db = getDB()
	const id = ctx.params.id

	// Check if record exists
	const checkQuery = `SELECT * FROM qm_purpose WHERE id = ?`
	const existingRecord = db.queryEntries(checkQuery, [id])

	if (existingRecord.length === 0) {
		ctx.response.status = 404
		ctx.response.body = {
			success: false,
			message: 'Record not found'
		}
		return
	}

	const query = `DELETE FROM qm_purpose WHERE id = ?`
	db.query(query, [id])

	ctx.response.status = 204
}
