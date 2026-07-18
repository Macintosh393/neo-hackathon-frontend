import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns';
import { MOCK_CONTENT, pickLocalized } from './mockContent.js';

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
 *
 * @typedef {Object} OverallProgress
 * @property {number} totalProjects
 * @property {number} completedProjects
 * @property {number} totalSessions
 * @property {number} completedSessions
 * @property {number} percentage
 *
 * @typedef {Object} CourseProgress
 * @property {string} courseId
 * @property {string} courseName
 * @property {number} totalProjects
 * @property {number} completedProjects
 * @property {number} percentage
 *
 * @typedef {Object} UpcomingDeadline
 * @property {string} projectId
 * @property {string} courseName
 * @property {string} title
 * @property {string} deadline
 * @property {DifficultyLevel} estimatedDifficulty
 * @property {number} daysLeft
 * @property {number} progressPercentage
 *
 * @typedef {Object} TodaysAgendaItem
 * @property {string} sessionId
 * @property {string} projectId
 * @property {string} courseName
 * @property {string} title
 * @property {string} startTime
 * @property {string} endTime
 * @property {StudySessionStatus} status
 * @property {boolean} isCompromised
 * @property {string|null} [compromiseReason]
 *
 * @typedef {Object} DashboardResponse
 * @property {OverallProgress} overallProgress
 * @property {CourseProgress[]} coursesProgress
 * @property {UpcomingDeadline[]} upcomingDeadlines
 * @property {TodaysAgendaItem[]} todaysAgenda
 *
 * @typedef {Object} UpdateSessionInput
 * @property {string|null} [startTime]
 * @property {string|null} [endTime]
 * @property {StudySessionStatus} [status]
 */

const MOCK_CALENDAR_SESSIONS = [
	{
		id: '55555555-5555-5555-5555-555555555551',
		projectId: '22222222-2222-2222-2222-222222222222',
		titleKey: 'designDataFlow',
		courseKey: 'webDev',
		startTime: '2026-07-22T18:00:00.000Z',
		endTime: '2026-07-22T19:00:00.000Z',
		durationMinutes: 60,
		status: 'SCHEDULED',
		isCompromised: false,
		compromiseReasonKey: null,
		dayOffset: 3,
	},
	{
		id: '55555555-5555-5555-5555-555555555552',
		projectId: '22222222-2222-2222-2222-222222222222',
		titleKey: 'implementMonthGrid',
		courseKey: 'webDev',
		startTime: '2026-07-24T18:00:00.000Z',
		endTime: '2026-07-24T19:30:00.000Z',
		durationMinutes: 90,
		status: 'SCHEDULED',
		isCompromised: false,
		compromiseReasonKey: null,
		dayOffset: 5,
	},
	{
		id: '55555555-5555-5555-5555-555555555553',
		projectId: '22222222-2222-2222-2222-222222222223',
		titleKey: 'shapeDashboardCards',
		courseKey: 'uiEng',
		startTime: '2026-07-25T18:00:00.000Z',
		endTime: '2026-07-25T19:15:00.000Z',
		durationMinutes: 75,
		status: 'SCHEDULED',
		isCompromised: true,
		compromiseReasonKey: 'outsidePreferred',
		dayOffset: 6,
	},
];

const MOCK_CALENDAR_DEADLINES = [
	{
		projectId: '22222222-2222-2222-2222-222222222222',
		titleKey: 'calendarGrid',
		courseKey: 'webDev',
		deadlineTime: '2026-08-02T23:59:00.000Z',
		estimatedDifficulty: 'medium',
		dayOffset: 14,
	},
	{
		projectId: '22222222-2222-2222-2222-222222222223',
		titleKey: 'dashboardViz',
		courseKey: 'uiEng',
		deadlineTime: '2026-08-08T23:59:00.000Z',
		estimatedDifficulty: 'hard',
		dayOffset: 20,
	},
];

function localizeSession(entry, language) {
	return {
		id: entry.id,
		projectId: entry.projectId,
		title: pickLocalized(MOCK_CONTENT.sessions[entry.titleKey], language),
		courseName: pickLocalized(MOCK_CONTENT.courses[entry.courseKey], language),
		startTime: entry.startTime,
		endTime: entry.endTime,
		durationMinutes: entry.durationMinutes,
		status: entry.status,
		isCompromised: entry.isCompromised,
		compromiseReason: entry.compromiseReasonKey
			? pickLocalized(
					MOCK_CONTENT.compromise[entry.compromiseReasonKey],
					language,
				)
			: null,
	};
}

function localizeDeadline(entry, language) {
	return {
		projectId: entry.projectId,
		title: pickLocalized(MOCK_CONTENT.deadlines[entry.titleKey], language),
		courseName: pickLocalized(MOCK_CONTENT.courses[entry.courseKey], language),
		deadlineTime: entry.deadlineTime,
		estimatedDifficulty: entry.estimatedDifficulty,
	};
}

