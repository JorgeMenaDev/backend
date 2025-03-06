/**
 * Represents a database table in the system
 */
export interface Table {
	name: string
	schema: string
}

/**
 * Represents the response from the API when fetching tables
 */
export interface TablesResponse {
	tables: Table[]
}
