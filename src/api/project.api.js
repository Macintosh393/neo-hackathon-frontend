/**
 * @typedef {Object} PersonaInput
 * @property {number} courseYear
 * @property {'morning'|'afternoon'|'evening'} preferredTime
 * @property {boolean} studyOnWeekends
 * @property {number} maxHoursPerDay
 *
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string} email
 * @property {string} createdAt
 * @property {PersonaInput} [persona]
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
 * @typedef {'SCHEDULED'|'COMPLETED'|'MISSED'} StudySessionStatus
 * @typedef {'easy'|'medium'|'hard'} DifficultyLevel
 *
 * @typedef {Object} StudySession
 * @property {string} id
 * @property {string} projectId
 * @property {string} title
 * @property {number} durationMinutes
 * @property {string|null} [startTime]
 * @property {string|null} [endTime]
 * @property {StudySessionStatus} status
 * @property {boolean} isCompromised
 * @property {string|null} [compromiseReason]
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
 */

const MOCK_USER_PROFILE = {
	id: '11111111-1111-1111-1111-111111111111',
	email: 'student@neo-hackathon.dev',
	createdAt: '2026-07-18T08:00:00.000Z',
	persona: {
		courseYear: 3,
		preferredTime: 'evening',
		studyOnWeekends: true,
		maxHoursPerDay: 4,
	},
};

const MOCK_BATCH_IMPORT_RESPONSE = {
	message: 'Successfully imported and scheduled 2 projects',
	importedProjects: [
		{
			id: '22222222-2222-2222-2222-222222222222',
			courseId: '33333333-3333-3333-3333-333333333333',
			title: 'React Calendar Grid',
			description: 'Build the calendar grid and the surrounding UI shell.',
			deadline: '2026-08-02T23:59:00.000Z',
			estimatedDifficulty: 'medium',
			sessions: [
				{
					id: '44444444-4444-4444-4444-444444444441',
					projectId: '22222222-2222-2222-2222-222222222222',
					title: 'Design data flow',
					durationMinutes: 60,
					startTime: '2026-07-22T18:00:00.000Z',
					endTime: '2026-07-22T19:00:00.000Z',
					status: 'SCHEDULED',
					isCompromised: false,
					compromiseReason: null,
				},
				{
					id: '44444444-4444-4444-4444-444444444442',
					projectId: '22222222-2222-2222-2222-222222222222',
					title: 'Implement MonthGrid',
					durationMinutes: 90,
					startTime: '2026-07-24T18:00:00.000Z',
					endTime: '2026-07-24T19:30:00.000Z',
					status: 'SCHEDULED',
					isCompromised: false,
					compromiseReason: null,
				},
			],
		},
		{
			id: '22222222-2222-2222-2222-222222222223',
			courseId: '33333333-3333-3333-3333-333333333334',
			title: 'Dashboard Visualization',
			description: 'Create progress cards and deadline widgets.',
			deadline: '2026-08-08T23:59:00.000Z',
			estimatedDifficulty: 'hard',
			sessions: [
				{
					id: '44444444-4444-4444-4444-444444444443',
					projectId: '22222222-2222-2222-2222-222222222223',
					title: 'Shape dashboard cards',
					durationMinutes: 75,
					startTime: '2026-07-25T18:00:00.000Z',
					endTime: '2026-07-25T19:15:00.000Z',
					status: 'SCHEDULED',
					isCompromised: true,
					compromiseReason:
						'Scheduled outside preferred time to fit the deadline window.',
				},
			],
		},
	],
};

function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

/**
 * Why: the onboarding step needs to feel network-backed even while the backend is offline.
 * The mock returns the same `User` schema the real endpoint will eventually deliver.
 *
 * @param {PersonaInput} personaInput
 * @returns {Promise<UserProfile>}
 */
export async function updateUserPersona(personaInput) {
	await wait(250);

	return {
		...MOCK_USER_PROFILE,
		persona: personaInput,
	};
}

/**
 * Why: batch import is the heaviest step in the funnel, so the UI should already be wired to a stable shape.
 * @param {BatchImportInput} payload
 * @returns {Promise<BatchImportResponse>}
 */
export async function batchImportProjects(payload) {
	await wait(600);

	// Why: we still accept the payload now so the function signature matches the real backend contract later.
	void payload;

	return MOCK_BATCH_IMPORT_RESPONSE;
}