function buildDashboardResponse(language) {
	return {
		overallProgress: {
			totalProjects: 6,
			completedProjects: 2,
			totalSessions: 18,
			completedSessions: 7,
			percentage: 39,
		},
		coursesProgress: [
			{
				courseId: '33333333-3333-3333-3333-333333333333',
				courseName: pickLocalized(MOCK_CONTENT.courses.webDev, language),
				totalProjects: 3,
				completedProjects: 1,
				percentage: 33,
			},
			{
				courseId: '33333333-3333-3333-3333-333333333334',
				courseName: pickLocalized(MOCK_CONTENT.courses.uiEng, language),
				totalProjects: 3,
				completedProjects: 1,
				percentage: 50,
			},
		],
		upcomingDeadlines: [
			{
				projectId: '22222222-2222-2222-2222-222222222222',
				courseName: pickLocalized(MOCK_CONTENT.courses.webDev, language),
				title: pickLocalized(MOCK_CONTENT.deadlines.calendarGrid, language),
				deadline: '2026-08-02T23:59:00.000Z',
				estimatedDifficulty: 'medium',
				daysLeft: 15,
				progressPercentage: 40,
			},
			{
				projectId: '22222222-2222-2222-2222-222222222223',
				courseName: pickLocalized(MOCK_CONTENT.courses.uiEng, language),
				title: pickLocalized(MOCK_CONTENT.deadlines.dashboardViz, language),
				deadline: '2026-08-08T23:59:00.000Z',
				estimatedDifficulty: 'hard',
				daysLeft: 21,
				progressPercentage: 25,
			},
		],
		todaysAgenda: [
			{
				sessionId: '55555555-5555-5555-5555-555555555551',
				projectId: '22222222-2222-2222-2222-222222222222',
				courseName: pickLocalized(MOCK_CONTENT.courses.webDev, language),
				title: pickLocalized(MOCK_CONTENT.sessions.designDataFlow, language),
				startTime: '2026-07-18T18:00:00.000Z',
				endTime: '2026-07-18T19:00:00.000Z',
				status: 'SCHEDULED',
				isCompromised: false,
				compromiseReason: null,
			},
			{
				sessionId: '55555555-5555-5555-5555-555555555553',
				projectId: '22222222-2222-2222-2222-222222222223',
				courseName: pickLocalized(MOCK_CONTENT.courses.uiEng, language),
				title: pickLocalized(MOCK_CONTENT.sessions.shapeDashboardCards, language),
				startTime: '2026-07-18T20:00:00.000Z',
				endTime: '2026-07-18T21:15:00.000Z',
				status: 'COMPLETED',
				isCompromised: true,
				compromiseReason: pickLocalized(
					MOCK_CONTENT.compromise.fallbackSlot,
					language,
				),
			},
		],
	};
}

function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function isWithinRange(dateValue, startDate, endDate) {
	return dateValue >= startDate && dateValue <= endDate;
}

function buildCalendarBuckets(startDate, endDate, language) {
	const start = parseISO(startDate);
	const end = parseISO(endDate);
	const calendar = {};

	for (const entry of MOCK_CALENDAR_SESSIONS) {
		const bucketDate = addDays(start, entry.dayOffset);
		if (!isWithinRange(bucketDate, start, end)) {
			continue;
		}

		const dayKey = format(bucketDate, 'yyyy-MM-dd');
		calendar[dayKey] = calendar[dayKey] ?? { sessions: [], deadlines: [] };
		calendar[dayKey].sessions.push(localizeSession(entry, language));
	}

	for (const entry of MOCK_CALENDAR_DEADLINES) {
		const bucketDate = addDays(start, entry.dayOffset);
		if (!isWithinRange(bucketDate, start, end)) {
			continue;
		}

		const dayKey = format(bucketDate, 'yyyy-MM-dd');
		calendar[dayKey] = calendar[dayKey] ?? { sessions: [], deadlines: [] };
		calendar[dayKey].deadlines.push(localizeDeadline(entry, language));
	}

	return calendar;
}

/**
 * Why: the calendar page renders against a date-keyed hash map, so the mock must preserve that exact shape.
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} [language='uk']
 * @returns {Promise<CalendarViewResponse>}
 */
export async function getCalendarView(startDate, endDate, language = 'uk') {
	await wait(300);

	const totalDays =
		differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) + 1;

	return {
		view: {
			startDate,
			endDate,
			totalDays,
		},
		calendar: buildCalendarBuckets(startDate, endDate, language),
	};
}

/**
 * Why: dashboard widgets should be able to render immediately against a stable aggregated payload.
 * @param {string} [language='uk']
 * @returns {Promise<DashboardResponse>}
 */
export async function getDashboard(language = 'uk') {
	await wait(300);

	return buildDashboardResponse(language);
}

/**
 * Why: calendar interactions should update a single session and immediately refresh cached views.
 * @param {string} id
 * @param {UpdateSessionInput} payload
 * @param {string} [language='uk']
 * @returns {Promise<CalendarSessionEntry>}
 */
export async function updateStudySession(id, payload, language = 'uk') {
	await wait(300);

	const session = MOCK_CALENDAR_SESSIONS.find((entry) => entry.id === id);
	if (!session) {
		throw new Error('Session not found');
	}

	if (payload.status) {
		session.status = payload.status;
	}

	if ('startTime' in payload) {
		session.startTime = payload.startTime;
	}

	if ('endTime' in payload) {
		session.endTime = payload.endTime;
	}

	return localizeSession(session, language);
}
