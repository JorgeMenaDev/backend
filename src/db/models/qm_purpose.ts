/**
 * Represents a record in the qm_purpose table
 */
export interface QmPurpose {
	id: string
	text: string
	created_at: string
	updated_at: string
}

/**
 * Represents the response from the API when fetching qm_purpose records
 */
export interface QmPurposeResponse {
	data: QmPurpose[]
	total: number
}
