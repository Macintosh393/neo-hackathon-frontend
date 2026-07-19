import apiClient from './axios.js';

/**
 * @typedef {Object} StudySession
 * @property {string} id
 * @property {string} projectId
 * @property {string} title
 * @property {number} durationMinutes
 * @property {string|null} startTime
 * @property {string|null} endTime
 * @property {'SCHEDULED'|'COMPLETED'|'MISSED'} status
 * @property {boolean} isCompromised
 * @property {string|null} compromiseReason
 */

/**
 * @typedef {Object} SessionInput
 * @property {string} projectId
 * @property {string} title
 * @property {number} durationMinutes
 * @property {string|null} [startTime]
 * @property {string|null} [endTime]
 */

/**
 * @typedef {Object} UpdateSessionInput
 * @property {string|null} [startTime]
 * @property {string|null} [endTime]
 * @property {'SCHEDULED'|'COMPLETED'|'MISSED'} [status]
 */

/**
 * Get study sessions with optional filters.
 * @param {Object} [params]
 * @param {string} [params.startDate]
 * @param {string} [params.endDate]
 * @param {string} [params.projectId]
 * @returns {Promise<StudySession[]>}
 */
export async function getSessions(params) {
	const response = await apiClient.get('/api/sessions', { params });
	return response.data;
}

/**
 * Create a session manually.
 * @param {SessionInput} sessionData
 * @returns {Promise<StudySession>}
 */
export async function createSession(sessionData) {
	const response = await apiClient.post('/api/sessions', sessionData);
	return response.data;
}

/**
 * Update a study session.
 * @param {string} id
 * @param {UpdateSessionInput} sessionData
 * @returns {Promise<StudySession>}
 */
export async function updateSession(id, sessionData) {
	const response = await apiClient.put(`/api/sessions/${id}`, sessionData);
	return response.data;
}

/**
 * Delete a session manually.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteSession(id) {
	await apiClient.delete(`/api/sessions/${id}`);
}
