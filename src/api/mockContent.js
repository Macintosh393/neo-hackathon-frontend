export const MOCK_CONTENT = {
	courses: {
		webDev: { uk: 'Веб-розробка', en: 'Web Development' },
		uiEng: { uk: 'UI-інженерія', en: 'UI Engineering' },
	},
	sessions: {
		designDataFlow: {
			uk: 'Проєктування потоку даних',
			en: 'Design data flow',
		},
		implementMonthGrid: {
			uk: 'Реалізація MonthGrid',
			en: 'Implement MonthGrid',
		},
		shapeDashboardCards: {
			uk: 'Оформлення карток панелі',
			en: 'Shape dashboard cards',
		},
	},
	deadlines: {
		calendarGrid: {
			uk: 'Календарна сітка React',
			en: 'React Calendar Grid',
		},
		dashboardViz: {
			uk: 'Візуалізація панелі',
			en: 'Dashboard Visualization',
		},
	},
	compromise: {
		outsidePreferred: {
			uk: 'Заплановано поза бажаним часом, щоб вкластися в дедлайн.',
			en: 'Scheduled outside preferred time to fit the deadline window.',
		},
		fallbackSlot: {
			uk: 'Перенесено в резервний слот, щоб встигнути до дедлайну.',
			en: 'Placed in a fallback slot to keep the deadline achievable.',
		},
	},
};

export function pickLocalized(entry, language) {
	if (!entry) {
		return '';
	}

	if (typeof entry === 'string') {
		return entry;
	}

	return entry[language] ?? entry.uk ?? entry.en ?? '';
}
