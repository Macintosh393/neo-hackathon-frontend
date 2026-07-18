import apiClient from './axios.js';

/**
 * @typedef {Object} DashboardResponse
 * @property {Object} overallProgress
 * @property {number} overallProgress.totalProjects
 * @property {number} overallProgress.completedProjects
 * @property {number} overallProgress.totalSessions
 * @property {number} overallProgress.completedSessions
 * @property {number} overallProgress.percentage
 * @property {Array<{courseId: string, courseName: string, totalProjects: number, completedProjects: number, percentage: number}>} coursesProgress
 * @property {Array<{projectId: string, courseName: string, title: string, deadline: string, estimatedDifficulty: string, daysLeft: number, progressPercentage: number}>} upcomingDeadlines
 * @property {Array<{sessionId: string, projectId: string, courseName: string, title: string, startTime: string, endTime: string, status: string, isCompromised: boolean, compromiseReason: string|null}>} todaysAgenda
 */

/**
 * Get aggregated dashboard statistics.
 * @returns {Promise<DashboardResponse>}
 */
export async function getDashboardStats() {
	const response = await apiClient.get('/api/dashboard');
	return response.data;
}
