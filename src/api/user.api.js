import apiClient from './axios.js';

/**
 * @typedef {Object} PersonaInput
 * @property {number} courseYear - Current year of study.
 * @property {'morning' | 'afternoon' | 'evening'} preferredTime - Preferred study time.
 * @property {boolean} studyOnWeekends - Whether sessions can be scheduled on weekends.
 * @property {number} maxHoursPerDay - Maximum study hours per day.
 * @property {string} [timezone] - Optional IANA timezone for the user.
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {PersonaInput} persona
 * @property {string} timezone
 * @property {string} createdAt
 */

/**
 * Get current user profile.
 * @returns {Promise<User>} The current user's profile data.
 */
export async function getCurrentUser() {
	const response = await apiClient.get('/api/users/me');
	return response.data;
}

/**
 * Update user persona for AI scheduling.
 * @param {PersonaInput} personaData - The user's updated academic and scheduling preferences.
 * @returns {Promise<User>} The updated User profile.
 */
export async function updateUserPersona(personaData) {
	const response = await apiClient.put('/api/users/persona', personaData);
	return response.data;
}
