import apiClient from './axios.js';

/**
 * @typedef {import('./axios.js')} AxiosInstance
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token - Signed JWT for use in Authorization headers.
 * @property {Object} user - Authenticated user details.
 */

/**
 * Exchange Google OAuth 2.0 authorization code for a local JWT access token.
 * @param {string} code - Google OAuth 2.0 authorization code.
 * @returns {Promise<AuthResponse>} The authenticated user and token.
 */
export async function authenticateWithGoogle(code) {
	const response = await apiClient.post('/api/auth/google', { code });
	return response.data;
}
