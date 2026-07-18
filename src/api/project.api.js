import apiClient from './axios.js';

/**
 * @typedef {import('./user.api.js').PersonaInput} PersonaInput
 * @typedef {import('./session.api.js').StudySessionStatus} StudySessionStatus
 * @typedef {import('./session.api.js').StudySession} StudySession
 *
 * @typedef {'easy'|'medium'|'hard'} DifficultyLevel
 *
 * @typedef {Object} BatchImportProjectInput
 * @property {string} courseName
 * @property {string} title
 * @property {string} [description]
 * @property {string} deadline
 *
 * @typedef {Object} BatchImportInput
 * @property {BatchImportProjectInput[]} projects
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} courseId
 * @property {string} title
 * @property {string|null} [description]
 * @property {string} deadline
 * @property {DifficultyLevel|null} [estimatedDifficulty]
 *
 * @typedef {Project & { sessions: StudySession[] }} ProjectWithSessions
 * @typedef {{ message: string, importedProjects: ProjectWithSessions[] }} BatchImportResponse
 * 
 * @typedef {Object} ProjectInput
 * @property {string} courseId
 * @property {string} title
 * @property {string} [description]
 * @property {string} deadline
 * 
 * @typedef {Object} ProjectUpdateInput
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [deadline]
 */

/**
 * Batch import projects.
 * @param {BatchImportInput} payload
 * @returns {Promise<BatchImportResponse>}
 */
export async function batchImportProjects(payload) {
	const response = await apiClient.post('/api/projects/batch-import', payload);
	return response.data;
}

/**
 * Get all projects.
 * @param {Object} [params]
 * @param {string} [params.courseId]
 * @param {'active'|'completed'} [params.status]
 * @returns {Promise<Project[]>}
 */
export async function getProjects(params) {
	const response = await apiClient.get('/api/projects', { params });
	return response.data;
}

/**
 * Get a single project.
 * @param {string} id
 * @returns {Promise<ProjectWithSessions>}
 */
export async function getProject(id) {
	const response = await apiClient.get(`/api/projects/${id}`);
	return response.data;
}

/**
 * Create a new project.
 * @param {ProjectInput} payload
 * @returns {Promise<ProjectWithSessions>}
 */
export async function createProject(payload) {
	const response = await apiClient.post('/api/projects', payload);
	return response.data;
}

/**
 * Update an existing project.
 * @param {string} id
 * @param {ProjectUpdateInput} payload
 * @returns {Promise<Project>}
 */
export async function updateProject(id, payload) {
	const response = await apiClient.put(`/api/projects/${id}`, payload);
	return response.data;
}

/**
 * Delete a project.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteProject(id) {
	await apiClient.delete(`/api/projects/${id}`);
}

