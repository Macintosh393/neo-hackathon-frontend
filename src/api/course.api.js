import apiClient from './axios.js';

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} userId
 * @property {string} name
 */

/**
 * @typedef {Object} CourseInput
 * @property {string} name - Name of the course.
 */

/**
 * Get all courses registered to the authenticated user.
 * @returns {Promise<Course[]>} List of courses.
 */
export async function getCourses() {
	const response = await apiClient.get('/api/courses');
	return response.data;
}

/**
 * Create a new course manually.
 * @param {CourseInput} courseData
 * @returns {Promise<Course>} The newly created course.
 */
export async function createCourse(courseData) {
	const response = await apiClient.post('/api/courses', courseData);
	return response.data;
}

/**
 * Update course details.
 * @param {string} id - Course ID
 * @param {CourseInput} courseData
 * @returns {Promise<Course>} The updated course.
 */
export async function updateCourse(id, courseData) {
	const response = await apiClient.put(`/api/courses/${id}`, courseData);
	return response.data;
}

/**
 * Delete a course.
 * @param {string} id - Course ID
 * @returns {Promise<void>}
 */
export async function deleteCourse(id) {
	await apiClient.delete(`/api/courses/${id}`);
}
