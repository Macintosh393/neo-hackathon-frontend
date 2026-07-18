import apiClient from './axios.js';

/**
 * @typedef {'SCHEDULED'|'COMPLETED'|'MISSED'} StudySessionStatus
 * @typedef {'easy'|'medium'|'hard'} DifficultyLevel
 *
 * @typedef {Object} CalendarSessionEntry
 * @property {string} id
 * @property {string} projectId
 * @property {string} title
 * @property {string} courseName
 * @property {string} startTime
 * @property {string} endTime
 * @property {number} durationMinutes
 * @property {StudySessionStatus} status
 * @property {boolean} isCompromised
 * @property {string|null} [compromiseReason]
 *
 * @typedef {Object} CalendarDeadlineEntry
 * @property {string} projectId
 * @property {string} title
 * @property {string} courseName
 * @property {string} deadlineTime
 * @property {DifficultyLevel} estimatedDifficulty
 *
 * @typedef {Object} CalendarDayBucket
 * @property {CalendarSessionEntry[]} sessions
 * @property {CalendarDeadlineEntry[]} deadlines
 *
 * @typedef {Object} CalendarViewResponse
 * @property {{ startDate: string, endDate: string, totalDays: number }} view
 * @property {Record<string, CalendarDayBucket>} calendar
 */

/**
 * Fetch the calendar hash map for rendering the grid.
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Promise<CalendarViewResponse>}
 */
export async function getCalendarView(startDate, endDate) {
	const response = await apiClient.get('/api/calendar/view', {
		params: { startDate, endDate },
	});
	return response.data;
}

/**
 * Sync scheduled sessions to Google Calendar.
 * @param {string} [startDate]
 * @param {string} [endDate]
 * @returns {Promise<{message: string, scheduledSessionsCount: number}>}
 */
export async function syncToGoogleCalendar(startDate, endDate) {
	const response = await apiClient.post('/api/calendar/sync', null, {
		params: { startDate, endDate },
	});
	return response.data;
}

/**
 * Recalculate missed sessions.
 * @returns {Promise<{message: string, rescheduledSessionsCount: number}>}
 */
export async function recalculateCalendar() {
	const response = await apiClient.post('/api/calendar/recalculate');
	return response.data;
}

